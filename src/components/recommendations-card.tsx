import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

interface RecommendationsCardProps {
  recommendations: string[];
}

const RecommendationsCard = ({ recommendations }: RecommendationsCardProps) => {
  return (
    <Card className="bg-accent/10 border-accent">
      <CardHeader>
         <div className="flex items-center gap-3">
            <Lightbulb className="h-6 w-6 text-accent" />
            <CardTitle className="font-headline text-xl">Recommendations</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {recommendations.length > 0 ? (
          <ul className="space-y-4">
            {recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent/80 text-background">
                  <span className="text-xs font-bold">{index + 1}</span>
                </div>
                <span className="text-sm pt-0.5">{rec}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">
            No specific recommendations needed based on the analysis.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default RecommendationsCard;
