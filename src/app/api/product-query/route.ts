import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'; // Adjust the path according to your project structure
const prisma = new PrismaClient()
// Handle GET requests to retrieve all product queries
export async function GET() {
  try {
    const productQueries = await prisma.productQuery.findMany();
    return NextResponse.json({ productQueries });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product queries.' }, { status: 500 });
  }
}

// Handle POST requests to create a new product query
export async function POST(request: Request) {
  const {
    name,
    email,
    store,
    phoneNumber,
    part,
    message
  } = await request.json();

  if (!name || !email || !store || !part || !message) {
    return NextResponse.json({ error: 'Required fields are missing.' }, { status: 400 });
  }

  try {
    const newProductQuery = await prisma.productQuery.create({
      data: {
        name,
        email,
        store,
        phoneNumber,
        part,
        message,
      },
    });

    return NextResponse.json({ newProductQuery });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to create product query.' }, { status: 500 });
  }
}
