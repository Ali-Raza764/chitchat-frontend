import React from 'react';
import { FaComments } from 'react-icons/fa';

const Feed = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-center text-white">
      <FaComments className="text-6xl mb-4" />
      <h1 className="text-3xl font-bold mb-2">Start Chatting Now</h1>
      <p className="text-lg">Connect with friends and start conversations instantly.</p>
    </div>
  );
};

export default Feed;
