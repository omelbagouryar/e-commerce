import {RouterProvider, createBrowserRouter} from 'react-router-dom'
// import './App.css';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home'
import Products from './components/Products/Products'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Carts from './components/Carts/Carts'
import Details from './components/Details/Datails'
import Notfound from './components/Notfound/Notfound'
import Logout from './components/Logout/Logout';
import toast, { Toaster } from 'react-hot-toast';
import  { userContext } from './Context/userToken';
import { useContext, useEffect } from 'react';
import ProtectedRouter from './components/protectedRouter/ProtectedRouter';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Resetpassword from './components/ResetPassword/Resetpassword';
import Checkout from './components/Checkout/Checkout';
import Allorders from './components/AllOrders/Allorders';
import Wishlist from './components/wishlist/Wishlist';
function App() {
  let {setToken}= useContext(userContext)
  const router=createBrowserRouter([
    {path:'',element:<Layout/>,children:[
      {index:true,element:<ProtectedRouter><Home/></ProtectedRouter>},
      {path:'home',element:<ProtectedRouter><Home/></ProtectedRouter>},
      {path:'products',element:<ProtectedRouter><Products/></ProtectedRouter>},
      {path:'carts',element:<ProtectedRouter><Carts/></ProtectedRouter>},
      {path:'categories',element:<ProtectedRouter><Categories/></ProtectedRouter>},
      {path:'brands',element:<ProtectedRouter><Brands/></ProtectedRouter>},
      {path:'details/:id',element:<ProtectedRouter><Details/></ProtectedRouter>},
      {path:'wishlist',element:<ProtectedRouter><Wishlist/></ProtectedRouter>},
      {path:'register',element:<Register/>},
      {path:'checkout',element:<Checkout/>},
      {path:'allorders',element:<Allorders/>},
      {path:'forgotpassword',element:<ForgotPassword/>},
      {path:'resetpassword',element:<Resetpassword/>},
      {path:'login',element:<Login/>,},
      {path:'logout',element:<Logout/>},
      {path:'*',element:<Notfound/>}
    ]}
    
  ])
  useEffect(()=>{
    if(localStorage.getItem('userToken')!== null){
      setToken(localStorage.getItem('userToken'))
    }
  },[])

  
  return (
    <div>
    <RouterProvider router={router}/>
    <Toaster />
    </div>
  );
}

export default App;
