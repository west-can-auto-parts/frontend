// app/api/categories/[id]/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
      const category = await prisma.category.findUnique({
        where: { id: params.id },
        include: { parent: true }, // Include parent category details
      });
      return NextResponse.json(category || {});
    } catch (error) {
      return NextResponse.json({ error: 'Error fetching category' }, { status: 500 });
    }
  }
  

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: body,
    });
    return NextResponse.json(updatedCategory);
  } catch (error:any) {
    console.error(error);
    if (error.code === 'P2025') { // Prisma error code for not found
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const deletedCategory = await prisma.category.delete({
      where: { id },
    });
    return NextResponse.json(deletedCategory);
  } catch (error:any) {
    console.error(error);
    if (error.code === 'P2025') { // Prisma error code for not found
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
