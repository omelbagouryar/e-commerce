import React, { useContext, useEffect, useState } from 'react'
import { wishlistContext } from '../../Context/wishlistcontext'
import { cartContext } from '../../Context/cartContext'
import toast from 'react-hot-toast'

export default function Wishlist() {
  const [wishlistDetails,setwishlistDetails]=useState([])
  let {getloggeduserwishlist,removeitems}=useContext(wishlistContext)
 let {AddToCart} =useContext(cartContext)



   async function addtocart(id){
    let {data}=await AddToCart(id)
    console.log(data);
    if(data.status==='success'){
      toast.success(data.message)
      deleteitems(id)
    }
  }



  async function getuserwishlist(){
    let {data} = await getloggeduserwishlist()
    console.log(data?.data);
    setwishlistDetails(data?.data)
  }


  async function deleteitems(id){
    let {data}= await removeitems(id)
    console.log(data);
    setwishlistDetails(data.data)
   }

  useEffect(()=>{
    getuserwishlist()
  },[])

  return (
    <div className='bg-main-light my-5 p-5 '>
      <div>
      <h2>My Wish List</h2>
      </div>
      
      
      {wishlistDetails.length === 0 ? (
        <h3 className='fw-bold my-3'>Your wishlist is empty</h3>
      ) : (
        
        wishlistDetails.map((product) => (
          <div key={product._id} className='row my-3 border-bottom py-3'>
            <div className='col-md-1'>
              <img src={product.imageCover} className='w-100' alt='' />
            </div>
            <div className='col-md-11 d-flex justify-content-between align-items-center'>
              <div>
              <h6>{product.title?product.title.split('').slice(0,2).join(''):''}</h6>
            <h6 className='text-main'>{product.title?<>{product.title}</>:''}</h6>
                <p>Price: {product.price} EGP</p>
                <button
                  onClick={() => {
                    deleteitems(product._id);
                  }}
                  className='btn btn-outline-danger'
                >
                  <i className='fa-regular fa-trash-can'></i> Remove
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    addtocart(product._id);
                  }}
                  className='btn bg-main text-light'
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
