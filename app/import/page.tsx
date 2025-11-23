'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { parseQuizInput } from '@/lib/parser';
import { saveQuiz } from '@/lib/storage';
import { ArrowRight, Loader2, AlertCircle, FileText, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ImportPage() {
    const router = useRouter();
    const [topic, setTopic] = useState('');
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleImport = async () => {
        if (!topic.trim() || !input.trim()) {
            setError("Please fill in both the topic and the AI output.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Simulate a small delay for better UX (parsing is instant usually)
            await new Promise(resolve => setTimeout(resolve, 500));

            const quiz = parseQuizInput(input, topic);
            saveQuiz(quiz);

            router.push(`/quiz/${quiz.id}`);
        } catch (err: any) {
            setError(err.message || "Failed to parse the input. Please check the format.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                    Import New Quiz
                </h2>
                <p className="text-gray-400">
                    Paste the output from ChatGPT, Gemini, or Claude below to generate your interactive practice session.
                </p>
            </div>

            <div className="glass-panel p-8 rounded-2xl space-y-6">
                {/* Topic Input */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Topic / Subject</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="e.g. Calculus - Derivatives"
                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <Sparkles className="absolute right-4 top-3.5 text-gray-600" size={18} />
                    </div>
                </div>

                {/* AI Output Input */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">AI Output (JSON)</label>
                    <div className="relative">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={`Paste the JSON output here...\n\nExample format:\n[\n  {\n    "question": "What is 2+2?",\n    "answer": "4",\n    "explanation": "Simple addition"\n  }\n]`}
                            className="w-full h-64 bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm placeholder:text-gray-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                        />
                        <FileText className="absolute right-4 top-4 text-gray-600" size={18} />
                    </div>
                    <p className="text-xs text-gray-500 ml-1">
                        Tip: Ask the AI to "Generate 5 questions about [Topic] in JSON format with question, answer, and explanation fields."
                    </p>
                </div>

                {/* Example Prompt Section */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2">
                            <Sparkles size={16} className="text-yellow-500" />
                            AI Prompt Template
                        </h3>
                        <button
                            onClick={() => {
                                const prompt = `Create a quiz about "${topic || "General Knowledge"}" with 5 questions.
Output strictly valid JSON only. The format must be an array of objects.
Do not include any conversational text, just the JSON array.

Structure for each object:
{
  "question": "Question text here (use $...$ for LaTeX math)",
  "type": "multiple-choice" or "short-answer",
  "options": ["Option A", "Option B", "Option C", "Option D"] (only for multiple-choice),
  "correctAnswer": "The correct answer string (must match one of the options if multiple-choice)",
  "explanation": "Brief explanation of the solution"
}

Example:
[
  {
    "question": "What is $2+2$?",
    "type": "short-answer",
    "correctAnswer": "4",
    "explanation": "Basic addition."
  }
]`;
                                navigator.clipboard.writeText(prompt);
                                alert("Detailed prompt copied to clipboard!");
                            }}
                            className="text-xs bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 px-3 py-1.5 rounded-lg transition-colors font-medium"
                        >
                            Copy Prompt
                        </button>
                    </div>
                    <div className="bg-black/30 rounded-lg p-3 text-xs font-mono text-gray-500 break-words whitespace-pre-wrap">
                        Create a quiz about "{topic || "General Knowledge"}" with 5 questions... (Click copy for full prompt)
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl flex items-center gap-2 text-sm"
                    >
                        <AlertCircle size={16} />
                        {error}
                    </motion.div>
                )}

                {/* Action Button */}
                <button
                    onClick={handleImport}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            Processing...
                        </>
                    ) : (
                        <>
                            Create Quiz
                            <ArrowRight size={20} />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
