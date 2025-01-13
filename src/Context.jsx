import { createContext, useState } from "react";

export const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  const modalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  return (
    <TaskContext.Provider
      value={{ showModal, modalHandler, closeModalHandler }}
    >
      {children}
    </TaskContext.Provider>
  );
};
