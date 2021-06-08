import { Button, TextField } from '@material-ui/core';
import { Grid, Container, Card, InputBase, CircularProgress, Input, TextareaAutosize } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import Cookies from 'js-cookie'

const useStyles = makeStyles((theme) => ({
    formTitleText: {
      fontSize:"38px"
    },
    formNameText: {
      padding: theme.spacing(1),
    },
    helperText: {
        textAlign:"center",
    },
    formLabelProps:{
        paddingLeft:"10px"
    }
  }));

const GreenColorButton = withStyles((theme) => ({
root: {
    color: "white",
    paddingRight: "10px",
    paddingLeft: "10px",
    outline:"none",
    margin: "4px",
    backgroundColor:"#a9a9a9",
    '&:hover': {
        backgroundColor: "yellowgreen !important",
    }
},
}))(Button);

const RedColorButton = withStyles((theme) => ({
    root: {
        color: "white",
        paddingRight: "10px",
        paddingLeft: "10px",
        outline:"none",
        margin: "4px",
        backgroundColor:"#a9a9a9",
        '&:hover': {
            backgroundColor: "tomato !important",
        }
    },
    }))(Button);


export default function SectionNameField(props) {
    const classes = useStyles();
    const [edit,setEdit]=useState(false)
    const [name,setName] = useState("")
    const [formName,setFormName] = useState("")
    const [savingForm,setSavingForm] =useState(false)
    const [currentName,setCurrentName] = useState("")
    const [sectionId,setSectionId] = useState(props.sectionId)

    useEffect(()=>{
        setName(props.sectionName)
        setCurrentName(props.sectionName)
    },[props])

    const handleSave = () => {
        setSavingForm(true)
    }

    const handleCancel = () => {
        setName(currentName)
        setEdit(false)
    }

    const {id} = useParams()

    useEffect(() => {
        const saveForm = async (formName) => {
            const csrfToken = Cookies.get("XSRF-TOKEN")
            const nameObj = {section_name:name}
            const jsonForm = JSON.stringify(nameObj)
            const response = await fetch(`/api/sections/update-name/${sectionId}`,{
                headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken,
                },
                method:"PATCH",
                body: jsonForm
            })
            const data = await response.json();
            setCurrentName(data.section.name)
            setSavingForm(false)
            // setCreatedForm(data.form)
      }
      if (savingForm) {
        saveForm({form_name:name})
      }
    }
  ,[savingForm])

    return (
        <>
            <div className={"form-field"} style={{display:'flex',flexDirection:'row'}}>
                <form 
                    onSubmit={(e)=>{
                        e.preventDefault()
                        handleSave()
                        }}
                    style={{width:"100%"}}
                    >
                <TextField  
                    fullWidth
                    required
                    autoFocus
                    onChange={(e)=>setName(e.target.value)} 
                    value={name}
                    label="Section Name"
                    placeholder="Enter a name for this section..."
                    helperText="Section names ar optional and will appear at the top of each form section"
                    size="small"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                        className:classes.formLabelProps
                    }}
                    FormHelperTextProps={{
                            className: classes.helperText
                                    }}
                />
                {
                    name === currentName 
                    ?
                    <></>
                    :
                    <div style={{display:'flex',flexDirection:'row',justifyContent:"flex-end"}}>
                    <GreenColorButton fullWidth={false} onClick={handleSave}>
                        save
                    </GreenColorButton>
                    <RedColorButton fullWidth={false} onClick={handleCancel}>
                        cancel
                    </RedColorButton>
                </div>}
                </form>
            </div>
        </>
    )
}