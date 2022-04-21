import React, { useState, useEffect } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';



const CustomMultiSelect = (props) => {

    const ref = React.createRef();
    return (
            <div>
                <Multiselect
                    options={props.defaultSelected} 
                    displayValue="link_name"
                    //defaultSelected={props.internalLinkData}
                    // selectedValues={props.internalLinkData}
                    selectedValues={props.SelectedValue}
                    placeholder="Select Any"
                    closeIcon="close"
                    onSelect={props.onSelectInternalLink}
                    onRemove={props.onRemoveInternalLink}
                    ref={ref}
                />
            </div>
    );
}
export default CustomMultiSelect;