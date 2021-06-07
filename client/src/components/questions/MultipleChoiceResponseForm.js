import { IconButton, TextField } from '@material-ui/core';
import React, {useEffect, useState} from 'react'
import SaveIcon from '@material-ui/icons/Save';
import CustomTextField from './CustomTextField'
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
            <div style={{display:"flex",flexDirection:"row",width:"100%"}}>
            <div style={{display:"flex",flexDirection:"column",width:"100%",alignItems:"center"}}>
                {responses.map((response,index)=>{
                console.log("YYEEE")
                return (
                    <CustomTextField value={responses[index].label} onChange={(e)=>handleEdit(e,index)}></CustomTextField>
                )
                })}
            <form style={{width:"100%",display:"flex",flexDirection:"row",justifyContent:"center"}} onSubmit={handleNewResponse}>
            <CustomTextField 
                value={newResponseLabel} 
                onChange={(e)=>setNewResponseLabel(e.target.value)}>
            </CustomTextField>
            </form>
            </div>
            </div>
            
            <div style={{flexDirection:"row",display:"flex",width:"100%"}}>
                <IconButton>
                    <SaveIcon></SaveIcon>
                </IconButton>
            </div>
        </div>
    )
}

export default MultipleChoiceResponseForm;