import React, { Fragment, useEffect, useState, useReducer } from 'react';
import { POLISHING_RS_URL, POLISHING_GET_POLISHING_DATA_BY_JOB_ID, GET_POLISHING_DATA_BY_POLISHING_PK_ID } from '../../../../api/userUrl';
import { userGetMethod, userPutMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';
import { Typeahead } from 'react-bootstrap-typeahead';
import moment from 'moment';

const Add = (props) => {
    const { handleSubmit, register, errors ,reset} = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [typeHeadOptions, setTypeHeadOptions] = useState({});
    const [dropDownData, setDropdownData] = useState();
    const [chk, setChk] = useState(true);

    let [stateData, setStateData] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            // send_date         : new Date().toLocaleDateString(),
            // job_name           : '',
            // job_no             : '',
            // client_name        : '',
            // marketing_p_name   : '',
            // job_type           : '',
            // total_cylinder_qty : '',
            // base_source        : '',
            // printer_name       : '',
            // desired_fl         : '',
            // desired_cir        : '',
            // desired_dia        : '',
            // surface_area       : '',
            // fl                 : '', 
            // dia                : '', 
            job_order_id                  : '',
            cylinder_id                   : '',
            rough_cut_polishing_machine_id: '',
            shift_id                      : '',
            fine_cut_polishing_machine_id : '',
            est_duration                  : '',
            on_time                       : '',
            est_end_time                  : '',
            polishing_date                : '',
            rework                        : '',
            rework_reason                 : '',
            production_date               : '',
            done_by                       : '',
            chrome_cylinder_status        : '',
            a_duration                    : '',
            dia_after_rough_cut           : '',
            output_status                 : '',
            dia_after_fine_cut            : '',
            action_if_output_is_not_ok    : '',
            a_off_time                    : '',
            remarks                       : '',
            
            job_order_id                  : '', 
            jobOrderDetailsData           : [], //STORE DATA FROM job_orders
            shiftData                     : [], //STORE DATA FROM dig_shift_master
            shiftDutyPersons              : [], //STORE DATA FROM dig_shift_details
            reworkReasons                 : [], //STORE DATA FROM rework_reasons
            cylindersByJobId              : [], //STORE DATA FROM factory_cylinder_supply_chains
            // completePolishingData         : [], //STORE DATA FROM dig_polishings
            allPolishingData              : [],
            remainingPolishingData        : [],
            available_cylinders           : [],
            polishMachines                : [],
        }
    );
    let digPolishingCylinderId = props.location.state.params.dig_polishing_cylinder_id ? props.location.state.params.dig_polishing_cylinder_id : null;

    useEffect(()=>{
        userGetMethod(`${POLISHING_RS_URL}/create?polishing_id=${digPolishingCylinderId}`)
            .then(response => {
                // FOR JOB ORDER
                // console.log(response.data)
                let jobOrderOptions = [];
                if (response.data.jobOrder) {
                    let jobOrderObj = {};
                    jobOrderObj.id = response.data.jobOrder.job_id; // job_id FROM job_orders.id
                    jobOrderObj.name = `[${response.data.jobOrder.job_no}] ` + response.data.jobOrder.job_name;
                    jobOrderOptions.push(jobOrderObj);

                    if (response.data.jobOrder != null) { 
                        setStateData({
                            'job_order_id': [jobOrderObj]
                        })
                    }
                    
                    dropDownChange([{id : response.data.jobOrder.job_id}], 'job_order_id');
                }
                if (response.data.jobOrders && response.data.jobOrders.length > 0) {
                    response.data.jobOrders.map(order => 
                    {
                        let jobOrderObj = {};
                        jobOrderObj.id = order.id;
                        jobOrderObj.name = `[${order.job_no}] ` + order.job_name;
                        jobOrderOptions.push(jobOrderObj);
                        
                    })
                }
                let {polishing, polishMachines, digShift, shiftDutyPersons, reworkReasons} = response.data;
                
                setStateData({
                    // 'job_order_id'                  : polishing.job_order_id,
                    // 'cylinder_id'                   : polishing.cylinder_id,
                    // 'rough_cut_polishing_machine_id': polishing.rough_cut_polishing_machine_id,
                    // 'shift_id'                      : polishing.shift_id,
                    // 'fine_cut_polishing_machine_id' : polishing.fine_cut_polishing_machine_id,
                    // 'est_duration'                  : polishing.est_duration,
                    // 'on_time'                       : polishing.on_time,
                    // 'est_end_time'                  : polishing.est_end_time,
                    // 'polishing_date'                : polishing.polishing_date,
                    // 'rework'                        : polishing.rework,
                    // 'rework_reason'                 : polishing.rework_reason,
                    // 'production_date'               : polishing.production_date,
                    // 'done_by'                       : polishing.done_by,
                    // 'chrome_cylinder_status'        : polishing.chrome_cylinder_status,
                    // 'a_duration'                    : polishing.a_duration,
                    // 'dia_after_rough_cut'           : polishing.dia_after_rough_cut,
                    // 'output_status'                 : polishing.output_status,
                    // 'dia_after_fine_cut'            : polishing.dia_after_fine_cut,
                    // 'action_if_output_is_not_ok'    : polishing.action_if_output_is_not_ok,
                    // 'a_off_time'                    : polishing.a_off_time,
                    // 'remarks'                       : polishing.remarks,
                    
                    'polishMachines'                : polishMachines,
                    'job_orders'                    : jobOrderOptions,
                    'shiftData'                     : digShift, //GET DATA FROM dig_shift_master table
                    'shiftDutyPersons'              : shiftDutyPersons, //GET DATA FROM dig_shift_details table
                    'reworkReasons'                 : reworkReasons, //GET DATA FROM rework_reasons table
                });

                setIsLoading(false);
            });
    }, []);

    const dropDownChange = (e, fieldName) => {
        if(e.length > 0){
            const selectedValueId = e[0].id;
            setDropdownData(
                (prevstate) => ({
                    ...prevstate,
                    [fieldName]: selectedValueId,
                })
            );

            userGetMethod(`${POLISHING_GET_POLISHING_DATA_BY_JOB_ID}?jobOrderId=${selectedValueId}`)
                .then(response => {
                    let { jobOrderDetails, allPolishingData, remainingCylinder} = response.data;
                    setStateData({
                        'jobOrderDetailsData'       : jobOrderDetails, //JOB ORDER DATA FROM 'job_orders' TABLE
                        'allPolishingData'          : allPolishingData, //PLATING DATA FROM 'plating_tank_schedule_details' TABLE
                        'remainingPolishingData'    : remainingCylinder,
                    });
                });
        }
    }

    const cylinderOnChange = (e)=>{
        let polishing_pk_id = e.target.value;
        userGetMethod(`${GET_POLISHING_DATA_BY_POLISHING_PK_ID}?polishing_pk_id=${polishing_pk_id}`)
            .then(response => {
                setStateData({
                    'selectCylinderId'              : digPolishingCylinderId != null ? digPolishingCylinderId : response.data.cylinderData.cylinder_id,

                    'job_order_id'                  : response.data.cylinderData.job_order_id,
                    'cylinder_id'                   : response.data.cylinderData.cylinder_id,
                    'rough_cut_polishing_machine_id': response.data.cylinderData.rough_cut_polishing_machine_id,
                    'shift_id'                      : response.data.cylinderData.shift_id,
                    'fine_cut_polishing_machine_id' : response.data.cylinderData.fine_cut_polishing_machine_id,
                    'est_duration'                  : response.data.cylinderData.est_duration,
                    'on_time'                       : response.data.cylinderData.on_time,
                    'est_end_time'                  : response.data.cylinderData.est_end_time,
                    'polishing_date'                : response.data.cylinderData.polishing_date,
                    // 'rework'                        : response.data.cylinderData.rework,
                    // 'rework_reason'                 : response.data.cylinderData.rework_reason,
                    'production_date'               : response.data.cylinderData.production_date,
                    'done_by'                       : response.data.cylinderData.done_by,
                    'chrome_cylinder_status'        : response.data.cylinderData.chrome_cylinder_status,
                    'a_duration'                    : response.data.cylinderData.a_duration,
                    'dia_after_rough_cut'           : response.data.cylinderData.dia_after_rough_cut,
                    'output_status'                 : response.data.cylinderData.output_status,
                    'dia_after_fine_cut'            : response.data.cylinderData.dia_after_fine_cut,
                    'action_if_output_is_not_ok'    : response.data.cylinderData.action_if_output_is_not_ok,
                    'a_off_time'                    : response.data.cylinderData.a_off_time,
                    'remarks'                       : response.data.cylinderData.remarks
                });
            });
    }

    const inputChangeHandler = (e)=>{
        if(e.target.type == 'checkbox'){
            e.target.checked == true ? setStateData({[e.target.name] : 1}) : setStateData({[e.target.name] : 0})
        }else{
            setStateData({[e.target.name]: e.target.value});
        }
        if (e.target.name == 'shift_id') {
            setStateData({
                ...stateData,[e.target.name] : e.target.value
            });
        }
    }
    // console.log(stateData)
    
    useEffect(() => {
        if(stateData?.on_time != '' && stateData?.est_duration != '' ){
            let inputDate = moment(stateData?.on_time,"HH:mm").format("HH:mm:ss");
            var t1 =new Date (moment(inputDate, 'HH:mm:ss').toString());
            let est_inputDate = moment(stateData?.est_duration,"HH:mm").format("HH:mm:ss");
           
            var t2 =new Date (moment(est_inputDate, 'HH:mm:ss').toString());

            t1.setHours((t1.getHours() + t2.getHours()));
            t1.setMinutes((t1.getMinutes() + (t2.getMinutes())));

            setStateData({"est_end_time": moment(t1).format("HH:mm:ss")})
        }
        if(stateData?.on_time != '' && stateData?.a_off_time != ''){
            let inputDate = moment(stateData?.on_time, "HH:mm").format("HH:mm:ss");
            let endDate = moment(stateData?.a_off_time, "HH:mm").format("HH:mm:ss");

            var ts = new Date(moment(inputDate, "HH:mm:ss").toString());
            var te = new Date(moment(endDate, "HH:mm:ss").toString());

            te.setHours((te.getHours() - ts.getHours()));
            te.setMinutes((te.getMinutes() - (ts.getMinutes())));
            setStateData({'a_duration': moment(te).format("HH:mm:ss")})

        }

    },[stateData?.on_time,stateData?.est_duration,stateData?.a_off_time]);

    const submitHandler = (data,e) => {
        data.job_no = stateData.jobOrderDetailsData.job_no;
        userPutMethod(`${POLISHING_RS_URL}/${digPolishingCylinderId ? digPolishingCylinderId : stateData.selectCylinderId}`, data)
            .then(response => {
                if (response.data.status == 1) {
                    toast.success(response.data.message)
                    e.target.reset();
                    clearForm();
                } else {
                    toast.error(response.data.message)
                }
            })
        .catch(error => toast.error(error))
    }

    const clearForm = () => {
        setStateData({
            cylinder_id                   : '',
            rough_cut_polishing_machine_id: '',
            shift_id                      : '',
            fine_cut_polishing_machine_id : '',
            est_duration                  : '',
            on_time                       : '',
            est_end_time                  : '',
            polishing_date                : '',
            rework                        : '',
            rework_reason                 : '',
            production_date               : '',
            done_by                       : '',
            chrome_cylinder_status        : '',
            a_duration                    : '',
            dia_after_rough_cut           : '',
            output_status                 : '',
            dia_after_fine_cut            : '',
            action_if_output_is_not_ok    : '',
            a_off_time                    : '',
            remarks                       : '',
            
            job_order_id                  : '', 
            jobOrderDetailsData           : [], //STORE DATA FROM job_orders
            shiftData                     : [], //STORE DATA FROM dig_shift_master
            shiftDutyPersons              : [], //STORE DATA FROM dig_shift_details
            reworkReasons                 : [], //STORE DATA FROM rework_reasons
            cylindersByJobId              : [], //STORE DATA FROM factory_cylinder_supply_chains
            // completePolishingData         : [], //STORE DATA FROM dig_polishings
            remainingPolishingData        : [],
            allPolishingData              : [],
            available_cylinders           : [],
            polishMachines                : [],
        })
    }

    var menuId = 0;
    if (props.location.state === undefined) {
        menuId = 0;
    } else {
        menuId = props.location.state.params.menuId;
    }
    
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>Polishing Form</h5>
                        </div>
                        <div className="card-body">
                            {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                            (
                                <>
                                <form onSubmit={handleSubmit(submitHandler)} className="theme-form row">
                                    <div className="col-md-8">
                                        <fieldset className="border p-2" >
                                            <legend className="w-auto text-left">Job and base Information</legend>

                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label required">Job Id</label>
                                                <div className="col-md-9">
                                                    <Typeahead
                                                        id="job_order_pk_id"
                                                        name="job_order_pk_id"
                                                        labelKey={option => `${option.name}`}
                                                        options={stateData['job_orders']}
                                                        placeholder="Select Job No..."
                                                        onChange={(e) => dropDownChange(e, 'job_order_pk_id')}
                                                        inputProps={{ required: true }}
                                                        selected={stateData.job_order_id}
                                                        ref={register({
                                                            required: 'Job No Field Required'
                                                        })}
                                                    />
                                                </div>

                                                <label className="col-md-3 col-form-label label-form required ">Cylinder Id</label>
                                                <div className="col-md-9">
                                                    <select className="form-control" name="polishing_pk_id" onChange={cylinderOnChange} ref={register({
                                                        required: 'Cylinder Id Field Required'
                                                    })} defaultValue={digPolishingCylinderId != null ? digPolishingCylinderId :''}>
                                                        <option value=''>Select One ...</option>
                                                        {
                                                            stateData.remainingPolishingData.map((data, key)=>(
                                                                <option value={data?.id} key={key}>{data?.cylinder_id} {data.rework == 1 ? "(Rework)" : ""} </option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </fieldset>

                                        <fieldset className="border p-2" >
                                            <legend className="w-auto text-left">Polishing</legend>
                                            
                                            <div className="form-row">
                                                <div className="col-md-6 row">
                                                    <label className="col-md-5 col-form-label label-form">Machine Rough Cut</label>
                                                    <div className="col-md-7">
                                                        <select className="form-control" name="rough_cut_polishing_machine_id" onChange= {inputChangeHandler} ref={register({
                                                            required: 'Machine Rough Cut Field Required'
                                                        })} value={stateData.rough_cut_polishing_machine_id ? stateData.rough_cut_polishing_machine_id : ''}>
                                                            <option value=''>Select One</option>
                                                            {
                                                                stateData.polishMachines.map((machine, key)=>(
                                                                    <option value={machine.id} key={key}>{machine.machine_name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                
                                                    <label className="col-md-5 col-form-label label-form">Machine Fine Cut</label>
                                                    <div className="col-md-7">
                                                        <select className="form-control" name="fine_cut_polishing_machine_id" onChange={inputChangeHandler} ref={register({ 
                                                            required: true 
                                                        })} value={stateData.fine_cut_polishing_machine_id ? stateData.fine_cut_polishing_machine_id : ''}>
                                                            <option value=''>Select One</option>
                                                            {
                                                                stateData.polishMachines.map((machine, key)=>(
                                                                    <option value={machine.id} key={key}>{machine.machine_name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                
                                                    <label className="col-md-5 col-form-label label-form">On Time</label>
                                                    <div className="col-md-7">
                                                        <input 
                                                            type="time" 
                                                            className="form-control" 
                                                            name="on_time" 
                                                            required
                                                            ref={register({
                                                                required: 'On Time Field Required'
                                                            })}
                                                            onChange={inputChangeHandler}
                                                            value={stateData.on_time ? stateData.on_time : ''}
                                                        />
                                                    </div>
                                                
                                                    <label className="col-md-5 col-form-label label-form">Polishing Date</label>
                                                    <div className="col-md-7">
                                                        <input 
                                                            type="date" 
                                                            className="form-control" 
                                                            name="polishing_date"
                                                            required 
                                                            onChange={inputChangeHandler}
                                                            ref={register({required: true })}
                                                            value={stateData.polishing_date ? stateData.polishing_date : ''}
                                                        />
                                                    </div>
                                                
                                                </div>      

                                                <div className="col-md-6 row">
                                                    {/* {stateData.shift_id ? (
                                                        <> */}
                                                    <label className="col-md-5 col-form-label label-form">Production Date</label>
                                                    <div className="col-md-7">
                                                        <input type="date" className="form-control" name="production_date" required onChange={inputChangeHandler} ref={register({ required: true })} value={stateData.production_date ? stateData.production_date : ''}/>
                                                    </div>
                                                        
                                                    <label className="col-md-5 col-form-label label-form">Shift</label>
                                                    <div className="col-md-7">
                                                        {/* <input type="text"  value={stateData.shiftData.shift_type == 1 ? 'Day' : stateData.shiftData.shift_type == 2 ? 'Evening' : 'Night'} className="form-control"/>

                                                        <input type="hidden" value={stateData.shiftData.shift_pk_id} className="form-control" name="shift_id" ref={register({ required: true })}/> */}

                                                        <select className="form-control" name="shift_id" onChange={inputChangeHandler} ref={register({
                                                        required: 'Shift Id Field Required'
                                                    })} defaultValue=''>
                                                        <option value=''>Select One ...</option>
                                                        <option value='1'>Day</option>
                                                        <option value='2'>Evening</option>
                                                        <option value='3'>Night</option>
                                                        
                                                    </select>


                                                    </div>
                                                    
                                                        {/* </>
                                                    ) : ''} */}
                                                    
                                                    <label className="col-md-5 col-form-label label-form">Est, Duration</label>
                                                    <div className="col-md-7">
                                                        <input type="text" className="form-control" name="est_duration" placeholder='HH:MM' required onChange={inputChangeHandler} ref={register({ required: true })} value={stateData.est_duration ? stateData.est_duration : ''}/>
                                                    </div>
                                                
                                                    <label className="col-md-5 col-form-label label-form">Est, End Time</label>
                                                    <div className="col-md-7">
                                                        <input type="time" className="form-control" name="est_end_time" required onChange={inputChangeHandler} ref={register({ required: true })} value={stateData.est_end_time ? stateData.est_end_time : ''}/>
                                                    </div>
                                                    
                                                    {/* <label className="col-md-5 col-form-label label-form">Rework </label>
                                                    <div className="col-md-7">
                                                        <input type="checkbox" className="mt-2" name="rework" onChange={inputChangeHandler} ref={register({})} value={stateData.rework ? stateData.rework : ''} />
                                                    </div>

                                                    <label className="col-md-5 col-form-label label-form">Rework reason </label>
                                                    <div className="col-md-7">
                                                        <select className="form-control" name="rework_reason" onChange={inputChangeHandler} ref={register({})} value={stateData.rework_reason ? stateData.rework_reason : ''}>
                                                            <option>select one</option>
                                                            {
                                                                stateData.reworkReasons.map((rework, key)=>(
                                                                    <option value={rework.id} key={key}>{rework.reason}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div> */}
                                                    {stateData.shift_id ? (
                                                        <>
                                                            <label className="col-md-5 col-form-label label-form">Done by</label>
                                                            <div className="col-md-7">
                                                                <select className="form-control" name="done_by" onChange={inputChangeHandler} ref={register({})} value={stateData.done_by ? stateData.done_by : ''}>
                                                                    <option value=''>Select One</option>
                                                                    {
                                                                        stateData.shiftDutyPersons.map((dutyPerson, key)=>(
                                                                            <option value={dutyPerson.employee_id} key={key}>{dutyPerson.employee_name}</option> //employee_id MEANS dig_employee_information.id and employee_name MEANS dig_employee_information.name 
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>
                                                        </>
                                                    ) : ''}
                                                    
                                                </div>
                                            </div>
                                        </fieldset>

                                        <fieldset className="border p-2" >
                                            <legend className="w-auto text-left">Output, QC and Remarks</legend>
                                            <div className="form-row">
                                                <div className="col-md-6 row">
                                                    <label className="col-md-5 col-form-label label-form">Chrome Cylinder? </label>
                                                    <div className="col-md-7">
                                                        <input type="checkbox" className="mt-2" name="chrome_cylinder_status" onChange={inputChangeHandler} ref={register({})}
                                                             {...register("chrome_cylinder_status", { required: "Please enter your first name." })}
                                                         />
                                                    </div>
                                                    
                                                    <label className="col-md-5 col-form-label label-form"> Dia after Rough Cut</label>
                                                    <div className="col-md-7">
                                                        <input type="text" className="form-control" name="dia_after_rough_cut" required onChange={inputChangeHandler} ref={register({ required: true })} value={stateData.dia_after_rough_cut ? stateData.dia_after_rough_cut : ''} />
                                                    </div>
                                                
                                                    <label className="col-md-5 col-form-label label-form">Dia after Fine Cut</label>
                                                    <div className="col-md-7">
                                                        <input type="text" className="form-control" name="dia_after_fine_cut" required onChange={inputChangeHandler} ref={register({ required: true })} value={stateData.dia_after_fine_cut ? stateData.dia_after_fine_cut : ''} />
                                                    </div>
                                                
                                                    <label className="col-md-5 col-form-label label-form">A. off Time</label>
                                                    <div className="col-md-7">
                                                        <input type="time" className="form-control" name="a_off_time" onChange={inputChangeHandler} ref={register({})} value={stateData.a_off_time ? stateData.a_off_time : ''} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 row">
                                                    <label className="col-md-5 col-form-label label-form">A. Duration</label>
                                                    <div className="col-md-7">
                                                        <input type="text" className="form-control" name="a_duration" onChange={inputChangeHandler} ref={register({})} value={stateData.a_duration ? stateData.a_duration : ''} />
                                                    </div>
                                                    
                                                    <label className="col-md-5 col-form-label label-form">Output Status</label>
                                                    <div className="col-md-7">
                                                        <select className="form-control" name="output_status" onChange={inputChangeHandler} required ref={register({})} value={stateData.output_status ? stateData.output_status : ''}>
                                                            <option value=''>Select One</option>
                                                            <option value="1">Ok</option>
                                                            <option value="0">Not Ok</option>
                                                        </select>
                                                    </div>
                                                    
                                                    <label className="col-md-5 col-form-label label-form">Action if output is not OK</label>
                                                    <div className="col-md-7">
                                                        <input type="text" className="form-control" name="action_if_output_is_not_ok" onChange={inputChangeHandler} ref={register({})} value={stateData.action_if_output_is_not_ok ? stateData.action_if_output_is_not_ok : ''} />
                                                    </div>
                                                    
                                                    <label className="col-md-5 col-form-label label-form">Remarks</label>
                                                    <div className="col-md-7">
                                                        <input type="text" className="form-control" name="remarks" onChange={inputChangeHandler} ref={register({})} value={stateData.remarks ? stateData.remarks : ''} />
                                                    </div>
                                                </div>
                                            </div>       
                                        </fieldset>
                                    </div>
                                    <div className="col-md-4">
                                        <pre className="helper-classes m-t-10">
                                            <div className="display-div">
                                                <div className='p-0'>
                                                    <table className="table table-bordernone">
                                                        <tbody>
                                                            <tr>
                                                                <td width="45%" align="right">Job Name</td>
                                                                <td width="5%">:</td>
                                                                <td width="50%">{stateData.jobOrderDetailsData.job_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right">Job Type</td>
                                                                <td>:</td>
                                                                <td>{stateData.jobOrderDetailsData.job_type}</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right">Cylinder Id</td>
                                                                <td>:</td>
                                                                <td>{stateData.selectCylinderId}</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right">FL</td>
                                                                <td>:</td>
                                                                <td>{stateData.jobOrderDetailsData.fl}</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right">Cir</td>
                                                                <td>:</td>
                                                                <td>{stateData.jobOrderDetailsData.cir}</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right">Dia</td>
                                                                <td>:</td>
                                                                <td>{stateData.jobOrderDetailsData.dia}</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right">S. Area</td>
                                                                <td>:</td>
                                                                <td>{stateData.jobOrderDetailsData.surface_area}</td>
                                                            </tr>
                                                            {/* <tr>
                                                                <td align="right">Dia after Grinding</td>
                                                                <td>:</td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right">Dia-Final (Desired)</td>
                                                                <td>:</td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right">Des. Polishing</td>
                                                                <td>:</td>
                                                                <td></td>
                                                            </tr> */}
                                                            <tr>
                                                                <td align="right">Remarks</td>
                                                                <td>:</td>
                                                                <td>{stateData.jobOrderDetailsData.remarks}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                
                                            </div>
                                        </pre>
                                        <fieldset className="border p-2" >
                                            <legend className="w-auto text-left">Plating</legend>

                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Count</th>
                                                        <th>Order</th>
                                                        <th>Cycle ID</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        stateData.allPolishingData.length > 0 ? 
                                                            stateData.allPolishingData.map((plating, key)=>(        
                                                                <tr key={key}>
                                                                    <td>{++key}</td>
                                                                    <td>{plating.est_plt_order}</td>
                                                                    <td>{plating.cylinder_id}</td>
                                                                </tr>
                                                            ))
                                                        :
                                                        (
                                                            <tr>
                                                                <td colSpan={3} align="center">No Data Found</td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </fieldset>
                                    </div>
                                    <SubmitButton link="polishing/index" menuId={ menuId } />
                                </form>
                                <fieldset className="border p-2" >
                                    <legend className="w-auto text-left">Polishing for this Job No./BCO</legend>

                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Cyl ID</th>
                                                <th>Rough Cut Dia</th>
                                                <th>Fine Cut Dia</th>
                                                <th>R. Cut Mach</th>
                                                <th>F. Cut Mach</th>
                                                <th>Date Polishing</th>
                                                <th>Shift</th>
                                                <th>Output Status</th>
                                                <th>Operation</th>
                                                <th>Re-Work</th>
                                                <th>Remarks</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                stateData.allPolishingData.length > 0 ? 
                                                    stateData.allPolishingData.map((polishingData, key)=>(
                                                        <tr key={key}>
                                                            <td>{polishingData.cylinder_id}</td>
                                                            <td>{polishingData.dia_after_rough_cut}</td>
                                                            <td>{polishingData.dia_after_fine_cut}</td>
                                                            <td>{polishingData.rough_cut_polishing_machine_id}</td>
                                                            <td>{polishingData.fine_cut_polishing_machine_id}</td>
                                                            <td>{polishingData.polishing_date}</td>
                                                            <td>{polishingData.shift_type == 1 ? "Day" : (polishingData.shift_type == 2 ? "Evening" : "Night")}</td>
                                                            <td>{polishingData.output_status == 1 ? 'Ok' : "Not Ok" }</td>
                                                            <td></td>
                                                            <td>{polishingData.rework == 1 ? <span className='text-danger'>Yes</span> : "No"}</td>
                                                            <td>{polishingData.remarks}</td>
                                                        </tr>
                                                    ))
                                                :
                                                (
                                                    <tr>
                                                        <td colSpan="11" align="center">No Data Found</td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                    
                                </fieldset>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Add;