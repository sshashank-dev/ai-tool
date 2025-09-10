import { useEffect, useState } from "react";
import { replaceHeadingStars } from "../helper";
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import RectMarkdown from 'react-markdown'
import ReactMarkdown from "react-markdown";

const Answers = ({ Ans, totalResult, index }) => {



    const [heading, setHeading] = useState(false)
    const [answer, setAnswer] = useState(Ans)
    // console.log(index);


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
    }

    return (
        <>
            {
                index == 0 ? <span className="pt-2 text-xl block text-white"> {answer} </span> :
                    heading ? <span className="pt-2 text-xl block text-white">
                        <ReactMarkdown components={render}>  {answer}</ReactMarkdown>
                    </span > : <span className="pl-5 "> {answer}</span>
            }




            {/* {Ans} */}

        </>
    )
}


export default Answers;