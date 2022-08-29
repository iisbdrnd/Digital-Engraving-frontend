import React, { Fragment, useEffect, useState, useReducer } from 'react';
import { QUALITY_CONTROL_RS_URL, QUALITY_CONTROL_JOB_DATA_BY_JOB_ID } from '../../../../api/userUrl';
import { userGetMethod, userPostMethod } from '../../../../api/userAction';
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
            // send_date         : new Date().toLocaleDateString(),
            // job_no            : '',
            // client_name       : '',
            // marketing_p_name  : '',
            // job_type          : '',
            // total_cylinder_qty: '',
            // base_source       : '',
            // printer_name      : '',
            // desired_fl        : '',
            // desired_cir       : '',
            // desired_dia       : '',
            // surface_area      : '',
            // job_order_id      : '', 
            // fl                : '', 
            // dia               : '', 
            completeStatus     : '',
            job_order_pk_id    : '', 
            cylinder_id        : '', 
            cylinder_id_array  : [], 
            cylinderLength     : 0, 
            jobOrderDetails    : [], //STORE DATA FROM job_orders
            singleJobData      : [], //STORE DATA FROM job_orders
            cylinders          : [], //STORE DATA FROM factory_cylinder_supply_chains
        }
    );
    let [inputData, setInputData] = useReducer((state, newState) => ({...state, ...newState}),
        {
            cylinder_id    : [], 
            rework_status  : {},
            rework_remarks : []
        }
    );

    useEffect(()=>{
        userGetMethod(`${QUALITY_CONTROL_RS_URL}/create`)
            .then(response => {
                console.log('response', response.data);
                // FOR JOB ORDER
                let jobOrderOptions = [];
                if (response.data.jobOrders && response.data.jobOrders.length > 0) {
                    response.data.jobOrders.map(order => 
                    {
                        if (order.total_cylinder_qty == order.available_cyl_qty) {    
                            let jobOrderObj = {};
                            jobOrderObj.id = order.id;
                            jobOrderObj.name = `[${order.job_no}] ` + order.job_name;
                            jobOrderOptions.push(jobOrderObj);
                        }
                    })
                }
                
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

            userGetMethod(`${QUALITY_CONTROL_JOB_DATA_BY_JOB_ID}/${selectedValueId}`)
                .then(response => {
                    console.log('QUALITY_CONTROL_JOB_DATA_BY_JOB_ID', response.data);
                    let { singleJobData, cylinders, cylinderLength } = response.data;
                    setStateData({
                        'cylinderLength': cylinderLength, //get array size of cylinders
                        'singleJobData': singleJobData,
                        'completeStatus': cylinders.complete_status
                    });
                    console.log('cylinders.cylinder_id', cylinders.cylinder_id);
                    setInputData({
                        'cylinder_id': cylinders.cylinder_id,
                        'rework_status': cylinders.rework_status,
                        'rework_remarks': cylinders.rework_remarks
                    });
                });
        }
    }
    console.log('completeStatus', stateData.completeStatus);
    const changeInputHandler = (i, e, fieldName, checkbox = false) => {
        console.log({fieldName});
        console.log('dsafdf', e.target.value);
        setInputData(
            {
                [fieldName]: {
                    ...inputData[fieldName],
                    [i]: e.target.value
                }
            }
        )

        if (checkbox && inputData[fieldName].hasOwnProperty(e.target.id) && inputData[fieldName][i] != 0) {
            setInputData(
                {
                    [fieldName]: {
                        ...inputData[fieldName],
                        [i]: 0
                    }
                }
            )
        }
    }

    const submitHandler = (data) => {
        inputData.job_no = data.job_no;
        if (data.complete_status == 1) {
            inputData.rework_status = [];
            inputData.rework_remarks = [];
        }
        console.log('inputData', inputData);

        userPostMethod(`${QUALITY_CONTROL_RS_URL}?cylinder_id=${stateData.cylinder_id}`, inputData)
            .then(response => {
                console.log('response', response.data);
                if (response.data.status == 1) {
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            })
        .catch(error => toast.error(error))
    }

    const cylindersByJobId = (completeStatus) => {
        let rows = [];
        for (let i = 0; i < stateData.cylinderLength; i++) {
            rows.push(
                <tr key={i}>
                    <td> { inputData.cylinder_id[i] } </td>
                    {
                        completeStatus == 0 ? (
                            <>
                                <td style={{textAlign: 'center'}}>
                                    <input onChange={e=>changeInputHandler(i, e, 'rework_status', true)} value={1} type="checkbox" name="rework_status" ref={register({})} defaultChecked={inputData.rework_status[i] == 1 ? true : false} id={i} /> 
                                </td>
                                <td>
                                    <input onChange={e=>changeInputHandler(i, e, 'rework_remarks')} type="text" className="form-control" name="rework_remarks" ref={register({})} value={inputData.rework_remarks[i]} />
                                </td>
                            </>
                        ) : ''
                    }
                </tr>
            );
        }
        return rows;
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
                            <h5>Quality Control</h5>
                        </div>
                        <div className="card-body">
                            {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                            (
                                <>
                                <form onSubmit={handleSubmit(submitHandler)} className="theme-form row">
                                    <div className="col-md-9">
                                        <fieldset className="border p-2" >
                                            <legend className="w-auto text-left">Job Information</legend>

                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label required">Job Id</label>
                                                <div className="col-md-8">
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
                                                    <input type="hidden" name="job_no" value={stateData.singleJobData.job_no ? stateData.singleJobData.job_no : ''} ref={register({})} />
                                                </div>
                                                <div className="col-md-2">
                                                    <select className="form-control" name='complete_status' onChange={(e)=>setStateData({'completeStatus' : e.target.value})} value={stateData.completeStatus} ref={register({required: true })}>
                                                        <option value="">select one</option>
                                                        <option value="1">Ok</option>
                                                        <option value="0">Not Ok</option>
                                                    </select>
                                                    {errors.complete_status && 'Complete Status required'}
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
                                                            <th width="45%">Cylinders ID</th>
                                                            {stateData.completeStatus == 0 && stateData.completeStatus != '' ? (
                                                                <>
                                                                    <th width="10%">Rework</th>
                                                                    <th width="45%">Remark</th>
                                                                </>
                                                            ) : null}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <input type="hidden" name="cylinder_length" value={stateData.cylinders.length} ref={register({})} />
                                                        {
                                                            stateData.completeStatus != '' ? cylindersByJobId(stateData.completeStatus) : (
                                                                <tr>
                                                                    <td colSpan="3" align="center">No Cylinder Found</td>
                                                                </tr>
                                                            )
                                                        }
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

export default Add;