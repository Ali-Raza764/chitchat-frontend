"use client";
import { usePathname } from "next/navigation";
import { FaComments, FaUsers, FaCog } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import useStore from "@/utils/store/useChatStore";
import FriendRequestToast from "@/components/toasts/FriendRequestToast";
import toast from "react-hot-toast";

const NavBar = () => {
  const pathname = usePathname();
  const { data, currentUser, setupPusherSubscription } = useStore();
  const [incomingFriendRequests, setIncomingFriendRequests] = useState(
    data.friendRequests || []
  );

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
    if (currentUser) {
      const unsubscribe = setupPusherSubscription();

      // Subscribe to changes in the store's friendRequests
      const unsubscribeFromStore = useStore.subscribe(
        (state) => state.data.friendRequests,
        (friendRequests) => {
          setIncomingFriendRequests(friendRequests);

          // Show toast notification for new request
          if (
            friendRequests.length > incomingFriendRequests.length &&
            pathname !== "/users/requests"
          ) {
            const latestRequest = friendRequests[friendRequests.length - 1];
            toast.custom(<FriendRequestToast name={latestRequest.name} />);
          }
        }
      );

      return () => {
        unsubscribe();
        unsubscribeFromStore();
      };
    }
  }, [currentUser, setupPusherSubscription, pathname]);

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
            <span className="request-count-users absolute top-0 right-0 text-red-500">
              {link.name === "Users" && (
                <div
                  className={`rounded-full p-1 ${
                    incomingFriendRequests.length > 0
                      ? "flex bg-green-600 p-2"
                      : "hidden"
                  }`}
                />
              )}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default NavBar;
