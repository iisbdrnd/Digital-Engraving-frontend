import React, { useState } from 'react';
import ModuleItem from './ModuleItem';

const Module = ({modulesData,loading,handleCheckChange, singleSelect,saveData}) => {

    
  const [clicked, setClicked] = useState("0");
  
 const handleToggle = (index) => {
  if (clicked === index) {
   return setClicked("0");
  }
  setClicked(index);
 };

    return (
        <>
            <div className="card">
              {
                loading ? (
                  <h3>Loading...</h3>
                ) : (
                  <>
                    <div className="card-header d-flex justify-content-between align-items-center" style={{height: 'auto !important'}}>
                        <div className="form-check">
                            <input
                            checked={ modulesData?.software_menus?.filter( software_menu => software_menu?.isChecked !== true).length < 1}
                            type="checkbox" name="allSelect" onChange={handleCheckChange} className="form-check-input" id="all-select" />
                            <label className="form-check-label" htmlFor="all-select">{modulesData?.software_module?.module_name}</label>
                        </div>
                        <button onClick={saveData} className="btn btn-sm btn-secondary">Save</button>
                    </div>
                    
                    <div className="card-body">
                      <ul className="list-group m-2">
                              {modulesData?.software_menus?.map((software_menu, index) => (
                                  <ModuleItem
                                  onToggle={() => handleToggle(index)}
                                  handleCheckChange={handleCheckChange}
                                  singleSelect={singleSelect}
                                  active={clicked === index}
                                  key={index} software_menu={software_menu} />
                              ))}
                          </ul>
                    </div>
                  </>
                )
              }
                
                
            </div>
        </>
    );
};

export default Module;