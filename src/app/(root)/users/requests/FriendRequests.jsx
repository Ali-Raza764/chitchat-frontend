"use client";
import {
  confirmFriend,
  denyFriendRequest,
} from "@/actions/user/addFriend.action";
import { pusherClient, toPusherKey } from "@/lib/pusher/pusher";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { MdClose } from "react-icons/md";

const FriendRequests = ({ requests, sessionId }) => {
  const [incomingFriendRequests, setIncomingFriendRequests] =
    useState(requests);

  const router = useRouter();

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
  }, [sessionId]);

  if (incomingFriendRequests.length === 0) {
    return <p className="text-md text-white">Nothing to show Here</p>;
  }

  const acceptFriend = async (friendId) => {
    await confirmFriend({ id: friendId });
    setIncomingFriendRequests((prev) =>
      prev.filter((request) => request.id !== friendId)
    );
    router.refresh();
  };

  const denyFriend = async (friendId) => {
    await denyFriendRequest({ id: friendId });
    setIncomingFriendRequests((prev) =>
      prev.filter((request) => request.id !== friendId)
    );
    router.refresh();
  };

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
            onClick={() => acceptFriend(request.id)}
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
