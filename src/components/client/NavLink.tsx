import React from "react";
import { Link } from "react-router-dom";

// Định nghĩa kiểu cho các props của component NavLink
interface NavLinkProps {
  href: string;
  title: string;
}

// Component NavLink với kiểu TypeScript
const NavLink: React.FC<NavLinkProps> = ({ href, title }) => {
  return (
    <Link
      to={href}
      className="block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white"
    >
      {title}
    </Link>
  );
};

export default NavLink;
