import React, { Fragment, useEffect, useReducer, useState } from 'react';
import { DESIGN_MACHINE_LOCATION } from '../../../../api/userUrl';
import { userGetMethod, userPutMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';
import { ToggleButton } from "../../../common/toggleBtn/toggleButton";

const Edit = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [selected, setSelected] = useState(false);

    var menuId = 0;
    if (props.location.state === undefined) {
        var menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }

    const [machineInput, setMachineInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            machine_name : '',
            branch_id    : '',
            description  : '',
            active_status: '',
            reason       : '',
            branches     : [],
            isLoading    : true
        }
    );

    const designMachineLocationId = props.match.params.designMachineLocationId;

    const changeHandler = (event) => {
        setMachineInput({[event.target.name]: event.target.value});
    }

    useEffect(() => {
        userGetMethod(`${DESIGN_MACHINE_LOCATION}/${designMachineLocationId}/edit`)
            .then(response => {
                let{machine_name, branch_id, description, active_status, reason} = response.data.machine;
                setMachineInput({
                    machine_name : machine_name,
                    branch_id    : branch_id,
                    description  : description,
                    active_status: active_status == 1 ? true: false,
                    reason       : reason,
                    branches     : response.data.branches,
                    isLoading    : false
                });
            })
            .catch(error => console.log(error))   
    },[]);

    const submitHandler = (e) => {
        console.log({machineInput});
        userPutMethod(`${DESIGN_MACHINE_LOCATION}/${designMachineLocationId}`, machineInput )
            .then(response => {
                if (response.data.status == 1) {
                    toast.success(response.data.message);
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
                                <h5>Design Machine Location Update Form</h5>
                            </div>
                            <div className="card-body"> 
                                {machineInput.isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                    <div className="card-body">
                                        
                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label" htmlFor="machine_name">Machine Name</label>
                                            <div className="col-sm-4">
                                                <input 
                                                    className="form-control"
                                                    id="machine_name" 
                                                    name="machine_name" 
                                                    type="text" 
                                                    placeholder="Machine Name"
                                                    onChange={changeHandler}
                                                    value={machineInput.machine_name}
                                                    ref={register({
                                                        required: 'Machine Name Field Required'
                                                    })}
                                                />
                                                {errors.machine_name && <p className='text-danger'>{errors.machine_name.message}</p>}
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label required" htmlFor="branch_id">Branch</label>
                                            <div className="col-sm-4">
                                                <select 
                                                    name="branch_id" 
                                                    id="branch_id" 
                                                    required 
                                                    className="form-control" 
                                                    defaultValue={machineInput.branch_id}
                                                    onChange={changeHandler}
                                                    ref={register({
                                                        required: 'Branch Id Field Required'
                                                    })} 
                                                >
                                                <option value="">Select one</option>
                                                {machineInput.branches.map((branch, key) => (
                                                    <option value={branch.id} key={key}>{branch.branch_name}</option>
                                                ))}
                                                </select>
                                                {errors.branch_id && <p className='text-danger'>{errors.branch_id.message}</p>}
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label" htmlFor="description">Description</label>
                                            <div className="col-sm-4">
                                                <textarea 
                                                    name="description" 
                                                    id="description" 
                                                    className="form-control" 
                                                    raw={4}
                                                    defaultValue={machineInput.description}
                                                    onChange={changeHandler}
                                                    ref={register({})} 
                                                >
                                                    
                                                </textarea>
                                                {errors.description && <p className='text-danger'>{errors.description.message}</p>}
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label" htmlFor="inline-sqr-3">Active Status</label>
                                            <div className="col-md-4">
                                                <ToggleButton
                                                    selected={machineInput.active_status}
                                                    toggleSelected={() => {
                                                        setMachineInput({
                                                            active_status : !machineInput.active_status
                                                        });
                                                    }}
                                                    toggleYesMsg="Online"
                                                    toggleNoMsg="Offline"
                                                />
                                            </div>
                                        </div>

                                        {
                                            machineInput.active_status ? '' : (
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label" htmlFor="reason">Reason</label>
                                                    <div className="col-sm-4">
                                                        <textarea 
                                                            name="reason" 
                                                            id="reason" 
                                                            className="form-control" 
                                                            placeholder="Why Offile?"
                                                            defaultValue={machineInput.reason}
                                                            raw={4}
                                                            onChange={changeHandler}
                                                            ref={register({})} 
                                                        >
                                                        </textarea>
                                                        {errors.reason && <p className='text-danger'>{errors.reason.message}</p>}
                                                    </div>
                                                </div>
                                            )
                                        }
                                    
                                    </div>
                                    <SubmitButton link="designMachineLocation/index" menuId={ menuId } />
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