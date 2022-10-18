import React from 'react';
import ModuleItemMenu from './ModuleItemMenu';
import './ModulesAndLinks.css';

const ModuleItem = ({ software_menu, onToggle, active, handleCheckChange,singleSelect}) => {


    console.log('software_menu', software_menu);

  const { id, title , isChecked } = software_menu;

  return (
      <>
        <li className={`list-group-item my-1 ${active ? "on" : ""}`}>
            <div className="d-flex justify-content-between align-items-center">
                <div className="form-check">
                    <input onChange={handleCheckChange} checked={isChecked || false} type="checkbox" className="form-check-input" name={id} id={id} />
                    <label className="form-check-label" htmlFor={id}>{title}</label>
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
            {/* {software_menu?.children ?  
            software_menu?.children.length > 0 && (
                <ModuleItemMenu  data={software_menu.children} />
            ) : software_menu?.length > 0 && (
                <ModuleItemMenu  data={software_menu.children} />
            )} */}

            {software_menu?.children &&   
                <ModuleItemMenu  data={software_menu.children} /> 
            }

        </div>
    </>

  );
};

export default ModuleItem;