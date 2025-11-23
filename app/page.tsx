'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getStats, getQuizzes } from '@/lib/storage';
import { UserStats, Quiz } from '@/types';
import StatsGraph from '@/components/StatsGraph';
import { Flame, CheckCircle, Brain, ArrowRight, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [recentQuizzes, setRecentQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    setStats(getStats());
    const allQuizzes = getQuizzes();
    // Sort by creation date desc and take top 3
    setRecentQuizzes(allQuizzes.sort((a, b) => b.createdAt - a.createdAt).slice(0, 3));
  }, []);

  if (!stats) return null; // Hydration fix

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white">Dashboard</h2>
          <p className="text-gray-400 mt-1">Welcome back! Ready to forge your mind?</p>
        </div>
        <Link
          href="/import"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus size={18} />
          New Quiz
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={Flame}
          label="Day Streak"
          value={stats.streakDays.toString()}
          color="text-orange-500"
          bg="bg-orange-500/10"
        />
        <StatCard
          icon={CheckCircle}
          label="Questions Solved"
          value={stats.totalQuestionsAnswered.toString()}
          color="text-green-500"
          bg="bg-green-500/10"
        />
        <StatCard
          icon={Brain}
          label="Quizzes Taken"
          value={stats.totalQuizzesTaken.toString()}
          color="text-violet-500"
          bg="bg-violet-500/10"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-semibold text-white">Topic Mastery</h3>
          <div className="glass-panel p-6 rounded-2xl h-[350px] flex flex-col">
            <div className="flex-1 min-h-0">
              <StatsGraph stats={stats} />
            </div>
          </div>
        </div>

        {/* Recent Quizzes Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">Recent Quizzes</h3>
            <Link href="/history" className="text-sm text-blue-400 hover:text-blue-300">View All</Link>
          </div>

          <div className="space-y-3">
            {recentQuizzes.length === 0 ? (
              <div className="text-gray-500 text-center py-10 glass-panel rounded-xl">
                No quizzes yet.
              </div>
            ) : (
              recentQuizzes.map((quiz, i) => (
                <motion.div
                  key={quiz.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/quiz/${quiz.id}`} className="block group">
                    <div className="glass-panel p-4 rounded-xl hover:bg-white/5 transition-colors border-l-4 border-l-blue-500">
                      <h4 className="font-medium text-white group-hover:text-blue-400 transition-colors truncate">
                        {quiz.title}
                      </h4>
                      <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
                        <span>{quiz.questions.length} Questions</span>
                        <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, bg }: any) {
  return (
    <div className="glass-panel p-6 rounded-2xl flex items-center gap-4">
      <div className={`p-3 rounded-xl ${bg} ${color}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-gray-400 text-sm font-medium">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}
