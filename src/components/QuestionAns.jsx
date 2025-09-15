
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";






function QuestionAns({ item, index }) {
    return (
        <div>
            <li key={index} className="mb-2">
                <div
                    className={`p-3 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl max-w-[60%] whitespace-pre-wrap
            ${item.type === "question"
                            ? "bg-blue-400 text-white ml-auto text-right w-fit"
                            : "bg-zinc-900 text-gray-200 mr-auto text-left"
                        }`}
                >
                    {item.type === "question" ? (
                        item.text
                    ) : (
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                            {item.text}
                        </ReactMarkdown>
                    )}
                </div>
            </li>
        </div>
    );
}

export default QuestionAns;





// import React from 'react';
// import ReactMarkdown from 'react-markdown';
// import { FaUser, FaRobot } from 'react-icons/fa';

// export default function QuestionAns({ item }) {
//     const isQuestion = item.type === 'question';

//     return (
//         <li className={`flex items-start gap-4 p-4 my-3 rounded-lg ${isQuestion ? 'bg-zinc-800' : ''}`}>
//             {/* Icon */}
//             <div className={`flex-shrink-0 p-2 rounded-full text-white ${isQuestion ? 'bg-blue-600' : 'bg-purple-600'}`}>
//                 {isQuestion ? <FaUser /> : <FaRobot />}
//             </div>
//             {/* Text Content */}
//             <div className="flex-1 overflow-x-auto text-zinc-200">
//                 <ReactMarkdown>{item.text}</ReactMarkdown>
//             </div>
//         </li>
//     );
// }

