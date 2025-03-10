// app/api/productcategories/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const categories = await prisma.productCategory.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
export async function POST(request: Request) {
    try {
      const { name, description, images, parentId, properties, tags, featured, bestSeller } = await request.json();
  
      const newCategory = await prisma.productCategory.create({
        data: {
          name,
          description,
          images,
          parentId,
          properties,
          tags,
          featured,
          bestSeller,
        },
      });
  
      return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
    }
  }
