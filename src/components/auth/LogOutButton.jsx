"use client";

import { LogOutUser } from "@/actions/user/user.actions";
import { useRouter } from "next/navigation";

const LogOutButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await LogOutUser();
        router.push("/")
      }}
      className="bg-red-600 text-white p-4 rounded-md"
    >
      Sign Out
    </button>
  );
};

export default LogOutButton;
