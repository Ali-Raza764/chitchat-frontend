"use client";
import ChatFeedHeader from "@/components/shared/Chats/ChatFeedHeader";
import MessageForm from "@/components/shared/Chats/MessageForm";
import MessageItem from "@/components/shared/Chats/MessageItem";
import { pusherClient, toPusherKey } from "@/lib/pusher/pusher";
import { useState, useEffect, useRef } from "react";

const Chat = ({ messages, userId, friendId, chatId, friendData }) => {
  const [data, setData] = useState(messages);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`chat:${chatId}:messages`));

    const messagesHandler = (message) => {
      setData([...data, message]);
    };

    pusherClient.bind("messages", messagesHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`chat:${chatId}:messages`));
      pusherClient.unbind("messages", messagesHandler);
    };
  }, [chatId, data]);

  return (
    <div className="w-full h-full relative">
      <ChatFeedHeader friendData={friendData} />
      <div className="flex w-full overflow-y-auto flex-col p-4 gap-6 h-[80%]">
        {data.map((message) => (
          <MessageItem data={message} key={message.id} userId={userId} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <MessageForm chatId={chatId} />
    </div>
  );
};

export default Chat;
