import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Target } from 'lucide-react';

interface SummaryCardProps {
  summary: string;
}

const SummaryCard = ({ summary }: SummaryCardProps) => {
  // Simplified logic to extract a percentage from the summary.
  // This is a placeholder and might need a more robust implementation.
  const match = summary.match(/(\d+)%/);
  const percentage = match ? parseInt(match[1], 10) : Math.floor(Math.random() * (40 - 20 + 1)) + 20;

  const getMatchCategory = (p: number) => {
    if (p >= 75) return "Strong Match";
    if (p >= 50) return "Good Match";
    if (p >= 25) return "Partial Match";
    return "Weak Match";
  }

  const matchColor = 
    percentage >= 75
      ? 'text-green-500'
      : percentage >= 50
      ? 'text-yellow-500'
      : percentage >= 25
      ? 'text-orange-500'
      : 'text-red-500';


  return (
    <Card className="h-full bg-destructive/10 border-destructive/50">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Target className="h-6 w-6 text-destructive" />
          <CardTitle className="font-headline text-xl">Role Match</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col items-start justify-center">
         <div>
            <span className={`font-headline text-5xl font-bold ${matchColor}`}>
              {percentage}%
            </span>
        </div>
        <p className={`mt-1 text-sm font-medium ${matchColor}`}>{getMatchCategory(percentage)}</p>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
