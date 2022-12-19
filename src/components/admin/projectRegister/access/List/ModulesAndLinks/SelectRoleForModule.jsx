import React, { useState } from 'react'
import { useEffect } from 'react';
import { adminGetMethod } from '../../../../../../api/action';

export default function SelectRoleForModule({ handleRoleChange }) {

    const [roles , setRoles ] = useState([]);

    const roleUrl = "api/admin/getRole";
    useEffect( () => {
        adminGetMethod(roleUrl)
        .then( (res ) => {
            setRoles(res.data.roles);
        })
    } , [])

  return (
    <>
      <div className="select ml-3">
        <select
          onChange={handleRoleChange}
          className="custom-select custom-select-sm"
        >
          <option>Select Role</option>
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
