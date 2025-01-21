import React, { useEffect, useState } from "react";
import { config, getData } from "../Api/Services";
import classNames from "classnames";
import { createInitial } from "../utils";

const TeamMembers = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      let result = await getData(`${config.apiBaseUrl}/users`);
      console.log("result", result);
      setUsers(result);
    } catch (error) {
      console.log(`User Data : ${error}`);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="w-full h-full">
      <div class="flex items-center justify-between mb-4">
        <h1 class=" font-semibold text-slate-700 text-lg">Team Members</h1>
      </div>
      <div className="w-full h-[calc(100%-50px)] bg-white p-5">
        {users.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left text-sm p-2.5">Sr No</th>
                <th className="text-left text-sm p-2.5">Member Name</th>
                <th className="text-left text-sm p-2.5">Designation</th>
                <th className="text-left text-sm p-2.5">Email</th>
                <th className="text-left text-sm p-2.5">Phone</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr className="odd:bg-slate-50" key={user.id}>
                    <td className="text-left text-sm p-2.5">{index + 1}</td>
                    <td className="text-left text-sm p-2.5">
                      {(() => {
                        const { initial, consistentColor } = createInitial(
                          user.fullName
                        );
                        return (
                          <div className="flex items-center gap-2 ">
                            <span
                              className={classNames(
                                "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold p-1",
                                consistentColor
                              )}
                            >
                              {initial}
                            </span>
                            {user.fullName}
                          </div>
                        );
                      })()}
                    </td>
                    <td className="text-left text-sm p-2.5">
                      {user.designation}
                    </td>
                    <td className="text-left text-sm p-2.5">{user.email}</td>
                    <td className="text-left text-sm p-2.5">{user.phone}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h4>There are currently no users to display</h4>
        )}
      </div>
    </div>
  );
};

export default TeamMembers;
