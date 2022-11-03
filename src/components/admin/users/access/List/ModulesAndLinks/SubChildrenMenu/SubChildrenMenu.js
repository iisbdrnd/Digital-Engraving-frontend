import React, { useState } from "react";
import SubChildrenMenuItem from "./SubChildrenMenuItem";


const SubChildrenMenu = ({ menuChildren ,parentId , menuChildId, handleSelectSubChildMenu}) => {

    const [clicked, setClicked] = useState("0");

    
    const handleToggle = (index) => {
      if (clicked === index) {
      return setClicked("0");
      }
      setClicked(index);
    };

  return (
    <ul className="list-group">
      {menuChildren.map((subChildrenMenu, index) => (
        <SubChildrenMenuItem handleSelectSubChildMenu={handleSelectSubChildMenu} onToggle={() => handleToggle(index)} active={clicked === index} key={index} subChildrenMenu={subChildrenMenu} parentId={parentId} menuChildId={menuChildId} />
      ))}
    </ul>
  );
};

export default SubChildrenMenu;