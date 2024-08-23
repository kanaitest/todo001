import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Libs/Firebase";
import { ClipLoader } from "react-spinners";
import SignoutButton from "../Components/SignoutButton";
import SignInWithGoogleBtn from "../Components/SignInWithGoogleBtn";

// css for spinner
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "cyan",
};
const Profile = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className="w-full min-h-[75vh] p-4 mx-auto flex flex-col items-center align-middle justify-center gap-4">
      <h1 className="text-3xl font-bold bg-gradient-to-t from-purple-700 to-cyan-800 bg-clip-text text-transparent">
        Profile
      </h1>
      {/* loading state */}
      {loading && (
        <div className="text-center">
          <p>Loading...</p>
          <ClipLoader
            color={"#00FFFF"}
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}

      {/* error state */}
      {error && <p>Error: {error.message}</p>}

      {/* no error, no loading, no user */}

      {!user && !error && !loading && (
        <div className="w-full min-h-[75vh] flex flex-col items-center justify-center align-middle p-4 text-center">
          <h3 className="text-xl font-semibold mb-6">
            Please Sign in to view your profile
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
      )}
      {user && (
        <div className="w-full md:w-[75%] lg:w-[50%] mx-auto flex flex-col items-center align-middle justify-center gap-2  p-4">
          <div className="w-full p-1  object-cover object-center">
            <img
              src={user.photoURL}
              alt={`${user.displayName} photo loading`}
              className="h-[100px] w-[100px] m-auto rounded-full"
            />
          </div>
          <h1 className="text-xl bg-gradient-to-bl from-purple-400 to-cyan-500 bg-clip-text text-transparent">
            Hello {user.displayName}
          </h1>
          <p className="text-base bg-gradient-to-bl from-purple-400 to-cyan-500 bg-clip-text text-transparent">
            Email: <span className="underline">{user.email}</span>
          </p>

          <SignoutButton />
        </div>
      )}
    </div>
  );
};

export default Profile;
