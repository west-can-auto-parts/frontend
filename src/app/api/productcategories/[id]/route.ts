import { NextResponse } from 'next/server';
import { PrismaClient, ProductCategory } from '@prisma/client';

const prisma = new PrismaClient();

interface CategoryData {
  name?: string;
  description?: string;
  images?: string[];
  parentId?: string | null;
  properties?: Record<string, string>;
  tags?: string[];
  featured?: boolean;
  bestSeller?: boolean;
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const category: ProductCategory | null = await prisma.productCategory.findUnique({
      where: { id },
    });

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error(error); // Log error details
    return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const data: CategoryData = await request.json();

    const updatedCategory = await prisma.productCategory.update({
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

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error(error); // Log error details
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.productCategory.delete({
      where: { id },
    });

    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    console.error(error); // Log error details
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
