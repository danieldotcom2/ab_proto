import { Divider, IconButton, TextField } from '@material-ui/core';
import React, {useEffect, useState} from 'react'
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CustomTextField from './CustomTextField'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckIcon from '@material-ui/icons/CheckCircle'
import Cookies from 'js-cookie'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';


const PurpleSwitch = withStyles({
    switchBase: {
      color: "white",
      '&$checked': {
        color: "#1976d2",
      },
      '&$checked + $track': {
        backgroundColor: "#1976d2",
      },
    },
    checked: {},
    track: {},
  })(Switch);

const useStyles = makeStyles((theme) => ({
    divider: {
      height: 34,
      margin: 4,
    },
  }));

const MultipleChoiceResponseForm = (props) => {
    const classes = useStyles();
    const [responses,setResponses] = useState([])
    const [questionId,setQuestionId] = useState(props.questionId)
    if (questionId !== props.questionId) setQuestionId(props.questionId)
    const [newResponseLabel,setNewResponseLabel] = useState("")
    const [creatingResponse,setCreatingResponse] = useState(false)

    useEffect(()=>{
        setResponses(props.responses)
    },[props])

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
      
        return result;
      };
    
    const getItemStyle = (isDragging,draggableStyle) => {
        return {
        userSelect: "none",
        position:"relative",
        background: isDragging ? "lightgreen" : "grey",
        border:isDragging ? "1px solid lightgreen" : "",
        ...draggableStyle
        }
    }

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
          return;
        }
    
        const items = reorder(
          responses,
          result.source.index,
          result.destination.index
        );
    
        setResponses(items)
      }

    const handleEdit = (e,index) => {
        const responsesEdit = [...responses]
        const responseEdit = Object.assign({},responsesEdit[index])
        responseEdit.label = e.target.value
        responsesEdit[index] = responseEdit
        setResponses(responsesEdit)
    }

    useEffect(()=>{
        const createResponse = async (question_response) => {
            const jsonResponse = JSON.stringify(question_response)
            const csrfToken = Cookies.get("XSRF-TOKEN")
            const response = await fetch(`/api/question_responses/create`,
                {
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    body: jsonResponse
                }
            )
            const data = await response.json()
            console.log(data)
            setResponses([...responses,data.question_response])
            setNewResponseLabel("")
            setCreatingResponse(false)
        }
        if (creatingResponse) {
            createResponse({"label":newResponseLabel,"question_id":questionId})
        }
    },[creatingResponse])


    const handleNewResponse = (e)=>{
        e.preventDefault()
        setCreatingResponse(true)        
    }

    return (
        <div style={{display:"flex",flexDirection:"column",width:"100%",marginTop:"10px"}}>
            <div style={{display:"flex",flexDirection:"row",width:"100%"}}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided,snapshot)=> (
                        <div 
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{display:"flex",flexDirection:"column",width:"100%",alignItems:"center"}}>
                                {responses.map((response,index)=>{
                                return (
                                    <Draggable key={response.id} draggableId={`${response.id}`} index={index}>
                                        {(provided,snapshot)=>(
                                            <div  
                                            className={"draggable-response"}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                            ref={provided.innerRef}                                                {...provided.draggableProps}
                                            >
                                            <CustomTextField 
                                                value={responses[index].label} 
                                                onChange={(e)=>handleEdit(e,index)}
                                            >

                                            </CustomTextField>
                                            <div 
                                            {...provided.dragHandleProps}
                                            style={{
                                                position:"absolute",
                                                top:"11px",
                                                left:"4px",
                                                zIndex:2,
                                                color:"darkgray",
                                                width:"38px",
                                                height:"38px"
                                            }}>
                                            <DragIndicatorIcon></DragIndicatorIcon>

                                            </div>
                                            </div>
                                        )}
                                    </Draggable>
                                )
                                })}
                            {provided.placeholder}
                            <form style={{width:"100%",display:"flex",flexDirection:"row",justifyContent:"center"}} onSubmit={handleNewResponse}>
                            <CustomTextField 
                                autoFocus={true}
                                value={newResponseLabel} 
                                onChange={(e)=>setNewResponseLabel(e.target.value)}>
                            </CustomTextField>
                            </form>
                        </div>
                    )}
            </Droppable>
            </DragDropContext>
            </div>
            <Divider style={{ marginTop:"18px",paddingLeft:"10px",paddingRight:"10px"}}/>
            <div style={{flexDirection:"row",display:"flex",alignItems:"center",justifyContent:"flex-end",paddingRight:"10px",paddingTop:"10px",paddingBottom:"10px"}}>
                <IconButton>
                    <DeleteOutlineIcon/>
                </IconButton>
                <Divider className={classes.divider} orientation={"vertical"}/>
                <FormControlLabel
                value="start"
                control={<PurpleSwitch />}
                label="Required"
                labelPlacement="start"
                />
                <IconButton style={{marginLeft:"10px"}} onClick={props.acceptChanges}>
                    <CheckIcon style={{color:"yellowgreen",height:"28px",width:"28px"}}></CheckIcon>
                </IconButton>
                <IconButton>
                    <MoreVertIcon></MoreVertIcon>
                </IconButton>
            </div>
        </div>
    )
}

export default MultipleChoiceResponseForm;