import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Libs/Firebase";
import SignInWithGoogleBtn from "../Components/SignInWithGoogleBtn";
import CartItemsList from "../Components/CartItemsList";

const Cart = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div className="w-full min-h-[75vh] p-4">Loading user data.....</div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-[75vh] p-4">
        Error Loading user data.....
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full min-h-[75vh] flex flex-col items-center justify-center align-middle p-4 text-center">
        <h3 className="text-xl font-semibold mb-6">
          Please Sign in to view Cart
        </h3>

        <SignInWithGoogleBtn />

        <hr className="h-1 bg-slate-100 w-full mx-auto" />

        <p className="text-lg font-bold">OR</p>

        <p className="text-lg font-semibold">
          Sign in with 👉
          <a className="text-xl font-bold hover:underline" href="/sign-in">
            Email here
          </a>{" "}
        </p>
      </div>
    );
  }

  if (user) {
    return (
      <div className="w-full min-h-[75vh] p-4">
        <h1 className="text-center text-lg font-semibold">
          {user.displayName}'s Cart
        </h1>

        <CartItemsList user={user} />
      </div>
    );
  }
};

export default Cart;
