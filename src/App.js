import { useState, useEffect } from 'react';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [quizEnded, setQuizEnded] = useState(false);
  const [leaderboard, setLeaderboard] = useState(JSON.parse(localStorage.getItem('leaderboard') || '[]'));

  useEffect(() => {
    fetchNewQuestions();
  }, []);

  const fetchNewQuestions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=50&category=9&difficulty=easy&type=multiple');
      const data = await response.json();
      const shuffledQuestions = data.results.sort(() => 0.5 - Math.random()).slice(0, 5);
      setQuestions(shuffledQuestions);
      setIsLoading(false);
      setQuizEnded(false);
      setUserAnswers({});
      setCurrentQuestionIndex(0);
      
    } catch (error) {
      console.log(error)
    }
  };

  const handleAnswerSelect = (answer) => {
    if (!quizEnded) {
      setUserAnswers({ ...userAnswers, [currentQuestionIndex]: answer });
    }
  };

  const calculateScore = () => {
    return questions.reduce((score, question, index) => {
      if (userAnswers[index]?.selectedAnswer === question.correct_answer) {
        return score + 1;
      }
      return score;
    }, 0);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (!quizEnded) {
      const newScore = calculateScore();
      setLeaderboard([...leaderboard, newScore]);
      localStorage.setItem('leaderboard', JSON.stringify([...leaderboard, newScore]));
      setQuizEnded(true);
      setCurrentQuestionIndex(0);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const clearLeaderboard = () => {
    setLeaderboard([]);
    localStorage.setItem('leaderboard', JSON.stringify([]));
  };

  if (isLoading || questions.length === 0) {
    return <div>Loading...</div>;
  }

  const decodeHtml = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  
  const currentQuestion = questions[currentQuestionIndex];
  const options = quizEnded || currentQuestionIndex in userAnswers ? userAnswers[currentQuestionIndex]?.options : [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers].sort(() => Math.random() - 0.5);
  
  const decodedQuestions = decodeHtml(currentQuestion.question)

  return (
    <main>
      <div className='title'>
        <h1>QuizApp!</h1>
      </div>
      <div className='app'>
        <p className='question-number'>{currentQuestionIndex + 1} / {questions.length}</p>
        <p className='question'>{decodedQuestions}</p>

        <div className='answer-options'>
          {options.map((option, index) => {
            let btnClass = 'btn';
            if (quizEnded) {
              btnClass += option === currentQuestion.correct_answer ? ' correct' : '';
              btnClass += userAnswers[currentQuestionIndex]?.selectedAnswer === option ? ' selected' : '';
            } else {
              btnClass += userAnswers[currentQuestionIndex]?.selectedAnswer === option ? ' selected' : '';
            }
            return (
              <button key={index} className={btnClass} onClick={() => handleAnswerSelect({ selectedAnswer: option, options })}>
                {option}
              </button>
            );
          })}
        </div>

        <div className='flex justify-between'>
          {currentQuestionIndex > 0 && <button onClick={previousQuestion} className='back-btn'>Back</button>}
          {currentQuestionIndex < questions.length - 1 && <button onClick={nextQuestion} className='next-btn'>Next</button>}
          {currentQuestionIndex === questions.length - 1 && !quizEnded && <button onClick={nextQuestion} className='next-btn'>Submit</button>}
        </div>

        {quizEnded && <button onClick={fetchNewQuestions} className='new-quiz-btn'>Start a New Quiz</button>}

        <div className='leaderboard'>
          <h2>Leaderboard</h2>
          {leaderboard.map((score, index) => (
            <p key={index}>Attempt {index + 1}: {score} / {questions.length}</p>
          ))}
          <button onClick={clearLeaderboard} className='clear-leaderboard-btn'>Clear Leaderboard</button>
        </div>
      </div>
    </main>
  );
}

export default App;
