import { useQueryClient, useMutation } from "@tanstack/react-query";
import React from "react";
import { UpdateCartItemQuantity } from "../actions/CartActions";
import { toast } from "react-toastify";

const CartItemsQuantityControls = ({ item, userid }) => {
  // destructure item
  const { id, quantity } = item;
  // query client comsumption
  const queryClient = useQueryClient();
  // useMutation to update the quantity of the cart item in the cart_items collection
  const mutation = useMutation({
    mutationFn: UpdateCartItemQuantity,
    mutationKey: ["cart", userid],
    onSuccess: async () => {
      await queryClient.invalidateQueries(["cart", userid]);
    },
    onError: async (err) => {
      // toast an error message
      toast.error("Error updating quantity!:" + err?.message);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(["cart", userid]);
    },
  });

  return (
    <div className="w-full flex flex-col mx-auto  ">
      <p className="text-slate-600 font-light text-center">Quantity</p>
      <div className="flex items-center justify-center gap-4">
        <button
          disabled={quantity <= 1}
          onClick={() => {
            mutation.mutate("decrease", { userid, id });
          }}
          className="bg-slate-200 disabled:bg-transparent disabled:text-white hover:bg-slate-300 text-black p-2 rounded-md w-8 h-8 flex justify-center items-center align-middle text-center"
        >
          -
        </button>
        <p className="text-xl font-semibold">{quantity}</p>
        <button
          onClick={() => {
            mutation.mutate({
              mode: "increase",
              userid: userid,
              cartItemId: id,
            });
          }}
          className="bg-slate-200 hover:bg-slate-300 text-black p-2 rounded-md w-8 h-8 flex justify-center items-center align-middle text-center"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItemsQuantityControls;
