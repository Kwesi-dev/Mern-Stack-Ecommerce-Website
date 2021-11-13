import { Add, Remove } from "@mui/icons-material";
import { useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components"
import Announcement from "../Components/Announcement"
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Newsletter from "../Components/Newsletter";
import { mobile } from "../responsive";
import { useEffect } from "react";
import axios from 'axios';
import { addProduct } from "../Redux/cartRedux";
import { useDispatch } from "react-redux";
const Container = styled.div``;
const Wrapper = styled.div`
    display: flex;
    padding: 50px;
    ${mobile({padding: "10px", flexDirection: "column"})}
`;
const ImageContainer = styled.div`
    flex: 1;

`;
const Image = styled.img` 
    width: 100%;
    height: 90vh;
    object-fit: cover;
    ${mobile({height: "40vh"})}
`;
const InfoContainer = styled.div`
    flex: 1;
    padding: 0 50px;
    ${mobile({padding: "10px"})}
`;
const Title = styled.h1`
    font-weight: 200;
`;
const Desc = styled.p`
    margin: 20px 0;
`;
const Price = styled.span`
    font-size: 40px;
    font-weight: 100;
`;
const FilterContainer = styled.div`
    width: 50%;
    display: flex;
    margin: 20px 0;
    justify-content: space-between; 
    ${mobile({width: "100%"})}   
`;

const Filter = styled.div`
    display: flex;
    align-items: center;
`;

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`;

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props=>props.color};
    margin: 0px 5px;
    cursor: pointer;
`;

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between; 
    ${mobile({width: "100%"})}   
`;

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`;

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    font-weight: 500;
    cursor: pointer;

    &:hover{
        background-color: #f8f4f4;
    }
`;

const Product = () => {
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState("")
    const [size, setSize] = useState("")
    const location = useLocation()
    const productId = location.pathname.split("/")[2]
    const dispatch = useDispatch()

    const handleQuantity = (type)=>{
        if(type==="dec"){
            setQuantity(quantity > 1 ? quantity -1 : 1)
        }else{
            setQuantity(quantity + 1)
        }
    }
    useEffect(() => {
        const getProduct = async()=>{
            try{
                const res = await axios.get(`/products/find/${productId}`)
                setProduct(res.data)
            }catch(err){
                console.log(err)
            }
        }
        getProduct();
    }, [productId])

    const handleClick = () => {
        dispatch(addProduct({ ...product, color, quantity, size}))        
    }
    return (
        <Container>
            <Announcement/>
            <Navbar/>
            <Wrapper>
                <ImageContainer>
                    <Image src={product.img}/>
                </ImageContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>{product.desc}</Desc>
                    <Price>${product.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            <FilterColor color={product.color} onClick={()=>setColor(color)}/>
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={e=>setSize(e.target.value)}>
                                <FilterSizeOption>{product.size}</FilterSizeOption>
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove style={{cursor: "pointer"}} onClick={()=>handleQuantity("dec")}/>
                            <Amount>{quantity}</Amount>
                            <Add style={{cursor: "pointer"}} onClick={()=>handleQuantity("inc")}/>
                        </AmountContainer>
                        <Button onClick={handleClick}>Add to Cart</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <Newsletter/>
            <Footer/>
        </Container>
    )
}

export default Product
