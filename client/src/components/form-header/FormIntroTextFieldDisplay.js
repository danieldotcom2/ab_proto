import React, { useEffect,useState } from 'react'
import Radium from 'radium'
import { TextField } from '@material-ui/core'
import { Grid, Container, Card, InputBase, CircularProgress, Input, TextareaAutosize } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

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
    },
    formInputProps:{
        cursor:"pointer"
    }
  }));

const buttonStyle = {
    fontFamily:"Google Sans,Roboto,Arial,sans-serif",
    display:"flex",
    flexDirection:"row",
    borderRadius:"4px",
    cursor:"pointer",
    alignItems:"center",
    transition:".2s",
    transition:"border 280ms  cubic-bezier(.4,0,.2,1) ,box-shadow 280ms cubic-bezier(.4,0,.2,1),background-color 280ms cubic-bezier(.4,0,.2,1)",
    // boxShadow:"rgb(0 0 0 / 13%) 0px 3.2px 7.2px 0px, rgb(0 0 0 / 11%) 0px 0.6px 1.8px 0px",
    // boxShadow:"rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
    backgroundColor:"white",
    // backgroundImage:"linear-gradient(to bottom, #ff6e7f 0%, white 100%)",
    ':hover':{
        // backgroundColor:"gainsboro",
        // boxShadow:"0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%)",
        backgroundColor:"whitesmoke"
        // transform:"scale(1.02)",
        // boxShadow:"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    }
}


const RadiumFormNameField = ({formName,handleEdit}) => {
    const classes = useStyles()
        return (
        <div style={buttonStyle} onClick={handleEdit}>
            {/* <div>
                {formName ? formName : ""}
            </div> */}
            <TextField  
                    value={formName}
                    required={false}
                    multiline
                    rows={3}
                    fullWidth
                    variant={"outlined"}
                    rowsMax={Infinity}
                    label="Form Intro Text"
                    placeholder="Enter intro text for your form..."
                    helperText="This optional text appears at the top of the form."
                    size="small"
                    style={{paddingLeft:"10px",paddingRight:"10px"}}
                    margin="normal"
                    InputProps={{
                        className:classes.formInputProps
                    }}
                    InputLabelProps={{
                        shrink: true,
                        className:classes.formLabelProps
                    }}
                    FormHelperTextProps={{
                            className: classes.helperText
                                    }}
                />
        </div>
    )
}

const FormNameFieldDisplay = Radium(RadiumFormNameField);

export default FormNameFieldDisplay