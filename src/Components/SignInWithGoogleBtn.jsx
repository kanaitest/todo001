import React from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Libs/Firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
`
`;
const SignInWithGoogleBtn = () => {
  // google provider
  const provider = new GoogleAuthProvider();
  // navigatoion
  const navigate = useNavigate();

  // sign in with google

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        toast.success(`Signed in ${result.user.displayName} successfully!`);
        // redirect home
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(`Error: ${errorMessage}`);
      });
  };

  return (
    <button
      onClick={async () => await signInWithGoogle()}
      type="button"
      className="mx-auto w-[90%] md:w-[400px] p-4 rounded-xl shadow-sm bg-blue-800 hover:rounded-none hover:bg-blue-500 transition-all ease-in  mb-4 flex items-center justify-center "
    >
      <FcGoogle className="w-8 h-8 mr-3 bg-transparent" />{" "}
      <span className="font-bold text-gray-50">Sign in with Google</span>
    </button>
  );
};

export default SignInWithGoogleBtn;
