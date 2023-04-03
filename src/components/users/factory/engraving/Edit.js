import React, { Fragment, useEffect, useState, useReducer } from 'react';
import { ENGRAVING_RS_URL, POLISHING_GET_POLISHING_DATA_BY_JOB_ID } from '../../../../api/userUrl';
import { userGetMethod, userPutMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';

const Edit = (props) => {
    const { handleSubmit, register, errors, reset } = useForm();
    const [isLoading, setIsLoading] = useState(true);

    let [stateData, setStateData] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            // send_date         : new Date().toLocaleDateString(),
            
            job_order_id                  : '',
            cylinder_id                   : '',
            //Output, QC and Remarks
            a_off_time                    : '',
            output_status                 : '',
            stylus_broken                 : '',
            action                        : '',
            a_duration                    : '',
            remarks                       : '',
            //ENGRAVING
            des_machine                   : '',
            engr_date                     : '',
            est_duration                  : '',
            shift_id                      : '',
            done_by                       : '',
            a_machine                     : '',
            on_time                       : '',
            est_end_time                  : '',

            job_order_pk_id               : '', 
            jobOrderDetailsData           : [], //STORE DATA FROM job_orders
            shiftData                     : [], //STORE DATA FROM dig_shift_master
            shiftDutyPersons              : [], //STORE DATA FROM dig_shift_details
            cylindersByJobId              : [], //STORE DATA FROM factory_cylinder_supply_chains
            completeEngraveData           : [], //STORE DATA FROM dig_engravings
            platingData                   : [],
            available_cylinders           : [],
            polishMachines                : [],
        }
    );
    let digEngravingCylinderId = props.match.params.dig_engravings_cylinder_id ? props.match.params.dig_engravings_cylinder_id : null;
    
    useEffect(()=>{
        userGetMethod(`${ENGRAVING_RS_URL}/${digEngravingCylinderId}/edit`)
            .then(response => {
                dropDownChange([{id : response.data.jobOrder.job_id}], 'job_order_pk_id');

                let {engraving, polishMachines, digShift, shiftDutyPersons} = response.data;
                
                setStateData({
                    'job_no'                        : response.data.jobOrder.job_no,
                    'job_order_pk_id'               : engraving.job_order_pk_id,
                    'cylinder_id'                   : engraving.cylinder_id,

                    'a_off_time'                    : engraving.a_off_time,
                    'output_status'                 : engraving.output_status,
                    'stylus_broken'                 : engraving.stylus_broken,
                    'action'                        : engraving.action,
                    'a_duration'                    : engraving.a_duration,
                    'des_machine'                   : engraving.des_machine,
                    'engr_date'                     : engraving.engr_date,
                    'est_duration'                  : engraving.est_duration,
                    'shift_id'                      : engraving.shift_id,
                    'done_by'                       : engraving.done_by,
                    'a_machine'                     : engraving.a_machine,
                    'on_time'                       : engraving.on_time,
                    'est_end_time'                  : engraving.est_end_time,
                    'remarks'                       : engraving.remarks,
                    
                    'polishMachines'                : polishMachines,
                    'shiftData'                     : digShift, //GET DATA FROM dig_shift_master table
                    'shiftDutyPersons'              : shiftDutyPersons, //GET DATA FROM dig_shift_details table
                });

                setIsLoading(false);
            });
    }, []);

    const onChangeHandler = (event) => {
        setStateData({[event.target.name]: event.target.value});
    }

    const dropDownChange = (e, fieldName) => {
        if(e.length > 0){
            const selectedValueId = e[0].id; //job_orders.job_order_pk_id

            userGetMethod(`${POLISHING_GET_POLISHING_DATA_BY_JOB_ID}?jobOrderId=${selectedValueId}`)
                .then(response => {
                    let { jobOrderDetails, cylindersByJobId, platingData, completeEngraveData} = response.data;
                    setStateData({
                        'jobOrderDetailsData'  : jobOrderDetails, //CYLINDER DATA FROM 'job_orders' TABLE
                        'cylindersByJobId'     : cylindersByJobId, //CYLINDER DATA FROM 'factory_cylinder_supply_chains' TABLE
                        'platingData'          : platingData, //PLATING DATA FROM 'plating_tank_schedule_details' TABLE
                        'completeEngraveData': completeEngraveData //PLATING DATA FROM 'plating_tank_schedule_details' TABLE
                    });
                });
        }
    }
    
    const submitHandler = (data,e) => {
        userPutMethod(`${ENGRAVING_RS_URL}/${digEngravingCylinderId}`, data)
            .then(response => {
                if (response.data.status == 1) {
                    toast.success(response.data.message)
                    e.target.reset();
                    setStateData({
                        jobOrderDetailsData: [],
                    })
                } else {
                    toast.error(response.data.message)
                }
            })
        .catch(error => toast.error(error))
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
                            <h5>Engraving Form</h5>
                        </div>
                        <div className="card-body">
                            {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                            (
                                <>
                                <form onSubmit={handleSubmit(submitHandler)} className="theme-form row">
                                    <div className="col-md-9">
                                        <fieldset className="border p-2" >
                                            <legend className="w-auto text-left">Job and base Information</legend>

                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label required">Job Id</label>
                                                <div className="col-md-9">
                                                    {/* <Typeahead
                                                        id="job_order_pk_id"
                                                        name="job_order_pk_id"
                                                        labelKey={option => `${option.name}`}
                                                        options={stateData['job_orders']}
                                                        placeholder="Select Job No..."
                                                        onChange={(e) => dropDownChange(e, 'job_order_pk_id')}
                                                        selected={stateData.job_order_id}
                                                        disabled={stateData.job_order_id != '' ? 'disabled' : ''}
                                                        ref={register({
                                                            required: 'Job No Field Required'
                                                        })}
                                                    /> */}
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        name="job_no" 
                                                        ref={register({
                                                            required: 'On Time Field Required'
                                                        })}
                                                        value={stateData.job_no}
                                                        // value='20211116-001'
                                                        disabled={'disabled'}
                                                    />
                                                </div>

                                                <label className="col-md-3 col-form-label label-form required ">Cylinder Id</label>
                                                <div className="col-md-9">
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        value={stateData.cylinder_id}
                                                        disabled={'disabled'}
                                                    />
                                                    {/* <input 
                                                        type="hidden" 
                                                        className="form-control" 
                                                        name="factory_cyl_sup_id" 
                                                        ref={register({
                                                            required: 'On Time Field Required'
                                                        })}
                                                        value='1'
                                                        disabled={'disabled'}
                                                    /> */}
                                                </div>
                                            </div>
                                        </fieldset>

                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <fieldset className="border p-2">
                                                    <legend className="w-auto text-left">Layout</legend>

                                                    <div className="form-row">
                                                        <label className="col-sm-3 col-form-label required">Layout Id</label>
                                                        <div className="col-md-8">
                                                            {/* <Typeahead
                                                                id="job_order_pk_id"
                                                                name="job_order_pk_id"
                                                                labelKey={option => `${option.name}`}
                                                                options={typeHeadOptions['job_orders']}
                                                                placeholder="Select Job No..."
                                                                onChange={(e) => dropDownChange(e, 'job_order_pk_id')}
                                                                // selected={designToFactoryInput.job_order_pk_id}
                                                                // disabled={job_order_pk_id != null ? 'disabled' : ''}
                                                                ref={register({
                                                                    required: 'Job No Field Required'
                                                                })}
                                                            /> */}
                                                            <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                name="job_no"
                                                                placeholder="Layout ID"
                                                                {...register("job_no", {required: 'error message'})}
                                                                // value='20211116-001'
                                                                disabled={'disabled'}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 form-row">
                                                            <label className="col-md-5 col-form-label label-form required ">Color Sl</label>
                                                            <div className="col-md-7">
                                                                <input type="text" className="form-control" name="color_sl" {...register("color_sl", {required: 'error message'})} />
                                                            </div>

                                                            <label className="col-md-5 col-form-label label-form required ">Screen</label>
                                                            <div className="col-md-7">
                                                                <input type="text" className="form-control" name="screen" {...register("screen", {required: 'error message'})} />
                                                            </div>

                                                            <label className="col-md-5 col-form-label label-form  ">Start Point</label>
                                                            <div className="col-md-7">
                                                                <input type="text" className="form-control" name="start_point" {...register("start_point", {required: 'error message'})} />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6 form-row">
                                                            <label className="col-md-5 col-form-label label-form required ">Color</label>
                                                            <div className="col-md-7">
                                                                <input type="text" className="form-control" name="color" {...register("color", {required: 'error message'})} />
                                                            </div>

                                                            <label className="col-md-5 col-form-label label-form required ">Angle</label>
                                                            <div className="col-md-7">
                                                                <input type="text" className="form-control" name="angle" {...register("angle", {required: 'error message'})} />
                                                            </div>

                                                            <label className="col-md-5 col-form-label label-form  ">Image Area</label>
                                                            <div className="col-md-7">
                                                                <input type="text" className="form-control" name="image_area" {...register("image_area", {required: 'error message'})} />
                                                            </div>
                                                        </div>

                                                        <label className="col-md-3 col-form-label label-form">Remarks</label>
                                                        <div className="col-md-8">
                                                            <textarea className="form-control" rows="3" name='remarks' {...register("remarks", {required: 'error message'})}></textarea>
                                                        </div>
                                                    </div>
                                                </fieldset>
                                            </div>
                                            <div className="col-md-6">
                                                <fieldset className="border p-2" >
                                                    <legend className="w-auto text-left">Output, QC and Remarks</legend>
                                                    <div className="form-row">
                                                        <div className="col-md-6 form-row">
                                                            <label className="col-md-5 col-form-label label-form">A. off Time</label>
                                                            <div className="col-md-7">
                                                                <input type="time" className="form-control" name="a_off_time" {...register("a_off_time", {required: 'error message'})} value={stateData.a_off_time ? stateData.a_off_time : ''}  onChange={onChangeHandler}/>
                                                            </div>

                                                            <label className="col-md-5 col-form-label label-form">Output Status</label>
                                                            <div className="col-md-7">
                                                                <select className="form-control" name='output_status' {...register("output_status", {required: 'error message'})} defaultValue={stateData.output_status ? stateData.output_status : ''} onChange={onChangeHandler}>
                                                                    <option>select one</option>
                                                                    <option value="1">Ok</option>
                                                                    <option value="0">Not Ok</option>
                                                                </select>
                                                            </div>

                                                            <label className="col-md-6 col-form-label label-form">Stylus Broken </label>
                                                            <div className="col-md-6">
                                                                <input type="checkbox" className="mt-2" name='stylus_broken' {...register("stylus_broken", {required: 'error message'})} defaultChecked={stateData.stylus_broken ? true : false} onChange={onChangeHandler}/>
                                                            </div>

                                                        </div>
                                                        <div className="col-md-6 form-row">
                                                            <label className="col-md-5 col-form-label label-form">Action</label>
                                                            <div className="col-md-7">
                                                                <input type="text" className="form-control" name="action" {...register("action", {required: 'error message'})} value={stateData.action ? stateData.action : ''} onChange={onChangeHandler}/>
                                                            </div>
                                                            
                                                            <label className="col-md-5 col-form-label label-form">A. Duration</label>
                                                            <div className="col-md-7">
                                                                <input type="text" placeholder="hh:mm" className="form-control" name="a_duration" {...register("a_duration", {required: 'error message'})} value={stateData.a_duration ? stateData.a_duration : ''} onChange={onChangeHandler}/>
                                                            </div>
                                                            
                                                            <label className="col-md-5 col-form-label label-form">Remarks</label>
                                                            <div className="col-md-7">
                                                                {/* <input type="text" className="form-control" name="cyls1" /> */}
                                                                <textarea className="form-control" rows="3" name="remarks" {...register("remarks", {required: 'error message'})} defaultValue={ stateData.remarks ? stateData.remarks : '' }></textarea>
                                                            </div>
                                                        </div>
                                                    </div>       
                                                </fieldset>
                                            </div>
                                        </div>

                                        <fieldset className="border p-2" >
                                            <legend className="w-auto text-left">Engraving</legend>

                                            <div className="form-row">
                                                <div className="col-md-6 row">
                                                    <label className="col-md-5 col-form-label label-form">Des. Machine</label>
                                                    <div className="col-md-7">
                                                        {/* <input type="text" className="form-control" name="des_machine" ref={register({})} value={stateData.des_machine ? stateData.des_machine : ''} onChange={onChangeHandler}/> */}
                                                        
                                                        <select className="form-control" name="des_machine" {...register("des_machine", {required: 'error message'})} value={stateData.des_machine ? stateData.des_machine : ''} onChange={onChangeHandler}>
                                                            <option>select one</option>
                                                            {
                                                                stateData.polishMachines.map((machine, key)=>(
                                                                    <option value={machine.id} key={key}>{machine.machine_name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                
                                                    <label className="col-md-5 col-form-label label-form">Engr. Date</label>
                                                    <div className="col-md-7">
                                                        <input type="date" className="form-control" name="engr_date" {...register("engr_date", {required: 'error message'})} value={stateData.engr_date ? stateData.engr_date : ''} onChange={onChangeHandler}/>
                                                    </div>
                                                
                                                    <label className="col-md-5 col-form-label label-form">Est, Duration</label>
                                                    <div className="col-md-7">
                                                        <input type="text" placeholder='hh:mm' className="form-control" name="est_duration" {...register("est_duration", {required: 'error message'})} value={stateData.est_duration ? stateData.est_duration : ''} onChange={onChangeHandler}/>
                                                    </div>
                                                    {/* <label className="col-form-label label-form pull-right">hh:mm</label> */}

                                                    <label className="col-md-5 col-form-label label-form">Shift</label>
                                                    <div className="col-md-7">
                                                        <input type="text" disabled='disabled' value={stateData.shiftData.shift_type == 1 ? 'Day' : stateData.shiftData.shift_type == 2 ? 'Evening' : 'Night'} className="form-control"/>

                                                        <input type="hidden" value={stateData.shiftData.shift_pk_id} className="form-control" name="shift_id" ref={register({ required: true })}/>
                                                    </div>
                                                </div>      

                                                <div className="col-md-6 row">
                                                    <label className="col-md-5 col-form-label label-form">Done by</label>
                                                    <div className="col-md-7">
                                                        <select className="form-control" name="done_by" {...register("done_by", {required: 'error message'})} defaultValue={stateData.done_by ? stateData.done_by : ''} onChange={onChangeHandler}>
                                                            <option>select one</option>
                                                            {
                                                                stateData.shiftDutyPersons.map((dutyPerson, key)=>(
                                                                    <option value={dutyPerson.employee_id} key={key}>{dutyPerson.employee_name}</option> //employee_id MEANS dig_employee_information.id and employee_name MEANS dig_employee_information.name 
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    
                                                    <label className="col-md-5 col-form-label label-form">A. Machine</label>
                                                    <div className="col-md-7">
                                                        <select className="form-control" name="a_machine" {...register("a_machine", {required: 'error message'})} value={stateData.a_machine ? stateData.a_machine : ''} onChange={onChangeHandler}>
                                                            <option>select one</option>
                                                            {
                                                                stateData.polishMachines.map((machine, key)=>(
                                                                    <option value={machine.id} key={key}>{machine.machine_name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                
                                                    <label className="col-md-5 col-form-label label-form">On Time</label>
                                                    <div className="col-md-7">
                                                        <input type="time" className="form-control" name="on_time" {...register("on_time", {required: 'error message'})} value={stateData.on_time ? stateData.on_time : ''} onChange={onChangeHandler}/>
                                                    </div>
                                                
                                                    <label className="col-md-5 col-form-label label-form">Est, End Time</label>
                                                    <div className="col-md-7">
                                                        <input type="time" className="form-control" name="est_end_time" {...register("est_end_time", {required: 'error message'})} value={stateData.est_end_time ? stateData.est_end_time : ''} onChange={onChangeHandler}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div className="col-md-3">
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
                                                                <td>{stateData.cylinder_id}</td>
                                                            </tr>
                                                            {/* <tr>
                                                                <td align="right">Cyl</td>
                                                                <td>:</td>
                                                                <td>fksdjflk</td>
                                                            </tr> */}
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
                                                            
                                                        </tbody>
                                                    </table>
                                                </div>
                                                
                                            </div>
                                        </pre>
                                    </div>
                                    <SubmitButton link="engraving/index" menuId={ menuId } />
                                </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Edit;