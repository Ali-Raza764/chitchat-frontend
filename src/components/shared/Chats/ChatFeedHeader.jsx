import React from "react";
import { MdCall, MdVideoCall } from "react-icons/md";

const ChatFeedHeader = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 h-[10%] sticky top-0 w-full border-b border-gray-700">
      <div className="flex gap-4 items-center">
        <img
          src="https://dummyimage.com/50x50"
          alt="avatar"
          className="rounded-full h-10 w-10"
        />
        <h3>Mamma</h3>
      </div>
      <div className="flex items-center gap-3">
        <div className="bg-gray-400 rounded-md hover:bg-gray-500 p-2 cursor-pointer">
          <MdCall size={25} />
        </div>
        <div className="bg-gray-400 rounded-sm hover:bg-gray-500 p-2 cursor-pointer">
          <MdVideoCall size={25} />
        </div>
      </div>
    </div>
  );
};

export default ChatFeedHeader;
