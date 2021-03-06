import Radium from 'radium'
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
        backgroundColor:"whitesmoke",
        // boxShadow:"0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%)",

        // transform:"scale(1.02)",
        // boxShadow:"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    }
}


const RadiumFormTitleField = ({formTitle,handleEdit}) => {
    const classes = useStyles();
        return (
        <div style={buttonStyle} onClick={handleEdit}>
            <div style={{fontWeight:500,width:"100%",paddingLeft:"10px",paddingRight:"10px",fontFamily:"'Source Sans Pro', \"Helvetica Neue\", Helvetica, Arial, sans-serif !important",fontSize:"32px"}}>
                <TextField 
                    required
                    fullWidth
                    value={formTitle}
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
            </div>
        </div>
    )
}

const FormTitleFieldDisplay = Radium(RadiumFormTitleField);

export default FormTitleFieldDisplay