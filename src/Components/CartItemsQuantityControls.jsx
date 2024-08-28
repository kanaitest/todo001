import { useQueryClient,useMutation } from "@tanstack/react-query";
import React from "react";

const CartItemsQuantityControls = ({ item }) => {
  // destructure item
  const { id, quantity } = item;
  // query client comsumption
  const queryClient = useQueryClient();
  // useMutation to update the quantity of the cart item in the cart_items collection
  const mutation = useMutation({
    mutationFn: async () => await UpdateCartItemQuantity(id, mode),
    mutationKey: ["cart", userid],
    onMutate: async () => {
      // optimistic update
      await queryClient.cancelQueries(["cart", userid]);
      const previousCart = queryClient.getQueryData(["cart", userid]);
      queryClient.setQueryData(["cart", userid], (old) => {
        return old.map((cartItem) => {
          if (cartItem.id === id) {
          //  increase if mode is increase otherwise decrease
            if (mode === "increase") {
              cartItem.quantity++;
            } else {
              cartItem.quantity--;
            }
          }
          return cartItem;
        });
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["cart", userid]);
    },

    onError: async () => {
      await queryClient.invalidateQueries(["cart", userid]);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(["cart", userid]);
    },
    
  });

  return (
    <div className="w-full flex flex-col mx-auto  ">
      <p className="text-slate-600 font-light text-center">Quantity</p>
      <div className="flex items-center justify-center gap-4">
        <button className="bg-slate-200 hover:bg-slate-300 text-black p-2 rounded-md w-8 h-8 flex justify-center items-center align-middle text-center">
          -
        </button>
        <p className="text-xl font-semibold">{quantity}</p>
        <button className="bg-slate-200 hover:bg-slate-300 text-black p-2 rounded-md w-8 h-8 flex justify-center items-center align-middle text-center">
          +
        </button>
      </div>
    </div>
  );
};

export default CartItemsQuantityControls;
