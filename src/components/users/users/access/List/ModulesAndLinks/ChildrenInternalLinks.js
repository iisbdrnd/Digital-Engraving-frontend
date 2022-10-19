import React from 'react';
import './ModulesAndLinks.css';

const ChildrenInternalLinks = ({ internal_links,active }) => {

  return (
      <>
        <li className={` my-1 ${active ? "on" : ""}`}>
            <div className="d-flex justify-content-between align-items-center">
                <div className="form-check">
                    <input checked={internal_links.isTrue || false}  type="checkbox" className="form-check-input" />
                    <label className="form-check-label" >{internal_links.link_name}</label>
                </div>
            </div>
        </li>
        
    </>

  );
};

export default ChildrenInternalLinks;