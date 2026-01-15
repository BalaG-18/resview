'use server';

/**
 * @fileOverview A skill gap analysis AI agent.
 *
 * - skillGapAnalysis - A function that handles the skill gap analysis process.
 * - SkillGapAnalysisInput - The input type for the skillGapAnalysis function.
 * - SkillGapAnalysisOutput - The return type for the skillGapAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SkillGapAnalysisInputSchema = z.object({
  resumeText: z.string().describe('The text content of the resume.'),
  jobTitle: z.string().describe('The title of the job role.'),
});
export type SkillGapAnalysisInput = z.infer<typeof SkillGapAnalysisInputSchema>;

const SkillGapAnalysisOutputSchema = z.object({
  skillGaps: z
    .array(z.string())
    .describe('The gaps between the skills listed in the resume and the skills likely required for the job role.'),
});
export type SkillGapAnalysisOutput = z.infer<typeof SkillGapAnalysisOutputSchema>;

export async function skillGapAnalysis(input: SkillGapAnalysisInput): Promise<SkillGapAnalysisOutput> {
  return skillGapAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'skillGapAnalysisPrompt',
  input: {schema: SkillGapAnalysisInputSchema},
  output: {schema: SkillGapAnalysisOutputSchema},
  prompt: `You are an expert career advisor. You will analyze the resume and a job title to identify skill gaps.

  Resume:
  {{resumeText}}

  Job Title:
  {{jobTitle}}

  Identify the skills that would typically be required for the given job title that are not adequately demonstrated or mentioned in the resume. List these skill gaps in bullet points.
  `,
});

const skillGapAnalysisFlow = ai.defineFlow(
  {
    name: 'skillGapAnalysisFlow',
    inputSchema: SkillGapAnalysisInputSchema,
    outputSchema: SkillGapAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
