import React from 'react';
import './ModulesAndLinks.css';

const SubAccordionItem = ({ skill, onToggle, active,handleCheckChildChange }) => {
//   const { question } = faq;
  return (
      <>
        <li className={`list-group-item my-1 ${active ? "on" : ""}`}>
            <div className="d-flex justify-content-between">
                <div className="form-check">
                    <input onChange={handleCheckChildChange} checked={skill.isChecked || false} name={skill.name} type="checkbox" className="form-check-input" id={skill.name} />
                    <label className="form-check-label" htmlFor={skill.name}>{skill.name}</label>
                </div>
                {
                    skill?.active && (
                        <button onClick={onToggle} className="btn btn sm">
                            <span className="control fw-bold">{active ? "—" : "+"} </span>
                        </button>
                    )
                }
                
            </div>
        </li>
        
        <div className={`answer_wrapper ${active ? "open" : ""}`}>
            { skill?.active && (
                <li className="list-group-item mx-2">{skill?.active}</li>
            ) }
        </div>
    </>

  );
};

export default SubAccordionItem;