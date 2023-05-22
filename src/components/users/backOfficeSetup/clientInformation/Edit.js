import React, { Fragment, useEffect, useReducer, useState } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { clientInformation } from '../../../../api/userUrl';
import { userGetMethod, userPutMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';

const Edit = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [employeeInfo, setEmployeeInfo] = useState("");  
    const [emailNotify, setEmailNotify] = useState(false);  
    const [smsNotify, setSmsNotify] = useState(false);  

    const [clientInformationInput, setClientInformationInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            client_id             : '',
            name                  : '',
            address               : '',
            bill_collection_method: '',
            bill_collection_status: '',
            branch_id             : '',
            client_type_id        : '',
            email                 : '',
            email_notify          : '',
            marketing_person_id   : '',
            mobile                : '', 
            sms_notify            : '',
            vat_status            : '',

            cyl_rate_status       : '',
            limit_square_cm       : '',
            fixed_amount          : '',
            per_square_amount     : '',

            employee_data         : '',
            branch_data           : '',
            cylinder_a_amount     : '',
            cylinder_b_amount     : '',
            cylinder_c_amount     : '',
            isLoading             : true
        }
    );

    const clientInfoId = props.match.params.clientInfoId;

    const changeHandler = (event) => {
        setClientInformationInput({[event.target.name]: event.target.value});
        if(event.target.name == 'sms_notify'){
            setSmsNotify(!smsNotify)
        }
    }

    useEffect(() => {
        userGetMethod(`${clientInformation}/${clientInfoId}/edit`)
            .then(response => {
                console.log('response.data.clientInfo', response.data.clientInfo);
                let {name, address, bill_collection_method, bill_collection_status, branch_id, client_id, client_type_id, email, email_notify, marketing_person_id, mobile, sms_notify, vat_status, cyl_rate_status, limit_square_cm, fixed_amount, per_square_amount, cylinder_a_amount, cylinder_b_amount, cylinder_c_amount } = response.data.clientInfo; 
                setClientInformationInput({
                    client_id             : client_id,
                    name                  : name,
                    address               : address,
                    bill_collection_method: bill_collection_method, 
                    bill_collection_status: bill_collection_status, 
                    branch_id             : branch_id, 
                    client_type_id        : client_type_id, 
                    email                 : email,  
                    marketing_person_id   : marketing_person_id, 
                    mobile                : mobile,  
                    vat_status            : vat_status, 
                    cyl_rate_status       : cyl_rate_status,
                    limit_square_cm       : limit_square_cm,
                    fixed_amount          : fixed_amount,
                    per_square_amount     : per_square_amount,
                    cylinder_a_amount     : cylinder_a_amount,
                    cylinder_b_amount     : cylinder_b_amount,
                    cylinder_c_amount     : cylinder_c_amount,

                    employee_data         : response.data.employeeInfos,
                    branch_data           : response.data.branches,
                    isLoading             : false
                });
                employeeChangeHandler(marketing_person_id);

                setEmailNotify(email_notify == 1 ? true : false);
                setSmsNotify(sms_notify == 1 ? true : false);
            })
            .catch(error => console.log(error))   
    },[]);

    const submitHandler = (data, e) => {
        userPutMethod(`${clientInformation}/${clientInfoId}`, data )
            .then(response => {
                console.log("response.data", response.data);
                if (response.data.status == 1) {
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            })
            .catch(error => toast.error(error))
    }

    const calculateFormValue = (event) => {
        setClientInformationInput(
            {[event.target.name] : event.target.value},
        );
    }

    const employeeChangeHandler = (employee_id) => {
        userGetMethod(`${clientInformation}/getEmployee/${employee_id}`)
            .then(response => {
                setEmployeeInfo(response.data.employee);
            });
    }

    var menuId = 0;
    if (props.location.state === undefined) {
        var menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }

    let branchOptions = [];
    if (clientInformationInput && clientInformationInput.branch_data.length > 0) {
        branchOptions = clientInformationInput.branch_data.map((branch) => (<option key={branch.id} value={branch.id} selected={branch.id == clientInformationInput.branch_id ? true : false}>{branch.branch_name}</option>))
    }
    
    let employeesOptions = [];
    if (clientInformationInput && clientInformationInput.employee_data.length > 0) {
        employeesOptions = clientInformationInput.employee_data.map((employee) => (<option key={employee.id} selected={employee.id == clientInformationInput.marketing_person_id ? true : false} value={employee.id}>{employee.name}</option>))
    }

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">

                        <div className="card">
                            <div className="card-header">
                                <h5>Update Client Information</h5>
                            </div>
                            <div className="card-body">
                            {clientInformationInput.isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                            (
                                <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                    {/* <div className="form-group row offset-md-2">
                                        <label className="col-sm-2 col-form-label" htmlFor="name">Designation Name</label>
                                        <div className="col-sm-7">
                                            <input 
                                                className="form-control"
                                                id="name" 
                                                name="name" 
                                                type="text" 
                                                placeholder="Designation Name"
                                                onChange={changeHandler}
                                                value={clientInformationInput.name}
                                                ref={register({
                                                    required: true
                                                })}
                                            />
                                            {errors.name && <p className='text-danger'> Name Field Required </p>}
                                        </div>
                                    </div> */}

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="client_id">ID</label>
                                                <div className="col-sm-8">
                                                    <input 
                                                        className="form-control"
                                                        id="client_id" 
                                                        name="client_id" 
                                                        type="text" 
                                                        placeholder="Client ID"
                                                        readOnly={'readonly'}
                                                        onChange={changeHandler}
                                                        value={clientInformationInput.client_id}
                                                        ref={register({
                                                            required: 'Id Field Required'
                                                        })}
                                                    />
                                                    {errors.client_id && <p className='text-danger'>{errors.client_id.message}</p>}
                                                </div>
                                            </div>
                                            
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="name">Name</label>
                                                <div className="col-sm-8">
                                                    <input 
                                                        className="form-control"
                                                        id="name" 
                                                        name="name" 
                                                        type="text" 
                                                        placeholder="Department Name"
                                                        onChange={changeHandler}
                                                        value={clientInformationInput.name}
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
                                                        placeholder="Enter Address"
                                                        onChange={changeHandler}
                                                        value={clientInformationInput.address}
                                                        ref={register({
                                                            required: 'Address Field Required'
                                                        })}
                                                    />
                                                    {errors.address && <p className='text-danger'>{errors.address.message}</p>}
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
                                                        readOnly={'readonly'}
                                                        placeholder="Email Address"
                                                        onChange={changeHandler}
                                                        value={clientInformationInput.email}
                                                        ref={register({
                                                            required: 'Email Field Required'
                                                        })}
                                                    />
                                                    {errors.email && <p className='text-danger'>{errors.email.message}</p>}
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="mobile">Company Contact No</label>
                                                <div className="col-sm-8">
                                                    <input 
                                                        className="form-control"
                                                        id="mobile" 
                                                        name="mobile" 
                                                        type="text" 
                                                        placeholder="Mobile Number"
                                                        onChange={changeHandler}
                                                        value={clientInformationInput.mobile}
                                                        ref={register({
                                                            required: 'Mobile Field Required'
                                                        })}
                                                    />
                                                    {errors.mobile && <p className='text-danger'>{errors.mobile.message}</p>}
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="client_type_id">Client Type</label>
                                                <div className="col-sm-8">
                                                    <select className="form-control" required id="client_type_id" name="client_type_id"
                                                        ref={register({
                                                            required: 'Client Type Field Required'
                                                        })} >
                                                        <option> Select One </option>
                                                        <option value="1" selected={clientInformationInput.client_type_id == 1 ? true : false}> Corporate </option>
                                                        <option value="2" selected={clientInformationInput.client_type_id == 2 ? true : false}> Media </option>
                                                        
                                                    </select>
                                                    {errors.client_type_id && <p className='text-danger'>{errors.client_type_id.message}</p>}
                                                </div>
                                            </div>

                                            <fieldset className="border" >
                                                <legend className="w-auto text-left">Marketed By</legend>
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="marketing_person_id">Id</label>
                                                    <div className="col-sm-8">
                                                        <select className="form-control" onChange={(e)=>employeeChangeHandler(e.target.value)} required ref={register}  id="marketing_person_id" name="marketing_person_id"
                                                            defaultValue={clientInformationInput.marketing_person_id}>
                                                            <option> Select One </option>
                                                            {employeesOptions}
                                                            
                                                        </select>
                                                        {errors.marketing_person_id && <p className='text-danger'>{errors.marketing_person_id.message}</p>}
                                                    </div>
                                                </div>

                                                {/* <div className="form-group row">
                                                    <label className="col-md-4 col-form-label" htmlFor="marketer_name">Name</label>
                                                    <div className="col-md-8">
                                                        <input 
                                                            className="form-control"
                                                            // name="email_notify" 
                                                            type="text" 
                                                            readOnly={'readonly'}
                                                            // onChange={changeHandler}
                                                            value={employeeInfo.name != undefined ? employeeInfo.name : ''}
                                                            // ref={register({
                                                            //     // required: 'Email Notify Field Required'
                                                            // })}
                                                        />
                                                    </div>
                                                </div> */}
                                                <div className="form-group row">
                                                    <label className="col-md-4 col-form-label" htmlFor="marketer_name">Designation</label>
                                                    <div className="col-md-8">
                                                        <input 
                                                            className="form-control"
                                                            // name="email_notify" 
                                                            type="text" 
                                                            readOnly={'readonly'}
                                                            // onChange={changeHandler}
                                                            value={employeeInfo.designation_name != undefined ? employeeInfo.designation_name : ""}
                                                            // ref={register({
                                                            //     // required: 'Email Notify Field Required'
                                                            // })}
                                                        />
                                                    </div>
                                                </div>

                                            </fieldset>

                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="vat_status">Vat Status</label>
                                                <div className="col-sm-8">
                                                    <select className="form-control" required id="vat_status" name="vat_status"
                                                        ref={register({
                                                            required: 'Branch Field Required'
                                                        })} >
                                                        <option> Select One </option>
                                                        <option value="1" selected={clientInformationInput.vat_status == 1 ? true : false}> Yes </option>
                                                        <option value="0" selected={clientInformationInput.vat_status == 0 ? true : false}> No </option>
                                                        
                                                    </select>
                                                    {errors.vat_status && <p className='text-danger'>{errors.vat_status.message}</p>}
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="branch_id">Branch</label>
                                                <div className="col-sm-8">
                                                    <select className="form-control" required id="branch_id" name="branch_id"
                                                        ref={register({
                                                            required: 'Branch Field Required'
                                                        })} >
                                                        <option> Select One </option>
                                                        {branchOptions}
                                                        
                                                    </select>
                                                    {errors.branch_id && <p className='text-danger'>{errors.branch_id.message}</p>}
                                                </div>
                                            </div>
                                        
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="email_notify">Notification</label>
                                                <div className="col-sm-2">
                                                    <input 
                                                        
                                                        id="email_notify" 
                                                        name="email_notify" 
                                                        type="checkbox" 
                                                        // value={userInput.name}
                                                        checked={emailNotify}
                                                        onChange={() => setEmailNotify( !emailNotify )}
                                                        // {e=>setUserDepartmentInput()}
                                                        ref={register({
                                                            // required: 'Email Notify Field Required'
                                                        })}
                                                    /> Email
                                                </div>
                                                <div className="col-sm-2">
                                                    <input 
                                                        id="sms_notify" 
                                                        name="sms_notify" 
                                                        type="checkbox" 
                                                        onChange={changeHandler}
                                                        // value={userInput.name}
                                                        checked={smsNotify}
                                                        // onChange={() => setSmsNotify(!smsNotify)}
                                                        ref={register({
                                                            // required: 'Email Notify Field Required'
                                                        })}
                                                    /> SMS
                                                    {/* {errors.email_notify && <p className='text-danger'>{errors.email_notify.message}</p>} */}
                                                </div>
                                            </div>
                                    
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="bill_collection_method">Bill Collection Method</label>
                                                <div className="col-sm-8">
                                                    <select className="form-control" required id="bill_collection_method" name="bill_collection_method"
                                                        ref={register({
                                                            required: 'Bill Collection Method Field Required'
                                                        })} >
                                                        <option> Select One </option>
                                                        <option value="1" selected={clientInformationInput.bill_collection_method == 1 ? true : false}> Auto </option>
                                                        <option value="2" selected={clientInformationInput.bill_collection_method == 2 ? true : false}> Manual </option>
                                                    </select>
                                                    {errors.bill_collection_method && <p className='text-danger'>{errors.bill_collection_method.message}</p>}
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="bill_collection_status">Bill Collection Status</label>
                                                <div className="col-sm-8">
                                                    <select className="form-control" required id="bill_collection_status" name="bill_collection_status"
                                                        ref={register({
                                                            required: 'Bill Collection Status Field Required'
                                                        })} >
                                                        <option> Select One </option>
                                                        <option value="1" selected={clientInformationInput.bill_collection_status == 1 ? true : false}> Active </option>
                                                        <option value="0" selected={clientInformationInput.bill_collection_status == 0 ? true : false}> Inactive </option>
                                                        
                                                    </select>
                                                    {errors.bill_collection_status && <p className='text-danger'>{errors.bill_collection_status.message}</p>}
                                                </div>
                                            </div>

                                            {/* Bill Configuration  */}
                                            <fieldset className="border" >
                                                <legend className="w-auto text-left">Bill Configuration</legend>
                            
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="cyl_rate_status">Cyl Rate Status</label>
                                                    <div className="col-sm-8">
                                                        <select className="form-control" required id="cyl_rate_status" name="cyl_rate_status"
                                                            ref={register({
                                                                required: 'Rate Type Field Required'
                                                            })} >
                                                            <option value=""> Select One </option>
                                                            <option value="1" selected={clientInformationInput.cyl_rate_status == 1 ? true : false}> Per Cylinder </option>
                                                            <option value="2" selected={clientInformationInput.cyl_rate_status == 2 ? true : false}> Per square CM </option>
                                                            <option value="3" selected={clientInformationInput.cyl_rate_status == 3 ? true : false}> Per square Inch </option>
                                                        </select>
                                                        {errors.cyl_rate_status && <p className='text-danger'>{errors.cyl_rate_status.message}</p>}
                                                    </div>
                                                </div>
                                                
                                                <div className="form-group row">
                                                    <label className="col-md-4 col-form-label" htmlFor="limit_square_cm">Limit (square cm)</label>
                                                    <div className="col-md-8">
                                                        <input 
                                                            className="form-control"
                                                            name="limit_square_cm" 
                                                            type="text" 
                                                            onChange={calculateFormValue}
                                                            value={clientInformationInput.limit_square_cm}
                                                            ref={register({
                                                                required: 'Limit Field Required'
                                                            })}
                                                        />
                                                        {errors.limit_square_cm && <p className='text-danger'>{errors.limit_square_cm.message}</p>}
                                                    </div>
                                                </div>
                                                
                                                <div className="form-group row">
                                                    <label className="col-md-4 col-form-label" htmlFor="fixed_amount">Fixed Amount</label>
                                                    <div className="col-md-8">
                                                        <input 
                                                            className="form-control"
                                                            name="fixed_amount" 
                                                            type="text" 
                                                            onChange={calculateFormValue}
                                                            value={clientInformationInput.fixed_amount }
                                                            ref={register({
                                                                required: 'Fixed Amount Field Required'
                                                            })}
                                                        />
                                                        {errors.fixed_amount && <p className='text-danger'>{errors.fixed_amount.message}</p>}
                                                    </div>
                                                </div>
                                                
                                                <div className="form-group row">
                                                    <label className="col-md-4 col-form-label" htmlFor="per_square_amount">Per square amount</label>
                                                    <div className="col-md-8">
                                                        <input 
                                                            className="form-control"
                                                            name="per_square_amount" 
                                                            type="text" 
                                                            readOnly={'readonly'}
                                                            // onChange={changeHandler}
                                                            value={(clientInformationInput.fixed_amount / clientInformationInput.limit_square_cm) ? clientInformationInput.fixed_amount / clientInformationInput.limit_square_cm : 0}
                                                            ref={register({
                                                                required: 'Per Square Cm Field Required'
                                                            })}
                                                        />
                                                        {errors.per_square_amount && <p className='text-danger'>{errors.per_square_amount.message}</p>}
                                                    </div>
                                                </div>

                                                {/* <div className="form-group row">
                                                    <label className="col-md-4 col-form-label" htmlFor="cylinder_a_amount">Cylinder A amount</label>
                                                    <div className="col-md-8">
                                                        <input 
                                                            className="form-control"
                                                            id="cylinder_a_amount" 
                                                            name="cylinder_a_amount" 
                                                            type="text" 
                                                            onChange={changeHandler}
                                                            value={clientInformationInput.cylinder_a_amount}
                                                            ref={register({})}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 col-form-label" htmlFor="cylinder_b_amount">Cylinder B amount</label>
                                                    <div className="col-md-8">
                                                        <input 
                                                            className="form-control"
                                                            id="cylinder_b_amount" 
                                                            name="cylinder_b_amount" 
                                                            type="text" 
                                                            onChange={changeHandler}
                                                            value={clientInformationInput.cylinder_b_amount}
                                                            ref={register({})}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 col-form-label" htmlFor="cylinder_c_amount">Cylinder C amount</label>
                                                    <div className="col-md-8">
                                                        <input 
                                                            className="form-control"
                                                            id="cylinder_c_amount" 
                                                            name="cylinder_c_amount" 
                                                            type="text" 
                                                            onChange={changeHandler}
                                                            value={clientInformationInput.cylinder_c_amount}
                                                            ref={register({})}
                                                        />
                                                    </div>
                                                </div> */}
                                            </fieldset>

                                        </div>
                                    </div>

                                    
                                
                                    <SubmitButton link="clientInformation/index" menuId={ menuId }/>
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