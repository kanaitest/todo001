import React from "react";
import { MdShoppingCartCheckout } from "react-icons/md";
import { CheckOutAllItems } from "../actions/CartActions";

const CheckoutButton = ({ userid }) => {
  // purhase all items in cart
  const purchaseCartItems = async () => {
    return await CheckOutAllItems({ userid });
  };

  return (
    <button
      onClick={purchaseCartItems}
      className="bg-sky-700 rounded-md px-4 py-3 group-hover:bg-sky-500 text-white text-lg hover:bg-sky-300 cursor-pointer flex items-center justify-center align-middle min-w-[150px]"
    >
      Checkout <MdShoppingCartCheckout className="w-6 h-6 ml-2" />{" "}
    </button>
  );
};

export default CheckoutButton;
