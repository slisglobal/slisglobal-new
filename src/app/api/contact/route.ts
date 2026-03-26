import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, inquiry } = await request.json();

    // Verify required fields
    if (!name || !email || !inquiry) {
      return NextResponse.json({ success: false, message: 'All fields are required.' }, { status: 400 });
    }

    // Configure the transporter with your email service provider
    // Best practice is to use Gmail with an 'App Password', or a transactional provider like Resend/SendGrid
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Determine receiver
    const receiver = process.env.SMTP_RECEIVER || process.env.SMTP_USER;

    // Email Layout
    const mailOptions = {
      from: `"${name}" <${email}>`, // May show as your sending email depending on SMTP rules, but reply-to works
      replyTo: email,
      to: receiver,
      subject: `New Corporate Inquiry via Silver Lining: ${name}`,
      text: `Inquiry from: ${name} (${email})\n\nMessage:\n${inquiry}`,
      html: `
        <div style="font-family: 'Arial', sans-serif; padding: 30px; background-color: #0a0812; color: #f5f3ff;">
          <h2 style="color: #fbbf24; border-bottom: 2px solid #5b21b6; padding-bottom: 10px;">Silver Lining - New Contact Transmission</h2>
          <p style="font-size: 16px;"><strong>Identity:</strong> ${name}</p>
          <p style="font-size: 16px;"><strong>Frequency (Email):</strong> <a href="mailto:${email}" style="color: #a78bfa;">${email}</a></p>
          
          <div style="margin-top: 25px;">
            <p style="font-size: 14px; color: #c4b5fd; text-transform: uppercase; letter-spacing: 2px;">Inquiry Parameters</p>
            <div style="background-color: #130f1f; border-left: 4px solid #fbbf24; padding: 15px; border-radius: 4px; font-size: 15px; line-height: 1.6;">
              ${inquiry.replace(/\n/g, '<br/>')}
            </div>
          </div>
          
          <p style="margin-top: 30px; font-size: 12px; color: #ffffff40;">Automated System Transmission. Sent via Next.js Backend.</p>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Transmission Successful!' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, message: 'Transmission Failed.' }, { status: 500 });
  }
}
