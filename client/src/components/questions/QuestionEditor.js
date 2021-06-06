import React, {useState, useEffect} from 'react'
import MultipleChoiceResponseForm from './MultipleChoiceResponseForm'
import QuestionForm from './QuestionForm'

const QuestionEditor = (props) => {
    const [label,setLabel] = useState(props.label)
    const [type,setType] = useState(props.type)
    const [responses,setResponses] = useState(props.responses)

    useEffect(()=>{
        setResponses(props.responses)
        console.log("props",props.responses)
    },[props])

    let response;
    if (type === "mc") {
        response = <MultipleChoiceResponseForm responses={responses}></MultipleChoiceResponseForm>
    }
    return (
        <>
        <QuestionForm type={type} label={label}></QuestionForm>
        {response}
        </>
    )
}

export default QuestionEditor;