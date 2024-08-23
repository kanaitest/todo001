import React from "react";
import { Link } from "react-router-dom";
import AddToCartBtn from "./AddToCartBtn";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Libs/Firebase";

const ProductCard = ({ item }) => {
  const [user, loading] = useAuthState(auth);

  return (
    <div className="border hover:shadow-md cursor-pointer shadow-sm rounded-md px-4 py-2 flex flex-col items-center shadow-gray-400 group ">
      <h1 className="text-lg font-semibold text-pretty mb-4 mx-auto w-full md:w-[60%] text-center bg-gradient-to-r from-purple-600 to-cyan-800 bg-clip-text text-transparent group-hover:bg-gradient-to-l group-hover:from-cyan-400 group-hover:to-purple-900 group-hover:text-cyan-800 transition-all duration-300">
        {/* splice the title to 5 words only*/}
        {item.title.split(" ").splice(0, 6).join(" ")}
      </h1>
      <Link
        to={`/products/${item.id}`}
        className="w-full h-fit max-h-[400px] flex justify-center items-center object-contain aspect-video mb-4 "
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full aspect-video object-center object-scale-down group-hover:scale-105 transition-all duration-500 group-hover:ease-in-out"
        />
      </Link>
      <div className="self-end mt-auto flex justify-around w-full align-middle items-center">
        <p className="text-3xl font-bold bg-gradient-to-b from-cyan-400 to-slate-500 bg-clip-text text-transparent group-hover:text-cyan-400 transition-all duration-300 ">
          ${item.price}
        </p>
        {/* add to cart button */}
        {loading && <p className="animate-pulse text-sm font-bold">...</p>}
        {!user && (
          <a
            className="text-sm italic font-light text-sky-600 hover:underline"
            href="/sign-in"
          >
            sign in to buy
          </a>
        )}
        {user && <AddToCartBtn userid={user.uid} item={item} />}
      </div>
    </div>
  );
};

export default ProductCard;
