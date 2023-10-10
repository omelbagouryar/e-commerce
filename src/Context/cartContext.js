import axios from "axios";
import { createContext } from "react";

export let cartContext=createContext()
 export default function CartContextProvider(props){
    let baseurl=`https://ecommerce.routemisr.com`
    let headers={
        token:localStorage.getItem('userToken')
    }
    function AddToCart(id){
    return    axios.post(`${baseurl}/api/v1/cart`,
        {productId:id},
        {headers:headers}
        )
    }

    function getloggedusercart(){
        return    axios.get(`${baseurl}/api/v1/cart`,
        {headers:headers}
        )

    }
    function removeitem(id){
        return    axios.delete(`${baseurl}/api/v1/cart/${id}`,
        {headers:headers}
        )
    }

    function updateitemcount(id,count){
        return    axios.put(`${baseurl}/api/v1/cart/${id}`,
        {count:count},
        {headers:headers}
        )
    }
    function clearcart(){
        return    axios.delete(`${baseurl}/api/v1/cart`,
        {headers:headers}
        )

    }

    function onlinePayment(id,shippingAddress){
        return    axios.post(`${baseurl}/api/v1/orders/checkout-session/${id}`,
        {shippingAddress:shippingAddress},
        {headers:headers}
        )
    }


return <cartContext.Provider value={{AddToCart,getloggedusercart,removeitem,updateitemcount,clearcart,onlinePayment}}>
    {props.children}
</cartContext.Provider>
}