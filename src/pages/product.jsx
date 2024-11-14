import { useContext, useEffect, useState } from "react"
import { loaderContext,} from "../context/usecontext"
import { ProductCard } from "../component/productCard"
import axios from "axios"
import { Pagination, Spin } from "antd"
import { Link, useFetcher } from "react-router-dom"
import { SearchOutlined } from "@ant-design/icons"


export let Product= () =>{

    let {loader,setLoader} = useContext(loaderContext)

    
    
let [products , setProducts] = useState([])

let [allproducts , setAllProducts] = useState([])

let [limit , setLimit] = useState(20)
let [skip , setSkip] = useState(0)
let [total , setTotal] = useState(0)




useEffect(()=>{



    const url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`  // badges antdesign 
    
    
    axios.get(url)
    .then((resProduct)=>{
        setProducts(resProduct.data.products);
       setTotal(resProduct.data.total);
       
        setLoader(false)
    }).catch((err)=>{
        alert(err.message)
        setLoader(false)
    })

},[skip , limit])

useEffect(()=>{
    const allProductUrl = `https://dummyjson.com/products?limit=${200}`  // badges antdesign 
    
    
    axios.get(allProductUrl)
    .then((resProduct)=>{
        setAllProducts(resProduct.data.products);
         
        setLoader(false)
    }).catch((err)=>{
        alert(err.message)
        setLoader(false)
    })

},[])

// header serch start

let [searchValue , setSearchValue] = useState("")

useEffect(()=>{
if(searchValue){
    let filter = allproducts.filter(data => data.title.toLowerCase().includes(searchValue.toLowerCase()))
   setProducts(filter)
console.log(filter);

}
},[searchValue])




// header serch end

    return(<>
 <div className="flex items-center border-b border-gray-300 py-2 mb-5">
        <input
        className="appearance-none bg-transparent border-none w-80 text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none "
        type="text"
        onChange={(e)=> setSearchValue(e.target.value) }
        
        placeholder="Search products"
        aria-label="Search"
      />
      <SearchOutlined className="text-gray-500 text-xl" />
              </div>
    {loader ? (<div className="text-center mt-9 font-extrabold"><Spin /></div>
    ) : ( 
  <div  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 ">
        {products?.map((allProductRes) => 
         <ProductCard
         
         id={allProductRes.id} title={allProductRes.title} description={allProductRes.description} image={allProductRes.images} price={allProductRes.price} rating={allProductRes.rating} click={allProductRes.id}/> )}
      
  </div>
    )
}
<div className="mt-5 ">
        <Pagination onChange={(num)=> setSkip((num-1)*20)
        }  align="center" defaultCurrent={1} total={total} pageSize={limit} onShowSizeChange={(size , page)=> setLimit(page)}/>
    
        
        </div>
        </>)
}