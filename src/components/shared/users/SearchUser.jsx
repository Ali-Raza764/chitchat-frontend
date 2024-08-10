"use client";
import React, { useState } from "react";
import ChatListItem from "../Chats/ChatListItem";

const SearchUser = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    // Mock search function, replace with actual search logic
    const users = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
      { id: 3, name: "Alice Johnson" },
    ];
    const filteredResults = users.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filteredResults);
  };

  return (
    <div className="p-4 bg-gray-900 text-white w-full">
      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search users..."
          className="w-full px-4 py-2 text-black rounded-md"
        />
      </div>
      <ul className="space-y-2">
        {results.map((user) => (
          <ChatListItem name={user.name} />
        ))}
      </ul>
    </div>
  );
};

export default SearchUser;
