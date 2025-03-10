// app/api/newsletter/subscribe/route.js
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
      const { email } = await request.json();
  
      // Check if the email is already subscribed
      const existingSubscriber = await prisma.subscriber.findUnique({
        where: { email },
      });
  
      if (existingSubscriber) {
        return NextResponse.json(
          { message: 'Email is already subscribed' },
          { status: 400 }
        );
      }
  
      // Subscribe the email
      const subscriber = await prisma.subscriber.create({
        data: { email },
      });
  
      return NextResponse.json({ message: 'Subscribed successfully' });
    } catch (error) {
      console.error('Error subscribing:', error);
      return NextResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 }
      );
    }
  }