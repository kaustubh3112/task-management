import classNames from "classnames";
import React, { useState } from "react";
import {
  FiCheckSquare,
  FiHome,
  FiList,
  FiRefreshCw,
  FiUsers,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("Overview");
  const activeLinkHandler = (menu) => {
    setActiveLink(menu);
  };
  return (
    <div>
      <ul className="w-full">
        <li className="mb-1.5">
          <Link
            className={classNames(
              "px-4 py-2.5 flex items-center gap-2  hover:text-white hover:bg-blue-700  rounded-md text-sm",
              activeLink === "Overview"
                ? "bg-blue-700 text-white"
                : "bg-slate-100"
            )}
            to="/overview"
            onClick={() => activeLinkHandler("Overview")}
          >
            <FiHome className="w-5 h-5" />
            Overview
          </Link>
        </li>
        <li className="mb-1.5">
          <Link
            className={classNames(
              "px-4 py-2.5 flex items-center gap-2  hover:text-white hover:bg-blue-700  rounded-md text-sm",
              activeLink === "tasks" ? "bg-blue-700 text-white" : "bg-slate-100"
            )}
            onClick={() => activeLinkHandler("tasks")}
            to="/tasks"
          >
            <FiCheckSquare className="w-5 h-5" />
            Tasks
          </Link>
        </li>
        <li className="mb-1.5">
          <Link
            className={classNames(
              "px-4 py-2.5 flex items-center gap-2  hover:text-white hover:bg-blue-700  rounded-md text-sm",
              activeLink === "backlogTask"
                ? "bg-blue-700 text-white"
                : "bg-slate-100"
            )}
            onClick={() => activeLinkHandler("backlogTask")}
            to="/backlog-tasks"
          >
            <FiRefreshCw className="w-5 h-5" />
            Backlog Tasks
          </Link>
        </li>
        <li className="mb-1.5">
          <Link
            className={classNames(
              "px-4 py-2.5 flex items-center gap-2  hover:text-white hover:bg-blue-700  rounded-md text-sm",
              activeLink === "TeamMembers"
                ? "bg-blue-700 text-white"
                : "bg-slate-100"
            )}
            onClick={() => activeLinkHandler("TeamMembers")}
            to="/team-members"
          >
            <FiUsers className="w-5 h-5" />
            Team Members
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
