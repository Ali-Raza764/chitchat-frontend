"use client";
import ChatFeedHeader from "@/components/shared/messages/ChatFeedHeader";
import MessageForm from "@/components/shared/messages/MessageForm";
import MessageItem from "@/components/shared/messages/MessageItem";
import { pusherClient, toPusherKey } from "@/lib/pusher/pusher";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import MessageToast from "@/components/toasts/MessageToast";
import useStore from "@/utils/store/useChatStore";
import { createConsistentChatId } from "@/utils/createChatId";

const Chat = ({ friendId }) => {
  const { data, currentUser } = useStore();

  const [messages, setMessages] = useState([]);
  const [friendData, setFriendData] = useState([]);
  const [chatId, setChatId] = useState(null);

  const messagesEndRef = useRef(null);
  const pathname = usePathname();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (data && friendId && currentUser) {
      const friendChat = data.chats.find((friend) => friend.id === friendId);
      if (friendChat) {
        setMessages(friendChat.messages.reverse() || []);
        setFriendData({
          name: friendChat.name,
          email: friendChat.email,
          image: friendChat.image,
          id: friendChat.id,
        });
      }
      setChatId(createConsistentChatId(currentUser.id, friendId));
    }
  }, [data, friendId]);

  // Todo Replace this UseEffect with Use Store Subscription
  useEffect(() => {
    if (chatId) {
      pusherClient.subscribe(toPusherKey(`chat:${chatId}:messages`));
      const messagesHandler = (message) => {
        setMessages((prevData) => [...prevData, message]);

        //! Toast will not work here we need to implement a state management library
        if (pathname !== `/chat/${friendId}` && userId !== message.senderId) {
          toast.custom(
            <MessageToast
              name={friendData.name}
              image={friendData.image}
              message={message.content}
            />
          );
        }
      };

      pusherClient.bind("messages", messagesHandler);

      return () => {
        console.log(
          "Unsubscribing from:",
          toPusherKey(`chat:${chatId}:messages`)
        );
        pusherClient.unsubscribe(toPusherKey(`chat:${chatId}:messages`));
        pusherClient.unbind("messages", messagesHandler);
      };
    }
  }, [chatId, pathname, currentUser, friendData, friendId]);

  return (
    <div className="w-full h-full relative">
      {friendData && <ChatFeedHeader friendData={friendData} />}
      <div className="flex w-full overflow-y-auto flex-col p-4 gap-6 h-[80%]">
        {messages?.map((message) => (
          <MessageItem data={message} key={message.id} userId={currentUser.id} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <MessageForm chatId={chatId} />
    </div>
  );
};

export default Chat;
