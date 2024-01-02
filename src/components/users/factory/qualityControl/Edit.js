import React, { Fragment, useEffect, useState, useReducer } from 'react';
import { QUALITY_CONTROL_RS_URL,QUALITY_CONTROL_JOB_DATA_BY_JOB_ID, POLISHING_GET_POLISHING_DATA_BY_JOB_ID, DESIGN_LAYOUT_RSURL } from '../../../../api/userUrl';
import { userGetMethod, userPutMethod, userPostMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';

const Edit = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [cylinderInfo, setCylinderInfo] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [proofInfo,setProofInfo] = useState({
        physicalCheck:'',
        proof : '',
        reg : '',
        background: '',
        graphic : '',
        text : '',
        sign1 : '',
        sign2 : '',
        sign3 : '',
        note : '',
        job_id: ''
    });
    const [cylinderUpdateInfo, setCylinderUpdateInfo] = useState({
        cylinder_id    : [],
        rework_status  : [],
        rework_remarks : {}
    });

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
    const pStyle = {
        marginBottom: '5px',
        fontSize: "15px",
    }
    const tableStyle = {
        // "border" : "1px solid #ccc",
        "margin" : "1% 1% 0% 0%"
    }
    const inputChangeHandler = (e,fieldName,i) =>{
            if (e && e.target) {
                const { type, value, checked } = e.target;
                setProofInfo((prevProofInfo) => ({
                    ...prevProofInfo,
                    [fieldName]: type === 'checkbox' ? (checked ? 1 : 0) : value,
                  }));
              }
        
           
    }
    // console.log(proofInfo);
 
    let jobOrderPkId = props.match.params.job_order_pk_id ? props.match.params.job_order_pk_id : null;
    
    
    useEffect(()=>{
        // userGetMethod(`${QUALITY_CONTROL_RS_URL}/${jobOrderPkId}/edit`)
           userGetMethod(`${QUALITY_CONTROL_JOB_DATA_BY_JOB_ID}/${jobOrderPkId}`)
            .then(response => {
                // dropDownChange([{id : response.data.jobOrder.job_id}], 'job_order_pk_id');
                let {singleJobData, cylinders,cylinderLength} = response.data;
                // console.log(response.data.cylinders.cylinder_id[0]);
                setStateData({
                    'singleJobData': singleJobData, // GET DATA FROM job_orders table
                    'cylinders'    : cylinders, 
                    'cylinder_length' : cylinderLength
                    // GET DATA FROM factory_cylinder_supply_chains table
                });

                
            });

            userGetMethod(`${DESIGN_LAYOUT_RSURL}/create`)
            .then(response => {
                let {employees} = response.data;
                setEmployees(employees);
               
            })
            if (jobOrderPkId) {
                setProofInfo({
                    ...proofInfo,
                    job_id : jobOrderPkId}
                )
            }
            setIsLoading(false);

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
    // console.log(cylinderInfo);
    const onChangeHandler = (event) => {
        setStateData({[event.target.name]: event.target.value});
    }

    const onChangeCylinder = (event, index) => {
        const value = event.target.type == 'checkbox' ? (event.target.checked  ? 1 : 0) : event.target.value;
        setCylinderInfo(
            cylinderInfo.map((item, i) =>
                i == index ? { ...item, [event.target.name]: value } : item)
        );

    }
    // console.log(cylinderInfo);
    const getCylinderUpdateInfo = () => {
        cylinderInfo.map((item, index) =>{
            cylinderUpdateInfo['cylinder_id'].push(item?.cylinder_id);
            cylinderUpdateInfo['rework_remarks'][index] = item?.remark
            cylinderUpdateInfo['rework_status'].push(item?.status);
        })
    }
    // console.log(cylinderUpdateInfo);
 
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
        getCylinderUpdateInfo();
        if (stateData?.complete_status == "0") {
            data.rework_status = cylinderUpdateInfo.rework_status;
            data.rework_remarks = cylinderUpdateInfo.rework_remarks;
        }else{
            data.rework_status = [];
            data.rework_remarks = [];
        }
        data.proofInfo = proofInfo;
        data.cylinder_id = cylinderUpdateInfo.cylinder_id;
        // console.log(data);
        userPostMethod(`${QUALITY_CONTROL_RS_URL}`, data)
            .then(response => {
                if (response.data.status == 1) {
                    clearForm();
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            })
            .catch(error => toast.error(error))
    }
    const clearForm = () => {
        setStateData({
            'complete_status': "",
            'singleJobData': [],
            'cylinder_length': 0,
        })
        setCylinderInfo([]);
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
                                                        <option value="1">Delivery</option>
                                                        <option value="0">Rework</option>
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

                                        <fieldset>
                                        <div>
                                            <div className="row mt-4">
                                                <div className="col-12">
                                                    <h4 style={{fontSize:'17px',fontWeight:'bold'}}>Proof / Delivery Information</h4>
                                                </div>
                                            </div>

                                            <table className="particulars table-stripped groupFont" width="100%"  style={tableStyle}>
                                                
                                                <tr style={{fontSize:'17px', fontWeight:'500'}}>
                                                    <td width="15%">Physical Check</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">
                                                    <select className="form-control" style={{width:'25%'}} name="phycicalCheck" id="phycicalCheck"  onChange={(e)=>inputChangeHandler(e,'physicalCheck',i)}>
                                                                <option value="">select</option>
                                                                <option value='1'>Yes</option>
                                                                <option value='0'>No</option>
                                                            </select>
                                                    </td>
                                                    <td width="15%">Sign</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">
                                                    <select className="form-control" style={{width:'50%'}} name="Sign1" id="sign1" onChange={(e)=>inputChangeHandler(e,'sign1',i)}>
                                                                <option value="">Select....</option>
                                                                {/* Map here */}
                                                                
                                                                {employees.map((item,index) => (
                                                                    <option key={index} value={item?.id}>
                                                                        {item?.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                    </td>
                                                </tr>
                                                <tr style={{fontSize:'17px', fontWeight:'500'}}>
                                                    <td width="15%">Proof</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">
                                                    <select className="form-control" style={{width:'25%',marginTop:'5px'}} name="proof" id="proof" onChange={(e)=>inputChangeHandler(e,'proof',i)}>
                                                                <option value="">select</option>
                                                                <option value='1'>Yes</option>
                                                                <option value='0'>No</option>
                                                            </select>
                                                    </td>
                                                    <td width="15%">Sign </td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">
                                                    <select className="form-control" style={{width:'50%',marginTop:'5px'}} name="sign2" id="sign2" onChange={(e)=>inputChangeHandler(e,'sign2',i)}>
                                                                <option value="">Select</option>
                                                                {/* Map here */}
                                                                {employees.map((item,index) => (
                                                                    <option key={index} value={item?.id}>
                                                                        {item?.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                    </td>
                                                </tr>
                                               
                                                
                                            </table>

                                            <div className='row mt-1'>

                                            <div className="col-12 d-flex">
                                                <div className=''>
                                                <p style={pStyle}>Attention: </p>
                                                </div>
                                                <div className='col-2'></div>

                                                <div className='col-md-2 d-flex justify-content-center align-items-center '>
                                                
                                                            <div className="col-md-4">
                                                                <input
                                                                    type="checkbox"
                                                                    name="reg"
                                                                    onChange={(e)=>inputChangeHandler(e,'reg',i)}
                                                                    value=''
                                                                />
                                                            </div>
                                                <label className="col-md-6 mt-1" style={{whiteSpace: 'nowrap'}}>Registation</label>
                                                </div>

                                                <div className='col-md-2 d-flex justify-content-center align-items-center '>
                                                
                                                            <div className="col-md-4">
                                                                <input
                                                                    type="checkbox"
                                                                    name="background"
                                                                    onChange={(e)=>inputChangeHandler(e,'background',i)}
                                                                    value=''
                                                                />
                                                            </div>
                                                <label className="col-md-6 mt-1" style={{whiteSpace: 'nowrap'}}>Background</label>            
                                                </div>

                                                <div className='col-md-2 d-flex justify-content-center align-items-center '>
                                                
                                                            <div className="col-md-4">
                                                                <input
                                                                    type="checkbox"
                                                                    name="text"
                                                                    onChange={(e)=>inputChangeHandler(e,'text',i)}
                                                                    value=''
                                                                />
                                                            </div>
                                                <label className="col-md-6 mt-1" style={{whiteSpace: 'nowrap'}}>Text</label>            
                                                </div>

                                                <div className='col-md-2 d-flex justify-content-center align-items-center '>
                                                
                                                            <div className="col-md-4">
                                                                <input
                                                                    type="checkbox"
                                                                    name="graphic"
                                                                    onChange={(e)=>inputChangeHandler(e,'graphic',i)}
                                                                    value=''
                                                                />
                                                            </div>
                                                <label className="col-md-6 mt-1" style={{whiteSpace: 'nowrap'}}>Graphic</label>            
                                                </div>
                                                </div> 

                                            </div>

                                            <div>
                                            <table className="particulars table-stripped groupFont" width="100%">
                                                 <tr style={{fontSize:'17px', fontWeight:'500'}}>
                                                            <td width="15%">Note</td>
                                                            <td width="5%" align="center">:</td>
                                                            <td width="30%">
                                                            <input
                                                            type="text"
                                                            className="form-control"
                                                            name="note"
                                                            onChange={(e)=>inputChangeHandler(e,'note',i)}
                                                            style={{width:'50%'}}
                                                        />
                                                            </td>
                                                            <td width="15%">Sign</td>
                                                            <td width="5%" align="center">:</td>
                                                            <td width="30%">
                                                            <select className="form-control" style={{width:'50%'}} name="sign3" id="designer_id" onChange={(e)=>inputChangeHandler(e,'sign3',i)}>
                                                                <option value="">Select....</option>
                                                                {/* Map here */}
                                                                {employees.map((item,index) => (
                                                                    <option key={index} value={item?.id}>
                                                                        {item?.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            </td>
                                                    </tr>
                                                
                                               
                                                
                                            </table>
                                                
                                            </div>




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
                                                                            <input type="checkbox" name="status" onChange={(event)=> onChangeCylinder(event,index)}  defaultChecked = {item.status == 0 ? false : true} ref={register()} />
                                                                        </td>
                                                                        <td>
                                                                            <input type="text" className="form-control" onChange={(event)=> onChangeCylinder(event,index)} name="remark" defaultValue={item.remark} ref={register()} />
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
                                                            <tr style={{ background: 'none',border:"none"}}>
                                                                <td width="45%" align="right">Job Name</td>
                                                                <td width="5%">:</td>
                                                                <td width="50%">{stateData.singleJobData.job_name}</td>
                                                            </tr>
                                                            <tr style={{ background: 'none',border:"none"}}>
                                                                <td align="right">Job Type</td>
                                                                <td>:</td>
                                                                <td>{stateData.singleJobData.job_type}</td>
                                                            </tr>
                                                            <tr style={{ background: 'none',border:"none"}}>
                                                                <td align="right">FL</td>
                                                                <td>:</td>
                                                                <td>{stateData.singleJobData.fl}</td>
                                                            </tr>
                                                            <tr style={{ background: 'none',border:"none"}}>
                                                                <td align="right">Cir</td>
                                                                <td>:</td>
                                                                <td>{stateData.singleJobData.cir}</td>
                                                            </tr>
                                                            <tr style={{ background: 'none',border:"none"}}>
                                                                <td align="right">Dia</td>
                                                                <td>:</td>
                                                                <td>{stateData.singleJobData.dia}</td>
                                                            </tr>
                                                            <tr style={{ background: 'none',border:"none"}}>
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