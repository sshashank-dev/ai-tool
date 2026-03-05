
import React, { useEffect, useRef, useState } from 'react'
import './App.css'

import ReacentSearches from './components/ReacentSearches';
import QuestionAns from './components/QuestionAns';
import { motion, AnimatePresence } from "framer-motion";

export default function App() {

  const [question, setQuestion] = useState('')
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(
    JSON.parse(sessionStorage.getItem('history')) || []
  );
  const [selectedHistory, setSelectedHistory] = useState('')
  const scrollToAns = useRef();
  const [loader, setLoader] = useState(false);

  const askQuestion = async () => {

    const payloadData = question || selectedHistory;

    if (!payloadData?.trim()) return;


    if (question) {
      let history = JSON.parse(sessionStorage.getItem('history')) || [];
      history = [question, ...history];
      history = history.slice(0, 19);
      history = history.map(item =>
        item.charAt(0).toUpperCase() + item.slice(1).trim()
      );
      history = [...new Set(history)];
      sessionStorage.setItem('history', JSON.stringify(history));
      setRecentHistory(history);
    }

    const payload = {
      contents: [
        {
          parts: [{ text: payloadData }]
        }
      ]
    };

    try {
      setLoader(true);


      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin,
          "X-Title": "My React AI App"
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            { role: "user", content: payloadData }
          ]
        })
      });




      const data = await response.json();

      console.log("FULL RESPONSE:", data);

      if (!response.ok) {
        console.error("API Error:", data);
        setResult(prev => [
          ...prev,
          { type: "question", text: payloadData },
          { type: "answer", text: "API Error. Check console." }
        ]);
        return;
      }

      const answer = data?.choices?.[0]?.message?.content;

      if (!answer) {
        setResult(prev => [
          ...prev,
          { type: "question", text: payloadData },
          { type: "answer", text: "No response from AI." }
        ]);
        return;
      }

      setResult(prev => [
        ...prev,
        { type: "question", text: payloadData },
        { type: "answer", text: answer }
      ]);

      setQuestion('');

      setTimeout(() => {
        if (scrollToAns.current) {
          scrollToAns.current.scrollTop =
            scrollToAns.current.scrollHeight;
        }
      }, 300);

    } catch (error) {
      console.error("Fetch Error:", error);
      setResult(prev => [
        ...prev,
        { type: "question", text: payloadData },
        { type: "answer", text: "❌ Something went wrong." }
      ]);
    } finally {
      setLoader(false);
    }
  };

  const isEnter = (event) => {
    if (event.key === 'Enter') {
      askQuestion();
    }
  };

  useEffect(() => {
    if (selectedHistory) {
      askQuestion();
    }
  }, [selectedHistory]);

  return (
    <div className="flex flex-col md:grid md:grid-cols-5 h-screen">

      <ReacentSearches
        recentHistory={recentHistory}
        setRecentHistory={setRecentHistory}
        setSelectedHistory={setSelectedHistory}
        setQuestion={setQuestion}
        className="hidden md:block bg-zinc-800"
      />

      <div className='col-span-4 p-10 bg-zinc-900'>

        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10
          text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
          🤖 Hello User, Ask Me Anything
        </h1>

        <div ref={scrollToAns} className='container h-130 overflow-y-auto bg-zinc-900'>
          <div className='text-zinc-300'>
            <ul>
              <AnimatePresence initial={false}>
                {result.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <QuestionAns item={item} index={index} />
                  </motion.li>
                ))}
              </AnimatePresence>

              {loader && (
                <li className="my-2 flex justify-start">
                  <div className="px-4 py-3 rounded-2xl bg-zinc-700 text-gray-400">
                    Loading...
                  </div>
                </li>
              )}

              {result.length === 0 && !loader && (
                <div className="text-center text-gray-500 mt-10">
                  <p>🤖 Ask me anything!</p>
                </div>
              )}
            </ul>
          </div>
        </div>

        <div className="sticky bottom-0 bg-zinc-800 w-full max-w-3xl mx-auto 
          p-2 border-t border-zinc-700 flex items-center rounded-t-2xl">

          <input
            className="flex-1 bg-transparent text-white px-4 outline-none"
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
    </div>
  );
}