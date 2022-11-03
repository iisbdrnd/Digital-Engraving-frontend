import React from "react";
import SubChildrenMenu from "../SubChildrenMenu/SubChildrenMenu";
import ChildrenInternalLinks from "./ChildrenInternalLinks";

const ModuleMenuChildrenItem = ({ insideMenu, parentId, onToggle, active, handleSelectChildMenu , handleSelectInternalLinks }) => {

    const { id , isTrue } = insideMenu;

    // const checkAllInternalLinksSelect = insideMenu?.internal_links?.filter( internalLink => internalLink?.isTrue !== true).length < 1 ;

 return (
  <>
    <li className={`list-group-item mx-3  my-1 ${active ? "on" : ""}`}>
        <div className="d-flex justify-content-between align-items-center">
            <div className="form-check">
                <input 
                    checked={isTrue || false}
                    onChange={ (event) => handleSelectChildMenu(event , parentId , id )}
                 type="checkbox" className="form-check-input" name={''} id={id} />
                <label className="form-check-label" htmlFor={id}>{insideMenu.menu_name}</label>
            </div>
            {
                insideMenu?.internal_links?.length > 0 && (
                    <button onClick={onToggle} className="btn btn sm">
                        <span className="control fw-bold">{active ? "—" : "+"} </span>
                    </button>
                )
            }
            {
                insideMenu?.children?.length > 0 && (
                    <button onClick={onToggle} className="btn btn sm">
                        <span className="control fw-bold">{active ? "—" : "+"} </span>
                    </button>
                )
            }
        </div>
    </li>
    <div className={`accordionX mx-4 ${active ? "open" : ""}`}>
            {/* <ul className="p-2 d-flex flex-row justify-content-between align-items-center moduleInternalLinks">
                {insideMenu?.internal_links?.map((internal_links, index) => (
                    <ChildrenInternalLinks
                        parentId={parentId}
                        menuChildId={id}
                        handleSelectInternalLinks={handleSelectInternalLinks}
                        key={index} internal_links={internal_links} 
                    />
                ))}
            </ul> */}

            {/* if parent children have childen */}
            { insideMenu?.children?.length > 0 &&   
                <SubChildrenMenu   menuChildren={insideMenu.children} parentId={id} /> 
            }


            {
                insideMenu?.internal_links.length > 0 && (
                    <ul className="p-2 d-flex flex-row justify-content-between align-items-center moduleInternalLinks">
                        {insideMenu?.internal_links?.map((internal_links, index) => (
                            <ChildrenInternalLinks
                                parentId={parentId}
                                menuChildId={id}
                                handleSelectInternalLinks={handleSelectInternalLinks}
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

export default ModuleMenuChildrenItem;