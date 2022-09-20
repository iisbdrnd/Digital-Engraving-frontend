import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SubmitButton } from '../common/GlobalButton';
import { SOFTWARE_MENU_RSURL, SOFTWARE_GETMODULES } from '../../../api/adminUrl';
import { adminPostMethod, adminGetMethod } from '../../../api/action';
import useForm from "react-hook-form";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const Create = () => {
    const { handleSubmit, register, errors } = useForm();
    const [resource, setResource] = useState(false)
    const [status, setStatus] = useState(true)
    const [is_report, setIs_report] = useState(true)
    const [folders, setFolder] = useState([]);
    const [modules, setModules] = useState([]);
    const [moduleValue, setModuleValue] = useState(0);

    const submitHandler = (data) => {
        data.module_id = moduleValue;

        adminPostMethod(SOFTWARE_MENU_RSURL, data)
            .then(response => {
                if (response.data.status == 1) {
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            })
        .catch(error => toast.error(error))
    }
    
    useEffect(() => {
        adminGetMethod(`${SOFTWARE_MENU_RSURL}/create`)
            .then(response => {
                // FOR FOLDER
                setFolder(response.data.software_folders);
            })
        .catch(error => toast.error(error))
    },[])

    const changeFolder = (e) =>{
        const selectedValue = e.target.value;
        if (selectedValue !== "") {
            adminGetMethod(`${SOFTWARE_GETMODULES}/${selectedValue}`)
                .then(response => {
                    // FOR DESIGNATION
                    let moduleOption = [];
                    if (response.data && response.data.length > 0) {
                        response.data.map(module => 
                        {
                            let moduleObj = {};
                            moduleObj.id = module.id;
                            moduleObj.name = module.module_name;
                            moduleOption.push(moduleObj);
                        })
                    }
                    setModules(moduleOption);
                })
            .catch(error => toast.error(error))
        } else {
            setModules([]);
        }
    }

    const dropDownChange = (event) =>{
        if(event.length > 0){
            const selectedValue = event[0].id;
            setModuleValue(selectedValue);
        } 
    }

    let folderOption = [];
    if (folders && folders.length > 0) {
        folderOption = folders.map((folder) => (<option key={folder.id} value={folder.id}>{folder.folder_name}</option>))
    }
    return (
        <Fragment>
            <Breadcrumb title="Menu Add" parent="Menu" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Add Software Menu</h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                    <div className="form-group row offset-md-1">
                                        <label className="col-sm-2 col-form-label required" htmlFor="folder_id">Folder</label>
                                        <div className="col-sm-9">
                                            <select className="form-control" id="folder_id" name="folder_id" 
                                            defaultValue=""
                                            onChange={ changeFolder }
                                            ref={register({
                                                required: 'Folder Field Required'
                                            })}>
                                                <option value="">Select Folder</option>
                                                {folderOption}
                                            </select>
                                            {errors.folder_id && <p className='text-danger'>{errors.folder_id.message}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group row offset-md-1">
                                        <label className="col-sm-2 col-form-label required" htmlFor="module_id">Module</label>
                                        <div className="col-sm-9">
                                            <Typeahead
                                                id="module_id"
                                                labelKey={option => `${option.name}`}
                                                options={modules}
                                                placeholder="Select Folder..."
                                                onChange={(e) => dropDownChange(e)}
                                                ref={register({
                                                    required: 'Module Field Required'
                                                })}
                                            />
                                            {errors.module_id && <p className='text-danger'>{errors.module_id.message}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group row offset-md-1">
                                        <label className="col-sm-2 col-form-label required" htmlFor="menu_name">Menu Name</label>
                                        <div className="col-sm-9">
                                            <input  className="form-control" id="menu_name"  name="menu_name"  type="text"  placeholder="Menu Name"
                                                ref={register({
                                                    required: 'Menu Name Field Required'
                                                })}
                                            />
                                            {errors.menu_name && <p className='text-danger'>{errors.menu_name.message}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group row offset-md-1">
                                        <label className="col-sm-2 col-form-label" htmlFor="inline-sqr-2">Using Resource</label>
                                        <div className="col-sm-9 checkbox checkbox-dark m-squar">
                                            <input id="inline-sqr-2" name='resource' type="checkbox" 
                                            ref={register} 
                                            onChange={() => setResource( !resource ) }
                                            />
                                            <label htmlFor="inline-sqr-2">{ !resource ? 'No' : 'Yes'}</label>
                                        </div>
                                    </div>

                                    { resource == false ?
                                        
                                        (<div className="form-group row offset-md-1">
                                            <label className="col-sm-2 col-form-label" htmlFor="route">Route</label>
                                            <div className="col-sm-9">
                                                <input className="form-control" id="route" name="route" type="text" placeholder="Route"
                                                ref={register({
                                                    required: 'Route Field Required'
                                                })}
                                                />
                                                {errors.route && <p className='text-danger'>{errors.route.message}</p>}
                                            </div>
                                        </div>)
                                        :
                                        (
                                            <div className="row offset-md-1">
                                                <div className="form-group row col-sm-6">
                                                    <label className="col-sm-4 col-form-label" htmlFor="link_name">Main Link</label>
                                                    <div className="col-sm-8">
                                                        <input className="form-control" id="link_name" name="link_name" type="text" placeholder="Main Link"
                                                        ref={register({
                                                            required: 'Main Link Field Required'
                                                        })}
                                                        />
                                                        {errors.link_name && <p className='text-danger'>{errors.link_name.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="form-group row col-sm-6">
                                                    <label className="col-sm-3 col-form-label" htmlFor="resource_function">Resource Function</label>
                                                    <div className="col-sm-8">
                                                        <select className="form-control" ref={register}  id="resource_function" name="resource_function">
                                                            <option> Select One </option>
                                                            <option value = "index"> index </option>
                                                            <option value = "create"> create </option>
                                                            <option value = "show"> show </option>
                                                            <option value = "edit"> edit </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    <div className="form-group row offset-md-1">
                                        <label className="col-sm-2 col-form-label" htmlFor="inline-sqr-3">Status</label>
                                        <div className="col-md-7 checkbox checkbox-dark m-squar">
                                            <input id="inline-sqr-3" name='status' type="checkbox" defaultChecked 
                                            ref={register} 
                                            onChange={() => setStatus( !status )}
                                            />
                                            <label htmlFor="inline-sqr-3">{status ? 'Yes' : 'No'}</label>
                                        </div>
                                    </div>
                                    <div className="form-group row offset-md-1">
                                        <label className="col-sm-2 col-form-label" htmlFor="inline-sqr-4">Report Menu?</label>
                                        <div className="col-md-7 checkbox checkbox-dark m-squar">
                                            <input id="inline-sqr-4" name='is_report' type="checkbox" ref={register} 
                                            onChange={() => setIs_report( !is_report )}/>
                                            <label htmlFor="inline-sqr-4">{is_report ? 'No' : 'Yes'}</label>
                                        </div>
                                    </div>
                                    <SubmitButton link="softMenu/list" />
                                
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