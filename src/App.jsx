

import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import { URL } from './constants'
import Answers from './components/Answers';
import ReacentSearches from './components/ReacentSearches';
import QuestionAns from './components/QuestionAns';




export default function App() {

  const [question, setQuestion] = useState('')
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(JSON.parse(localStorage.getItem('history')) || []);

  const [selectedHistory, setSelectedHistory] = useState('')
  const scrollToAns = useRef();
  const [loader, setLoader] = useState(false);





  const askQuestion = async () => {

    if (!question && !selectedHistory) {
      return false
    }

    if (question) {
      if (localStorage.getItem('history')) {
        let history = JSON.parse(localStorage.getItem('history'));
        history = [question, ...history]
        history = history.slice(0, 19);
        history = history.map((item) =>
          item.charAt(0).toUpperCase() + item.slice(1).trim());
        history = [...new Set(history)]
        localStorage.setItem('history', JSON.stringify(history))
        setRecentHistory(history)
      } else {

        localStorage.setItem('history', JSON.stringify([question]))
        setRecentHistory([question])
      }

    }



    console.log("Question submitted:", question);
    console.log("URL:", URL);
    if (!question.trim()) return;

    const payloadData = question ? question : selectedHistory

    const payload = {
      "contents": [
        {
          "parts": [
            {
              "text": payloadData
            }
          ]
        }
      ]
    }





    setLoader(true);



    let response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })


    response = await response.json();
    let dataString = response.candidates[0].content.parts[0].text





    setResult(prev => [
      ...prev,
      { type: "question", text: question ? question : selectedHistory },
      { type: "answer", text: dataString }
    ]);






    setQuestion('');

    setTimeout(() => {
      scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight;
    }, 500);
    setLoader(false);

  }


  const clearHistory = () => {
    localStorage.clear();
    setRecentHistory([]);
  }


  const isEnter = (event) => {
    console.log(event.key);
    if (event.key == 'Enter') {
      askQuestion();
    }

  }

  useEffect(() => {
    console.log(selectedHistory);
    askQuestion();

  }, [selectedHistory])


  return (

    <div>
      <div className='grid grid-cols-5 h-screen text-center'>




        <ReacentSearches recentHistory={recentHistory} setRecentHistory={setRecentHistory} setSelectedHistory={setSelectedHistory} setQuestion={setQuestion} />



        <div className='col-span-4 p-10 bg-zinc-900 '>

          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10
               text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600
               drop-shadow-[0_0_15px_rgba(56,189,248,0.7)] animate-pulse tracking-wide">
            🤖 Hello User, Ask Me Anything
          </h1>


          {
            loader ? <div role="status">
              <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div> : null
          }

          <div ref={scrollToAns} className='container h-130  overflow-scroll  bg-zinc-900'>
            <div className='text-zinc-300'>
              <ul>

                {result && result.map((item, index) => (
                  <QuestionAns key={index} item={item} index={index} />
                ))}






              </ul>
            </div>
          </div>
          <div>
            <div className='  bg-zinc-800 w-205 p-1 pr-5 text-white m-auto rounded-4xl border border-zinc-400 flex h-14'>
              <input className='w-full h-full p-5  outline-none ' onKeyDown={isEnter} value={question} type="text" onChange={(event) => setQuestion(event.target.value)} placeholder='Ask me anything ' />
              <button onClick={askQuestion} >Ask</button>
            </div>
          </div>


        </div>
      </div >

    </div >
  )


}



