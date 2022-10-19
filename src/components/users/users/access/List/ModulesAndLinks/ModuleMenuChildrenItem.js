import React from "react";
import ChildrenInternalLinks from "./ChildrenInternalLinks";

const ModuleMenuChildrenItem = ({ insideMenu, onToggle, active }) => {
    // console.log('moduleMenu', moduleMenu);
    const { isTrue } = insideMenu;
 return (
  <>
    <li className={`list-group-item mx-3  my-1 ${active ? "on" : ""}`}>
        <div className="d-flex justify-content-between align-items-center">
            <div className="form-check">
                <input 
                    checked={isTrue || false}
                 type="checkbox" className="form-check-input" name={''} id={''} />
                <label className="form-check-label" htmlFor={''}>{insideMenu.menu_name}</label>
            </div>
            <button onClick={onToggle} className="btn btn sm">
                <span className="control fw-bold">{active ? "—" : "+"} </span>
            </button>
        </div>
    </li>
    <div className={`accordionX mx-4 ${active ? "open" : ""}`}>
            <ul className="p-2 d-flex flex-row justify-content-between align-items-center moduleInternalLinks">
                {insideMenu?.internal_links?.map((internal_links, index) => (
                    <ChildrenInternalLinks
                    key={index} internal_links={internal_links} />
                ))}
            </ul>

    </div>
  </>
 );
};

export default ModuleMenuChildrenItem;