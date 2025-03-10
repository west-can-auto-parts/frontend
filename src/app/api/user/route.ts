import { NextResponse } from "next/server";
import { UserRole } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async () => {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ users });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: 500, statusText: "Internal Server Error" },
      { status: 500 }
    );
  }
};

// POST: Add a new user
export const POST = async (request: Request) => {
  try {
    const data = await request.json();

    // Check if all required fields are provided
    const { name, email, password, role } = data;
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { message: "Name, email, password, and role are required." },
        { status: 400 }
      );
    }

    // Check if the role is valid (e.g., `ADMIN`, `USER`)
    if (!Object.values(UserRole).includes(role)) {
      return NextResponse.json(
        { message: "Invalid user role." },
        { status: 400 }
      );
    }

    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password, // In real cases, hash the password before saving it
        role,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { status: 500, statusText: "Internal Server Error" },
      { status: 500 }
    );
  }
};
