import React, { Fragment, useEffect, useState, useReducer } from 'react';
import { QUALITY_CONTROL_RS_URL, POLISHING_GET_POLISHING_DATA_BY_JOB_ID } from '../../../../api/userUrl';
import { userGetMethod, userPutMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';

const Edit = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [cylinderInfo, setCylinderInfo] = useState([]);

    let [stateData, setStateData] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            // send_date         : new Date().toLocaleDateString(),
            
            // job_order_id                  : '',
            // cylinder_id                   : '',
            // //Output, QC and Remarks
            // a_off_time                    : '',
            // output_status                 : '',
            // stylus_broken                 : '',
            // action                        : '',
            // a_duration                    : '',
            // remarks                       : '',
            // //ENGRAVING
            // des_machine                   : '',
            // engr_date                     : '',
            // est_duration                  : '',
            // shift_id                      : '',
            // done_by                       : '',
            // a_machine                     : '',
            // on_time                       : '',
            // est_end_time                  : '',
            // rework                        : '',
            // rework_reason                 : '',

            // job_order_pk_id               : '', 
            // jobOrderDetailsData           : [], //STORE DATA FROM job_orders
            // shiftData                     : [], //STORE DATA FROM dig_shift_master
            // shiftDutyPersons              : [], //STORE DATA FROM dig_shift_details
            // reworkReasons                 : [], //STORE DATA FROM rework_reasons
            // cylindersByJobId              : [], //STORE DATA FROM factory_cylinder_supply_chains
            // completeEngraveData           : [], //STORE DATA FROM dig_engravings
            // platingData                   : [],
            // available_cylinders           : [],
            // polishMachines                : [],

            singleJobData                 : [],
            cylinders                     : [],
            cylinder_length               : 0,
            complete_status               : "",
        }
    );
    let jobOrderPkId = props.match.params.job_order_pk_id ? props.match.params.job_order_pk_id : null;
    
    useEffect(()=>{
        userGetMethod(`${QUALITY_CONTROL_RS_URL}/${jobOrderPkId}/edit`)
            .then(response => {
                // dropDownChange([{id : response.data.jobOrder.job_id}], 'job_order_pk_id');
                let {singleJobData, cylinders,cylinderLength} = response.data.original;
                
                setStateData({
                    'singleJobData': singleJobData, // GET DATA FROM job_orders table
                    'cylinders'    : cylinders, 
                    'cylinder_length' : cylinderLength
                    // GET DATA FROM factory_cylinder_supply_chains table
                });

                setIsLoading(false);
            });
    }, []);
    if (cylinderInfo.length < stateData.cylinder_length) {
        for (var i = 0; i < stateData.cylinder_length; i++) {
            var cylinder_obj = {
                cylinder_id: stateData.cylinders.cylinder_id[i],
                remark: stateData.cylinders.rework_remarks[i],
                status: stateData.cylinders.rework_status[i],
            };
            cylinderInfo.push(cylinder_obj);
        }
    }

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
                        'completeEngraveData'  : completeEngraveData //PLATING DATA FROM 'plating_tank_schedule_details' TABLE
                    });
                });
        }
    }
    
    const submitHandler = (data) => {
        userPutMethod(`${QUALITY_CONTROL_RS_URL}/${jobOrderPkId}`, data)
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
                            <h5>Quality Control Form</h5>
                        </div>
                        <div className="card-body">
                            {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                            (
                                <>
                                {/*  */}
                                <form onSubmit={handleSubmit(submitHandler)} className="theme-form row">
                                    <div className="col-md-9">
                                        <fieldset className="border p-2" >
                                            <legend className="w-auto text-left">Job Information</legend>

                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label required">Job Id</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        name="job_no" 
                                                        ref={register({
                                                            required: 'On Time Field Required'
                                                        })}
                                                        value={stateData.singleJobData.job_no}
                                                        disabled={'disabled'}
                                                    />
                                                    {/* <input type="hidden" name="job_no" value={stateData.jobOrderDetails.job_no ? stateData.jobOrderDetails.job_no : ''} ref={register({})} /> */}
                                                </div>
                                                <div className="col-md-2">
                                                    <select className="form-control" onChange={onChangeHandler} value={stateData?.complete_status} name='complete_status' ref={register({required: true })}>
                                                        <option value="">select one</option>
                                                        <option value="1">Ok</option>
                                                        <option value="0">Not Ok</option>
                                                    </select>
                                                </div>

                                                {/* <label className="col-md-3 col-form-label label-form required ">Cylinder Id</label>
                                                <div className="col-md-9">
                                                    <select className="form-control" name='cylinder_id' onChange={(e)=>setStateData({'cylinder_id': e.target.value})} ref={register({required: true })}>
                                                        <option value="">select one</option>
                                                        <option value="1">Ok</option>
                                                        <option value="0">Not Ok</option>
                                                    </select>
                                                </div> */}
                                            </div>
                                        </fieldset>


                                        <fieldset className="border p-2" >
                                            <legend className="w-auto text-left">Cylinders</legend>
                                            <div className="form-group">
                                                <table className="table table-striped col-md-12">
                                                    <thead>
                                                        <tr>
                                                            <th width="45%">Cylinder ID</th>
                                                            <th width="10%">Rework</th>
                                                            <th width="45%">Remark</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            cylinderInfo.length > 0 ? (
                                                                cylinderInfo.map((item, index) => (
                                                                    <tr>
                                                                        <td colspan={stateData?.complete_status === "0" ? "1" : "3"}>{item.cylinder_id}</td>
                                                                        {stateData?.complete_status === "0" && (<><td style={{textAlign: 'center'}}>
                                                                            <input type="checkbox" name="" defaultChecked = {item.status == 0 ? false : true} />
                                                                        </td>
                                                                        <td>
                                                                            <input type="text" className="form-control" name="" value={item.remark} />
                                                                        </td></>)}
                                                                    </tr>
                                                                ))
                                                            ) :(<tr>
                                                                <td colSpan="3" align="center">No Cylinder Found</td>
                                                            </tr>)
                                                        }       
                                                        {/* {
                                                            stateData.cylinders.length > 0 ? (
                                                                stateData.cylinders.map((cylinder, key)=>(
                                                                    <tr key={key}>
                                                                        <td>{cylinder.cylinder_id}</td>
                                                                        <td style={{textAlign: 'center'}}>
                                                                            <input type="checkbox" name="" />
                                                                        </td>
                                                                        <td>
                                                                            <input type="text" className="form-control" name="" />
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            ) : (
                                                                <tr>
                                                                    <td colSpan="3" align="center">No Cylinder Found</td>
                                                                </tr>
                                                            )
                                                        } */}
                                                        
                                                    </tbody>
                                                </table>
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
                                                                <td width="50%">{stateData.singleJobData.job_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right">Job Type</td>
                                                                <td>:</td>
                                                                <td>{stateData.singleJobData.job_type}</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right">FL</td>
                                                                <td>:</td>
                                                                <td>{stateData.singleJobData.fl}</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right">Cir</td>
                                                                <td>:</td>
                                                                <td>{stateData.singleJobData.cir}</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right">Dia</td>
                                                                <td>:</td>
                                                                <td>{stateData.singleJobData.dia}</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right">S. Area</td>
                                                                <td>:</td>
                                                                <td>{stateData.singleJobData.surface_area}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </pre>
                                    </div>
                                    <SubmitButton link="qualityControl/index" menuId={ menuId } />
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