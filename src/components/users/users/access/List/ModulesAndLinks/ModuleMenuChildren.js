import React, { useState } from "react";
import ModuleMenuChildrenItem from "./ModuleMenuChildrenItem";


const ModuleMenuChildren = ({ menuChildren}) => {

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
        <ModuleMenuChildrenItem onToggle={() => handleToggle(index)} active={clicked === index} key={index} insideMenu={insideMenu} />
      ))}
    </ul>
  );
};

export default ModuleMenuChildren;