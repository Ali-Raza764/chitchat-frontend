
import React from "react";
import Chat from "./Chat";

const ChattingPage = ({ params }) => {
  const messages = [
    {
      id: "3453",
      text: "Hi Ali How are you doing?",
      time: "10:18",
      statusSeen: false,
      sender: "Mama",
      reciever: "Me",
    },
  ];
  return <Chat messages={messages} />;
};

export default ChattingPage;
