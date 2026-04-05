
// import React, { useEffect, useRef, useState } from 'react'
// import './App.css'

// import ReacentSearches from './components/ReacentSearches';
// import QuestionAns from './components/QuestionAns';
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   OPENROUTER_URL,
//   OPENROUTER_MODEL,
//   OPENROUTER_KEY
// } from "./constants";

// console.log("OPENROUTER_KEY:", OPENROUTER_KEY);
// console.log("TEST OPENROUTER_KEY:", OPENROUTER_KEY);

// export default function App() {

//   const [question, setQuestion] = useState('')
//   const [result, setResult] = useState([]);
//   const [recentHistory, setRecentHistory] = useState(
//     JSON.parse(sessionStorage.getItem('history')) || []
//   );
//   const [selectedHistory, setSelectedHistory] = useState('')
//   const scrollToAns = useRef();
//   const [loader, setLoader] = useState(false);

//   const askQuestion = async () => {

//     const payloadData = question || selectedHistory;

//     if (!payloadData?.trim()) return;


//     if (question) {
//       let history = JSON.parse(sessionStorage.getItem('history')) || [];
//       history = [question, ...history];
//       history = history.slice(0, 19);
//       history = history.map(item =>
//         item.charAt(0).toUpperCase() + item.slice(1).trim()
//       );
//       history = [...new Set(history)];
//       sessionStorage.setItem('history', JSON.stringify(history));
//       setRecentHistory(history);
//     }

//     const payload = {
//       contents: [
//         {
//           parts: [{ text: payloadData }]
//         }
//       ]
//     };

//     try {
//       setLoader(true);




//       const response = await fetch("http://localhost:5000/api/ask", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ question: payloadData })
//       });


//       console.log("KEY VALUE:", OPENROUTER_KEY);



//       const data = await response.json();

//       console.log("FULL RESPONSE:", data);

//       if (!response.ok) {
//         console.error("API Error:", data);
//         setResult(prev => [
//           ...prev,
//           { type: "question", text: payloadData },
//           { type: "answer", text: "API Error. Check console." }
//         ]);
//         return;
//       }

//       const answer = data?.choices?.[0]?.message?.content;

//       if (!answer) {
//         setResult(prev => [
//           ...prev,
//           { type: "question", text: payloadData },
//           { type: "answer", text: "No response from AI." }
//         ]);
//         return;
//       }

//       setResult(prev => [
//         ...prev,
//         { type: "question", text: payloadData },
//         { type: "answer", text: answer }
//       ]);

//       setQuestion('');

//       setTimeout(() => {
//         if (scrollToAns.current) {
//           scrollToAns.current.scrollTop =
//             scrollToAns.current.scrollHeight;
//         }
//       }, 300);

//     } catch (error) {
//       console.error("Fetch Error:", error);
//       setResult(prev => [
//         ...prev,
//         { type: "question", text: payloadData },
//         { type: "answer", text: "❌ Something went wrong." }
//       ]);
//     } finally {
//       setLoader(false);
//     }
//   };

//   const isEnter = (event) => {
//     if (event.key === 'Enter') {
//       askQuestion();
//     }
//   };

//   // Replace your existing setTimeout scroll logic with this:
//   useEffect(() => {
//     if (result.length > 0 || loader) {
//       // We use a small delay to allow Framer Motion to finish its "pop" animation
//       const timer = setTimeout(() => {
//         scrollToAns.current?.scrollTo({
//           top: scrollToAns.current.scrollHeight,
//           behavior: "smooth",
//         });
//       }, 100);
//       return () => clearTimeout(timer);
//     }
//   }, [result, loader]); // This triggers every time a new message OR the loader appears

//   return (
//     <div className="relative h-screen w-full overflow-hidden">


//       <ReacentSearches
//         recentHistory={recentHistory}
//         setRecentHistory={setRecentHistory}
//         setSelectedHistory={setSelectedHistory}
//         setQuestion={setQuestion}
//         className="hidden md:block bg-zinc-800"
//       />

//       <div className='col-span-4 p-10 bg-zinc-900'>

//         <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10
//           text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
//           🤖 Hello User, Ask Me Anything
//         </h1>

//         <div ref={scrollToAns} className='container h-130 overflow-y-auto bg-zinc-900'>
//           <div className='text-zinc-300'>
//             <ul>
//               <AnimatePresence initial={false}>
//                 {result.map((item, index) => (
//                   <motion.li
//                     key={index}
//                     initial={{ opacity: 0, y: 8 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <QuestionAns item={item} index={index} />
//                   </motion.li>
//                 ))}
//               </AnimatePresence>

//               {loader && (
//                 <li className="my-2 flex justify-start">
//                   <div className="px-4 py-3 rounded-2xl bg-zinc-700 text-gray-400">
//                     Loading...
//                   </div>
//                 </li>
//               )}

//               {result.length === 0 && !loader && (
//                 <div className="text-center text-gray-500 mt-10">
//                   <p>🤖 Ask me anything!</p>
//                 </div>
//               )}
//             </ul>
//           </div>
//         </div>

//         <div className="sticky bottom-0 bg-zinc-800 w-full max-w-3xl mx-auto 
//           p-2 border-t border-zinc-700 flex items-center rounded-t-2xl">

//           <input
//             className="flex-1 bg-transparent text-white px-4 outline-none"
//             onKeyDown={isEnter}
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             placeholder="Ask me anything..."
//           />

//           <button
//             onClick={askQuestion}
//             className="ml-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 
//             text-white font-semibold rounded-xl hover:opacity-90 transition"
//           >
//             Ask
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }



// import React, { useEffect, useRef, useState } from 'react'
// import './App.css'
// import QuestionAns from './components/QuestionAns';
// import Telemetry from './components/Telemetry';
// import { motion, AnimatePresence } from "framer-motion";

// export default function App() {
//   const [question, setQuestion] = useState('')
//   const [result, setResult] = useState([]);
//   const [recentHistory, setRecentHistory] = useState(
//     JSON.parse(sessionStorage.getItem('history')) || []
//   );
//   const [showHistory, setShowHistory] = useState(false);
//   const scrollToAns = useRef(null);
//   const [loader, setLoader] = useState(false);
//   const [isSpeaking, setIsSpeaking] = useState(false);

//   // --- SPEECH ENGINE (HINDI + ENGLISH) ---
//   const speak = (text) => {
//     if (window.speechSynthesis.speaking) {
//       window.speechSynthesis.cancel();
//       setIsSpeaking(false);
//       return;
//     }

//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.rate = 1.0;
//     utterance.pitch = 0.9;

//     const isHindi = /[\u0900-\u097F]/.test(text);

//     if (isHindi) {
//       const voices = window.speechSynthesis.getVoices();
//       const hindiVoice = voices.find(v => v.lang.includes('hi-IN') || v.lang.includes('hi_IN'));
//       if (hindiVoice) {
//         utterance.voice = hindiVoice;
//         utterance.lang = 'hi-IN';
//       }
//     } else {
//       utterance.lang = 'en-US';
//     }

//     utterance.onstart = () => setIsSpeaking(true);
//     utterance.onend = () => setIsSpeaking(false);

//     window.speechSynthesis.speak(utterance);
//   };

//   const aiFacts = [
//     { id: "01", title: "Neural Origin", text: "The first 'Neural SNARC' was built in 1951." },
//     { id: "02", title: "Speed of Thought", text: "AI can process 1 trillion operations per second." },
//     { id: "03", title: "AlphaGo Power", text: "AlphaGo used 1,920 CPUs and 280 GPUs to win." },
//     { id: "04", title: "Language Scale", text: "Modern LLMs train on over 15 trillion tokens." },
//     { id: "05", title: "Creative Logic", text: "AI can now generate 4K video from single prompts." },
//     { id: "06", title: "Future Growth", text: "AI compute demand doubles every 6 months." },
//   ];

//   const startNewChat = () => {
//     setResult([]);
//     setQuestion('');
//     setShowHistory(false);
//     window.speechSynthesis.cancel();
//     setIsSpeaking(false);
//   };

//   const askQuestion = async () => {
//     if (!question.trim()) return;
//     setShowHistory(false);

//     const currentQuestion = question;
//     setResult(prev => [...prev, { type: "question", text: currentQuestion }]);
//     setQuestion('');

//     let history = JSON.parse(sessionStorage.getItem('history')) || [];
//     history = [currentQuestion, ...history].slice(0, 15);
//     history = [...new Set(history)];
//     sessionStorage.setItem('history', JSON.stringify(history));
//     setRecentHistory(history);

//     try {
//       setLoader(true);
//       const response = await fetch("http://localhost:5000/api/ask", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ question: currentQuestion })
//       });
//       const data = await response.json();
//       const answer = data?.choices?.[0]?.message?.content || "No response";
//       setResult(prev => [...prev, { type: "answer", text: answer }]);
//     } catch (error) {
//       setResult(prev => [...prev, { type: "answer", text: "❌ Connection Error" }]);
//     } finally {
//       setLoader(false);
//     }
//   };

//   const isEnter = (e) => { if (e.key === 'Enter') askQuestion(); };

//   useEffect(() => {
//     scrollToAns.current?.scrollTo({ top: scrollToAns.current.scrollHeight, behavior: "smooth" });
//   }, [result, loader]);

//   return (
//     <div className="relative h-[100dvh] w-full overflow-hidden bg-black font-sans">
//       <img src="/eclipse-bg.png" alt="bg" className="absolute inset-0 w-full h-full object-cover z-0 opacity-80" />

//       <div className="relative z-10 flex flex-col h-full w-full">

//         {/* 📱 RESPONSIVE NAVBAR */}
//         <div className="relative z-50 w-full flex justify-center pt-4 md:pt-6 shrink-0 px-2 md:px-4">
//           <motion.nav
//             initial={{ y: -100, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             className="flex items-center gap-3 md:gap-10 px-4 md:px-7 py-2.5 bg-black/40 border border-white/10 rounded-full backdrop-blur-2xl shadow-2xl group"
//           >
//             {/* LOGO & STATUS */}
//             <div className="flex items-center gap-2 md:gap-3">
//               <div className="relative flex items-center justify-center">
//                 <div className={`w-2 md:w-2.5 h-2 md:h-2.5 rounded-full transition-all duration-500 ${isSpeaking ? 'bg-purple-500 shadow-[0_0_12px_#a855f7]' : 'bg-cyan-500 shadow-[0_0_12px_#06b6d4]'} animate-pulse`} />
//                 {isSpeaking && (
//                   <motion.div
//                     initial={{ scale: 1, opacity: 0.5 }}
//                     animate={{ scale: 2.2, opacity: 0 }}
//                     transition={{ repeat: Infinity, duration: 1.5 }}
//                     className="absolute w-2 md:w-2.5 h-2 md:h-2.5 border border-purple-500 rounded-full"
//                   />
//                 )}
//               </div>

//               <span className="logo-font text-sm md:text-xl font-black tracking-[0.2em] md:tracking-[0.4em] text-white select-none whitespace-nowrap">
//                 ECLIPSE AI
//               </span>
//             </div>

//             <div className="h-5 w-[1px] bg-white/10"></div>

//             {/* NAVIGATION ACTIONS */}
//             <div className="flex items-center gap-3 md:gap-8">
//               <motion.button
//                 whileHover={{ y: -1, color: "#22d3ee" }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={startNewChat}
//                 className="text-[9px] md:text-[10px] font-bold text-white/40 uppercase tracking-[0.1em] md:tracking-[0.2em] transition-colors"
//               >
//                 New Chat
//               </motion.button>

//               <motion.button
//                 layout
//                 whileHover={{ y: -1 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setShowHistory(!showHistory)}
//                 className={`text-[9px] md:text-[10px] font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] transition-all px-3 md:px-5 py-1.5 rounded-full border ${showHistory
//                   ? 'bg-white/10 text-purple-400 border-white/20'
//                   : 'text-white/40 border-transparent hover:text-white'
//                   }`}
//               >
//                 {showHistory ? "Close" : "History"}
//               </motion.button>
//             </div>
//           </motion.nav>
//         </div>

//         <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden">
//           {/* 📰 SIDEBAR (Hidden on mobile/tablet, visible on XL screens) */}
//           <aside className="hidden xl:flex absolute left-6 top-1/2 -translate-y-1/2 w-52 h-[75vh] flex-col p-6 rounded-[2.5rem] border border-white/5 bg-white/[0.01] backdrop-blur-xl z-0">
//             <div className="flex items-center gap-2 mb-8 px-2">
//               <div className="h-1 w-1 rounded-full bg-cyan-500 animate-pulse"></div>
//               <span className="text-[8px] font-black tracking-[0.4em] text-white/30 uppercase">AI Protocol Facts</span>
//             </div>
//             <div className="flex-1 space-y-4 overflow-y-auto no-scrollbar">
//               {aiFacts.map((fact) => (
//                 <motion.div
//                   key={fact.id}
//                   whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.03)" }}
//                   className="p-2 rounded-xl transition-colors cursor-default group"
//                 >
//                   <div className="text-[7px] font-mono text-cyan-500/40 mb-1 group-hover:text-cyan-400 transition-colors">DATA_POINT_{fact.id}</div>
//                   <h4 className="text-[10px] font-bold text-white/40 group-hover:text-white transition-colors tracking-tight">{fact.title}</h4>
//                   <p className="text-[9px] text-white/10 group-hover:text-white/30 leading-relaxed transition-colors">{fact.text}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </aside>

//           {/* 🧠 MAIN CONTENT */}
//           <main className="flex-1 flex flex-col max-w-5xl w-full h-[90%] md:h-[88%] z-10 relative px-2 md:mx-4">
//             <div
//               ref={scrollToAns}
//               className="flex-1 min-h-0 overflow-y-auto bg-black/20 backdrop-blur-[2px] rounded-2xl md:rounded-[3rem] p-4 md:p-10 border border-white/10 no-scrollbar"
//             >
//               <AnimatePresence mode="wait">
//                 {showHistory ? (
//                   <motion.div key="history" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col items-center">
//                     <div className="text-[10px] font-black tracking-[0.4em] text-white/20 uppercase mb-8">Interaction History</div>
//                     <div className="w-full max-w-lg space-y-3">
//                       {recentHistory.map((h, i) => (
//                         <motion.div
//                           initial={{ opacity: 0, x: -10 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{ delay: i * 0.05 }}
//                           key={i}
//                           onClick={() => { setQuestion(h); setShowHistory(false); }}
//                           className="p-4 border border-white/5 bg-white/5 rounded-2xl text-xs text-white/40 hover:text-white hover:bg-white/10 cursor-pointer transition-all"
//                         >
//                           {h}
//                         </motion.div>
//                       ))}
//                     </div>
//                   </motion.div>
//                 ) : result.length > 0 ? (
//                   <div key="results" className="text-zinc-200">
//                     {result.map((item, index) => (
//                       <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 relative group">
//                         <QuestionAns item={item} index={index} />
//                         {item.type === "answer" && (
//                           <motion.button
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             onClick={() => speak(item.text)}
//                             className="mt-2 flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-[8px] md:text-[9px] font-black tracking-widest text-white/40 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all uppercase"
//                           >
//                             <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
//                             Execute Voice Link
//                           </motion.button>
//                         )}
//                       </motion.div>
//                     ))}
//                     {loader && (
//                       <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         className="flex items-center gap-3 p-3 md:p-4 bg-white/[0.02] border border-white/5 rounded-2xl w-fit mt-4"
//                       >
//                         <div className="flex gap-1">
//                           <span className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
//                           <span className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
//                           <span className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce"></span>
//                         </div>
//                         <span className="text-[9px] md:text-[10px] font-mono tracking-[0.1em] md:tracking-[0.2em] text-cyan-500/60 animate-pulse">
//                           SYSTEM_GENERATING...
//                         </span>
//                       </motion.div>
//                     )}
//                   </div>
//                 ) : (
//                   <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col items-center justify-center py-20">
//                     <div className="uppercase tracking-[0.3em] md:tracking-[0.5em] text-[8px] md:text-[9px] font-light opacity-30 select-none text-center">Quantum Link Established</div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* ⌨️ INPUT BAR (Responsive) */}
//             <div className="mt-4 md:mt-6 shrink-0 bg-black/60 border border-white/10 rounded-full md:rounded-[2rem] flex items-center p-1.5 md:p-2 backdrop-blur-md focus-within:border-white/20 transition-all">
//               <input
//                 className="flex-1 bg-transparent text-white px-4 md:px-6 outline-none text-sm md:text-base placeholder:text-white/20"
//                 onKeyDown={isEnter}
//                 value={question}
//                 onChange={(e) => setQuestion(e.target.value)}
//                 placeholder="Initialize inquiry..."
//               />
//               <button
//                 onClick={askQuestion}
//                 className="px-6 md:px-10 py-2.5 md:py-3 bg-gradient-to-br from-cyan-600 to-purple-800 text-white font-black rounded-full md:rounded-3xl hover:brightness-110 active:scale-95 transition-all uppercase text-[9px] md:text-[10px] tracking-widest whitespace-nowrap"
//               >
//                 Execute
//               </button>
//             </div>
//           </main>

//           <Telemetry isActive={loader || isSpeaking} />
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import QuestionAns from './components/QuestionAns';
import Telemetry from './components/Telemetry';
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(
    JSON.parse(sessionStorage.getItem('history')) || []
  );
  const [showHistory, setShowHistory] = useState(false);
  const scrollToAns = useRef(null);
  const [loader, setLoader] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // --- SPEECH ENGINE (HINDI + ENGLISH) ---
  const speak = (text) => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 0.9;

    const isHindi = /[\u0900-\u097F]/.test(text);

    if (isHindi) {
      const voices = window.speechSynthesis.getVoices();
      const hindiVoice = voices.find(v => v.lang.includes('hi-IN') || v.lang.includes('hi_IN'));
      if (hindiVoice) {
        utterance.voice = hindiVoice;
        utterance.lang = 'hi-IN';
      }
    } else {
      utterance.lang = 'en-US';
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const aiFacts = [
    { id: "01", title: "Neural Origin", text: "The first 'Neural SNARC' was built in 1951." },
    { id: "02", title: "Speed of Thought", text: "AI can process 1 trillion operations per second." },
    { id: "03", title: "AlphaGo Power", text: "AlphaGo used 1,920 CPUs and 280 GPUs to win." },
    { id: "04", title: "Language Scale", text: "Modern LLMs train on over 15 trillion tokens." },
    { id: "05", title: "Creative Logic", text: "AI can now generate 4K video from single prompts." },
    { id: "06", title: "Future Growth", text: "AI compute demand doubles every 6 months." },
  ];

  const startNewChat = () => {
    setResult([]);
    setQuestion('');
    setShowHistory(false);
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const askQuestion = async () => {
    if (!question.trim()) return;
    setShowHistory(false);

    const currentQuestion = question;
    setResult(prev => [...prev, { type: "question", text: currentQuestion }]);
    setQuestion('');

    let history = JSON.parse(sessionStorage.getItem('history')) || [];
    history = [currentQuestion, ...history].slice(0, 15);
    history = [...new Set(history)];
    sessionStorage.setItem('history', JSON.stringify(history));
    setRecentHistory(history);

    try {
      setLoader(true);
      // UPDATED: Using relative path for Vercel Rewrites
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: currentQuestion })
      });

      const data = await response.json();

      // Handle potential OpenRouter/Backend errors
      if (!response.ok) {
        throw new Error(data.error || "System Error");
      }

      const answer = data?.choices?.[0]?.message?.content || "No response";
      setResult(prev => [...prev, { type: "answer", text: answer }]);
    } catch (error) {
      setResult(prev => [...prev, { type: "answer", text: `❌ ${error.message}` }]);
    } finally {
      setLoader(false);
    }
  };

  const isEnter = (e) => { if (e.key === 'Enter') askQuestion(); };

  useEffect(() => {
    scrollToAns.current?.scrollTo({ top: scrollToAns.current.scrollHeight, behavior: "smooth" });
  }, [result, loader]);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-black font-sans">
      <img src="/eclipse-bg.png" alt="bg" className="absolute inset-0 w-full h-full object-cover z-0 opacity-80" />

      <div className="relative z-10 flex flex-col h-full w-full">

        {/* 📱 RESPONSIVE NAVBAR */}
        <div className="relative z-50 w-full flex justify-center pt-4 md:pt-6 shrink-0 px-2 md:px-4">
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center gap-3 md:gap-10 px-4 md:px-7 py-2.5 bg-black/40 border border-white/10 rounded-full backdrop-blur-2xl shadow-2xl group"
          >
            {/* LOGO & STATUS */}
            <div className="flex items-center gap-2 md:gap-3">
              <div className="relative flex items-center justify-center">
                <div className={`w-2 md:w-2.5 h-2 md:h-2.5 rounded-full transition-all duration-500 ${isSpeaking ? 'bg-purple-500 shadow-[0_0_12px_#a855f7]' : 'bg-cyan-500 shadow-[0_0_12px_#06b6d4]'} animate-pulse`} />
                {isSpeaking && (
                  <motion.div
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute w-2 md:w-2.5 h-2 md:h-2.5 border border-purple-500 rounded-full"
                  />
                )}
              </div>

              <span className="logo-font text-sm md:text-xl font-black tracking-[0.2em] md:tracking-[0.4em] text-white select-none whitespace-nowrap">
                ECLIPSE AI
              </span>
            </div>

            <div className="h-5 w-[1px] bg-white/10"></div>

            {/* NAVIGATION ACTIONS */}
            <div className="flex items-center gap-3 md:gap-8">
              <motion.button
                whileHover={{ y: -1, color: "#22d3ee" }}
                whileTap={{ scale: 0.95 }}
                onClick={startNewChat}
                className="text-[9px] md:text-[10px] font-bold text-white/40 uppercase tracking-[0.1em] md:tracking-[0.2em] transition-colors"
              >
                New Chat
              </motion.button>

              <motion.button
                layout
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowHistory(!showHistory)}
                className={`text-[9px] md:text-[10px] font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] transition-all px-3 md:px-5 py-1.5 rounded-full border ${showHistory
                  ? 'bg-white/10 text-purple-400 border-white/20'
                  : 'text-white/40 border-transparent hover:text-white'
                  }`}
              >
                {showHistory ? "Close" : "History"}
              </motion.button>
            </div>
          </motion.nav>
        </div>

        <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden">
          {/* 📰 SIDEBAR */}
          <aside className="hidden xl:flex absolute left-6 top-1/2 -translate-y-1/2 w-52 h-[75vh] flex-col p-6 rounded-[2.5rem] border border-white/5 bg-white/[0.01] backdrop-blur-xl z-0">
            <div className="flex items-center gap-2 mb-8 px-2">
              <div className="h-1 w-1 rounded-full bg-cyan-500 animate-pulse"></div>
              <span className="text-[8px] font-black tracking-[0.4em] text-white/30 uppercase">AI Protocol Facts</span>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto no-scrollbar">
              {aiFacts.map((fact) => (
                <motion.div
                  key={fact.id}
                  whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.03)" }}
                  className="p-2 rounded-xl transition-colors cursor-default group"
                >
                  <div className="text-[7px] font-mono text-cyan-500/40 mb-1 group-hover:text-cyan-400 transition-colors">DATA_POINT_{fact.id}</div>
                  <h4 className="text-[10px] font-bold text-white/40 group-hover:text-white transition-colors tracking-tight">{fact.title}</h4>
                  <p className="text-[9px] text-white/10 group-hover:text-white/30 leading-relaxed transition-colors">{fact.text}</p>
                </motion.div>
              ))}
            </div>
          </aside>

          {/* 🧠 MAIN CONTENT */}
          <main className="flex-1 flex flex-col max-w-5xl w-full h-[90%] md:h-[88%] z-10 relative px-2 md:mx-4">
            <div
              ref={scrollToAns}
              className="flex-1 min-h-0 overflow-y-auto bg-black/20 backdrop-blur-[2px] rounded-2xl md:rounded-[3rem] p-4 md:p-10 border border-white/10 no-scrollbar"
            >
              <AnimatePresence mode="wait">
                {showHistory ? (
                  <motion.div key="history" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col items-center">
                    <div className="text-[10px] font-black tracking-[0.4em] text-white/20 uppercase mb-8">Interaction History</div>
                    <div className="w-full max-w-lg space-y-3">
                      {recentHistory.map((h, i) => (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          key={i}
                          onClick={() => { setQuestion(h); setShowHistory(false); }}
                          className="p-4 border border-white/5 bg-white/5 rounded-2xl text-xs text-white/40 hover:text-white hover:bg-white/10 cursor-pointer transition-all"
                        >
                          {h}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ) : result.length > 0 ? (
                  <div key="results" className="text-zinc-200">
                    {result.map((item, index) => (
                      <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 relative group">
                        <QuestionAns item={item} index={index} />
                        {item.type === "answer" && (
                          <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={() => speak(item.text)}
                            className="mt-2 flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-[8px] md:text-[9px] font-black tracking-widest text-white/40 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all uppercase"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                            Execute Voice Link
                          </motion.button>
                        )}
                      </motion.div>
                    ))}
                    {loader && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-3 p-3 md:p-4 bg-white/[0.02] border border-white/5 rounded-2xl w-fit mt-4"
                      >
                        <div className="flex gap-1">
                          <span className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                          <span className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                          <span className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce"></span>
                        </div>
                        <span className="text-[9px] md:text-[10px] font-mono tracking-[0.1em] md:tracking-[0.2em] text-cyan-500/60 animate-pulse">
                          SYSTEM_GENERATING...
                        </span>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col items-center justify-center py-20">
                    <div className="uppercase tracking-[0.3em] md:tracking-[0.5em] text-[8px] md:text-[9px] font-light opacity-30 select-none text-center">Quantum Link Established</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ⌨️ INPUT BAR */}
            <div className="mt-4 md:mt-6 shrink-0 bg-black/60 border border-white/10 rounded-full md:rounded-[2rem] flex items-center p-1.5 md:p-2 backdrop-blur-md focus-within:border-white/20 transition-all">
              <input
                className="flex-1 bg-transparent text-white px-4 md:px-6 outline-none text-sm md:text-base placeholder:text-white/20"
                onKeyDown={isEnter}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Initialize inquiry..."
              />
              <button
                onClick={askQuestion}
                className="px-6 md:px-10 py-2.5 md:py-3 bg-gradient-to-br from-cyan-600 to-purple-800 text-white font-black rounded-full md:rounded-3xl hover:brightness-110 active:scale-95 transition-all uppercase text-[9px] md:text-[10px] tracking-widest whitespace-nowrap"
              >
                Execute
              </button>
            </div>
          </main>

          <Telemetry isActive={loader || isSpeaking} />
        </div>
      </div>
    </div>
  );
}