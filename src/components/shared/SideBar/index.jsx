import { Suspense } from "react";
import NavBar from "./NavBar";
import { FaSpinner } from "react-icons/fa";
import SideBarChatComponent from "../SideBarChatComponent";
import { auth } from "@/auth";
import { db } from "@/lib/db";

const Sidebar = async ({ children }) => {
  const session = await auth();
 
  const receivedRequestsKey = `user:${session.user.id}:receivedRequests`;

  const requestIds = await db.smembers(receivedRequestsKey);

  // Fetch user details for each request
  const requests = await Promise.all(
    requestIds.map(async (id) => {
      const userData = await db.get(`user:${id}`);
      return userData;
    })
  );
  return (
    <div className="bg-gray-800 text-white w-full h-screen flex">
      <div className="h-full border-r border-gray-700 min-w-[30vw]">
        <NavBar requests={requests} userId={session.user.id} />
        <Suspense
          fallback={
            <div className="p-2 w-full h-[85%] flex items-center justify-center">
              <FaSpinner size={35} className="animate-spin" />
            </div>
          }
        >
          <SideBarChatComponent />
        </Suspense>
      </div>

      <div className="flex h-full w-full">{children}</div>
    </div>
  );
};

export default Sidebar;
