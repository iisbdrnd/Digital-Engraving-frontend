import React from 'react';
import './ModulesAndLinks.css';
import ModuleInternalLinks from './ModuleInternalLinks';

const ModuleItem = ({ software_menu, onToggle, active, handleCheckChange,singleSelect}) => {
  const { id,  menu_name , isChecked } = software_menu;
  return (
      <>
        <li className={`list-group-item my-1 ${active ? "on" : ""}`}>
            <div className="d-flex justify-content-between align-items-center">
                <div className="form-check">
                    <input onChange={handleCheckChange} checked={isChecked || false} type="checkbox" className="form-check-input" name={id} id={id} />
                    <label className="form-check-label" htmlFor={id}>{menu_name}</label>
                </div>
                {
                    software_menu?.internal_links ? 
                    software_menu?.internal_links.length > 0 && (
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
            {software_menu?.internal_links ?  
            software_menu?.internal_links.length > 0 && (
                <ModuleInternalLinks software_menu_id={id} data={software_menu.internal_links} singleSelect={singleSelect}/>
            ) : software_menu?.length > 0 && (
                <ModuleInternalLinks software_menu_id={id} data={software_menu} singleSelect={singleSelect}/>
            )}
        </div>
    </>

  );
};

export default ModuleItem;