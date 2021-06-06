import React from 'react'



const SectionHeaderDisplay = (props) => {
    const [name,setName] = useState(props.name)
    const [description, setDescription] = useState(props.description) 
    return (
        <div>
            {sectionName}
        </div>
    )
}

export default SectionHeaderDisplay;