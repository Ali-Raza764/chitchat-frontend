"use client";
import { useEffect, useState } from "react";
import ChatListItem from "./ChatListItem";
import { pusherClient, toPusherKey } from "@/lib/pusher/pusher";
import { usePathname } from "next/navigation";

const Chats = ({ friends, sessionId }) => {
  const [chats, setChats] = useState(friends);
  //   const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:chats`));

    const friendsChatHandler = (chat) => {
      setChats([...chats, chat]);
    };

    pusherClient.bind("chats", friendsChatHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:chats`));
      pusherClient.unbind("chats", friendsChatHandler);
    };
  }, [pathname, sessionId]);

  if ((chats.length === 0) | !chats) {
    return <div className="p-2 h-[85%]">No Chats</div>;
  }
  return (
    <div className="p-2 h-[85%]">
      <div className="chats overflow-y-auto h-full">
        {chats.map((friend) => (
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
