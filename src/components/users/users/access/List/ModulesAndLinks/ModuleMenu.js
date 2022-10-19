import React from 'react';
import ModuleMenuChildren from './ModuleMenuChildren';
import './ModulesAndLinks.css';

const ModuleMenu = ({ software_menu, onToggle, active, handleSelectMenu }) => {



  const { id, menu_name , isTrue } = software_menu;
//   checked={isChecked || false}

  return (
      <>
        <li className={`list-group-item my-1 ${active ? "active" : ""}`}>
            <div className="d-flex justify-content-between align-items-center">
                <div className="form-check">
                    <input checked={isTrue || false } onChange={ (event) => handleSelectMenu(event , id)}  type="checkbox" className="form-check-input" id={id} />
                    <label className="form-check-label" htmlFor={id}>{menu_name}</label>
                </div>
                {
                    software_menu?.children ? 
                    software_menu?.children.length > 0 && (
                        <button onClick={onToggle} className="btn btn sm">
                            <span className="control fw-bold">{active ? "—" : "+"} </span>
                        </button>
                    ) : software_menu?.length > 0 && (
                        <button onClick={onToggle} className="btn btn sm">
                        </button>
                    )
                }
                
            </div>
        </li>
        
        <div className={`answer_wrapper ${active ? "open" : ""}`}>

            { software_menu?.children?.length > 0 &&   
                <ModuleMenuChildren  menuChildren={software_menu.children} /> 
            }

        </div>
    </>

  );
};

export default ModuleMenu;