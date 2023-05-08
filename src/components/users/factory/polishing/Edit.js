import React, { Fragment, useEffect, useState, useReducer } from 'react';
import { POLISHING_RS_URL, POLISHING_GET_POLISHING_DATA_BY_JOB_ID } from '../../../../api/userUrl';
import { userGetMethod, userPutMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';
import { Typeahead } from 'react-bootstrap-typeahead';
import moment from 'moment';

const Edit = (props) => {
    const { handleSubmit, register, errors, reset } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [typeHeadOptions, setTypeHeadOptions] = useState({});
    const [dropDownData, setDropdownData] = useState();

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
            
            job_order_pk_id                  : '', 
            jobOrderDetailsData           : [], //STORE DATA FROM job_orders
            shiftData                     : [], //STORE DATA FROM dig_shift_master
            shiftDutyPersons              : [], //STORE DATA FROM dig_shift_details
            reworkReasons                 : [], //STORE DATA FROM rework_reasons
            cylindersByJobId              : [], //STORE DATA FROM factory_cylinder_supply_chains
            completePolishingData         : [], //STORE DATA FROM dig_polishings
            platingData                   : [],
            available_cylinders           : [],
            polishMachines                : [],
        }
    );
    let digPolishingCylinderId = props.match.params.dig_polishing_cylinder_id ? props.match.params.dig_polishing_cylinder_id : null;
    
    useEffect(()=>{
        userGetMethod(`${POLISHING_RS_URL}/${digPolishingCylinderId}/edit`)
            .then(response => {
                // FOR JOB ORDER
                dropDownChange([{id : response.data.jobOrder.job_id}], 'job_order_pk_id');
                let {polishing, polishMachines, digShift, shiftDutyPersons, reworkReasons} = response.data;
                
                setStateData({
                    'job_no'                        : response.data.jobOrder.job_no,

                    'job_order_pk_id'               : polishing.job_order_pk_id,
                    'cylinder_id'                   : polishing.cylinder_id,
                    'rough_cut_polishing_machine_id': polishing.rough_cut_polishing_machine_id,
                    'shift_id'                      : polishing.shift_id,
                    'fine_cut_polishing_machine_id' : polishing.fine_cut_polishing_machine_id,
                    'est_duration'                  : polishing.est_duration,
                    'on_time'                       : polishing.on_time,
                    'est_end_time'                  : polishing.est_end_time,
                    'polishing_date'                : polishing.polishing_date,
                    'rework'                        : polishing.rework,
                    'rework_reason'                 : polishing.rework_reason,
                    'production_date'               : polishing.production_date,
                    'done_by'                       : polishing.done_by,
                    'chrome_cylinder_status'        : polishing.chrome_cylinder_status,
                    'a_duration'                    : polishing.a_duration,
                    'dia_after_rough_cut'           : polishing.dia_after_rough_cut,
                    'output_status'                 : polishing.output_status,
                    'dia_after_fine_cut'            : polishing.dia_after_fine_cut,
                    'action_if_output_is_not_ok'    : polishing.action_if_output_is_not_ok,
                    'a_off_time'                    : polishing.a_off_time,
                    'remarks'                       : polishing.remarks,
                    
                    'polishMachines'                : polishMachines,
                    'shiftData'                     : digShift, //GET DATA FROM dig_shift_master table
                    'shiftDutyPersons'              : shiftDutyPersons, //GET DATA FROM dig_shift_details table
                    'reworkReasons'                 : reworkReasons, //GET DATA FROM rework_reasons table
                });

                setIsLoading(false);
            });
    }, []);

    const onChangeHandler = (event) => {
        setStateData({[event.target.name]: event.target.value});
    }

    useEffect(() => {
        if(stateData?.on_time != '' && stateData?.est_duration != '' ){
            let inputDate = moment(stateData?.on_time,"HH:mm").format("HH:mm:ss");
            var t1 =new Date (moment(inputDate, 'HH:mm:ss').toString());
            let est_inputDate = moment(stateData?.est_duration,"HH:mm").format("HH:mm:ss");
           
            var t2 =new Date (moment(est_inputDate, 'HH:mm:ss').toString());

            t1.setHours((t1.getHours() + t2.getHours()));
            t1.setMinutes((t1.getMinutes() + (t2.getMinutes())));

            // console.log(moment(t1).format("HH:mm:ss"));
            setStateData({"est_end_time": moment(t1).format("HH:mm:ss")})
        }

    },[stateData?.on_time,stateData?.est_duration]);

    const dropDownChange = (e, fieldName) => {
        if(e.length > 0){
            const selectedValueId = e[0].id; //job_orders.job_order_pk_id
            setDropdownData(
                (prevstate) => ({
                    ...prevstate,
                    [fieldName]: selectedValueId,
                })
            );

            userGetMethod(`${POLISHING_GET_POLISHING_DATA_BY_JOB_ID}?jobOrderId=${selectedValueId}`)
                .then(response => {
                    let { jobOrderDetails, cylindersByJobId, platingData, completePolishingData} = response.data;
                    setStateData({
                        'jobOrderDetailsData'  : jobOrderDetails, //CYLINDER DATA FROM 'job_orders' TABLE
                        'cylindersByJobId'     : cylindersByJobId, //CYLINDER DATA FROM 'factory_cylinder_supply_chains' TABLE
                        'platingData'          : platingData, //PLATING DATA FROM 'plating_tank_schedule_details' TABLE
                        'completePolishingData': completePolishingData //PLATING DATA FROM 'plating_tank_schedule_details' TABLE
                    });
                });
        }
    }

    const cylinderOnChange = (e)=>{
        let cylId = e.target.value;
        setStateData({
            'selectCylinderId' : digPolishingCylinderId != null ? digPolishingCylinderId : e.target.value
        });

        // stateData.cylindersByJobId.map((cylinder, key)=>{
        //     if(stateData.cylindersByJobId[key]['id'] == cylId){
        //     }
        // })
    }
    
    const submitHandler = (data,e) => {
        userPutMethod(`${POLISHING_RS_URL}/${digPolishingCylinderId}`, data)
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
                                <form onSubmit={handleSubmit(submitHandler)} className="theme-form row">
                                    <div className="col-md-8">
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
                                                    {/* <select className="form-control" name="factory_cyl_sup_id" onChange={cylinderOnChange} ref={register({
                                                        required: 'Cylinder Id Field Required'
                                                    })} value={digPolishingCylinderId} disabled={digPolishingCylinderId != null ? 'disabled' : ''}>
                                                        <option>select one</option>
                                                        {
                                                            stateData.cylindersByJobId.map((data, key)=>(
                                                                <option value={data.cylinder_id} key={key}>{data.cylinder_id}</option>
                                                            ))
                                                        }
                                                    </select> */}
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

                                        <fieldset className="border p-2" >
                                            <legend className="w-auto text-left">Polishing</legend>
                                            
                                            <div className="form-row">
                                                <div className="col-md-6 row">
                                                    <label className="col-md-5 col-form-label label-form">Machine Rough Cut</label>
                                                    <div className="col-md-7">
                                                        <select className="form-control" name="rough_cut_polishing_machine_id" ref={register({
                                                            required: 'Machine Rough Cut Field Required'
                                                        })} value={stateData.rough_cut_polishing_machine_id ? stateData.rough_cut_polishing_machine_id : ''} onChange={onChangeHandler}>
                                                            <option>select one</option>
                                                            {
                                                                stateData.polishMachines.map((machine, key)=>(
                                                                    <option value={machine.id} key={key}>{machine.machine_name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                
                                                    <label className="col-md-5 col-form-label label-form">Machine Fine Cut</label>
                                                    <div className="col-md-7">
                                                        <select className="form-control" name="fine_cut_polishing_machine_id" ref={register({ 
                                                            required: true 
                                                        })} value={stateData.fine_cut_polishing_machine_id ? stateData.fine_cut_polishing_machine_id : ''} onChange={onChangeHandler}>
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
                                                        <input 
                                                            type="time" 
                                                            className="form-control" 
                                                            name="on_time" 
                                                            ref={register({
                                                                required: 'On Time Field Required'
                                                            })}
                                                            value={stateData.on_time ? stateData.on_time : ''}
                                                            onChange={onChangeHandler}
                                                        />
                                                    </div>
                                                
                                                    <label className="col-md-5 col-form-label label-form">Polishing Date</label>
                                                    <div className="col-md-7">
                                                        <input 
                                                            type="date" 
                                                            className="form-control" 
                                                            name="polishing_date" 
                                                            ref={register({required: true })}
                                                            value={stateData.polishing_date ? stateData.polishing_date : ''}
                                                            onChange={onChangeHandler}
                                                        />
                                                    </div>
                                                
                                                    <label className="col-md-5 col-form-label label-form">Production Date</label>
                                                    <div className="col-md-7">
                                                        <input type="date" className="form-control" name="production_date" ref={register({ required: true })} value={stateData.production_date ? stateData.production_date : ''} onChange={onChangeHandler}/>
                                                    </div>
                                                </div>      

                                                <div className="col-md-6 row">
                                                    <label className="col-md-5 col-form-label label-form">Shift</label>
                                                    <div className="col-md-7">
                                                        <input type="text" disabled='disabled' value={stateData.shiftData.shift_type == 1 ? 'Day' : stateData.shiftData.shift_type == 2 ? 'Evening' : 'Night'} className="form-control"/>

                                                        <input type="hidden" value={stateData.shiftData.shift_pk_id} className="form-control" name="shift_id" ref={register({ required: true })}/>
                                                    </div>
                                                
                                                    <label className="col-md-5 col-form-label label-form">Est, Duration</label>
                                                    <div className="col-md-7">
                                                        <input type="text" placeholder='hh:mm' className="form-control" name="est_duration" ref={register({ required: true })} value={stateData.est_duration ? stateData.est_duration : ''} onChange={onChangeHandler}/>
                                                    </div>
                                                    {/* <label className="col-form-label label-form pull-right">hh:mm</label> */}
                                                
                                                    <label className="col-md-5 col-form-label label-form">Est, End Time</label>
                                                    <div className="col-md-7">
                                                        <input type="time" className="form-control" name="est_end_time" ref={register({ required: true })} value={stateData.est_end_time ? stateData.est_end_time : ''} onChange={onChangeHandler}/>
                                                    </div>
                                                
                                                </div>
                                            </div>
                                        </fieldset>

                                        <fieldset className="border p-2" >
                                            <legend className="w-auto text-left">Output, QC and Remarks</legend>
                                            <div className="form-row">
                                                <div className="col-md-6 row">
                                                    <label className="col-md-5 col-form-label label-form">Chrome Cylinder? </label>
                                                    <div className="col-md-7">
                                                        <input type="checkbox" className="mt-2" name="chrome_cylinder_status" {...register("chrome_cylinder_status", { required: "Please enter your first name." })}  onChange={onChangeHandler} />
                                                    </div>
                                                    
                                                    <label className="col-md-5 col-form-label label-form"> Dia after Rough Cut</label>
                                                    <div className="col-md-7">
                                                        <input type="text" className="form-control" name="dia_after_rough_cut" ref={register({ required: true })} value={stateData.dia_after_rough_cut ? stateData.dia_after_rough_cut : ''} onChange={onChangeHandler} />
                                                    </div>
                                                
                                                    <label className="col-md-5 col-form-label label-form">Dia after Fine Cut</label>
                                                    <div className="col-md-7">
                                                        <input type="text" className="form-control" name="dia_after_fine_cut" ref={register({ required: true })} value={stateData.dia_after_fine_cut ? stateData.dia_after_fine_cut : ''} onChange={onChangeHandler} />
                                                    </div>
                                                
                                                    <label className="col-md-5 col-form-label label-form">A. off Time</label>
                                                    <div className="col-md-7">
                                                        <input type="time" className="form-control" name="a_off_time" ref={register({})} value={stateData.a_off_time ? stateData.a_off_time : ''} onChange={onChangeHandler} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 row">
                                                    <label className="col-md-5 col-form-label label-form">A. Duration</label>
                                                    <div className="col-md-7">
                                                        <input type="text"  placeholder="hh:mm" className="form-control" name="a_duration" ref={register({})} value={stateData.a_duration ? stateData.a_duration : ''} onChange={onChangeHandler} />
                                                    </div>
                                                    {/* <label className="col-form-label label-form pull-right">hh:mm</label> */}
                                                    
                                                    <label className="col-md-5 col-form-label label-form">Output Status</label>
                                                    <div className="col-md-7">
                                                        <select className="form-control" name="output_status" ref={register({})} defaultValue={stateData.output_status ? stateData.output_status : ''} onChange={onChangeHandler}>
                                                            <option>select one</option>
                                                            <option value="1">Ok</option>
                                                            <option value="0">Not Ok</option>
                                                        </select>
                                                    </div>
                                                    
                                                    <label className="col-md-5 col-form-label label-form">Action if output is not OK</label>
                                                    <div className="col-md-7">
                                                        <input type="text" className="form-control" name="action_if_output_is_not_ok" ref={register({})} value={stateData.action_if_output_is_not_ok ? stateData.action_if_output_is_not_ok : ''} onChange={onChangeHandler}/>
                                                    </div>
                                                    
                                                    <label className="col-md-5 col-form-label label-form">Remarks</label>
                                                    <div className="col-md-7">
                                                        <input type="text" className="form-control" name="remarks" ref={register({})} value={stateData.remarks ? stateData.remarks : ''} onChange={onChangeHandler}/>
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
                                                                <td>{stateData.cylinder_id}</td>
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
                                                            <tr>
                                                                <td align="right">Cylinder Type</td>
                                                                <td>:</td>
                                                                <td>{stateData.rework == 1 ? <span className="text-danger"> Rework </span> : 'New'}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                
                                            </div>
                                        </pre>
                                    </div>
                                    <SubmitButton link="polishing/index" menuId={ menuId } />
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Edit;