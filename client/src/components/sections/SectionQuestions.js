import React, { useState } from 'react'
import NewQuestionButton from '../questions/NewQuestionButton'
import NewQuestionHeader from '../questions/NewQuestionHeader'
import Question from '../questions/Question'

const SectionQuestions = (props) => {
    const [questions,setQuestions] = useState(props.questions)
    const [displayNewQuestionHeader,setDisplayNewQuestionHeader] = useState(false)

    const handleNewQuestion = () => {
        setDisplayNewQuestionHeader(true)
    }
    return (
        <>
            {questions.map((question,index)=>{
                return (
                    <Question question={question} index={index}></Question>
                )
            })}

            {
                displayNewQuestionHeader 
                ?
                <NewQuestionHeader></NewQuestionHeader>
                :
                <NewQuestionButton 
                    questions={questions} 
                    setQuestions={setQuestions}
                    handleNewQuestion={handleNewQuestion}
                ></NewQuestionButton>
            }
        </>
    )
}

export default SectionQuestions;