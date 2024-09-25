import { useState } from 'react';

export default function LanguageQuiz() {
  // State variables
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Available languages and categories
  const languages = ['French', 'German', 'Spanish', 'Italian', 'Greek', 'Japanese', 'Korean', 'Mandarin', 'Arabic'];
  const categories = ['Clothing', 'Furniture', 'Transport', 'Food', 'Animals', 'Colors', 'Numbers', 'Body parts', 'School'];

  // Language selection handler
  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  // Category selection handler
  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    setLoading(true);

    // Fetch quiz data from API
    const response = await fetch('/api/generate-spelling-quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language: selectedLanguage, category })
    });
    const data = await response.json();
    setQuizData(data.quizQuestions);
    setLoading(false);
  };

  // Answer submission handler
  const handleSubmitAnswer = (answer) => {
    setAnswers([...answers, answer]);
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  // Render loading spinner
  if (loading) {
    return (
      <div className="spinner">
        <div className="spinner-inner"></div>
        <style jsx>{`
          .spinner {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .spinner-inner {
            width: 50px;
            height: 50px;
            border: 5px solid lightgray;
            border-top: 5px solid #3498db;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Render results
  if (showResults) {
    return (
      <div className="results">
        <h2>Quiz Results</h2>
        {quizData.map((question, index) => (
          <div key={index} className="result-item">
            <img src={`data:image/png;base64,${question.imageb64}`} alt={`Question ${index + 1}`} />
            <p>{answers[index].toLowerCase() === question.question.toLowerCase() ? 'Correct!' : `Wrong! The correct answer is ${question.question}`}</p>
            {answers[index].toLowerCase() !== question.question.toLowerCase() && <p>Mnemonic: {question.mnemonic}</p>}
          </div>
        ))}
        <button onClick={() => {
          setSelectedLanguage(null);
          setSelectedCategory(null);
          setQuizData(null);
          setAnswers([]);
          setShowResults(false);
          setCurrentQuestionIndex(0);
        }}>Start New Quiz</button>
        <style jsx>{`
          .results {
            text-align: center;
            padding: 20px;
          }
          .result-item {
            margin-bottom: 20px;
          }
          button {
            padding: 10px 20px;
            background-color: #3498db;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 5px;
          }
        `}</style>
      </div>
    );
  }

  // Render quiz questions
  if (quizData && quizData.length > 0) {
    const currentQuestion = quizData[currentQuestionIndex];
    return (
      <div className="quiz">
        <h2>Write the name of this object in {selectedLanguage}</h2>
        <img src={`data:image/png;base64,${currentQuestion.imageb64}`} alt="Quiz Image" />
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmitAnswer(e.target.elements.answer.value);
          e.target.elements.answer.value = '';
        }}>
          <input type="text" name="answer" autoFocus required />
          <button type="submit">Next</button>
        </form>
        <style jsx>{`
          .quiz {
            text-align: center;
            padding: 20px;
          }
          img {
            max-width: 300px;
            margin-bottom: 20px;
          }
          form {
            margin-top: 20px;
          }
          input {
            padding: 10px;
            width: 200px;
            margin-right: 10px;
          }
          button {
            padding: 10px 20px;
            background-color: #3498db;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 5px;
          }
        `}</style>
      </div>
    );
  }

  // Render category selection
  if (selectedLanguage) {
    return (
      <div className="container">
        <div className="categories">
          <h2>Select a Category</h2>
          <div className="grid">
            {categories.map((category) => (
              <div key={category} className="tile" onClick={() => handleCategorySelect(category)}>
                {category}
              </div>
            ))}
          </div>
        </div>
        <style jsx>{`
          .container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .categories {
            text-align: center;
          }
          .grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            justify-items: center;
            margin-top: 20px;
          }
          .tile {
            padding: 15px 20px;
            background-color: #ecf0f1;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          .tile:hover {
            background-color: #bdc3c7;
          }
        `}</style>
      </div>
    );
  }

  // Render language selection
  return (
    <div className="container">
      <div className="languages">
        <h2>Select a Language</h2>
        <div className="grid">
          {languages.map((language) => (
            <div key={language} className="tile" onClick={() => handleLanguageSelect(language)}>
              {language}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .languages {
          text-align: center;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          justify-items: center;
          margin-top: 20px;
        }
        .tile {
          padding: 15px 20px;
          background-color: #ecf0f1;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .tile:hover {
          background-color: #bdc3c7;
        }
      `}</style>
    </div>
  );
}
