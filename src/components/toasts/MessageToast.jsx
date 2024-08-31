import Image from "next/image";
import React from "react";

const MessageToast = ({ name, image, message }) => {
  return (
    <div className="w-[20rem] flex justify-between items-center">
      <div className="sender-div flex items-center justify-start w-full gap-3">
        <Image height={50} width={50} className="rounded-full" src={image} />
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm line-clamp-1 text-ellipsis text-gray-400">
          {message}
        </p>
      </div>
      <button className="w-2rem h-full">Close</button>
    </div>
  );
};

export default MessageToast;
