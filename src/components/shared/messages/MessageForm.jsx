"use client";
import { FaChevronCircleRight, FaSpinner } from "react-icons/fa";
import sendMessage from "@/actions/messages/sendMessage.action";
import { useState } from "react";

const MessageForm = ({ chatId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const text = e.target.message.value;
      const payload = {
        chatId,
        text,
      };
      await sendMessage(payload);
      e.target.reset();
    } catch (error) {
      setError("Error sending message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute bottom-0 border-t border-gray-700 w-full px-4 p-2 h-[10%]">
      <form
        action=""
        onSubmit={handleSubmit}
        className="w-full flex items-center gap-3"
      >
        <input
          type="text"
          name="message"
          id="message"
          placeholder="Type your message"
          className={`w-full p-2 rounded-md outline-none border border-transparent focus:border-green-500 ${
            error && "border border-red-600"
          }`}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <FaChevronCircleRight
              className="text-green-500 bg-white rounded-full"
              size={35}
            />
          )}
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
