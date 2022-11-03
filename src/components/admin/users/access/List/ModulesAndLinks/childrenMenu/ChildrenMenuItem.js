import React from "react";
import SubChildrenMenu from "../SubChildrenMenu/SubChildrenMenu";
import ChildrenInternalLinks from "./ChildrenInternalLinks";

const ModuleMenuChildrenItem = ({ childMenu, parentId, onToggle, active, handleSelectChildMenu , handleSelectSubChildMenu, handleSelectSubChildInternalLinks }) => {

    const { id , isTrue } = childMenu;

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
                <label className="form-check-label" htmlFor={id}>{childMenu.menu_name}</label>
            </div>
            {
                childMenu?.internal_links?.length > 0 && (
                    <button onClick={onToggle} className="btn btn sm">
                        <span className="control fw-bold">{active ? "—" : "+"} </span>
                    </button>
                )
            }
            {
                childMenu?.children?.length > 0 && (
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
            { childMenu?.children?.length > 0 &&   
                <SubChildrenMenu handleSelectSubChildInternalLinks={handleSelectSubChildInternalLinks} handleSelectSubChildMenu={handleSelectSubChildMenu}  menuChildren={childMenu.children}  parentId={parentId} menuChildId={id} /> 
            }


            {
                childMenu?.internal_links.length > 0 && (
                    <ul className="p-2 d-flex flex-row justify-content-between align-items-center moduleInternalLinks">
                        {childMenu?.internal_links?.map((internal_links, index) => (
                            <ChildrenInternalLinks
                                parentId={parentId}
                                menuChildId={id}
                                handleSelectSubChildMenu={handleSelectSubChildMenu}
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