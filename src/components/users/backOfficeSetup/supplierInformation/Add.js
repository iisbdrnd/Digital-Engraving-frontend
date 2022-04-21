import React, { Fragment, useState } from 'react';
import { supplierInformationAPI } from '../../../../api/userUrl';
import { userPostMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';

const Add = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [configStatus, setConfigStatus] = useState();

    const submitHandler = (data, e) => {
        console.log('data', data);
        userPostMethod(supplierInformationAPI, data)
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
                                <h5>Add Supplier Information</h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label required" htmlFor="name">Supplier Name</label>
                                                <div className="col-sm-8">
                                                    <input 
                                                        className="form-control"
                                                        id="name" 
                                                        name="name" 
                                                        type="text" 
                                                        placeholder="Employee Name"
                                                        // onChange={changeHandler}
                                                        ref={register({
                                                            required: 'Name Field Required'
                                                        })}
                                                    />
                                                    {errors.name && <p className='text-danger'>{errors.name.message}</p>}
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label required" htmlFor="email">Email</label>
                                                <div className="col-sm-8">
                                                    <input 
                                                        className="form-control"
                                                        id="email" 
                                                        name="email" 
                                                        type="text" 
                                                        placeholder="Email Address"
                                                        // onChange={changeHandler}
                                                        // value={userInput.name}
                                                        ref={register({
                                                            required: 'Email Field Required'
                                                        })}
                                                    />
                                                    {errors.email && <p className='text-danger'>{errors.email.message}</p>}
                                                </div>
                                            </div>
                                            
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="telephone">Telephone</label>
                                                <div className="col-sm-8">
                                                    <input 
                                                        className="form-control"
                                                        id="telephone" 
                                                        name="telephone" 
                                                        type="text" 
                                                        placeholder="Telephone No."
                                                        // onChange={changeHandler}
                                                        ref={register({})}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label required" htmlFor="mobile">Mobile</label>
                                                <div className="col-sm-8">
                                                    <input 
                                                        className="form-control"
                                                        id="mobile" 
                                                        name="mobile" 
                                                        type="text" 
                                                        placeholder="Mobile No."
                                                        // onChange={changeHandler}
                                                        ref={register({
                                                            required: 'Mobile Field Required'
                                                        })}
                                                    />
                                                    {errors.mobile && <p className='text-danger'>{errors.mobile.message}</p>}
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="address">Address</label>
                                                <div className="col-sm-8">
                                                    <textarea 
                                                        className="form-control"
                                                        id="address" 
                                                        name="address" 
                                                        type="text" 
                                                        placeholder="Address"
                                                        // onChange={changeHandler}
                                                        ref={register({})}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <fieldset className="border" >
                                                <legend className="w-auto text-left">Billing Configuration</legend>
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label required" htmlFor="config_status">Config Status</label>
                                                    <div className="col-sm-8">
                                                        <select className="form-control" id="config_status" name="config_status" onChange={e=>setConfigStatus(e.target.value)}
                                                            ref={register({
                                                                required: 'Config Status Field Required'
                                                            })} >
                                                            <option value=""> Select One </option>
                                                            <option value="1"> Square Inch </option>
                                                            <option value="2"> Square CM </option>
                                                        </select>
                                                        {errors.config_status && <p className='text-danger'>{errors.config_status.message}</p>}
                                                    </div>
                                                </div>
                                                {configStatus == 1 ? (
                                                    <div className="form-group row">
                                                        <label className="col-md-4 col-form-label required" htmlFor="sqr_inch_amount">Square Inch Amount</label>
                                                        <div className="col-md-8">
                                                            <input 
                                                                className="form-control"
                                                                id="sqr_inch_amount" 
                                                                name="sqr_inch_amount" 
                                                                type="text" 
                                                                ref={register({
                                                                    required: 'Square Inch Amount Notify Field Required'
                                                                })}
                                                            />
                                                            {errors.sqr_inch_amount && <p className='text-danger'>{errors.sqr_inch_amount.message}</p>}
                                                        </div>
                                                    </div>
                                                ) 
                                                :
                                                configStatus == 2 ? (
                                                    <div className="form-group row">
                                                        <label className="col-md-4 col-form-label required" htmlFor="sqr_cm_amount">Square CM Amount</label>
                                                        <div className="col-md-8">
                                                            <input 
                                                                className="form-control"
                                                                id="sqr_cm_amount" 
                                                                name="sqr_cm_amount" 
                                                                type="text" 
                                                                ref={register({
                                                                    required: 'Square CM Amount Notify Field Required'
                                                                })}
                                                            />
                                                            {errors.sqr_cm_amount && <p className='text-danger'>{errors.sqr_cm_amount.message}</p>}
                                                        </div>
                                                    </div>
                                                    )
                                                    :
                                                    null
                                                }
                                            </fieldset>
                                        
                                        </div>
                                    </div>
                                    <SubmitButton link="supplierInformation/index" menuId={ menuId } />
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