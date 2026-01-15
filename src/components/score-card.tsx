'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface ScoreCardProps {
  score: number;
  reasoning: string; // Not used in this visual, but kept for type consistency
}

const ScoreCard = ({ score }: ScoreCardProps) => {
    const getScoreCategory = (s: number) => {
        if (s >= 80) return "Excellent";
        if (s >= 60) return "Good";
        if (s >= 40) return "Fair";
        return "Needs Improvement";
    }

  const scoreColor =
    score > 80
      ? 'text-green-500'
      : score > 60
      ? 'text-yellow-500'
      : score > 40
      ? 'text-orange-500'
      : 'text-red-500';

  return (
    <Card className="flex h-full flex-col bg-primary/10 border-primary/50">
      <CardHeader>
        <div className="flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline text-xl">Overall Score</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col items-start justify-center">
        <div>
            <span className={`font-headline text-5xl font-bold ${scoreColor}`}>
              {score}
            </span>
            <span className="text-2xl text-muted-foreground">/100</span>
        </div>
        <p className={`mt-1 text-sm font-medium ${scoreColor}`}>{getScoreCategory(score)}</p>
      </CardContent>
    </Card>
  );
};

export default ScoreCard;
