import React, { useEffect, useState } from "react";
import { config, deleteData, getData, updateData } from "../Api/Services";
import classNames from "classnames";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FiCheckSquare, FiMenu, FiMoreVertical, FiTrash } from "react-icons/fi";
import { truncateText } from "../utils";

const Backlog = () => {
  const [backLogTask, setBackLogTask] = useState([]);

  const fetchData = async () => {
    try {
      const result = await getData(`${config.apiBaseUrl}/tasks`);
      setBackLogTask(result.filter((task) => task.status === "Backlog"));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const isDeleted = await deleteData(`${config.apiBaseUrl}/tasks`, id);
      if (isDeleted) {
        console.log("Task deleted successfully!");
        fetchData();
      } else {
        console.log("Failed to delete task.");
      }
    } catch (error) {
      console.error("An error occurred while deleting the task:", error);
    }
  };

  const statusChangeHandler = async (id, newStatus) => {
    try {
      const taskToUpdate = backLogTask.find((task) => task.id === id);
      const updatedTask = { ...taskToUpdate, status: newStatus };
      const result = await updateData(
        `${config.apiBaseUrl}/tasks`,
        id,
        updatedTask
      );

      if (result) {
        console.log("Task updated successfully");
        fetchData();
      } else {
        console.error("Failed to update task.");
      }
    } catch (error) {
      console.error("An error occurred while updating the task:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(backLogTask);

  return (
    <>
      <div className="w-full h-full">
        <div className="flex items-center justify-between mb-4">
          <h1 className=" font-semibold text-slate-700 text-lg">
            Backlog Tasks
          </h1>
        </div>
        <div className=" w-full h-[calc(100%-55px)]">
          <div className="bg-white p-5 border-t-[3px] border-t-red-500 h-full">
            <>
              <div className="w-full">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left text-sm p-2.5">Sr No</th>
                      <th className="text-left text-sm p-2.5">Title</th>
                      <th className="text-left text-sm p-2.5">Description</th>
                      <th className="text-left text-sm p-2.5">Due Date</th>
                      <th className="text-left text-sm p-2.5">Priority</th>
                      <th className="text-left text-sm p-2.5">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {backLogTask.length > 0 ? (
                      backLogTask.map((task, index) => (
                        <tr className="odd:bg-slate-100">
                          <td className="text-left text-sm p-2.5">
                            {index + 1}
                          </td>
                          <td
                            className="text-left text-sm p-2.5"
                            title={task.title}
                          >
                            {truncateText(task.title, 40)}
                          </td>
                          <td
                            className="text-left text-sm p-2.5"
                            title={task.description}
                          >
                            {truncateText(task.description, 100)}
                          </td>
                          <td className="text-left text-sm p-2.5">
                            {task.dueDate}
                          </td>
                          <td className="text-left text-sm p-2.5">
                            <span
                              className={classNames(
                                "text-xs px-2 py-1.5 capitalize rounded-md",
                                task.priority === "high" &&
                                  "bg-red-100 text-red-500",
                                task.priority === "medium" &&
                                  "bg-orange-100 text-orange-500",
                                task.priority === "low" &&
                                  "bg-green-100 text-green-500"
                              )}
                            >
                              {task.priority}
                            </span>
                          </td>
                          <td className="text-left text-sm p-2.5">
                            <Menu
                              as="div"
                              className="relative inline-block text-left"
                            >
                              <div>
                                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 px-3 py-2">
                                  <FiMoreVertical />
                                </MenuButton>
                              </div>

                              <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                              >
                                <div className="px-3 py-2">
                                  <MenuItem className="w-full text-left">
                                    <button
                                      onClick={() =>
                                        statusChangeHandler(task.id, "Pending")
                                      }
                                      className="flex items-center p-1.5 gap-2 rounded-md hover:bg-slate-50 hover:text-blue-500"
                                    >
                                      <FiCheckSquare />
                                      Move to To Do
                                    </button>
                                  </MenuItem>
                                  <MenuItem className="w-full text-left">
                                    <button
                                      onClick={() => deleteHandler(task.id)}
                                      className="flex items-center p-1.5 gap-2 rounded-md hover:bg-slate-50 hover:text-red-500"
                                    >
                                      <FiTrash className="w-4 h-4" />
                                      Delete
                                    </button>
                                  </MenuItem>
                                </div>
                              </MenuItems>
                            </Menu>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="px-2.5">
                        <td colSpan={6} className="py-5 px-2.5">
                          <h4 className="text-slate-400 font-medium text-sm">
                            There is no backlog tasks
                          </h4>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default Backlog;
