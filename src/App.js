import {useState, useEffect} from 'react';

function App() {

  // const [questions, setQuestions] = useState([]);

  // useEffect(() => {
  //   const fetchQuestions = async () => {
  //     const response = await fetch('https://opentdb.com/api.php?amount=50&category=9&type=multiple')
  //     const data = await response.json()
  //     setQuestions(data.results)
  //   }
    
  //   fetchQuestions()
  // }, [])
  
  // console.log(questions)
  return (
    <main>
          <div className='title'>
            <h1>QuizApp!</h1>
          </div>
          <div className='app'>
            <p className='question-number'>{} / 10</p>
            <p className='question'>What did the sdjknf</p>

            <div className='answer-options'>
              <button className='btn'></button>
              <button className='btn'></button>
              <button className='btn'></button>
              <button className='btn'></button>
            </div>
            <div className='flex justify-between'>
              <button type='submit' className='back-btn'>Back</button>
              <button type='submit' className='next-btn'>Next</button>
            </div>
          </div>
    </main>
  );
}

export default App;
