import React, { Fragment, useState, useEffect, useReducer } from 'react';
import { Accordion, AccordionItem } from 'react-light-accordion';
import 'react-light-accordion/demo/css/index.css';
import Collapsible from 'react-collapsible';
import CollapsibleTrigger from './CollapsibleTrigger';

import { ADMIN_ACCESS } from '../../../../api/adminUrl';
import { adminGetMethod } from '../../../../api/action';

const AccessLinkData = (props) => {
  const [selectAll, setSelectAll] = useState();
  const [adminInfo, setAdminInfo] = useState([]);
  const [adminMenu, setAdminMenu] = useState([]);

  const [userInput, setUserInput] = useReducer(
      (state, newState) => ({...state, ...newState}),{
        
      }
  );

  const adminId = props.adminId;
  
  useEffect (() => {
    let response = adminGetMethod(`${ADMIN_ACCESS}/${adminId}`)
        .then(response => {
            // setUserInput({ 
            //     name     : response.data.name, 
            //     email    : response.data.email, 
            //     username : response.data.username
            // });
            
            setAdminInfo(response.data.admin_info);
            setAdminMenu(response.data.admin_menus);
        })
        .catch(error => console.log(error))   
    }, [])

//   console.log('admin info',adminInfo);
//   console.log('admin menu',adminMenu);
  

    const changeHandler = () => {
        setUserInput({ 
        
        });
    }
  
    const DummyContent1 = () => (
        <div className="col-md-12">
            <div className="card">
                <div className="card-body animate-chk">
                    {/* <div className="row"> */}
                        <div className="col">
                            <label className="px-3" htmlFor="chk-ani">
                                <input className="checkbox_animated" id="chk-ani" type="checkbox" defaultChecked />
                                Option 1
                            </label>
                            <label className="px-3" htmlFor="chk-ani1">
                                <input className="checkbox_animated" id="chk-ani1" type="checkbox" />
                                Option 2
                            </label>
                            <label className="px-3" htmlFor="chk-ani2">
                                <input className="checkbox_animated" id="chk-ani2" type="checkbox" defaultChecked /> 
                                Option 3
                            </label>
                            <label className="px-3" htmlFor="chk-ani3">
                                <input className="checkbox_animated" id="chk-ani3" type="checkbox" />                                                
                                Option 4
                            </label>
                        </div>
                    {/* </div> */}
                </div>

            </div>
        </div>
    );

    // let timezoneOption = [];
    // if (this.state.timezones && this.state.timezones.length > 0) {
    //     timezoneOption = this.state.timezones.map((timezone) => (<option key={timezone.id} value={timezone.id}>{timezone.name}</option>))
    // }

  return (
    <Fragment>
        <div className="card">

            {adminMenu.map((menu) => (
                 

                    <div className="row">
                        <div className="col-md-1">
                            <label className="py-2 pull-right" htmlFor="chk-ani2">
                                <input className="checkbox_animated" id="chk-ani2" type="checkbox" 
                                onChange = {changeHandler}
                                /> 
                            </label>
                        </div>
                        <div className="col-md-10">
                            <Collapsible trigger={(  <CollapsibleTrigger headings = {menu.menu_name} />)} >
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-body animate-chk">
                                            {/* <div className="row"> */}
                                                <div className="col">
                                                    <label className="px-3" htmlFor="chk-ani">
                                                        <input className="checkbox_animated" id="chk-ani" type="checkbox" defaultChecked />
                                                        Option 1
                                                    </label>
                                                    <label className="px-3" htmlFor="chk-ani1">
                                                        <input className="checkbox_animated" id="chk-ani1" type="checkbox" />
                                                        Option 2
                                                    </label>
                                                    <label className="px-3" htmlFor="chk-ani2">
                                                        <input className="checkbox_animated" id="chk-ani2" type="checkbox" defaultChecked /> 
                                                        Option 3
                                                    </label>
                                                    <label className="px-3" htmlFor="chk-ani3">
                                                        <input className="checkbox_animated" id="chk-ani3" type="checkbox" />                                                
                                                        Option 4
                                                    </label>
                                                </div>
                                            {/* </div> */}
                                        </div>

                                    </div>
                                </div>
                                
                                {/* {menu.parent_id != 0 ? ( */}
                                    {adminMenu.map((chieldMenu) => (
                                        menu.id == chieldMenu.parent_id ?
                                            <div className = "row" style={{ paddingBottom: "1px"}}>
                                                <div className = "col-md-1">
                                                    <label className="py-2 pull-right" htmlFor="chk-ani2">
                                                        <input className="checkbox_animated" id="chk-ani2" type="checkbox" 
                                                        onChange = {changeHandler}
                                                        /> 
                                                    </label>
                                                </div>

                                                <div className = "col-md-11">
                                                    
                                                    <Collapsible trigger={( <CollapsibleTrigger headings = { chieldMenu.menu_name} />)} >
                                                        <div className="col-md-12">
                                                            <div className="card">
                                                                <div className="card-body animate-chk">
                                                                    {/* <div className="row"> */}
                                                                        <div className="col">
                                                                            <label className="px-3" htmlFor="chk-ani">
                                                                                <input className="checkbox_animated" id="chk-ani" type="checkbox" defaultChecked />
                                                                                    Option 1
                                                                            </label>
                                                                            <label className="px-3" htmlFor="chk-ani1">
                                                                                <input className="checkbox_animated" id="chk-ani1" type="checkbox" />
                                                                                Option 2
                                                                            </label>
                                                                            <label className="px-3" htmlFor="chk-ani2">
                                                                                <input className="checkbox_animated" id="chk-ani2" type="checkbox" defaultChecked /> 
                                                                                Option 3
                                                                            </label>
                                                                            <label className="px-3" htmlFor="chk-ani3">
                                                                                <input className="checkbox_animated" id="chk-ani3" type="checkbox" />                                                
                                                                                Option 4
                                                                            </label>
                                                                        </div>
                                                                    {/* </div> */}
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </Collapsible>
                                                    
                                                </div>
                                            </div>
                                        :''
                                    ))}
                                {/* ):''} */}

                            </Collapsible>
                        </div>

                    {/* <Accordion>
                        <AccordionItem className="card-header bg-primary" title="Welcome" style={{background: 'black'}}>
                        <DummyContent1 />
                        </AccordionItem>

                        <AccordionItem className="card-header bg-primary" title="Service">

                        <DummyContent1 />
                        </AccordionItem>
                        
                    </Accordion> */}
                    </div>
                
                
            ))}
        </div>

    </Fragment>
  );

}

export default AccessLinkData;