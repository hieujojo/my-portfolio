import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Form data:', data);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      pool: true, 
      maxConnections: 1, 
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'conghieuzc112@gmail.com',
      subject: `New Contact Form Submission from ${data.name}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`,
      html: `<h2>New Contact Form Submission</h2><p><strong>Name:</strong> ${data.name}</p><p><strong>Email:</strong> ${data.email}</p><p><strong>Message:</strong> ${data.message}</p>`,
    });

    return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send message.' }, { status: 500 });
  }
}