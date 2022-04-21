import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SubmitButton } from '../../common/GlobalButton';
import { SOFTWARE_MODULE_RSURL } from '../../../api/adminUrl';
import { adminPostMethod, adminGetMethod } from '../../../api/action';
import useForm from "react-hook-form";

const Add = () => {
    const { handleSubmit, register, errors } = useForm();
    const [status, setStatus] = useState(true);
    const [folders, setFolder] = useState([]);

    const submitHandler = (data) => {
        let response = adminPostMethod(SOFTWARE_MODULE_RSURL, data)
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
        let response = adminGetMethod(`${SOFTWARE_MODULE_RSURL}/create`)
            .then(response => {
                setFolder(response.data);
            })
        .catch(error => toast.error(error))
    },[])
    
    let folderOption = [];
    if (folders && folders.length > 0) {
        folderOption = folders.map((folder) => (<option key={folder.id} value={folder.id}>{folder.folder_name}</option>))
    }
    return (
        <Fragment>
            <Breadcrumb title="Module Add" parent="Module" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Add Module</h5>
                            </div>
                            <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                <div className="card-body">
                                    <div className="form-group row offset-md-2">
                                        <label className="col-sm-2 col-form-label" htmlFor="folder_id">Folder</label>
                                        <div className="col-sm-7">
                                            <select className="form-control" id="folder_id" name="folder_id" 
                                            defaultValue=""
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
                                            <input id="inline-sqr-2" name='status' type="checkbox" defaultChecked
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
};

export default Add;