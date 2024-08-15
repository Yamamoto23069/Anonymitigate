import { Button } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { auth, googleProvider, githubProvider , signInWithPopup} from "../firebase"; 

function Login() {
    const signIn = async (provider) => {
        try {
            await auth.signInWithPopup(provider);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <LoginContainer>
            <LoginInnerContainer>
                <img
                    src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
                    alt="Slack logo"
                />
                <h1>Slack: Your Digital HQ!</h1>
                <p>slack.com</p>
                <Button onClick={() => signIn(googleProvider)} variant="contained" color="primary">
                    Sign In With Google
                </Button>
                <Button onClick={() => signIn(githubProvider)} variant="contained" color="primary">
                    Sign In With GitHub
                </Button>        
            </LoginInnerContainer>
        </LoginContainer>
    );
}

export default Login;

const LoginContainer = styled.div`
    background-color: #f8f8f8;
    height: 100vh;
    display: grid;
    place-items: center;
`;

const LoginInnerContainer = styled.div`
    padding: 100px;
    text-align: center;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    > img {
        object-fit: contain;
        height: 100px;
        margin-bottom: 40px;
    }
    > button {
        margin-top: 20px; // Giảm khoảng cách giữa các nút
        text-transform: inherit !important;
        background-color: #0a8d48 !important;
        color: white;
    }
`;
