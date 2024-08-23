import React from 'react'
import { BiSolidCartAdd } from 'react-icons/bi'
import { AddItemsToCart } from '../actions/CartActions'

// button classnames depeding on size as sm, md, lg to vary width and padding
const sizes = {
  sm: 'bg-sky-700 rounded-md p-2 group-hover:bg-sky-500 text-white text-base hover:bg-sky-300 cursor-pointer flex items-center justify-center align-middle min-w-[150px] md:w-[200px]',
  lg: 'bg-sky-700 rounded-md px-2 py-3 group-hover:bg-sky-500 text-white text-base hover:bg-sky-300 cursor-pointer flex items-center justify-center align-middle'
  
}


const AddToCartBtn = ({item, size, userid}) => {
  return (
    <button onClick={async()=>{
        // add to cart function
      await AddItemsToCart(userid, item.id)
      }}
   className={(size ==='lg')? sizes.lg : sizes.sm }>
      Add to Cart
      <BiSolidCartAdd  className="w-5 h-5 ml-2 animate-spin-slow delay-5000 group-hover:animate-none " />
    </button>
  )
}

export default AddToCartBtn