import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import FormBody from './FormBody';
import FormHeader from './form-header/FormHeader';
import FormContext from './FormContext';
import FormSections from './sections/FormSections';


const Form = (props)=>{
    const [form,setForm] = useState({})
    let {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {

            const response = await fetch(`/api/forms/${id}`);
            const responseData = await response.json();
            setForm(responseData.form);
        }
        fetchData();
    }, []);

    return (
        <FormContext.Provider value={{setForm,form}}>
            <div className="form-editor__main">
                <FormHeader form={form}></FormHeader>
                <FormSections />
                {/* <FormSections></FormSections> */}
            </div>
        </FormContext.Provider>
    )
}

export default Form;