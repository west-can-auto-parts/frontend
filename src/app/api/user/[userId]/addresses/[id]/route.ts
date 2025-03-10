import { NextResponse } from "next/server";
import prisma from '../../../../../../lib/prisma'; // Ensure this path is correct
import { getSession } from 'next-auth/react'; // Adjust if using another auth method
import { UserRole } from "@prisma/client"; // Ensure the role enum is correct
import { currentRole, currentUser } from "@/lib/auth"; // Adjust if using another auth method

// Utility function to get the current user
const getCurrentUser = async () => {
  const session = await getSession(); // Adjust if using another auth method
  if (!session || !session.user) {
    throw new Error('Not authenticated');
  }
  return session.user;
};

// Utility function to get a user by ID
const getUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

// Utility function to get an address by ID
const getAddressById = async (userId: string, addressId: string) => {
  return await prisma.address.findFirst({
    where: {
      id: addressId,
      userId,
    },
  });
};

// Utility function to check if the user is authorized
const isAuthorized = async (userId: string) => {
  const currentUser = await getCurrentUser();
  const role = await currentRole();
  return currentUser.id === userId || role === UserRole.ADMIN;
};

export const GET = async (req: Request, { params }: { params: { userId: string; id: string } }) => {
  const { userId, id } = params;
  try {
    const user = await getCurrentUser();
    const role = await currentRole();

    // Check if the current user is authorized
    if (!(user?.id === userId || role === UserRole.ADMIN)) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const address = await getAddressById(userId, id);

    if (!address) {
      return NextResponse.json({ message: 'Address not found' }, { status: 404 });
    }

    return NextResponse.json(address);
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};

export const POST = async (req: Request, { params }: { params: { userId: string } }) => {
  const { userId } = params;
  try {
    const user = await getCurrentUser();
    const role = await currentRole();

    // Check if the current user is authorized
    if (!(user?.id === userId || role === UserRole.ADMIN)) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const data = await req.json();
    const newAddress = await prisma.address.create({
      data: {
        ...data,
        userId,
      },
    });

    return NextResponse.json(newAddress);
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};

export const PUT = async (req: Request, { params }: { params: { userId: string; id: string } }) => {
  const { userId, id } = params;
  try {
    const user = await getCurrentUser();
    const role = await currentRole();

    // Check if the current user is authorized
    if (!(user?.id === userId || role === UserRole.ADMIN)) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const data = await req.json();
    const address = await getAddressById(userId, id);

    if (!address) {
      return NextResponse.json({ message: 'Address not found' }, { status: 404 });
    }

    const updatedAddress = await prisma.address.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedAddress);
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: { params: { userId: string; id: string } }) => {
  const { userId, id } = params;
  try {
    const user = await getCurrentUser();
    const role = await currentRole();

    // Check if the current user is authorized
    if (!(user?.id === userId || role === UserRole.ADMIN)) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const address = await getAddressById(userId, id);

    if (!address) {
      return NextResponse.json({ message: 'Address not found' }, { status: 404 });
    }

    await prisma.address.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Address deleted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};
