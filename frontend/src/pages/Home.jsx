import React from 'react'
import Announcement from '../Components/Announcement'
import Navbar from '../Components/Navbar'
import Slider from '../Components/Slider'
import Categories from '../Components/Categories'
import Product from '../Components/Product'
import Newsletter from '../Components/Newsletter'
import Footer from '../Components/Footer'
const Home = () => {
    return (
        <div>
            <Announcement/>
            <Navbar/>
            <Slider/>
            <Categories/>
            <Product/>
            <Newsletter/>
            <Footer/>
        </div>
    )
}

export default Home
