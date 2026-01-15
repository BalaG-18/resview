'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { AnalysisResult } from '@/lib/types';
import AppHeader from '@/components/app-header';
import LoadingSpinner from '@/components/loading-spinner';
import ResultsDashboard from '@/components/results-dashboard';
import { Button } from '@/components/ui/button';

export default function ResultsPage() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedResult = sessionStorage.getItem('analysisResult');
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }
    setIsLoading(false);
  }, []);

  const handleAnalyzeAnother = () => {
    sessionStorage.removeItem('analysisResult');
    router.push('/');
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader />
      <main className="flex-1 px-4 py-8 md:px-8 md:py-12">
        <div className="mx-auto w-full max-w-5xl">
          {isLoading ? (
            <div className="flex h-[60vh] items-center justify-center">
              <LoadingSpinner className="h-12 w-12" />
            </div>
          ) : result ? (
            <>
              <div className="mb-8 flex items-center justify-between">
                <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                  Resume Analysis Results
                </h1>
                <Button variant="link" onClick={handleAnalyzeAnother}>
                  Analyze Another
                </Button>
              </div>
              <ResultsDashboard result={result} />
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-semibold">No analysis found.</h2>
              <p className="mt-2 text-muted-foreground">
                Please go back to the homepage to analyze a resume.
              </p>
              <Button onClick={() => router.push('/')} className="mt-4">
                Go to Homepage
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
