// import React, { Fragment, useState, useEffect, useReducer } from 'react';
import React, { Component, Fragment } from 'react';
import { Accordion, AccordionItem } from 'react-light-accordion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-light-accordion/demo/css/index.css';
import Collapsible from 'react-collapsible';
import CollapsibleTrigger from './CollapsibleTrigger';
import { SubmitButton } from '../../../common/GlobalButton';

import { ADMIN_ACCESS, ADMIN_ACCESS_ACTION } from '../../../../api/adminUrl';
import { adminGetMethod, adminPostMethod } from '../../../../api/action';

const initialState ={
    menuId        : [],
    internalLinkId: []
}

class AccessLinkData extends Component {
    constructor(props) {
        super(props);
        this.myFrom = React.createRef();
        this.state = {
            adminId       : props.adminId,
            selectAll     : false,
            adminInfo     : [],
            adminMenu     : [],
            menuId        : [],
            internalLinkId: [],

            isLoading     : true
        }
    }
    
    componentDidMount() {
        adminGetMethod(`${ADMIN_ACCESS}/${this.state.adminId}`)
            .then(response => {
                if (response) {
                    // Insert a part time element in an array
                    let adminMenuInternalLinkList = [];
                    for (let index = 0; index < response.data.admin_menus.length; index++) {

                        if (response.data.admin_menus[index]['menu_access'] === null) {
                            response.data.admin_menus[index]['checkAllStatus'] = false;
                        }else{
                            response.data.admin_menus[index]['checkAllStatus'] = true;
                        }

                        adminMenuInternalLinkList = response.data.admin_menus[index].internal_links;
                        
                        for (let i = 0; i < adminMenuInternalLinkList.length; i++) {
                            
                            if (adminMenuInternalLinkList[i]['link_access'] === null) {
                                adminMenuInternalLinkList[i]['checkStatus'] = false;
                            }else{
                                adminMenuInternalLinkList[i]['checkStatus'] = true;
                            }
                        }
                    }

                    this.setState({
                        adminInfo: response.data.admin_info,
                        adminMenu: response.data.admin_menus,
                        selectAll: response.data.checkAll,

                        isLoading:false
                    })
                }
            })
            .catch(error => console.log(error))   
    }

    selectAllChangeHandler = (id, e) => { //id is menu id
        let itemName = e.target.name;
        let checked = e.target.checked;

        this.setState(prevState => {
            let { adminMenu, selectAll, menuId, internalLinkId } = prevState;
            menuId.push(id);

            if (itemName === "menuId") {
                let adminMenuList = [];
                for (let index = 0; index < adminMenu.length; index++) {
                    adminMenuList = adminMenu[index].internal_links;
                    
                    if (adminMenu[index].id === id && adminMenuList[index].checkStatus === false) {
                        for (let i = 0; i < adminMenuList.length; i++) {
                            if (id === adminMenuList[i]['menu_id']) {   
                                adminMenuList[i]['checkStatus'] = true;
                                if (adminMenuList[i]['checkStatus'] === true) {
                                    internalLinkId.push(adminMenuList[i]['id']);
                                }
                            }
                        }   
                    }else{
                        for (let i = 0; i < adminMenuList.length; i++) {
                            if (id === adminMenuList[i]['menu_id']) {   
                                adminMenuList[i]['checkStatus'] = false;
                                if (adminMenuList[i]['checkStatus'] === false) {
                                    // internalLinkId.push(adminMenuList[i]['id']);
                                    var arrIndex = adminMenuList.indexOf(adminMenuList[i]['id']);
                                    if (arrIndex > -1) {
                                        adminMenuList.splice(arrIndex, 1);
                                    }

                                }
                            }
                        } 
                        console.log('after delete', adminMenuList);
                        
                    }
                    
                }
                // console.log('mainData2 ', this.state.adminMenu);
                // console.log('all state ', this.state);
            }else{
                console.log('check ',adminMenu, id);
                console.log('internalLink Id', e.target);
                for (let index = 0; index < adminMenu.length; index++) {
                    if (adminMenu[index]['id'] === id) {
                        console.log(adminMenu[index]['id']);
                    }
                }
                // if (adminMenu.id === id) {
                //     console.log('admin menu id', adminMenu.id);
                    
                //     let adminMenuInternalLinkList = [];
                //     for (let index = 0; index < adminMenu.length; index++) {
                //         adminMenuInternalLinkList = adminMenu[index].internal_links;
                        
                //         console.log(adminMenuInternalLinkList[index].checkStatus, adminMenu[index].id, id);
                        
                //         if (adminMenuInternalLinkList[index].id === id && adminMenuInternalLinkList[index].checkStatus === false) {
                //             console.log('if false');
                            
                //             adminMenuInternalLinkList.checkStatus = true;
                //             internalLinkId.push(adminMenuInternalLinkList.id);
                            
                //             // for (let i = 0; i < adminMenuInternalLinkList.length; i++) {
                //             //     adminMenuInternalLinkList[i]['checkStatus'] = true;
                //             //     if (id === adminMenuInternalLinkList[i]['menu_id']) {   
                //             //         internalLinkId.push(adminMenuInternalLinkList[i]['id']);
                //             //     }
                //             // }   
                //         }else{
                //             console.log('if true');
                //             adminMenuInternalLinkList.checkStatus = false;

                //             // for (let i = 0; i < adminMenuInternalLinkList.length; i++) {
                //             //     if (id === adminMenuInternalLinkList[i]['menu_id']) {   
                //             //         adminMenuInternalLinkList[i]['checkStatus'] = false;
                //             //     }
                //             // } 
                //         }
                        
                //     }
                // }
            }

            // if (itemName === "checkAll") {
            //     selectAll = checked;
            //     menuId    = id;
            // }else {
            //     adminMenu = adminMenu.internal_links.map(item =>
            //       item.link_name === itemName ? { ...item, isChecked: checked } : item
            //     );
            //     selectAll = adminMenu.every(item => item.selectAll);
            // }

            return { adminMenu, selectAll };
        })

    }

    internalLinkChangeHandler = (selectMenuId, internalLinkCheckId, e) => {
        
        this.setState(prevState => {
            let { adminMenu, menuId, internalLinkId } = prevState;
            let adminMenuInternalLinkList = [];
            
            for (let index = 0; index < adminMenu.length; index++) {
                adminMenuInternalLinkList = adminMenu[index].internal_links;
                
                if (adminMenu[index].id === selectMenuId && adminMenu[index].checkAllStatus === false) {
                    adminMenu[index]['checkAllStatus'] = true;
                    if (adminMenu[index]['checkAllStatus'] === true) {
                        menuId.push(selectMenuId);
                    }  
                }
                // var menuIdIndex = adminMenu.indexOf(adminMenu[index]['id']);

                // if (menuIdIndex) {
                //     if(adminMenu[index].id === selectMenuId && adminMenu[index].checkAllStatus === true){
                //         adminMenu[index]['checkAllStatus'] = false;
                //         if (adminMenu[index]['checkAllStatus'] === false) {
                //             const adminMenuIdIndex = menuId.indexOf(adminMenu[index]['id']);

                //             if (adminMenuIdIndex > -1) {
                //                 adminMenu.splice(adminMenuIdIndex, 1);
                //             }
                //         }
                //         console.log('after delete', adminMenu);
                        
                //     }
                    
                // }
                console.log('menuId', menuId);
                
                if (adminMenu[index]['id'] === selectMenuId) {
                    for (let i = 0; i < adminMenuInternalLinkList.length; i++) {
                        if (internalLinkCheckId === adminMenuInternalLinkList[i]['id'] && adminMenuInternalLinkList[i].checkStatus === false) {   
                            if (internalLinkCheckId === adminMenuInternalLinkList[i]['id']) {    
                                adminMenuInternalLinkList[i]['checkStatus'] = true;
                            }
                            internalLinkId.push(adminMenuInternalLinkList[i]['id']);
                            // console.log('if internalLinkId',internalLinkId);
                            
                        }else if(internalLinkCheckId === adminMenuInternalLinkList[i]['id'] && adminMenuInternalLinkList[i].checkStatus === true){
                            const adminInternalLinkIdIndex = internalLinkId.indexOf(adminMenuInternalLinkList[i]['id']);

                            if (adminInternalLinkIdIndex > -1) {
                                internalLinkId.splice(adminInternalLinkIdIndex, 1);
                            }
                            console.log('internalLinkId after remove ',internalLinkId);
                        }
                        
                    }
                }
            }

        })
        // if (adminMenu.id === id) {
        //     console.log('admin menu id', adminMenu.id);
            
        //     let adminMenuInternalLinkList = [];
        //     for (let index = 0; index < adminMenu.length; index++) {
        //         adminMenuInternalLinkList = adminMenu[index].internal_links;
                
        //         console.log(adminMenuInternalLinkList[index].checkStatus, adminMenu[index].id, id);
                
        //         if (adminMenuInternalLinkList[index].id === id && adminMenuInternalLinkList[index].checkStatus === false) {
        //             console.log('if false');
                    
        //             adminMenuInternalLinkList.checkStatus = true;
        //             internalLinkId.push(adminMenuInternalLinkList.id);
                    
        //             // for (let i = 0; i < adminMenuInternalLinkList.length; i++) {
        //             //     adminMenuInternalLinkList[i]['checkStatus'] = true;
        //             //     if (id === adminMenuInternalLinkList[i]['menu_id']) {   
        //             //         internalLinkId.push(adminMenuInternalLinkList[i]['id']);
        //             //     }
        //             // }   
        //         }else{
        //             console.log('if true');
        //             adminMenuInternalLinkList.checkStatus = false;

        //             // for (let i = 0; i < adminMenuInternalLinkList.length; i++) {
        //             //     if (id === adminMenuInternalLinkList[i]['menu_id']) {   
        //             //         adminMenuInternalLinkList[i]['checkStatus'] = false;
        //             //     }
        //             // } 
        //         }
                
        //     }
        // }
    }


    submitHandler = (e) => {
        e.preventDefault();

        // console.log("Internam Link Id ", this.state.internalLinkId,"Menu Id", this.state.menuId);
        const postData = {
            menu_id: this.state.menuId,
            admin_id: this.state.adminId,
            link_id: this.state.internalLinkId
        }
        console.log("Post data",postData);
        
        let response = adminPostMethod(ADMIN_ACCESS_ACTION, postData)
            .then(response => { 
                if (response.data.status == 1) { toast.success(response.data.message) } else { toast.error(response.data.message) }
            })
            .catch(error => { toast.error(`getMethod Error from ${error}`)});
            
        this.setState({
            ...initialState
        });
        
        // const postData = {
        //     project_id: this.state.project_id,
        //     name: this.state.name,
        //     surname: this.state.surname,
        //     email: this.state.email,
        //     designation: this.state.designation,
        //     timezone_id: this.state.timezone_id,
        // }
        
        // let response = adminPostMethod(usersRsurl, postData)
        //     .then(response => { 
        //         if (response.data.status == 1) { toast.success(response.data.message) } else { toast.error(response.data.message) }
        //     })
        //     .catch(error => { toast.error(`getMethod Error from ${error}`)});
        
        // this.myFrom.current.reset();
        // this.setState({
        //     ...initialState
        // });
    }

    render() {
        return (
            <Fragment>
                {this.state.isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                (
                <form onSubmit={this.submitHandler}>
                    <div className="card-body">
                        <div className="col-sm-12 col-xl-12">
                            <div className="default-according panel-accordion" id="accordionclose">
                                <div className="card">
                                    {this.state.adminMenu.map((menu) => {
                                        return (   
                                            <div className="row" key={menu.id}>
                                                
                                                <div className="col-md-1">
                                                    <label className="py-2 pull-right" htmlFor="chk-ani2">
                                                        <input className="checkbox_animated" value={menu.id} name="menuId" 
                                                        data-id={menu.id} 
                                                        defaultChecked={menu.checkAllStatus}
                                                        id="chk-ani2" type="checkbox" 
                                                        onChange={e => this.selectAllChangeHandler(menu.id, e)}
                                                        
                                                        /> 
                                                    </label>
                                                </div>
                                                
                                                <div className="col-md-10">
                                                    <Collapsible trigger={( <CollapsibleTrigger headings = {menu.menu_name} />)} >
                                                        <div className="col-md-12">
                                                            <div className="card">
                                                                <div className="card-body animate-chk">

                                                                    <div className="col">
                                                                        {menu.internal_links.map((internalLink, index) => {
                                                                            return ( 
                                                                                <label className="px-3" htmlFor="chk-ani" key={index}>
                                                                                    <input 
                                                                                    className="checkbox_animated"
                                                                                    name={internalLink.link_name}
                                                                                    id={internalLink.id}
                                                                                    type="checkbox" 
                                                                                    
                                                                                    checked={internalLink.checkStatus}
                                                                                    onChange={e => this.internalLinkChangeHandler(menu.id,internalLink.id, e)}
                                                                                    />
                                                                                    {internalLink.link_name}
                                                                                
                                                                                </label>
                                                                            )
                                                                            
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

                                    <SubmitButton link="admin/softAdmin/list" />

                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                
                )}

            </Fragment>
                
        )
    };
}

export default AccessLinkData;