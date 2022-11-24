import React, { useState } from "react";
import { useEffect } from "react";
import { userGetMethod } from "../../../../../../api/userAction";

export default function SelectRoleForModule({ handleRoleChange }) {
  const [roles, setRoles] = useState([]);

  const roleUrl = "api/user/getRole";
  useEffect(() => {
    userGetMethod(roleUrl).then((res) => {
      setRoles(res.data.roles);
    });
  }, []);

  return (
    <>
      <div className="select ml-3">
        <select
          onChange={handleRoleChange}
          className="custom-select custom-select-sm"
        >
          <option>Select Designation</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.role_name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
