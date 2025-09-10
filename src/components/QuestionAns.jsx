


// function QuestionAns({ item, index }) {
//     return (
//         <div>
//             <li key={index} className="mb-2">
//                 <div className={`p-3 rounded-tl-3xl rounded-br-3xl  rounded-bl-3xl max-w-[60%] 
//       ${item.type === "question"
//                         ? "bg-blue-400 text-white ml-auto text-right w-fit "
//                         : " text-gray-200 mr-auto text-left"}`}>
//                     {item.text}
//                 </div>
//             </li>

//         </div>
//     )
// }
// export default QuestionAns;




import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";




// import "highlight.js/styles/github-dark.css"; // pick a theme


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




