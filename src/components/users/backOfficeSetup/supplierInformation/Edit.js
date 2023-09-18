import React, { Fragment, useEffect, useReducer, useState } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { supplierInformationAPI } from '../../../../api/userUrl';
import { userGetMethod, userPutMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';

const Edit = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [configStatus, setConfigStatus] = useState();

    var menuId = 0;
    if (props.location.state === undefined) {
        var menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }

    const [supplierInformationInput, setSupplierInformationInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            address        : "",
            email          : "",
            mobile         : "",
            name           : "",
            supplier_id    : "",
            telephone      : "",
            config_status  : "",
            sqr_cm_amount  : "",
            sqr_inch_amount: "",
            isLoading      : true
        }
    );

    const supplierInfoId = props.match.params.supplierInfoId;

    const changeHandler = (event) => {
        setSupplierInformationInput({[event.target.name]: event.target.value});
    }

    useEffect(() => {
        userGetMethod(`${supplierInformationAPI}/${supplierInfoId}/edit`)
            .then(response => {
                console.log('response', response);
                let {address, email, mobile, name, supplier_id, telephone, config_status, sqr_cm_amount, sqr_inch_amount} = response.data.supplierInformation;
                setSupplierInformationInput({  
                    address, email, mobile, name, supplier_id, telephone, config_status, sqr_cm_amount, sqr_inch_amount,
                    isLoading : false
                });
                setConfigStatus(config_status);
            })
            .catch(error => console.log(error))   
    },[]);

    const submitHandler = (data, e) => {
        console.log("branchInput", data);
        userPutMethod(`${supplierInformationAPI}/${supplierInfoId}`, data )
            .then(response => {
                // console.log("response", response);
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
            {/* <Breadcrumb title="Designation Edit" parent="Designation" /> */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">

                        <div className="card">
                            <div className="card-header">
                                <h5>Update Supplier</h5>
                            </div>
                            <div className="card-body"> 
                                {supplierInformationInput.isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="supplier_id">Supplier Id</label>
                                                <div className="col-sm-8">
                                                    <input 
                                                        className="form-control"
                                                        id="supplier_id" 
                                                        name="supplier_id" 
                                                        type="text" 
                                                        readOnly={'readonly'}
                                                        placeholder="Employee Id"
                                                        // onChange={changeHandler}
                                                        value={supplierInformationInput.supplier_id}
                                                        ref={register({
                                                            required: 'Employee Id Field Required'
                                                        })}
                                                    />
                                                    {errors.supplier_id && <p className='text-danger'>{errors.supplier_id.message}</p>}
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="name">Supplier Name</label>
                                                <div className="col-sm-8">
                                                    <input 
                                                        className="form-control"
                                                        id="name" 
                                                        name="name" 
                                                        type="text" 
                                                        placeholder="Employee Name"
                                                        onChange={changeHandler}
                                                        value={supplierInformationInput.name}
                                                        ref={register({
                                                            required: 'Name Field Required'
                                                        })}
                                                    />
                                                    {errors.name && <p className='text-danger'>{errors.name.message}</p>}
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
                                                        onChange={changeHandler}
                                                        value={supplierInformationInput.address}
                                                        ref={register({})}
                                                    />
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
                                                        onChange={changeHandler}
                                                        value={supplierInformationInput.telephone}
                                                        ref={register({})}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="mobile">Mobile</label>
                                                <div className="col-sm-8">
                                                    <input 
                                                        className="form-control"
                                                        id="mobile" 
                                                        name="mobile" 
                                                        type="text" 
                                                        placeholder="Mobile No."
                                                        onChange={changeHandler}
                                                        value={supplierInformationInput.mobile}
                                                        ref={register({
                                                            required: 'Mobile Field Required'
                                                        })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="email">Email</label>
                                                <div className="col-sm-8">
                                                    <input 
                                                        className="form-control"
                                                        id="email" 
                                                        name="email" 
                                                        type="text" 
                                                        placeholder="Email Address"
                                                        onChange={changeHandler}
                                                        value={supplierInformationInput.email}
                                                        ref={register({
                                                            required: 'Email Field Required'
                                                        })}
                                                    />
                                                    {errors.email && <p className='text-danger'>{errors.email.message}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="col-md-6">
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
                                                            <option value="1" selected = {supplierInformationInput.config_status == 1 ? 'selected' : ''} > Square Inch </option>
                                                            <option value="2" selected = {supplierInformationInput.config_status == 2 ? 'selected' : ''} > Square CM </option>
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
                                                                onChange={changeHandler}
                                                                value={supplierInformationInput.sqr_inch_amount}
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
                                                                onChange={changeHandler}
                                                                value={supplierInformationInput.sqr_cm_amount}
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
                                        </div> */}
                                        
                                    </div>
                                    <SubmitButton link="supplierInformation/index" menuId={ menuId } />
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