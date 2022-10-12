import React from 'react';
import './ModulesAndLinks.css';

const ModuleInternalLinksItem = ({ internal_links, onToggle, active, singleSelect, software_menu_id }) => {
//   const { question } = faq;
  return (
      <>
        <li className={` my-1 ${active ? "on" : ""}`}>
            <div className="d-flex justify-content-between align-items-center">
                <div className="form-check">
                    <input onChange={singleSelect} checked={internal_links?.isChecked || false} name={internal_links.id} type="checkbox" className="form-check-input" id={software_menu_id} />
                    <label className="form-check-label" htmlFor={internal_links.link_name}>{internal_links.link_name}</label>
                </div>
            </div>
        </li>
        
        <div className={`answer_wrapper ${active ? "open" : ""}`}>
            { internal_links?.active && (
                <li className="list-group-item mx-2">{internal_links?.active}</li>
            ) }
        </div>
    </>

  );
};

export default ModuleInternalLinksItem;