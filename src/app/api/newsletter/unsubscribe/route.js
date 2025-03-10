// app/api/newsletter/unsubscribe/route.js
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(req) {
  try {
    const { email } = await req.json();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ message: 'Invalid email address' }, { status: 400 });
    }

    const subscriber = await prisma.newsletter.findUnique({
      where: { email },
    });

    if (!subscriber) {
      return NextResponse.json({ message: 'Email not found' }, { status: 404 });
    }

    await prisma.newsletter.delete({
      where: { email },
    });

    return NextResponse.json({ message: 'Successfully unsubscribed' }, { status: 200 });
  } catch (error) {
    console.error('Error unsubscribing:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
