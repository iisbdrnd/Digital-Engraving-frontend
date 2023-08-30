import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { employeeInformation } from '../../../../api/userUrl';
import { userGetMethod, userPostMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';
import { ToggleButton } from "../../../common/toggleBtn/toggleButton";

const Add = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [employeeData, setEmployeeData] = useState();
    const [changeUseEffect, setChangeUseEffect] = useState(0);
    const [selected, setSelected] = useState(false);

    console.log('employeeData', employeeData);

    useEffect(() => {
        userGetMethod(`${employeeInformation}/create`)
            .then(response => {
                console.log('response.data', response.data);
                setEmployeeData(response.data);
                setIsLoading(false);
            });

    },[changeUseEffect]);

    const designations = () => {
        
    }

    let designationOptions = [];
    if (employeeData && employeeData.designations.length > 0) {
        designationOptions = employeeData.designations.map((designation) => 
        (
        <option key={designation.id} value={designation.id}>{designation.role_name}</option>))
    }

    let departmentOptions = [];
    if (employeeData && employeeData.departments.length > 0) {
        departmentOptions = employeeData.departments.map((department) => (<option key={department.id} value={department.id}>{department.name}</option>))
    }

    let designMachine = [];
    if (employeeData && employeeData.designMachines.length > 0) {
        designMachine = employeeData.designMachines.map((machine) => (<option key={machine.id} value={machine.id}>{machine.machine_name}</option>))
    }

    const submitHandler = (data, e) => {
        data.is_designer = selected;
        userPostMethod(employeeInformation, data)
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
                                <h5>Add Employees Information</h5>
                            </div>
                            <div className="card-body">
                                {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="name">Employee Name</label>
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
                                                    <label className="col-sm-4 col-form-label" htmlFor="designation_id">Designation</label>
                                                    <div className="col-sm-8">
                                                        <select className="form-control" required ref={register}  id="designation_id" name="designation_id"
                                                            ref={register({
                                                                required: 'Designation Field Required'
                                                            })} >
                                                            <option value=""> Select Designation </option>
                                                            {designationOptions}
                                                            
                                                        </select>
                                                        {errors.designation_id && <p className='text-danger'>{errors.designation_id.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="department_id">Department</label>
                                                    <div className="col-sm-8">
                                                        <select className="form-control" required ref={register}  id="department_id" name="department_id"
                                                            ref={register({
                                                                required: 'Department Field Required'
                                                            })} >
                                                            <option value=""> Select Department </option>
                                                            {departmentOptions}
                                                            
                                                        </select>
                                                        {errors.department_id && <p className='text-danger'>{errors.department_id.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="contact_no">Contact No.</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control"
                                                            id="contact_no" 
                                                            name="contact_no" 
                                                            type="text" 
                                                            placeholder="Contact No."
                                                            // onChange={changeHandler}
                                                            ref={register({
                                                                required: 'Contact No. Field Required'
                                                            })}
                                                        />
                                                        {errors.contact_no && <p className='text-danger'>{errors.contact_no.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="inline-sqr-3">Is Designer</label>
                                                    <div className="col-md-8">
                                                        <ToggleButton
                                                            selected={selected}
                                                            toggleSelected={() => {
                                                                setSelected(!selected);
                                                            }}
                                                            toggleYesMsg="Yes"
                                                            toggleNoMsg="No"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="machine_location">Machine Location</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control"
                                                            id="machine_location" 
                                                            name="machine_location" 
                                                            type="text" 
                                                            placeholder="Machine Location"
                                                            // onChange={changeHandler}
                                                            // value={userInput.name}
                                                            ref={register({})}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="working_status">Working Status</label>
                                                    <div className="col-sm-8">
                                                        <select className="form-control" required ref={register}  id="working_status" name="working_status"
                                                            ref={register({
                                                                required: 'Branch Field Required'
                                                            })} >
                                                            <option value=""> Select One </option>
                                                            <option value="1"> Working </option>
                                                            
                                                        </select>
                                                        {errors.working_status && <p className='text-danger'>{errors.working_status.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="remarks">Remarks</label>
                                                    <div className="col-sm-8">
                                                        <textarea 
                                                            className="form-control"
                                                            id="remarks" 
                                                            name="remarks" 
                                                            type="text" 
                                                            placeholder="Remarks"
                                                            // onChange={changeHandler}
                                                            ref={register({})}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="id_card_number">Id Card Number</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control"
                                                            id="id_card_number" 
                                                            name="id_card_number" 
                                                            type="text" 
                                                            placeholder="Id Card Number"
                                                            // onChange={changeHandler}
                                                            // value={userInput.name}
                                                            ref={register({
                                                                required: 'Id Card Number Field Required'
                                                            })}
                                                        />
                                                        {errors.id_card_number && <p className='text-danger'>{errors.id_card_number.message}</p>}
                                                    </div>
                                                </div>
                                                {selected ?(
                                                    <div className="form-group row">
                                                        <label className="col-sm-4 col-form-label" htmlFor="design_machine_location_id">Design Machine</label>
                                                        <div className="col-sm-8">
                                                            <select className="form-control" required ref={register}  id="design_machine_location_id" name="design_machine_location_id"
                                                                ref={register({
                                                                    required: 'Branch Field Required'
                                                                })} >
                                                                <option value="">Select</option>
                                                                {designMachine}
                                                            </select>
                                                            {errors.design_machine_location_id && <p className='text-danger'>{errors.design_machine_location_id.message}</p>}
                                                        </div>
                                                    </div>
                                                ): null}
                                            </div>
                                        </div>
                                        <SubmitButton link="employeeInformation/index" menuId={ menuId } />
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