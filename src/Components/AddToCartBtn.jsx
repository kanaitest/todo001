import React, { useState } from "react";
import { BiSolidCartAdd } from "react-icons/bi";
import { AddItemsToCart } from "../actions/CartActions";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Libs/Firebase";

// button classnames depeding on size as sm, md, lg to vary width and padding
const sizes = {
  sm: "bg-sky-700 rounded-md p-2 group-hover:bg-sky-500 text-white text-base hover:bg-sky-300 cursor-pointer flex items-center justify-center align-middle min-w-[150px] md:w-[200px] disabled:cursor-none disbaled:bg-sky-100",
  lg: "bg-sky-700 rounded-md px-2 py-3 group-hover:bg-sky-500 text-white text-base hover:bg-sky-300 cursor-pointer flex items-center justify-center align-middle disabled:cursor-none disbaled:bg-sky-100",
};

const AddToCartBtn = ({ item, size }) => {
  // loading state when adding item to cart
  const [isAdding, setIsAdding] = useState(false);

  const [user, loading] = useAuthState(auth);
  const userid = user.uid;

  if (loading) {
    return <p className="text-sm font-bold">Loading...</p>;
  }

  return (
    <button
      disabled={isAdding}
      onClick={async () => {
        // set loading state
        setIsAdding(true);
        // add to cart function
        await AddItemsToCart(
          userid,
          item.id,
          item.image,
          item.price,
          item.title
        ).then(() => {
          // reset loading state
          setIsAdding(false);
        });
      }}
      className={size === "lg" || size === undefined ? sizes.lg : sizes.sm}
    >
      {isAdding ? (
        <span className="animate-pulse text-sm font-bold flex align-middle">
          Adding ...
          <AiOutlineLoading3Quarters className="w-5 h-5 ml-2 animate-spin-slow delay-500 " />
        </span>
      ) : (
        <>
          Add to Cart
          <BiSolidCartAdd className="w-5 h-5 ml-2 animate-spin-slow delay-5000 group-hover:animate-none " />
        </>
      )}
    </button>
  );
};

export default AddToCartBtn;
