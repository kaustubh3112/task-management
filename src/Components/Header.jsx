import { FiChevronDown, FiHome } from "react-icons/fi";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const getUserName = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    setUserName(user);
  };

  const logoutHandler = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  useState(() => {
    getUserName();
  }, []);

  return (
    <div className="flex items-center justify-between gap-10 py-5 px-5">
      <h1 className="text-xl font-semibold flex items-center gap-3">
        <FiHome className="w-8 h-8 text-blue-500" /> Task Management{" "}
      </h1>
      <div>
        <div className="text-right">
          <Menu>
            <MenuButton className="inline-flex items-center gap-2 rounded-md py-1.5 px-3 font-semibold text-slate-600 ">
              {userName.fullName}
              <FiChevronDown className="size-4 fill-white/60" />
            </MenuButton>

            <MenuItems
              transition
              anchor="bottom end"
              className="w-52 origin-top-right rounded-md border  bg-white p-1  text-slate-600 transition duration-100 ease-out shadow-lg  z-50"
            >
              <MenuItem>
                <button
                  onClick={() => logoutHandler()}
                  className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                >
                  Logout
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Header;
