"use client";
import { addFriend } from "@/actions/user/addFriend.action";
import { validateEmail } from "@/lib/validations/validateEmail";
import { useState } from "react";

const AddFriend = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      const response = await addFriend({ email });
      
      if (response.status === 200) {
        setSuccessMessage(response.message);
        setEmail("");  // Clear the email input on success
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-sm shadow-gray-100 w-full max-w-sm"
      >
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-400 mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white ${
              error ? "border border-red-500" : ""
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Add Friend
        </button>
      </form>
    </div>
  );
};

export default AddFriend;