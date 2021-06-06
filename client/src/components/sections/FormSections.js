import { CircularProgress } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import NewSectionButton from './NewSectionButton'
import Section from './Section'
import SectionContext from './SectionContext'


const FormSections = () =>{
    const [sections,setSections] = useState([])
    const {id} = useParams()
    const [loading,setLoading] =useState(true)

    useEffect(()=>{
        const getSections = async (id) => {
            const response = await fetch(`/api/sections/form/${id}`)
            const data = await response.json();
            console.log(data.sections)
            setSections(data.sections)
            setLoading(false)
        }
        getSections(id)
    },[])

    if (loading) return <CircularProgress/>

    return (
        <>
        <SectionContext.Provider value={{setSections,sections}}>
                { sections.map((section,index)=>{
                    return (
                        <Section name={section.name} id={section.id} description={section.description} index={index} questions={section.questions} order={section.order}></Section>
                    )
                })
            }
            <NewSectionButton></NewSectionButton>
        </SectionContext.Provider>
        </>
    )
}

export default FormSections;