import React from "react";
import SubChildrenInternalLinks from "./SubChildrenInternalLinks";

const SubChildrenMenuItem = ({ subChildrenMenu, parentId, menuChildId, onToggle, active, handleSelectSubChildMenu }) => {

    const { id , isTrue } = subChildrenMenu;

    // const checkAllInternalLinksSelect = insideMenu?.internal_links?.filter( internalLink => internalLink?.isTrue !== true).length < 1 ;

 return (
  <>
    <li className={`list-group-item mx-3  my-1 ${active ? "on" : ""}`}>
        <div className="d-flex justify-content-between align-items-center">
            <div className="form-check">
                <input 
                    checked={isTrue || false}
                    onChange={ (event) => handleSelectSubChildMenu(event , parentId, menuChildId, id )}
                 type="checkbox" className="form-check-input" name={''} id={id} />
                <label className="form-check-label" htmlFor={id}>{subChildrenMenu.menu_name}</label>
            </div>
            {
                subChildrenMenu?.internal_links?.length > 0 && (
                    <button onClick={onToggle} className="btn btn sm">
                        <span className="control fw-bold">{active ? "—" : "+"} </span>
                    </button>
                )
            }
        </div>
    </li>
    <div className={`accordionX mx-4 ${active ? "open" : ""}`}>

            {
                subChildrenMenu?.internal_links.length > 0 && (
                    <ul className="p-2 d-flex flex-row justify-content-between align-items-center moduleInternalLinks">
                        {subChildrenMenu?.internal_links?.map((internal_links, index) => (
                            <SubChildrenInternalLinks
                                parentId={parentId}
                                menuChildId={menuChildId}
                                menuSubChildId={id}
                                key={index} internal_links={internal_links} 
                            />
                        ))}
                    </ul>
                )
            }

    </div>
  </>
 );
};

export default SubChildrenMenuItem;