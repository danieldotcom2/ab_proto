import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import Form from './components/Form'
import SubdomainList from './components/SubdomainList';
import SubdomainFormList from './components/SubdomainFormList';

function App() {
  console.log("____Rendering app_____")
  return (
    <BrowserRouter>
        <div className={"nav-bar"}> 
        <nav>
                <ul>
                    <li><NavLink to="/" activeclass="active">Home</NavLink></li>
                    <li><NavLink to="/users" activeclass="active">Users</NavLink></li>
                    <li><NavLink to="/subdomains" activeclass="active">Subdomains</NavLink></li>
                </ul>
        </nav>
        </div>
        <Switch>
            <Route exact path="/">
                <h1>My Home Page</h1>
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
