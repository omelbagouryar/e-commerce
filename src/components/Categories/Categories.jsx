import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import Slider from "react-slick";

export default function Categories() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay:true,
    slidesToShow: 5,
    slidesToScroll: 1
  };

  async function getCategories(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  let {data,isLoading} = useQuery('category',getCategories)
  return (
    <div className=''>
       <Slider {...settings}>
        {data?.data.data.map((cat)=>{
          return <>
          <img src={cat.image} className='w-100' height={200} alt="" />
          <p>{cat.name}</p>
          </>
        })}




       </Slider>

      
    </div>
  )
}
