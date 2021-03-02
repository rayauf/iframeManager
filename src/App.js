import React from 'react';
import "./App.css";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { LoginBox } from "./components/loginBox";
import MainView  from "./components/mainView";
import PrivateRoute from "./components/privateRoute";
import AddClient from "./components/cliente/index"
import EditClient from "./components/cliente/clientEditForm"
import Iframe from "./components/iframe/iframe"


const AppContainer = styled.div`
  height:100vh;
  overflow-x : hidden;
  flex-direction: column;
  align-items: center;
  text-align: -webkit-center;
  background: rgb(99,102,221);
  background: linear-gradient(83deg, rgba(99,102,221,0.27494747899159666) 
              0%, rgba(235,161,193,0.20772058823529416) 100%);
  `;

function App() {   
    return(       
        <AppContainer>
        <Router>
          <Switch>
            <Route path="/" exact render={() => <Redirect to="/login" />} />
            <Route path="/login" component={LoginBox} />
            <PrivateRoute path="/main" component={MainView} />
            <Route path="/cliente/crear" component={AddClient} />
            <PrivateRoute path="/cliente/:id" component={EditClient} />
            <Route path="/iframe" component={Iframe} />
          </Switch>
        </Router>
        </AppContainer>                   
    );
}

export default App;