import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { useProductActions } from "../actions/ProductsActions";
import AddToCartBtn from "../Components/AddToCartBtn";
import { ClipLoader } from "react-spinners";

// css for spinner
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "cyan",
};

const ProductPage = () => {
  const productIdParam = useParams().productid;
  const { fetchSingleProduct } = useProductActions;
  // query to get product details
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["product", productIdParam.toString()],
    queryFn: async () => {
      const data = await fetchSingleProduct(productIdParam);
      return data;
    },
  });

  if (isLoading) {
    return (
      <ClipLoader
        color={"#00FFFF"}
        loading={isLoading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }

  if (isError) {
    return (
      <div className="w-full p-4 flex flex-col gap-4 items-center align-middle justify-center text-center text-red-500">
        <h1 className="font-bold">Error...</h1>
        <p className="text-sm">Failed to fetch!</p>
        <button
          className="bg-yellow-400 text-base w-[200px]  font-semibold mx-auto p-2 rounded-md"
          onClick={refetch}
        >
          Retry
        </button>
      </div>
    );
  }

  if (data)
    return (
      <div className="w-full min-h-[75vh] p-2 flex flex-col mx-auto justify-center gap-4 mb-8">
        <h1 className="text-2xl md:text-4xl my-4 bg-gradient-to-tr from-purple-400 to-cyan-500 bg-clip-text text-transparent leading-normal font-bold mx-auto text-center md:max-w-[50%] ">
          {data.title}
        </h1>

        <div className="w-full h-fit max-h-[400px] flex justify-center items-center object-contain aspect-video mb-4 ">
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-full aspect-video object-center object-scale-down group-hover:scale-105 transition-all duration-500 group-hover:ease-in-out"
          />
        </div>

        <p className="text-lg md:text-xl font-normal text-left bg-gradient-to-tr from-purple-700 to-cyan-900 bg-clip-text text-transparent md:w-[50%] mx-auto ">
          {data.description}
        </p>
        <p className="text-base italic text-right  md:w-[50%] mx-auto text-yellow-700">Rating: {data.rating.rate}</p>

        <div className="w-full flex justify-around align-middle items-center flex-col md:flex-row mx-auto md:max-w-[75%]">
          <p className="text-2xl font-bold bg-gradient-to-b from-cyan-400 to-slate-500 bg-clip-text text-transparent group-hover:text-cyan-400 transition-all duration-300 ">
           Price:  ${data.price}
          </p>

          <AddToCartBtn size={'lg'} item={data}/>
        </div>
      </div>
    );
};

export default ProductPage;
