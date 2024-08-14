"use client";
import { usePathname } from "next/navigation";
import { FaComments, FaUsers, FaCog } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import { pusherClient, toPusherKey } from "@/lib/pusher/pusher";

const NavBar = ({ requestIds, sessionId }) => {
  const pathname = usePathname();
  const [incomingFriendRequests, setIncomingFriendRequests] =
    useState(requestIds); //* Only ids for each request we just need the count

  const links = [
    {
      name: "Chats",
      href: "/chat",
      icon: <FaComments size={25} />,
      active: pathname === "/chat",
    },
    {
      name: "Users",
      href: "/users",
      icon: <FaUsers size={25} />,
      active: pathname === "/users",
    },
    {
      name: "Settings",
      href: "/profile",
      icon: <FaCog size={25} />,
      active: pathname === "/profile",
    },
  ];

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:receivedRequests`));
    console.log("listening to ", `user:${sessionId}:receivedRequests`);

    const friendRequestHandler = (user) => {
      console.log("function got called for request", user);
      setIncomingFriendRequests((prev) => [...prev, user]);
    };

    pusherClient.bind("receivedRequests", friendRequestHandler);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${sessionId}:receivedRequests`)
      );
      pusherClient.unbind("receivedRequests", friendRequestHandler);
    };
  }, [pathname, sessionId]);

  return (
    <nav className="w-full flex items-center justify-between gap-6 px-4 border-b border-gray-700 h-[8%]">
      {links.map((link) => {
        return (
          <Link
            href={link.href}
            className={`p-2 border-b-2 border-transparent ${
              link.active && "border-green-600 "
            } relative`}
            key={link.name}
          >
            {link.icon}
            <span className="request-count-users absolute top-0 right-0">
              {link.name === "Users" && (
                <div
                  className={`rounded-full bg-green-500 p-1 hidden ${
                    incomingFriendRequests?.length > 0 && "block"
                  }`}
                >
                  {incomingFriendRequests?.length}
                </div>
              )}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default NavBar;
