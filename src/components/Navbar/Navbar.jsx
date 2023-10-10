import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import image from '../../Assets/img/freshcart-logo.svg'
import { userContext } from '../../Context/userToken'
export default function Navbar() {
  let navigate=useNavigate()
  let {userToken,setToken}=useContext(userContext)
  function logout(){
    localStorage.removeItem('userToken');
    setToken(null);
    navigate('/login')
  }
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <Link className="navbar-brand" to="/">
      <img src={image} alt="" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {userToken !== null?
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link className="nav-link" to="home">Home</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="carts">Cart</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="wishlist">Wishlist</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="products">Products</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="categories">Categories</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="brands">Brands</Link>
      </li>
    </ul>
    :
    ''
      }
      
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item d-flex align-items-center">
          <i className='fab mx-2 fa-instagram'></i>
          <i className='fab mx-2 fa-facebook'></i>
          <i className='fab mx-2 fa-tiktok'></i>
          <i className='fab mx-2 fa-twitter'></i>
          <i className='fab mx-2 fa-linkedin'></i>
          <i className='fab mx-2 fa-youtube'></i>
        </li>
        {userToken === null?
        <>
        <li className="nav-item">
        <Link className="nav-link btn btn-info mx-2 " to="login">Login</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link btn btn-info " to="register">Register</Link>
      </li>
        </>
        : 
        <li className="nav-item">
          <Link onClick={()=>{logout()}} className="nav-link btn btn-info mx-2" to="login">Logout</Link>
        </li>

        }
        
        
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}
