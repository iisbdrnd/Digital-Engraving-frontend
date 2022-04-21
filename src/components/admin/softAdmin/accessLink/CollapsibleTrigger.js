import React, {useState} from 'react';

const CollapsibleTrigger = (props) => {
    const [icon, setIcon] = useState(false)

    const changeIcon = () => {
        if (icon == false) {
            setIcon(true);
        }else{
            setIcon(false);
        }
    }

    return (
        <div style = {{cursor : "pointer"}} onClick = {changeIcon} className = 'bg-success p-2'>
            <b> { props.headings } </b>
            
            {icon == false ? 
                (<i className="pull-right fa fa-plus my-1"></i>)
                :
                (<i className="pull-right fa fa-minus my-1"></i>)
            }
        </div>
    )
}

export default CollapsibleTrigger;