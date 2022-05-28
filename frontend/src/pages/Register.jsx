import styled from "styled-components"
import { mobile } from "../responsive";
import { Link, useHistory } from 'react-router-dom'
import { useState } from "react";
import { publicRequest } from "../requestMethods";
const Container = styled.div`
    position: relative; 
    width: 100vw;
    height: 100vh;
    background: url();
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: crimson;
`;
const Wrapper = styled.div`
    width: 320px;
    padding: 20px;
    background-color: white;
    ${mobile({width: "70%"})}
`;
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`;
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`;
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0 0;
    padding: 10px;
`;
const Aggreement = styled.span`
    font-size: 12px;
    margin: 20px 0;
`;
const Button = styled.button`
    width: 60%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    cursor: pointer;
    color: white;
`;
const LoginButton = styled.button`
    position: absolute;
    top: 20px;
    left: calc(100vw - 100px);
    width: 80px;
    height: 30px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: teal;
    color: white;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const RegisterError = styled.p`
    font-size: 1rem;
    color: red;
    text-align: center;
    margin-top: 5px;
`;
const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [registerError, setRegisterError] = useState(false)
    const history = useHistory()
    const newUser = {
        username,
        email,
        password
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        try{
            await publicRequest.post("/auth/register", newUser)
            history.push("/login")
        }catch{
            setRegisterError(true)
        }
    }
    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form onSubmit={handleRegister}>
                    <Input type="text" name="username" placeholder="username" onChange={(e)=>setUsername(e.target.value)}/>
                    <Input type="email" name="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
                    <Input type="password" name="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
                    <Aggreement>By creating an account, I consent to the processing of my personal
                        data in accordance with the <strong>PRIVACY POLICY</strong>
                    </Aggreement>
                    <Button type="submit">CREATE</Button>
                    {registerError && 
                        <RegisterError> Registration failed due to an error</RegisterError>
                    }
                </Form>
            </Wrapper>
            <Link to="/login">
                <LoginButton>LOGIN</LoginButton>
            </Link>
        </Container>
    )
}

export default Register
