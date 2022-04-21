import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SOFT_INTERNALLINK_RSURL, SOFTWARE_GETMODULES, SOFTWARE_GETMENUS, SOFT_MENU_SORTING_ACTION } from '../../../api/adminUrl';
import { adminPostMethod, adminGetMethod } from '../../../api/action';
import { Navigation, Box, Layers, ArrowDown, ArrowUp } from 'react-feather';
import { createNestedMenu, generateFlatMenu, menus } from "./SortingHelper";
import Nestable from "react-nestable";

const formCss = {background: "#ffffff73", padding:"10px"}

const MenuSorting = () => {
    const [folders, setFolder] = useState([]);
    const [modules, setModules] = useState([]);
    // const [menus, setMenus] = useState([]);
    const [itemsTemp, setItemsTemp] = useState([]);
    const [saveButton, setSaveButton] = useState('false');
    const [isLoading, setIsLoading] = useState();

    const handleGenerate = () => {
        const flatMenu = generateFlatMenu(itemsTemp);
    }

    useEffect(() => {
        let response = adminGetMethod(`${SOFT_INTERNALLINK_RSURL}/create`)
            .then(response => {
                setFolder(response.data.software_folders);
            })
        .catch(error => toast.error(error));

        // setItemsTemp(createNestedMenu(menus));
    },[])
    
    const changeFolder = (e) =>{
        const selectedFolder_id = e.target.value;
        if (selectedFolder_id != '') {
            let response = adminGetMethod(`${SOFTWARE_GETMODULES}/${selectedFolder_id}`)
                .then(response => {
                    setModules(response.data);
                    setItemsTemp([]);
                    setSaveButton('false');
                })
            .catch(error => toast.error(error))
        } else {
            setModules([]);
        }
    }

    const clickModule = (module_id) =>{
        console.log('module_id', module_id);

        let response = adminGetMethod(`${SOFTWARE_GETMENUS}/${module_id}`)
            .then(response => {
                console.log('response data ',response.data);
                setIsLoading(true);
                setTimeout(function(){
                    setItemsTemp(createNestedMenu(response.data));
                    setIsLoading(false);
                    
                    setSaveButton('true');
                }, 2000);
            })
        .catch(error => toast.error(error));
        
        
        // if (module_id != '') {
        //     <Nestable
        //         items={items}
        //         renderItem={renderItem}
        //     />
        // }

        // if (module_id != '') {
        //     let response = adminGetMethod(`${SOFTWARE_MENU_SORT_LIST}/${module_id}`)
        //         .then(response => {
        //             // setModules(response.data);
        //         })
        //     .catch(error => toast.error(error))
        // } else {
        //     // setModules([]);
        // }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        
        const postData = {
            requestData : itemsTemp 
        }
        let response = adminPostMethod(SOFT_MENU_SORTING_ACTION, postData)
            .then(response => {
                if (response.data.status == 1) {
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            })
        .catch(error => toast.error(error))
    }

    const handleOnChangeSort = (items) => {
        setItemsTemp(items);
        // console.log('handleOnChangeSort',itemsTemp);
    }
    // console.log('outside of handleOnChangeSort',itemsTemp);
    let folderOption = [];
    if (folders && folders.length > 0) {
        folderOption = folders.map((folder) => (<option key={folder.id} value={folder.id}>{folder.folder_name}</option>))
    }
    let moduleGrid = [];
    if (modules && modules.length > 0) {
        moduleGrid = modules.map((mod) => (
        <div className="col-sm-6 col-xl-3 col-lg-6" key={mod.id}>
            <div className="card o-hidden">
                <div className="bg-primary b-r-4 card-body cursor-pointer" onClick={() => clickModule(mod.id)}>
                    <div className="media static-top-widget">
                        <div className="align-self-center text-center">
                            <Navigation />
                        </div>
                        <div className="media-body">
                            <span className="m-0">{mod.module_name}</span>
                            <Navigation className="icon-bg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>)
        )
    }
    return (
        <Fragment>
            <Breadcrumb title="Menu Sorting" parent="Software" />
            <div className="container-fluid">
                <div className="card" style={formCss}>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header"><h5>Folder Grid</h5></div>
                                <div className="card-body py-3">
                                    <div className="form-group row offset-md-2">
                                        <label className="col-sm-2 col-form-label required" htmlFor="folder_id">Folder</label>
                                        <div className="col-sm-6">
                                            <select className="form-control" id="folder_id" name="folder_id" 
                                            defaultValue=""
                                            onChange={changeFolder} >
                                                <option value="">Select Folder</option>
                                                {folderOption}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {moduleGrid}
                                    </div>
                                </div>
                            </div>

                            
                            <div className="card">
                                {/* <div className="card-header"><h5>Module Name</h5></div> */}
                                {isLoading ? (<img style={{position: 'absolute', marginLeft: '35px'}} src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <form className="form theme-form" onSubmit = {submitHandler}>
                                        <div className="card-body">
                                            {/* <div className="row"> */}
                                                <Nestable 
                                                    collapsed={true}
                                                    maxDepth={3}
                                                    items={itemsTemp}
                                                    renderItem={({ item, collapseIcon }) => (
                                                    <div className="listMenu" >
                                                        {collapseIcon}
                                                        {item.menu_name}
                                                    </div>
                                                    )}
                                                    onChange={handleOnChangeSort}
                                                    renderCollapseIcon={({ isCollapsed }) =>
                                                    isCollapsed ? (
                                                        <span className="iconCollapse">+</span>
                                                    ) : (
                                                        <span className="iconCollapse">-</span>
                                                    )
                                                    }
                                                />

                                            {/* </div> */}
                                        </div>
                                        {(saveButton == 'true') ?
                                            <div className="card-footer">
                                                <button style={{marginLeft: '7px'}} className="btn btn-primary mr-1" type="submit">Save</button>
                                            </div>
                                        :
                                        ''}
                                    </form>
                                
                                )}
                            </div>    
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default MenuSorting;