import AddFriend from "@/components/shared/users/AddFriend";
import React from "react";

const page = () => {
  return (
    <main className="w-full h-full p-6">
      <h1 className="font-bold text-3xl mb-8 w-full text-center">Add a friend</h1>
      <AddFriend />
    </main>
  );
};

export default page;
