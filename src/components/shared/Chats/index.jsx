import React from "react";
import ChatListItem from "./ChatListItem";
import { db } from "@/lib/db";
import { auth } from "@/auth";

const Chats = async () => {
  const session = await auth();

  let friends = [];

  try {
    // Assuming friends are stored in a set, use SMEMBERS instead of GET
    const friendIds = await db.smembers(`user:${session.user.id}:friends`);

    // Fetch friend details in parallel
    friends = await Promise.all(
      friendIds.map(async (id) => {
        const userData = await db.get(`user:${id}`);
        return userData;
      })
    );
  } catch (error) {
    console.error("An error occurred while fetching the chats", error);
  }

  return (
    <div className="p-2 h-[85%]">
      <div className="chats overflow-y-auto h-full">
        {friends.map((friend) => (
          <ChatListItem
            key={friend.id}
            name={friend.name}
            message={friend.message || "No messages yet"}
            time={friend.time || "N/A"}
            unreadCount={friend.unreadCount || 0}
            avatar={friend.image}
            userId={friend.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Chats;
