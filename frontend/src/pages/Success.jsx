import React from 'react'
import { useLocation } from 'react-router';
import styled from 'styled-components'
const Container = styled.div``;
const Success = () => {
    const location = useLocation()
    console.log(location);
    return (
        <Container>
            Success page 
        </Container>
    )
}

export default Success
