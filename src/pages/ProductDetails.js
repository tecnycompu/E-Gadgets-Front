import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../common'

const ProductDetails = () => {
  const [data,setData] = useState({
    productName : "",
    brandName : "",
    category : "",
    productImage : [],
    description : "",
    price : "",
    sellingPrice : ""
  })
  const params = useParams()
  const [loading,setLoading] = useState(true)
  const productImageListLoading = new Array(4).fill(null)

  console.log ("product id",params)

  const fetchProductDetails = async()=>{
    const response = await fetch(SummaryApi.productDetails.url,{
      method : SummaryApi.productDetails.method,
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify({
        productId : params?.id
      })
    })

   //setLoading(false)
    const dataResponse = await response.json() 

    setData(dataResponse?.data)
  }

  console.log("data",data)

  useEffect(()=>{
    fetchProductDetails()
  },[])

  return (
    <div className='container mx-auto p-4'>

      <div className='min-h-[200px] flex flex-col lg:flex-row'>
        {/*** Imagen Producto */}
        <div className='h-96 flex flex-col lg:flex-row-reverse'>

            <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200'>
              image
            </div>

            <div className='h-full'>
              {
                loading ? (
                    <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                      {
                         productImageListLoading.map(el =>{
                           return(
                              <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage"}>
                   
                              </div>
                           )
                         })
                      }
                    </div>

                ) : (
                  <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                     data.productImage.map((imgURL,index) =>{
                       return(
                          <div className='h-20 w-20 bg-slate-200 rounded' key={"imgURL"}>
                            <img src ={imgURL} className='w-full h-full object-scale-down mix-blend-multiply'/>
               
                          </div>
                       )
                     })
                  }
                </div>
                )

              }
            </div>
        </div>

        {/*** Detalles Producto */}
        <div>
              Product details
        </div>
      </div>

    </div>
  )
}

export default ProductDetails