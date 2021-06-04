import React, { useEffect, useState } from 'react'
import { Grid, Container, Card, InputBase, TextField, CircularProgress, Input, TextareaAutosize } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormNameFieldDisplay from './FormNameFieldDisplay';
import FormNameField from './FormNameField';
import FormTitleField from './FormTitleField';
import chroma from 'chroma-js'
import ColorPicker from '../color-picker/ColorPicker';

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


const FormHeader = ({form}) => {
    const classes = useStyles();
    const [editHeader,setEditHeader] = useState(false)
    const [formName,setFormName] =useState("")
    const [formTitle,setFormTitle]=useState("")
    const [formIntroText,setFormIntroText]=useState("")
    const [primaryColor,setPrimaryColor] = useState("")
    const [secondaryColor,setSecondaryColor] =useState("")

    useEffect(()=>{
        setFormName(form.form_name)
        setFormTitle(form.form_title)
        setFormIntroText(form.form_intro_text)
        setSecondaryColor(form.custom_color_secondary)
        setPrimaryColor(form.custom_color_primary)
    },[form])
    

    const editHeaderHandler = () => {
        setEditHeader(true)
    }

    const handleFormNameInput = (e) => {
        setFormName(e.target.value)
    }

    const handleFormTitleInput = (e) => {
        setFormTitle(e.target.value)
    }

    const lighter = chroma("#7986cb").brighten().hex()
    const darken = chroma("#7986cb").darken().hex()

    console.log("lighter: ",lighter)
    console.log("darken: ",darken)
    
    return (
        <>
            <div className="form-header__main form-section">
                <div className="form-header-stripe"></div>
                    {/* <FormWhiteLabelField/>
                    <FormStartButtonVisibileToField/> */}
                    {/* <FormNameField/> */}
                    {/* <FormTitleField/>
                    <FormIntroTextField/>
                    <FormCustomColorPrimaryField/>
                    <FormCustomColorSecondaryField/> */}
                    <FormNameField formName={formName}/>
                    <FormTitleField formTitle={formTitle}/>
                    <ColorPicker secondary={secondaryColor} primaryColor={primaryColor}></ColorPicker>
                        {/* <TextField
                            label="Form Name"
                            placeholder="Enter a name for your form..."
                            helperText="This should be fairly short but also descriptive. Forms are displayed by their form name along other forms in drop-down menus and other lists."
                            size="small"
                            variant="outlined"
                            value={formName || ""}
                            onChange={(e)=>handleFormNameInput(e)}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            FormHelperTextProps={{
                                    className: classes.helperText
                                }}
                        />
                        <TextField
                            label="Form Title"
                            placeholder="Untitled Form"
                            helperText="Form titles will display at the top of the page when a form is a open. A form's title can be the same as the form's name or a slightly longer version of it."
                            value={formTitle || ""}
                            onChange={(e)=>handleFormTitleInput(e)}
                            margin="normal"
                            variant="filled"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                classes: {
                                  input: classes.formTitleText,
                                },
                              }}
                            FormHelperTextProps={{
                                className: classes.helperText
                            }}
                        />
                        <p className="MuiFormHelperText-root">
                            Form Description
                        </p>
                        <TextareaAutosize
                            style={{
                                width:"100%",
                                border:"1px solid #dadce0",
                                borderRadius:"4px"
                            }}
                            rowsMin={2}
                            aria-label="maximum height"
                            placeholder="Maximum 4 rows"
                            defaultValue="Form Description"
                        />
                        <p className="MuiFormHelperText-root">
                            This optional text appears at the top of the form along with form title.
                        </p> */}
                    </div>
        </>
    )
}
export default FormHeader;