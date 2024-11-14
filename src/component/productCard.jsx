
import { ShoppingCartOutlined, StarFilled, StarOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { Button } from "antd"
import { useContext } from "react"
import { CartItemContext } from "../context/cartContext"




export let ProductCard = ({ id, title, description, image, price , category , rating , click}) => {


    let {cartItem,isItemAdded} = useContext(CartItemContext)

// console.log(cartItem);

    return (
        <>
<Link to={`/productDetail/${id}`} >
            <div className={`${id} relative border  overflow-hidden group`}
         onClick={()=>{
        <Link to={`productDetail/${click}`} />
         }}            
            >
                <div className="relative ">

                    <img src={image[0]} alt="Product 1" className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300 " />


                    <div className="rounded-l-md absolute bottom-0 right-0 flex flex-col items-end justify-end pe-4 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="p-2  transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100 ">
                            <p className="text-white text-lg cursor-pointer"><ShoppingCartOutlined /><span className="text-sm"> Add to Cart</span></p>
                            <p className="text-white text-lg cursor-pointer"><StarOutlined/><span className="text-sm"> Add Reviews</span></p>
                        </div>
                    </div>
                </div>


                <div className="p-4">
                    <p className="text-xs text-gray-900">{category}</p>
                    <p className="text-md font-semibold">{title}</p>
                    <p className="text-md text-gray-500 mb-1">{ description.slice(1,60)}....</p>
                   
                    <div className="flex mt-3">
                    <p className="text-teal-500 font-bold">${price}</p>
                    <div className="flex ms-auto">
                    <StarFilled className=" mb-2 pt-1 mr-1 text-orange-500 text-xs" >   </StarFilled> <h1 className="text-sm text-orange-500">{rating}</h1>
                    </div>
                    </div>
                </div>
                <div className="w-100 text-center mb-4">
                <Button className="px-20 text-center border border-teal-500 text-teal-500 ">{isItemAdded(id) ? `Added ( ${isItemAdded(id).quantity} )` : `Add to Cart`}</Button>
            </div>
            </div>

</Link>

        </>
    )
}