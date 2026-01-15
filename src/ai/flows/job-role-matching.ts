'use server';

/**
 * @fileOverview This file defines a Genkit flow for matching a resume against a job title.
 *
 * It exports:
 * - `matchResumeToJobRole`: The main function to initiate the matching process.
 * - `JobRoleMatchingInput`: The input type for the `matchResumeToJobRole` function.
 * - `JobRoleMatchingOutput`: The output type for the `matchResumeToJobRole` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const JobRoleMatchingInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text content of the resume.'),
  jobTitle: z.string().describe('The job title to match against the resume.'),
});

export type JobRoleMatchingInput = z.infer<typeof JobRoleMatchingInputSchema>;

const JobRoleMatchingOutputSchema = z.object({
  matchSummary: z
    .string()
    .describe(
      'A summary of how well the resume matches the job role, including key strengths and weaknesses.'
    ),
});

export type JobRoleMatchingOutput = z.infer<typeof JobRoleMatchingOutputSchema>;

export async function matchResumeToJobRole(
  input: JobRoleMatchingInput
): Promise<JobRoleMatchingOutput> {
  return jobRoleMatchingFlow(input);
}

const jobRoleMatchingPrompt = ai.definePrompt({
  name: 'jobRoleMatchingPrompt',
  input: {schema: JobRoleMatchingInputSchema},
  output: {schema: JobRoleMatchingOutputSchema},
  prompt: `You are an expert resume matcher. Your task is to analyze a resume and determine how well it matches a given job role. You will be given a job title, and you should infer the likely requirements for that role.

Resume Text: {{{resumeText}}}
Job Title: {{{jobTitle}}}

Provide a concise summary of the match, highlighting the key strengths and weaknesses of the resume in relation to a typical job description for the given title. Focus on the skills and experience mentioned in the resume.`,
});

const jobRoleMatchingFlow = ai.defineFlow(
  {
    name: 'jobRoleMatchingFlow',
    inputSchema: JobRoleMatchingInputSchema,
    outputSchema: JobRoleMatchingOutputSchema,
  },
  async input => {
    const {output} = await jobRoleMatchingPrompt(input);
    return output!;
  }
);
