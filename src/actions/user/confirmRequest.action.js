"use server";
import { db } from "@/lib/db";
import { pusherServer, toPusherKey } from "@/lib/pusher/pusher";
import isAuthorized from "@/utils/auth/isAuthorized";

export const confirmFriend = async (payload) => {
  try {
    const { id: friendId } = payload;
    const { authorized, status, message, currentUserId } = await isAuthorized(
      friendId
    );

    if (!authorized) {
      return {
        status,
        message,
      };
    }

    // Remove friend request from received requests
    const receivedRequestsKey = `user:${currentUserId}:receivedRequests`;
    const removalResult = await db.srem(receivedRequestsKey, friendId);
    console.log("User was removed from the request list", removalResult);

    // Add friend to current user's friend list
    const userFriendsKey = `user:${currentUserId}:friends`;
    await db.sadd(userFriendsKey, friendId);

    // Add current user to friend's friend list
    const friendFriendsKey = `user:${friendId}:friends`;
    await db.sadd(friendFriendsKey, currentUserId);

    //* Fetch the user data and send it immediately to the client
    const friendData = await db.get(`user:${currentUserId}`);
    const userData = await db.get(`user:${friendId}`);

    //* Notify the the request sender  that the request has been confirmed
    await pusherServer.trigger(
      toPusherKey(`user:${friendId}:chats`),
      "chats",
      friendData
    );
    await pusherServer.trigger(
      toPusherKey(`user:${currentUserId}:chats`),
      "chats",
      userData
    );

    return {
      status: 200,
      message: "Friend request confirmed successfully",
    };
  } catch (error) {
    throw new Error("An error occured while accepting the request");
  }
};
