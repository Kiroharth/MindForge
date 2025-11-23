'use client';

import React from 'react';
import 'katex/dist/katex.min.css';
import ReactMarkdown from 'react-markdown';
import TeX from '@matejmazur/react-katex';

interface MathRendererProps {
    content: string;
    className?: string;
}

export default function MathRenderer({ content, className }: MathRendererProps) {
    // Simple heuristic to detect LaTeX: look for $...$ or $$...$$
    // For a robust solution, we'd parse the string into segments.
    // This is a simplified version that assumes the content is EITHER markdown OR LaTeX, or mixed in a simple way.
    // For this MVP, we'll use a basic split approach.

    const parts = content.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g);

    return (
        <div className={className}>
            {parts.map((part, index) => {
                if (part.startsWith('$$') && part.endsWith('$$')) {
                    return <TeX key={index} block>{part.slice(2, -2)}</TeX>;
                } else if (part.startsWith('$') && part.endsWith('$')) {
                    return <TeX key={index}>{part.slice(1, -1)}</TeX>;
                } else {
                    return <ReactMarkdown key={index} components={{ p: 'span' }}>{part}</ReactMarkdown>;
                }
            })}
        </div>
    );
}
