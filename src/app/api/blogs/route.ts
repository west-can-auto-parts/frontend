import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
      const blogs = await prisma.blog.findMany();
      return NextResponse.json(blogs);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
    }
  }
  
  export async function POST(request: Request) {
    try {
      const data = await request.json();
      const newBlog = await prisma.blog.create({
        data: {
          title: data.title,
          content: data.content,
          imageUrl: data.imageUrl,
          categories: data.categories,
          tags: data.tags,
          authorName: data.authorName,
          authorLinkedin: data.authorLinkedin,
          featured: data.featured,
          newBlog: data.newBlog,
        },
      });
      return NextResponse.json(newBlog, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
    }
  }