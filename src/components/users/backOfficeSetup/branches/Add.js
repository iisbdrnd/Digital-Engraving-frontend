import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { branches } from '../../../../api/userUrl';
import { userGetMethod, userPostMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';
import { ToggleButton } from "../../../common/toggleBtn/toggleButton";

const Add = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [selected, setSelected] = useState(false);
    
    const submitHandler = (data, e) => {
        data.active_status = selected;
        console.log("data", data);

        userPostMethod(branches, data)
            .then(response => {
                if (response.data.status == 1) {
                    toast.success(response.data.message)
                    e.target.reset();
                    setSelected(false);
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
            {/* <Breadcrumb title="User Designation Add" parent="Designation" /> */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Add Branches</h5>
                            </div>
                            <div className="card-body">
                            {/* {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                ( */}
                                <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label" htmlFor="branch_name">Branch Name</label>
                                        <div className="col-sm-4">
                                            <input 
                                                className="form-control"
                                                id="branch_name" 
                                                name="branch_name" 
                                                type="text" 
                                                placeholder="Branch Name"
                                                // onChange={changeHandler}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Branch Name Field Required'
                                                })}
                                            />
                                            {errors.branch_name && <p className='text-danger'>{errors.branch_name.message}</p>}
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

                                    <SubmitButton link="branches/index" addClass="offset-md-2" menuId={ menuId } />
                                </form>
                                {/* )} */}
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        
        </Fragment>
    );
};

export default Add;