import { auth } from "@/auth";
import SignInForm from "@/components/auth/SignInFrom";
import React from "react";
import { redirect } from "next/navigation";
import Image from "next/image";

const LandingPage = async () => {
  const session = await auth();

  if (session != null) {
    redirect("/profile");
  }
  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center">
        {/* Left Side: Text */}
        <div className="md:w-1/2 flex flex-col justify-center items-start space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Unlimited Chatting{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-500">
              Unlimited Fun
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300">
            Welcome to Chit Chat, the ultimate platform to connect and chat with
            your friends and loved ones.
          </p>
        </div>

        {/* Right Side: Image and Sign-in Button */}
        <div className="md:w-1/2 flex flex-col items-center md:items-end justify-start">
          <Image
            height={500}
            width={500}
            src="/images/hero.webp"
            alt="Chat Image"
            className="max-w-[25rem] w-full mb-6 rounded-lg"
          />
          <SignInForm />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
