"use client";

import { confirmFriend } from "@/actions/user/addFriend.action";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

const ConfirmButton = ({ friendId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          setLoading(true);
          setError(false);
          const response = await confirmFriend({ id: friendId });
          console.log(response);

          if (response.status !== 200) {
            setError(true);
          }
        } catch (error) {
        } finally {
          setLoading(false);
        }
      }}
      disabled={loading}
      className="outline-black rounded-md bg-white text-black p-2"
    >
      {loading ? (
        <FaSpinner className="animate-spin" />
      ) : error ? (
        "Error"
      ) : (
        "Confirm"
      )}
    </button>
  );
};

export default ConfirmButton;
