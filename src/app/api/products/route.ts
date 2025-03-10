// src/app/api/products/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, description, price, supplier, images, categoryId, properties, featured, bestSeller, tags } = await request.json();
    
    // Log the incoming data to check for issues
    console.log('Incoming data:', { title, description, price, supplier, images, categoryId, properties, featured, bestSeller, tags });

    // Validate data if necessary
    if (!title || !description || !price || !supplier || !categoryId) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const newProduct = await prisma.product.create({
      data: {
        title,
        description,
        price,
        supplier,
        images,
        categoryId,
        properties,
        featured,
        bestSeller,
        tags
      }
    });
    return NextResponse.json({ newProduct }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product.' }, { status: 500 });
  }
}