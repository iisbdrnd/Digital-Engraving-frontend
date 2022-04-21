import React, { Fragment, useState, useEffect, useReducer } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SOFT_INTERNALLINK_RSURL, SOFTWARE_GETMODULES, SOFTWARE_GETMENUS } from '../../../api/adminUrl';
import { adminGetMethod, adminPutMethod } from '../../../api/action';
import useForm from "react-hook-form";
import { SubmitButton } from '../common/GlobalButton';

const Edit = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [resource, setResource] = useState(false);
    const [status, setStatus] = useState(true);
    const [folders, setFolder] = useState([]);
    const [modules, setModules] = useState([]);
    const [menus, setMenus] = useState([]);
    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            folder_id        : '',
            module_id        : '',
            menu_id          : '',
            route            : '',
            link_name        : '',
            resource_function: '',
            isLoading        : true
        }
    );

    const softLinkId = props.match.params.softLinkId;
    
    useEffect(() => {
        let response = adminGetMethod(`${SOFT_INTERNALLINK_RSURL}/${softLinkId}/edit`)
        .then(response => {
            console.log("allData", response.data);
            
            setFolder(response.data.software_folders);
            setResource(response.data.software_internal_link.resource == 0 ? false: true)
            setStatus(response.data.software_internal_link.status     == 0 ? false: true)
            setModules(response.data.software_modules)
            setMenus(response.data.software_menus_default)
            setUserInput({
                module_id        : response.data.selectedItem.module_id, 
                folder_id        : response.data.selectedItem.folder_id,
                menu_id          : response.data.software_internal_link.menu_id, 
                link_name        : response.data.software_internal_link.link_name, 
                route            : response.data.software_internal_link.route, 
                isLoading        : false
            });
        })
    }, [])

    const changeOption = (e) =>{
        let selectedValue = e.target.value;
        if (e.target.name == "folder_id") {
            if (selectedValue !== "") {
                let response = adminGetMethod(`${SOFTWARE_GETMODULES}/${selectedValue}`)
                    .then(response => {
                        setModules(response.data);
                    })
                .catch(error => toast.error(error))
            } else {
                setModules([]);
                setMenus([]);
            }
        } else if(e.target.name == "module_id") {
            if (selectedValue !== "") {
                let response = adminGetMethod(`${SOFTWARE_GETMENUS}/${selectedValue}`)
                    .then(response => {
                        setMenus(response.data);
                    })
                .catch(error => toast.error(error))
            } else {
                setMenus([]);
            }
        } else {
            setModules([]);
            setMenus([]);
        }
    }
    
    const submitHandler = (data) => {
        let response = adminPutMethod(`${SOFT_INTERNALLINK_RSURL}/${softLinkId}`, data)
            .then(response => {
                if (response.data.status == 1) {
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            })
        .catch(error => toast.error(error))
    }
    
    let folderOption = [];
    if (folders && folders.length > 0) {
        folderOption = folders.map((folder) => (<option key={folder.id} value={folder.id}>{folder.folder_name}</option>))
    }
    let moduleOption = [];
    if (modules && modules.length > 0) {
        moduleOption = modules.map((mod) => (<option key={mod.id} value={mod.id}>{mod.module_name}</option>))
    }
    let menuOption = [];
    if (menus && menus.length > 0) {
        menuOption = menus.map((menu) => (<option key={menu.id} value={menu.id}>{menu.menu_name}</option>))
    }
    return (
        <Fragment>
            <Breadcrumb title="Link Edit" parent="Internal Link" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Update Software Internal Link</h5>
                            </div>
                            <div className="card-body">
                            {userInput.isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                            (
                                <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label required" htmlFor="folder_id">Folder</label>
                                        <div className="col-sm-6">
                                            <select className="form-control" id="folder_id" name="folder_id" 
                                            defaultValue={userInput.folder_id}
                                            onChange={ changeOption }
                                            ref={register({
                                                required: 'Folder Field Required'
                                            })} >
                                                <option value="">Select Folder</option>
                                                {folderOption}
                                            </select>
                                            {errors.folder_id && <p className='text-danger'>{errors.folder_id.message}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label required" htmlFor="module_id">Module</label>
                                        <div className="col-sm-6">
                                            <select className="form-control" id="module_id" name="module_id" 
                                            defaultValue={userInput.module_id}
                                            onChange={ changeOption }
                                            ref={register({
                                                required: 'Module Field Required'
                                            })} >
                                                <option value="">Select Module</option>
                                                {moduleOption}
                                            </select>
                                            {errors.module_id && <p className='text-danger'>{errors.module_id.message}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label required" htmlFor="menu_id">Menu</label>
                                        <div className="col-sm-6">
                                            <select className="form-control" id="menu_id" name="menu_id" 
                                            defaultValue={userInput.menu_id}
                                            ref={register({
                                                required: 'Menu Field Required'
                                            })} >
                                                <option value="">Select Menu</option>
                                                {menuOption}
                                            </select>

                                            {errors.menu_id && <p className='text-danger'>{errors.menu_id.message}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label" htmlFor="inline-sqr-2">Using Resource</label>
                                        <div className="col-sm-6 checkbox checkbox-dark m-squar">
                                            <input id="inline-sqr-2" name='resource' type="checkbox" 
                                            ref={register} 
                                            onChange={() => setResource( !resource ) }
                                            />
                                            <label htmlFor="inline-sqr-2">{ !resource ? 'No' : 'Yes'}</label>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label" htmlFor="link_name">Link Name</label>
                                            <div className="col-sm-6">
                                                <input className="form-control" id="link_name" name="link_name" type="text" placeholder="Link Name"
                                                defaultValue={userInput.link_name}
                                                ref={register({
                                                    required: 'Link Name Field Required'
                                                })}
                                                />
                                                {errors.link_name && <p className='text-danger'>{errors.link_name.message}</p>}
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label required" htmlFor="route">Route</label>
                                            <div className="col-sm-6">
                                                <input className="form-control" id="route" name="route" type="text" placeholder="Route"
                                                defaultValue={userInput.route}
                                                ref={register({
                                                    required: 'Route Field Required'
                                                })}
                                                />
                                                {errors.route && <p className='text-danger'>{errors.route.message}</p>}
                                            </div>
                                        </div>
                                    </div>
                                        
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label" htmlFor="inline-sqr-3">Status</label>
                                        <div className="col-md-7 checkbox checkbox-dark m-squar">
                                            <input id="inline-sqr-3" name='status' type="checkbox" defaultChecked 
                                            ref={register} 
                                            onChange={() => setStatus( !status )}
                                            />
                                            <label htmlFor="inline-sqr-3">{status ? 'Yes' : 'No'}</label>
                                        </div>
                                    </div>
                                    <SubmitButton link="softInternalLink/list" />
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

export default Edit;