import { IconButton, MenuItem, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import QuestionForm from './QuestionForm'
import QuestionTabs from './QuestionTabs';
import AdjustIcon from '@material-ui/icons/Adjust';
import Cookies from 'js-cookie'



const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: "180px",
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      select: {
        padding:"0px",
        paddingLeft:"12px",
        outline:"none",
        minHeight:"56px",
        background:"white",
        display:"flex",
        flexDirection:"row",
        alignItems:"center"
      },
      menuItemOption: {
          marginRight:"4px",
          color:"darkgray"
      },
      questionInput: {
          backgroundColor:"rgb(70 58 58 / 6%)",
          fontSize:"18px",
      },
      input: {
          paddingTop:"15px",
          paddingBottom:"14px"
      }
}));

const NewQuestionHeader = (props) => {
    const classes = useStyles()
    const [sectionId,setSectionId] = useState(props.sectionId)
    if (sectionId !== props.sectionId) setSectionId(props.sectionId)
    const [questionLabel,setQuestionLabel] = useState("")
    const [questionId,setQuestionId] =useState()
    const [headerSubmit,setHeaderSubmit] = useState(false)
    const [type,setType]=useState("mc")

    const handleInput = (e) => {
        setQuestionLabel(e.target.value)
    }

    const handleChange = (event) => {
        const name = event.target.value;
        setType(name)
    };

    useEffect(()=>{
        const createQuestion = async (question) => {
            const jsonQuestion = JSON.stringify(question)
            const csrfToken = Cookies.get("XSRF-TOKEN")
            const response = await fetch(`/api/questions/create`,
                {
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    body: jsonQuestion
                }
            )
            const data = await response.json()
            console.log("question from data",data.question)
            setQuestionId(data.question.id)
            console.log(data.question)
        }
        if (headerSubmit) {
            createQuestion({"label":questionLabel,"type":type,section_id:sectionId})
        }
    },[headerSubmit])


    return (

            <div style={{
                display:"flex",
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"center"
            }}>
            {  headerSubmit && questionLabel && type && questionId ?
                <QuestionTabs label={questionLabel} type={type} responses={[]} questionId={questionId}></QuestionTabs>
                :
                <>  
            <form style={{width:"100%",paddingLeft:"8px"}} onSubmit={(e)=>{
                e.preventDefault()
                setHeaderSubmit(true)
                }}>
            <TextField
                autoFocus
                InputProps={{
                    className:classes.questionInput
                }}
                inputProps={{
                    className:classes.input
                }}
                fullWidth
                variant={"filled"}
                // helperText="To create a question, enter the text for your question, select a question type and press `Enter`"
                placeholder="Question"
                value={questionLabel}
                onChange={(e)=>handleInput(e)}
            >
            </TextField>
            </form>
            <FormControl variant="outlined" className={classes.formControl}>
                {/* <InputLabel htmlFor="filled-age-native-simple">Type</InputLabel> */}
                <Select
                inputProps={{
                    className:classes.select
                }}
                value={type}
                onChange={handleChange}
                >
                <MenuItem value={"mc"}> <AdjustIcon className={classes.menuItemOption}></AdjustIcon> Multiple Choice</MenuItem>
                <MenuItem value={2}>Drop Down</MenuItem>
                <MenuItem value={3}>Checkboxes</MenuItem>
                <MenuItem value={4}>Radio</MenuItem>
                <MenuItem value={5}>File Upload</MenuItem>
                <MenuItem value={6}>Short Text</MenuItem>
                <MenuItem value={7}>Long Text</MenuItem>
                </Select>
            </FormControl>
            </>
            }
            </div>
    )
}

export default NewQuestionHeader;