import React, { useEffect, useState } from 'react'
import NewQuestionButton from '../questions/NewQuestionButton'
import NewQuestionHeader from '../questions/NewQuestionHeader'
import Question from '../questions/Question'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

const SectionQuestions = (props) => {
    const [questions,setQuestions] = useState(props.questions)
    const [sectionName,setSectionName] = useState(props.sectionName)
    const [sectionId,setSectionId] = useState(props.sectionId)
    const [displayNewQuestionHeader,setDisplayNewQuestionHeader] = useState(false)

    useEffect(()=>{
        setQuestions(props.questions)
        setSectionName(props.sectionName)
    },[props])

    const getItemStyle = (isDragging,draggableStyle) => {
        return {
        userSelect: "none",
        position:"relative",
        ...draggableStyle
        }
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
      
        return result;
      };

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
          return;
        }
    
        const items = reorder(
          questions,
          result.source.index,
          result.destination.index
        );
    
        setQuestions(items)
      }
    


    const handleNewQuestion = () => {
        setDisplayNewQuestionHeader(true)
    }
    return (
        <>
        <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={`${sectionName}`}>
            {(provided,snapshot)=>(
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{display:"flex",flexDirection:"column",width:"100%"}}
                    >
                    {questions.map((question,index)=>{
                        return (
                            <Draggable key={question.label} draggableId={`${question.id}`} index={index}>
                                {(provided,snapshot)=>(
                                        <div 
                                            className={"draggable-response"}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                                )}
                                            ref={provided.innerRef}
                                        >
                                        <Question question={question} index={index}></Question>
                                        {/* <div 
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
                                        </div> */}
                                        </div>
                                    )}
                            </Draggable>
                        )
                    })}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>

        </DragDropContext>
            {
                displayNewQuestionHeader 
                ?
                <NewQuestionHeader sectionId={sectionId}></NewQuestionHeader>
                :
                <NewQuestionButton 
                    questions={questions} 
                    setQuestions={setQuestions}
                    handleNewQuestion={handleNewQuestion}
                ></NewQuestionButton>
            }
        </>
    )
}

export default SectionQuestions;