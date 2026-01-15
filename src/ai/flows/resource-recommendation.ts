'use server';

/**
 * @fileOverview Resource recommendation flow for bridging skill gaps.
 *
 * - resourceRecommendation - A function that recommends resources based on skill gaps.
 * - ResourceRecommendationInput - The input type for the resourceRecommendation function.
 * - ResourceRecommendationOutput - The return type for the resourceRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResourceRecommendationInputSchema = z.object({
  skillGaps: z
    .array(z.string())
    .describe('An array of skill gaps identified in the resume.'),
  jobTitle: z.string().describe('The job title for which recommendations are needed.'),
});

export type ResourceRecommendationInput = z.infer<typeof ResourceRecommendationInputSchema>;

const ResourceRecommendationOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('An array of recommended resources (courses, websites, etc.).'),
});

export type ResourceRecommendationOutput = z.infer<typeof ResourceRecommendationOutputSchema>;

export async function resourceRecommendation(input: ResourceRecommendationInput): Promise<ResourceRecommendationOutput> {
  return resourceRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'resourceRecommendationPrompt',
  input: {schema: ResourceRecommendationInputSchema},
  output: {schema: ResourceRecommendationOutputSchema},
  prompt: `You are an AI assistant designed to provide resource recommendations for bridging skill gaps.

  Based on the provided skill gaps and job title, recommend up to 10 relevant courses, websites, or practice resources.
  Use internet searches to find the most relevant learning resources.

  Skill Gaps:
  {{#each skillGaps}}- {{{this}}}\n{{/each}}

  Job Title: {{{jobTitle}}}

  Recommendations:
  `, // Ensure the AI includes "Recommendations:" in its reply
});

const resourceRecommendationFlow = ai.defineFlow(
  {
    name: 'resourceRecommendationFlow',
    inputSchema: ResourceRecommendationInputSchema,
    outputSchema: ResourceRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {recommendations: output?.recommendations || []};
  }
);
