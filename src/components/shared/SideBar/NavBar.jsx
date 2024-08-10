"use client";
import { usePathname } from "next/navigation";
import { FaComments, FaUsers, FaCog, FaBell, FaUser } from "react-icons/fa";
import Link from "next/link";

const NavBar = () => {
  const pathname = usePathname();
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

  return (
    <nav className="w-full flex items-center justify-between gap-6 px-4 border-b border-gray-700 h-[8%]">
      {links.map((link) => {
        return (
          <Link
            href={link.href}
            className={`p-2 border-b-2 border-transparent ${
              link.active && "border-green-600"
            }`}
            key={link.name}
          >
            {link.icon}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavBar;
