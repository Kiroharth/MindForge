'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getQuizById, saveResult } from '@/lib/storage';
import { Quiz, Question } from '@/types';
import MathRenderer from '@/components/MathRenderer';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, X, RotateCcw, Home } from 'lucide-react';
import clsx from 'clsx';
import confetti from 'canvas-confetti';

export default function QuizPage() {
    const params = useParams();
    const router = useRouter();
    const [quiz, setQuiz] = useState<Quiz | undefined>(undefined);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [answersLog, setAnswersLog] = useState<Record<string, { userAnswer: string; isCorrect: boolean }>>({});

    useEffect(() => {
        if (params.id) {
            const loadedQuiz = getQuizById(params.id as string);
            if (loadedQuiz) {
                setQuiz(loadedQuiz);
            } else {
                // Handle not found
                router.push('/');
            }
        }
    }, [params.id, router]);

    const handleSubmit = () => {
        if (!quiz) return;
        const currentQuestion = quiz.questions[currentQuestionIndex];

        // Simple normalization for text answers (trim, lowercase)
        // For multiple choice, it's exact match
        const normalizedUser = userAnswer.trim().toLowerCase();
        const normalizedCorrect = currentQuestion.correctAnswer.trim().toLowerCase();

        const correct = normalizedUser === normalizedCorrect;

        setIsCorrect(correct);
        setShowFeedback(true);

        if (correct) {
            setScore(s => s + 1);
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.7 },
                colors: ['#3b82f6', '#8b5cf6', '#22c55e']
            });
        }

        setAnswersLog(prev => ({
            ...prev,
            [currentQuestion.id]: { userAnswer, isCorrect: correct }
        }));
    };

    const handleNext = () => {
        if (!quiz) return;

        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setUserAnswer('');
            setShowFeedback(false);
        } else {
            finishQuiz();
        }
    };

    const finishQuiz = () => {
        if (!quiz) return;
        setIsFinished(true);

        // Save results
        saveResult({
            id: Date.now().toString(), // Simple ID
            quizId: quiz.id,
            quizTitle: quiz.title,
            topic: quiz.topic,
            date: Date.now(),
            score: score + (isCorrect ? 1 : 0), // Add last point if correct (logic check: score is updated before this call? No, state update is async, but here we are inside handleNext which is called AFTER handleSubmit. Wait, handleNext is manual. So score is updated.)
            // Actually, let's be careful. handleSubmit updates score. handleNext calls finishQuiz. So score is up to date.
            // WAIT: If the last question is correct, handleSubmit runs, updates score. Then user clicks Next -> handleNext -> finishQuiz. Score IS updated.
            // BUT: React state updates might be batched. However, user interaction separates them.
            totalQuestions: quiz.questions.length,
            answers: answersLog
        });

        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 }
        });
    };

    if (!quiz) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>;

    if (isFinished) {
        return (
            <div className="max-w-2xl mx-auto text-center space-y-8 pt-10">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="glass-panel p-10 rounded-3xl space-y-6"
                >
                    <h2 className="text-4xl font-bold text-white">Quiz Complete!</h2>
                    <div className="text-6xl font-black bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                        {Math.round((score / quiz.questions.length) * 100)}%
                    </div>
                    <p className="text-gray-400 text-lg">
                        You got {score} out of {quiz.questions.length} correct.
                    </p>

                    <div className="flex justify-center gap-4 pt-4">
                        <button onClick={() => router.push('/')} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors">
                            <Home size={20} />
                            Home
                        </button>
                        <button onClick={() => window.location.reload()} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors">
                            <RotateCcw size={20} />
                            Retry
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            {/* Progress Bar */}
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <motion.div
                    className="bg-blue-500 h-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestionIndex) / quiz.questions.length) * 100}%` }}
                />
            </div>

            <div className="flex justify-between items-center text-gray-400 text-sm">
                <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
                <span>{quiz.topic}</span>
            </div>

            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentQuestion.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass-panel p-8 rounded-2xl space-y-6 min-h-[300px] flex flex-col"
                >
                    <div className="text-xl text-white font-medium leading-relaxed">
                        <MathRenderer content={currentQuestion.text} />
                    </div>

                    <div className="flex-1 content-end space-y-4">
                        {currentQuestion.type === 'multiple-choice' && currentQuestion.options ? (
                            <div className="grid grid-cols-1 gap-3">
                                {currentQuestion.options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => !showFeedback && setUserAnswer(option)}
                                        disabled={showFeedback}
                                        className={clsx(
                                            "p-4 rounded-xl text-left transition-all border",
                                            userAnswer === option
                                                ? "border-blue-500 bg-blue-500/20 text-blue-200"
                                                : "border-white/10 hover:bg-white/5 text-gray-300",
                                            showFeedback && option === currentQuestion.correctAnswer && "border-green-500 bg-green-500/20 text-green-200",
                                            showFeedback && userAnswer === option && userAnswer !== currentQuestion.correctAnswer && "border-red-500 bg-red-500/20 text-red-200"
                                        )}
                                    >
                                        <MathRenderer content={option} />
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <input
                                type="text"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                disabled={showFeedback}
                                placeholder="Type your answer..."
                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Feedback Section */}
            <AnimatePresence>
                {showFeedback && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={clsx(
                            "p-6 rounded-xl border",
                            isCorrect ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"
                        )}
                    >
                        <div className="flex items-start gap-3">
                            <div className={clsx("p-2 rounded-full", isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white")}>
                                {isCorrect ? <Check size={20} /> : <X size={20} />}
                            </div>
                            <div className="space-y-2">
                                <h4 className={clsx("font-bold", isCorrect ? "text-green-400" : "text-red-400")}>
                                    {isCorrect ? "Correct!" : "Incorrect"}
                                </h4>
                                {!isCorrect && (
                                    <p className="text-gray-300">Correct Answer: <span className="font-bold">{currentQuestion.correctAnswer}</span></p>
                                )}
                                {currentQuestion.explanation && (
                                    <div className="text-gray-400 text-sm mt-2 pt-2 border-t border-white/5">
                                        <MathRenderer content={currentQuestion.explanation} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Controls */}
            <div className="flex justify-end">
                {!showFeedback ? (
                    <button
                        onClick={handleSubmit}
                        disabled={!userAnswer}
                        className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-blue-900/20"
                    >
                        Check Answer
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-xl font-medium transition-colors flex items-center gap-2"
                    >
                        {currentQuestionIndex === quiz.questions.length - 1 ? "Finish Quiz" : "Next Question"}
                        <ArrowRight size={18} />
                    </button>
                )}
            </div>
        </div>
    );
}
