import { Button } from '@material-ui/core'
import React, { useContext } from 'react'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import QuestionsContext from './QuestionsContext';

const NewQuestionButton = (props) => {
    
    return (
        <Button 
            style={{marginTop:"10px"}}
            variant={"outlined"} 
            onClick={props.handleNewQuestion}
            startIcon={<AddCircleOutlineOutlinedIcon/>}>
                Add Question
        </Button>
    )
}

export default NewQuestionButton;