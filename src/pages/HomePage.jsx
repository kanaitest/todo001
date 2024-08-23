import React from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../Components/ProductCard";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "cyan",
};
const HomePage = () => {
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      return data;
    },
  });

  return (
    <div className="w-full min-h-[60vh] max-h-fit p-2 flex flex-col items-center justify-center text-pretty mb-4 ">
      <h1 className="text-5xl md:text-6xl my-4 bg-gradient-to-tr from-purple-400 to-cyan-500 bg-clip-text text-transparent leading-normal font-extrabold ">
        ElectroSpace
      </h1>
      {/* brief Intro */}
      <p className="text-4xl font-bold text-center mb-2 bg-gradient-to-tr from-purple-400 to-cyan-500 bg-clip-text text-transparent p-1">
        Level Up Your Tech Game With our Cutting Edge Electronics!
      </p>
      <p className="text-xl font-semibold text-center mb-6 bg-gradient-to-l from-purple-400 to-teal-500 bg-clip-text text-transparent md:leading-relaxed md:max-w-[75%]">
        From the latest smartphones and laptops to smart home gadgets and audio
        gear, we have everything you need to get the most out of tech world.
        Explore our wide selection of top brands and discover incredible deals
        that will make your heart race (and your wallet happy!)
      </p>
      <h2 className="text-2xl font-bold mb-auto bg-gradient-to-bl from-purple-400 to-cyan-500 bg-clip-text text-transparent">
        Featured Products
      </h2>
      {isLoading && (
        <ClipLoader
          color={"#00FFFF"}
          loading={isLoading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
      {!isLoading && isError && (
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
      )}
      {data && (
        <>
          <div className="w-full justify-items-center  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
            {/* // filter to show electronic only */}
            {data
              .filter((item) => item.category === "electronics")
              .map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
          </div>

          <h2 className="text-xl font-bold my-6 bg-gradient-to-r from-purple-400 to-cyan-500 bg-clip-text text-transparent">
            Other Products
          </h2>
          <div className="w-full justify-items-center  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* // filter to show electronic only */}
            {data
              .filter((item) => item.category != "electronics")
              .map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
