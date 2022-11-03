import React, { useState } from "react";
import SubChildrenMenuItem from "./SubChildrenMenuItem";


const SubChildrenMenu = ({ menuChildren ,parentId ,  handleSelectChildMenu , handleSelectInternalLinks}) => {

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
        <SubChildrenMenuItem handleSelectInternalLinks={handleSelectInternalLinks} handleSelectChildMenu={handleSelectChildMenu} onToggle={() => handleToggle(index)} active={clicked === index} key={index} insideMenu={insideMenu} parentId={parentId} />
      ))}
    </ul>
  );
};

export default SubChildrenMenu;