import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import Form from './components/Form'
import SubdomainList from './components/SubdomainList';
import SubdomainFormList from './components/SubdomainFormList';

function App() {
  return (
    <BrowserRouter>
        <div className={"nav-bar"}> 
                <div style={{display:"flex",flexDirection:"row"}}>
                    <NavLink style={{ textDecoration: 'none' }} to="/" activeclass="active">
                        <div className={"nav-bar-button"}>
                            Home
                        </div>
                    </NavLink>
                    <NavLink style={{ textDecoration: 'none' }} to="/subdomains" activeclass="active">
                        <div className={"nav-bar-button"}>
                            Subdomains
                        </div>
                    </NavLink>
                </div>
        </div>
        <Switch>
            <Route exact path="/">
                <h1>AB Form Builder</h1>
            </Route>
            <Route exact path="/subdomains">
                <SubdomainList></SubdomainList>
            </Route>
            <Route path="/subdomains/:id">
                <SubdomainFormList></SubdomainFormList>
            </Route>
            <Route exact path="/forms/:id">
                <Form></Form>
            </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
