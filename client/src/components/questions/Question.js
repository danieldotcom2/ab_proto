import React, { useState } from 'react'
import QuestionTabs from './QuestionTabs'

const Question = (props) => {
    const [question,setQuestion] = useState(props.question)
    const [index, setIndex] = useState(props.index)
    // if (question !== props.question) setQuestion(props.question)
    const [edit,setEdit]= useState(false)
    return (
        <>
        {!edit 
        ?
        <div onClick={()=>setEdit(true)} style={{padding:"10px"}} className="form-field">
            <div style={{display:"flex",flexDirection:"row"}}>
                <span>{index + 1}.</span>
                <span style={{marginLeft:"4px"}}>{question.label}</span>
                </div>
        </div>
        :
        <QuestionTabs label={question.label} type={question.type} responses={question.question_responses}></QuestionTabs>
        }
        </>
    )
}

export default Question;