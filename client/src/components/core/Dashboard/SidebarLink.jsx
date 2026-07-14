

import React from "react";
import { NavLink, useLocation, matchPath } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";

const SidebarLink = ({ link, icon: Icon }) => {
  const location = useLocation();

  const isActive = matchPath({ path: link.path, end: true }, location.pathname);

  return (
    <NavLink
      to={link.path}
      className={`relative flex items-center gap-x-2 px-8 py-2 text-sm font-medium transition-all duration-200 
        ${isActive ? "bg-sky-800 text-white" : "text-gray-300 hover:bg-gray-700"}
      `}
    >
      {/* Active left indicator */}
      <span
        className={`absolute left-0 top-0 h-full w-[0.25rem] rounded-r-md bg-sky-500 transition-opacity duration-200 
          ${isActive ? "opacity-100" : "opacity-0"}
        `}
      />

      {/* Icon + Name */}
      {Icon && <Icon className="text-lg" />}
      <span>{link.name}</span>
    </NavLink>
  );
};

export default SidebarLink;
