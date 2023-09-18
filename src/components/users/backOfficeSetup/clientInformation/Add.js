import React, { Fragment, useEffect, useState, useReducer } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { clientInformation } from '../../../../api/userUrl';
import { userGetMethod, userPostMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';

const Add = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [clientData, setClientData] = useState();
    const [changeUseEffect, setChangeUseEffect] = useState(0);   
    const [employeeInfo, setEmployeeInfo] = useState("");   
    const [limitSquareCm, setLimitSquareCM] = useState();   
    const [perSquareAmount, setPerSquareAmount] = useState(0.0);   
    const [cylinderRate, setCylinderRate] = useState();

    let [calculationValue, setCalculationValue] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            limit_square_cm  : 0,
            fixed_amount     : 0,
            per_square_amount: 0
        }
    );

    useEffect(() => {
        userGetMethod(`${clientInformation}/create`)
            .then(response => {
                setClientData(response.data);
                setIsLoading(false);
            });
    },[changeUseEffect]);

    const submitHandler = (data, e) => {
        console.log("data", data);
        userPostMethod(clientInformation, data)
            .then(response => {
                if (response.data.status == 1) {
                    toast.success(response.data.message)
                    e.target.reset();
                    setChangeUseEffect(changeUseEffect+1);
                } else {
                    toast.error(response.data.message)
                }
            })
        .catch(error => toast.error(error))
    }

    const employeeChangeHandler = (e) => {
        let employee_id = e.target.value;
        userGetMethod(`${clientInformation}/getEmployee/${employee_id}`)
            .then(response => {
                console.log('response', response.data);
                setEmployeeInfo(response.data.employee ? response.data.employee : []);
            });
    }

    // const calculatePerSquareAmount = (e) => {
    //     console.log('kdjsflj', limitSquareCm, e.target.value);
    //     let result = e.target.value / limitSquareCm;
    //     setPerSquareAmount(result.toFixed(3));
    // }

    const calculateFormValue = (event) => {
        setCalculationValue(
            {[event.target.name] : event.target.value},
        );
    }

    var menuId = 0;
    if (props.location.state === undefined) {
        var menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }

    let branchOptions = [];
    if (clientData && clientData.branches.length > 0) {
        branchOptions = clientData.branches.map((branch) => (<option key={branch.id} value={branch.id}>{branch.branch_name}</option>))
    }
    
    let employeesOptions = [];
    if (clientData && clientData.employeeInfos.length > 0) {
        employeesOptions = clientData.employeeInfos.map((employee) => (<option key={employee.id} value={employee.id}>{employee.name}</option>))
    }
    console.log('clientData', clientData?.employeeInfos);

    

    return (
        <Fragment>
            {/* <Breadcrumb title="User Designation Add" parent="Designation" /> */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Add Client Information</h5>
                            </div>
                            <div className="card-body">
                            {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                    <div className="row">
                                        <div className="col-md-6">
                                            
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="name">Name</label>
                                                <div className="col-sm-8">
                                                    <input 
                                                        className="form-control"
                                                        id="name" 
                                                        name="name" 
                                                        type="text" 
                                                        placeholder="Client Name"
                                                        // onChange={changeHandler}
                                                        // value={userInput.name}
                                                        ref={register({
                                                            required: 'Name Field Required'
                                                        })}
                                                    />
                                                    {errors.name && <p className='text-danger'>{errors.name.message}</p>}
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="name">Previous Client Id</label>
                                                <div className="col-sm-8">
                                                    <input 
                                                        className="form-control"
                                                        id="previous_client_id" 
                                                        name="previous_client_id" 
                                                        type="text" 
                                                        placeholder="Previous Client Id"
                                                        ref={register({
                                                           
                                                        })}
           
                                                    />
                                                    
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
                                                        // onChange={changeHandler}
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
                                                <label className="col-sm-4 col-form-label" htmlFor="mobile">Company Contact No</label>
                                                <div className="col-sm-8">
                                                    <input 
                                                        className="form-control"
                                                        id="mobile" 
                                                        name="mobile" 
                                                        type="text" 
                                                        placeholder="Mobile Number"
                                                        // onChange={changeHandler}
                                                        // value={userInput.name}
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
                                                    <select className="form-control"  id="client_type_id" name="client_type_id"
                                                        ref={register({
                                                            required: 'Client Type Field Required'
                                                        })} >
                                                        <option> Select One </option>
                                                        <option value="1"> Corporate </option>
                                                        <option value="2"> Media </option>
                                                        
                                                    </select>
                                                    {errors.client_type_id && <p className='text-danger'>{errors.client_type_id.message}</p>}
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="email_notify">Notification</label>
                                                <div className="col-sm-2">
                                                    <input 
                                                        
                                                        id="email_notify" 
                                                        name="email_notify" 
                                                        type="checkbox" 
                                                        // onChange={changeHandler}
                                                        // value={userInput.name}
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
                                                        // onChange={changeHandler}
                                                        // value={userInput.name}
                                                        ref={register({
                                                            // required: 'Email Notify Field Required'
                                                        })}
                                                    /> SMS
                                                    {/* {errors.email_notify && <p className='text-danger'>{errors.email_notify.message}</p>} */}
                                                </div>
                                            </div>

                                            <fieldset className="border" >
                                                <legend className="w-auto text-left">Marketed By</legend>
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="marketing_person_id">Name</label>
                                                    <div className="col-sm-8">
                                                        <select className="form-control" onChange={employeeChangeHandler} id="marketing_person_id" name="marketing_person_id"
                                                            ref={register({
                                                                required: 'Branch Field Required'
                                                            })} >
                                                            <option value=''> Select One </option>
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
                                                            value={employeeInfo.name ? employeeInfo.name : ''}
                                                            // ref={register({
                                                            //     // required: 'Email Notify Field Required'
                                                            // })}
                                                        />
                                                    </div>
                                                </div> */}
                                                {/* <div className="form-group row">
                                                    <label className="col-md-4 col-form-label" htmlFor="marketer_name">Designation</label>
                                                    <div className="col-md-8">
                                                        <input 
                                                            className="form-control"
                                                            // name="email_notify" 
                                                            type="text" 
                                                            readOnly={'readonly'}
                                                            // onChange={changeHandler}
                                                            value={employeeInfo.designation_name ? employeeInfo.designation_name : ""}
                                                            // ref={register({
                                                            //     // required: 'Email Notify Field Required'
                                                            // })}
                                                        />
                                                    </div>
                                                </div> */}

                                            </fieldset>

                                        </div>

                                        <div className="col-md-6">
                                            

                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="vat_status">Vat Status</label>
                                                <div className="col-sm-8">
                                                    <select className="form-control"  id="vat_status" name="vat_status"
                                                        ref={register({
                                                            required: 'Branch Field Required'
                                                        })} >
                                                        <option> Select One </option>
                                                        <option value="1"> Yes </option>
                                                        <option value="0"> No </option>
                                                        
                                                    </select>
                                                    {errors.vat_status && <p className='text-danger'>{errors.vat_status.message}</p>}
                                                </div>
                                            </div>
        
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="branch_id">Branch</label>
                                                <div className="col-sm-8">
                                                    <select className="form-control" id="branch_id" name="branch_id"
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
                                                <label className="col-sm-4 col-form-label" htmlFor="bill_collection_method">Bill Collection Method</label>
                                                <div className="col-sm-8">
                                                    <select className="form-control" id="bill_collection_method" name="bill_collection_method"
                                                        ref={register({
                                                            required: 'Bill Collection Method Field Required'
                                                        })} >
                                                        <option> Select One </option>
                                                        <option value="1"> Auto </option>
                                                        <option value="2"> Manual </option>
                                                    </select>
                                                    {errors.bill_collection_method && <p className='text-danger'>{errors.bill_collection_method.message}</p>}
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="bill_collection_status">Bill Collection Status</label>
                                                <div className="col-sm-8">
                                                    <select className="form-control"  id="bill_collection_status" name="bill_collection_status"
                                                        ref={register({
                                                            required: 'Bill Collection Status Field Required'
                                                        })} >
                                                        <option> Select One </option>
                                                        <option value="1"> Active </option>
                                                        <option value="0"> Inactive </option>
                                                        
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
                                                        <select className="form-control" required onChange={(e) => setCylinderRate(e.target.value)} id="cyl_rate_status" name="cyl_rate_status"
                                                            ref={register({
                                                                required: 'Rate Type Field Required'
                                                            })} >
                                                            <option value=""> Select One </option>
                                                            <option value="2"> Per square CM </option>
                                                            <option value="1"> Per Cylinder </option>
                                                        </select>
                                                        {errors.cyl_rate_status && <p className='text-danger'>{errors.cyl_rate_status.message}</p>}
                                                    </div>
                                                </div>
                                                
                                                {cylinderRate == 2 && <div className="form-group row">
                                                    <label className="col-md-4 col-form-label" htmlFor="limit_square_cm">Limit (square cm)</label>
                                                    <div className="col-md-8">
                                                        <input 
                                                            className="form-control"
                                                            name="limit_square_cm" 
                                                            type="text" 
                                                            onChange={calculateFormValue}
                                                            required = {cylinderRate == 2 ? true : false}
                                                            // value={employeeInfo.limit_square_cm != undefined ? employeeInfo.limit_square_cm : ""}
                                                            ref={register({
                                                                required: 'Limit Field Required'
                                                            })}
                                                        />
                                                        {errors.limit_square_cm && <p className='text-danger'>{errors.limit_square_cm.message}</p>}
                                                    </div>
                                                </div>}
                                                
                                                {cylinderRate == 1 && <div className="form-group row">
                                                    <label className="col-md-4 col-form-label" htmlFor="fixed_amount">Fixed Amount</label>
                                                    <div className="col-md-8">
                                                        <input 
                                                            className="form-control"
                                                            name="fixed_amount" 
                                                            type="text" 
                                                            onChange={calculateFormValue}
                                                            required = {cylinderRate == 1 ? true : false}
                                                            // value={employeeInfo.fixed_amount != undefined ? employeeInfo.fixed_amount : ""}
                                                            ref={register({
                                                                required: 'Fixed Amount Field Required'
                                                            })}
                                                        />
                                                        {errors.fixed_amount && <p className='text-danger'>{errors.fixed_amount.message}</p>}
                                                    </div>
                                                </div>
                                                }
                                                
                                                {cylinderRate ==2 && <div className="form-group row">
                                                    <label className="col-md-4 col-form-label" htmlFor="per_square_amount">Per square amount</label>
                                                    <div className="col-md-8">
                                                        <input 
                                                            className="form-control"
                                                            name="per_square_amount" 
                                                            type="text" 
                                                            required = {cylinderRate == 2 ? true : false}
                                                            // onChange={changeHandler}
                                                            // value={(calculationValue.fixed_amount / calculationValue.limit_square_cm) ? calculationValue.fixed_amount / calculationValue.limit_square_cm : 0}
                                                            ref={register({
                                                                required: 'Per Square Cm Field Required'
                                                            })}
                                                        />
                                                        {errors.per_square_amount && <p className='text-danger'>{errors.per_square_amount.message}</p>}
                                                    </div>
                                                </div>}

                                                {/* <div className="form-group row">
                                                    <label className="col-md-4 col-form-label" htmlFor="cylinder_a_amount">Cylinder A amount</label>
                                                    <div className="col-md-8">
                                                        <input 
                                                            className="form-control"
                                                            id="cylinder_a_amount" 
                                                            name="cylinder_a_amount" 
                                                            type="text" 
                                                            onChange={calculateFormValue}
                                                            // value={employeeInfo.cylinder_a_amount != undefined ? employeeInfo.cylinder_a_amount : ""}
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
                                                            onChange={calculateFormValue}
                                                            // value={employeeInfo.cylinder_b_amount != undefined ? employeeInfo.cylinder_b_amount : ""}
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
                                                            onChange={calculateFormValue}
                                                            // value={employeeInfo.cylinder_c_amount != undefined ? employeeInfo.cylinder_c_amount : ""}
                                                            ref={register({})}
                                                        />
                                                    </div>
                                                </div> */}
                                                
                                            </fieldset>
                                        </div>
                                    </div>
                                    {/* <div className="row">
                                        <div className="col-sm-6">
                                            
                                        </div>
                                        <div className="col-md-6">
                                            
                                        </div>
                                    </div> */}
                                    <SubmitButton link="clientInformation/index" menuId={ menuId } />
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

export default Add;