import React from "react";
import NavLink from "./NavLink";

// Định nghĩa kiểu cho đối tượng link
interface Link {
  path: string;
  title: string;
}

// Định nghĩa kiểu cho props của component MenuOverlay
interface MenuOverlayProps {
  links: Link[];
}

// Component MenuOverlay với kiểu TypeScript
const MenuOverlay: React.FC<MenuOverlayProps> = ({ links }) => {
  return (
    <ul className="flex flex-col py-4 items-center">
      {links.map((link, index) => (
        <li key={index}>
          <NavLink href={link.path} title={link.title} />
        </li>
      ))}
    </ul>
  );
};

export default MenuOverlay;
