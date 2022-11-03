import React from 'react';
import ModuleMenuChildren from '../childrenMenu/ChildrenMenu';
import ParentInternalLinks from './ParentInternalLinks';
import '../ModulesAndLinks.css'

const ModuleMenu = ({ software_menu, onToggle, active, handleSelectMenu, handleSelectChildMenu, handleSelectParentInternalLinks, handleSelectInternalLinks }) => {



  const { id, menu_name , isTrue } = software_menu;

//   const checkAllChildrenSelect = software_menu?.children?.filter( childrenMenu => childrenMenu?.isTrue !== true).length < 1 ;


  return (
      <>
        <li className={`list-group-item my-1 ${active ? "active" : ""}`}>
            <div className="d-flex justify-content-between align-items-center">
                <div className="form-check">
                    <input checked={isTrue || false} onChange={ (event) => handleSelectMenu(event , id)}  type="checkbox" className="form-check-input" id={id} />
                    <label className="form-check-label" htmlFor={id}>{menu_name}</label>
                </div>
                {
                    software_menu?.children.length > 0 && (
                        <button onClick={onToggle} className="btn btn sm">
                            <span className="control fw-bold">{active ? "—" : "+"} </span>
                        </button>
                    )
                }
                {
                    software_menu?.internal_links.length > 0 && (
                        <button onClick={onToggle} className="btn btn sm">
                            <span className="control fw-bold">{active ? "—" : "+"} </span>
                        </button>
                    )
                }
                
            </div>
        </li>
        
        <div className={`answer_wrapper ${active ? "open" : ""}`}>

            { software_menu?.children?.length > 0 &&   
                <ModuleMenuChildren handleSelectChildMenu={handleSelectChildMenu} handleSelectInternalLinks={handleSelectInternalLinks}  menuChildren={software_menu.children} parentId={id} /> 
            }
            {
                software_menu?.internal_links.length > 0 && (
                    <ul className="p-2 d-flex flex-row justify-content-between align-items-center moduleInternalLinks">
                        {software_menu?.internal_links?.map((internal_links, index) => (
                            <ParentInternalLinks
                                parentId={id}
                                handleSelectParentInternalLinks={handleSelectParentInternalLinks}
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

export default ModuleMenu;