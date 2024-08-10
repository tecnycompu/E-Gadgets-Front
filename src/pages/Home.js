import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"airpodes"} heading={"Los Mejores Airpodes"}/>
      <HorizontalCardProduct category={"watches"} heading={"Relojes populares"}/>

    </div>
  )
}

export default Home
