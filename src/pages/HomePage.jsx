import React from 'react'
import { useQuery } from "@tanstack/react-query";
import ProductCard from '../Components/ProductCard';

const HomePage = () => {
  const {data, isError, isLoading}= useQuery({
    queryKey:['randomdata'],
    queryFn: async ()=>{
      const res = await fetch('https://fakestoreapi.com/products')
      return res.json()
    }
  })

  if(isLoading){
    return <h1>Loading...</h1>
  }
  if(isError){
    return <h1>Error...</h1>
  }
  console.log(data)
  return (
    <div className='w-full p-2 grid grid-cols-2 gap-4'>
      {
        data.map((item)=>(
          <ProductCard key={item.id} item={item}/>
        )
      )
    }
    </div>
  )
}

export default HomePage