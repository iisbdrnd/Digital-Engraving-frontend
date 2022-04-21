import React, { Fragment, useEffect, useReducer, useState } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { jobSubClassAPI } from '../../../../api/userUrl';
import { userGetMethod, userPutMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';
import { ToggleButton } from "../../../common/toggleBtn/toggleButton";

const Edit = (props) => {
    const { handleSubmit, register, errors } = useForm();
    
    const [jobSubClassInput, setJobSubClassInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            job_class_id  : '',
            label_2       : '',
            sub_class     : '',
            job_class_data: [],
            isLoading     : true
        }
    );

    const jobSubClassId = props.match.params.jobSubClassId;

    const changeHandler = (event) => {
        setJobSubClassInput({[event.target.name]: event.target.value});
    }

    useEffect(() => {
        userGetMethod(`${jobSubClassAPI}/${jobSubClassId}/edit`)
            .then(response => {
                console.log("relksdjf", response.data);
                let {job_class_id, label_2, sub_class} = response.data.jobSubClass;
                setJobSubClassInput({
                    job_class_id  : job_class_id,
                    label_2       : label_2,
                    sub_class     : sub_class,

                    job_class_data: response.data.jobClasses,
                    isLoading     : false
                });
            })
            .catch(error => console.log(error))   
    },[]);

    const submitHandler = (data, e) => {
        userPutMethod(`${jobSubClassAPI}/${jobSubClassId}`, data )
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

    let jobClassOptions = [];
    if (jobSubClassInput && jobSubClassInput.job_class_data.length > 0) {
        jobClassOptions = jobSubClassInput.job_class_data.map((jobClass) => (<option key={jobClass.id}  value={jobClass.id} selected={jobClass.id == jobSubClassInput.job_class_id ? true : false}>{jobClass.job_class_code}</option>))
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
                                {jobSubClassInput.isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label" htmlFor="job_class_id">Job Class</label>
                                            <div className="col-sm-4">
                                                <select className="form-control" required ref={register}  id="job_class_id" name="job_class_id"
                                                    ref={register({
                                                        required: 'Branch Field Required'
                                                    })} >
                                                    <option> Select One </option>
                                                    {jobClassOptions}
                                                </select>
                                                {errors.job_class_id && <p className='text-danger'>{errors.job_class_id.message}</p>}
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label" htmlFor="label_2">Label 2</label>
                                            <div className="col-sm-4">
                                                <input 
                                                    className="form-control"
                                                    id="label_2" 
                                                    name="label_2" 
                                                    type="text" 
                                                    placeholder="Label2"
                                                    onChange={changeHandler}
                                                    value={jobSubClassInput.label_2}
                                                    ref={register({
                                                        required: 'Label2 Field Required'
                                                    })}
                                                />
                                                {errors.label_2 && <p className='text-danger'>{errors.label_2.message}</p>}
                                            </div>
                                        </div>
                                        
                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label" htmlFor="sub_class">Sub Class</label>
                                            <div className="col-sm-4">
                                                <input 
                                                    className="form-control"
                                                    id="sub_class" 
                                                    name="sub_class" 
                                                    type="text" 
                                                    placeholder="Sub Class"
                                                    onChange={changeHandler}
                                                    value={jobSubClassInput.sub_class}
                                                    ref={register({
                                                        required: 'Sub Class Field Required'
                                                    })}
                                                />
                                                {errors.sub_class && <p className='text-danger'>{errors.sub_class.message}</p>}
                                            </div>
                                        </div>
                                        
                                        <SubmitButton link="jobSubClass/index" offset="2" menuId={ menuId } />
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