// src/app/api/blogs/[id]/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: params.id },
    });
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const updatedBlog = await prisma.blog.update({
      where: { id: params.id },
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
    return NextResponse.json(updatedBlog);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.blog.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
