import React from 'react'
import { useParams } from 'react-router-dom';

const ProductPage = () => {
    const productIdParam = useParams().productid;
  return (
    <div>ProductPage : {productIdParam}</div>
  )
}

export default ProductPage