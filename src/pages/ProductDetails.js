import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayCurrency';
import VerticalCardProduct from '../components/VerticalCardProduct';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  })
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage, setActiveImage] = useState("")

  const [zoomImageCoordinate,setZoomImageCoordinate] = useState({
      x : 0,
      y : 0
  })
  const [zoomImage,setZoomImage] = useState(false)

  console.log("product id", params)

  const fetchProductDetails = async () => {
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        productId: params?.id
      })
    })

    setLoading(false)
    const dataResponse = await response.json()

    setData(dataResponse?.data)
    setActiveImage(dataResponse?.data?.productImage[0])
  }

  console.log("data", data)

  useEffect(() => {
    fetchProductDetails()
  }, [])

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL)
  }

  const handleZoomImage= useCallback((e) =>{
    setZoomImage(true)
    const { left , top, width , height } = e.target.getBoundingClientRect()
    console.log("coordinate", left, top , width , height)

    const x = (e.clientX - left) / width 
    const y = (e.clientY - top) / height 

    setZoomImageCoordinate({
      x,
      y 
    })
  },[zoomImageCoordinate])

  const handleLeaveImageZoom = ()=>{
    setZoomImage(false)
  }

  return (
    <div className='container mx-auto p-4'>

      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/*** Imagen Producto */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
            <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom}/>

            {/** Imagen Zoom de Productos */}
            {
              zoomImage && (
                <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                <div
                  className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
                  style={{
                    backgroundImage : `url(${activeImage})`,
                    backgroundRepeat : 'no-repeat',
                    backgroundPosition : `${zoomImageCoordinate.x *100}% ${zoomImageCoordinate.y *100}%`
                  }}
                >
  
                </div>
              </div>
              )
            }


          </div>

          <div className='h-full'>
            {
              loading ? (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    productImageListLoading.map(el => {
                      return (
                        <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage"}>

                        </div>
                      )
                    })
                  }
                </div>

              ) : (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    data?.productImage?.map((imgURL, index) => {
                      return (
                        <div className='h-20 w-20 bg-slate-200 rounded' key={imgURL}>
                          <img src={imgURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onClick={() => handleMouseEnterProduct(imgURL)} />

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
        {
          loading ? (
            <div className='grid gap-1 w-full'>
              <p className='bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block'></p>
              <h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8  bg-slate-200 animate-pulse w-full'></h2>
              <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8 w-full'></p>

              <div className='text-red-600 bg-slate-200 h-6 lg:h-8 animate-pulse flex items-center gap-1 w-full'>
            
              </div>

              <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8 animate-pulse w-full'>
                <p className='text-red-600 bg-slate-200 w-full'></p>
                <p className='text-slate-400 line-through bg-slate-200 w-full'></p>
              </div>

              <div className='flex items-center gap-3 my-2 w-full'>
                <button className='h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></button>
                <button className='h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></button>
              </div>

              <div className='w-full'>
                <p className='text-slate-500 font-medium my-1 h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></p>
                <p className='bg-slate-200 rounded animate-pulse h-10  lg:h-12 w-full'></p>
              </div>

            </div>
          ) :
            (
              <div className='flex flex-col gap-1'>
                <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
                <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
                <p className='capitalize text-slate-400'>{data?.category}</p>

                <div className='text-red-600 flex items-center gap-1 '>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalf />
                </div>

                <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
                  <p className='text-red-600'>{displayINRCurrency(data.sellingPrice)}</p>
                  <p className='text-slate-400 line-through'>{displayINRCurrency(data.price)}</p>
                </div>

                <div className='flex items-center gap-3 my-2'>
                  <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white '>Comprar</button>
                  <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white'>Agregar al Carro</button>
                </div>

                <div>
                  <p className='text-slate-500 font-medium my-1'>Descripción : </p>
                  <p>{data?.description}</p>
                </div>

              </div>
            )
        }
      </div>

      {
        data.category && (
          <CategoryWiseProductDisplay category={data?.category} heading={"Producto Recomendado"}/>
        )
      }
      

    </div>
  )
}

export default ProductDetails