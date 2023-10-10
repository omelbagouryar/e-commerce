import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react';

export default function Brands() {
 const [brands,setbrands]= useState([])
 async function getbrands(){
   let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
   console.log(data.data);
   setbrands(data.data)
  }
  useEffect(()=>{
    getbrands()
  },[])
  return (
    <div>
      <h2 className='text-main text-center fw-bold my-4'>All Brands</h2>
      <div className="row gy-4 my-3">
        {brands.map((brand)=>{
          return <div className="col-md-3">
            <div className=" card-img">
            <img src={brand.image} className='w-100' alt="" />
            <p className='text-center'>{brand.name}</p>
            </div>
          </div>

        })}
      </div>
      {/* <button onClick={getbrands} className='btn btn-outline-danger'>ayhaga</button> */}
    </div>
  )
}
