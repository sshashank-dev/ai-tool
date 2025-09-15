
import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import { URL } from './constants'
import Answers from './components/Answers';
import ReacentSearches from './components/ReacentSearches';
import QuestionAns from './components/QuestionAns';
import { motion, AnimatePresence } from "framer-motion";



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

      <div className="flex flex-col md:grid md:grid-cols-5 h-screen">

        <ReacentSearches
          recentHistory={recentHistory}
          setRecentHistory={setRecentHistory}
          setSelectedHistory={setSelectedHistory}
          setQuestion={setQuestion}
          className="hidden md:block bg-zinc-800"
        />

        <div className='col-span-4 p-10 bg-zinc-900 '>

          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10
               text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600
               drop-shadow-[0_0_15px_rgba(56,189,248,0.7)] animate-pulse tracking-wide">
            🤖 Hello User, Ask Me Anything
          </h1>

          <div ref={scrollToAns} className='container h-130  overflow-y-auto  bg-zinc-900'>
            <div className='text-zinc-300'>

              <ul>
                <AnimatePresence initial={false}>
                  {result && result.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <QuestionAns item={item} index={index} />
                    </motion.li>
                  ))}
                </AnimatePresence>

                {loader && (
                  <li className="my-2 flex justify-start">
                    <div className="flex items-center space-x-2 px-4 py-3 rounded-2xl bg-zinc-700 text-gray-400 max-w-[75%]">
                      <span className="animate-bounce">•</span>
                      <span className="animate-bounce delay-150">•</span>
                      <span className="animate-bounce delay-300">•</span>
                    </div>
                  </li>
                )}

                {result.length === 0 && !loader && (
                  <div className="text-center text-gray-500 mt-10">
                    <p className="mb-2">🤖 Ask me anything!</p>
                    <p className="text-sm">Examples: <br /> "What is React?" <br /> "Explain AI in simple words"</p>
                  </div>
                )}

              </ul>

            </div>
          </div>

          <div className="sticky bottom-0 bg-zinc-800 w-full max-w-3xl mx-auto 
                p-2 border-t border-zinc-700 flex items-center rounded-t-2xl">
            <input
              className="flex-1 bg-transparent text-white px-4 outline-none "
              onKeyDown={isEnter}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask me anything..."
            />
            <button
              onClick={askQuestion}
              className="ml-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 
               text-white font-semibold rounded-xl hover:opacity-90 transition"
            >
              Ask
            </button>
          </div>

        </div>
      </div >

    </div >
  )


}




