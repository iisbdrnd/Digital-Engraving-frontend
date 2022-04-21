import React, { Fragment, useEffect, useState, useReducer } from 'react';
import { ENGRAVING_RS_URL, GET_ENGRAVING_DATA_BY_JOB_ID } from '../../../../api/userUrl';
import { userGetMethod, userPutMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';
import { Typeahead } from 'react-bootstrap-typeahead';

const Add = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [typeHeadOptions, setTypeHeadOptions] = useState({});
    const [dropDownData, setDropdownData] = useState();

    let [stateData, setStateData] = useReducer((state, newState) => ({...state, ...newState}),
        {
            job_order_pk_id    : '', 
            cylinder_id        : '', 
            jobOrderDetails    : [], //STORE DATA FROM job_orders
            shiftData          : [], //STORE DATA FROM dig_shift_master
            shiftDutyPersons   : [], //STORE DATA FROM dig_shift_details
            cylindersByJobId   : [], //STORE DATA FROM factory_cylinder_supply_chains
            completeEngraveData: [], //STORE DATA FROM dig_engravings
            platingData        : [],
            available_cylinders: [],
            polishMachines     : [],
            engraves           : [],
        }
    );

    useEffect(()=>{
        userGetMethod(`${ENGRAVING_RS_URL}/create`)
            .then(response => {
                console.log('response', response.data);
                // FOR JOB ORDER
                let jobOrderOptions = [];
                if (response.data.engraveJobs && response.data.engraveJobs.length > 0) {
                    response.data.engraveJobs.map(job => 
                    {
                        let jobOrderObj = {};
                        jobOrderObj.id = job.job_order_pk_id;
                        jobOrderObj.name = job.job_order_job_no;
                        jobOrderOptions.push(jobOrderObj);
                    })
                }
                let {polishMachines, digShift, shiftDutyPersons} = response.data;
                setStateData({
                    'polishMachines'                : polishMachines,
                    'shiftData'                     : digShift, //GET DATA FROM dig_shift_master table
                    'shiftDutyPersons'              : shiftDutyPersons, //GET DATA FROM dig_shift_details table
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

    const dropDownChange = (e, fieldName) => {
        console.log('e', e);
        if(e.length > 0){
            const selectedValueId = e[0].id;
            
            setDropdownData(
                (prevstate) => ({
                    ...prevstate,
                    [fieldName]: selectedValueId,
                })
            );

            userGetMethod(`${GET_ENGRAVING_DATA_BY_JOB_ID}?jobOrderPkId=${selectedValueId}`)
                .then(response => {
                    console.log('GET_ENGRAVING_DATA_BY_JOB_ID', response.data);
                    let { engraves, jobOrderDetails } = response.data;
                    setStateData({
                        'engraves'       : engraves,
                        'jobOrderDetails': jobOrderDetails,
                    });
                });
        }
    }

    const submitHandler = (data) => {
        console.log('dropDownData', dropDownData);
        data.job_order_pk_id = dropDownData.job_order_pk_id;
        userPutMethod(`${ENGRAVING_RS_URL}/${stateData.cylinder_id}`, data)
            .then(response => {
                if (response.data.status == 1) {
                    toast.success(response.data.message)
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
                                                    <Typeahead
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
                                                    />
                                                    <input type="hidden" name="job_no" value={stateData.jobOrderDetails.job_no ? stateData.jobOrderDetails.job_no : ''} ref={register({})} />
                                                </div>

                                                <label className="col-md-3 col-form-label label-form required ">Cylinder Id</label>
                                                <div className="col-md-9">
                                                    <select className="form-control" name='cylinder_id' onChange={(e)=>setStateData({'cylinder_id': e.target.value})} ref={register({required: true })}>
                                                        <option value="">select one</option>
                                                        {
                                                            stateData.engraves.length > 0 ? (
                                                                stateData.engraves.map((engrave, key)=>(
                                                                    engrave.running_status == 1 ? (
                                                                        <option key={key} value={engrave.cylinder_id}>{engrave.cylinder_id}</option>
                                                                    ) : ''
                                                                ))
                                                            )
                                                            : ''
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </fieldset>

                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <fieldset className="border p-2">
                                                    <legend className="w-auto text-left">Layout</legend>

                                                    <div className="form-row">
                                                        <label className="col-sm-3 col-form-label">Layout Id</label>
                                                        <div className="col-md-8">
                                                            <input type="text" className="form-control" name="layout_id" />
                                                        </div>
                                                        <div className="col-md-6 form-row">
                                                            <label className="col-md-5 col-form-label label-form ">Color Sl</label>
                                                            <div className="col-md-7">
                                                                <input type="text" className="form-control" name="color_sl" />
                                                            </div>

                                                            <label className="col-md-5 col-form-label label-form ">Screen</label>
                                                            <div className="col-md-7">
                                                                <input type="text" className="form-control" name="screen" />
                                                            </div>

                                                            <label className="col-md-5 col-form-label label-form  ">Start Point</label>
                                                            <div className="col-md-7">
                                                                <input type="text" className="form-control" name="start_point" />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6 form-row">
                                                            <label className="col-md-5 col-form-label label-form ">Color</label>
                                                            <div className="col-md-7">
                                                                <input type="text" className="form-control" name="color" />
                                                            </div>

                                                            <label className="col-md-5 col-form-label label-form ">Angle</label>
                                                            <div className="col-md-7">
                                                                <input type="text" className="form-control" name="angle" />
                                                            </div>

                                                            <label className="col-md-5 col-form-label label-form  ">Image Area</label>
                                                            <div className="col-md-7">
                                                                <input type="text" className="form-control" name="image_area" />
                                                            </div>
                                                        </div>

                                                        <label className="col-md-3 col-form-label label-form">Remarks</label>
                                                        <div className="col-md-8">
                                                            <textarea className="form-control" rows="3" name='remarks'></textarea>
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
                                                                <input type="text" className="form-control" name="a_off_time" ref={register({})}/>
                                                            </div>

                                                            <label className="col-md-5 col-form-label label-form">Output Status</label>
                                                            <div className="col-md-7">
                                                                <select className="form-control" name='output_status' ref={register({})}>
                                                                    <option>select one</option>
                                                                    <option value="1">Ok</option>
                                                                    <option value="0">Not Ok</option>
                                                                </select>
                                                            </div>

                                                            <label className="col-md-6 col-form-label label-form">Stylus Broken </label>
                                                            <div className="col-md-6">
                                                                <input type="checkbox" className="mt-2" name='stylus_broken' ref={register({})}/>
                                                            </div>

                                                        </div>
                                                        <div className="col-md-6 form-row">
                                                            <label className="col-md-5 col-form-label label-form">Action</label>
                                                            <div className="col-md-7">
                                                                <input type="text" className="form-control" name="action" ref={register({})} />
                                                            </div>
                                                            
                                                            <label className="col-md-5 col-form-label label-form">A. Duration</label>
                                                            <div className="col-md-7">
                                                                <input type="time" className="form-control" name="a_duration" ref={register({})} />
                                                            </div>
                                                            
                                                            <label className="col-md-5 col-form-label label-form">Remarks</label>
                                                            <div className="col-md-7">
                                                                {/* <input type="text" className="form-control" name="cyls1" /> */}
                                                                <textarea className="form-control" rows="3" name="remarks" ref={register({})} ></textarea>
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
                                                        <select className="form-control" name="des_machine" ref={register({})} >
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
                                                        <input type="text" className="form-control" name="engr_date" ref={register({})} />
                                                    </div>
                                                
                                                    <label className="col-md-5 col-form-label label-form">Est, Duration</label>
                                                    <div className="col-md-5">
                                                        <input type="time" className="form-control" name="est_duration" ref={register({})}  />
                                                    </div>
                                                    <label className="col-form-label label-form pull-right">hh:mm</label>

                                                    <label className="col-md-5 col-form-label label-form">Shift</label>
                                                    <div className="col-md-7">
                                                        <input type="text" disabled='disabled' value={stateData.shiftData.shift_type == 1 ? 'Day' : stateData.shiftData.shift_type == 2 ? 'Evening' : 'Night'} className="form-control"/>

                                                        <input type="hidden" value={stateData.shiftData.shift_pk_id} className="form-control" name="shift_id" ref={register({ required: true })}/>
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

                                                <div className="col-md-6 row">
                                                    <label className="col-md-5 col-form-label label-form">A. Machine</label>
                                                    <div className="col-md-7">
                                                        <select className="form-control" name="a_machine" ref={register({})}>
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
                                                        <input type="time" className="form-control" name="on_time" ref={register({})} />
                                                    </div>
                                                
                                                    <label className="col-md-5 col-form-label label-form">Est, End Time</label>
                                                    <div className="col-md-7">
                                                        <input type="text" className="form-control" name="est_end_time" ref={register({})} />
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
                                                                <td width="50%">{stateData.jobOrderDetails.job_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right">Job Type</td>
                                                                <td>:</td>
                                                                <td>{stateData.jobOrderDetails.job_type}</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right">Cylinder Id</td>
                                                                <td>:</td>
                                                                <td>{stateData.cylinder_id}</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right">FL</td>
                                                                <td>:</td>
                                                                <td>{stateData.jobOrderDetails.fl}</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right">Cir</td>
                                                                <td>:</td>
                                                                <td>{stateData.jobOrderDetails.cir}</td>
                                                            </tr>
                                                            {/* <tr>
                                                                <td align="right">A.Dia</td>
                                                                <td>:</td>
                                                                <td>{stateData.jobOrderDetails}</td>
                                                            </tr> */}
                                                            <tr>
                                                                <td align="right">S. Area</td>
                                                                <td>:</td>
                                                                <td>{stateData.jobOrderDetails.surface_area}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </pre>
                                    </div>
                                    <SubmitButton link="engraving/index" menuId={ menuId } />
                                </form>
                                <fieldset className="border p-2" >
                                    <legend className="w-auto text-left">Polishing for this Job No./BCO</legend>

                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Cyl SL</th>
                                                {/* <th>Cl. Sl</th> */}
                                                <th>Color</th>
                                                <th>Scr.</th>
                                                <th>Ang.</th>
                                                <th>Des. Mach.</th>
                                                <th>Date Eng.</th>
                                                <th>Shift</th>
                                                <th>Output Status</th>
                                                <th>Operator</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                stateData.engraves.length > 0 ? stateData.engraves.map((cylinder, key) => (
                                                    <tr key={key}>
                                                        <td>{cylinder.cylinder_id}</td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td>{cylinder.des_machine}</td>
                                                        <td>{cylinder.engr_date}</td>
                                                        <td>{cylinder.shift_id}</td>
                                                        <td>{cylinder.output_status == 1 ? "Ok" : "Not Ok"}</td>
                                                        <td>{cylinder.done_by}</td>
                                                    </tr>
                                                ))
                                                :(
                                                    <tr>
                                                        <td colSpan={10} align="center">No Data Found</td>
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