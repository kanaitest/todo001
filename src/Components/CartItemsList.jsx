import React from 'react'
import { GetAllCartItems } from "../actions/CartActions";
import { useQuery } from "@tanstack/react-query";

const CartItemsList = ({user}) => {
        // useQuery
        const { data, isError, isLoading } = useQuery({
            queryKey: ["cart", user.uid],
            queryFn: async () => {
              const cartData = await GetAllCartItems(user.uid)
              return cartData;
          }
        })

        if (isLoading) {
          return <div>Loading...</div>;
        }
        if (isError) {
          return <div>Error...</div>;
        }

        if (data) {
          return <div>Data: {JSON.stringify(data)}</div>;
        }
}

export default CartItemsList