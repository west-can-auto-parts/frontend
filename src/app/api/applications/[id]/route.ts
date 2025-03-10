// src/app/api/job-applications/[id]/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'ID is required.' }, { status: 400 });
  }

  try {
    const jobApplication = await prisma.jobApplication.findUnique({
      where: { id },
    });
    if (!jobApplication) {
      return NextResponse.json({ error: 'Job application not found.' }, { status: 404 });
    }
    return NextResponse.json({ jobApplication });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch job application.' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const {
    applicantName,
    applicantEmail,
    phone,
    resume,
    coverLetter,
    positionApplied,
    location,
    experienceYears,
    status
  } = await request.json();

  if (!id) {
    return NextResponse.json({ error: 'ID is required.' }, { status: 400 });
  }

  try {
    const updatedJobApplication = await prisma.jobApplication.update({
      where: { id },
      data: {
        applicantName,
        applicantEmail,
        phone,
        resume,
        coverLetter,
        positionApplied,
        location,
        experienceYears,
        status,
      }
    });
    return NextResponse.json({ updatedJobApplication });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update job application.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'ID is required.' }, { status: 400 });
  }

  try {
    await prisma.jobApplication.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Job application deleted successfully.' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete job application.' }, { status: 500 });
  }
}
