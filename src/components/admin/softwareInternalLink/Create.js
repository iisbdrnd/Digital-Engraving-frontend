import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SubmitButton } from '../common/GlobalButton';
import { SOFT_INTERNALLINK_RSURL, SOFTWARE_GETMODULES, SOFTWARE_GETMENUS } from '../../../api/adminUrl';
import { adminPostMethod, adminGetMethod } from '../../../api/action';
import useForm from "react-hook-form";

const Create = () => {
    const { handleSubmit, register, errors } = useForm();
    const [resource, setResource] = useState(false)
    const [status, setStatus] = useState(true)
    const [folders, setFolder] = useState([]);
    const [modules, setModules] = useState([]);
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        let response = adminGetMethod(`${SOFT_INTERNALLINK_RSURL}/create`)
            .then(response => {
                setFolder(response.data.software_folders);
            })
        .catch(error => toast.error(error))
    },[])

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
        let response = adminPostMethod(SOFT_INTERNALLINK_RSURL, data)
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
            <Breadcrumb title="Link Add" parent="Internal Link" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Add Software Internal Link</h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label required" htmlFor="folder_id">Folder</label>
                                        <div className="col-sm-6">
                                            <select className="form-control" id="folder_id" name="folder_id" 
                                            defaultValue=""
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
                                            defaultValue=""
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
                                            defaultValue=""
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

                                    { resource == false ?
                                        (
                                            <div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label" htmlFor="link_name">Link Name</label>
                                                    <div className="col-sm-6">
                                                        <input className="form-control" id="link_name" name="link_name" type="text" placeholder="Link Name"
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
                                                        ref={register({
                                                            required: 'Route Field Required'
                                                        })}
                                                        />
                                                        {errors.route && <p className='text-danger'>{errors.route.message}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                        :
                                        (
                                            <div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label" htmlFor="link_add">Link Name</label>
                                                    <div className="row col-sm-10">
                                                        <div className="col-sm-3">
                                                            <input className="form-control" id="link_add" name="link_name_add" type="text" placeholder="Add Link"
                                                            ref={register}
                                                            />
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <input className="form-control" id="link_name_edit" name="link_name_edit" type="text" placeholder="Edit Link"
                                                            ref={register}
                                                            />
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <input className="form-control" id="link_name_delete" name="link_name_delete" type="text" placeholder="Delete Link"
                                                            ref={register}
                                                            />
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <input className="form-control" id="link_name_show" name="link_name_show" type="text" placeholder="Show Link"
                                                            ref={register}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label required" htmlFor="route">Main Link</label>
                                                    <div className="col-sm-6">
                                                        <input  className="form-control" id="route"  name="route"  type="text"  placeholder="Main Link"
                                                            ref={register({
                                                                required: 'Main Link Field Required'
                                                            })}
                                                        />
                                                        {errors.route && <p className='text-danger'>{errors.route.message}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }

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
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Create;