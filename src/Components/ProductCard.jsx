import React from 'react'

const ProductCard = ({item}) => {
  return (
    <div className='border hover:shadow-md cursor-pointer shadow-sm rounded-md px-4 py-2 flex flex-col items-center'>
        <h1 className='text-sm font-semibold text-pretty mb-4 mx-auto w-[40%] text-center' >{item.title}</h1>
        <p className='text-xl font-semibold'>${item.price}</p>
        <img src={item.image} alt={item.title} className='w-[200px] h-[120] object-cover' />
    </div>
  )
}

export default ProductCard