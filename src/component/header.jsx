import { signOut } from "firebase/auth"
import { auth } from "../utils/firebase"
import { Link ,  } from "react-router-dom"
import { UserIsLogin } from "../context/usecontext"
import { useContext, useEffect, useState } from "react"
import { ShoppingCartOutlined ,PlusSquareOutlined,MinusSquareOutlined, DeleteFilled , SearchOutlined } from "@ant-design/icons"
import { Badge,Drawer } from "antd"
import { CartItemContext } from "../context/cartContext"




let Header =() =>{
 
 

  let  {cartItem,setCartItem,deleteItem,addToCart}= useContext(CartItemContext)


let totalAmount = Math.floor(cartItem.reduce((total , obj)=> total + obj.quantity * obj.price ,0))
let totalQuantity = cartItem.reduce((total , obj)=> total + obj.quantity ,0)



let {user , setUser} = useContext(UserIsLogin)

let [showDrawer ,setShowDrawer] = useState(false)


let logoutButton = ()=>{
signOut(auth).then(()=>{

  setUser({isLogin : false , userObj : {}})
}).catch((err)=>{
  alert(err.message)
})

}




let [navbarHover , setNavbarHover ] = useState("home")

  
  let hoverEffect=(id)=>{
  setNavbarHover(id)
  
  
}

let itemQuantityIncreament = (id) =>{
let arr = cartItem;
let index = arr.findIndex((data)=> data.id == id)
arr[index].quantity++
setCartItem([...arr])


}
let itemQuantityDecreament = (id) =>{
let arr = cartItem;


let index = arr.findIndex((data)=> data.id == id)

arr[index].quantity--
setCartItem([...arr])

}


// console.log(user)

    return(
      
    <header className="text-black body-font mx-20">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      
      <span className="text-black text-2xl font-bold">EDOT. </span><span className="text-teal-500  font-bold ms-1 text-2xl pt-1"> PAK</span>
    </a>
    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
      <Link to={"/"} id="home"
       onClick={(e)=> hoverEffect(e.target.id)}   
      className={`mr-5 hover:text-gray-500 text-sm font-medium ${navbarHover == "home" ? 'text-teal-500' : 'text-black'}`}>HOME</Link>

      <Link to={"about"} id="about" onClick={(e)=> hoverEffect(e.target.id)}
      className={`mr-5 hover:text-gray-500 text-sm font-medium ${navbarHover == "about" ? 'text-teal-500' : 'text-black'}`}>ABOUT</Link>
      <Link to={"about"} id="category" onClick={(e)=> hoverEffect(e.target.id)}
      className={`mr-5 hover:text-gray-500 text-sm font-medium ${navbarHover == "category" ? 'text-teal-500' : 'text-black'}`}>CATEGORIES</Link>
    
           
    </nav>
   { user.isLogin ? (
    <div className="flex">
    <div>
{/* <h1>{user.userObj}</h1> */}
<h1 className="mr-5 cursor-pointer" onClick={logoutButton}>Logout</h1>

</div>
<div>
  </div>
        <Badge count={cartItem.length} > <ShoppingCartOutlined className="text-2xl" /></Badge> 
        <Drawer title="Your Cart" 
        placement="right"
       
        // closable={false}
        visible={showDrawer}
        width={400}><p>gertrehrhe</p></Drawer>
      </div>
    
    ) : (
      <>
      <nav className=" flex flex-wrap items-center text-base justify-center">
      <Link to={"login"} id="login" onClick={(e)=> hoverEffect(e.target.id)}
      className={`mr-5 hover:text-teal-300 text-sm font-medium ${navbarHover == "login" ? 'text-teal-500' : 'text-black'}`}>Login</Link> 
    </nav>
      <div>
        <Badge count={cartItem.length} > <ShoppingCartOutlined onClick={()=> setShowDrawer(true)} className="text-2xl" /></Badge> 
     
      </div>
      <Drawer title="Your Cart Items" 
        placement="right"
      
        onClose={()=>setShowDrawer(false)}
        // closable={false}
        visible={showDrawer}
        width={500}
        className={"rounded-2xl"}
        
        >
          
          <table className="table-auto border-collapse w-full text-left">
            {/* <thead className="w-full flex ">
              <div>ALL PRODUCT</div>
              <div>Prooduct Check Out</div>
            </thead> */}
 <thead>
    <tr className="bg-gray-100 border text-center">
      <th className="py-2  border text-center" colSpan="2">Total Quantity</th>
      <th className="py-2  border text-center" colSpan="2">Total Price</th>
      <th className="py-2  border text-center" colSpan="1">Product Checkout</th>
    </tr>
  </thead>
  <tbody>
    <tr className="bg-gray-100 border-b text-center">
      <th className="py-2  border text-center" colSpan="2">{totalQuantity}</th>
      <th className="py-2  border text-center" colSpan="2">$ {totalAmount}</th>
      <td className="py-2  border text-center" colSpan="1">
        <button className="hover:bg-teal-400 hover:text-white text-teal-500 border border-teal-400 py-1 px-4 rounded">Checkout</button>
      </td>
    </tr>
  </tbody>
  <br/>
  <thead>
    <tr className="bg-gray-50 border-b text-center">
      <th className="pe-4 py-2">Image</th>
      <th className="px-4 py-2">Name</th>
      <th className="px-4 py-2">Quantity</th>
      <th className="px-4 py-2">Price</th>
      <th className="px-4 py-2">Delete Item</th>
    </tr>
  </thead>
  <tbody>
   
      {
      
      cartItem?.map(cartData =>
    
       <tr className="  text-center ">
        
      <td className="border pe-4 py-2 border-none "><img className="rounded-xl" src={cartData.thumbnail} alt="" /></td>
      <td className="border px-4 py-2 border-none">{cartData.title}</td>
      <div className="flex py-10 ms-4 ">
     <button disabled={cartData.quantity === 1}><MinusSquareOutlined   onClick={()=> itemQuantityDecreament(cartData.id)} className="cursor-pointer text-lg text-red-500"/></button>
      <td className="border px-3 text-lg border-none">{cartData.quantity}</td>
      <button><PlusSquareOutlined onClick={()=> itemQuantityIncreament(cartData.id)} className="cursor-pointer text-lg text-green-500" /></button>
     </div>
      <td className="border px-4 py-2 border-none">${cartData.price}</td>
      <td className="border px-4 py-2 border-none cursor-pointer text-red-500 hover:text-red-600"><button onClick={()=> deleteItem(cartData.id)} ><DeleteFilled className="text-2xl " /> Delete</button></td>
   

    </tr>
     )
 
    }
  </tbody>
</table>
          
          </Drawer>
      </>
    )   }
   
  </div>

</header>

    )
}
export default Header