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
    <>
    <main className=" min-h-full">
        <div className=" p-[30px] max-w-[700px] border-[3px] border-gray-500 rounded-[10px]">
          <div className="flex justify-between">
            <h1 className=' font-bold text-[20px]'>Quiz App</h1>
            <p>{}/10</p>
          </div>

          <h1 className=' font-medium text-[30px]'>Question 1:</h1>
          <p className='font-medium'>Placeholder</p>

        <div className='flex flex-col gap-[20px]'>
          <button className='border-[5px] min-w-full p-[15px] rounded-[10px] hover:bg-blue-300 focus:bg-blue-400'></button>
          <button className='border-[5px] min-w-full p-[15px] rounded-[10px] hover:bg-blue-300 focus:bg-blue-400'></button>
          <button className='border-[5px] min-w-full p-[15px] rounded-[10px] hover:bg-blue-300 focus:bg-blue-400'></button>
          <button className='border-[5px] min-w-full p-[15px] rounded-[10px] hover:bg-blue-300 focus:bg-blue-400'></button>
        </div>
        <div className='flex justify-between'>
          <button type='submit' className=' bg-green-300 hover:bg-green-500 p-[10px] px-[20px]'>Back</button>
          <button type='submit' className=' bg-green-300 hover:bg-green-500 p-[10px] px-[20px]'>Next</button>
        </div>
      </div>
    </main>
    </>
  );
}

export default App;
