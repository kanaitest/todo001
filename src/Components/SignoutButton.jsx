import React from "react";
import { auth } from "../Libs/Firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignoutButton = () => {
    // navigation / routing
    const navigate = useNavigate();
  return (
    <button
      onClick={async () => {
        await signOut(auth)
          .then(() => {
            toast.info("Signed out");
          })
          .then(() => {
            navigate('/')
          })
          .catch((error) => toast.error(`Error: ${error.message}`));
      }}
      className="w-full mx-auto md:w-[300px] p-4 rounded-xl bg-red-600 text-white text-lg font-semibold hover:bg-red-200 "
    >
      Sign Out
    </button>
  );
};

export default SignoutButton;
