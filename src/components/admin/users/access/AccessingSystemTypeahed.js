import React, { Fragment, useState } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { menuRsURL } from '../../../../api/adminUrl';
import { adminPostMethod } from '../../../../api/action';
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';

import { adminMe, ADMIN_ACCESS, ADMIN_ACCESS_ACTION } from '../../../../api/adminUrl';
// import { adminGetMethod, adminPostMethod } from '../../../../api/action';

import Typeahead from './typeahead';

const AccessingSystem = () => {

    var array = [
        {name: 'Alabama', region: 'South'},
        {name: 'Thakurgaon', region: 'East'}
    ];
    console.log(array);
    // useEffect(() => {
    //     adminGetMethod(`${ADMIN_ACCESS}/${this.state.adminId}`)
    //         .then(response => {
    //             if (response) {
    //                 // Insert a part time element in an array
    //                 let adminMenuInternalLinkList = [];
    //                 for (let index = 0; index < response.data.admin_menus.length; index++) {

    //                     if (response.data.admin_menus[index]['menu_access'] === null) {
    //                         response.data.admin_menus[index]['checkAllStatus'] = false;
    //                     }else{
    //                         response.data.admin_menus[index]['checkAllStatus'] = true;
    //                     }

    //                     adminMenuInternalLinkList = response.data.admin_menus[index].internal_links;
                        
    //                     for (let i = 0; i < adminMenuInternalLinkList.length; i++) {
                            
    //                         if (adminMenuInternalLinkList[i]['link_access'] === null) {
    //                             adminMenuInternalLinkList[i]['checkStatus'] = false;
    //                         }else{
    //                             adminMenuInternalLinkList[i]['checkStatus'] = true;
    //                         }
    //                     }
    //                 }

    //                 this.setState({
    //                     adminInfo: response.data.admin_info,
    //                     adminMenu: response.data.admin_menus,
    //                     selectAll: response.data.checkAll,

    //                     isLoading:false
    //                 })
    //             }
    //         })
    //         .catch(error => console.log(error))  
    // }, [])
    
    return (
        
        <Fragment>
            <Breadcrumb title="Project Accessing System" parent="Project Register" />
            <div className="card-body">
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
                                    <Typeahead data={array} />
                                </div>
                            </div>
                        
                        </div>
                            
                    </form>

                    {/* <SubmitButton link="admin/projectRegister/list" /> */}

                </div>
            </div>
        
        </Fragment>
    );
};

export default AccessingSystem;