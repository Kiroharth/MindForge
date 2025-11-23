export type QuestionType = 'short-answer' | 'multiple-choice';

export interface Question {
  id: string;
  text: string; // Markdown/LaTeX supported
  type: QuestionType;
  options?: string[]; // For multiple choice
  correctAnswer: string;
  explanation?: string; // Markdown/LaTeX supported
  graph?: string; // Function string for function-plot, e.g. "x^2"
}

export interface Quiz {
  id: string;
  title: string;
  topic: string;
  createdAt: number;
  questions: Question[];
}

export interface QuizResult {
  id: string;
  quizId: string;
  quizTitle: string;
  topic: string;
  date: number;
  score: number;
  totalQuestions: number;
  answers: Record<string, {
    userAnswer: string;
    isCorrect: boolean;
  }>;
}

export interface UserStats {
  totalQuizzesTaken: number;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  streakDays: number;
  lastActivityDate: number; // timestamp
  topicMastery: Record<string, number>; // topic -> percentage (0-100)
}
