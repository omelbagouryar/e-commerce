import axios from "axios";
import { createContext } from "react";
export let wishlistContext=createContext()
 export default function WishlistContextProvider(props){
    let baseurl=`https://ecommerce.routemisr.com`
    let headers={
        token:localStorage.getItem('userToken')
    }
    function AddToWishlist(id){
        return    axios.post(`${baseurl}/api/v1/wishlist`,
            {productId:id},
            {headers:headers}
            )
        }

        function getloggeduserwishlist(){
            return    axios.get(`${baseurl}/api/v1/wishlist`,
            {headers:headers}
            )
    
        }
        function removeitems(id){
            return    axios.delete(`${baseurl}/api/v1/wishlist/${id}`,
            {headers:headers}
            )
        }
    return <wishlistContext.Provider value={{AddToWishlist,getloggeduserwishlist,removeitems}}>
{props.children}
    </wishlistContext.Provider>

}