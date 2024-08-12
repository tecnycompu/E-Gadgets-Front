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
    //setLoading(true)
    const response = await fetch(SummaryApi.productDetails.url,{
      method : SummaryApi.productDetails.method,
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify({
        productId : params?.id
      })
    })

    const dataResponse = await response.json() 

    setData(dataResponse?.data)
  }

  console.log("data",data)

  useEffect(()=>{
    fetchProductDetails()
  },[])

  return (
    <div className='container mx-auto p-4'>

      <div className='min-h-[200px]'>
        {/*** Imagen Producto */}
        <div>
            <div className=''>
              {
                loading ? (
                  productImageListLoading.map(el =>{
                    return(
                      <div className='h-20 w-20 bg-slate-200 rounded'>

                      </div>
                    )
                  })
                ) : (
                  <div>

                  </div>
                )

              }
            </div>
        </div>

        {/*** Detalles Producto */}
        <div>

        </div>
      </div>

    </div>
  )
}

export default ProductDetails