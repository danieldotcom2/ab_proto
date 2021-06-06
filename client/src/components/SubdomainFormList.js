import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch,
    NavLink
  } from "react-router-dom";

import FormCard from './FormCard';
import NewFormModal from './NewFormModal';

function SubdomainFormList (props) {
    const [forms, setForms] = useState([]);
    let { path, url } = useRouteMatch();
    const [subdomain,setSubdomain] = useState({})
    let {id} = useParams();

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`/api/subdomains/${id}/forms`);
            const data = await response.json();
            setForms(data.forms);
            setSubdomain(data.subdomain);
        }
        fetchData();
    }, []);

    const formList = forms.map((form) => 
    <NavLink to={`/forms/${form.id}`}>
        <FormCard key={form.id} form={form}/>
    </NavLink>
    )
    return (
        <>
            <h3>
                {subdomain.subdomain ? subdomain.subdomain : ""}
            </h3>
                <NewFormModal/>
            {formList}
        </>
        );
}

export default SubdomainFormList;