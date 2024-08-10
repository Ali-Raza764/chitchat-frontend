"use client";
import { FaUserCircle, FaEdit, FaSave } from "react-icons/fa";
import { useState } from "react";

const ProfileDetails = ({ session }) => {
  const [name, setName] = useState(session.user.name);
  const [image, setImage] = useState(session.user.image);
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    // Handle save logic here
    setEditing(false);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center mb-4">
        <img
          src={image}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-2"
        />
      
      </div>
      <div className="email flex items-start w-full gap-3">
        <label
          htmlFor="
        email"
        >
          Email:
        </label>
        <p>{session.user.email}</p>
      </div>
      <div className="flex flex-col items-start w-full">
        <label className="text-gray-400 mb-2">Name</label>
        {editing ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none mb-4"
          />
        ) : (
          <p className="text-lg mb-4">{name}</p>
        )}
        {editing ? (
          <div className="flex justify-end w-full">
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded"
            >
              <FaSave className="inline mr-2" /> Save
            </button>
          </div>
        ):(
            <button
            onClick={() => setEditing(!editing)}
            className="text-gray-400 hover:text-gray-200"
          >
            <FaEdit size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileDetails;
