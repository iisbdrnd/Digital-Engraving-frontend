import React from 'react';
import '../ModulesAndLinks.css'

const SubChildrenInternalLinks = ({ internal_links,active, handleSelectSubChildInternalLinks, parentId, menuChildId, menuSubChildId }) => {

  return (
      <>
        <li className={` my-1 ${active ? "on" : ""}`}>
            <div className="d-flex justify-content-between align-items-center">
                <div className="form-check">
                    <input 
                      onChange={ (event) => handleSelectSubChildInternalLinks(event , parentId , menuChildId, menuSubChildId, internal_links.id )}
                      checked={internal_links.isTrue || false}
                      type="checkbox"
                      className="form-check-input"
                      id={internal_links.id}
                    />
                    <label className="form-check-label" htmlFor={internal_links.id}>{internal_links.link_name}</label>
                </div>
            </div>
        </li>
        
    </>

  );
};

export default SubChildrenInternalLinks;