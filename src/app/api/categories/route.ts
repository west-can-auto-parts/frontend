import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching categories' }, { status: 500 });
  }
}

// POST create a new category
export async function POST(request: Request) {
  try {
    const { name, description, images, parentId, properties, tags, featured, bestSeller } = await request.json();

    // Basic validation
    if (!name || !Array.isArray(properties)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const category = await prisma.category.create({
      data: {
        name,
        description: description || null,  // Ensure description is optional
        images: images || [],              // Default to empty array if not provided
        parentId: parentId || null,        // Ensure parentId is optional
        properties: properties || [],      // Default to empty array if not provided
        tags: tags || [],                  // Default to empty array if not provided
        featured: featured || false,       // Default to false if not provided
        bestSeller: bestSeller || false    // Default to false if not provided
      }
    });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Error creating category' }, { status: 500 });
  }
}