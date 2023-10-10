import axios from 'axios'
import React, { useContext } from 'react'
import { BallTriangle } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import Slider from "react-slick"
import { cartContext } from '../../Context/cartContext'
export default function Datails() {
 let {AddToCart} =useContext(cartContext)
 async function addtocart(id){
  let {data}=await AddToCart(id)
  console.log(data);
  if(data.status==='success'){
    toast.success(data.message)
  }
}
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    let params=useParams()
    async function getProductDetails(id){
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
  let {data,isLoading} =useQuery('details',()=>getProductDetails(params.id))
  return (
    <>
    {! isLoading ? 
       <div className="row align-items-center my-5 ">
       <div className="col-md-3 ">
       <Slider {...settings}>
       {data?.data.data.images.map((img)=>{
        return <img src={img} alt={data?.data.title} />
       })}
       </Slider>
       </div>
       <div className="col-md-9">

           <h3 className='fw-bold'>{data?.data.data.title}</h3>
           <p className='text-muted'>{data?.data.data.description}</p>
           <p className='text-main'>{data?.data.data.category.name}</p>
           <div className='d-flex justify-content-between py-3'>
          <span>{data?.data.data.price} EGP</span>
          <span ><i className='fa-solid fa-star rating-color'></i> {data?.data.data.ratingsAverage}</span>
        </div>
        <button onClick={()=>{
          addtocart(data?.data.data._id)
         }} className='btn bg-main w-100 text-light'>Add To Cart</button>
       </div>
   </div> :<div className='vh-100  d-flex justify-content-center align-items-center'>
 <BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperClass={{}}
  wrapperStyle=""
  visible={true}
/>
    </div> }
 
 





    </>
  )
}
