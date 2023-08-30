import React, { Fragment, useEffect, useReducer, useState } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { employeeInformation } from '../../../../api/userUrl';
import { userGetMethod, userPutMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';
import { ToggleButton } from "../../../common/toggleBtn/toggleButton";

const Edit = (props) => {
    const { handleSubmit, register, errors } = useForm();

    var menuId = 0;
    if (props.location.state === undefined) {
        var menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }

    const [employeeInformationInput, setEmployeeInformationInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            contact_no                : "",
            department_id             : "",
            designation_id            : "",
            email                     : "",
            employee_id               : "",
            machine_location          : "",
            name                      : "",
            remarks                   : "",
            working_status            : "",
            id_card_number            : "",
            is_designer               : false,
            design_machine_location_id: "",

            designations     : [],
            departments      : [],
            designMachines   : [],
            isLoading        : true
        }
    );

    const employeeInformationId = props.match.params.employeeInformationId;

    const changeHandler = (event) => {
        setEmployeeInformationInput({[event.target.name]: event.target.value});
    }

    useEffect(() => {
        userGetMethod(`${employeeInformation}/${employeeInformationId}/edit`)
            .then(response => {
                let {contact_no,department_id,designation_id,email,employee_id,machine_location,name,remarks,
                    working_status, id_card_number, is_designer, design_machine_location_id} = response.data.employeeInformation;
                setEmployeeInformationInput({ 
                    contact_no, department_id, designation_id, email, employee_id, machine_location, name, remarks, working_status,
                    designations     : response.data.designations, id_card_number, is_designer, design_machine_location_id,
                    departments      : response.data.departments,
                    designMachines   : response.data.designMachines,
                    isLoading        : false
                });
            })
            .catch(error => console.log(error))   
    },[]);

    const submitHandler = (data, e) => {
        data.is_designer = employeeInformationInput.is_designer;
        userPutMethod(`${employeeInformation}/${employeeInformationId}`, data )
            .then(response => {
                if (response.data.status == 1) {
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            })
            .catch(error => toast.error(error))
    }

    let designationOptions = [];
    if (employeeInformationInput && employeeInformationInput.designations.length > 0) {
        designationOptions = employeeInformationInput.designations.map((designation) => (<option key={designation.id} value={designation.id}>{designation.role_name}</option>))
    }

    let departmentOptions = [];
    if (employeeInformationInput && employeeInformationInput.departments.length > 0) {
        departmentOptions = employeeInformationInput.departments.map((department) => (<option key={department.id} value={department.id}>{department.name}</option>))
    }

    let designMachine = [];
    if (employeeInformationInput.designMachines && employeeInformationInput.designMachines.length > 0) {
        designMachine = employeeInformationInput.designMachines.map((machine) => (<option key={machine.id} value={machine.id}>{machine.machine_name}</option>))
    }

    return (
        <Fragment>
            {/* <Breadcrumb title="Designation Edit" parent="Designation" /> */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">

                        <div className="card">
                            <div className="card-header">
                                <h5>Update Designation</h5>
                            </div>
                            <div className="card-body"> 
                                {employeeInformationInput.isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="employee_id">Employee Id</label>
                                                <div className="col-sm-8">
                                                    <input 
                                                        className="form-control"
                                                        id="employee_id" 
                                                        type="text" 
                                                        readOnly={'readonly'}
                                                        placeholder="Employee Id"
                                                        onChange={changeHandler}
                                                        value={employeeInformationInput.employee_id}
                                                    />
                                                    {errors.employee_id && <p className='text-danger'>{errors.employee_id.message}</p>}
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="name">Employee Name</label>
                                                <div className="col-sm-8">
                                                    <input 
                                                        className="form-control"
                                                        id="name" 
                                                        name="name" 
                                                        type="text" 
                                                        placeholder="Employee Name"
                                                        onChange={changeHandler}
                                                        value={employeeInformationInput.name}
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
                                                        onChange={changeHandler}
                                                        value={employeeInformationInput.email}
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
                                                        })} defaultValue={employeeInformationInput.designation_id}>
                                                        <option> Select Designation </option>
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
                                                        })} defaultValue={employeeInformationInput.department_id} >
                                                        <option> Select Department </option>
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
                                                        onChange={changeHandler}
                                                        value={employeeInformationInput.contact_no}
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
                                                        selected={employeeInformationInput.is_designer}
                                                        toggleSelected={() => {
                                                            setEmployeeInformationInput({
                                                                is_designer : !employeeInformationInput.is_designer
                                                            });
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
                                                        onChange={changeHandler}
                                                        value={employeeInformationInput.machine_location ? employeeInformationInput.machine_location : ''}
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
                                                        })} defaultValue={employeeInformationInput.working_status} >
                                                        <option> Select One </option>
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
                                                        onChange={changeHandler}
                                                        value={employeeInformationInput.remarks ? employeeInformationInput.remarks : ''}
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
                                                        onChange={changeHandler}
                                                        value={employeeInformationInput.id_card_number ? employeeInformationInput.id_card_number : ''}
                                                        ref={register({
                                                            required: 'Id Card Number Field Required'
                                                        })}
                                                    />
                                                    {errors.id_card_number && <p className='text-danger'>{errors.id_card_number.message}</p>}
                                                </div>
                                            </div>
                                            {employeeInformationInput.is_designer ?(
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="design_machine_location_id">Design Machine</label>
                                                    <div className="col-sm-8">
                                                        <select className="form-control" required ref={register}  id="design_machine_location_id" name="design_machine_location_id"
                                                            ref={register({
                                                                required: 'Branch Field Required'
                                                            })} defaultValue={employeeInformationInput.design_machine_location_id}>
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

export default Edit;