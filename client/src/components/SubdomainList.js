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

import SubdomainCard from './SubdomainCard';

function SubdomainList (props) {
    const [subdomains, setSubdomains] = useState([]);
    let { path, url } = useRouteMatch();

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/subdomains/');
            const data = await response.json();
            setSubdomains(data.subdomains);
        }
        fetchData();
    }, []);

    const subdomainComponents = subdomains.map((subdomain) => 
        <NavLink to={`/subdomains/${subdomain.id}`}>
            <SubdomainCard key={subdomain.id} subdomain={subdomain}/>
        </NavLink>)
    
    return (
        <>
            <h4>Subdomains: </h4>
            {subdomainComponents}
        </>
        );
}

export default SubdomainList;