// app/api/jobs/[id]/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const job = await prisma.jobOpening.findUnique({
      where: { id: params.id }
    });
    return NextResponse.json(job || {});
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching job' }, { status: 500 });
  }
}

// app/api/jobs/[id]/route.ts (append to the existing file)

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
      const { jobTitle, location, company, jobDescription, responsibilities, qualifications, employmentType, salaryRange, applicationDeadline, active } = await request.json();
      const job = await prisma.jobOpening.update({
        where: { id: params.id },
        data: {
          jobTitle,
          location,
          company,
          jobDescription,
          responsibilities,
          qualifications,
          employmentType,
          salaryRange,
          applicationDeadline,
          active
        }
      });
      return NextResponse.json(job);
    } catch (error) {
      return NextResponse.json({ error: 'Error updating job' }, { status: 500 });
    }
  }

  // app/api/jobs/[id]/route.ts (append to the existing file)

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
      await prisma.jobOpening.delete({
        where: { id: params.id }
      });
      return NextResponse.json({ message: 'Job deleted successfully' });
    } catch (error) {
      return NextResponse.json({ error: 'Error deleting job' }, { status: 500 });
    }
  }
  