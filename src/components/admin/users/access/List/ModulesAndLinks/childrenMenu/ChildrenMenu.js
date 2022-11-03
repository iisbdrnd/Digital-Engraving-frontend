import React, { useState } from "react";
import ChildrenMenuItem from "./ChildrenMenuItem";


const ModuleMenuChildren = ({ menuChildren ,parentId ,  handleSelectChildMenu , handleSelectSubChildMenu}) => {

    const [clicked, setClicked] = useState("0");

    
 const handleToggle = (index) => {
  if (clicked === index) {
   return setClicked("0");
  }
  setClicked(index);
 };

  return (
    <ul className="list-group">
      {menuChildren.map((childMenu, index) => (
        <ChildrenMenuItem handleSelectSubChildMenu={handleSelectSubChildMenu} handleSelectChildMenu={handleSelectChildMenu} onToggle={() => handleToggle(index)} active={clicked === index} key={index} childMenu={childMenu} parentId={parentId} />
      ))}
    </ul>
  );
};

export default ModuleMenuChildren;