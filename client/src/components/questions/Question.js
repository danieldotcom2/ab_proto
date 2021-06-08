import React, { useState } from 'react'
import QuestionOptionsDisplay from './QuestionOptionsDisplay'
import QuestionTabs from './QuestionTabs'

const Question = (props) => {
    const [question,setQuestion] = useState(props.question)
    const [index, setIndex] = useState(props.index)
    // if (question !== props.question) setQuestion(props.question)
    const [edit,setEdit]= useState(false)

    const acceptChanges = () => {
        setEdit(false)
    }
    return (
        <>
        {!edit 
        ?
        <div onClick={()=>setEdit(true)} style={{padding:"10px"}} className="form-field">
            <div style={{display:"flex",flexDirection:"row"}}>
                <span>{index + 1}.</span>
                <span style={{marginLeft:"4px"}}>{question.label}</span>
            </div>
            <QuestionOptionsDisplay options={question.question_responses}></QuestionOptionsDisplay>
        </div>
        :
        <QuestionTabs label={question.label} type={question.type} responses={question.question_responses} questionId={question.id} acceptChanges={acceptChanges}></QuestionTabs>
        }
        </>
    )
}

export default Question;