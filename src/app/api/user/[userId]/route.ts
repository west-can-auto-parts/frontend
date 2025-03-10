import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Update path to prisma if needed
import { currentRole, currentUser } from '@/lib/auth'; // Ensure these are imported correctly
import { UserRole } from '@prisma/client'; // Ensure the role enum is correct

// PUT: Update an existing user by ID
export async function PUT(request: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;

  try {
    // Fetch the currently authenticated user
    const user = await currentUser();
    const role = await currentRole();

    // Check if the current user is authorized (can update their own data or is an admin)
    if (!(user?.id === userId || role === UserRole.ADMIN)) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const data = await request.json();

    // Ensure the `userId` is passed correctly
    if (!userId) {
      return NextResponse.json({ message: 'User ID is required.' }, { status: 400 });
    }

    // Update the user data
    const updatedUser = await prisma.user.update({
      where: { id: userId }, // Ensure the userId is provided here
      data,
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;

  try {
    // Fetch the currently authenticated user
    const user = await currentUser();
    const role = await currentRole();

    // Check if the current user is authorized (can delete their own account or is an admin)
    if (!(user?.id === userId || role === UserRole.ADMIN)) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    // Ensure the `userId` is passed correctly
    if (!userId) {
      return NextResponse.json({ message: 'User ID is required.' }, { status: 400 });
    }

    // Delete the user
    const deletedUser = await prisma.user.delete({
      where: { id: userId }, // Ensure the userId is provided here
    });

    return NextResponse.json(deletedUser, { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}