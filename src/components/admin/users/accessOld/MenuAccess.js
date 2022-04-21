import React, { Fragment } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';

export const MenuAccess = ()=>{

    function onSelect(selectedList, selectedItem) {
        
    }
     
    function onRemove(selectedList, removedItem) {
        
    }

    return(
        <Fragment>
            <div className="card">
                <div className="col-sm-12 col-xl-12">
                    <form className="theme-form">
                        <div className="col-md-10">

                            <div className="row accessMenu">
                                <label className="accessMenuName" htmlFor="chk-ani2">
                                    Hello
                                </label>
                                <select className="menuSelect ">
                                    <option value="">Yes</option>
                                    <option value="">No</option>
                                </select>
                                <div className="multiSelect">
                                    <Multiselect
                                        // options={}
                                        placeholder="Select One"
                                        // selectedValues={this.state.selectedValue}  
                                        onSelect={onSelect}
                                        onRemove={onRemove} 
                                        displayValue="name" 
                                        closeIcon="close"
                                        onSearch={() => {
                                            
                                        }}
                                    />
                                </div>
                            </div>
                            
                        </div>
                            
                    </form>

                    {/* <SubmitButton link="admin/projectRegister/list" /> */}

                </div>
            </div>
            
            
        </Fragment>
    );
}