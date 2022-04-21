import React, { Fragment, useState } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { menuRsURL } from '../../../../api/adminUrl';
import { adminPostMethod } from '../../../../api/action';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';

const Add = () => {
    const { handleSubmit, register, errors } = useForm();

    const [resource, setResource] = useState(false)
    const [status, setStatus] = useState(true)

    const submitHandler = (data) => {
        
    }
    
    return (
        
        <Fragment>
            <Breadcrumb title="Grinding Add" parent="Grinding" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Grinding Form</h5>
                            </div>
                            <form onSubmit={handleSubmit(submitHandler)} className="needs-validation theme-form">
                                <div className="card-body">
                                    {/* FIRST ROW */}
                                    <div className="row">

                                        <div className="col-sm-6">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h6>Job Info</h6>
                                                </div>
                                                <div className="card-body">
                                                    {/* FIRST ROW */}
                                                    <div className="form-row">
                                                        <div className="col-md-4 mb-1">
                                                            <div className="row">
                                                                <label className="col-sm-5 col-form-label" htmlFor="bco">BCO</label>
                                                                <div className="col-sm-7">
                                                                    <input className="form-control" name="bco" id="bco" type="text" placeholder="BCO" ref={register({ required: true })} />
                                                                    <span>{errors.bco && 'BCO is required'}</span>
                                                                    <div className="valid-feedback">Looks good!</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-4 mb-1">
                                                            <div className="row">
                                                                <label className="col-sm-5 col-form-label" htmlFor="desired_fl">Desired FL</label>
                                                                <div className="col-sm-7">
                                                                    <input disabled className="form-control" name="desired_fl" id="desired_fl" type="text" placeholder="Desired FL" ref={register({ required: true })} />
                                                                    <span>{errors.desired_fl && 'Desired FL is required'}</span>
                                                                    <div className="valid-feedback">Looks good!</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-4 mb-1">
                                                            <div className="row">
                                                                <label className="col-sm-5 col-form-label" htmlFor="nob_name">Nob Name</label>
                                                                <div className="col-sm-7">
                                                                    <input disabled className="form-control" name="nob_name" id="nob_name" type="text" placeholder="Nob Name" ref={register({ required: true })} />
                                                                    <span>{errors.nob_name && 'Nob Name is required'}</span>
                                                                    <div className="valid-feedback">Looks good!</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* SECOND ROW */}
                                                    <div className="form-row">
                                                        <div className="col-md-4 mb-1">
                                                            <div className="row">
                                                                <label className="col-sm-5 col-form-label" htmlFor="cylinder_name">Na of Cyl</label>
                                                                <div className="col-sm-7">
                                                                    <input disabled className="form-control" name="cylinder_name" id="cylinder_name" type="text" placeholder="Na of Cylinder" ref={register({ required: true })} />
                                                                    <span>{errors.cylinder_name && 'Na of Cylinder is required'}</span>
                                                                    <div className="valid-feedback">Looks good!</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-4 mb-1">
                                                            <div className="row">
                                                                <label className="col-sm-5 col-form-label" htmlFor="desired_cir">Desired Cir</label>
                                                                <div className="col-sm-7">
                                                                    <input disabled className="form-control" name="desired_cir" id="desired_cir" type="text" placeholder="Desired Cir" ref={register({ required: true })} />
                                                                    <span>{errors.desired_cir && 'Desired Cir is required'}</span>
                                                                    <div className="valid-feedback">Looks good!</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-4 mb-1">
                                                            <div className="row">
                                                                <label className="col-sm-5 col-form-label" htmlFor="client">Client</label>
                                                                <div className="col-sm-7">
                                                                    <input disabled className="form-control" name="client" id="client" type="text" placeholder="Client" ref={register({ required: true })} />
                                                                    <span>{errors.client && 'Client is required'}</span>
                                                                    <div className="valid-feedback">Looks good!</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* THIRD ROW */}
                                                    <div className="form-row">
                                                        <div className="col-md-4 mb-1">
                                                            <div className="row">
                                                                <label className="col-sm-5 col-form-label" htmlFor="base_source">Base Sour.</label>
                                                                <div className="col-sm-7">
                                                                    <input disabled className="form-control" name="base_source" id="base_source" type="text" placeholder="Base Sourceinder" ref={register({ required: true })} />
                                                                    <span>{errors.base_source && 'Base Sourceinder is required'}</span>
                                                                    <div className="valid-feedback">Looks good!</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-4 mb-1">
                                                            <div className="row">
                                                                <label className="col-sm-5 col-form-label" htmlFor="desired_dia">Desired Dia</label>
                                                                <div className="col-sm-7">
                                                                    <input disabled className="form-control" name="desired_dia" id="desired_dia" type="text" placeholder="Desired Dia" ref={register({ required: true })} />
                                                                    <span>{errors.desired_dia && 'Desired Dia is required'}</span>
                                                                    <div className="valid-feedback">Looks good!</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-4 mb-1">
                                                            <div className="row">
                                                                <label className="col-sm-5 col-form-label" htmlFor="marketing_person">Marketing P.</label>
                                                                <div className="col-sm-7">
                                                                    <input disabled className="form-control" name="marketing_person" id="marketing_person" type="text" placeholder="Market. Person" ref={register({ required: true })} />
                                                                    <span>{errors.marketing_person && 'Market. Person is required'}</span>
                                                                    <div className="valid-feedback">Looks good!</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* FOURTH ROW */}
                                                    <div className="form-row">
                                                        <div className="col-md-4 mb-1">
                                                            <div className="row">
                                                                <label className="col-sm-5 col-form-label" htmlFor="printer">Printer</label>
                                                                <div className="col-sm-7">
                                                                    <input disabled className="form-control" name="printer" id="printer" type="text" placeholder="Printer" ref={register({ required: true })} />
                                                                    <span>{errors.printer && 'Printer is required'}</span>
                                                                    <div className="valid-feedback">Looks good!</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-4 mb-1">
                                                            <div className="row">
                                                                <label className="col-sm-5 col-form-label" htmlFor="job_type">Job Type</label>
                                                                <div className="col-sm-7">
                                                                    <input disabled className="form-control" name="job_type" id="job_type" type="text" placeholder="Job Type" ref={register({ required: true })} />
                                                                    <span>{errors.job_type && 'Job Type is required'}</span>
                                                                    <div className="valid-feedback">Looks good!</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-4 mb-1">
                                                            <div className="row">
                                                                <label className="col-sm-5 col-form-label" htmlFor="job_type">Job Type</label>
                                                                <div className="col-sm-7">
                                                                    <input disabled className="form-control" name="job_type" id="job_type" type="text" placeholder="Job Type" ref={register({ required: true })} />
                                                                    <span>{errors.job_type && 'Job Type is required'}</span>
                                                                    <div className="valid-feedback">Looks good!</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h6>Grinding Operation</h6>
                                                </div>
                                                <div className="card-body">

                                                    <div className="form-row">
                                                        <div className="col-md-6 mb-1">
                                                            <div className="row">
                                                                <label className="col-sm-5 col-form-label" htmlFor="machine">Machine</label>
                                                                <div className="col-sm-7">
                                                                    <select className="form-control" id="machine" name="machine" 
                                                                    defaultValue=""
                                                                    ref={register({
                                                                        required: 'Machine Field Required'
                                                                    })}>
                                                                        <option value="">Select Machine</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6 mb-1">
                                                            <div className="row">
                                                                <label className="col-sm-5 col-form-label" htmlFor="shift">shift</label>
                                                                <div className="col-sm-7">
                                                                    <select className="form-control" id="shift" name="shift" 
                                                                    defaultValue=""
                                                                    ref={register({
                                                                        required: 'Shift Field Required'
                                                                    })}>
                                                                        <option value="">Select Shift</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-row">
                                                        <div className="col-md-6 mb-1">
                                                            <div className="row">
                                                                <label className="col-sm-5 col-form-label" htmlFor="start_time">Start Time</label>
                                                                <div className="col-sm-7">
                                                                    <input className="form-control" name="start_time" id="start_time" type="text" placeholder="Start Time" ref={register({ required: true })} />
                                                                    <span>{errors.start_time && 'Start Time is required'}</span>
                                                                    <div className="valid-feedback">Looks good!</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6 mb-1">
                                                            <div className="row">
                                                                <label className="col-sm-5 col-form-label" htmlFor="polishing">Polishing</label>
                                                                <div className="col-sm-7">
                                                                    <select className="form-control" id="polishing" name="polishing" 
                                                                    defaultValue=""
                                                                    ref={register({
                                                                        required: 'Polishing Field Required'
                                                                    })}>
                                                                        <option value="">Select Polishing</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className="form-row">
                                                        <div className="col-md-6 mb-1">
                                                            <div className="row">
                                                                <label className="col-sm-5 col-form-label" htmlFor="done_by">Done By</label>
                                                                <div className="col-sm-7">
                                                                    <select className="form-control" id="done_by" name="done_by" 
                                                                    defaultValue=""
                                                                    ref={register({
                                                                        required: 'Done By Field Required'
                                                                    })}>
                                                                        <option value="">Select Done By</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6 mb-1">
                                                            <div className="row">
                                                                <label className="col-sm-5 col-form-label" htmlFor="end_time">End Time</label>
                                                                <div className="col-sm-7">
                                                                    <input className="form-control" name="end_time" id="end_time" type="text" placeholder="End Time" ref={register({ required: true })} />
                                                                    <span>{errors.end_time && 'End Time is required'}</span>
                                                                    <div className="valid-feedback">Looks good!</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    {/* SECOND ROW */}
                                    <div className="row">
                                        {/* FIRST COLUMN */}
                                        <div className="col-sm-2">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h6>Cylinder</h6>
                                                </div>
                                                <div className="card-body">

                                                    <div className="form-row">
                                                        <div className="col-md-6 mb-1">
                                                            <label className="col-form-label" htmlFor="serial">Serial</label>
                                                            <input disabled className="form-control" name="serial" id="serial" type="text" placeholder="Serial" ref={register({ required: true })} />
                                                            <span>{errors.serial && 'Serial is required'}</span>
                                                            <div className="valid-feedback">Looks good!</div>
                                                        </div>

                                                        <div className="col-md-6 mb-1">
                                                            <label className="col-form-label" htmlFor="cylinder_id">Cylinder Id</label>
                                                            <input disabled className="form-control" name="cylinder_id" id="cylinder_id" type="text" placeholder="Cylinder Id" ref={register({ required: true })} />
                                                            <span>{errors.cylinder_id && 'Cylinder Id is required'}</span>
                                                            <div className="valid-feedback">Looks good!</div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        {/* SECOND COLUMN */}
                                        <div className="col-sm-4">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h6>Before Grinding Check</h6>
                                                </div>
                                                <div className="card-body">

                                                    <div className="form-row">
                                                        <div className="col-md-2 mb-1">
                                                            <label className="col-form-label" htmlFor="fl">FL</label>
                                                            <input disabled className="form-control" name="fl" id="fl" type="text" placeholder="FL" ref={register({ required: true })} />
                                                            <span>{errors.fl && 'FL is required'}</span>
                                                            <div className="valid-feedback">Looks good!</div>
                                                        </div>

                                                        <div className="col-md-3 mb-1">
                                                            <label className="col-form-label" htmlFor="dia">Dia</label>
                                                            <input disabled className="form-control" name="dia" id="dia" type="text" placeholder="Dia" ref={register({ required: true })} />
                                                            <span>{errors.dia && 'Dia is required'}</span>
                                                            <div className="valid-feedback">Looks good!</div>
                                                        </div>

                                                        <div className="col-md-2 mb-1">
                                                            <label className="col-form-label" htmlFor="target">Target</label>
                                                            <input className="form-control" name="target" id="target" type="text" placeholder="Target" ref={register({ required: true })} />
                                                            <span>{errors.target && 'Target is required'}</span>
                                                            <div className="valid-feedback">Looks good!</div>
                                                        </div>

                                                        <div className="col-md-2 mb-1">
                                                            <label className="col-form-label" htmlFor="pin_hole">#Pin Hole</label>
                                                            <input className="form-control" name="pin_hole" id="pin_hole" type="text" placeholder="#Pin Hole" ref={register({ required: true })} />
                                                            <span>{errors.pin_hole && '#Pin Hole is required'}</span>
                                                            <div className="valid-feedback">Looks good!</div>
                                                        </div>

                                                        <div className="col-md-1 mb-1">
                                                            <label for="base_down" className="col-form-label">Base Down</label>
                                                            <input className="form-control" type="checkbox" id="base_down" />
                                                        </div>

                                                        <div className="col-md-1 mb-1">
                                                            <label for="key_lock" className="col-form-label">Key Lock</label>
                                                            <input className="form-control" type="checkbox" id="key_lock" />
                                                        </div>

                                                        <div className="col-md-1 mb-1">
                                                            <label for="cone_prob" className="col-form-label">Cone Prob</label>
                                                            <input className="form-control" type="checkbox" id="cone_prob" />
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        {/* THIRD COLUMN */}
                                        <div className="col-sm-4">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h6>After Grinding Check</h6>
                                                </div>
                                                <div className="card-body">

                                                <div className="form-row">

                                                        <div className="col-md-3 mb-1">
                                                            <label className="col-form-label" htmlFor="dia">Dia</label>
                                                            <input className="form-control" name="dia" id="dia" type="text" placeholder="Dia" ref={register({ required: true })} />
                                                            <span>{errors.dia && 'Dia is required'}</span>
                                                            <div className="valid-feedback">Looks good!</div>
                                                        </div>

                                                        <div className="col-md-3 mb-1">
                                                            <label className="col-form-label" htmlFor="pin_hole">#Pin Hole</label>
                                                            <input className="form-control" name="pin_hole" id="pin_hole" type="text" placeholder="#Pin Hole" ref={register({ required: true })} />
                                                            <span>{errors.pin_hole && '#Pin Hole is required'}</span>
                                                            <div className="valid-feedback">Looks good!</div>
                                                        </div>

                                                        <div className="col-md-1 mb-1">
                                                            <label for="base_down" className="col-form-label">Base Down</label>
                                                            <input className="form-control" type="checkbox" id="base_down" />
                                                        </div>

                                                        <div className="col-md-1 mb-1">
                                                            <label for="key_lock" className="col-form-label">Key Lock</label>
                                                            <input className="form-control" type="checkbox" id="key_lock" />
                                                        </div>

                                                        <div className="col-md-1 mb-1">
                                                            <label for="cone_prob" className="col-form-label">Cone Prob</label>
                                                            <input className="form-control" type="checkbox" id="cone_prob" />
                                                        </div>
                                                        
                                                        <div className="col-md-2 mb-1">
                                                            <label for="mark_complete" className="col-form-label">Mark as Complete</label>
                                                            <input className="form-control" type="checkbox" id="mark_complete" />
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        {/* FOURTH COLUMN */}
                                        <div className="col-sm-2">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h6>Plating Order Remarks</h6>
                                                </div>
                                                <div className="card-body">

                                                    <div className="form-row">
                                                        <div className="col-md-5 mb-1">
                                                            <label className="col-form-label" htmlFor="plating_order">Plating Order</label>
                                                            <input className="form-control" name="plating_order" id="plating_order" type="text" placeholder="Plating Order" ref={register({ required: true })} />
                                                            <span>{errors.plating_order && 'Plating Order is required'}</span>
                                                            <div className="valid-feedback">Looks good!</div>
                                                        </div>

                                                        <div className="col-md-7 mb-1">
                                                            <label className="col-form-label" htmlFor="cylinder_remarks">Remarks for Cylinder</label>
                                                            <input className="form-control" name="cylinder_remarks" id="cylinder_remarks" type="text" placeholder="Remarks for Cylinder" ref={register({ required: true })} />
                                                            <span>{errors.cylinder_remarks && 'Remarks for Cylinder is required'}</span>
                                                            <div className="valid-feedback">Looks good!</div>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* THIRD ROW */}
                                    <div className="row">
                                        {/* FIRST COLUMN */}
                                        <div className="col-sm-6">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h6>Final Measurement</h6>
                                                </div>
                                                <div className="card-body">
                                                    {/* FIRST ROW */}
                                                    <div className="form-row">
                                                        <div className="col-md-4 mb-1">
                                                            <div className="row">
                                                                <label className="col-sm-5 col-form-label" htmlFor="final_fl">Final FL</label>
                                                                <div className="col-sm-7">
                                                                    <input className="form-control" name="final_fl" id="final_fl" type="text" placeholder="Final FL" ref={register({ required: true })} />
                                                                    <span>{errors.final_fl && 'Final FL is required'}</span>
                                                                    <div className="valid-feedback">Looks good!</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-4 mb-1">
                                                            <div className="row">
                                                                <label className="col-sm-5 col-form-label" htmlFor="final_dia">Final Dia</label>
                                                                <div className="col-sm-7">
                                                                    <input className="form-control" name="final_dia" id="final_dia" type="text" placeholder="Final Dia" ref={register({ required: true })} />
                                                                    <span>{errors.final_dia && 'Final Dia is required'}</span>
                                                                    <div className="valid-feedback">Looks good!</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-4 mb-1">
                                                            <div className="row">
                                                                <label className="col-sm-5 col-form-label" htmlFor="final_cir">Final Cir</label>
                                                                <div className="col-sm-7">
                                                                    <input disabled className="form-control" name="final_cir" id="final_cir" type="text" placeholder="Final Cir" ref={register({ required: true })} />
                                                                    <span>{errors.final_cir && 'Final Cir is required'}</span>
                                                                    <div className="valid-feedback">Looks good!</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        {/* SECOND COLUMN */}
                                        <div className="col-sm-6">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h6>Note</h6>
                                                </div>
                                                <div className="card-body">

                                                    <div className="form-row">
                                                        <div className="col-md-12 mb-1">
                                                            <div className="row">
                                                                <input className="form-control" name="note" id="note" type="text" placeholder="Note" ref={register({ required: true })} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <SubmitButton link="menu/list" offset="9"/>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Add;