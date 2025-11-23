import { Quiz, QuizResult, UserStats } from '@/types';

const STORAGE_KEYS = {
    QUIZZES: 'ai-learning-app-quizzes',
    RESULTS: 'ai-learning-app-results',
    STATS: 'ai-learning-app-stats',
};

// --- Quizzes ---

export const getQuizzes = (): Quiz[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.QUIZZES);
    return data ? JSON.parse(data) : [];
};

export const saveQuiz = (quiz: Quiz): void => {
    const quizzes = getQuizzes();
    quizzes.push(quiz);
    localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(quizzes));
};

export const deleteQuiz = (id: string): void => {
    const quizzes = getQuizzes().filter((q) => q.id !== id);
    localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(quizzes));
};

export const getQuizById = (id: string): Quiz | undefined => {
    return getQuizzes().find((q) => q.id === id);
};

// --- Results ---

export const getResults = (): QuizResult[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.RESULTS);
    return data ? JSON.parse(data) : [];
};

export const saveResult = (result: QuizResult): void => {
    const results = getResults();
    results.push(result);
    localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(results));
    updateStats(result);
};

// --- Stats ---

export const getStats = (): UserStats => {
    if (typeof window === 'undefined') return {
        totalQuizzesTaken: 0,
        totalQuestionsAnswered: 0,
        totalCorrectAnswers: 0,
        streakDays: 0,
        lastActivityDate: 0,
        topicMastery: {},
    };
    const data = localStorage.getItem(STORAGE_KEYS.STATS);
    return data ? JSON.parse(data) : {
        totalQuizzesTaken: 0,
        totalQuestionsAnswered: 0,
        totalCorrectAnswers: 0,
        streakDays: 0,
        lastActivityDate: 0,
        topicMastery: {},
    };
};

const updateStats = (result: QuizResult): void => {
    const stats = getStats();
    const now = Date.now();

    // Update basic counts
    stats.totalQuizzesTaken += 1;
    stats.totalQuestionsAnswered += result.totalQuestions;
    stats.totalCorrectAnswers += result.score;

    // Update streak
    const lastDate = new Date(stats.lastActivityDate);
    const currentDate = new Date(now);

    // Reset time to compare dates only
    lastDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
        stats.streakDays += 1;
    } else if (diffDays > 1) {
        stats.streakDays = 1; // Reset if missed a day
    } else if (stats.streakDays === 0) {
        stats.streakDays = 1; // First day
    }

    stats.lastActivityDate = now;

    // Update Topic Mastery (Simple moving average for now)
    const currentMastery = stats.topicMastery[result.topic] || 0;
    const quizPercentage = (result.score / result.totalQuestions) * 100;
    // Weighted average: 70% old, 30% new to smooth changes
    stats.topicMastery[result.topic] = Math.round((currentMastery * 0.7) + (quizPercentage * 0.3));

    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
};
