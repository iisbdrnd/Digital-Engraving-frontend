import React, { useState, Fragment } from 'react';
import CustomMultiSelect from './CustomMultiSelect';

const SingleMenu = (props) => {
    const [internalLink, setInternalLink] = useState([]);

    const changeMenuSelect = (e)=>{
        setInternalLink(props.internalLink);
    }
    return (
        <Fragment>
            <div className={`row accessMenu`}>
                <label className="accessMenuName" htmlFor="chk-ani2">
                    {props.menuName}
                </label>
                <select className="menuSelect" onChange={(e) => changeMenuSelect(e)}>
                    <option value="">Select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
            </div>
        </Fragment>
    );
}
export default SingleMenu;