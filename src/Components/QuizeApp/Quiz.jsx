import React, { useState, useEffect } from 'react';
import './Quiz.css';
import './Result.css';

export const Quiz = () => {
  const [questions, setQuestions] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const rawData = await fetch('https://dummyjson.com/c/3cbd-1cdb-462a-a286');
        const data = await rawData.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value);
  };

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestionIndex].correct) {
      setScore((prevScore) => prevScore + 1);
    }

    setSelectedOption('');
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const reset = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  // Check if questions are loaded before rendering the quiz
  if (!questions) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='header'>
        <p>Quiz App</p>
      </div>

      {currentQuestionIndex >= questions.length ? (
        <div className='result'>
          <h1>You answered {score}/{questions.length} questions correctly</h1>
          <button className='button-result' onClick={reset}>Reset</button>
        </div>
      ) : (
        <div className='quiz-container'>
          <h2 className='question-number'>Question {currentQuestionIndex + 1}</h2>
          <h3 className='question-title'>{questions[currentQuestionIndex].question}</h3>
          <form className='options'>
            {['a', 'b', 'c', 'd'].map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleOptionChange}
                />
                {questions[currentQuestionIndex][option]}
                <br />
              </label>
            ))}
          </form>
          <button className="submit-button" onClick={handleNextQuestion} disabled={!selectedOption}>
            Submit
          </button>
        </div>
      )}
    </>
  );
};
