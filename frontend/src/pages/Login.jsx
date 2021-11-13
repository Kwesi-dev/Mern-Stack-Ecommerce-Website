import styled from "styled-components"
import { mobile } from "../responsive";
import { userLogin } from "../Redux/apiCalls"
import { useDispatch, useSelector } from "react-redux"
import { useState } from 'react'
const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: crimson;
`;
const Wrapper = styled.div`
    width: 25%;
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
    flex-direction: column;
`;
const Input = styled.input`
    flex: 1;
    margin: 10px 0;
    padding: 10px;
`;
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    cursor: pointer;
    color: white;
    margin-bottom: 10px;
    &:disabled{
        color: green;
        cursor: not-allowed;
    }
`;
const Link = styled.span`
    margin: 5px 0;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`;
const Error = styled.span`
    color: red;
`;
const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const { isFetching, error } = useSelector(state=>state.user)

    const user = {
        username,
        password 
    }

    const handleClickLogin = (e)=>{
        e.preventDefault()
        userLogin(dispatch, user)
    }
    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Input placeholder="username" onChange={e=>setUsername(e.target.value)}/>
                    <Input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)}/>
                    <Button type="submit" disabled={isFetching} onClick={handleClickLogin}>LOGIN</Button>
                    { error && <Error>Something went wrong...</Error>}
                    <Link>DO NOT REMEMBER PASSWORD</Link>
                    <Link>CREATE A NEW ACCOUNT</Link>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login
