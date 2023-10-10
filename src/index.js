import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserContextProvider from './Context/userToken';
import {QueryClient,QueryClientProvider} from 'react-query'
import CartContextProvider from './Context/cartContext';
import WishlistContextProvider from './Context/wishlistcontext';
let queryClient=new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <WishlistContextProvider>
  <CartContextProvider>
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
    <App />
  </UserContextProvider>
  </QueryClientProvider>
  </CartContextProvider>
  </WishlistContextProvider>


  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
