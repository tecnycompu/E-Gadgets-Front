import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"airpodes"} heading={"Los Mejores Airpodes"}/>
      <HorizontalCardProduct category={"watches"} heading={"Relojes populares"}/>

      <VerticalCardProduct category={"mobiles"} heading={"Móbiles"}/>
      <VerticalCardProduct category={"mouse"} heading={"Mouse"}/>
      <VerticalCardProduct category={"televisions"} heading={"Televisión"}/>
      <VerticalCardProduct category={"camera"} heading={"Cámaras y Fotografía"}/>
      <VerticalCardProduct category={"earphones"} heading={"Auriculares con cable"}/>
      <VerticalCardProduct category={"speakers"} heading={"Parlantes Bluetooth"}/>
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerador"}/>
      <VerticalCardProduct category={"trimmers"} heading={"Recortadoras"}/>
      <VerticalCardProduct category={"processor"} heading={"Procesadores"}/>



    </div>
  )
}

export default Home
