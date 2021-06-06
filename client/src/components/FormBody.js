import React, { useEffect, useState } from 'react'
import NewQuestionButton from './questions/NewQuestionButton'
import QuestionsContext from './questions/QuestionsContext'
import NewQuestionHeader from './questions/NewQuestionHeader'
import { Button, Fade } from '@material-ui/core'
import FormSections from './sections/FormSections'


const FormBody = (props) => {
    const [form,setForm]= useState({})
    const [displayNewQuestionHeader,setDisplayNewQuestionHeader] = useState(false)

    const handleNewQuestion = () => {
        setDisplayNewQuestionHeader(true)
    }

    const handleCancelNewQuestion = () => {
        setDisplayNewQuestionHeader(false)
    }

    return (
        <>  
            <FormSections/>
            <QuestionsContext.Provider value={{handleNewQuestion}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                { displayNewQuestionHeader ? <NewQuestionHeader/> : <></>}
                { displayNewQuestionHeader ? <Button onClick={handleCancelNewQuestion}>Cancel New Question</Button> : <NewQuestionButton onClick={handleNewQuestion}></NewQuestionButton>}

            </div>
            </QuestionsContext.Provider>
        </>
    )
}

export default FormBody