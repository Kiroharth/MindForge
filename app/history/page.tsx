'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getResults } from '@/lib/storage';
import { QuizResult } from '@/types';
import { Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

export default function HistoryPage() {
    const [results, setResults] = useState<QuizResult[]>([]);

    useEffect(() => {
        const allResults = getResults();
        // Sort by date desc
        setResults(allResults.sort((a, b) => b.date - a.date));
    }, []);

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold text-white">History</h2>
                <p className="text-gray-400">Your journey of mastery, recorded.</p>
            </div>

            <div className="space-y-4">
                {results.length === 0 ? (
                    <div className="text-center py-20 glass-panel rounded-2xl flex flex-col items-center gap-4">
                        <div className="p-4 bg-white/5 rounded-full">
                            <CheckCircle size={32} className="text-gray-600" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-gray-400 text-lg font-medium">No history yet</p>
                            <p className="text-gray-500 text-sm">Complete quizzes to see your progress here.</p>
                        </div>
                        <Link href="/import" className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg transition-colors mt-2">
                            Start a new quiz
                        </Link>
                    </div>
                ) : (
                    results.map((result, i) => (
                        <motion.div
                            key={result.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="glass-panel p-6 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                            <div className="space-y-1">
                                <h3 className="text-xl font-semibold text-white">{result.quizTitle}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={14} />
                                        {format(result.date, 'MMM d, yyyy h:mm a')}
                                    </span>
                                    <span className="bg-white/5 px-2 py-0.5 rounded text-gray-300">
                                        {result.topic}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-white">
                                        {Math.round((result.score / result.totalQuestions) * 100)}%
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        {result.score} / {result.totalQuestions} Correct
                                    </div>
                                </div>

                                {/* Future: View Details Link */}
                                {/* <Link href={`/history/${result.id}`} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <ArrowRight size={20} className="text-gray-400" />
                </Link> */}
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}
