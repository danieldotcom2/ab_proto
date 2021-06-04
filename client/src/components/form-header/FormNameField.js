import { Button, TextField } from '@material-ui/core';
import { Grid, Container, Card, InputBase, CircularProgress, Input, TextareaAutosize } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import FormNameFieldDisplay from './FormNameFieldDisplay';
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


export default function FormNameField(props) {
    const classes = useStyles();
    const [edit,setEdit]=useState(false)
    const [name,setName] = useState("")
    const [formName,setFormName] = useState("")
    const [savingForm,setSavingForm] =useState(false)
    const [currentName,setCurrentName] = useState("")

    useEffect(()=>{
        setName(props.formName)
    },[props])

    const handleSave = () => {
        setSavingForm(true)
    }

    const handleCancel = () => {
        setName(currentName)
        setEdit(false)
    }

    const handleEdit = () => {
        setCurrentName(name)
        setEdit(true)
    }

    const {id} = useParams()

    useEffect(() => {
        const saveForm = async (formName) => {
            const csrfToken = Cookies.get("XSRF-TOKEN")
            const nameObj = {form_name:name}
            const jsonForm = JSON.stringify(nameObj)
            const response = await fetch(`/api/forms/update-form-name/${id}`,{
                headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken,
                },
                method:"PATCH",
                body: jsonForm
            })
            const data = await response.json();
            setSavingForm(false)
            setEdit(false)
            console.log(data)
            // setCreatedForm(data.form)
      }
      if (savingForm) {
        saveForm({form_name:name})
      }
    }
  ,[savingForm])

    return (
        <>
        {
            edit
            ?
            <div style={{display:'flex',flexDirection:'column'}}>
                <form onSubmit={(e)=>{
                    e.preventDefault()
                    handleSave()
                    }
                }>
                <TextField 
                    fullWidth 
                    autoFocus 
                    onChange={(e)=>setName(e.target.value)} 
                    value={name}
                    label="Form Name"
                    placeholder="Enter a name for your form..."
                    helperText="This should be fairly short but also descriptive. Forms are displayed by their form name along other forms in drop-down menus and other lists."
                    size="small"
                    variant="outlined"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    FormHelperTextProps={{
                            className: classes.helperText
                                    }}
                />
                <div style={{display:'flex',flexDirection:'row',justifyContent:"flex-end"}}>
                    <GreenColorButton fullWidth={false} onClick={handleSave}>
                        save
                    </GreenColorButton>
                    <RedColorButton fullWidth={false} onClick={handleCancel}>
                        cancel
                    </RedColorButton>
                </div>
                </form>
            </div>
            :
            <FormNameFieldDisplay formName={name} handleEdit={handleEdit}/>
        }
        </>
    )
}