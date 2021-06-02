import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import FormBody from './FormBody';
import FormHeader from './FormHeader';


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
        <div className="form-editor__main"> 
            <FormHeader title={form.form_title} ></FormHeader>
            <FormBody form={form}/>
            {/* <FormSections></FormSections> */}
        </div>
    )
}

export default Form;