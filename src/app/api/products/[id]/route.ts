// src/app/api/products/[id]/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
  
    try {
      const product = await prisma.product.findUnique({
        where: { id }
      });
      if (!product) {
        return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
      }
      return NextResponse.json({ product });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch product.' }, { status: 500 });
    }
  }

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const updates = await request.json();

  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: updates
    });
    return NextResponse.json({ updatedProduct });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
  
    try {
      await prisma.product.delete({
        where: { id }
      });
      return NextResponse.json({ message: 'Product deleted successfully.' });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to delete product.' }, { status: 500 });
    }
  }