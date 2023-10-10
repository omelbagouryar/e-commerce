import axios from 'axios'
import React, { useEffect } from 'react'

export default function Allorders() {
     async function getallorders(){
     let {data}= await   axios.get(`https://ecommerce.routemisr.com/api/v1/orders/`)
     console.log(data?.data);
    }
    useEffect(()=>{
        getallorders()
    },[])
  return (
    <div>
        
    </div>
  )
}
