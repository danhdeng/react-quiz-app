//https://opentdb.com/api.php?amount=10

import { shuffleArray } from "./Util";

export type Question={
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export enum Diffculty{
    EASY = "easy",
    MEDIUM=  "medium",
    HARD = "hard"
}
export type QuestionsState = Question & { answers: string[] };

export const fetchQuizQuestions=async (amount: number, diffculty: Diffculty): Promise<QuestionsState[]>=>{
    const endpoint =`https://opentdb.com/api.php?amount=${amount}&diffculty=${diffculty}&type=multiple`;
    const data = await(await (await fetch(endpoint)).json());
    
    return data.results.map((question:Question)=>({
        ...question,
        answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
    }))
};