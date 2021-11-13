import { Add, Remove } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import styled from 'styled-components'
import Announcement from '../Components/Announcement';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import { mobile } from '../responsive';
import StripeCheckout from 'react-stripe-checkout'
import { useHistory } from 'react-router';
import { userRequest } from '../requestMethods';
const Container = styled.div``;

const Wrapper = styled.div`
    padding: 20px;
    ${mobile({padding: "10px"})}   
`;

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`;
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props=>props.type === "filled" && "none"};
    background-color: ${props=>props.type === "filled" ? "black" : "transparent"};
    color: ${props=>props.type === "filled" && "white"};
`;
const Bottom = styled.div`
    display: flex;
    justify-content: space between;
    padding: 20px;
    ${mobile({flexDirection: "column"})}   
`;

const Info = styled.div`
    flex: 3;
`;

const Summary = styled.div`
    flex: 1;
    padding: 20px;
    border-radius: 10px;
    border: 0.5px solid lightgray;
    height: 50vh;
`;

const SummaryTitle = styled.h1`
    font-weight: 200;
`;
const SummaryItem = styled.div`
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    font-size: ${props=>props.type ==="total" && "24px"};
    font-weight: ${props=>props.type ==="total" && "500"};
`;
const SummaryItemText = styled.span`
`;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
    cursor: pointer;
`;

const Toptexts = styled.div`
    ${mobile({display: "none"})}   
`;

const Toptext = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0 10px;
`;
const Product = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    ${mobile({flexDirection: "column"})}   
`;

const ProductDetails = styled.div`
    flex: 2;
    display: flex;
`;

const Image = styled.img`
    width: 200px;
`;

const Details = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props=>props.color}
`;

const ProductSize = styled.span``;

const PriceDetails = styled.div`
    flex: 1; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`;
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
`;

const ProductAmount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    font-size: 24px;
    margin: 4px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    ${mobile({margin: "5px 15px"})}   

`;

const ProductPrice = styled.span`
    font-size: 30px;
    font-weight: 200;
    ${mobile({marginTop: "20px"})}   
`;

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
    margin: 10px;
`;

const KEY = process.env.REACT_APP_STRIPE

const Cart = () => {
    const cart = useSelector(state=>state.cart)
    const history = useHistory()
    const [stripeToken, setStripeToken] = useState(null)

    const onToken = (token)=>{
        setStripeToken(token)
    }

    useEffect(()=>{
        const makeRequest = async()=>{
            try{
                const res = await userRequest.post('/checkout/payment', 
                {
                    tokenId: stripeToken.id,
                    amount: cart.total * 100,
                }, 
                )
                history.push('/success', {data: res.data})
            }catch(err){
                console.log(err)
            }
        }
        stripeToken && makeRequest()
    }, [stripeToken, cart.total, history])
    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Wrapper>
                <Title>YOUR CART</Title>
                <Top>
                    <TopButton>CONTINUE SHOPPING</TopButton>
                    <Toptexts>
                        <Toptext>Shopping Cart(2)</Toptext>
                        <Toptext>Wishlist (0)</Toptext>
                    </Toptexts>
                    <TopButton type="filled">CHECKOUT NOW</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {cart.products.map((product)=>
                        <Product key={product._id}>
                            <ProductDetails>
                                <Image src={product.img}/>
                                <Details>
                                    <ProductName><strong>Product:</strong>{product.title} </ProductName>
                                    <ProductId><strong>ID:</strong>{product._id}</ProductId>
                                    <ProductColor color={product.color}/>
                                    <ProductSize><strong>Size:</strong>{product.size}</ProductSize>
                                </Details>
                            </ProductDetails>
                            <PriceDetails>
                                <ProductAmountContainer>
                                    <Add/>
                                    <ProductAmount>{product.quantity}</ProductAmount>
                                    <Remove/>
                                </ProductAmountContainer>
                                <ProductPrice>${product.price * product.quantity}</ProductPrice>
                            </PriceDetails>
                        </Product>
                        )}
                        <Hr/>   
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>$ -5.7</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <StripeCheckout 
                            name="Kwesi Shop"
                            image=""
                            billingAddress
                            shippingAddress
                            description={`Your total is $${cart.total}`}
                            amount={cart.total*100}
                            token={onToken}
                            stripeKey={KEY}
                        >
                        <Button>CHECKOUT NOW</Button>
                        </StripeCheckout>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer/>
        </Container>
    )
}

export default Cart
    