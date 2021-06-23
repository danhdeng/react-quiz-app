import React from 'react';
import { useState } from 'react';
import QuestionCard from './Components/QuestionCard';
import { fetchQuizQuestions } from './API';
import {QuestionsState,Diffculty} from "./API";

import {GlobalStyle, Wrapper} from './App.styles';

export type AnswerObject={
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const App=() =>{
  const Total_Questions=10;

  const [loading, setLoading]=useState(false);
  const [questions, setQuestions]=useState<QuestionsState[]>([]);
  const [number, setNumber]=useState(0);
  const [userAnswers, setUserAnswers]=useState<AnswerObject[]>([]);
  const [score, setScore]=useState(0);
  const [gameOver, setGameOver]=useState(true);

  //console.log(fetchQuizQuestions(Total_Questions, Diffculty.EASY ));

  const startTrivia=async ()=>{
    setLoading(true);
    setGameOver(false);
    const newQuestions=await fetchQuizQuestions(
      Total_Questions, 
      Diffculty.EASY
    );
    //console.log(newQuestions);
    setQuestions(newQuestions);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
    console.log(questions);
  };
  const checkAnswer=(e: React.MouseEvent<HTMLButtonElement>)=>{
    console.log("click on the selection");
     if(!gameOver){
       //check the answer
       const answer=e.currentTarget.value;

      //add score if answer is correct
      const correct=questions[number].correct_answer===answer;
      if(correct) setScore(prev=>prev +1);
      console.log(userAnswers);
      setUserAnswers(prev=>prev.filter((item, j) => number !== j));

      const answerObject={
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      };
      console.log(userAnswers);
      setUserAnswers(prev=>[...prev, answerObject]);

     }
  }

  const nextQuestion=() =>{
    //move on to the next question if not the last question
    const nextQuestion=number+1;
    if(nextQuestion===Total_Questions){
      setGameOver(true);
    }
    else{
      setNumber(nextQuestion);
    }

  }
  return (
    <>
    <GlobalStyle />
    <Wrapper>
      <h1>React Quiz</h1>
      <button className="start" onClick={startTrivia}>
        start
      </button>
      {gameOver ? <p className="score">Score: {score}</p> : null}
      {loading && <p>loading Questions ...</p>}
      {!gameOver && !loading && ( 
      <QuestionCard 
        questionNr={number +1}
        totalQuestions={Total_Questions}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined }
        callback={checkAnswer} 
      />
      )}
      {!gameOver && !loading && userAnswers.length=== number+1 && number!== Total_Questions && (
        <button className="next" onClick={nextQuestion}>
            Next Question
        </button>
      )}
    </Wrapper>
    </>
  );
}

export default App;
