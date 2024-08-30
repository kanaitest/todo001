import React from "react";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

import { Link } from "react-router-dom";
import { DeleteItemFromCart } from "../actions/CartActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CartItemsQuantityControls from "./CartItemsQuantityControls";

const CartItemCard = ({ item, userid }) => {
  // destructure item
  const { productid, product_name, unit_price, imageUrl, id } = item;

  // query client comsumption
  const queryClient = useQueryClient();
  // useMutation to delete a specific item from cart
  const mutation = useMutation({
    mutationFn: async () => await DeleteItemFromCart(id, userid),
    mutationKey: ["cart", userid],
    onMutate: async () => {
      await queryClient.cancelQueries(["cart", userid]);
      const previousCart = queryClient.getQueryData(["cart", userid]);
      queryClient.setQueryData(["cart", userid], (old) => {
        return old.filter((cartItem) => cartItem.id !== item.id);
      });
      return { previousCart };
    },
  });

  return (
    <div className="w-full max-w-[750px] flex flex-col md:flex-row align-middle items-center justify-around p-4 mx-auto  bg-slate-50 rounded--md shadow-sm">
      <div className="w-full flex flex-col items-center justify-around align-middle gap-4">
        {/* // image container */}
        <Link
          to={`/products/${productid}`}
          className="flex flex-col items-center justify-center align-middle gap-4 min-w-[120px] aspect-square m-auto"
        >
          <img
            src={imageUrl}
            alt={product_name}
            className="w-[100px] h-[100px] object-contain object-center"
          />
        </Link>

        {/* name and price */}
        <div className="w-full flex flex-col items-center justify-center gap-1">
          <p className="text-base font-normal text-center text-slate-700 ">
            {product_name}
          </p>
          <p className="font-light text-sm text-slate-500">
            Unit Price: ${unit_price}
          </p>
        </div>

        {/* quantity Controls */}
        <CartItemsQuantityControls  item={item} userid={userid} />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 self-end md:self-start ">
        <button
          onClick={() => {
            mutation.mutate();
          }}
          className="bg-sky-100 hover:bg-white text-black p-2 rounded-md text-xs flex items-center justify-center align-middle "
        >
          {mutation.isPending ? (
            <>
              <MdOutlineRemoveShoppingCart className="w-4 h-4 text-yellow-300 animate-spin delay-0" />
              <span className="text-lime-600 font-thin ml-3">removing ...</span>
            </>
          ) : (
            <>
              <MdOutlineRemoveShoppingCart className="w-4 h-4 text-red-300" />
              <span className="text-red-600 font-thin ml-3">remove</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
