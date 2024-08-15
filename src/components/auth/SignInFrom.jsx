"use client";
import { signInWithGoogle } from "@/actions/user/user.actions";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaSpinner } from "react-icons/fa";

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    try {
      setLoading(true);
      setError("");
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
        className="flex items-center gap-3 max-w-[25rem] w-full h-8 mt-2 rounded-md bg-gray-200 hover:bg-gray-500 text-black px-4 p-6 font-semibold"
        onClick={handleClick}
      >
        <FcGoogle size={25} className="mr-6" />
        Continue with Google
        {loading && <FaSpinner size={25} className="animate-spin ml-2" />}
      </button>

      {error && <div className="text-red-600 mt-2">{error}</div>}
    </>
  );
};

export default SignInForm;
