import { Suspense } from "react";
import NavBar from "./NavBar";
import { FaSpinner } from "react-icons/fa";
import SideBarChatComponent from "../Chats/SideBarChatComponent";

const Sidebar = ({ children }) => {
  return (
    <div className="bg-gray-800 text-white w-full h-screen flex">
      <div className="h-full border-r border-gray-700 min-w-[30vw]">
        <NavBar />
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
