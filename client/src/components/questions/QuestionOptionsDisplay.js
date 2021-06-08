import React, {useState} from 'react'

const QuestionOptionsDisplay = (props) => {
    const [options,setOptions] = useState(props.options) 
    if (options !== props.options) setOptions(props.options)

    return (
        <div 
            style={{
                display:"flex",
                flexDirection:"column",
                width:"100%",
                paddingLeft:"50px"
            }}>
            {
                options.map(option=>{
                    return (
                        <span>{option.label}</span>
                    )
                })
            }
        </div>
    )
}

export default QuestionOptionsDisplay;