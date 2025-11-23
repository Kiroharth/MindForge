import { Quiz, Question } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export const parseQuizInput = (input: string, topic: string): Quiz => {
    try {
        // 1. Try to find a JSON block within the text (in case user pastes full chat)
        const jsonMatch = input.match(/```json\s*([\s\S]*?)\s*```/) || input.match(/\[\s*\{[\s\S]*\}\s*\]/);
        let jsonString = input;

        if (jsonMatch) {
            jsonString = jsonMatch[1] || jsonMatch[0];
        }

        // Clean up any potential trailing commas or markdown artifacts if needed
        // For now, assume relatively clean JSON or array
        const parsed = JSON.parse(jsonString);

        let questions: Question[] = [];

        if (Array.isArray(parsed)) {
            questions = parsed.map(mapItemToQuestion);
        } else if (parsed.questions && Array.isArray(parsed.questions)) {
            questions = parsed.questions.map(mapItemToQuestion);
        } else {
            throw new Error('Invalid JSON structure. Expected an array of questions or an object with a "questions" array.');
        }

        return {
            id: uuidv4(),
            title: `${topic} Practice`,
            topic: topic,
            createdAt: Date.now(),
            questions,
        };

    } catch (error) {
        console.error("Failed to parse quiz input:", error);
        throw new Error("Could not parse the input. Please ensure it is a valid JSON format.");
    }
};

const mapItemToQuestion = (item: any): Question => {
    return {
        id: uuidv4(),
        text: item.question || item.text || "No question text provided",
        type: item.options ? 'multiple-choice' : 'short-answer',
        options: item.options,
        correctAnswer: item.answer || item.correctAnswer,
        explanation: item.explanation || item.reasoning,
        graph: item.graph,
    };
};
