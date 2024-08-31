"use client";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { pusherClient, toPusherKey } from "@/lib/pusher/pusher";

const useStore = create(
  subscribeWithSelector((set, get) => ({
    data: {},
    currentUser: null,

    setCurrentUser: (user) =>
      set(() => ({
        currentUser: user,
      })),

    initializeStore: (initialData) =>
      set(() => ({
        data: initialData,
      })),

    addFriendRequest: (request) =>
      set((state) => ({
        data: {
          ...state.data,
          friendRequests: [...state.data.friendRequests, request],
        },
      })),

    addFriendToChat: (friend) =>
      set((state) => {
        // Check if the friend is already in the chats array
        const existingChatIndex = state.data.chats.findIndex(
          (chat) => chat.id === friend.id
        );

        if (existingChatIndex !== -1) {
          // If the friend is already in chats, update that chat
          const updatedChats = [...state.data.chats];
          updatedChats[existingChatIndex] = {
            ...updatedChats[existingChatIndex],
            ...friend,
            messages: updatedChats[existingChatIndex].messages || [],
            unseenCount: updatedChats[existingChatIndex].unseenCount || 0,
          };
          return {
            data: {
              ...state.data,
              chats: updatedChats,
            },
          };
        } else {
          // If it's a new friend, add to chats
          return {
            data: {
              ...state.data,
              chats: [
                ...state.data.chats,
                { ...friend, messages: [], unseenCount: 0 },
              ],
            },
          };
        }
      }),

    addMessageToList: (message) =>
      set((state) => ({
        //! Untested
        // data: {
        //   ...state.data,
        //   chats: [...state.data.chats, friend],
        // },
        // Todo append the message to the respective chat array using the message.senderId field
      })),

    setupPusherSubscription: () => {
      const currentUser = get().currentUser;
      if (!currentUser) return;

      //* For incoming friend requests
      const requestsChannelName = toPusherKey(
        `user:${currentUser.id}:receivedRequests`
      );
      const requestsChannel = pusherClient.subscribe(requestsChannelName);
      requestsChannel.bind("receivedRequests", (request) => {
        get().addFriendRequest(request);
      });

      //* For Friend Request accepted
      const chatsChannelName = toPusherKey(`user:${currentUser.id}:chats`);
      const chatsChannel = pusherClient.subscribe(chatsChannelName);
      chatsChannel.bind("chats", (friend) => {
        get().addFriendToChat(friend);
      });

      return () => {
        pusherClient.unsubscribe(requestsChannelName);
        pusherClient.unbind("receivedRequests");

        pusherClient.unsubscribe(chatsChannelName);
        pusherClient.unbind("chats");
      };
    },

    setUpMessagesSubscription: (chatId) => {
      const messagesChannelName = toPusherKey(`chat:${chatId}:messages`);
      const messagesChannel = pusherClient.subscribe(messagesChannelName);
      messagesChannel.bind("messages", (message) => {
        console.log("recieved in store", message);

        get.addMessageToList(message);
      });

      return () => {
        pusherClient.unsubscribe(messagesChannelName);
        pusherClient.unbind("messages");
      };
    },
  }))
);

export default useStore;
