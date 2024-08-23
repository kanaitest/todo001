import React from "react";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// schema
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const SignInPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // submit handler
  const SignUserInWithEmailandPassword = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="w-full m-auto h-[75vh] flex flex-col justify-center items-center align-middle font-bold text-3xl ">
      <form
        onSubmit={handleSubmit(SignUserInWithEmailandPassword)}
        className="w-full md:w-[500px] flex flex-col gap-6 mx-auto bg-gray-100 shadow-sm rounded-md p-4 pb-8 border-sky-700  border-t-sky-400 border-t-4 mt-4 transition-all ease-in"
      >
        <h1 className="text-lg text-center font-normal">Sign in via Email</h1>

        {/* sucess note */}
        <p className='text-lime-500'>{isSubmitSuccessful && "Success"}</p>
        <input
          className="w-full px-4 py-3 rounded-md outline-0 invalid:border-2 border-red-500 text-base font-normal active:shadow-md focus:shadow-md peer-focus:border-b-2 peer-focus:border-b-sky-400  "
          type="email"
          {...register("email")}
          placeholder="Your email address"
        />
        {errors.email && (
          <p className="text-red-500 text-sm transition-all ease-in">
            {errors.email.message}
          </p>
        )}
        <input
          className="w-full px-4 py-3 rounded-md outline-0 invalid:border-2 border-red-500 text-base font-normal active:shadow-md focus:shadow-md peer-focus:border-b-2 peer-focus:border-b-sky-400 "
          type="password"
          {...register("password")}
          placeholder="password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-4 transition-all ease-in">
            {errors.password.message}
          </p>
        )}
        <button className="w-[75%] flex items-center justify-center align-middle mx-auto bg-sky-600 p-3 text-lg transition-all ease-in  text-white font-semibold rounded-md border-2 hover:bg-sky-800 hover:rounded-none">
          {isSubmitting ? "Loading..." : "Sign in"}
        </button>
      </form>

      <hr className="w-full h-4 my-4" />

      <button className="mx-auto w-full md:w-[75%] p-4 rounded-xl shadow-sm bg-blue-800 hover:rounded-none hover:bg-blue-500 transition-all ease-in  mb-4 flex items-center justify-center ">
        <FcGoogle className="w-8 h-8 mr-3 bg-transparent" />{" "}
        <span className="font-bold text-gray-50">Sign in with Google</span>
      </button>
    </div>
  );
};

export default SignInPage;
