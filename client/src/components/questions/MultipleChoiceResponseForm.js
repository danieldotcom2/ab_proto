import { TextField } from '@material-ui/core';
import React, {useEffect, useState} from 'react'

const MultipleChoiceResponseForm = (props) => {
    const [responses,setResponses] = useState([])
    const [newResponseLabel,setNewResponseLabel] = useState("")

    useEffect(()=>{
        setResponses(props.responses)
    },[props])

    const handleEdit = (e,index) => {
        const responsesEdit = [...responses]
        const responseEdit = Object.assign({},responsesEdit[index])
        responseEdit.label = e.target.value
        responsesEdit[index] = responseEdit
        setResponses(responsesEdit)
    }

    const handleNewResponse = (e)=>{
        e.preventDefault()
        setResponses([...responses,{label:newResponseLabel}])
        setNewResponseLabel("")
    }

    return (
        <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
            {responses.map((response,index)=>{
                console.log("YYEEE")
                return (
                    <TextField value={responses[index].label} onChange={(e)=>handleEdit(e,index)}></TextField>
                )
                })}
            <form style={{width:"100%"}} onSubmit={handleNewResponse}>
            <TextField fullWidth value={newResponseLabel} onChange={(e)=>setNewResponseLabel(e.target.value)}></TextField>
            </form>
        </div>
    )
}

export default MultipleChoiceResponseForm;