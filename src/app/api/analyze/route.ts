import { NextResponse } from 'next/server';
import { analyzeResume } from '@/app/actions';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const resumeFile = formData.get('resumeFile') as File | null;
    const jobTitle = formData.get('jobTitle') as string | null;

    if (!resumeFile || !jobTitle) {
      return NextResponse.json(
        { error: 'Missing resume file or job title.' },
        { status: 400 }
      );
    }
    
    const arrayBuffer = await resumeFile.arrayBuffer();
    const resumeData = Buffer.from(arrayBuffer);

    const result = await analyzeResume({ resumeData, jobTitle });

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error('API Error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred.';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
