import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { mobile } from '../responsive'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { userLogout } from '../Redux/apiCalls';
const Container = styled.div`
    height: 60px;
    ${mobile({height: "50px"})}
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({padding: "10px 0"})}
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;
const Center = styled.div`
    flex: 1;
    text-align: center;
`;
const Logo = styled.h1`
    font-weight: bold;
    ${mobile({fontSize: "24px"})}
`;
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-Content: flex-end;
    ${mobile({flex: "2", justifyContent: "center"})}
`;
const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({fontSize: "12px", marginLeft: "10px"})}
`;
const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({display: "none"})}
`;
const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    padding: 5px;
    margin-left: 25px;
`;
const Input = styled.input`
    border: none;
    ${mobile({width: "50px"})}
`;

const Navbar = () => {
    const quantity = useSelector(state=>state.cart.quantity)
    const user = useSelector(state=>state.user.currentUser)
    const dispatch = useDispatch()

    const handleClick = ()=>{
        userLogout(dispatch)
    }
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input/>
                        <SearchIcon style={{color: "gray", fontSize: 16}}/>
                    </SearchContainer>
                </Left>
                <Center><Logo>KDEV</Logo></Center>
                <Right>
                    {!user ? (
                        <>
                        <Link to="/register">
                            <MenuItem>REGISTER</MenuItem>
                        </Link>
                        <Link to="/login">
                            <MenuItem>LOGIN</MenuItem>
                        </Link>
                        </>
                    ):(
                        <MenuItem onClick={handleClick}>LOGOUT</MenuItem>
                    )}
                    <Link to="/cart" style={{color: "inherit"}}>
                        <MenuItem>
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartOutlinedIcon/>
                            </Badge>
                        </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar
