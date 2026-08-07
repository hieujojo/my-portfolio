import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  website?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;
const MAX_BODY_BYTES = 32_000;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  return forwardedFor?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

function getRateLimitResult(clientIp: string) {
  const now = Date.now();

  for (const [ip, entry] of rateLimitStore) {
    if (entry.resetAt <= now) rateLimitStore.delete(ip);
  }

  const existing = rateLimitStore.get(clientIp);
  if (existing && existing.count >= MAX_REQUESTS_PER_WINDOW) {
    return { limited: true, retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000) };
  }

  if (existing) {
    existing.count += 1;
  } else {
    rateLimitStore.set(clientIp, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
  }

  return { limited: false, retryAfterSeconds: 0 };
}

function getRateLimitKey(clientIp: string, email?: string) {
  return email ? `${clientIp}:${email.toLowerCase()}` : clientIp;
}

function isContactPayload(value: unknown): value is ContactPayload {
  if (!value || typeof value !== 'object') return false;

  const { name, email, message } = value as Record<string, unknown>;
  return (
    typeof name === 'string' &&
    name.trim().length > 0 &&
    name.length <= 120 &&
    typeof email === 'string' &&
    emailPattern.test(email) &&
    email.length <= 254 &&
    typeof message === 'string' &&
    message.trim().length > 0 &&
    message.length <= 5000 &&
    (typeof (value as Record<string, unknown>).website === 'undefined' ||
      typeof (value as Record<string, unknown>).website === 'string')
  );
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    };
    return entities[character];
  });
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ message: 'Request body is too large.' }, { status: 413 });
  }

  const rateLimit = getRateLimitResult(clientIp);
  if (rateLimit.limited) {
    return NextResponse.json(
      { message: 'Too many requests. Please try again shortly.' },
      {
        status: 429,
        headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) },
      }
    );
  }

  let data: unknown;

  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
  }

  if (!isContactPayload(data)) {
    return NextResponse.json({ message: 'Please provide valid contact details.' }, { status: 400 });
  }

  // Honeypot field: real users never see or fill this field; bots usually do.
  if (data.website?.trim()) {
    return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });
  }

  const identityRateLimit = getRateLimitResult(getRateLimitKey(clientIp, data.email.trim()));
  if (identityRateLimit.limited) {
    return NextResponse.json(
      { message: 'Too many requests. Please try again shortly.' },
      {
        status: 429,
        headers: { 'Retry-After': String(identityRateLimit.retryAfterSeconds) },
      }
    );
  }

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  // In local development, receive messages in the authenticated mailbox unless
  // a separate recipient has explicitly been configured.
  const emailTo = process.env.EMAIL_TO || emailUser;

  if (!emailUser || !emailPass) {
    console.error('Contact email is not configured.');
    return NextResponse.json({ message: 'Contact service is unavailable.' }, { status: 503 });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      pool: true,
      maxConnections: 1,
    });

    const name = data.name.trim();
    const email = data.email.trim();
    const message = data.message.trim();

    await transporter.sendMail({
      from: emailUser,
      to: emailTo,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<h2>New Contact Form Submission</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Message:</strong> ${escapeHtml(message)}</p>`,
    });

    return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send message.' }, { status: 500 });
  }
}
