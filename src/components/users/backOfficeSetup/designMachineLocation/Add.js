import React, { Fragment, useEffect, useState } from 'react';
import { DESIGN_MACHINE_LOCATION } from '../../../../api/userUrl';
import { userGetMethod, userPostMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';
import { ToggleButton } from "../../../common/toggleBtn/toggleButton";

const Add = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [selected, setSelected] = useState(true);
    const [branches, setBranches] = useState();
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(()=>{
        userGetMethod(`${DESIGN_MACHINE_LOCATION}/create`)
            .then(response => {
                setBranches(response.data.branches);
                setIsLoading(false);
            })
    }, []);

    const submitHandler = (data, e) => {
        data.active_status = selected;
        userPostMethod(DESIGN_MACHINE_LOCATION, data)
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
        menuId = 0;
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
                                <h5>Design Machine Form</h5>
                            </div>
                            <div className="card-body">
                                {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label required" htmlFor="machine_name">Machine Name</label>
                                        <div className="col-sm-4">
                                            <input 
                                                className="form-control"
                                                id="machine_name" 
                                                name="machine_name" 
                                                type="text" 
                                                placeholder="Machine Name"
                                                // onChange={changeHandler}
                                                // value={userInput.name}
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
                                                defaultValue=""
                                                ref={register({
                                                    required: 'Branch Id Field Required'
                                                })} 
                                            >
                                            <option value="">Select one</option>
                                            {branches.map((branch, key) => (
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
                                                defaultValue=""
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
                                                selected={selected}
                                                toggleSelected={() => {
                                                    setSelected(!selected);
                                                }}
                                                toggleYesMsg="Online"
                                                toggleNoMsg="Offline"
                                            />
                                        </div>
                                    </div>

                                    {
                                        selected ? '' : (
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label" htmlFor="reason">Reason</label>
                                                <div className="col-sm-4">
                                                    <textarea 
                                                        name="reason" 
                                                        id="reason" 
                                                        className="form-control" 
                                                        placeholder="Why Offile?"
                                                        raw={4}
                                                        ref={register({})} 
                                                    >
                                                    </textarea>
                                                    {errors.reason && <p className='text-danger'>{errors.reason.message}</p>}
                                                </div>
                                            </div>
                                        )
                                    }

                                    <SubmitButton link="designMachineLocation/index" addClass="offset-md-2" menuId={ menuId } />
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