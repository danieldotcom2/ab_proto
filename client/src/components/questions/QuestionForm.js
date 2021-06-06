import { IconButton, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const QuestionForm = (props) => {
    const classes = useStyles()
    const [headerSubmit,setHeaderSubmit]=useState(false)
    const [questionLabel,setQuestionLabel] = useState(props.label)
    const [type,setType]=useState(props.type)

    const handleInput = (e) => {
        setQuestionLabel(e.target.value)
    }

    const handleChange = (event) => {
        const name = event.target.value;
        setType(name)
    };


    return (

            <div style={{
                display:"flex",
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"center",
                width:"100%"
            }}>
            <form style={{width:"100%"}} onSubmit={(e)=>{
                e.preventDefault()
                setHeaderSubmit(true)
                }}>
            <TextField
                fullWidth
                autoFocus
                label="Enter your question, select a question type and press `Enter`"
                // helperText="To create a question, enter the text for your question, select a question type and press `Enter`"
                variant="filled"
                placeholder="Enter your question"
                value={questionLabel}
                onChange={(e)=>handleInput(e)}
            >
            </TextField>
            </form>
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel htmlFor="filled-age-native-simple">Type</InputLabel>
                <Select
                native
                value={type}
                onChange={handleChange}
                >
                <option value={1}>Multiple Choice</option>
                <option value={2}>Drop Down</option>
                <option value={3}>Checkboxes</option>
                <option value={4}>Radio</option>
                <option value={5}>File Upload</option>
                <option value={6}>Short Text</option>
                <option value={7}>Long Text</option>
                </Select>
            </FormControl>
            
            </div>
    )
}

export default QuestionForm;