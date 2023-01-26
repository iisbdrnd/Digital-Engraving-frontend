import React, { Fragment, useState, useEffect, useReducer } from 'react';

import useForm from 'react-hook-form'
import Breadcrumb from '../common/breadcrumb';
import { PanelRefreshIcons, SubmitButton } from '../../common/GlobalButton';
import { userGetMethod, userPostMethod } from '../../../api/userAction';
import { BASE_RECEIVE_RSURL, JOB_ORDER_DETAILS } from '../../../api/userUrl';
import { Typeahead } from 'react-bootstrap-typeahead';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CylinderInfo = (props) => {
    const { register, handleSubmit, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [dropdownData, setDropdownData] = useState({});
    const [typeheadOptions, setTypeheadOptions] = useState({});

    let [baseReceiveInput, setBaseReceiveInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            job_name          : '',
            printer_name      : '',
            client_email      : '',
            bill_config_type  : '',
            printer_mark      : '',
            marketing_p_name  : '',
            cyl_rate_status   : '',
            limit_square_cm   : 0,
            vat_status        : '',
            job_order_id      : '', 
            client_name       : '',
            total_cylinder_qty: ''
        }
    );

    let job_order_id = props.location.state.params.job_order_id ? props.location.state.params.job_order_id : null;
    console.log('job_order_id', job_order_id);
    useEffect(() => {
        pageRefreshHandler(job_order_id);
    },[]);

    const pageRefreshHandler = (job_order_id = null) => {
        setIsLoading(true);
        userGetMethod(`${BASE_RECEIVE_RSURL}/create?job_order_id=${job_order_id}`)
            .then(response => {
                console.log('response', response.data);
                // FOR JOB ORDER
                let jobOrderOptions = [];
                if (response.data.jobOrder) {
                    console.log('response.data.jobOrder', response.data.jobOrder);
                    let jobOrderObj = {};
                    jobOrderObj.id = response.data.jobOrder.id;
                    jobOrderObj.name = `[${response.data.jobOrder.job_no}] ` + response.data.jobOrder.job_name;
                    jobOrderOptions.push(jobOrderObj);

                    if (response.data.jobOrder != null) { 
                        setBaseReceiveInput({
                            'job_order_id': [jobOrderObj]
                        })
                    }
                    dropDownChange([{id : response.data.jobOrder.id}], 'job_order_id');
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
                setTypeheadOptions(
                    (prevstate) => ({
                        ...prevstate,
                        ['job_orders']: jobOrderOptions,
                    })
                );

                setIsLoading(false);
            });
    }

    const dropDownChange = (event, stateName) => {
        if(event.length > 0){
            const selectedValue = event[0].id;
            setDropdownData(
                (prevstate) => ({
                    ...prevstate,
                    [stateName]: selectedValue,
                })
            );

            userGetMethod(`${JOB_ORDER_DETAILS}?jobOrderId=${selectedValue}`)
                .then(response => {
                    let { job_name, printer_name, client_email, bill_config_type, printer_mark, marketing_p_name, cyl_rate_status, limit_square_cm, vat_status, client_name, total_cylinder_qty} = response.data.jobOrderDetails;
                    setBaseReceiveInput({
                        'job_name'          : job_name,
                        'printer_name'      : printer_name,
                        'client_email'      : client_email,
                        'bill_config_type'  : bill_config_type,
                        'printer_mark'      : printer_mark,
                        'marketing_p_name'  : marketing_p_name,
                        'cyl_rate_status'   : cyl_rate_status,
                        'limit_square_cm'   : limit_square_cm,
                        'vat_status'        : vat_status,
                        'client_name'       : client_name,
                        'total_cylinder_qty': total_cylinder_qty
                    });
                });
        } 
    }

    const submitHandler = (data, e) => {
        data.job_order_id = dropdownData.job_order_id;
        userPostMethod(BASE_RECEIVE_RSURL, data)
            .then(response => {
                if (response.data.status == 1) {
                    toast.success(response.data.message)
                    e.target.reset();
                } else {
                    toast.error(response.data.message)
                }
            })
        .catch(error => toast.error(error))
    }

    var menuId = 0;
    if (props.location.state === undefined) {
        menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5>Base Receive Form</h5>
                                    </div>
                                    <div className="col-md-6">
                                        <PanelRefreshIcons panelRefresh={pageRefreshHandler} />
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                            {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                <form className="needs-validation theme-form" onSubmit={handleSubmit(submitHandler)} noValidate>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label required" htmlFor="job_order_id">Job No</label>
                                                <div className="col-sm-9">
                                                    <Typeahead
                                                        id="job_order_id"
                                                        name="job_order_id"
                                                        labelKey={option => `${option.name}`}
                                                        options={typeheadOptions['job_orders']}
                                                        placeholder="Select Job No..."
                                                        onChange={(e) => dropDownChange(e, 'job_order_id')}
                                                        inputProps={{ required: true }}
                                                        selected={baseReceiveInput.job_order_id}
                                                        disabled={job_order_id != null ? 'disabled' : ''}
                                                        ref={register({
                                                            required: 'Job No Field Required'
                                                        })}
                                                    />
                                                    {errors.job_order_id && <p className='text-danger'>{errors.job_order_id.message}</p>}
                                                </div>
                                            </div>
                                        
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label" htmlFor="challan_no">Challan No</label>
                                                <div className="col-sm-9">
                                                    <input className="form-control" name="challan_no" required id="challan_no" type="text" placeholder="Challan No" ref={register({ required: true })} />
                                                    <span>{errors.challan_no && 'Challan No is required'}</span>
                                                    <div className="valid-feedback">Looks good!</div>
                                                </div>
                                            </div>
                                        
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label required" htmlFor="material">Material</label>
                                                <div className="col-sm-9">
                                                    <select className="form-control" required id="material" name="material"
                                                    ref={register({
                                                        required: 'Material Field Required'
                                                    })} 
                                                    defaultValue=''>
                                                    <option value=''> Select One </option>
                                                        <option value="1"> Sheet </option>
                                                        <option value="2"> Pipe </option>
                                                        <option value="3"> Ex-Stock </option>
                                                    </select>
                                                    {errors.material && <p className='text-danger'>{errors.material.message}</p>}
                                                </div>
                                            </div>
                                        
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label" htmlFor="initial_weight">Initial Weight</label>
                                                <div className="col-sm-9">
                                                    <input className="form-control" name="initial_weight" required id="initial_weight" type="text" placeholder="Initial Weight" ref={register({ required: true })} />
                                                    <span>{errors.initial_weight && 'Initial Weight is required'}</span>
                                                    <div className="valid-feedback">Looks good!</div>
                                                </div>
                                            </div>
                                        
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label" htmlFor="final_weight">Final Weight</label>
                                                <div className="col-sm-9">
                                                    <input className="form-control" name="final_weight" required id="final_weight" type="text" placeholder="Final Weight" ref={register({ required: true })} />
                                                    <span>{errors.final_weight && 'Final Weight is required'}</span>
                                                    <div className="valid-feedback">Looks good!</div>
                                                </div>
                                            </div>
                                        
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label" htmlFor="remarks">Remarks</label>
                                                <div className="col-sm-9">
                                                    <input className="form-control" name="remarks" id="remarks" type="text" placeholder="Remarks" ref={register({})} />
                                                    <div className="valid-feedback">Looks good!</div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-6">
                                            <pre className="helper-classes m-t-10">
                                                <div className="table-responsive display-div">
                                                    <table className="table table-bordernone">
                                                        <tbody>
                                                            <tr>
                                                                <td width="25%" align="right">Job Name</td>
                                                                <td width="5%">:</td>
                                                                <td width="70%">{baseReceiveInput.job_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right">Client Name</td>
                                                                <td>:</td>
                                                                <td>{baseReceiveInput.client_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right">Printer Name</td>
                                                                <td>:</td>
                                                                <td>{baseReceiveInput.printer_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right">No of Cylinder</td>
                                                                <td>:</td>
                                                                <td>{baseReceiveInput.total_cylinder_qty}</td>
                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </pre>
                                        </div>
                                    </div>

                                    <SubmitButton link="baseReceive/index" menuId={menuId} />
                            
                                </form>
                                )
                            }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Fragment>
    );
};

export default CylinderInfo;