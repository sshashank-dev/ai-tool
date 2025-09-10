// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>  </div>
//     </>
//   )
// }

// export default App


// import React from "react";

// export default function App() {
//   return (
//     <div className="bg-zinc-950 text-white min-h-screen">
//       {/* Hero Section */}
//       <header className="max-w-6xl mx-auto px-6 py-16 text-center">
//         <h1 className="text-5xl md:text-7xl font-bold mb-4">
//           Welcome to <span className="text-yellow-400">BrightFuture Academy</span>
//         </h1>
//         <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
//           Empowering students with quality education and skills for a brighter tomorrow.
//           Learn, grow, and achieve your dreams with us.
//         </p>
//         <div className="flex justify-center gap-4">
//           <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold transition">
//             Enroll Now
//           </button>
//           <button className="border border-gray-500 hover:border-yellow-400 hover:text-yellow-400 px-6 py-3 rounded-lg font-semibold transition">
//             Learn More
//           </button>
//         </div>
//       </header>

//       {/* Courses Section */}
//       <section className="max-w-6xl mx-auto px-6 py-12">
//         <h2 className="text-3xl font-bold text-center mb-10 text-yellow-400">
//           Our Popular Courses
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {[
//             {
//               title: "Mathematics Excellence",
//               desc: "Master numbers, equations, and problem-solving with expert guidance."
//             },
//             {
//               title: "Science Innovations",
//               desc: "Explore physics, chemistry, and biology through practical learning."
//             },
//             {
//               title: "Language & Literature",
//               desc: "Improve your communication, grammar, and writing skills."
//             }
//           ].map((course, i) => (
//             <div
//               key={i}
//               className="bg-zinc-900 p-6 rounded-xl shadow-lg hover:shadow-yellow-400/30 transition"
//             >
//               <h3 className="text-xl font-bold mb-3 text-yellow-300">{course.title}</h3>
//               <p className="text-gray-400">{course.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* About Section */}
//       <section className="bg-zinc-900 py-12 px-6">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//           <img
//             src="https://images.unsplash.com/photo-1596495577886-d920f1fb7238"
//             alt="School Campus"
//             className="rounded-xl shadow-lg"
//           />
//           <div>
//             <h2 className="text-3xl font-bold mb-4 text-yellow-400">
//               Why Choose BrightFuture Academy?
//             </h2>
//             <p className="text-gray-400 mb-4">
//               We believe education should be engaging, practical, and inspiring. Our teachers focus on
//               both academic excellence and personal growth, helping students succeed in all aspects of life.
//             </p>
//             <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold transition">
//               Learn More
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-zinc-900 py-6 mt-12">
//         <div className="max-w-6xl mx-auto text-center text-gray-500">
//           © {new Date().getFullYear()} BrightFuture Academy. All rights reserved.
//         </div>
//       </footer>
//     </div>
//   );
// }

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
  //   const [recentHistory, setRecentHistory] = useState(
  //   JSON.parse(localStorage.getItem('history')) || []
  // );
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




    // try {
    //   let response = await fetch(URL,);
    //   console.log("Request sent");
    // } catch (err) {
    //   console.error("Fetch failed:", err);
    // }

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




    // dataString = dataString.split("* ");
    // dataString = dataString.map((item) => item.trim());


    // console.log(dataString);
    // setResult([question, ...dataString]);

    // setResult([question, dataString]);
    // setResult(prev => [...prev, question, ...dataString]);


    // setResult(prev => [
    //   ...prev,
    //   { type: "question", text: question ? question : selectedHistory },
    //   ...dataString.map(ans => ({ type: "answer", text: ans }))
    // ]);
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


  // const [darkMode, setDarkMode] = useState('dark');
  // useEffect(() => {
  //   console.log(darkMode);
  //   if (darkMode == 'dark') {
  //     document.documentElement.classList.add('dark')
  //   } else {
  //     document.documentElement.classList.remove('dark')

  //   }
  // }, [darkMode])

  return (

    <div>
      <div className='grid grid-cols-5 h-screen text-center'>

        {/* <select onChange={(event) => setDarkMode(event.target.value)} className='fixed text-white bottom-0 p-5' > */}


        {/* <option value="dark"> Dark</option>
          <option value="light"> Light </option>
        </select> */}


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



