import { Button, Divider, IconButton, TextField } from '@material-ui/core'
import React, {useState} from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import SectionNameField from './SectionNameField';
import SectionDescriptionField from './SectionDescriptionField';
import SectionQuestions from './SectionQuestions';


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
    sectionInputProps:{
        fontSize:"24px"
    }
  }));

const Section = (props) => {
    const classes = useStyles()
    const [name,setName] = useState(props.name)
    const [description,setDescription] = useState(props.description)
    const [sectionId,setSectionId] = useState(props.id)
    const [questions,setQuestions] = useState(props.questions)

    return (
        <div 
            className={"form-question-section"}
            style={{
            width:"100%",
            display:"flex",
            flexDirection:"column",
        }}>
            <SectionNameField sectionName={name} sectionId={sectionId}></SectionNameField>
            <SectionDescriptionField sectionId={sectionId} description={description}></SectionDescriptionField>
            <SectionQuestions questions={questions} sectionName={name} sectionId={sectionId}></SectionQuestions>
        </div>
    )
}

export default Section;