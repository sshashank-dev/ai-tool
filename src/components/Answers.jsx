import { useEffect, useState } from "react";
import { replaceHeadingStars } from "../helper";
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import RectMarkdown from 'react-markdown'
import ReactMarkdown from "react-markdown";
import "highlight.js/styles/github-dark.css";

const Answers = ({ Ans, totalResult, index }) => {



    const [heading, setHeading] = useState(false)
    const [answer, setAnswer] = useState(Ans)







    useEffect(() => {
        if (checkHeading(Ans)) {
            setHeading(true)
            setAnswer(replaceHeadingStars(Ans))
        }


    }, [])

    function checkHeading(str) {
        return /^(\*)(\*)(.*)\$/.test(str)
    }


    const render = {
        code({ node, inline, classname, children, ...props }) {
            const match = /language-(\w+)/.exec(classname || '');
            return !inline && match ? (
                <SyntaxHighLighter
                    {...props}
                    children={String(children).replace(/\n$/, '')}
                    language={match[1]}
                    style={dark}
                    preTag="div"

                />


            ) : (

                <code {...props} className={classname}>
                    {children}

                </code>
            )
        }
    };









    return (
        <>
            <div className="answers-container p-2 max-w-[75%]">
                {
                    index == 0 ? <span className="pt-2 text-xl block text-white max-w-[75%]"> {answer} </span> :
                        heading ? <span className="pt-2 text-xl block text-white">
                            <ReactMarkdown components={render}>  {answer}</ReactMarkdown>
                        </span > : <span className="pl-5 "> {answer}</span>
                }
            </div>
        </>
    )
}


export default Answers;


