import { NextResponse } from 'next/server';
import { PrismaClient, SubCategory } from '@prisma/client';

const prisma = new PrismaClient();

// Define the shape of the data for PUT requests
interface SubCategoryData {
  name?: string;
  description?: string;
  images?: string[];
  parentId?: string | null;
  properties?: Record<string, string>;
  tags?: string[];
  featured?: boolean;
  bestSeller?: boolean;
}

// GET: Fetch a single subcategory by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const subcategory: SubCategory | null = await prisma.subCategory.findUnique({
      where: { id },
    });

    if (!subcategory) {
      return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });
    }

    return NextResponse.json(subcategory, { status: 200 });
  } catch (error) {
    console.error(error); // Log error details
    return NextResponse.json({ error: 'Failed to fetch subcategory' }, { status: 500 });
  }
}

// PUT: Update a subcategory by ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const data: SubCategoryData = await request.json();

    const updatedSubCategory = await prisma.subCategory.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        images: data.images,
        parentId: data.parentId,
        properties: data.properties,
        tags: data.tags,
        featured: data.featured,
        bestSeller: data.bestSeller,
      },
    });

    return NextResponse.json(updatedSubCategory, { status: 200 });
  } catch (error) {
    console.error(error); // Log error details
    return NextResponse.json({ error: 'Failed to update subcategory' }, { status: 500 });
  }
}

// DELETE: Delete a subcategory by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.subCategory.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Subcategory deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(error); // Log error details
    return NextResponse.json({ error: 'Failed to delete subcategory' }, { status: 500 });
  }
}
