import React, { useState } from 'react';
import Head from 'next/head';

const QuizPage = () => {
  const languages = ['French', 'German', 'Spanish', 'Italian', 'Greek', 'Japanese', 'Korean', 'Mandarin', 'Arabic'];
  const categories = ['Clothing', 'Furniture', 'Transport', 'Food', 'Animals', 'Colors', 'Numbers', 'Body parts', 'School'];

  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  
  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    setShowSpinner(true);

    const response = await fetch('/api/generate-translating-quiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ language: selectedLanguage, category })
    });
    const data = await response.json();
    setQuizData(data.quizQuestions);
    setShowSpinner(false);
  };

  const handleAnswerSelect = (answerId) => {
    setSelectedAnswerId(answerId);
    if (answerId === quizData[currentQuestionIndex].answerId) {
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIncorrectAnswers([...incorrectAnswers, quizData[currentQuestionIndex]]);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswerId(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleRestartQuiz = () => {
    setSelectedLanguage(null);
    setSelectedCategory(null);
    setQuizData(null);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setIncorrectAnswers([]);
  };

  return (
    <div className="container">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      </Head>
      {!selectedLanguage ? (
        <div className="grid">
          {languages.map((language) => (
            <div className="tile" key={language} onClick={() => handleLanguageSelect(language)}>
              {language}
            </div>
          ))}
        </div>
      ) : !selectedCategory ? (
        <div className="grid">
          {categories.map((category) => (
            <div className="tile" key={category} onClick={() => handleCategorySelect(category)}>
              {category}
            </div>
          ))}
        </div>
      ) : showSpinner ? (
        <div className="spinner"></div>
      ) : quizData && currentQuestionIndex < quizData.length ? (
        <div className="quiz">
          <div className="question">Translate this word: {quizData[currentQuestionIndex].question}</div>
          <div className="choices">
            {quizData[currentQuestionIndex].choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => handleAnswerSelect(choice.id)}
                className={`choice-button ${
                  selectedAnswerId === choice.id
                    ? choice.id === quizData[currentQuestionIndex].answerId
                      ? 'correct'
                      : 'incorrect'
                    : selectedAnswerId && choice.id === quizData[currentQuestionIndex].answerId
                      ? 'correct' 
                      : ''
                }`}
                disabled={selectedAnswerId !== null}
              >
                {choice.text}
              </button>
            ))}
          </div>
          {selectedAnswerId !== null && (
            <>
              {selectedAnswerId === quizData[currentQuestionIndex].answerId ? (
                <div className="feedback correct-feedback">Well done!</div>
              ) : (
                <div className="feedback incorrect-feedback">
                  Mnemonic: {quizData[currentQuestionIndex].mnemonic}
                </div>
              )}
              <button className="next-button" onClick={handleNextQuestion}>
                Next
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="summary">
          <div className="summary-title">Quiz Summary</div>
          <div>You got {correctAnswers} out of {quizData.length} correct.</div>
          {incorrectAnswers.length > 0 && (
            <div>
              <div className="summary-subtitle">Words you missed:</div>
              {incorrectAnswers.map((item, index) => (
                <div key={index}>
                  <strong>{item.question}</strong>: {item.mnemonic}
                </div>
              ))}
            </div>
          )}
          <button className="restart-button" onClick={handleRestartQuiz}>
            Restart Quiz
          </button>
        </div>
      )}
      <style jsx>{`
        .container {
          font-family: 'Roboto', sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          min-height: 100vh;
          background-color: #f4f4f4;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .tile {
          background-color: #ffffff;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: background-color 0.3s ease;
        }
        .tile:hover {
          background-color: #e0e0e0;
        }
        .quiz {
          text-align: center;
        }
        .question {
          font-size: 1.5rem;
          margin-bottom: 20px;
        }
        .choices {
          display: flex;
          justify-content: center;
          gap: 10px;
        }
        .choice-button {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .choice-button.correct {
          background-color: #4caf50;
          color: #fff;
        }
        .choice-button.incorrect {
          background-color: #f44336;
          color: #fff;
        }
        .feedback {
          margin-top: 20px;
          font-size: 1.2rem;
        }
        .correct-feedback {
          color: #4caf50;
        }
        .incorrect-feedback {
          color: #f44336;
        }
        .next-button {
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #2196f3;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .summary {
          text-align: center;
        }
        .summary-title {
          font-size: 2rem;
          margin-bottom: 20px;
        }
        .summary-subtitle {
          font-size: 1.2rem;
          margin-bottom: 10px;
        }
        .restart-button {
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #2196f3;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .spinner {
          border: 8px solid #f3f3f3;
          border-top: 8px solid #3498db;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default QuizPage;
