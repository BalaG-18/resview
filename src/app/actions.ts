'use server';

import {
  matchResumeToJobRole,
} from '@/ai/flows/job-role-matching';
import {
  resourceRecommendation,
} from '@/ai/flows/resource-recommendation';
import { resumeScore } from '@/ai/flows/resume-score';
import {
  skillGapAnalysis,
} from '@/ai/flows/skill-gap-analysis';
import type { AnalysisResult } from '@/lib/types';
import pdf from 'pdf-parse';

interface AnalyzeResumeInput {
  resumeData: Buffer;
  jobTitle: string;
}

export async function analyzeResume({
  resumeData,
  jobTitle,
}: AnalyzeResumeInput): Promise<{ data: AnalysisResult | null; error: string | null; }> {
  try {
    const pdfData = await pdf(resumeData);
    const resumeText = pdfData.text;

    // First, perform skill gap analysis as recommendations depend on it.
    const skillGapResult = await skillGapAnalysis({
      resumeText,
      jobTitle,
    });
    
    // Then, run the other analyses in parallel.
    const [scoreResult, matchResult, recommendationResult] = await Promise.all([
      resumeScore({ resumeText, jobTitle }),
      matchResumeToJobRole({ resumeText, jobTitle }),
      resourceRecommendation({
        skillGaps: skillGapResult.skillGaps,
        jobTitle: jobTitle,
      }),
    ]);

    const combinedResult: AnalysisResult = {
      ...skillGapResult,
      ...scoreResult,
      ...matchResult,
      ...recommendationResult,
    };
    
    return { data: combinedResult, error: null };

  } catch (error) {
    console.error('Error during resume analysis:', error);
    // Return a user-friendly error message
    return { data: null, error: 'Failed to analyze the resume. The PDF might be corrupted or the AI model may be temporarily unavailable. Please try again later.' };
  }
}
