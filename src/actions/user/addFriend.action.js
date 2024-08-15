"use server";
// import { auth } from "@/auth";
import { db } from "@/lib/db";
import { pusherServer, toPusherKey } from "@/lib/pusher/pusher";
import { validateEmail } from "@/lib/validations/validateEmail";
import isAuthorized from "@/utils/auth/isAuthorized";

export const addFriend = async (payload) => {
  try {
    const { email } = payload;
    const { authorized, status, message, currentUserId } = await isAuthorized(
      email
    );

    if (!authorized) {
      return {
        status,
        message,
      };
    }

    if (!validateEmail(email)) {
      return {
        status: 400,
        message: "Invalid email format",
      };
    }

    const friendId = await db.get(`user:email:${email}`);

    if (!friendId) {
      return {
        status: 404,
        message: "User not found",
      };
    }

    if (friendId === currentUserId) {
      return {
        status: 400,
        message: "Cannot send request to yourself",
      };
    }

    //* Check If the user is already the friend then donot send the request
    const isFriendResponse = await db.get(`user:${friendId}:friends`);
    if (isFriendResponse) {
      return {
        status: 401,
        message: "The User is Already Friend",
      };
    }

    //* Send friend request
    const receivedRequestsKey = `user:${friendId}:receivedRequests`;
    await db.sadd(receivedRequestsKey, currentUserId);

    //* Get the user data and send it immediately to the client
    const userData = await db.get(`user:${currentUserId}`);
    await pusherServer.trigger(
      toPusherKey(`user:${friendId}:receivedRequests`),
      "receivedRequests",
      userData
    );

    return {
      status: 200,
      message: "Friend request sent successfully",
    };
  } catch (error) {
    console.error("Error in addFriend:", error);
    return {
      status: 500,
      message: "An error occurred",
    };
  }
};

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
    console.error("Error in confirmFriend:", error);
    return {
      status: 500,
      message: "An error occurred: " + error.message,
    };
  }
};

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
    console.error("Error in confirmFriend:", error);
    return {
      status: 500,
      message: "An error occurred: " + error.message,
    };
  }
};

export const removeFriend = async () => {
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

    //todo remove the friend Test this endpoint
    const removeUser = await db.srem(`user:${currentUserId}:friends`, friendId);
    const removeFriend = await db.srem(
      `user:${friendId}:friends`,
      currentUserId
    );

    if (removeFriend && removeUser) {
      return {
        status: 200,
        message: "Successfully Removed Friend",
      };
    }
    return {
      status: 500,
      message: "Friend Not Found",
    };
  } catch (error) {
    return {
      status: 404,
      message: "An error occurred: " + error.message,
    };
  }
};
