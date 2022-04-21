import React, { Fragment } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { UserDesignation } from '../../../../api/userUrl';
import { userPostMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';

const Add = () => {
    const { handleSubmit, register, errors } = useForm();

    const submitHandler = (data) => {
        userPostMethod(UserDesignation, data)
            .then(response => {
                if (response.data.status == 1) {
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            })
        .catch(error => toast.error(error))
    }
    
    return (
        <Fragment>
            {/* <Breadcrumb title="User Designation Add" parent="Designation" /> */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Add Designation</h5>
                            </div>
                            <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                <div className="card-body">
                                    <div className="form-group row offset-md-2">
                                        <label className="col-sm-2 col-form-label" htmlFor="name">Name</label>
                                        <div className="col-sm-7">
                                            <input 
                                                className="form-control"
                                                id="name" 
                                                name="name" 
                                                type="text" 
                                                placeholder="Designation Name"
                                                // onChange={changeHandler}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Name Field Required'
                                                })}
                                            />
                                            {errors.name && <p className='text-danger'>{errors.name.message}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group row offset-md-2">
                                        <label className="col-sm-2 col-form-label" htmlFor="grade">Grade</label>
                                        <div className="col-sm-7">
                                            <input 
                                                className="form-control"
                                                id="grade" 
                                                name="grade" 
                                                type="text" 
                                                placeholder="Enter Grade"
                                                // onChange={changeHandler}
                                                ref={register({
                                                    required: 'Grade Field Required'
                                                })}
                                            />
                                            {errors.grade && <p className='text-danger'>{errors.grade.message}</p>}
                                        </div>
                                    </div>
                                </div>
                                <SubmitButton link="user-designation/list" />
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
        
        </Fragment>
    );
};

export default Add;