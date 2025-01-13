import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { BiCalendar } from "react-icons/bi";
import { FiEdit, FiTrash, FiUser } from "react-icons/fi";
import { config, getData } from "../Api/Services";
import { createInitial } from "../utils";

const TaskCard = ({
  title,
  description,
  duedate,
  priority,
  id,
  deleteHandler,
  editHandler,
  userId,
}) => {
  const [dropDown, setDropDown] = useState(false);
  const [assignedUser, setAssignedUser] = useState("Unassigned");
  const dropdownHandler = () => {
    setDropDown(!dropDown);
  };

  const getTaskAssignedUser = async () => {
    try {
      if (userId) {
        const users = await getData(`${config.apiBaseUrl}/users`);
        const user = users.find((user) => user.id === userId);
        setAssignedUser(user ? user.fullName : "Unassigned");
      }
    } catch (error) {}
  };

  useEffect(() => {
    getTaskAssignedUser();
  }, []);

  return (
    <div className="bg-white p-5 rounded-lg mb-4 border border-slate-200 shadow-sm relative">
      <div className="mb-2 w-full flex items-start justify-between gap-5">
        <h4 className="text-sm font-medium text-slate-800">{title}</h4>
        <div className="inline-flex gap-2">
          <button
            onClick={() => editHandler(id)}
            className="text-slate-400 hover:text-red-500"
          >
            <FiEdit />
          </button>
          <button
            onClick={() => deleteHandler(id)}
            className="text-slate-400 hover:text-red-500"
          >
            <FiTrash />
          </button>
        </div>
      </div>

      <p className="text-sm text-slate-500 mb-3">{description}</p>

      <div className="flex items-center justify-between gap-5">
        <h6 className="text-xs text-slate-500 font-medium flex items-center gap-1">
          <BiCalendar className="w-4 h-4" /> Due on: {duedate}
        </h6>
        {priority && (
          <span
            className={classNames(
              "text-xs px-2 py-1 rounded-md font-semibold",
              priority === "high" && "bg-red-100 text-red-500",
              priority === "medium" && "bg-orange-100 text-orange-500",
              priority === "low" && "bg-green-100 text-green-500"
            )}
          >
            {priority === "high"
              ? "High"
              : priority === "medium"
              ? "Medium"
              : "Low"}
          </span>
        )}
      </div>
      <h6 className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-1.5">
        {(() => {
          const { initial, consistentColor } = createInitial(assignedUser);
          return (
            <div className="flex items-center gap-2 ">
              <span
                className={classNames(
                  "w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-semibold p-1",
                  consistentColor
                )}
              >
                {initial}
              </span>
              {assignedUser}
            </div>
          );
        })()}
      </h6>
    </div>
  );
};

export default TaskCard;
