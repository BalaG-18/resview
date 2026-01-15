'use server';
/**
 * @fileOverview A resume scoring AI agent.
 *
 * - resumeScore - A function that handles the resume scoring process.
 * - ResumeScoreInput - The input type for the resumeScore function.
 * - ResumeScoreOutput - The return type for the resumeScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResumeScoreInputSchema = z.object({
  resumeText: z.string().describe('The text content of the resume.'),
  jobTitle: z.string().describe('The job title to match the resume against.'),
});
export type ResumeScoreInput = z.infer<typeof ResumeScoreInputSchema>;

const ResumeScoreOutputSchema = z.object({
  score: z.number().describe('The resume score, from 0 to 100, based on its relevance to the job title.'),
  reasoning: z.string().describe('The reasoning behind the assigned score.'),
});
export type ResumeScoreOutput = z.infer<typeof ResumeScoreOutputSchema>;

export async function resumeScore(input: ResumeScoreInput): Promise<ResumeScoreOutput> {
  return resumeScoreFlow(input);
}

const prompt = ai.definePrompt({
  name: 'resumeScorePrompt',
  input: {schema: ResumeScoreInputSchema},
  output: {schema: ResumeScoreOutputSchema},
  prompt: `You are an expert resume scorer. You will receive a resume and a job title. You will score the resume based on its relevance to the likely requirements for that job title.

Resume:
{{resumeText}}

Job Title:
{{jobTitle}}

Consider the coverage of likely requirements, quality of skills descriptions and other aspects of fitness for the role. Return a score from 0 to 100 and explain your reasoning.`,
});

const resumeScoreFlow = ai.defineFlow(
  {
    name: 'resumeScoreFlow',
    inputSchema: ResumeScoreInputSchema,
    outputSchema: ResumeScoreOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
