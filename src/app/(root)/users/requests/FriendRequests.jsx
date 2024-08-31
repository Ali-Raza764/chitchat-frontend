"use client";
import { denyFriendRequest } from "@/actions/user/denyRequest.action";
import { confirmFriend } from "@/actions/user/confirmRequest.action";
import { pusherClient, toPusherKey } from "@/lib/pusher/pusher";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { BiCheck } from "react-icons/bi";
import { MdClose } from "react-icons/md";


const FriendRequests = ({ requests, userId }) => {
  const [incomingFriendRequests, setIncomingFriendRequests] = useState(requests);

  const router = useRouter();

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`user:${userId}:receivedRequests`));

    const friendRequestHandler = (user) => {
      setIncomingFriendRequests((prev) => {
        // Check if the user is already in the list by comparing ids
        if (!prev.some((request) => request.id === user.id)) {
          return [...prev, user];
        }

        return prev; // If already exists, return previous state without modification
      });
      // Todo if the  pathname is  not users/requests  we will do a toast notification
    };

    pusherClient.bind("receivedRequests", friendRequestHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`user:${userId}:receivedRequests`));
      pusherClient.unbind("receivedRequests", friendRequestHandler);
    };
  }, [userId]);

  const acceptFriend = async (friendId) => {
    try {
      await confirmFriend({ id: friendId });
      setIncomingFriendRequests((prev) =>
        prev.filter((request) => request.id !== friendId)
      );
      router.refresh();
    } catch (error) {}
  };

  const denyFriend = async (friendId) => {
    try {
      await denyFriendRequest({ id: friendId });
      setIncomingFriendRequests((prev) =>
        prev.filter((request) => request.id !== friendId)
      );
      router.refresh();
    } catch (error) {}
  };

  if (incomingFriendRequests.length === 0) {
    return <p className="text-md text-white">Nothing to show Here</p>;
  }
  return (
    <div>
      {incomingFriendRequests.map((request) => (
        <div className="flex gap-4 items-center p-1 border" key={request.id}>
          <Image
            src={request.image}
            height={50}
            width={50}
            className="rounded-full"
            alt="User-image"
          />
          <p>{request.email}</p>
          {/* <ConfirmButton friendId={request.id} /> */}
          <button
            aria-label="Accept friend"
            onClick={() => {
              acceptFriend(request.id);
            }}
          >
            <BiCheck
              size={25}
              className="bg-green-500 rounded-full text-black hover:scale-110 transition h-8 w-8"
            />
          </button>
          <button
            aria-label="Deny Request"
            onClick={() => denyFriend(request.id)}
          >
            <MdClose
              size={25}
              className="bg-indigo-600 rounded-full hover:scale-110 transition h-8 w-8"
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default FriendRequests;
