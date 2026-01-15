'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import AppHeader from '@/components/app-header';
import ResumeForm from '@/components/resume-form';
import LoadingSpinner from '@/components/loading-spinner';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const handleAnalysis = async (resumeFile: File, jobTitle: string) => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('resumeFile', resumeFile);
    formData.append('jobTitle', jobTitle);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const analysisData = await response.json();
      
      if (!response.ok) {
        throw new Error(analysisData.error || 'Analysis failed.');
      }
      
      // Store result in sessionStorage and navigate
      sessionStorage.setItem('analysisResult', JSON.stringify(analysisData));
      router.push('/results');

    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unexpected error occurred.';
      setError(errorMessage);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader />
      <main className="flex-1 px-4 py-8 md:px-8 md:py-12">
        <div className="mx-auto w-full max-w-5xl">
          <section className="text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Get Your Resume, Reviewed.
            </h1>
            <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
              Upload your resume and enter a job title to get an instant,
              AI-powered analysis. Score your resume, find skill gaps, and get
              custom recommendations.
            </p>
          </section>

          <section className="mt-8">
            {isLoading ? (
               <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed bg-card p-8 text-center min-h-[400px]">
                <LoadingSpinner className="h-12 w-12" />
                <h3 className="font-headline text-2xl font-semibold">
                  Analyzing...
                </h3>
                <p className="text-muted-foreground">
                  Our AI is reviewing your documents. This might take a moment.
                </p>
              </div>
            ) : error ? (
                <Card className="border-destructive bg-destructive/10">
                 <CardContent className="flex flex-col items-center justify-center gap-4 p-8 text-center text-destructive">
                   <AlertTriangle className="h-12 w-12" />
                   <h3 className="font-headline text-2xl font-semibold">
                     Analysis Failed
                   </h3>
                   <p className="text-destructive/80">{error}</p>
                 </CardContent>
               </Card>
            ) : (
              <ResumeForm onSubmit={handleAnalysis} isLoading={isLoading} />
            )}
          </section>
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        
      </footer>
    </div>
  );
}
