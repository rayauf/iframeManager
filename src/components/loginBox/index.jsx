import React, { useEffect } from "react";
import styled from "styled-components";
import { LoginForm } from "./loginForm";
import GoogleLogin from 'react-google-login'
import { makeStyles } from "@material-ui/core";
import { responseGoogle }   from "../services/auth"
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const AppContainer = styled.div`
  width: 100%;
  height 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  self-align: center;
  `;

const BoxContainer = styled.div`
    width: 80%;
    min-height: 750px;    
    flex-direction: column;
    border-radius: 19px;
    background-color: #fff;
    box-shadow: 0 0 2px rgb(23 15 15);
    position: relative;
    overflow: hidden;
`;

const TopContainer = styled.div`
    width:100%;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 5em;
    text-align-last: center;
`;

const BackDrop = styled.div`
    width: 160%;
    height: 550px;
    position: absolute;
    flex-direction: column;
    border-radius: 50%;
    
    left: -230px;
    top: -220px;
    background: rgb(235,161,193);
    background: radial-gradient(circle, rgba(235,161,193,1) 9%, rgba(99,102,221,1) 100%);
    );
`;

const HeaderContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 10px;

`;

const HeaderTitle = styled.h2`
    font-size: 30px;
    font-weight: 600;
    line-height: 1.24;
    color: #fff;
    z-index: 15;
`;

const HeaderDescription = styled.h4`
    color: #fff;
    font-weight:500;
    font-size: 11px;
    z-index: 10;
    margin:0
`;

const InnerContainer = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    padding: 0 1.8em;
    margin-inline:auto;
    position: relative;
`;



const useStyles= makeStyles(() =>({
    googleButton:{
        alignSelf: "center",
        width: "fit-content"
    }
}))

const loginError = () => {
    console.log("error");
}

export function LoginBox(props){

    let history = useHistory();
    const classes = useStyles();  
    useEffect(() => {
        if (Cookies.get("user")) {
            history.push("/main");
        }
    })
    return <AppContainer>
        <BoxContainer>
            <TopContainer>
                <BackDrop />
                <HeaderContainer>
                    <HeaderTitle>
                        Bienvenido
                </HeaderTitle>
                    <HeaderDescription>
                        Ingresar:
                </HeaderDescription>
                </HeaderContainer>
            </TopContainer>
            <InnerContainer>
                <LoginForm />
                <GoogleLogin
                    className={classes.googleButton}
                    clientId="686503875451-sv71hfji5ng5tib1el8d9k2ffpg97mbk.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={loginError}
                    cookiePolicy={'single_host_origin'}
                >
                </GoogleLogin>
            </InnerContainer>
        </BoxContainer>
    </AppContainer>
}