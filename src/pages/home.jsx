import { useEffect, useState } from "react"
import { Product } from "./product"



let Home = () => {






  return (



    <div className="container text-gray-600 body-font px-5 2xl:px-24 py-6 mx-auto overflow-hidden">

      <div className="relative overflow-hidden ">
        <img style={{ height: '70%', width: '100%' }} src="../../image/topBanner.png" alt=""  />
        <div className="absolute inline-block top-3 md:top-5 md:pe-32 lg:my-6 lg:ms-3 lg:top-0 xl:top-5 text-xs md:text-base p-2 pt-0 pr-24 xl:my-14 xl:ms-14 font-medium text-gray-500">
          <h1><span className=" font-bold text-gray-700 ">Built for Performance </span>Immerse Yourself in Crystal Clear Sound with Our Premium Headphones Designed for Comfort!</h1>
          <h1 className="invisible  lg:visible">Experience Sound Like Never Before with Our Premium Headphones.</h1>
          <button
          
          
          className="invisible lg:visible text-gray-700 px-3  py-1.5 mt-3 rounded shadow bg-white hover:bg-gray-100">View Products</button>
        </div>
      </div>

    <h1 className="my-8 text-xl font-bold">All Products</h1>

     
<Product  />

    </div>


  )
}
export default Home