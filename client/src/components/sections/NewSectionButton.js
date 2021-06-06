import { Button } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import SectionContext from './SectionContext';
import Section from './Section';
import { useParams } from 'react-router';
import Cookies from 'js-cookie'


const NewSectionButton = () => {
    const sectionContext = useContext(SectionContext)
    const [creatingSection,setCreatingSection]=useState(false)
    const handleNewSection = () => {
        setCreatingSection(true)
    }

    const {id} = useParams()

    useEffect(()=>{
        const createSection = async () => {
            const csrfToken = Cookies.get("XSRF-TOKEN")
            const response = await fetch(`/api/sections/create/${id}`,
                {
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": csrfToken,
                    }
                }
            )
            const data = await response.json()
            console.log(data)
            sectionContext.setSections([
                ...sectionContext.sections,
                data.section
            ])
            setCreatingSection(false)
        }
        if (creatingSection) {
            createSection()
        }
    },[creatingSection])
    return (
        <Button
            startIcon={<AddCircleOutlineOutlinedIcon/>}
            onClick={handleNewSection}
        >
            New Section 
        </Button>
    )
}

export default NewSectionButton;