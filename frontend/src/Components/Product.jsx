import styled from "styled-components"
import SingleProduct from "./SingleProduct"
import { useState, useEffect} from 'react'
import axios from 'axios'
import { CircularProgress } from "@mui/material";
const MainContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 20px;
`;
const Product = ({ cat, filters, sort}) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getProducts = async()=>{
            setLoading(true)
            try{
                const res = await axios.get(cat ? `/products/?cat=${cat}` : '/products')
                setProducts(res.data);
                setLoading(false)
            }catch(err){
                console.log(err)
            }
        } 
       getProducts();
    }, [cat])
    useEffect(()=>{
        cat && setFilteredProducts((products.filter((item)=> Object.entries(filters).every(([key, value])=>
            item[key].includes(value)
        ))))
    }, [cat, filters, products])
    useEffect(() => {
        if(sort === "Newest"){
            setFilteredProducts(prev=> [...prev].sort((a, b)=> a.createdAt - b.createdAt))
        }else if(sort === "asc"){
            setFilteredProducts(prev=> [...prev].sort((a, b)=> a.price - b.price))  
        }else{
            setFilteredProducts(prev=> [...prev].sort((a, b)=> b.price - a.price))  
        }
    }, [sort])
    return (
        <MainContainer>  
            {
                loading ? <CircularProgress size={80}/> :

                <Container>
                    {cat ? (filteredProducts.map((product)=>
                        <SingleProduct product={product} key={product._id}/>
                        )):(
                            (products.slice(0, 8).map((product)=>
                            <SingleProduct product={product} key={product._id}/>
                            )) 
                            )}
                </Container>
            }
        </MainContainer>
    )
}

export default Product
