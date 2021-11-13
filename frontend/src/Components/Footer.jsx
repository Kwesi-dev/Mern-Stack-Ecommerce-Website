import React from 'react'
import styled from "styled-components"
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import PinterestIcon from '@mui/icons-material/Pinterest'
import RoomIcon from '@mui/icons-material/Room'
import PhoneIcon from '@mui/icons-material/Phone'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { mobile } from '../responsive'

const Container = styled.div`
    display: flex;
    ${mobile({flexDirection: "column"})}
`;
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;
const Logo = styled.h1``;
const Desc = styled.div`
    margin: 20px 0;
`;
const SocialContainer = styled.div`
    display: flex;
`;
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: ${props=>props.bg};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`;

const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({display: "none"})}
`;
const Title= styled.h3`
    margin-bottom: 20px;
`;
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    cursor: pointer;
`;
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;

    &:hover{
        text-decoration: underline;
    }
`;
const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({backgroundColor: "#fff8f8"})}
`;
const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`;
const Payment = styled.img`
    width: 50%;
`;
const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>KwesiDev.</Logo>
                <Desc>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi
                    architecto exercitationem at libero beatae saepe consequuntur distinctio 
                    praesentium repellendus molestias necessitatibus maxime neque eum.
                </Desc>
                <SocialContainer>
                    <SocialIcon bg="#3B5999">
                        <FacebookIcon/>
                    </SocialIcon>
                    <SocialIcon bg="#E4405F">
                        <InstagramIcon/>
                    </SocialIcon>
                    <SocialIcon bg="#55ACEE">
                        <TwitterIcon/>
                    </SocialIcon>
                    <SocialIcon bg="#E60023">
                        <PinterestIcon/>
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Man Fashion</ListItem>
                    <ListItem>Woman Fashion</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Terms</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem><RoomIcon style={{marginRight: "10px"}}/>B78 Road, East Lagon</ContactItem>
                <ContactItem><PhoneIcon style={{marginRight: "10px"}}/>+233 3563 6733</ContactItem>
                <ContactItem><MailOutlineIcon style={{marginRight: "10px"}}/>contact@KwesiDev.com</ContactItem>
                <Payment src="https://i.ibb.co/Qfvn4z6/payment.png"/>
            </Right>
        </Container>
    )
}

export default Footer
