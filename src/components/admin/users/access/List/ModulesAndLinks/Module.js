import React, { useState } from 'react';
import ParentMenu from './parentMenu/ParentMenu';
import SelectRoleForModule from './SelectRoleForModule';
// import SelectRoleForModule from './SelectRoleForModule';

const Module = ({ modulesData, loading, allMenuAndResourceChecked, handleSelectMenu, handleSelectChildMenu, handleSelectSubChildMenu, handleSelectParentInternalLinks, handleRoleChange, saveData }) => {

    
  const [clicked, setClicked] = useState("0");
  
 const handleToggle = (index) => {
  if (clicked === index) {
   return setClicked("0");
  }
  setClicked(index);
 };

//  check all menu true or false 
//  modulesData?.software_menus?.filter( software_menu => software_menu?.isChecked !== true).length < 1

 const isAllSelect = modulesData?.software_menus?.filter( software_menu => software_menu?.isTrue !== true).length < 1

    return (
        <>
            <div className="card">
              {
                loading ? (
                  <h3>Loading...</h3>
                ) : (
                  <>
                    <div className="card-header d-flex justify-content-between align-items-center" style={{height: 'auto !important'}}>
                        <div className="moduleAndRole  d-flex justify-content-start align-items-center">
                          <div className="form-check">
                              <input
                              checked={isAllSelect}
                              onChange={allMenuAndResourceChecked}
                              type="checkbox" name="allMenuSelect" className="form-check-input" id="all-select" />
                              <label className="form-check-label" htmlFor="all-select">{modulesData?.software_module?.module_name}</label>
                          </div>
                          <SelectRoleForModule handleRoleChange={handleRoleChange}/>
                        </div>
                        <button onClick={saveData} className="btn btn-sm btn-secondary">Save</button>
                    </div>
                    
                    <div className="card-body">
                      <ul className="list-group m-2">
                              {modulesData?.software_menus?.map((software_menu, index) => (
                                  <ParentMenu
                                    handleSelectMenu={handleSelectMenu}
                                    handleSelectChildMenu={handleSelectChildMenu}
                                    handleSelectParentInternalLinks={handleSelectParentInternalLinks}
                                    handleSelectSubChildMenu={handleSelectSubChildMenu}
                                    onToggle={() => handleToggle(index)}
                                    active={clicked === index}
                                    key={index} software_menu={software_menu} 
                                  />
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