import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { XCircle, Target } from 'lucide-react';

interface GapsCardProps {
  skillGaps: string[];
}

const GapsCard = ({ skillGaps }: GapsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
            <XCircle className="h-6 w-6 text-destructive" />
            <CardTitle className="font-headline text-xl">Skill Gaps</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {skillGaps.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skillGaps.map((gap, index) => (
              <Badge key={index} variant="destructive" className="bg-destructive/20 text-destructive-foreground hover:bg-destructive/30">
                {gap}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No significant skill gaps identified. Great job!
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default GapsCard;
