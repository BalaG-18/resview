import type { JobRoleMatchingOutput } from '@/ai/flows/job-role-matching';
import type { ResourceRecommendationOutput } from '@/ai/flows/resource-recommendation';
import type { ResumeScoreOutput } from '@/ai/flows/resume-score';
import type { SkillGapAnalysisOutput } from '@/ai/flows/skill-gap-analysis';

export type AnalysisResult = JobRoleMatchingOutput &
  ResourceRecommendationOutput &
  ResumeScoreOutput &
  SkillGapAnalysisOutput;
