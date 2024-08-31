"use server";
import { db } from "@/lib/db";
import isAuthorized from "@/utils/auth/isAuthorized";

export const denyFriendRequest = async (payload) => {
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

    //* Deny a Friend Request
    const receivedRequestsKey = `user:${currentUserId}:receivedRequests`;
    const removalResult = await db.srem(receivedRequestsKey, friendId);

    if (removalResult === 0) {
      return {
        status: 404,
        message: "Friend request not found",
      };
    }
    return {
      status: 200,
      message: "Request Denied Successfully",
    };
  } catch (error) {
    throw new Error("An error occured while accepting the request");
  }
};
