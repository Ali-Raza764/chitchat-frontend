import React from "react";
import ChatListItem from "./ChatListItem";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Chats = async () => {
  const session = await auth();
  // if (!session) {
  //   redirect("/");
  // }
  // try {
  //   const responseChats = await db.get(`user:${session.user.id}:friends`);
  //   console.log(responseChats);
  // } catch (error) {}

  const chats = [
    {
      name: "Mama (You)",
      message: "Hi",
      time: "7/7/2024",
      unreadCount: 0,
      avatar: "path/to/avatar1.jpg",
    },
    {
      name: "Ahmed",
      message: "Amangt yeah",
      time: "10:18 AM",
      unreadCount: 1,
      avatar: "path/to/avatar2.jpg",
    },
    {
      name: "Noor",
      message: "Hey whats up",
      time: "10:18 AM",
      unreadCount: 1,
      avatar: "path/to/avatar2.jpg",
    },
    {
      name: "AllahDita",
      message: "Aman Masala: https://www.facebook...",
      time: "10:18 AM",
      unreadCount: 1,
      avatar: "path/to/avatar2.jpg",
    },
    {
      name: "AllahDita",
      message: "Aman Masala: https://www.facebook...",
      time: "10:18 AM",
      unreadCount: 1,
      avatar: "path/to/avatar2.jpg",
    },
    {
      name: "AllahDita",
      message: "Aman Masala: https://www.facebook...",
      time: "10:18 AM",
      unreadCount: 1,
      avatar: "path/to/avatar2.jpg",
    },
    {
      name: "AllahDita",
      message: "Aman Masala: https://www.facebook...",
      time: "10:18 AM",
      unreadCount: 1,
      avatar: "path/to/avatar2.jpg",
    },
    {
      name: "AllahDita",
      message: "Aman Masala: https://www.facebook...",
      time: "10:18 AM",
      unreadCount: 1,
      avatar: "path/to/avatar2.jpg",
    },
  ];
  return (
    <div className="p-2 h-[85%]">
      <input
        type="text"
        placeholder="Search or start a new chat"
        className="bg-gray-700 text-gray-300 rounded-lg py-2 px-4 focus:outline-none w-max-25rem w-full mb-1"
      />
      <div className="chats overflow-y-auto h-full">
        {chats.map((chat, index) => (
          <ChatListItem
            key={index}
            name={chat.name}
            message={chat.message}
            time={chat.time}
            unreadCount={chat.unreadCount}
            avatar={chat.avatar}
          />
        ))}
      </div>
    </div>
  );
};

export default Chats;
