import React, { useState, Fragment } from 'react';
import CustomMultiSelect from './CustomMultiSelect';

const MultiMenu = (props) => {
    // const [internalLink, setInternalLink] = useState(props.menuWithLinks.internal_links);

    // const [internalLink, setInternalLink] = useState(props.menuWithLinks.menu_access != null ? props.menuWithLinks.internal_links : []);
    const [internalLink, setInternalLink] = useState(props.menuWithLinks.internal_links);

    let [validInternalLink, setvalidInternalLink] = useState({links: [], check: ''});
    
    if (props.menuWithLinks.menu_access != null && validInternalLink.check != 'empty') {
        for(var i=0;i<=props.menuWithLinks.internal_links.length-1;i++){
            if(props.menuWithLinks.internal_links[i].link_access != null){
                validInternalLink.links.push(props.menuWithLinks.internal_links[i]);
            } 
        }
    }
      
    const [selectValue , setSelectValue] = useState(props.menuWithLinks.menu_access != null ? 1 : 0);

    // setSelectValue(props.menuWithLinks.menu_access != null ? 1 : 0) 

    const changeMenuSelect = (e, menu_id, internal_link_id)=>{
        setSelectValue(e.target.value);
        if (e.target.value == 1) {
            //pass onChange data to accessing system
            props.onChange(menu_id, e.target.value, internal_link_id);
            if (props.menuWithLinks.menu_access != null && validInternalLink.check != 'empty') {
                for(var i=0;i<=props.menuWithLinks.internal_links.length-1;i++){
                    if(props.menuWithLinks.internal_links[i].link_access != null){
                        validInternalLink.links.push(props.menuWithLinks.internal_links[i]);
                    } 
                }
            }else{
                setvalidInternalLink({links: props.menuWithLinks.internal_links, check: 'empty'});
            }
            // setvalidInternalLink(props.menuWithLinks.internal_links);
        }else{   
            // console.log('when no', validInternalLink);
            // setvalidInternalLink([]);
            props.onChange(menu_id); 
            setvalidInternalLink({links: [], check: 'empty'});
            // console.log('when no after', validInternalLink);
        }
    }   

    console.log('check', props.menuWithLinks);

    return (
        <Fragment>
            <div className={`row accessMenu`}>
                
                {/* <div className="form-group row offset-md-2 mt-10">
                    <div className="checkbox checkbox-dark">
                        <input id="inline-1" type="checkbox" />
                        <label for="inline-1">{props.menuWithLinks.menu_name} {(props.menuWithLinks.resource == 1) ? '( Resource )' : '( Single )' }</label>
                    </div>
                </div> */}
                <div className="form-group row">
                    <label className="accessMenuName col-sm-8" htmlFor="chk-ani2">
                        {props.menuWithLinks.menu_name} {(props.menuWithLinks.resource == 1) ? '( Resource )' : '( Single )' }
                    </label> 
                    <div className="col-sm-7">
                        <select className="menuSelect" name="menu[]" onChange={(e) => {
                            if (props.menuWithLinks.internal_links != []) {
                                changeMenuSelect(e, props.menuWithLinks.id, props.menuWithLinks.internal_links);
                            }else{
                                changeMenuSelect(e, props.menuWithLinks.id);
                            }

                        }}
                        value = {selectValue}
                        >
                            <option value="">Select</option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row offset-md-1 mt-10">
                    <div className="col-sm-12 m-checkbox-inline">
                        <div className="checkbox checkbox-dark">
                            <input id="inline-1" type="checkbox" />
                            <label for="inline-1">Add</label>
                        </div>
                        <div className="checkbox checkbox-dark">
                            <input id="inline-2" type="checkbox" />
                            <label for="inline-2">Edit</label>
                        </div>
                        <div className="checkbox checkbox-dark">
                            <input id="inline-3" type="checkbox" />
                            <label for="inline-3">Delete</label>
                        </div>
                        <div className="checkbox checkbox-dark">
                            <input id="inline-4" type="checkbox" />
                            <label for="inline-4">Show</label>
                        </div>
                    </div>
                </div>
            </div>
            {/* {
                props.menuWithLinks.resource ?
                    <div className="multiSelect" style={{'width': '60%', 'marginBottom': '10px' }}>
                        {
                            validInternalLink != [] ? 
                                <CustomMultiSelect 
                                    defaultSelected={internalLink}
                                    SelectedValue={validInternalLink.links}
                                    onSelectInternalLink={props.onSelectInternalLink}
                                    onRemoveInternalLink={props.onRemoveInternalLink}
                                />
                            : null
                        }
                    </div>
                : null
            } */}
        </Fragment>
    );
}
export default MultiMenu;