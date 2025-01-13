import { BiCalendar, BiChevronDown } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext, useEffect, useMemo, useState } from "react";
import { TaskContext } from "../Context";
import { config, getData } from "../Api/Services";
import { createInitial } from "../utils";
import classNames from "classnames";

const TaskForm = ({ addData, setAddData, error, inputHandler, taskSubmit }) => {
  const formContext = useContext(TaskContext);
  const [userData, setUserData] = useState([]);

  const getUsers = async () => {
    try {
      let users = await getData(`${config.apiBaseUrl}/users`);
      if (users) {
        setUserData(users);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <form onSubmit={taskSubmit} noValidate>
        <div className="w-full mb-3">
          <input
            type="text"
            name="title"
            placeholder="Add Task"
            className="border border-gray-200 outline-none px-4 py-2 rounded-md w-full min-h-11"
            value={addData.title}
            onChange={inputHandler}
          />
          {error.title && <p className="text-red-500 text-sm">{error.title}</p>}
        </div>

        <div className="w-full mb-3">
          <textarea
            name="description"
            placeholder="Add Task Content"
            className="border border-gray-200 outline-none px-4 py-2 rounded-md w-full min-h-11 resize-none"
            rows={5}
            value={addData.description}
            onChange={inputHandler}
          />
          {error.description && (
            <p className="text-red-500 text-sm">{error.description}</p>
          )}
        </div>
        <div className="w-full relative  mb-3">
          <select
            className="border border-gray-200 outline-none px-4 py-2 rounded-md w-full min-h-11 appearance-none relative z-0 bg-transparent cursor-pointer"
            value={addData.asignedtoUser}
            onChange={inputHandler}
            name="userId"
          >
            <option value="">Assigned to </option>
            {userData?.map((user) => (
              <option key={user?.id} value={user?.id}>
                {(() => {
                  const { initial, consistentColor } = createInitial(
                    user?.fullName
                  );
                  return (
                    <div className="flex items-center gap-2 ">
                      {/* <span
                        className={classNames(
                          "w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-semibold p-1",
                          consistentColor
                        )}
                      >
                        {initial}
                      </span> */}
                      {user?.fullName}
                    </div>
                  );
                })()}
              </option>
            ))}
          </select>

          <button className="absolute top-3 right-3 -z-10">
            <BiChevronDown className="w-5 h-5 " />
          </button>
          {error.status && (
            <p className="text-red-500 text-sm">{error.status}</p>
          )}
        </div>

        <div className="grid grid-cols-2 mb-3 gap-3">
          <div className="w-full relative">
            <select
              className="border border-gray-200 outline-none px-4 py-2 rounded-md w-full min-h-11 appearance-none relative z-0 bg-transparent cursor-pointer"
              value={addData.priority}
              onChange={inputHandler}
              name="priority"
            >
              <option>Select Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button className="absolute top-3 right-3 -z-10">
              <BiChevronDown className="w-5 h-5 " />
            </button>
            {error.priority && (
              <p className="text-red-500 text-sm">{error.priority}</p>
            )}
          </div>
          <div className="w-full">
            <DatePicker
              className="border border-gray-200 outline-none px-4 py-2 rounded-md w-full min-h-11"
              selected={addData.dueDate ? addData.dueDate : new Date()}
              onChange={(date) =>
                setAddData({
                  ...addData,
                  dueDate: new Date(date).toLocaleDateString(),
                })
              }
              minDate={new Date()}
              showIcon
              icon={
                <BiCalendar className="w-5 h-5 text-slate-600 cursor-pointer" />
              }
              toggleCalendarOnIconClick
              popperPlacement="bottom-end"
            />

            {error.dueDate && (
              <p className="text-red-500 text-sm">{error.dueDate}</p>
            )}
          </div>
        </div>
        <div className="w-full relative  mb-8">
          <select
            className="border border-gray-200 outline-none px-4 py-2 rounded-md w-full min-h-11 appearance-none relative z-0 bg-transparent cursor-pointer"
            value={addData.status}
            onChange={inputHandler}
            name="status"
          >
            <option>Select Status</option>
            <option value="Pending">To do</option>
            <option value="In Progress">In Progress</option>
            <option value="In Review">In Review</option>
            <option value="Completed">Completed</option>
            <option value="Backlog">Backlog</option>
          </select>
          <button className="absolute top-3 right-3 -z-10">
            <BiChevronDown className="w-5 h-5 " />
          </button>
          {error.status && (
            <p className="text-red-500 text-sm">{error.status}</p>
          )}
        </div>

        <div className="flex items-center  gap-5">
          <button
            type="submit"
            className="bg-blue-700 rounded-lg text-sm px-5 py-3 text-white min-w-32"
          >
            Save
          </button>
          <button
            onClick={formContext.closeModalHandler}
            className="bg-black rounded-lg text-sm px-5 py-3 text-white min-w-32"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default TaskForm;
