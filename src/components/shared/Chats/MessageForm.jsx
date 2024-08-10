"use client";
import { FaChevronCircleRight } from "react-icons/fa";

const MessageForm = ({ data, setData }) => {
  return (
    <div className="absolute bottom-0 border-t border-gray-700 w-full px-4 p-2 h-[10%]">
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          setData([
            ...data,
            {
              id: new Date().getTime().toString(),
              text: e.target.message.value,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              statusSeen: true,
              sender: "Me",
              receiver: "Mama",
            },
          ]);
          e.target.reset();
        }}
        className="w-full flex items-center gap-3"
      >
        <input
          type="text"
          name="message"
          id="message"
          placeholder="Type your message"
          className="w-full p-2 rounded-md outline-none border border-transparent focus:border-green-500"
        />
        <button type="submit">
          <FaChevronCircleRight
            className="text-green-500 bg-white rounded-full"
            size={35}
          />
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
