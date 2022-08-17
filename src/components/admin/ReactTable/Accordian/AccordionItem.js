import React from 'react';
import './ModulesAndLinks.css';
import SubAccordion from './SubAccordion';

const AccordionItem = ({ faq, onToggle, active, handleCheckChange, handleCheckChildChange }) => {
  const { question , isChecked } = faq;
  return (
      <>
        <li className={`list-group-item my-1 ${active ? "on" : ""}`}>
            <div className="d-flex justify-content-between">
                <div className="form-check">
                    <input onChange={handleCheckChange} checked={isChecked || false} type="checkbox" className="form-check-input" name={question} id={question} />
                    <label className="form-check-label" htmlFor={question}>{question}</label>
                </div>
                {
                    faq?.skill && (
                        <button onClick={onToggle} className="btn btn sm">
                            <span className="control fw-bold">{active ? "—" : "+"} </span>
                        </button>
                    )
                }
                
            </div>
        </li>
        
        <div className={`answer_wrapper ${active ? "open" : ""}`}>
            { faq?.skill && (
                <SubAccordion handleCheckChildChange={handleCheckChildChange} data={faq.skill} />
            ) }
        </div>
    </>

  );
};

export default AccordionItem;