import React, { useMemo } from "react";
import { GetAllCartItems } from "../actions/CartActions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CartItemCard from "./CartItemCard";
import { ClearAllCartItems } from "../actions/CartActions";
import { useNavigate } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";
import { FaTrashAlt } from "react-icons/fa";

const CartItemsList = ({ user }) => {
  const navigate = useNavigate();

  // query client
  const queryClient = useQueryClient();

  // useQuery
  const { data, isError, isLoading } = useQuery({
    queryKey: ["cart", user.uid],
    queryFn: async () => {
      const cartData = await GetAllCartItems(user.uid);
      return cartData;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error...</div>;
  }

  // data length === 0
  if (data.length === 0 || !data) {
    return (
      <div className="w-full p-4 flex flex-col items-center justify-center gap-4">
        <h1 className="text-xl font-semibold">Your Cart is Empty</h1>

        {/* quick link to home */}
        <p>
          Browse our products{" "}
          <a
            className="text-xl font-bold my-6 bg-gradient-to-r from-purple-400 to-cyan-500 bg-clip-text text-transparent underline hover:underline-offset-4"
            href="/"
          >
            here
          </a>
        </p>
      </div>
    );
  }

  if (data) {
    // calculate total cost of all items in cart
    const TotalCartItemsCost = data.reduce((total, item) => {
      return total + item.unit_price * item.quantity;
    }, 0);
    return (
      <div className="w-full p-4 flex flex-col items-center justify-center gap-4">
        <div className="w-full flex flex-col items-center justify-center gap-4 mx-auto">
          {data.map((item) => (
            <CartItemCard key={item.id} userid={user.uid} item={item} />
          ))}
        </div>
        <div className="w-[90%] flex align-middle items-center justify-around p-4 mx-auto">
          <p className="text-xl font-semibold">
            Total Cost: {TotalCartItemsCost}
          </p>
          {/* checkout button */}

          <CheckoutButton userid={user.uid} />
          {/* clear cart button */}
          <button
            onClick={async () =>
              await ClearAllCartItems(user.uid).then(() => {
                queryClient.resetQueries(["cart", user.uid]);
              })
            }
            className="bg-red-300 hover:bg-red-400 text-white p-2 rounded-md flex align-middle justify-center"
          >
            <FaTrashAlt className="w-6 h-6 mr-2" />
            Clear Cart
          </button>
        </div>
      </div>
    );
  }
};

export default CartItemsList;
