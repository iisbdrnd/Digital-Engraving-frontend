import React, { Fragment, useState, useEffect, useReducer } from 'react';
import { JOB_ORDER_DETAILS, GRINDING_RSURL } from '../../../../api/userUrl';
import { userGetMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { Typeahead } from 'react-bootstrap-typeahead';
import { SubmitButton } from '../../../common/GlobalButton';
import DatePicker from "react-datepicker";

const RowsByTotalCyl = () => {
    return(
        <>
        {/* FIRST COLUMN */}
        <div className="col-sm-2 pl-2 p-1">
            <fieldset className="border p-1">
                <legend className="w-auto text-left">Cylinder</legend>
                <div className="form-row">
                    <div className="col-md-6 mb-1 ">
                        <label className="col-form-label" htmlFor="serial">Serial</label>
                        <input disabled className="form-control" name="serial" id="serial" type="text" placeholder="Serial" 
                        // ref={register({ required: true })}
                         />
                        {/* <span>{errors.serial && 'Serial is required'}</span> */}
                        <div className="valid-feedback">Looks good!</div>
                    </div>

                    <div className="col-md-6 mb-1">
                        <label className="col-form-label" htmlFor="cylinder_id">Cylinder Id</label>
                        <input disabled className="form-control" name="cylinder_id" id="cylinder_id" type="text" placeholder="Cylinder Id" 
                        // ref={register({ required: true })}
                         />
                        {/* <span>{errors.cylinder_id && 'Cylinder Id is required'}</span> */}
                        <div className="valid-feedback">Looks good!</div>
                    </div>
                </div>
            </fieldset>
        </div>
        {/* SECOND COLUMN */}
        <div className="col-sm-4 pl-2 p-1">
            <fieldset className="border p-1" >
                <legend className="w-auto text-left">Before Grinding Check</legend>
                <div className="form-row">
                    <div className="col-md-2 mb-1">
                        <label className="col-form-label" htmlFor="fl">FL</label>
                        <input disabled className="form-control" name="fl" id="fl" type="text" placeholder="FL" 
                        // ref={register({ required: true })}
                         />
                        {/* <span>{errors.fl && 'FL is required'}</span> */}
                        <div className="valid-feedback">Looks good!</div>
                    </div>

                    <div className="col-md-3 mb-1">
                        <label className="col-form-label" htmlFor="dia">Dia</label>
                        <input disabled className="form-control" name="dia" id="dia" type="text" placeholder="Dia" 
                        // ref={register({ required: true })}
                         />
                        {/* <span>{errors.dia && 'Dia is required'}</span> */}
                        <div className="valid-feedback">Looks good!</div>
                    </div>

                    <div className="col-md-2 mb-1">
                        <label className="col-form-label" htmlFor="target">Target</label>
                        <input className="form-control" name="target" id="target" type="text" placeholder="Target" 
                        // ref={register({ required: true })}
                         />
                        {/* <span>{errors.target && 'Target is required'}</span> */}
                        <div className="valid-feedback">Looks good!</div>
                    </div>

                    <div className="col-md-2 mb-1">
                        <label  htmlFor="pin_hole">#Pin Hole</label>
                        <input className="form-control" name="pin_hole" id="pin_hole" type="text" placeholder="#Pin Hole" 
                        // ref={register({ required: true })}
                         />
                        {/* <span>{errors.pin_hole && '#Pin Hole is required'}</span> */}
                        <div className="valid-feedback">Looks good!</div>
                    </div>

                    <div className="col-md-1 mb-1">
                        <label htmlFor="base_down">Base Down</label>
                        <input type="checkbox" id="base_down" />
                    </div>

                    <div className="col-md-1 mb-1">
                        <label htmlFor="key_lock">Key Lock</label>
                        <input type="checkbox" id="key_lock" />
                    </div>

                    <div className="col-md-1 mb-1">
                        <label htmlFor="cone_prob">Cone Prob</label>
                        <input type="checkbox" id="cone_prob" />
                    </div>

                </div>
            </fieldset>        
                
        </div>
        {/* THIRD COLUMN */}
        <div className="col-sm-4 pl-2 p-1">
            <fieldset className="border p-1" >
                <legend className="w-auto text-left">After Grinding Check</legend>
                <div className="form-row">

                    <div className="col-md-3 mb-1">
                        <label className="col-form-label" htmlFor="dia">Dia</label>
                        <input className="form-control" name="dia" id="dia" type="text" placeholder="Dia" 
                        // ref={register({ required: true })}
                         />
                        {/* <span>{errors.dia && 'Dia is required'}</span> */}
                        <div className="valid-feedback">Looks good!</div>
                    </div>

                    <div className="col-md-3 mb-1">
                        <label className="col-form-label" htmlFor="pin_hole">#Pin Hole</label>
                        <input className="form-control" name="pin_hole" id="pin_hole" type="text" placeholder="#Pin Hole" 
                        // ref={register({ required: true })}
                         />
                        {/* <span>{errors.pin_hole && '#Pin Hole is required'}</span> */}
                        <div className="valid-feedback">Looks good!</div>
                    </div>

                    <div className="col-md-1 mb-1">
                        <label htmlFor="base_down">Base Down</label>
                        <input type="checkbox" id="base_down" />
                    </div>

                    <div className="col-md-1 mb-1">
                        <label htmlFor="key_lock">Key Lock</label>
                        <input type="checkbox" id="key_lock" />
                    </div>

                    <div className="col-md-1 mb-1">
                        <label htmlFor="cone_prob">Cone Prob</label>
                        <input type="checkbox" id="cone_prob" />
                    </div>
                    
                    <div className="col-md-2 mb-1">
                        <label htmlFor="mark_complete">Mark as Complete</label>
                        <input type="checkbox" id="mark_complete" />
                    </div>

                </div>
            </fieldset>
        </div>
        {/* FOURTH COLUMN */}
        <div className="col-sm-2 pl-2 p-1">
            <fieldset className="border p-1" >
                <legend className="w-auto text-left">Plating Order Remarks</legend>

                <div className="form-row">
                    <div className="col-md-5 mb-1">
                        <label htmlFor="plating_order">Plating Order</label>
                        <input className="form-control" name="plating_order" id="plating_order" type="text" placeholder="Plating Order" 
                        // ref={register({ required: true })}
                         />
                        {/* <span>{errors.plating_order && 'Plating Order is required'}</span> */}
                        <div className="valid-feedback">Looks good!</div>
                    </div>

                    <div className="col-md-7 mb-1">
                        <label htmlFor="cylinder_remarks">Remarks for Cyl</label>
                        <input className="form-control" name="cylinder_remarks" id="cylinder_remarks" type="text" placeholder="Remarks for Cylinder" 
                        // ref={register({ required: true })}
                         />
                        {/* <span>{errors.cylinder_remarks && 'Remarks for Cylinder is required'}</span> */}
                        <div className="valid-feedback">Looks good!</div>
                    </div>

                </div>
            </fieldset>
        </div>
        </>
    );
}

export default RowsByTotalCyl;