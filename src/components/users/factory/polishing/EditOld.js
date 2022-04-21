import React, { Fragment, useEffect, useState, useReducer } from 'react';
import { POLISHING_RS_URL, POLISHING_GET_POLISHING_DATA_BY_JOB_ID } from '../../../../api/userUrl';
import { userGetMethod, userPutMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';
import { Typeahead } from 'react-bootstrap-typeahead';

const Edit = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [dropDownData, setDropdownData] = useState();

    const [stateData, setStateData] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            a_duration                    : '',
            a_off_time                    : '',
            action_if_output_is_not_ok    : '',
            chrome_cylinder_status        : '',
            factory_cyl_sup_id            : '',
            dia_after_fine_cut            : '',
            dia_after_rough_cut           : '',
            done_by                       : '',
            est_duration                  : '',
            est_end_time                  : '',
            fine_cut_polishing_machine_id : '',
            on_time                       : '',
            output_status                 : '',
            polishing_date                : '',
            production_date               : '',
            remarks                       : '',
            rework                        : '',
            rework_reason                 : '',
            rough_cut_polishing_machine_id: '',
            shift_id                      : '',
            job_order                     : [],

            jobOrderDetailsData  : [], //STORE DATA FROM job_orders
            shiftData            : [], //STORE DATA FROM dig_shift_master
            shiftDutyPersons     : [], //STORE DATA FROM dig_shift_details
            reworkReasons        : [], //STORE DATA FROM rework_reasons
            cylindersByJobId     : [], //STORE DATA FROM factory_cylinder_supply_chains
            completePolishingData: [], //STORE DATA FROM dig_polishings
            platingData          : [],
            available_cylinders  : [],
            polishMachines       : [],
            

            isLoading: true
        }
    );

    var menuId = 0;
    if (props.location.state === undefined) {
        var menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }

    const polishingId = props.match.params.polishingId;

    const changeHandler = (event) => {
        setStateData({[event.target.name]: event.target.value});
    }

    useEffect(() => {
        userGetMethod(`${POLISHING_RS_URL}/${polishingId}/edit`)
            .then(response => {
                let {polishing, jobOrder}=response.data;
                console.log(jobOrder.id);
                let jobOrderOptions = [];
                if (jobOrder && jobOrder.length > 0) {
                    let jobOrderObj = {};
                    jobOrderObj.id = jobOrder.id;
                    jobOrderObj.name = jobOrder.job_no;
                    jobOrderOptions.push(jobOrderObj);
                }
                console.log({jobOrderOptions});
                setStateData({
                    'a_duration'                    : polishing.a_duration,
                    'a_off_time'                    : polishing.a_off_time,
                    'action_if_output_is_not_ok'    : polishing.action_if_output_is_not_ok,
                    'chrome_cylinder_status'        : polishing.chrome_cylinder_status,
                    'factory_cyl_sup_id'            : polishing.factory_cyl_sup_id,
                    'dia_after_fine_cut'            : polishing.dia_after_fine_cut,
                    'dia_after_rough_cut'           : polishing.dia_after_rough_cut,
                    'done_by'                       : polishing.done_by,
                    'est_duration'                  : polishing.est_duration,
                    'est_end_time'                  : polishing.est_end_time,
                    'fine_cut_polishing_machine_id' : polishing.fine_cut_polishing_machine_id,
                    'on_time'                       : polishing.on_time,
                    'output_status'                 : polishing.output_status,
                    'polishing_date'                : polishing.polishing_date,
                    'production_date'               : polishing.production_date,
                    'remarks'                       : polishing.remarks,
                    'rework'                        : polishing.rework,
                    'rework_reason'                 : polishing.rework_reason,
                    'rough_cut_polishing_machine_id': polishing.rough_cut_polishing_machine_id,
                    'shift_id'                      : polishing.shift_id,
                    'job_order'                     : jobOrderOptions,
                    
                    isLoading: false
                });
            })
            .catch(error => console.log(error))   
    },[]);

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
                    console.log('POLISHING_GET_POLISHING_DATA_BY_JOB_ID', response.data);
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
        stateData.cylindersByJobId.map((cylinder, key)=>{
            if(stateData.cylindersByJobId[key]['id'] == cylId){
                setStateData({
                    'selectCylinderId' : stateData.cylindersByJobId[key]['cylinder_id']
                })
            }
        })
    }

    const submitHandler = (e) => {
        let response = userPutMethod(`${POLISHING_RS_URL}/${polishingId}`, stateData )
            .then(response => {
                if (response.data.status == 1) {
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            })
            .catch(error => toast.error(error))
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
                            {stateData.isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
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
                                                        options={stateData['job_order']}
                                                        placeholder="Select Job No..."
                                                        onChange={(e) => dropDownChange(e, 'job_order_pk_id')}
                                                        // selected={designToFactoryInput.job_order_pk_id}
                                                        // disabled={job_order_pk_id != null ? 'disabled' : ''}
                                                        ref={register({
                                                            required: 'Job No Field Required'
                                                        })}
                                                    />
                                                </div>

                                                <label className="col-md-3 col-form-label label-form required ">Cylinder Id</label>
                                                <div className="col-md-9">
                                                    <select className="form-control" name="factory_cyl_sup_id" onChange={cylinderOnChange} ref={register({
                                                        required: 'Cylinder Id Field Required'
                                                    })}>
                                                        <option>select one</option>
                                                        {
                                                            stateData.cylindersByJobId.map((data, key)=>(
                                                                <option value={data.id} key={key}>{data.cylinder_id}</option>
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
                                                        <select className="form-control" name="rough_cut_polishing_machine_id" ref={register({
                                                            required: 'Machine Rough Cut Field Required'
                                                        })}>
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
                                                        })}>
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
                                                            type="text" 
                                                            className="form-control" 
                                                            name="on_time" 
                                                            ref={register({
                                                                required: 'On Time Field Required'
                                                            })}
                                                        />
                                                    </div>
                                                
                                                    <label className="col-md-5 col-form-label label-form">Polishing Date</label>
                                                    <div className="col-md-7">
                                                        <input 
                                                            type="date" 
                                                            className="form-control" 
                                                            name="polishing_date" 
                                                            ref={register({required: true })}
                                                        />
                                                    </div>
                                                
                                                    <label className="col-md-5 col-form-label label-form">Production Date</label>
                                                    <div className="col-md-7">
                                                        <input type="date" className="form-control" name="production_date" ref={register({ required: true })}/>
                                                    </div>
                                                </div>      

                                                <div className="col-md-6 row">
                                                    <label className="col-md-5 col-form-label label-form">Shift</label>
                                                    <div className="col-md-7">
                                                        <input type="text" disabled='disabled' value={stateData.shiftData.shift_type == 1 ? 'Day' : stateData.shiftData.shift_type == 2 ? 'Evening' : 'Night'} className="form-control"/>

                                                        <input type="hidden" value={stateData.shiftData.shift_pk_id} className="form-control" name="shift_id" ref={register({ required: true })}/>
                                                    </div>
                                                
                                                    <label className="col-md-5 col-form-label label-form">Est, Duration</label>
                                                    <div className="col-md-5">
                                                        <input type="time" className="form-control" name="est_duration" ref={register({ required: true })} />
                                                    </div>
                                                    <label className="col-form-label label-form pull-right">hh:mm</label>
                                                
                                                    <label className="col-md-5 col-form-label label-form">Est, End Time</label>
                                                    <div className="col-md-7">
                                                        <input type="text" className="form-control" name="est_end_time" ref={register({ required: true })} />
                                                    </div>
                                                
                                                    <label className="col-md-5 col-form-label label-form">Rework </label>
                                                    <div className="col-md-7">
                                                        <input type="checkbox" className="mt-2" name="rework" ref={register({})} />
                                                    </div>

                                                    <label className="col-md-5 col-form-label label-form">Rework reason </label>
                                                    <div className="col-md-7">
                                                        <select className="form-control" name="rework_reason" ref={register({})}>
                                                            <option>select one</option>
                                                            {
                                                                stateData.reworkReasons.map((rework, key)=>(
                                                                    <option value={rework.id} key={key}>{rework.reason}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                
                                                    <label className="col-md-5 col-form-label label-form">Done by</label>
                                                    <div className="col-md-7">
                                                        <select className="form-control" name="done_by" ref={register({})}>
                                                            <option>select one</option>
                                                            {
                                                                stateData.shiftDutyPersons.map((dutyPerson, key)=>(
                                                                    <option value={dutyPerson.employee_id} key={key}>{dutyPerson.employee_name}</option> //employee_id MEANS dig_employee_information.id and employee_name MEANS dig_employee_information.name 
                                                                ))
                                                            }
                                                        </select>
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
                                                        <input type="checkbox" className="mt-2" name="chrome_cylinder_status" ref={register({})} />
                                                    </div>
                                                    
                                                    <label className="col-md-5 col-form-label label-form"> Dia after Rough Cut</label>
                                                    <div className="col-md-7">
                                                        <input type="text" className="form-control" name="dia_after_rough_cut" ref={register({ required: true })} />
                                                    </div>
                                                
                                                    <label className="col-md-5 col-form-label label-form">Dia after Fine Cut</label>
                                                    <div className="col-md-7">
                                                        <input type="text" className="form-control" name="dia_after_fine_cut" ref={register({ required: true })} />
                                                    </div>
                                                
                                                    <label className="col-md-5 col-form-label label-form">A. off Time</label>
                                                    <div className="col-md-7">
                                                        <input type="text" className="form-control" name="a_off_time" ref={register({})} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 row">
                                                    <label className="col-md-5 col-form-label label-form">A. Duration</label>
                                                    <div className="col-md-5">
                                                        <input type="time" className="form-control" name="a_duration" ref={register({})} />
                                                    </div>
                                                    <label className="col-form-label label-form pull-right">hh:mm</label>
                                                    
                                                    <label className="col-md-5 col-form-label label-form">Output Status</label>
                                                    <div className="col-md-7">
                                                        <select className="form-control" name="output_status" ref={register({})}>
                                                            <option>select one</option>
                                                            <option value="1">Ok</option>
                                                            <option value="0">Not Ok</option>
                                                        </select>
                                                    </div>
                                                    
                                                    <label className="col-md-5 col-form-label label-form">Action if output is not OK</label>
                                                    <div className="col-md-7">
                                                        <input type="text" className="form-control" name="action_if_output_is_not_ok" ref={register({})} />
                                                    </div>
                                                    
                                                    <label className="col-md-5 col-form-label label-form">Remarks</label>
                                                    <div className="col-md-7">
                                                        <input type="text" className="form-control" name="remarks" ref={register({})} />
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
                                                        stateData.platingData.length > 0 ? 
                                                            stateData.platingData.map((plating, key)=>(        
                                                                <tr>
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
                                                stateData.completePolishingData.length > 0 ? 
                                                    stateData.completePolishingData.map((polishingData, key)=>(
                                                        <tr>
                                                            <td>{polishingData.factory_cyl_sup_id}</td>
                                                            <td>{polishingData.dia_after_rough_cut}</td>
                                                            <td>{polishingData.dia_after_fine_cut}</td>
                                                            <td>{polishingData.rough_cut_polishing_machine_id}</td>
                                                            <td>{polishingData.fine_cut_polishing_machine_id}</td>
                                                            <td>{polishingData.polishing_date}</td>
                                                            <td>{polishingData.shift_type == 1 ? "Day" : (polishingData.shift_type == 2 ? "Evening" : "Night")}</td>
                                                            <td>{polishingData.output_status == 1 ? 'Ok' : "Not Ok" }</td>
                                                            <td></td>
                                                            <td>{polishingData.rework == 1 ? "Yes" : "No"}</td>
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

export default Edit;