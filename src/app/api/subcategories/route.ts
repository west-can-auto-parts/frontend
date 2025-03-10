import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // Adjust your Prisma client import path

// GET: Fetch all subcategories
export async function GET() {
  try {
    const subcategories = await prisma.subCategory.findMany();
    return NextResponse.json(subcategories, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch subcategories' }, { status: 500 });
  }
}

// POST: Create a new subcategory
export async function POST(request:Request) {
  const { name, description, images, parentId, properties, tags, featured, bestSeller } = await request.json();

  try {
    const newSubCategory = await prisma.subCategory.create({
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
    return NextResponse.json(newSubCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create subcategory' }, { status: 500 });
  }
}
