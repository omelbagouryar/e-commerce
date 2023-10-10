import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/cartContext';
import toast from 'react-hot-toast';
import { wishlistContext } from '../../Context/wishlistcontext';

export default function Products() {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  let { AddToCart } = useContext(cartContext);
  let { AddToWishlist, getloggeduserwishlist } = useContext(wishlistContext);

  async function addtocart(id) {
    let { data } = await AddToCart(id);
    console.log(data);
    if (data.status === 'success') {
      toast.success(data.message);
    }
  }

  async function addtowishlist(id) {
    let { data } = await AddToWishlist(id);
    console.log(data);
    if (data.status === 'success') {
      toast.success(data.message);
    
      setWishlistProducts([...wishlistProducts, id]);
    }
  }

  async function getProducts() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data, isError, isFetching, isLoading } = useQuery('product', getProducts);

 
  useEffect(() => {
    getloggeduserwishlist().then(({ data }) => {
      setWishlistProducts(data?.data.map((product) => product._id));
    });
  }, []);

  return (
    <>
      {!isLoading ? (
        <div className="row my-5">
          {data?.data.data.map((product) => {
            const isProductInWishlist = wishlistProducts.includes(product._id);

            return (
              <div className="col-md-3 my-3" key={product._id}>
                <div className="product p-5 text-center">
                  <Link to={`/details/${product._id}`}>
                    <img src={product.imageCover} alt={product.title} className="w-100" />
                    <p className="text-main">{product.category.name}</p>
                    <h6 className="text-muted">{product.title.split(' ').slice(0, 2).join(' ')}</h6>
                    <div className="d-flex justify-content-between py-3">
                      <span>{product.price} EGP</span>
                      <span>
                        <i className={`fa-solid fa-star rating-color`}></i> {product.ratingsAverage}
                      </span>
                    </div>
                  </Link>
                  <div className="float-end ">
                    <i
                      onClick={() => {
                        addtowishlist(product._id);
                      }}
                      className={`fa-solid fa-heart h3 cursor-pointer ${
                        isProductInWishlist ? 'heart' : ''
                      }`}
                    ></i>
                  </div>
                  <button
                    onClick={() => {
                      addtocart(product._id);
                    }}
                    className="btn bg-main w-100 text-light"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="vh-100  d-flex justify-content-center align-items-center">
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
        </div>
      )}
    </>
  );
}
