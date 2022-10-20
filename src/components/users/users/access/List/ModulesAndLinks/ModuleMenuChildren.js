import React, { useState } from "react";
import ModuleMenuChildrenItem from "./ModuleMenuChildrenItem";


const ModuleMenuChildren = ({ menuChildren ,parentId ,  handleSelectChildMenu}) => {

    const [clicked, setClicked] = useState("0");

    
 const handleToggle = (index) => {
  if (clicked === index) {
   return setClicked("0");
  }
  setClicked(index);
 };

  return (
    <ul className="list-group">
      {menuChildren.map((insideMenu, index) => (
        <ModuleMenuChildrenItem handleSelectChildMenu={handleSelectChildMenu} onToggle={() => handleToggle(index)} active={clicked === index} key={index} insideMenu={insideMenu} parentId={parentId} />
      ))}
    </ul>
  );
};

export default ModuleMenuChildren;