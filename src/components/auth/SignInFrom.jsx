"use client";
import { signInWithGoogle } from "@/actions/user/user.actions";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaSpinner } from "react-icons/fa";
import { BiExclude } from "react-icons/bi";
import { MdError } from "react-icons/md";

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        key={"google"}
        className="flex items-center gap-3 min-w-[20rem] max-w-[25rem] w-full h-8 my-2 rounded-md bg-gray-200 hover:bg-gray-500 text-black px-4 p-6 font-semibold"
        onClick={handleClick}
      >
        <FcGoogle size={25} className="mr-6" />
        Continue with Google
        {loading && !error ? (
          <FaSpinner size={25} className="animate-spin ml-auto text-green-600" />
        ) : error && !loading ? (
          <MdError size={30} className="ml-auto text-red-600" />
        ) : (
          ""
        )}
      </button>
    </>
  );
};

export default SignInForm;
