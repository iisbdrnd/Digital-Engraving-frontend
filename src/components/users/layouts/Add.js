import React, { Fragment } from 'react';
import useForm from 'react-hook-form'
import Breadcrumb from '../common/breadcrumb';


const CylinderInfo = (props) => {
    const { register, handleSubmit, errors } = useForm();

    return (
        <Fragment>
            <Breadcrumb title="Layouts Add" parent="Layout" />

            <div className="row">
                <div className="col-sm-12">
                    <form className="needs-validation theme-form" noValidate>
                        <div className="row">
                            <div className="col-sm-12 col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <strong>Job Info</strong>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-row">
                                                    <div className="col-md-12 mb-1">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label required" htmlFor="bco">BCO</label>
                                                            <div className="col-sm-9">
                                                                <input className="form-control" name="bco" id="bco" type="text" placeholder="BCO" ref={register({ required: true })} />
                                                                <span>{errors.bco && 'BCO is required'}</span>
                                                                <div className="valid-feedback">Looks good!</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-12 mb-1">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label" htmlFor="ho_remarks">HO Remarks</label>
                                                            <div className="col-sm-9">
                                                                <input className="form-control" name="ho_remarks" id="ho_remarks" type="text" placeholder="HO Remarks" disabled ref={register({ required: true })} />
                                                                <span>{errors.ho_remarks && 'HO Remarks is required'}</span>
                                                                <div className="valid-feedback">Looks good!</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 mb-1">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label required" htmlFor="ups">Printer</label>
                                                            <div className="col-sm-9">
                                                                <input className="form-control" name="printer" id="printer" type="text" placeholder="Printer" ref={register({ required: true })} />
                                                                <span>{errors.printer && 'Printer is required'}</span>
                                                                <div className="valid-feedback">Looks good!</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-5 col-offset-md-2 mb-1">

                                                        <div className="row">
                                                            <label className="col-sm-7 col-form-label" htmlFor="old_bco">Old BCO</label>
                                                            <div className="col-sm-5">
                                                                <input className="form-control" name="old_bco" id="old_bco" type="text" placeholder="Old BCO" ref={register({ required: true })} />
                                                                <span>{errors.old_bco && 'Old BCO is required'}</span>
                                                                <div className="valid-feedback">Looks good!</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-7 mb-1">
                                                        <div className="row">
                                                            <label className="col-sm-5 col-form-label" htmlFor="old_bco">Old BCO Prod. Date</label>
                                                            <div className="col-sm-7">
                                                                <input className="form-control" name="old_bco" id="old_bco" type="text" placeholder="Old BCO Prod. Date" disabled ref={register({ required: true })} />
                                                                <span>{errors.old_bco && 'Old BCO Prod. Date is required'}</span>
                                                                <div className="valid-feedback">Looks good!</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-row">
                                                    <div className="col-md-12 mb-1">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label required" htmlFor="job_type">Job Type</label>
                                                            <div className="col-sm-9">
                                                                <input className="form-control" name="job_type" id="job_type" type="text" placeholder="Job Type" disabled ref={register({ required: true })} />
                                                                <span>{errors.job_type && 'Job Type is required'}</span>
                                                                <div className="valid-feedback">Looks good!</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 mb-1">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label required" htmlFor="printing_type">Printing Type</label>
                                                            <div className="col-sm-9">
                                                                <input className="form-control" name="printing_type" id="printing_type" type="text" placeholder="Printing Type" disabled ref={register({ required: true })} />
                                                                <span>{errors.printing_type && 'Printing Type is required'}</span>
                                                                <div className="valid-feedback">Looks good!</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 mb-1">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label required" htmlFor="no_of_cyl">No of Cyl</label>
                                                            <div className="col-sm-9">
                                                                <input className="form-control" name="no_of_cyl" id="no_of_cyl" type="text" placeholder="No of Cyl" disabled ref={register({ required: true })} />
                                                                <span>{errors.no_of_cyl && 'No of Cyl is required'}</span>
                                                                <div className="valid-feedback">Looks good!</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-7 col-offset-md-2 mb-1">

                                                        <div className="row">
                                                            <label className="col-sm-5 col-form-label" htmlFor="inline-sqr-2">Color</label>
                                                            <div className="col-sm-6 offset-sm-1 checkbox checkbox-dark m-squar">
                                                                <div className="row">
                                                                    <div className="col-sm-2">
                                                                        <label htmlFor="inline-sqr-2">C</label>
                                                                        <input id="inline-sqr-2" name='color_c' type="checkbox" />
                                                                    </div>
                                                                    <div className="col-sm-2">
                                                                        <label htmlFor="inline-sqr-2">M</label>
                                                                        <input id="inline-sqr-2" name='color_m' type="checkbox" />
                                                                    </div>
                                                                    <div className="col-sm-2">
                                                                        <label htmlFor="inline-sqr-2">Y</label>
                                                                        <input id="inline-sqr-2" name='color_y' type="checkbox" />
                                                                    </div>
                                                                    <div className="col-sm-2">
                                                                        <label htmlFor="inline-sqr-2">K</label>
                                                                        <input id="inline-sqr-2" name='color_k' type="checkbox" />
                                                                    </div>
                                                                </div>
                                                                
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5 mb-1">
                                                        <div className="row">
                                                            <label className="col-sm-5 col-form-label" htmlFor="old_bco">Exta Color</label>
                                                            <div className="col-sm-7">
                                                                <input className="form-control" name="old_bco" id="old_bco" type="text" placeholder="Exta Color" disabled ref={register({ required: true })} />
                                                                <span>{errors.old_bco && 'Exta Color is required'}</span>
                                                                <div className="valid-feedback">Looks good!</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            
                            <div className="col-sm-12 col-md-4">
                                <div className="card">
                                    <div className="card-header">
                                        <strong>Layout</strong>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-row">
                                            <div className="col-md-12 mb-1">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label required" htmlFor="bco">BCO</label>
                                                    <div className="col-sm-9">
                                                        <input className="form-control" name="bco" id="bco" type="text" placeholder="BCO" ref={register({ required: true })} />
                                                        <span>{errors.bco && 'BCO is required'}</span>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-12 mb-1">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label" htmlFor="id">Id</label>
                                                    <div className="col-sm-9">
                                                        <input className="form-control" name="id" id="id" type="text" placeholder="Id" disabled ref={register({ required: true })} />
                                                        <span>{errors.id && 'Id is required'}</span>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                </div>
                                            </div>  
                                            
                                            <div className="col-md-6 col-offset-md-2 mb-1">
                                                <div className="row">
                                                    <label className="col-sm-6 col-form-label" htmlFor="remarks">Remarks</label>
                                                    <div className="col-sm-5 pl-2">
                                                        <input className="form-control" name="remarks" id="remarks" type="text" placeholder="Remarks" ref={register({ required: true })} />
                                                        <span>{errors.remarks && 'Remarks is required'}</span>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-1">
                                                <div className="row">
                                                    <label className="col-sm-5 col-form-label" htmlFor="dia">Dia</label>
                                                    <div className="col-sm-7">
                                                        <input className="form-control" name="dia" id="dia" type="text" placeholder="Dia" disabled ref={register({ required: true })} />
                                                        <span>{errors.dia && 'Dia is required'}</span>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 mb-1">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label" htmlFor="layout_id">Layout ID</label>
                                                    <div className="col-sm-9">
                                                        <input className="form-control" name="layout_id" id="layout_id" type="text" placeholder="Id" disabled ref={register({ required: true })} />
                                                        <span>{errors.layout_id && 'Layout ID is required'}</span>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-offset-md-2 mb-1">
                                                <div className="row">
                                                    <label className="col-sm-6 col-form-label" htmlFor="ups">UPS</label>
                                                    <div className="col-sm-5 pl-2">
                                                        <input className="form-control" name="ups" id="ups" type="text" placeholder="UPS" ref={register({ required: true })} />
                                                        <span>{errors.ups && 'UPS is required'}</span>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-1">
                                                <div className="row">
                                                    <label className="col-sm-5 col-form-label" htmlFor="rpt">Rpt</label>
                                                    <div className="col-sm-7">
                                                        <input className="form-control" name="rpt" id="rpt" type="text" placeholder="Rpt" disabled ref={register({ required: true })} />
                                                        <span>{errors.rpt && 'Rpt is required'}</span>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-offset-md-2 mb-1">
                                                <div className="row">
                                                    <label className="col-sm-6 col-form-label" htmlFor="eye_mc">Eye MC</label>
                                                    <div className="col-sm-5 pl-2">
                                                        <input className="form-control" name="eye_mc" id="eye_mc" type="text" placeholder="Eye MC" ref={register({ required: true })} />
                                                        <span>{errors.eye_mc && 'Eye MC is required'}</span>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-1">
                                                <div className="row">
                                                    <label className="col-sm-5 col-form-label" htmlFor="printer_m">Printer M</label>
                                                    <div className="col-sm-7">
                                                        {/* <input className="form-control" name="printer_m" id="printer_m" type="text" placeholder="Printer M" disabled ref={register({ required: true })} /> */}
                                                        
                                                        <input id="printer_m" name='printer_m' type="checkbox" />
                                                        <span>{errors.printer_m && 'Printer M is required'}</span>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-offset-md-2 mb-1">
                                                <div className="row">
                                                    <label className="col-sm-6 col-form-label" htmlFor="date_time">Date Time</label>
                                                    <div className="col-sm-5 pl-2">
                                                        <input className="form-control" name="date_time" id="date_time" type="date" placeholder="Date Time" ref={register({ required: true })} />
                                                        <span>{errors.date_time && 'Date Time is required'}</span>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-1">
                                                <div className="row">
                                                    <label className="col-sm-5 col-form-label" htmlFor="printer_m">Mark as Complete</label>
                                                    <div className="col-sm-7">
                                                        {/* <input className="form-control" name="printer_m" id="printer_m" type="text" placeholder="Mark as Complete" disabled ref={register({ required: true })} /> */}
                                                        
                                                        <input id="mark_as_complete" name='mark_as_complete' type="checkbox" />
                                                        <span>{errors.printer_m && 'Mark as Complete is required'}</span>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* <div className="col-md-12 mb-1">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label" htmlFor="layout_id">Layout ID</label>
                                                    <div className="col-sm-9">
                                                        <input className="form-control" name="layout_id" id="layout_id" type="text" placeholder="Id" disabled ref={register({ required: true })} />
                                                        <span>{errors.layout_id && 'Layout ID is required'}</span>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                </div>
                                            </div> */}

                                            <div className="col-md-12 mb-1">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label" htmlFor="layout_id">Station</label>

                                                    <div className="col-sm-9">
                                                        <select className="form-control" required ref={register}  id="station" name="station"
                                                        ref={register({
                                                            required: 'Station Field Required'
                                                        })} >
                                                            <option> Select One </option>
                                                            
                                                        </select>
                                                        {errors.station && <p className='text-danger'>{errors.station.message}</p>}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6 col-offset-md-2 mb-1">
                                                <div className="row">
                                                    <label className="col-sm-6 col-form-label" htmlFor="info">Info</label>
                                                    <div className="col-sm-5 pl-2">
                                                        <select className="form-control" required ref={register}  id="info" name="info"
                                                        ref={register({
                                                            required: 'Info Field Required'
                                                        })} >
                                                            <option> Select One </option>
                                                            
                                                        </select>
                                                        {errors.info && <p className='text-danger'>{errors.info.message}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-1">
                                                <div className="row">
                                                    <label className="col-sm-5 col-form-label" htmlFor="printer_m">Layout</label>
                                                    <div className="col-sm-7">
                                                        <select className="form-control" required ref={register}  id="layout" name="layout"
                                                            ref={register({
                                                                required: 'Layout Field Required'
                                                            })} >
                                                                <option> Select One </option>
                                                                
                                                        </select>
                                                        {errors.layout && <p className='text-danger'>{errors.layout.message}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>
                            </div>
                            
                            
                            <div className="col-sm-12 col-md-4">
                                <div className="card">
                                    <div className="card-header">
                                        <strong>Layout history</strong>
                                    </div>
                                    <div className="card-body">
                                        {/* <div className="col-md-10"> */}
                                            <div className="form-row">
                                                <div className="col-md-12 mb-1">
                                                    {/* <div className="row">
                                                        <div className="col-sm-9"> */}
                                                            <table className="table table-bordered">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Sl.</th>
                                                                        <th scope="col">BCO</th>
                                                                        <th scope="col">Date</th>
                                                                        <th scope="col">Remarks</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <input className="form-control" name="layout_history_sl" id="layout_history_sl" type="text" disabled ref={register({ required: true })} />
                                                                            <span>{errors.layout_history_sl && 'Sl is required'}</span>
                                                                            <div className="valid-feedback">Looks good!</div>
                                                                        </td>
                                                                        <td>
                                                                            <input className="form-control" name="layout_history_bco" id="layout_history_bco" type="text" disabled ref={register({ required: true })} />
                                                                            <span>{errors.layout_history_bco && 'BCO is required'}</span>
                                                                            <div className="valid-feedback">Looks good!</div>
                                                                        </td>
                                                                        <td>
                                                                            <input className="form-control" name="layout_history_date" id="layout_history_date" type="text" disabled ref={register({ required: true })} />
                                                                            <span>{errors.layout_history_date && 'Date is required'}</span>
                                                                            <div className="valid-feedback">Looks good!</div>
                                                                        </td>
                                                                        <td>
                                                                            <input className="form-control" name="layout_history_remarks" id="layout_history_remarks" type="text" ref={register({ required: true })} />
                                                                            <span>{errors.layout_history_remarks && 'Remarks is required'}</span>
                                                                            <div className="valid-feedback">Looks good!</div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        {/* </div>
                                                    </div> */}
                                                </div>

                                                <div className="col-md-12 mb-1">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label required" htmlFor="bco">Thumb</label>
                                                        <div className="col-sm-9">
                                                            <input className="form-control-file" name="thumb" id="thumb" type="file" placeholder="BCO" ref={register({ required: true })} />
                                                            <span>{errors.thumb && 'BCO is required'}</span>
                                                            <div className="valid-feedback">Looks good!</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        {/* </div> */}
                                    </div>
                                </div>
                                

                                <div className="card">
                                    <div className="card-header">
                                        <strong>Base</strong>
                                    </div>
                                    <div className="card-body">
                                        {/* <div className="col-md-10"> */}
                                            <div className="form-row">
                                                <div className="col-md-12 mb-1">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="remarks">Remarks</label>
                                                        <div className="col-sm-9 pl-2">
                                                            <input className="form-control" name="remarks" id="remarks" type="text" placeholder="Remarks" ref={register({ required: true })} />
                                                            <span>{errors.remarks && 'Remarks is required'}</span>
                                                            <div className="valid-feedback">Looks good!</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-7 mb-1">
                                                    <div className="row">
                                                        <label className="col-sm-5 col-form-label" htmlFor="desire_dia">Desire Dia</label>
                                                        <div className="col-sm-7 pl-2">
                                                            <input className="form-control" name="desire_dia" id="desire_dia" type="text" disabled ref={register({ required: true })} />
                                                            <span>{errors.desire_dia && 'Desire Dia is required'}</span>
                                                            <div className="valid-feedback">Looks good!</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-5 mb-1">
                                                    <div className="row">
                                                        <label className="col-sm-6 col-form-label" htmlFor="desire_dia">Desire Dia</label>
                                                        <div className="col-sm-6">
                                                            <input className="form-control" name="desire_dia" id="desire_dia" type="text" disabled ref={register({ required: true })} />
                                                            <span>{errors.desire_dia && 'Desire Dia is required'}</span>
                                                            <div className="valid-feedback">Looks good!</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-7 mb-1">
                                                    <div className="row">
                                                        <label className="col-sm-5 col-form-label" htmlFor="final_dia">Final Dia</label>
                                                        <div className="col-sm-7 pl-2">
                                                            <input className="form-control" name="final_dia" id="final_dia" type="text" disabled ref={register({ required: true })} />
                                                            <span>{errors.final_dia && 'Final Dia is required'}</span>
                                                            <div className="valid-feedback">Looks good!</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-5 mb-1">
                                                    <div className="row">
                                                        <label className="col-sm-6 col-form-label" htmlFor="final_dia">Final Dia</label>
                                                        <div className="col-sm-6">
                                                            <input className="form-control" name="final_dia" id="final_dia" type="text" disabled ref={register({ required: true })} />
                                                            <span>{errors.final_dia && 'Final Dia is required'}</span>
                                                            <div className="valid-feedback">Looks good!</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        {/* </div> */}
                                    </div>
                                </div>
                            
                            </div>
                            
                            
                            <div className="col-sm-12 col-md-4">
                                <div className="card">
                                    <div className="card-header">
                                        <strong>Engravers Order</strong>
                                    </div>
                                    <div className="card-body">
                                        {/* <div className="col-md-10"> */}
                                            <div className="form-row">
                                                <div className="col-md-12 mb-1">
                                                    {/* <div className="row">
                                                        <div className="col-sm-9"> */}
                                                            <table className="table table-bordered">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Sl.</th>
                                                                        <th scope="col">Color</th>
                                                                        <th scope="col">Desire Screen</th>
                                                                        <th scope="col">Desire Angel</th>
                                                                        <th scope="col">Engraving Machine</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <input className="form-control" name="engravers_sl" id="engravers_sl" type="text" disabled ref={register({ required: true })} />
                                                                            <span>{errors.engravers_sl && 'Sl is required'}</span>
                                                                            <div className="valid-feedback">Looks good!</div>
                                                                        </td>
                                                                        <td>
                                                                            <select className="form-control" required ref={register}  id="engravers_color" name="engravers_color"
                                                                            ref={register({
                                                                                required: 'Station Field Required'
                                                                            })} >
                                                                                <option> Select </option>
                                                                                <option> Select </option>
                                                                                <option> Select </option>
                                                                            </select>
                                                                            {errors.engravers_color && <p className='text-danger'>{errors.engravers_color.message}</p>}
                                                                        </td>
                                                                        <td>
                                                                            <input className="form-control" name="engravers_desire_screen" id="engravers_desire_screen" type="text" disabled ref={register({ required: true })} />
                                                                            <span>{errors.engravers_desire_screen && 'Date is required'}</span>
                                                                            <div className="valid-feedback">Looks good!</div>
                                                                        </td>
                                                                        <td>
                                                                            <input className="form-control" name="engravers_desire_angle" id="engravers_desire_angle" type="text" ref={register({ required: true })} />
                                                                            <span>{errors.engravers_desire_angle && 'Remarks is required'}</span>
                                                                            <div className="valid-feedback">Looks good!</div>
                                                                        </td>
                                                                        <td>
                                                                            <select className="form-control" required ref={register}  id="engravers_engraving_machine" name="engravers_engraving_machine"
                                                                            ref={register({
                                                                                required: 'Station Field Required'
                                                                            })} >
                                                                                <option> Select </option>
                                                                                <option> Select </option>
                                                                                <option> Select </option>
                                                                            </select>
                                                                            {errors.engravers_engraving_machine && <p className='text-danger'>{errors.engravers_engraving_machine.message}</p>}
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        {/* </div>
                                                    </div> */}
                                                </div>

                                            </div>
                                        
                                        {/* </div> */}
                                    </div>
                                </div>
                                
                            </div>
                            
                            
                            {/* <div className="col-sm-12 col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <strong>Job Info</strong>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-row">
                                                    

                                                    <div className="col-md-5 mb-1">

                                                        <div className="row">
                                                            <label className="col-sm-12" htmlFor="old_bco">Old BCO</label>
                                                            <div className="col-sm-12">
                                                                <input className="form-control" name="old_bco" id="old_bco" type="text" placeholder="Old BCO" ref={register({ required: true })} />
                                                                <span>{errors.old_bco && 'Old BCO is required'}</span>
                                                                <div className="valid-feedback">Looks good!</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    +
                                                    <div className="col-md-7 mb-1">
                                                        <div className="row">
                                                            <label className="col-sm-12" htmlFor="old_bco">Old BCO Prod. Date</label>
                                                            <div className="col-sm-12">
                                                                <input className="form-control" name="old_bco" id="old_bco" type="text" placeholder="Old BCO Prod. Date" disabled ref={register({ required: true })} />
                                                                <span>{errors.old_bco && 'Old BCO Prod. Date is required'}</span>
                                                                <div className="valid-feedback">Looks good!</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                         */}
                        </div>

                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default CylinderInfo;