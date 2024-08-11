"use client";
import ChatFeedHeader from "@/components/shared/Chats/ChatFeedHeader";
import MessageForm from "@/components/shared/Chats/MessageForm";
import MessageItem from "@/components/shared/Chats/MessageItem";
import { useState, useEffect, useRef } from "react";

const Chat = ({ messages, userId, friendId, chatId, friendData }) => {
  const [data, setData] = useState(messages);
  const messagesEndRef = useRef(null);
  const eventSourceRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  useEffect(() => {
    const eventSource = new EventSource("/api/stream?chatId=" + chatId);

    eventSource.onmessage = (event) => {
      console.log(event.data);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="w-full h-full relative">
      <ChatFeedHeader friendData={friendData} />
      <div className="flex w-full overflow-y-auto flex-col p-4 gap-6 h-[80%]">
        {data.map((message) => (
          <MessageItem data={message} key={message.id} userId={userId} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <MessageForm
        userId={userId}
        chatId={chatId}
        data={data}
        setData={setData}
      />
    </div>
  );
};

export default Chat;
