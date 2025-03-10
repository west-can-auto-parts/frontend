// app/api/jobs/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const jobs = await prisma.jobOpening.findMany();
    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching jobs' }, { status: 500 });
  }
}

// app/api/jobs/route.ts (append to the existing file)

export async function POST(request: Request) {
    try {
      const data = await request.json();
      console.log('Received data:', data); // Log received data for debugging
  
      const job = await prisma.jobOpening.create({
        data: {
          jobTitle: data.jobTitle,
          location: data.location,
          company: data.company,
          jobDescription: data.jobDescription,
          responsibilities: data.responsibilities,
          qualifications: data.qualifications,
          employmentType: data.employmentType,
          salaryRange: data.salaryRange,
          applicationDeadline: data.applicationDeadline,
          active: data.active,
        }
      });
  
      return NextResponse.json(job, { status: 201 });
    } catch (error) {
      console.error('Error creating job:', error); // Log error for debugging
      return NextResponse.json({ error: 'Error creating job' }, { status: 500 });
    }
  }