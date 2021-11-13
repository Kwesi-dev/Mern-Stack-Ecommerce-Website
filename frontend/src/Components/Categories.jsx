import styled from 'styled-components'
import CategoryItem from './CategoryItem';
import { categories } from '../data'
import { mobile } from '../responsive'
const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    ${mobile({padding: "0", flexDirection: "column"})}
`;
const Categories = ()=>{
    return(
        <Container>
            {categories.map((item)=>
                <CategoryItem item={item} key={item.id}/>
            )}
        </Container>
    )
}
export default Categories
