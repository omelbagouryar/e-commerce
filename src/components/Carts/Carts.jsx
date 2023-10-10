import React, { useContext, useEffect, useState } from 'react'
import {Helmet} from "react-helmet";
import { cartContext } from '../../Context/cartContext';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function Carts() {
  let navigate = useNavigate()
  const [details,setdatails]=useState('')
  const [cartDetails,setcartDetails]=useState([])
  let {getloggedusercart,removeitem,updateitemcount,clearcart}=useContext(cartContext)

   async function getusercart(){
    try {
      let { data } = await getloggedusercart();
      console.log(data?.data);
      setdatails(data?.data);
      setcartDetails(data?.data.products);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  }

  async function deleteitem(id){
   let {data}= await removeitem(id)
   setcartDetails(data?.data.products)
  }

  async function updatecount(id,count){
  let {data}=  await updateitemcount(id,count)
  setcartDetails(data?.data.products)
  }


  async function clearallcart(){
   let {data}= await clearcart()
  console.log(data);
  if(data?.message === "success"){
    navigate('/home')

  }

  }
  useEffect(()=>{
    getusercart()
  },[])
  return (
    <>
    <div className='bg-main-light my-5 p-5 '>
      <div>
      <h2>Shop cart</h2>
      {cartDetails.length > 0 ? (
            <h5 className="text-main">Total Price: {details.totalCartPrice}</h5>
          ) : (
            <h3 className='my-3 fw-bold'>Your Cart is empty</h3>
          )}
      </div>
      {cartDetails.length > 0 && (
          <div className="text-end">
            <button onClick={clearallcart} className="btn btn-outline-danger">
              Clear All Cart
            </button>
          </div>
        )}
      
      {cartDetails.map((product)=>{
        return <>
        {product?.count !== 0?<div className='row my-3 border-bottom py-3'>
          <div className="col-md-1">
          <img src={product?.product.imageCover} className='w-100' alt="" />
          </div>
          <div className="col-md-11 d-flex justify-content-between align-items-center">
            <div>
            <h6>{product?.product.title.split(' ').slice(0,2).join(' ')}</h6>
            <h6 className='text-main'>{product?.product.category.name}</h6>
            <p>Price: {product?.price} EGP</p>
            <button onClick={()=>{
              deleteitem(product?.product._id)
            }} className='btn btn-outline-danger'><i className='fa-regular fa-trash-can'></i> Remove</button>

            </div>
            <div>
              <button onClick={()=>{
                updatecount(product?.product._id,product?.count+1)
              }} className='btn btn-outline-success'>+</button>
              <span className='mx-2' >{product?.count}</span>
              <button onClick={()=>{
                updatecount(product?.product._id,product?.count-1)
              }}  className='btn btn-outline-success'>-</button>
            </div>
            
          </div>
        </div>
        :
        ''}
        
        </> 
        

      })}
       {cartDetails.length > 0 && (
          <Link to={'/checkout'}>
            <div className="text-center">
              <button className="btn bg-main text-light">Check Out</button>
            </div>
          </Link>
        )}
    </div>





    <Helmet>
        <title>Carts</title>
    </Helmet>
    </>
  )
}
