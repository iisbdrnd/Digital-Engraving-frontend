import React, { Fragment, useState, useEffect, useReducer } from 'react';
import { GRINDING_JOB_ORDER_DETAILS, GRINDING_RSURL, GET_EMPLOYEE_BY_SHIFT } from '../../../../api/userUrl';
import { userGetMethod, userPutMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { Typeahead } from 'react-bootstrap-typeahead';
import { SubmitButton } from '../../../common/GlobalButton';

const Edit = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [typeHeadOptions, setTypeHeadOptions] = useState({});
    const [dropDownData, setDropdownData] = useState();

    let [jobOrderData, setJobOrderData] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            // send_date         : new Date().toLocaleDateString(),
            job_no            : '',
            client_name       : '',
            marketing_p_name  : '',
            job_type          : '',
            total_cylinder_qty: '',
            base_source       : '',
            printer_name      : '',
            desired_fl        : '',
            desired_cir       : '',
            desired_dia       : '',
            job_order_id      : '', 
            fl                : '', 
            dia               : '', 
            machines          : [],
            employeeInfos     : [],
            polishMachines    : [],
        }
    );
    let [grindingInput, setGrindingInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            // job_order_id          : '',
            machine               : '',
            shift                 : '',
            start_time            : '',
            polishing             : '',
            done_by               : '',
            end_time              : '',

            serial                : [],
            cylinder_id           : [],

            grinding_details_id   : [],
            before_fl             : [],
            before_dia            : [],
            before_target         : {},
            before_pin_hole       : {}, 
            before_base_down      : {}, 
            before_key_lock       : {}, 
            before_cone_prob      : {}, 

            after_dia             : {}, 
            after_pin_hole        : {}, 
            after_base_down       : {}, 
            after_key_lock        : {}, 
            after_cone_prob       : {}, 
            after_mark_as_complete: {}, 

            plating_order         : {},
            remarks_for_cyl       : {},

            final_fl              : '',
            final_dia             : '',
            final_cir             : '',
            note                  : '',
        }
    );

    var menuId = 0;
    if (props.location.state === undefined) {
        menuId = 0;
    } else {
        menuId = props.location.state.params.menuId;
    }
    
    const jobOrderJobNo = props.match.params.jobOrderJobNo;

    useEffect(()=>{
        userGetMethod(`${GRINDING_RSURL}/${jobOrderJobNo}/edit`)
            .then(response => {
                // FOR JOB ORDER
                // let jobOrderOptions = [];
                // //default selected
                // if (response.data.jobOrder) {
                //     let jobOrderObj = {};
                //     jobOrderObj.id = response.data.jobOrder.id;
                //     jobOrderObj.name = `[${response.data.jobOrder.job_no}] ` + response.data.jobOrder.job_name;
                //     jobOrderOptions.push(jobOrderObj);

                //     if (response.data.jobOrder != null) { 
                //         setGrindingInput({
                //             'job_order_pk_id': [jobOrderObj]
                //         })
                //     }
                // }
                dropDownChange(jobOrderJobNo, 'job_order_id');
                setJobOrderData({
                    'machines'      : response.data.machines,
                    'polishMachines': response.data.polishMachines
                });
                let {job_order_pk_id, machine, shift, start_time, polishing, done_by, end_time,final_fl,final_dia,final_cir,note} = response.data.grindingMaster;
                shiftChangeHandler(shift);
                setGrindingInput({
                    'machine'        : machine,
                    'shift'          : shift,
                    'start_time'     : start_time,
                    'polishing'      : polishing,
                    'done_by'        : done_by,
                    'end_time'       : end_time,
                    'final_fl'       : final_fl,
                    'final_dia'      : final_dia,
                    'final_cir'      : final_cir,
                    'note'           : note,

                });

                // setIsLoading(false);
            });
    }, []);

    const dropDownChange = (jobOrderJobNo, fieldName) => {
        userGetMethod(`${GRINDING_JOB_ORDER_DETAILS}?jobOrderJobNo=${jobOrderJobNo}`)
            .then(response => {
                let { job_no, job_type, fl, cir, dia, marketing_p_name, printer_name, total_cylinder_qty, client_name} = response.data.jobOrderDetails;
                let {grinding_details_id, dig_grinding_id, cylinder_id,before_fl,before_dia,before_target,before_pin_hole,before_base_down,before_key_lock,before_cone_prob,after_dia,after_pin_hole,after_base_down,after_key_lock,after_cone_prob,after_mark_as_complete,plating_order, remarks_for_cyl} = response.data.grindingDetails;
                setJobOrderData({
                    'job_no'            : job_no,
                    'client_name'       : client_name,
                    'marketing_p_name'  : marketing_p_name,
                    'job_type'          : job_type,
                    'total_cylinder_qty': total_cylinder_qty,
                    'printer_name'      : printer_name,
                    'desired_fl'        : fl,
                    'desired_cir'       : cir,
                    'desired_dia'       : dia
                });
                setGrindingInput({
                    'grinding_details_id'   : grinding_details_id,
                    'dig_grinding_id'       : dig_grinding_id,
                    'cylinder_id'           : cylinder_id,
                    'before_fl'             : before_fl,
                    'before_dia'            : before_dia,
                    'before_target'         : before_target,
                    'before_pin_hole'       : before_pin_hole,
                    'before_base_down'      : before_base_down,
                    'before_key_lock'       : before_key_lock,
                    'before_cone_prob'      : before_cone_prob,
                    'after_dia'             : after_dia,
                    'after_pin_hole'        : after_pin_hole,
                    'after_base_down'       : after_base_down,
                    'after_key_lock'        : after_key_lock,
                    'after_cone_prob'       : after_cone_prob,
                    'after_mark_as_complete': after_mark_as_complete,
                    'plating_order'         : plating_order,
                    'remarks_for_cyl'       : remarks_for_cyl
                });
            });
        setIsLoading(false);
    }

    const changeInputHandler = (i, e, fieldName, checkbox = false) => {
        setGrindingInput(
            {
                [fieldName]: {
                    ...grindingInput[fieldName],
                    [i]: e.target.value
                }
            }
        )
        if (checkbox && grindingInput[fieldName].hasOwnProperty(e.target.id) && grindingInput[fieldName][i] != 0) {
            setGrindingInput(
                {
                    [fieldName]: {
                        ...grindingInput[fieldName],
                        [i]: 0
                    }
                }
            )
            
        }
    }

    const shiftChangeHandler = (shiftId) => {
        userGetMethod(`${GET_EMPLOYEE_BY_SHIFT}/${shiftId}`)
            .then(response => {
                setJobOrderData({
                    'employeeInfos' : response.data.employeeInfos
                });
            });
    }
    
    const submitHandler = (data) => {
        // data.job_order_job_no = jobOrderJobNo;
        data.grindingDetails = grindingInput;
        data.total_cylinder_qty = jobOrderData.total_cylinder_qty;

        userPutMethod(`${GRINDING_RSURL}/${jobOrderJobNo}`, data)
            .then(response => {
                if (response.data.status == 1) {
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            })
        .catch(error => toast.error(error))
    }

    const rowsByTotalCyl = () => {
        let rows = [];
        for (let i = 0; i < jobOrderData.total_cylinder_qty; i++) {
            rows.push(
                <>
                    <tr>
                        {/* <input value={grindingInput.grinding_details_id} type="hidden" /> */}
                        <td>
                            <input defaultValue={i+1} disabled="disabled" className="form-control" name="serial" id="serial" type="text" placeholder="Serial" />
                        </td>
                        <td>
                            <input onChange={e=>changeInputHandler(i, e, 'cylinder_id')} defaultValue={`${jobOrderData.job_no}-${i+1}`} disabled="disabled" className="form-control" name="cylinder_id" id="cylinder_id" type="text" placeholder="Cylinder Id" />
                        </td>

                        {/* Before Grinding Check Start */}
                        <td>
                            <input onChange={e=>changeInputHandler(i, e, 'before_fl')} defaultValue={grindingInput.before_fl[i] } className="form-control" name="before_fl" id="before_fl" type="number" placeholder="FL" />
                        </td>
                        <td>
                            <input onChange={e=>changeInputHandler(i, e, 'before_dia')} defaultValue={grindingInput.before_dia[i]}className="form-control" name="before_dia" id="before_dia" type="number" placeholder="Dia" />
                        </td>
                        <td>
                            <input onInput={e=>changeInputHandler(i, e, 'before_target')} defaultValue={grindingInput.before_target[i]} className="form-control" name="before_target" id="before_target" type="number" placeholder="Target" />
                        </td>
                        <td>
                            <input onChange={e=>changeInputHandler(i, e, 'before_pin_hole')} defaultValue={grindingInput.before_pin_hole[i]} className="form-control" name="before_pin_hole" id="before_pin_hole" type="number" placeholder="#Pin Hole" />
                        </td>
                        <td style={{textAlign: 'center'}}>
                            <input onChange={e=>changeInputHandler(i, e, 'before_base_down' , true)} checked={grindingInput.before_base_down[i] == 1 ? true : false} value={1} type="checkbox" name="before_base_down" id={i} />
                        </td>
                        <td style={{textAlign: 'center'}}>
                            <input onChange={e=>changeInputHandler(i, e, 'before_key_lock' , true)} checked={grindingInput.before_key_lock[i] == 1 ? true : false} value={1} id={i} type="checkbox" name="before_key_lock" />
                        </td>
                        <td style={{textAlign: 'center'}}>
                            <input onChange={e=>changeInputHandler(i, e, 'before_cone_prob' , true)} checked={grindingInput.before_cone_prob[i] == 1 ? true : false} value={1} id={i} type="checkbox" name="before_cone_prob" />
                        </td>
                        {/* Before Grinding Check End */}

                        {/* After Grinding Check Start */}
                        <td>
                            <input onChange={e=>changeInputHandler(i, e, 'after_dia')} className="form-control" name="after_dia" id="after_dia" type="number" placeholder="Dia" />
                        </td>
                        <td>
                            <input onChange={e=>changeInputHandler(i, e, 'after_pin_hole')} className="form-control" name="after_pin_hole" id="after_pin_hole" type="number" placeholder="#Pin Hole" />
                        </td>
                        <td style={{textAlign: 'center'}}>
                            <input onChange={e=>changeInputHandler(i, e, 'after_base_down', true)} checked={grindingInput.after_base_down[i] == 1 ? true : false} value={1} type="checkbox" name='after_base_down' id={i} />
                        </td>
                        <td style={{textAlign: 'center'}}>
                            <input onChange={e=>changeInputHandler(i, e, 'after_key_lock', true)} type="checkbox" name='after_key_lock' checked={grindingInput.after_key_lock[i] == 1 ? true : false} value={1} id={i} />
                        </td>
                        <td style={{textAlign: 'center'}}>
                            <input onChange={e=>changeInputHandler(i, e, 'after_cone_prob', true)} type="checkbox" name='after_cone_prob' checked={grindingInput.after_cone_prob[i] == 1 ? true : false} value={1} id={i} />
                        </td>
                        <td style={{textAlign: 'center'}}>
                            <input onChange={e=>changeInputHandler(i, e, 'after_mark_as_complete', true)} type="checkbox" name='after_mark_as_complete' checked={grindingInput.after_mark_as_complete[i] == 1 ? true : false} value={1} id={i} />
                        </td>
                        {/* After Grinding Check End */}

                        {/* Plating Order Remarks Start */}
                        <td>
                            <input onChange={e=>changeInputHandler(i, e, 'plating_order')} defaultValue={grindingInput.plating_order[i]} className="form-control" name="plating_order" id="plating_order" type="number" placeholder="Plating Order" />
                        </td>
                        <td>
                            <input onChange={e=>changeInputHandler(i, e, 'remarks_for_cyl')} defaultValue={grindingInput.remarks_for_cyl[i]} className="form-control" name="remarks_for_cyl" id="remarks_for_cyl" type="text" placeholder="Remarks for Cylinder" />
                        </td>
                        {/* Plating Order Remarks End */}
                    </tr>
                </>
            );
        }
        return rows;
    }
    
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Grinding Edit Form</h5>
                            </div>
                            <div className="card-body">
                                {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                <form onSubmit={handleSubmit(submitHandler)} className="needs-validation theme-form">
                                    {/* FIRST ROW */}
                                    <div className="row">

                                        <div className="col-sm-7">
                                            <fieldset className="border p-1" >
                                                <legend className="w-auto text-left">Job Info</legend>
                                                {/* FIRST ROW */}
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label" htmlFor="job_order_pk_id">Job Number</label>
                                                    <div className="col-sm-10">
                                                        {/* <Typeahead
                                                            id="job_order_pk_id"
                                                            name="job_order_pk_id"
                                                            labelKey={option => `${option.name}`}
                                                            options={typeHeadOptions['job_orders']}
                                                            placeholder="Select Job No..."
                                                            onChange={(e) => dropDownChange(e, 'job_order_pk_id')}
                                                            selected={grindingInput.job_order_pk_id}
                                                            disabled={true}
                                                            ref={register({
                                                                required: 'Job No Field Required'
                                                            })}
                                                        /> */}
                                                        <input type="text" value={jobOrderJobNo} disabled="disabled" className="form-control" name="job_order_job_no" />
                                                    </div>
                                                </div>
                                                <pre className="helper-classes m-t-10">
                                                    <div className="display-div">
                                                        <div className='row'>
                                                            <div className='col-md-8 p-0'>
                                                                <table className="table table-bordernone">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width="18%" align="right">Job Type</td>
                                                                            <td width="5%">:</td>
                                                                            <td width="77%">{jobOrderData.job_type}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td align="right">Client</td>
                                                                            <td>:</td>
                                                                            <td>{jobOrderData.client_name}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td align="right">Makt P.</td>
                                                                            <td>:</td>
                                                                            <td>{jobOrderData.marketing_p_name}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td align="right">Printer</td>
                                                                            <td>:</td>
                                                                            <td>{jobOrderData.printer_name}</td>
                                                                        </tr>
                                                                        
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div className='col-md-4 p-0'>
                                                                <table className="table table-bordernone">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width="50%" align="right">No of Cyl</td>
                                                                            <td width="5%">:</td>
                                                                            <td width="45%">{jobOrderData.total_cylinder_qty}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td align="right">Desired FL</td>
                                                                            <td>:</td>
                                                                            <td>{jobOrderData.desired_fl}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td align="right">Desired Cir</td>
                                                                            <td>:</td>
                                                                            <td>{jobOrderData.desired_cir}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td align="right">Desired Dia</td>
                                                                            <td>:</td>
                                                                            <td>{jobOrderData.desired_dia}</td>
                                                                        </tr>

                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </pre>
                                                
                                            </fieldset>
                                        </div>

                                        <div className="col-sm-5">
                                            <fieldset className="border p-1" >
                                                <legend className="w-auto text-left">Grinding Operation</legend>

                                                <div className="form-row">
                                                    <div className="col-md-6 mb-1">
                                                        <div className="row">
                                                            <label className="col-sm-5 col-form-label" htmlFor="machine">Machine</label>
                                                            <div className="col-sm-7">
                                                                <select className="form-control" id="machine" name="machine" 
                                                                value={grindingInput.machine} 
                                                                onChange={(e)=>setGrindingInput({'machine': e.target.value })}
                                                                ref={register({
                                                                    required: 'Machine Field Required'
                                                                })}>
                                                                    <option value="">Select Machine</option>
                                                                    {
                                                                        jobOrderData.machines.map((machine, key)=>(
                                                                            <option value={machine.id} key={key}>{machine.machine_name}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 mb-1">
                                                        <div className="row">
                                                            <label className="col-sm-5 col-form-label" htmlFor="shift">shift</label>
                                                            <div className="col-sm-7">
                                                                <select className="form-control" id="shift" name="shift" 
                                                                value={grindingInput.shift}
                                                                onChange={(e)=>shiftChangeHandler(e.target.value)}
                                                                ref={register({
                                                                    required: 'Shift Field Required'
                                                                })}>
                                                                    <option value="">Select Shift</option>
                                                                    <option value="1">Day</option>
                                                                    <option value="2">Evening</option>
                                                                    <option value="3">Night</option>
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
                                                                <input className="form-control" name="start_time" defaultValue={grindingInput.start_time} id="start_time" type="text" placeholder="Start Time" ref={register({ required: true })} />
                                                                {/* <DatePicker className="form-control digits" selected={startDate} onChange={dropDownChange} showTimeSelect showTimeSelectOnly timeIntervals={15} timeCaption="Time" dateFormat="h:mm aa" /> */}

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
                                                                value={grindingInput.polishing}
                                                                onChange={(e)=>setGrindingInput({'polishing': e.target.value })}
                                                                ref={register({
                                                                    required: 'Polishing Field Required'
                                                                })}>
                                                                    <option value="">Select Polishing</option>
                                                                    {jobOrderData.polishMachines.map((item, index)=>( 
                                                                        <option value={item.id} key={index}>{item.machine_name}</option>
                                                                    ))}
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
                                                                value={grindingInput.done_by}
                                                                ref={register({
                                                                    required: 'Done By Field Required'
                                                                })}>
                                                                    <option value="">Select Done By</option>
                                                                    {
                                                                        jobOrderData.employeeInfos.map((employee, key)=>(
                                                                            <option value={employee.id} key={key}>{employee.name}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 mb-1">
                                                        <div className="row">
                                                            <label className="col-sm-5 col-form-label" htmlFor="end_time">End Time</label>
                                                            <div className="col-sm-7">
                                                                <input className="form-control" name="end_time" id="end_time" type="text" placeholder="End Time" defaultValue={grindingInput.end_time} ref={register({ required: true })} />
                                                                <span>{errors.end_time && 'End Time is required'}</span>
                                                                <div className="valid-feedback">Looks good!</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                    <div className="card p-2 mt-2">
                                        <div className="row">
                                                                
                                            {/* {rowsByTotalCyl()} */}

                                            {/* FIRST COLUMN */}
                                            <div className="col-sm-12 pl-2 p-1">
                                                <fieldset className="border p-1">
                                                    <legend className="w-auto text-left">Cylinder</legend>
                                                    <div className="form-row">
                                                        <table style={{width: "100%"}}>
                                                            <thead>
                                                                <tr className="dynamicFormByTotalCylQtyHeader">
                                                                    <th colSpan="2" width="10%">Cylinder</th>
                                                                    <th colSpan="7" width="30%">Before Grinding Check</th>
                                                                    <th colSpan="6" width="40%">After Grinding Check</th>
                                                                    <th colSpan="2" width="20%">Plating Order Remarks</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr className="dynamicFormByTotalCylQtyBody">
                                                                    <td>Serial</td>
                                                                    <td>Cylinder</td>
                                                                    
                                                                    <td>FL</td>
                                                                    <td>Dia</td>
                                                                    <td>Target</td>
                                                                    <td>#Pin Hole</td>
                                                                    <td>Base Down</td>
                                                                    <td>Key Lock</td>
                                                                    <td>Cone Prob</td>

                                                                    <td>Dia</td>
                                                                    <td>#Pin Hole</td>
                                                                    <td>Base Down</td>
                                                                    <td>Key Lock</td>
                                                                    <td>Cone Prob</td>
                                                                    <td>Mark as Complete</td>

                                                                    <td>Plating Order</td>
                                                                    <td>Remarks for Cyl</td>
                                                                </tr>

                                                                {jobOrderData.total_cylinder_qty ? rowsByTotalCyl() : null }

                                                            </tbody>
                                                            {/* {rowsByTotalCyl(<Cylinder total_cylinder_qty={total_cylinder_qty} job_no={job_no} />)} */}

                                                            {/* <Cylinder total_cylinder_qty={jobOrderData.total_cylinder_qty} job_no={jobOrderData.job_no} /> */}
                                                            
                                                        </table>
                                                    </div>
                                                </fieldset>
                                            </div>


                                        </div>
                                    </div>

                                    {/* THIRD ROW */}
                                    <div className="card">
                                        <div className="row p-2">
                                            {/* FIRST COLUMN */}
                                            <div className="col-sm-6 pl-2 p-1">
                                                <fieldset className="border p-1" >
                                                    <legend className="w-auto text-left">Final Measurement</legend>
                                                    {/* FIRST ROW */}
                                                    <div className="form-row">
                                                        <div className="col-md-4 mb-1">
                                                            <div className="row">
                                                                <label className="col-sm-5 col-form-label" htmlFor="final_fl">Final FL</label>
                                                                <div className="col-sm-7">
                                                                    <input className="form-control" name="final_fl" id="final_fl" type="number" defaultValue={grindingInput.final_fl} placeholder="Final FL" ref={register({ required: true })} />
                                                                    <span>{errors.final_fl && 'Final FL is required'}</span>
                                                                    <div className="valid-feedback">Looks good!</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-4 mb-1">
                                                            <div className="row">
                                                                <label className="col-sm-5 col-form-label" htmlFor="final_dia">Final Dia</label>
                                                                <div className="col-sm-7">
                                                                    <input className="form-control" name="final_dia" id="final_dia" type="number" placeholder="Final Dia" defaultValue={grindingInput.final_dia} ref={register({ required: true })}/>
                                                                    <span>{errors.final_dia && 'Final Dia is required'}</span>
                                                                    <div className="valid-feedback">Looks good!</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-4 mb-1">
                                                            <div className="row">
                                                                <label className="col-sm-5 col-form-label" htmlFor="final_cir">Final Cir</label>
                                                                <div className="col-sm-7">
                                                                    <input disabled value={20} className="form-control" name="final_cir" id="final_cir" type="number" placeholder="Final Cir" ref={register({ required: true })} />
                                                                    <span>{errors.final_cir && 'Final Cir is required'}</span>
                                                                    <div className="valid-feedback">Looks good!</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </fieldset>
                                                    
                                            </div>
                                            {/* SECOND COLUMN */}
                                            <div className="col-sm-6 pr-2 p-1">
                                                <fieldset className="border p-1" >
                                                    <legend className="w-auto text-left">Note</legend>

                                                    <div className="form-row">
                                                        <div className="col-md-12 mb-1">
                                                            <textarea className='form-control' name='note' id='note' placeholder='Note' defaultValue={grindingInput.note} ref={register({ required: true })}></textarea>
                                                        </div>
                                                    </div>
                                                </fieldset>
                                            </div>
                                        </div>
                                    </div>
                                    <SubmitButton link="grinding/index" menuId={ menuId } offset="5"/>
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