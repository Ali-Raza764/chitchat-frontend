"use client";
import useStore from "@/utils/store/useChatStore";
import { useEffect } from "react";

const StoreInitializer = ({ initialData, currentUser }) => {
  const { initializeStore, setCurrentUser } = useStore();

  useEffect(() => {
    if (initialData && currentUser) {
      initializeStore(initialData);
      setCurrentUser(currentUser);
    }
  }, [initialData, currentUser]);

  return null;
};

export default StoreInitializer;
