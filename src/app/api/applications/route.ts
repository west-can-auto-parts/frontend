// src/app/api/job-applications/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const jobApplications = await prisma.jobApplication.findMany();
    return NextResponse.json({ jobApplications });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch job applications.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
    const { 
      applicantName, 
      applicantEmail, 
      phone, 
      resume, 
      coverLetter, 
      positionApplied, 
      location, 
      experienceYears 
    } = await request.json();
    try {
      const newJobApplication = await prisma.jobApplication.create({
        data: {
          applicantName,
          applicantEmail,
          phone,
          resume,
          coverLetter,
          positionApplied,
          location,
          experienceYears: parseInt(experienceYears, 10)
          // Default status will be 'Applied'
        }
      });
      return NextResponse.json({ newJobApplication }, { status: 201 });
    } catch (error) {
      console.log(error)
      return NextResponse.json({ error: 'Failed to create job application.' }, { status: 500 });
    }
  }