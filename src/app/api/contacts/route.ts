// src/app/api/contacts/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany();
    return NextResponse.json({ contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ error: 'Failed to fetch contacts.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { firstName, lastName, company, email, phoneNumber, message, agreed } = await request.json();

    // Log incoming data
    console.log('Incoming contact data:', { firstName, lastName, company, email, phoneNumber, message, agreed });

    // Validate data
    if (!firstName || !lastName || !email || !phoneNumber || !message || agreed === undefined) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    // Create new contact in the database
    const newContact = await prisma.contact.create({
      data: {
        firstName,
        lastName,
        company,
        email,
        phoneNumber,
        message,
        agreed,
      },
    });

    const pass = process.env.SMPT_PASS

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service:'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass,
      },
    });

    // Define email options
    const mailOptions = {
      from: '"West Can Auto Parts"',
      to: 'ronit.jaiprakash@westcanauto.com', // Change to your recipient email
      subject: 'New Contact Form Submission',
      text: `
        You have received a new message from the contact form.

        First Name: ${firstName}
        Last Name: ${lastName}
        Company: ${company}
        Email: ${email}
        Phone Number: ${phoneNumber}
        Message: ${message}
        Agreed to policies: ${agreed}
      `,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Agreed to policies:</strong> ${agreed}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ newContact }, { status: 201 });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json({ error: 'Failed to create contact.' }, { status: 500 });
  }
}
