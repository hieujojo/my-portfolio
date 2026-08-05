import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    message.length <= 5000
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
  let data: unknown;

  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
  }

  if (!isContactPayload(data)) {
    return NextResponse.json({ message: 'Please provide valid contact details.' }, { status: 400 });
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
