import Image from "next/image";
import Link from "next/link";
import React from "react";

const ChatListItem = ({ name, message, time, unreadCount, avatar, userId }) => {
  return (
    <Link href={`/chat/${userId}`}>
      <div className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
        <Image
          height={40}
          width={40}
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full mr-4 flex-shrink-0"
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex justify-between items-center">
            <h4 className="text-white font-bold truncate">{name}</h4>
            <span className="text-gray-400 text-sm flex-shrink-0">{time}</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <p className="text-gray-400 text-sm truncate">{message}</p>
            {unreadCount > 0 && (
              <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full ml-2 flex-shrink-0">
                {unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ChatListItem;
