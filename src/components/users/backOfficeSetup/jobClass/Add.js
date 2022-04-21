import React, { Fragment, useState } from 'react';
import { jobClassAPI } from '../../../../api/userUrl';
import { userPostMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';
import { ToggleButton } from "../../../common/toggleBtn/toggleButton";

const Add = (props) => {
    const { handleSubmit, register, errors } = useForm();
    // const [selected, setSelected] = useState(false);

    const submitHandler = (data, e) => {
        // data.active_status = selected;
        userPostMethod(jobClassAPI, data)
            .then(response => {
                if (response.data.status == 1) {
                    e.target.reset();
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
                                <h5>Add Job Class</h5>
                            </div>
                            <div className="card-body">
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
                                                // onChange={changeHandler}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Class Code Field Required'
                                                })}
                                            />
                                            {errors.job_class_code && <p className='text-danger'>{errors.job_class_code.message}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label" htmlFor="job_class_name">Class Name</label>
                                        <div className="col-sm-4">
                                            <input 
                                                className="form-control"
                                                id="job_class_name" 
                                                name="job_class_name" 
                                                type="text" 
                                                placeholder="Class Name"
                                                // onChange={changeHandler}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Class Name Field Required'
                                                })}
                                            />
                                            {errors.job_class_name && <p className='text-danger'>{errors.job_class_name.message}</p>}
                                        </div>
                                    </div>

                                    {/* <div className="form-group row offset-md-2">
                                        <label className="col-sm-2 col-form-label" htmlFor="inline-sqr-3">Active Status</label>
                                        <div className="col-md-7">
                                            <ToggleButton
                                                selected={selected}
                                                toggleSelected={() => {
                                                    setSelected(!selected);
                                                }}
                                            />
                                        </div>
                                    </div> */}
                                    <SubmitButton offset="2" link="jobClass/index" menuId={ menuId } />
                                </form>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        
        </Fragment>
    );
};

export default Add;