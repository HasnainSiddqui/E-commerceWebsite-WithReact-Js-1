import { createContext, useEffect, useState } from "react";




export let CartItemContext = createContext()

export let CartItemContextProvider = ({children}) => {

    let [cartItem, setCartItem] = useState([]);
    let [loaded, setLoaded] = useState(false);

    


   useEffect(()=>{
let items = localStorage.getItem("cartItem")
if(items){
    setCartItem([...JSON.parse(items)])
    setLoaded(true)
}
   },[])
    
   useEffect(()=>{ 
    if(loaded){

        localStorage.setItem("cartItem" , JSON.stringify(cartItem))
    }      
   }, [cartItem])


    
    let addToCart = (data) =>{ 
        let arr = cartItem  
      const itemIndex =  arr.findIndex((cartData)=> cartData.id == data.id )
        if(itemIndex == -1){
            setCartItem([...cartItem,{...data ,quantity:1}])
        }else{
            
             
            arr[itemIndex].quantity++
           setCartItem([...arr])
            
        }   
          
    }

 let deleteItem = (id) =>{
    let arr = cartItem
    let index = cartItem.findIndex((cartData) => cartData.id == id)
   arr.splice(index , 1);
   setCartItem([...arr])
 }
    
let isItemAdded = (id) =>{
    let arr = cartItem
    let index = cartItem.findIndex((cartData) => cartData.id == id)
    if(index == -1){
        return(null)
    }else{
       return( arr[index])
    }
    
}


    return(
     
   <CartItemContext.Provider value={{cartItem , setCartItem ,  addToCart, isItemAdded , deleteItem}}> 

    {children}

 </CartItemContext.Provider> 
 
)
}
   