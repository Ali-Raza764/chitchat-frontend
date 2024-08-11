import React from "react";
import { FaCheck } from "react-icons/fa";

const MessageItem = ({ data: { content, senderId, timestamp }, userId }) => {
  const isSender = senderId === userId;

  return (
    <div
      className={`w-full flex ${
        isSender ? "justify-end" : "justify-start"
      } my-2`}
    >
      <div
        className={`max-w-[60%] shadow ${
          isSender ? "bg-green-600" : "bg-gray-700"
        } rounded-lg p-3 text-white`}
      >
        <div className="text-sm">{content}</div>
        <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
          <span>{timestamp}</span>
          {isSender && (
            <span className="flex items-center ml-2">
              <FaCheck size={10} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
