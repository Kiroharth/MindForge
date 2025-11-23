# MindForge - AI Learning Companion

MindForge is a modern, interactive learning application designed to help you practice math and other subjects using AI-generated content. It transforms static text output from AI models (like ChatGPT, Gemini, Claude) into interactive quizzes with tracking and analytics.

## Features

- **AI Import**: Paste JSON output from any AI to instantly generate quizzes.
- **Interactive Practice**: Clean, distraction-free interface for solving problems.
- **LaTeX Support**: Beautiful rendering of mathematical formulas.
- **Progress Tracking**: Track your streaks, questions solved, and topic mastery.
- **Dark Mode**: Premium, eye-friendly dark interface.
- **PWA Ready**: Installable on Windows and Android.

## How to Use

1.  **Generate Content**: Ask your favorite AI (ChatGPT/Gemini) to generate questions.
    *   **Prompt**: "Generate 5 practice questions about [Topic] in JSON format. Each object should have 'question', 'answer' (short text), and 'explanation' fields."
2.  **Import**: Open MindForge, go to "Import Quiz", enter the topic, and paste the JSON output.
3.  **Practice**: Solve the questions. The app supports both short answers and multiple choice (if provided in JSON).
4.  **Track**: View your progress on the Dashboard.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + Custom CSS Variables
- **State**: LocalStorage (No backend required)
- **Math**: KaTeX
- **Icons**: Lucide React

## Getting Started

1.  Clone the repository.
2.  Run `npm install`.
3.  Run `npm run dev`.
4.  Open `http://localhost:3000`.
