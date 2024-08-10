import React from "react";
import { FaCheckDouble, FaCheck } from "react-icons/fa";

const MessageItem = ({ data: { text, sender, receiver, time, statusSeen } }) => {
  const isSender = sender === "Me";

  return (
    <div className={`w-full flex ${isSender ? "justify-end" : "justify-start"} my-2`}>
      <div className={`max-w-[60%] shadow ${isSender ? "bg-green-600" : "bg-gray-700"} rounded-lg p-3 text-white`}>
        <div className="text-sm">{text}</div>
        <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
          <span>{time}</span>
          {isSender && (
            <span className="flex items-center ml-2">
              {statusSeen ? <FaCheckDouble className="text-blue-800"  size={10}/> : <FaCheck  size={10}/>}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
