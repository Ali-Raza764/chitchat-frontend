import React from "react";

const FriendRequestToast = ({ name }) => {
  return <div className="w-[20rem] flex items-center gap-3 border-2 border-white rounded-md shadow p-3 bg-white text-black">🤖 | {name} sent you a friend request</div>;
};

export default FriendRequestToast;
