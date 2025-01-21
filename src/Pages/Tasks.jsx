import React, { useContext, useEffect, useState } from "react";
import {
  config,
  deleteData,
  getData,
  postData,
  updateData,
} from "../Api/Services";
import { TaskContext } from "../Context";
import Modal from "../Components/Modal";
import TaskCard from "../Components/TaskCard";
import TaskForm from "../Components/TaskFrom";
import { truncateText } from "../utils";
import { toast, ToastContainer } from "react-toastify";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import { BiSort, BiSortAZ, BiSortDown } from "react-icons/bi";
import { Checkbox, Field, Label } from "@headlessui/react";

const Home = () => {
  const [pendingTask, setPendingTask] = useState([]);
  const [inProgressTask, setInProgressTask] = useState([]);
  const [inReview, setInReview] = useState([]);
  const [completedTask, setCompletedTask] = useState([]);
  const [backLogTask, setBackLogTask] = useState([]);
  const [addData, setAddData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    status: "",
    userId: "",
  });
  const { showModal, modalHandler, closeModalHandler } =
    useContext(TaskContext);
  const [error, setError] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    status: "",
    userId: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [userData, setUserData] = useState([]);
  const [checkedUsers, setCheckedUsers] = useState({});
  const [filteredTasks, setFilteredTasks] = useState({
    pending: [],
    inProgress: [],
    inReview: [],
    completed: [],
    backlog: [],
  });

  // Fetch data
  const fetchData = async () => {
    try {
      const result = await getData(`${config.apiBaseUrl}/tasks`);

      setPendingTask(result.filter((task) => task.status === "Pending"));
      setInProgressTask(result.filter((task) => task.status === "In Progress"));
      setInReview(result.filter((task) => task.status === "In Review"));
      setCompletedTask(result.filter((task) => task.status === "Completed"));
      setBackLogTask(result.filter((task) => task.status === "Backlog"));
      setFilteredTasks(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Form Input Handler
  const inputHandler = (event) => {
    const { name, value } = event.target;
    setAddData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Form Validation
  const validate = () => {
    let isValid = true;
    const newErrors = {
      title: "",
      description: "",
      dueDate: "",
    };

    if (!addData.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    }
    if (!addData.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }
    if (!addData.dueDate.trim()) {
      newErrors.dueDate = "Due date is required";
      isValid = false;
    }

    setError(newErrors);
    return isValid;
  };

  // Form submit
  const taskSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      const taskPayload = {
        ...addData,
        status: addData.status || "Pending",
      };

      try {
        let response;
        if (isEditing) {
          response = await updateData(
            `${config.apiBaseUrl}/tasks`,
            editingTaskId,
            taskPayload
          );
        } else {
          response = await postData(`${config.apiBaseUrl}/tasks`, taskPayload);
        }

        if (response) {
          setAddData({
            title: "",
            description: "",
            dueDate: "",
            priority: "",
            status: "",
            userId: "",
          });
          toast(
            isEditing
              ? "Task updated successfully!"
              : "Task added successfully!"
          );
          closeModalHandler();
          fetchData();
        } else {
          toast("Failed to save task. Please try again.");
        }
      } catch (error) {
        toast("An error occurred while saving the task.");
        console.error("Error submitting task:", error);
      }
    }
  };

  // Delete Task
  const deleteHandler = async (id) => {
    try {
      const isDeleted = await deleteData(`${config.apiBaseUrl}/tasks`, id);
      if (isDeleted) {
        toast("Task deleted successfully!");
        fetchData();
      } else {
        toast("Failed to delete task.");
      }
    } catch (error) {
      console.error("An error occurred while deleting the task:", error);
    }
  };

  // Form Edit
  const editHandler = (id) => {
    const taskToEdit = [
      ...pendingTask,
      ...inProgressTask,
      ...inReview,
      ...completedTask,
      ...backLogTask,
    ].find((task) => task.id === id);

    if (taskToEdit) {
      setAddData({
        title: taskToEdit.title,
        description: taskToEdit.description,
        dueDate: taskToEdit.dueDate,
        priority: taskToEdit.priority,
        status: taskToEdit.status,
        userId: taskToEdit.userId,
      });
      setEditingTaskId(id);
      setIsEditing(true);
      modalHandler(true);
    }
  };

  const statusChangeHandler = async (id, newStatus) => {
    try {
      const taskToUpdate = [
        ...pendingTask,
        ...inProgressTask,
        ...inReview,
        ...completedTask,
        ...backLogTask,
      ].find((task) => task.id === id);

      const updatedTask = { ...taskToUpdate, status: newStatus };
      const result = await updateData(
        `${config.apiBaseUrl}/tasks`,
        id,
        updatedTask
      );

      if (result) {
        toast("Task status updated successfully");
        fetchData();
      } else {
        toast("Failed to update task status.");
      }
    } catch (error) {
      console.error("An error occurred while updating the task status:", error);
    }
  };

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

  const handleCheckboxChange = (userId) => {
    setCheckedUsers((prev) => {
      const newCheckedUsers = { ...prev, [userId]: !prev[userId] };
      const isEmpty = Object.values(newCheckedUsers).every((value) => !value);

      const taskCategories = {
        pending: pendingTask,
        inProgress: inProgressTask,
        inReview: inReview,
        completed: completedTask,
        backlog: backLogTask,
      };

      if (isEmpty) {
        setFilteredTasks(taskCategories);
      } else {
        const filteredTasks = Object.entries(taskCategories).reduce(
          (acc, [key, tasks]) => ({
            ...acc,
            [key]: tasks.filter((task) => newCheckedUsers[task.userId]),
          }),
          {}
        );

        setFilteredTasks(filteredTasks);
      }

      return newCheckedUsers;
    });
  };

  useEffect(() => {
    setFilteredTasks({
      pending: pendingTask,
      inProgress: inProgressTask,
      inReview: inReview,
      completed: completedTask,
      backlog: backLogTask,
    });
  }, [pendingTask, inProgressTask, inReview, completedTask, backLogTask]);

  useEffect(() => {
    fetchData();
    getUsers();
  }, []);

  return (
    <>
      <div className="w-full h-full">
        <div className="flex items-center justify-between mb-4">
          <h1 className=" font-semibold text-slate-700 text-lg">Tasks List</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => modalHandler(true)}
              className="px-5 py-2 text-sm rounded-md  bg-blue-700 hover:bg-blue-700/70 text-white inline-flex items-center gap-2 leading-4"
            >
              Create Task
            </button>
            <Menu>
              <MenuButton className="inline-flex items-center gap-2 rounded-md py-1.5 px-3 font-semibold text-slate-800 text-sm bg-white">
                <BiSortDown className="w-5 h-5 " />
                Sort by Users
              </MenuButton>

              <MenuItems
                transition
                anchor="bottom end"
                className="w-60 origin-top-right rounded-md border  bg-white text-slate-600 transition duration-100 ease-out shadow-lg  z-10 px-5 py-3"
              >
                {userData.map((user) => {
                  return (
                    <div key={user.id}>
                      <Field className="flex items-center gap-2 py-1 cursor-pointer">
                        <Checkbox
                          checked={!!checkedUsers[user.id]}
                          onChange={() => handleCheckboxChange(user.id)}
                          className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
                        >
                          <svg
                            className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M3 8L6 11L11 3.5"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Checkbox>
                        <Label className="text-sm  cursor-pointer">
                          {user.fullName}
                        </Label>
                      </Field>
                    </div>
                  );
                })}
              </MenuItems>
            </Menu>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-5 w-full h-[calc(100%-60px)]">
          <div className="bg-white shadow-sm p-5 border-t-[3px] border-t-blue-500">
            <h2 className="text-lg font-semibold mb-4 flex items-center justify-between gap-3">
              To Do <span>({filteredTasks?.pending?.length})</span>
            </h2>
            {filteredTasks?.pending?.length > 0 ? (
              filteredTasks?.pending.map((task) => (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={truncateText(task.description, 100)}
                  duedate={task.dueDate}
                  priority={task.priority}
                  userId={task.userId}
                  deleteHandler={deleteHandler}
                  editHandler={editHandler}
                />
              ))
            ) : (
              <h4 className="text-slate-400 font-medium text-sm">
                There is no current task assigned
              </h4>
            )}
          </div>

          <div className="bg-white shadow-sm p-5 border-t-[3px] border-t-yellow-400">
            <h2 className="text-lg font-semibold mb-4 flex items-center justify-between gap-3">
              In Progress <span>({filteredTasks?.inProgress?.length})</span>
            </h2>
            {filteredTasks?.inProgress?.length > 0 ? (
              filteredTasks?.inProgress.map((task) => (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={truncateText(task.description, 100)}
                  duedate={task.dueDate}
                  priority={task.priority}
                  userId={task.userId}
                  deleteHandler={deleteHandler}
                  editHandler={editHandler}
                />
              ))
            ) : (
              <h4 className="text-slate-400 font-medium text-sm">
                No task is currently in progress
              </h4>
            )}
          </div>

          <div className="bg-white shadow-sm p-5 border-t-[3px] border-t-orange-500">
            <h2 className="text-lg font-semibold mb-4 flex items-center justify-between gap-3">
              In Review <span>({filteredTasks?.inReview?.length})</span>
            </h2>
            {filteredTasks?.inReview?.length > 0 ? (
              filteredTasks?.inReview.map((task) => (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={truncateText(task.description, 100)}
                  duedate={task.dueDate}
                  priority={task.priority}
                  userId={task.userId}
                  deleteHandler={deleteHandler}
                  editHandler={editHandler}
                />
              ))
            ) : (
              <h4 className="text-slate-400 font-medium text-sm">
                There is no task in review
              </h4>
            )}
          </div>

          <div className="bg-white shadow-sm p-5 border-t-[3px] border-t-green-500">
            <h2 className="text-lg font-semibold mb-4 flex items-center justify-between gap-3">
              Completed <span>({filteredTasks?.completed?.length})</span>
            </h2>
            {filteredTasks?.completed?.length > 0 ? (
              filteredTasks?.completed.map((task) => (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={truncateText(task.description, 100)}
                  duedate={task.dueDate}
                  priority={task.priority}
                  userId={task.userId}
                  deleteHandler={deleteHandler}
                  editHandler={editHandler}
                />
              ))
            ) : (
              <h4 className="text-slate-400 font-medium text-sm">
                No task has been completed yet.
              </h4>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <Modal
          title={isEditing ? "Edit Task" : "Add New Task"}
          modalCloseHandler={closeModalHandler}
          content={
            <TaskForm
              addData={addData}
              setAddData={setAddData}
              error={error}
              setError={setError}
              inputHandler={inputHandler}
              taskSubmit={taskSubmit}
              statusChangeHandler={statusChangeHandler}
            />
          }
        />
      )}
      <ToastContainer />
    </>
  );
};

export default Home;
