import React, { Fragment, useState, useEffect, useReducer } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SubmitButton } from '../../common/GlobalButton';
import { SOFTWARE_MODULE_RSURL } from '../../../api/adminUrl';
import { adminPutMethod, adminGetMethod } from '../../../api/action';
import useForm from "react-hook-form";

const Edit = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [status, setStatus] = useState(true)
    const [folders, setFolder] = useState([]);
    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            module_name : "",
            url_prefix  : "",
            route_prefix: "",
            folder_id   : ""
        }
    );
    const moduleId = props.match.params.moduleId;
    useEffect(() => {
        let response = adminGetMethod(`${SOFTWARE_MODULE_RSURL}/${moduleId}/edit`)
            .then(response => {
                setUserInput({ 
                    module_name : response.data.software_modules.module_name, 
                    url_prefix  : response.data.software_modules.url_prefix, 
                    route_prefix: response.data.software_modules.route_prefix,
                    folder_id   : response.data.software_modules.folder_id
                });
                setStatus(response.data.software_modules.status == 0 ? false: true);
                setFolder(response.data.software_folders);
            })
            .catch(error => console.log(error))   
    },[]);

    const submitHandler = (data) => {
        let response = adminPutMethod(`${SOFTWARE_MODULE_RSURL}/${moduleId}`, data)
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
    
    return ( 
        <Fragment>
            <Breadcrumb title="Module Update" parent="Module" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Update Module</h5>
                            </div>
                            <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                <div className="card-body">
                                    <div className="form-group row offset-md-2">
                                        <label className="col-sm-2 col-form-label" htmlFor="folder_id">Folder</label>
                                        <div className="col-sm-7">
                                            <select className="form-control" id="folder_id" name="folder_id" 
                                            defaultValue={userInput.folder_id}
                                            ref={register({
                                                required: 'Folder Field Required'
                                            })} >
                                                <option value="">Select Folder</option>
                                                {folderOption}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row offset-md-2">
                                        <label className="col-sm-2 col-form-label" htmlFor="module_name">Module Name</label>
                                        <div className="col-sm-7">
                                            <input className="form-control" id="module_name" name="module_name" type="text" placeholder="Module Name"
                                                defaultValue={userInput.module_name}
                                                ref={register({
                                                    required: 'Module Name Field Required'
                                                })}
                                            />
                                            {errors.module_name && <p className='text-danger'>{errors.module_name.message}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group row offset-md-2">
                                        <label className="col-sm-2 col-form-label" htmlFor="url_prefix">URL Prefix</label>
                                        <div className="col-sm-7">
                                            <input className="form-control" id="url_prefix" name="url_prefix" type="text" placeholder="URL Prefix"
                                                defaultValue={userInput.url_prefix}
                                                ref={register({
                                                    required: 'URL Prefix Field Required'
                                                })}
                                            />
                                            {errors.url_prefix && <p className='text-danger'>{errors.url_prefix.message}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group row offset-md-2">
                                        <label className="col-sm-2 col-form-label" htmlFor="route_prefix">Route Prefix</label>
                                        <div className="col-sm-7">
                                            <input className="form-control" id="route_prefix" name="route_prefix" type="text" placeholder="Route Prefix"
                                                defaultValue={userInput.route_prefix}
                                                ref={register({
                                                    required: 'Route Prefix Field Required'
                                                })}
                                            />
                                            {errors.route_prefix && <p className='text-danger'>{errors.route_prefix.message}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group row offset-md-2">
                                        <label className="col-sm-2 col-form-label" htmlFor="inline-sqr-2">Active Status</label>
                                        <div className="col-sm-9 checkbox checkbox-dark m-squar">
                                            <input id="inline-sqr-2" name='status' type="checkbox"  
                                            checked={status}
                                            ref={register} 
                                            onChange={() => setStatus( !status ) }
                                            />
                                            <label htmlFor="inline-sqr-2">{ !status ? 'No' : 'Yes'}</label>
                                        </div>
                                    </div>
                                </div>
                                <SubmitButton link="softwareModule/list" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
 
export default Edit;