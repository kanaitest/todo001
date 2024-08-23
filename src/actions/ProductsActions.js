// fetch all products
const fetchAllProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  return data;
};



// fetch a single product given product id
const fetchSingleProduct = async (productId) => {
  const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
  const data = await res.json();
  return data;
};


export const useProductActions = {
  fetchAllProducts,
  fetchSingleProduct
}