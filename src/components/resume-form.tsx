'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, UploadCloud, File as FileIcon } from 'lucide-react';
import LoadingSpinner from './loading-spinner';
import { useMemo } from 'react';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf'];

const formSchema = z.object({
  resumeFile: z
    .instanceof(File, { message: 'A resume file is required.' })
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      'Only .pdf files are accepted.'
    ),
  jobTitle: z.string().min(2, {
    message: 'Job title must be at least 2 characters.',
  }),
});

type ResumeFormValues = z.infer<typeof formSchema>;

interface ResumeFormProps {
  onSubmit: (resumeFile: File, jobTitle: string) => Promise<void>;
  isLoading: boolean;
}

const ResumeForm = ({ onSubmit, isLoading }: ResumeFormProps) => {
  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: '',
    },
  });

  const resumeFile = form.watch('resumeFile');
  const fileName = useMemo(() => resumeFile?.name, [resumeFile]);

  const handleFormSubmit = (values: ResumeFormValues) => {
    onSubmit(values.resumeFile, values.jobTitle);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Enter Your Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <FormField
                control={form.control}
                name="resumeFile"
                render={({ field: { onChange, onBlur, name, ref } }) => (
                  <FormItem>
                    <FormLabel>Your Resume (PDF)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="file"
                          id="resumeFile"
                          className="absolute h-full w-full cursor-pointer opacity-0"
                          accept={ACCEPTED_FILE_TYPES.join(',')}
                          onChange={(e) => onChange(e.target.files?.[0])}
                          onBlur={onBlur}
                          name={name}
                          ref={ref}
                          disabled={isLoading}
                        />
                        <label
                          htmlFor="resumeFile"
                          className="flex h-[200px] cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-input bg-background text-muted-foreground transition-colors hover:border-primary hover:bg-accent"
                        >
                          {fileName ? (
                            <div className="flex flex-col items-center text-center">
                              <FileIcon className="mb-4 h-12 w-12 text-primary" />
                              <p className="font-semibold text-foreground">
                                {fileName}
                              </p>
                              <p className="text-xs">
                                Click or drag to replace
                              </p>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center text-center">
                              <UploadCloud className="mb-4 h-12 w-12" />
                              <p className="font-semibold text-foreground">
                                Click to upload or drag & drop
                              </p>
                              <p className="text-xs">PDF only (max 5MB)</p>
                            </div>
                          )}
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Job Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Senior Software Engineer"
                          {...field}
                          suppressHydrationWarning
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <Button type="submit" size="lg" disabled={isLoading} suppressHydrationWarning>
                {isLoading ? (
                  <>
                    <LoadingSpinner className="mr-2 h-4 w-4" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Analyze
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ResumeForm;
