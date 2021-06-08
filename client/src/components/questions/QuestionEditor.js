import React, {useState, useEffect} from 'react'
import MultipleChoiceResponseForm from './MultipleChoiceResponseForm'
import QuestionForm from './QuestionForm'

const QuestionEditor = (props) => {
    const [label,setLabel] = useState(props.label)
    const [type,setType] = useState(props.type)
    const [questionId,setQuestionId] =useState(props.questionId)
    const [responses,setResponses] = useState(props.responses)
    const [savingQuestion,setSavingQuestion] = useState(false)
    const [question,setQuestion]=useState({})

    useEffect(()=>{
        setResponses(props.responses)
        setQuestionId(props.questionId)
        console.log("props",props.responses)
    },[props])

    // useEffect(()=>{
    //     const saveQuestion = async () => {
    //         const response = await fetch('/api/questions/')
    //     }
    //     if (savingQuestion) {
    //         saveQuestion(question)
    //     }
    // },[savingQuestion])

    let response;
    if (type === "mc") {
        response = <MultipleChoiceResponseForm questionId={questionId} responses={responses} acceptChanges={props.acceptChanges}></MultipleChoiceResponseForm>
    }
    return (
        <>
        <div style={{display:"flex",flexDirection:"column",width:"100%",backgroundColor:"white"}}>
            <QuestionForm type={type} label={label}></QuestionForm>
            {response}
        </div>

        </>
    )
}

export default QuestionEditor;