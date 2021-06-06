import React, { useState } from 'react'

const Question = (props) => {
    const [question,setQuestion] = useState(props.question)
    const [edit,setEdit]= useState(false)
    return (
        <div>
            {question.name}
        </div>
    )
}

export default Question;