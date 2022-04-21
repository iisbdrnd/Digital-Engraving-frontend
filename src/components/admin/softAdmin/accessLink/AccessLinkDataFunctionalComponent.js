import React, { Fragment, useState, useEffect, useReducer } from 'react';
import { Accordion, AccordionItem } from 'react-light-accordion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-light-accordion/demo/css/index.css';
import Collapsible from 'react-collapsible';
import CollapsibleTrigger from './CollapsibleTrigger';

import { ADMIN_ACCESS, ADMIN_ACCESS_ACTION } from '../../../../api/adminUrl';
import { adminGetMethod, adminPostMethod } from '../../../../api/action';

import useForm from "react-hook-form";

const AccessLinkData = (props) => {
  const [selectAll, setSelectAll]       = useState(false);
  const [adminInfo, setAdminInfo]       = useState([]);
  const [adminMenu, setAdminMenu]       = useState([]);

  const [userInput, setUserInput] = useReducer(
      (state, newState) => ({...state, ...newState}),{
        
      }
  );

  const adminId = props.adminId;
  
  useEffect (() => {
    adminGetMethod(`${ADMIN_ACCESS}/${adminId}`)
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
  
    const selectAllChangeHandler = (id) => {
        console.log('id',id);
        
        // const value = target.name === 'selectAll' ? target.checked : target.value;
        // const name = target.name;
        
        if (selectAll === false) {
            setSelectAll(true);
        }else{
            setSelectAll(false);
        }

        // const data = {
        //     menu_id: id,
        //     admin_id: adminId
        // }

        // adminPostMethod(ADMIN_ACCESS_ACTION, data)
        //     .then(response => {
        //         console.log(response.data);
        //         if (response.data.status === 1) {
        //             toast.success(response.data.message)
        //         } else {
        //             toast.error(response.data.message)
        //         }
        //     })
        // .catch(error => toast.error(error))
        
        // this.setState({
        //   [name]: value
        // });
    }



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
          {console.log(selectAll)}
          
        <div className="card">
            {adminMenu.map((menu) => {
                return (    
                    <div className="row" key={menu.id}>
                        <div className="col-md-1">
                            <label className="py-2 pull-right" htmlFor="chk-ani2">
                                <input className="checkbox_animated" name="selectAll" data-id={menu.id} id="chk-ani2" type="checkbox"
                                onClick={e => selectAllChangeHandler(menu.id)}/> 
                            </label>
                        </div>
                        {/* <div className="col-md-10">
                            <Collapsible trigger={( <CollapsibleTrigger headings = {menu.menu_name} />)} > 
                            </Collapsible>
                        </div> */}
                        <div className="col-md-10">
                            <Collapsible trigger={( <CollapsibleTrigger headings = {menu.menu_name} />)} >
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-body animate-chk">

                                            <div className="col">
                                                {menu.internal_links.map((internalLink, index) => {
                                                    return  internalLink.link_access || selectAll === true ? 
                                                        <label className="px-3" htmlFor="chk-ani" key={index}>
                                                            <input className="checkbox_animated" name="add" id="chk-ani" type="checkbox" checked/>
                                                            {internalLink.link_name}
                                                        </label>
                                                            
                                                        :

                                                        <label className="px-3" htmlFor="chk-ani" key={index}>
                                                            <input className="checkbox_animated" name="add" id="chk-ani" type="checkbox" />
                                                            {internalLink.link_name}
                                                        </label>
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                

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
                    
                    
                )
            })}
        </div>

    </Fragment>
  );

}

export default AccessLinkData;