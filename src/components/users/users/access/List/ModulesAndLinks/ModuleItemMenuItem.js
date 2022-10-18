import React from "react";

const ModuleItemMenuItem = ({ moduleMenu, onToggle, active }) => {
    console.log('moduleMenu', moduleMenu);
 return (
  <>
        {moduleMenu.id && (
            <>
                <li className={`list-group-item mx-2  my-1 ${active ? "on" : ""}`}>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="form-check">
                            <input checked={''} type="checkbox" className="form-check-input" name={''} id={''} />
                            <label className="form-check-label" htmlFor={''}>{moduleMenu.title}</label>
                        </div>
                        <button onClick={onToggle} className="btn btn sm">
                            <span className="control fw-bold">{active ? "—" : "+"} </span>
                        </button>
                    </div>
                </li>
                <div className={`accordionX ml-2 ${active ? "open" : ""}`}>
                        {moduleMenu?.internal_links?.map( (resource) => (
                            <ul>
                                <li>{resource.link_name}</li>
                            </ul>
                        )) }

                </div>
            </>
        )}
  </>
 );
};

export default ModuleItemMenuItem;