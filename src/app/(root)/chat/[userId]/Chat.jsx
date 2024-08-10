"use client";
import ChatFeedHeader from "@/components/shared/Chats/ChatFeedHeader";
import MessageForm from "@/components/shared/Chats/MessageForm";
import MessageItem from "@/components/shared/Chats/MessageItem";
import { useState, useEffect, useRef } from "react";

const Chat = ({ messages }) => {
  const [data, setData] = useState(messages);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  return (
    <div className="w-full h-full relative">
      <ChatFeedHeader />
      <div className="flex w-full overflow-y-auto flex-col p-4 gap-6 h-[80%]">
        {data.map((message) => {
          return <MessageItem data={message} key={message.id} />;
        })}
        <div ref={messagesEndRef} />
      </div>
      <MessageForm data={data} setData={setData} />
    </div>
  );
};

export default Chat;
