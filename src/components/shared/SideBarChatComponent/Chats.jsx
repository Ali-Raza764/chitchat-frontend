"use client";
import { useEffect, useState } from "react";
import ChatListItem from "./ChatListItem";
import { usePathname } from "next/navigation";
import useStore from "@/utils/store/useChatStore";

const Chats = () => {
  const { data, currentUser, setupPusherSubscription } = useStore();
  const [chats, setChats] = useState(data.chats || []);
  const pathname = usePathname();

  useEffect(() => {
    if (data) {
      setChats(data.chats);
    }
  }, [data]);

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = setupPusherSubscription();

      // Subscribe to changes in the store's chats
      const unsubscribeFromStore = useStore.subscribe(
        (state) => state.data.chats,
        (chats) => {
          console.log("New Chats", chats);
          // Deduplicate chats based on id before setting state
          const uniqueChats = Array.from(new Map(chats.map(chat => [chat.id, chat])).values());
          setChats(uniqueChats);
        }
      );

      return () => {
        unsubscribe();
        unsubscribeFromStore();
      };
    }
  }, [currentUser, setupPusherSubscription, pathname]);

  if (chats?.length === 0) {
    return <div>No Chats</div>;
  }

  console.log(chats);

  return (
    <div className="p-2 h-[85%]">
      <div className="chats overflow-y-auto h-full">
        {chats?.map((friend) => (
          <ChatListItem
            key={friend?.id}
            name={friend?.name}
            message={
              friend?.messages[0]?.content ||
              "No messages"
            }
            time={friend?.messages[0]?.timestamp || ""}
            unreadCount={friend?.unseenCount}
            avatar={friend?.image}
            userId={friend?.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Chats;
