import styled from 'styled-components';
import Background from './images/background.jpg'

export const H1 = styled.h1`
    margin-top: 5em;
`

export const LoginContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
`

export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30%;
    border: 2px solid black;
    height: 20em;
    background-image: url(${Background});
    background-repeat: no-repeat;
`

export const Input = styled.input`
    width: 13em;
    padding: 10px;
    border: 2px solid black;
    border-radius: 5px
    height: 20px;
`

export const H2 = styled.h2`
    margin-top: 1em;
    color: rgb(255,215,0);
    letter-spacing: 0.3em;
    font-size: 2rem;
    font-family: 'Lobster', cursive;
`

export const Button = styled.button`
    margin-top: 3em;
    border-radius: 10px;
    padding: 1em;
    width: 10em;
    border: 2px solid black;
    background-color: rgb(255,228,181);

    &:hover {
        background-color: rgb(255,215,0);
    }
`