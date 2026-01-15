# Resview




## Project Overview

Resview is a modern web application designed to bridge the gap between job seekers and their dream careers. It leverages the power of Google's Gemini AI to provide instant, comprehensive, and actionable feedback on a user's resume. By simply uploading a resume and specifying a target job title, users receive a detailed analysis that helps them understand their strengths, weaknesses, and a clear path toward improving their qualifications.

## ✨ Features

-   **AI-Powered Resume Scoring:** Get an objective score from 0 to 100 on how well your resume aligns with the typical requirements of your target job.
-   **Skill Gap Analysis:** The AI identifies crucial skills that are expected for the role but are missing from your resume.
-   **Role Match Summary:** Understand your resume's key strengths and weaknesses in relation to the job you're aiming for.
-   **Personalized Recommendations:** Receive a targeted list of suggested online courses, articles, and practice resources to help bridge identified skill gaps.

## System Architecture

The application is built on a modern, serverless architecture that is both scalable and efficient.

-   **Frontend:** A client-side application built with **Next.js** and **React**. It provides a responsive and interactive user interface for uploading resumes and viewing the analysis results.
-   **Backend:** **Next.js API Routes** serve as the backend, handling requests from the client. An API endpoint (`/api/analyze`) receives the resume and job title, orchestrates the AI analysis, and returns the results.
-   **AI Service Layer:** The core AI logic is managed by **Genkit**, a framework for building production-ready AI applications. Separate, modular Genkit "flows" are defined for each piece of the analysis (scoring, gap analysis, etc.), making the system easy to maintain and extend. These flows interact directly with the **Google Gemini model** to generate insights.

## 🚀 Technology Stack

-   **Framework:** [Next.js](https://nextjs.org/) (with App Router)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
-   **AI Integration:** [Genkit (Google AI)](https://firebase.google.com/docs/genkit)
-   **PDF Parsing:** [pdf-parse](https://www.npmjs.com/package/pdf-parse)
-   **Deployment:** [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)

## Workflow

1.  **User Interaction:** The user visits the homepage, uploads their resume (in PDF format), and enters their desired job title into the form.
2.  **API Request:** Upon submission, the frontend sends the file and job title to the backend `/api/analyze` endpoint using `FormData`.
3.  **PDF Processing:** The backend receives the request, extracts the PDF file, and uses the `pdf-parse` library to convert its content into plain text.
4.  **Concurrent AI Analysis:** The server then invokes four distinct Genkit flows concurrently to maximize efficiency:
    -   `skillGapAnalysis`: Identifies missing skills.
    -   `resumeScore`: Calculates a score out of 100.
    -   `matchResumeToJobRole`: Generates a summary of the resume's fitness for the role.
    -   `resourceRecommendation`: Suggests learning resources based on the identified skill gaps.
5.  **Structured Output:** Each AI flow is prompted to return a structured JSON object, ensuring predictable and reliable data.
6.  **Result Aggregation:** The backend gathers the results from all flows and combines them into a single `AnalysisResult` object.
7.  **Response and Display:** The combined result is sent back to the client, which then navigates to the `/results` page to display the complete analysis in a user-friendly dashboard.

## Resume Matching Logic

The core of Resview's analysis relies on sophisticated AI prompting. Instead of using a static checklist, we instruct the Gemini model to act as an "expert resume scorer" or "expert career advisor." We provide it with the resume text and the target job title and ask it to infer the likely skills and qualifications for that role. This dynamic approach allows the AI to handle a vast range of job titles and industries without being explicitly trained on each one. It analyzes the resume against this inferred job description to find gaps, score relevance, and generate summaries.

## Recommendation Engine

The recommendation engine is a Genkit flow that takes the `skillGaps` identified by the `skillGapAnalysis` flow as its primary input. It is prompted to act as an AI assistant that finds relevant learning materials. It uses the identified gaps and the target job title to search the internet for high-quality, relevant resources such as online courses, tutorials, articles, and practice projects. The output is a list of actionable recommendations that empower the user to directly address their weaknesses.

## Future Enhancements

-   **Interactive Dashboard:** Allow users to click on a skill gap and see a more detailed breakdown and more specific resources.
-   **Resume Improvement Suggestions:** Provide direct suggestions on how to rephrase bullet points or restructure the resume for better impact.
-   **Support for More File Types:** Extend functionality to support `.docx` and other common document formats.
-   **User Accounts & History:** Implement user authentication to allow users to save and track their analysis history over time.
