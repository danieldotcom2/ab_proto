import { Button, TextField } from '@material-ui/core';
import { Grid, Container, Card, InputBase, CircularProgress, Input, TextareaAutosize } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import FormNameFieldDisplay from './FormNameFieldDisplay';
import Cookies from 'js-cookie'
import FormTitileFieldDisplay from './FormTitleFieldDisplay';

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
    inputProps: {
        fontSize:"38px",
        fontWeight:"lighter"
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


export default function FormTitleField(props) {
    const classes = useStyles();
    const [edit,setEdit]=useState(false)
    const [title,setTitle] = useState("")
    const [savingForm,setSavingForm] =useState(false)
    const [currentTitle,setCurrentTitle] = useState("")

    useEffect(()=>{
        setTitle(props.formTitle)
        setCurrentTitle(props.formTitle)
    },[props])

    const handleSave = () => {
        setSavingForm(true)
    }

    const handleCancel = () => {
        setTitle(currentTitle)
        setEdit(false)
    }

    const handleEdit = () => {
        setCurrentTitle(title)
        setEdit(true)
    }

    const {id} = useParams()

    useEffect(() => {
        const saveForm = async (formName) => {
            const csrfToken = Cookies.get("XSRF-TOKEN")
            const titleObj = {form_title:title}
            const jsonForm = JSON.stringify(titleObj)
            const response = await fetch(`/api/forms/update-form-title/${id}`,{
                headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken,
                },
                method:"PATCH",
                body: jsonForm
            })
            const data = await response.json();
            setSavingForm(false)
            setCurrentTitle(data.form.form_title)
            // setCreatedForm(data.form)
      }
      if (savingForm) {
        saveForm({form_title:title})
      }
    }
  ,[savingForm])

    return (
        <>
            <div className={"form-field"} style={{display:'flex',flexDirection:'column'}}>
                <form 
                    style={{
                        paddingLeft:"10px",
                        paddingRight:"10px"
                    }}
                    onSubmit={(e)=>{
                    e.preventDefault()
                    handleSave()
                    }
                }>
                <TextField 
                    fullWidth
                    autoFocus 
                    required
                    onChange={(e)=>setTitle(e.target.value)} 
                    value={title}
                    size="medium"
                    label="Form Title"
                    placeholder="Enter a title for your form..."
                    helperText="This can be the same as the form name, or a slightly longer version. Form titles appear at the top of a form when the form is open."
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        className: classes.inputProps
                    }}
                    FormHelperTextProps={{
                            className: classes.helperText
                                    }}
                />
                { currentTitle === title 
                ? 
                <></>
                :
                <div style={{display:'flex',flexDirection:'row',justifyContent:"flex-end",paddingRight:"6.48px"}}>
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