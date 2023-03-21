import React, { Fragment, useState, useEffect, useReducer } from 'react';
import { JOB_ORDER_DETAILS, GRINDING_RSURL, GET_EMPLOYEE_BY_SHIFT, GRINDING_DETAILS } from '../../../../api/userUrl';
import { userGetMethod, userPostMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { Typeahead } from 'react-bootstrap-typeahead';
import { SubmitButton } from '../../../common/GlobalButton';

const Add = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const {location} = props;
    const [isLoading, setIsLoading] = useState(true);
    const [typeHeadOptions, setTypeHeadOptions] = useState({});
    const [dropDownData, setDropdownData] = useState();

    const [selectedJobOrders, setSelectedJobOrders] = useState({});
    const [markedComplete, setMarkedComplete] = useState([]);
    const [grindingValues, setGrindingValues] = useState([]);
    const [grindingMaster, setGrindingMaster] = useState([]);
    const [grapped,setGrapped] = useState(false);
    const [chk, setChk] = useState(true);

    let [jobOrderData, setJobOrderData] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
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
            serial                : [],
            cylinder_id           : [],

            before_fl             : [],
            before_dia            : [],
            before_target         : {},
            before_pinhole        : {}, 
            before_base_down      : {}, 
            before_key_lock       : {}, 
            before_cone_prob      : {}, 

            after_dia             : {}, 
            after_pinhole         : {}, 
            after_base_down       : {}, 
            after_key_lock        : {}, 
            after_cone_prob       : {}, 
            after_mark_as_complete: {}, 

            plating_order         : {},
            remarks_for_cyl       : {},
        }
    );


    var menuId = 0;
    if (props.location.state === undefined) {
        menuId = 0;
    } else {
        menuId = props.location.state.params.menuId;
    }

    useEffect(()=>{
        userGetMethod(`${GRINDING_RSURL}/create`)
            .then(response => {
                // FOR JOB ORDER
                let jobOrderOptions = [];
                if (response.data.jobOrders && response.data.jobOrders.length > 0) {
                    response.data.jobOrders.map(order => 
                    {
                        let jobOrderObj = {};
                        jobOrderObj.id = order.id;
                        jobOrderObj.name = `[${order.job_no}] ` + order.job_name;
                        jobOrderOptions.push(jobOrderObj);
                        if(props.location.state.params.job_order_id && props.location.state.params.job_order_id == jobOrderObj.id){
                            setSelectedJobOrders(jobOrderObj);
                        }
                    })
                }
                if(props.location.state.params.job_order_id)
                { setDropdownData(
                    (prevstate) => ({
                        ...prevstate,
                        'job_order_pk_id': props.location.state.params.job_order_id,
                    })
                )
                }
                if(props.location.state.params.job_order_id) 
                {userGetMethod(`${JOB_ORDER_DETAILS}?jobOrderId=${props.location.state.params.job_order_id}?`)
                .then(response => {
                    let { job_no, job_type, fl, cir, dia, marketing_p_name, printer_name, total_cylinder_qty, client_name} = response.data.jobOrderDetails;
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
                }) }

                setJobOrderData({
                    'machines'      : response.data.machines,
                    'polishMachines': response.data.polishMachines,
                });
                setTypeHeadOptions(
                    (prevstate) => ({
                        ...prevstate,
                        ['job_orders']: jobOrderOptions,
                    })
                );
                setIsLoading(false);
            });
    }, []);

    const getGrinder = () => {
        var cylinder_arr =[];
        var sr_arr = [];
        for(let i=0;i<jobOrderData.total_cylinder_qty;i++){
           var cy_id =  (jobOrderData.job_no).concat("-", (i+1).toString());
           cylinder_arr.push(cy_id);
           sr_arr.push(i+1);
        }
        setGrindingInput({['cylinder_id']:cylinder_arr});
        setGrindingInput({['serial']:sr_arr})
        setGrapped(true);
    }

    const dropDownChange = (e, fieldName) => {
        if(e.length > 0){
            const selectedValueId = e[0].id;
            setDropdownData(
                (prevstate) => ({
                    ...prevstate,
                    [fieldName]: selectedValueId,
                })
            );

            userGetMethod(`${JOB_ORDER_DETAILS}?jobOrderId=${selectedValueId}?`)
                .then(response => {
                    let { job_no, job_type, fl, cir, dia, marketing_p_name, printer_name, total_cylinder_qty, client_name} = response.data.jobOrderDetails;
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
                });

            userGetMethod(`${GRINDING_DETAILS}?job_id=${selectedValueId}?`)
                .then(response => {
                    setGrindingValues(response?.data?.grindingDetails);
                    updateGrindingInput(response?.data?.grindingDetails);
                    setGrindingMaster(response?.data?.grindingMaster);
                });
        }
    }
    const updateGrindingInput = (values) => {
        Object.entries(grindingInput).map(([key, value]) => {
            var temp_obj = {};
            values.map((item,index) => 
            {
                Object.entries(item).map(([rkey, rvalue]) => {
                    if(key == rkey && key != "cylinder_id" && key != "serial"){
                    Object.assign(temp_obj, {[index]: rvalue});
                    if(rkey  == 'after_mark_as_complete' && rvalue==1){
                        setMarkedComplete([...markedComplete,index]);
                    }
                    }
                })
            })
            setGrindingInput({[key]:temp_obj})
        })
    }
    console.log(grindingInput);

    const  changeMasterGrinder = (e) => {
        setGrindingMaster({...grindingMaster,[e.target.name] : e.target.value});
    }

    useEffect(() => {
        shiftChangeHandler(parseInt(grindingMaster?.shift))
    },[grindingMaster?.shift])

    const changeInputHandler = (i, e, fieldName, checkbox = false) => {
        if(!grapped){ 
            getGrinder();
        }
        if(fieldName == 'after_mark_as_complete') {
            console.log(e.target.checked,e.target.value);
            if(e.target.checked == true) {
                setMarkedComplete([...markedComplete,i]) ;
            }else if(e.target.checked == false){
                var index = markedComplete.indexOf(i);
                markedComplete.splice(index,1);
                setMarkedComplete(markedComplete);
            }
        }
        setGrindingInput(
            {
                [fieldName]: {
                    ...grindingInput[fieldName],
                    [i]: e.target.value
                }
            }
        )
        
        if (checkbox && grindingInput[fieldName].hasOwnProperty(e.target.id)) {
            setGrindingInput(
                {
                    [fieldName]: {
                        ...grindingInput[fieldName],
                        [i]: e.target.checked ? 1 : 0
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

    const submitHandler = (data, e) => {
        e.preventDefault();
        getGrinder()
        console.log(data,grindingValues);
        if(markedComplete.length == 0){
            toast.warn("Please select mimnum one cylinder")
            return;
        }    
        data.job_order_pk_id = dropDownData.job_order_pk_id;
        data.grindingDetails = grindingInput;
        data.total_cylinder_qty = jobOrderData.total_cylinder_qty;
        userPostMethod(GRINDING_RSURL, data)
            .then(response => {
                if (response.data.status == 1) {
                    toast.success(response.data.message);
                    e.target.reset();
                    // setSelected(false);
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
                        <td>
                            <input  defaultValue={i+1}  disabled className="form-control" name="serial" id="serial" type="text" placeholder="Serial" />
                        </td>
                        <td>
                            <input onChange={e=>changeInputHandler(i, e, 'cylinder_id')} value={`${jobOrderData.job_no}-${i+1}`}  disabled className="form-control" name="cylinder_id" id="cylinder_id" type="text" placeholder="Cylinder Id" />
                        </td>

                        {/* Before Grinding Check Start */}
                        <td>
                            <input onChange={e=> changeInputHandler(i, e, 'before_fl')} value={grindingInput['before_fl'][i] ? parseInt(grindingInput['before_fl'][i]) : null} className="form-control" name="before_fl" id="before_fl" type="number" placeholder="FL" required={markedComplete.includes(i) ? true : false}/>
                        </td>
                        <td>
                            <input onChange={e=>changeInputHandler(i, e, 'before_dia')} className="form-control" value={grindingInput['before_dia'][i] ? parseInt(grindingInput['before_dia'][i]) : null} name="before_dia" id="before_dia" type="number" placeholder="Dia" required={markedComplete.includes(i) ? true : false}/>
                        </td>
                        <td>
                            <input onInput={e=>changeInputHandler(i, e, 'before_target')} value={grindingInput['before_target'][i] ? parseInt(grindingInput['before_target'][i]) : null} className="form-control" name="before_target" id="before_target" type="number" placeholder="Target" />
                        </td>
                        <td>
                            <input onChange={e=>changeInputHandler(i, e, 'before_pinhole')} value={grindingInput['before_pinhole'][i] ? parseInt(grindingInput['before_pinhole'][i]) : null} className="form-control" name="before_pinhole" id="before_pinhole" type="number" placeholder="#Pin Hole" />
                        </td>
                        <td style={{textAlign: 'center'}}>
                            <input onChange={e=>changeInputHandler(i, e, 'before_base_down' , true)} defaultChecked={grindingInput['before_base_down'][i] == 1 ? chk : null} type="checkbox" name="before_base_down" id={i} />
                        </td>
                        <td style={{textAlign: 'center'}}>
                            <input onChange={e=>changeInputHandler(i, e, 'before_key_lock' , true)}  defaultChecked={grindingInput['before_key_lock'][i] == 1 ? chk : null}  id={i} type="checkbox" name="before_key_lock" />
                        </td>
                        <td style={{textAlign: 'center'}}>
                            <input onChange={e=>changeInputHandler(i, e, 'before_cone_prob' , true)} defaultChecked={grindingInput['before_cone_prob'][i] == 1 ? chk : null}  id={i} type="checkbox" name="before_cone_prob" />
                        </td>
                        {/* Before Grinding Check End */}

                        {/* After Grinding Check Start */}
                        <td>
                            <input onChange={e=>changeInputHandler(i, e, 'after_dia')} value={grindingInput['after_dia'][i] ? parseInt(grindingInput['after_dia'][i]) : null} className="form-control" name="after_dia" id="after_dia" type="number" placeholder="Dia" required={markedComplete.includes(i) ? true : false}/>
                        </td>
                        <td>
                            <input onChange={e=>changeInputHandler(i, e, 'after_pinhole')} value={grindingInput['after_pinhole'][i] ? parseInt(grindingInput['after_pinhole'][i]) : null} className="form-control" name="after_pinhole" id="after_pinhole" type="number" placeholder="#Pin Hole" />
                        </td>
                        <td style={{textAlign: 'center'}}>
                            <input  onChange={e=>changeInputHandler(i, e, 'after_base_down', true)} defaultChecked={grindingInput['after_base_down'][i] == 1 ? chk : null} type="checkbox" name='after_base_down' id={i} />
                        </td>
                        <td style={{textAlign: 'center'}}>
                            <input onChange={e=>changeInputHandler(i, e, 'after_key_lock', true)} defaultChecked={grindingInput['after_key_lock'][i] == 1 ? chk : null} type="checkbox" name='after_key_lock' id={i} />
                        </td>
                        <td style={{textAlign: 'center'}}>
                            <input  onChange={e=>changeInputHandler(i, e, 'after_cone_prob', true)}  type="checkbox" name='after_cone_prob' defaultChecked={grindingInput['after_cone_prob'][i] == 1 ? chk : null}  id={i}/>
                        </td>
                        <td style={{textAlign: 'center'}}>
                            <input  onChange={e=>changeInputHandler(i, e, 'after_mark_as_complete', true)}  type="checkbox" name='after_mark_as_complete' defaultChecked={grindingInput['after_mark_as_complete'][i] == 1 ? chk : null} id={i} />
                        </td>
                        {/* After Grinding Check End */}

                        {/* Plating Order Remarks Start */}
                        <td>
                            <input onChange={e=>changeInputHandler(i, e, 'plating_order')} className="form-control" value={grindingInput['plating_order'][i] ? parseInt(grindingInput['plating_order'][i]) : null} name="plating_order" id="plating_order" type="number" placeholder="Plating Order" />
                        </td>
                        <td>
                            <input onChange={e=>changeInputHandler(i, e, 'remarks_for_cyl')} className="form-control" value={grindingInput['remarks_for_cyl'][i] ? parseInt(grindingInput['remarks_for_cyl'][i]) : null} name="remarks_for_cyl" id="remarks_for_cyl" type="number" placeholder="Remarks for Cylinder" />
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
                                <h5>Grinding Form</h5>
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
                                                        <Typeahead
                                                            id="job_order_pk_id"
                                                            name="job_order_pk_id"
                                                            labelKey={option => `${option.name}`}
                                                            options={typeHeadOptions['job_orders']}
                                                            placeholder="Select Job No..."
                                                            onChange={(e) => dropDownChange(e, 'job_order_pk_id')}
                                                            inputProps={{ required: true }}
                                                            defaultInputValue={selectedJobOrders?.name}
                                                            // disabled={job_order_pk_id != null ? 'disabled' : ''}
                                                            ref={register({
                                                                required: 'Job No Field Required'
                                                            })}
                                                        />
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
                                                                ref={register({
                                                                    required: 'Machine Field Required'
                                                                })} 
                                                                onChange={(e) => changeMasterGrinder(e)}
                                                                value = {grindingMaster?.machine ? parseInt(grindingMaster?.machine) : 0}>
                                                                <option value=''> Select Machine </option>
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
                                                                // onChange={(e)=>shiftChangeHandler(e.target.value)}
                                                                onChange={(e) => changeMasterGrinder(e)}
                                                                ref={register({
                                                                    required: 'Shift Field Required'
                                                                })} 
                                                                value={grindingMaster?.shift ? parseInt(grindingMaster?.shift) : ''}>
                                                                    <option value=''> Select Shift </option>
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
                                                                <input className="form-control"  onChange={(e) => changeMasterGrinder(e)} type="time" name="start_time" required id="start_time"  placeholder="Start Time"  value={grindingMaster?.start_time ? grindingMaster?.start_time : ''} ref={register({ required: true })} />
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
                                                                ref={register({
                                                                    required: 'Polishing Field Required'
                                                                })} 
                                                                value={grindingMaster?.polishing ? parseInt(grindingMaster?.polishing) : ''}
                                                                onChange={(e) => changeMasterGrinder(e)}>
                                                                    <option value=''> Select Polishing </option>
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
                                                                ref={register({
                                                                    required: 'Done By Field Required'
                                                                })} 
                                                                value={grindingMaster?.done_by ? parseInt(grindingMaster?.done_by) : ''}
                                                                onChange={(e) => changeMasterGrinder(e)}>
                                                                    <option value=''> Select One </option>
                                                                    {
                                                                        jobOrderData.employeeInfos.map((employee, key)=>(
                                                                            <option key={key} value={employee.id}>{employee.name}</option>
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
                                                                <input className="form-control"  onChange={(e) => changeMasterGrinder(e)} name="end_time" required id="end_time" type="time" placeholder="End Time" value={grindingMaster?.end_time ? grindingMaster?.end_time : ''} ref={register({ required: true })} />
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
                                                                    <input className="form-control" name="final_fl" required id="final_fl" type="number" placeholder="Final FL" value={grindingMaster?.final_fl ? grindingMaster?.final_fl : ''} ref={register({ required: true })} />
                                                                    <span>{errors.final_fl && 'Final FL is required'}</span>
                                                                    <div className="valid-feedback">Looks good!</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-4 mb-1">
                                                            <div className="row">
                                                                <label className="col-sm-5 col-form-label" htmlFor="final_dia">Final Dia</label>
                                                                <div className="col-sm-7">
                                                                    <input className="form-control" name="final_dia" required id="final_dia" type="number" placeholder="Final Dia" value={grindingMaster?.final_dia ? grindingMaster?.final_dia : ''} ref={register({ required: true })}/>
                                                                    <span>{errors.final_dia && 'Final Dia is required'}</span>
                                                                    <div className="valid-feedback">Looks good!</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-4 mb-1">
                                                            <div className="row">
                                                                <label className="col-sm-5 col-form-label" htmlFor="final_cir">Final Cir</label>
                                                                <div className="col-sm-7">
                                                                    <input disabled value={100} className="form-control" name="final_cir" required id="final_cir" type="number" placeholder="Final Cir" ref={register({ required: true })} />
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
                                                            <textarea className='form-control' name='note' id='note' placeholder='Note' value={grindingMaster?.note ? grindingMaster?.note : ''} ref={register({ required: true })}></textarea>
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

export default Add;