import React, { useState, Fragment } from 'react';
import CustomMultiSelect from './CustomMultiSelect';
import MenuItems from './MenuItems';

const MultiMenu = (props) => {
    const [allMenus, setInternalLink] = useState(props.menuWithInternalLinks.menuAndLink);
    let [validInternalLink, setvalidInternalLink] = useState({links: [], check: ''});
    
    return (

        <Fragment>
            <div className="default-according panel-accordion" id="accordionclose">
                <MenuItems menuList={allMenus}/>
            </div>
        </Fragment>
    );
}
export default MultiMenu;