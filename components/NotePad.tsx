'use client';

import React, { useRef, useState } from 'react';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';
import { Eraser, Pen, Trash2, StickyNote } from 'lucide-react';
import clsx from 'clsx';

export default function NotePad() {
    const canvasRef = useRef<ReactSketchCanvasRef>(null);
    const [mode, setMode] = useState<'pen' | 'eraser'>('pen');
    const [activeTab, setActiveTab] = useState<'draw' | 'text'>('draw');
    const [noteText, setNoteText] = useState('');

    const handleClear = () => {
        canvasRef.current?.clearCanvas();
    };

    return (
        <div className="flex flex-col h-full bg-[#171717] border border-white/10 rounded-2xl overflow-hidden">
            {/* Header / Tabs */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#0a0a0a]">
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveTab('draw')}
                        className={clsx(
                            "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2",
                            activeTab === 'draw' ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
                        )}
                    >
                        <Pen size={14} />
                        Draw
                    </button>
                    <button
                        onClick={() => setActiveTab('text')}
                        className={clsx(
                            "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2",
                            activeTab === 'text' ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
                        )}
                    >
                        <StickyNote size={14} />
                        Notes
                    </button>
                </div>

                {activeTab === 'draw' && (
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => { setMode('pen'); canvasRef.current?.eraseMode(false); }}
                            className={clsx("p-2 rounded-lg transition-colors", mode === 'pen' ? "bg-white/10 text-white" : "text-gray-400 hover:text-white")}
                            title="Pen"
                        >
                            <Pen size={16} />
                        </button>
                        <button
                            onClick={() => { setMode('eraser'); canvasRef.current?.eraseMode(true); }}
                            className={clsx("p-2 rounded-lg transition-colors", mode === 'eraser' ? "bg-white/10 text-white" : "text-gray-400 hover:text-white")}
                            title="Eraser"
                        >
                            <Eraser size={16} />
                        </button>
                        <div className="w-px h-4 bg-white/10 mx-1" />
                        <button
                            onClick={handleClear}
                            className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                            title="Clear Canvas"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 relative">
                <div className={clsx("absolute inset-0", activeTab === 'draw' ? "z-10" : "z-0 invisible")}>
                    <ReactSketchCanvas
                        ref={canvasRef}
                        strokeWidth={3}
                        strokeColor="white"
                        canvasColor="transparent"
                        style={{ border: 'none', background: '#171717' }}
                    />
                </div>
                <div className={clsx("absolute inset-0", activeTab === 'text' ? "z-10" : "z-0 invisible")}>
                    <textarea
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Type your notes here..."
                        className="w-full h-full bg-[#171717] text-white p-4 resize-none focus:outline-none placeholder:text-gray-600"
                    />
                </div>
            </div>
        </div>
    );
}
