import React, { Fragment, useEffect, useReducer, useState } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { jobClassAPI } from '../../../../api/userUrl';
import { userGetMethod, userPutMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';
import { ToggleButton } from "../../../common/toggleBtn/toggleButton";

const Edit = (props) => {
    const { handleSubmit, register, errors } = useForm();

    const [jobClassInput, setJobClassInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            job_class_code: '',
            job_class_name: '',
            isLoading     : true
        }
    );

    const jobClassId = props.match.params.jobClassId;

    const changeHandler = (event) => {
        setJobClassInput({[event.target.name]: event.target.value});
    }

    useEffect(() => {
        userGetMethod(`${jobClassAPI}/${jobClassId}/edit`)
            .then(response => {
                setJobClassInput({
                    job_class_code: response.data.jobClass.job_class_code,
                    job_class_name: response.data.jobClass.job_class_name,
                    isLoading     : false
                });
            })
            .catch(error => console.log(error))   
    },[]);

    const submitHandler = (data, e) => {
        userPutMethod(`${jobClassAPI}/${jobClassId}`, data )
            .then(response => {
                if (response.data.status == 1) {
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            })
            .catch(error => toast.error(error))
    }

    var menuId = 0;
    if (props.location.state === undefined) {
        var menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">

                        <div className="card">
                            <div className="card-header">
                                <h5>Update Job Class</h5>
                            </div>
                            <div className="card-body">
                                {jobClassInput.isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label" htmlFor="job_class_code">Class Code</label>
                                            <div className="col-sm-4">
                                                <input 
                                                    className="form-control"
                                                    id="job_class_code" 
                                                    name="job_class_code" 
                                                    type="text" 
                                                    placeholder="Job Class Code"
                                                    onChange={changeHandler}
                                                    value={jobClassInput.job_class_code}
                                                    ref={register({
                                                        required: 'Class Code Field Required'
                                                    })}
                                                />
                                                {errors.job_class_code && <p className='text-danger'>{errors.job_class_code.message}</p>}
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label" htmlFor="job_class_name">Job Class Name</label>
                                            <div className="col-sm-4">
                                                <input 
                                                    className="form-control"
                                                    id="job_class_name" 
                                                    name="job_class_name" 
                                                    type="text" 
                                                    placeholder="Job Class Name"
                                                    onChange={changeHandler}
                                                    value={jobClassInput.job_class_name}
                                                    ref={register({
                                                        required: 'Job Class Name Field Required'
                                                    })}
                                                />
                                                {errors.job_class_name && <p className='text-danger'> {errors.job_class_name.message} </p>}
                                            </div>
                                        </div>
                                        
                                        <SubmitButton link="jobClass/index" offset="2" menuId={ menuId } />
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