import React, { Fragment, useState } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { DEPARTMENTS_RSURL } from '../../../api/adminUrl';
import { adminPostMethod } from '../../../api/action';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../common/GlobalButton';
import { ToggleButton } from "../../common/toggleBtn/toggleButton";

const Add = () => {
    const { handleSubmit, register, errors } = useForm();
    const [selected, setSelected] = useState(false);

    const submitHandler = (data, e) => {
        data.active_status = selected;
        adminPostMethod(DEPARTMENTS_RSURL, data)
            .then(response => {
                if (response.data.status == 1) {
                    toast.success(response.data.message);
                    e.target.reset();
                    setSelected(false);
                } else {
                    toast.error(response.data.message);
                }
            })
        .catch(error => toast.error(error))
    }
    
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Add Department</h5>
                            </div>
                            <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                <div className="card-body">
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label" htmlFor="department">Name</label>
                                        <div className="col-sm-4">
                                            <input 
                                                className="form-control"
                                                id="department" 
                                                name="department" 
                                                type="text" 
                                                placeholder="Department Name"
                                                // onChange={changeHandler}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Department Name Field Required'
                                                })}
                                            />
                                            {errors.name && <p className='text-danger'>{errors.name.message}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label" htmlFor="inline-sqr-3">Active Status</label>
                                        <div className="col-md-4">
                                            <ToggleButton
                                                selected={selected}
                                                toggleSelected={() => {
                                                    setSelected(!selected);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <SubmitButton link="department/list" offset="2"/>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Add;