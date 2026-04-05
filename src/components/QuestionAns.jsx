import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

function QuestionAns({ item, index }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!item.text) return;
        navigator.clipboard.writeText(item.text);
        setCopied(true);
        // Reset the "Copied" state after 2 seconds
        setTimeout(() => setCopied(false), 2000);
    };

    const isQuestion = item.type === "question";

    return (
        <div key={index} className="mb-4 group">
            <li className="list-none">
                <div
                    className={`relative p-4 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl max-w-[85%] md:max-w-[70%] transition-all duration-300
            ${isQuestion
                            ? "bg-blue-500/80 text-white ml-auto text-right w-fit shadow-lg shadow-blue-500/10"
                            : "bg-white/5 text-zinc-100 mr-auto text-left border border-white/10 backdrop-blur-sm"
                        }`}
                >
                    {/* Markdown Content */}
                    <div className="prose prose-invert prose-sm md:prose-base max-w-none">
                        {isQuestion ? (
                            <span className="block whitespace-pre-wrap">{item.text}</span>
                        ) : (
                            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                {item.text}
                            </ReactMarkdown>
                        )}
                    </div>

                    {/* Copy Button - Only visible for AI answers on hover */}
                    {!isQuestion && (
                        <div className="mt-3 flex items-center justify-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-2 px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 active:scale-95 transition-all"
                                title="Copy to clipboard"
                            >
                                {copied ? (
                                    <>
                                        <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-tighter">Copied</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-3.5 h-3.5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-tighter">Copy</span>
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </li>
        </div>
    );
}

export default QuestionAns;