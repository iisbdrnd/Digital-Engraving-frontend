import React, { Fragment, useState, useEffect, useReducer } from 'react';

import useForm from 'react-hook-form'
import Breadcrumb from '../common/breadcrumb';
import { PanelRefreshIcons, SubmitButton } from '../../common/GlobalButton';
import { userGetMethod, userPostMethod } from '../../../api/userAction';
import { CLIENT_STOCK_RSURL, JOB_ORDER_DETAILS } from '../../../api/userUrl';
import { Typeahead } from 'react-bootstrap-typeahead';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CylinderInfo = (props) => {
    const { register, handleSubmit, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [dropdownData, setDropdownData] = useState({});
    const [typeheadOptions, setTypeheadOptions] = useState({});

    let [clientStockInput, setClientStockInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            job_name          : '',
            printer_name      : '',
            job_type          : '',
            fl                : '',
            cir               : '',
            total_surface_area: '',
            client_email      : '',
            bill_config_type  : '',
            printer_mark      : '',
            marketing_p_name  : '',
            cyl_rate_status   : '',
            limit_square_cm   : 0,
            vat_status        : '',
            job_order_id      : '', 
            client_name       : '',
            entry_date       : '',
            agreement_date       : '',
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
        userGetMethod(`${CLIENT_STOCK_RSURL}/create?job_order_id=${job_order_id}`)
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
                        setClientStockInput({
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
                    let { job_name, printer_name, job_type, fl, cir, total_surface_area, client_email, bill_config_type, printer_mark, marketing_p_name, cyl_rate_status, limit_square_cm, vat_status, client_name, total_cylinder_qty, entry_date, agreement_date} = response.data.jobOrderDetails;
                    setClientStockInput({
                        'job_name'          : job_name,
                        'printer_name'      : printer_name,
                        'job_type'          : job_type,
                        'fl'                : fl,
                        'cir'               : cir,
                        'total_surface_area': total_surface_area,
                        'client_email'      : client_email,
                        'bill_config_type'  : bill_config_type,
                        'printer_mark'      : printer_mark,
                        'marketing_p_name'  : marketing_p_name,
                        'cyl_rate_status'   : cyl_rate_status,
                        'limit_square_cm'   : limit_square_cm,
                        'vat_status'        : vat_status,
                        'client_name'       : client_name,
                        'entry_date'        : entry_date,
                        'agreement_date'    : agreement_date,
                        'total_cylinder_qty': total_cylinder_qty
                    });
                });
        } 
    }

    const submitHandler = (data, e) => {
        data.job_order_id = dropdownData.job_order_id;
        userPostMethod(CLIENT_STOCK_RSURL, data)
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
                                        <h5>Client Stock Form</h5>
                                    </div>
                                    <div className="col-md-6">
                                        {/* <PanelRefreshIcons panelRefresh={pageRefreshHandler} /> */}
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                            {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                <form className="needs-validation theme-form" onSubmit={handleSubmit(submitHandler)} noValidate>
                                    <div className="">
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
                                                        selected={clientStockInput.job_order_id}
                                                        disabled={job_order_id != null ? 'disabled' : ''}
                                                        ref={register({
                                                            required: 'Job No Field Required'
                                                        })}
                                                    />
                                                    {errors.job_order_id && <p className='text-danger'>{errors.job_order_id.message}</p>}
                                                </div>
                                            </div>
                                        
                                            {/* <div className="form-group row">
                                                <label className="col-sm-3 col-form-label required" htmlFor="order_date">Order Date</label>
                                                <div className="col-sm-7">
                                                    <input className="form-control" name="order_date" id="order_date" type="date" ref={register({ required: true })} />
                                                    <span>{errors.order_date && 'Order Date is required'}</span>
                                                    <div className="valid-feedback">Looks good!</div>
                                                </div>
                                            </div> */}
                                        
                                            {/* <div className="form-group row">
                                                <label className="col-sm-3 col-form-label required" htmlFor="agreement_date">Agreement Date</label>
                                                <div className="col-sm-7">
                                                    <input className="form-control" id="agreement_date" name="agreement_date" type="date" ref={register({ required: true })} />
                                                    <span>{errors.agreement_date && 'Agreement Date is required'}</span>
                                                    <div className="valid-feedback">Looks good!</div>
                                                </div>
                                            </div> */}
                                        
                                            {/* <div className="form-group row">
                                                <label className="col-sm-3 col-form-label required" htmlFor="cylinder_qty">Cylinder Quantity</label>
                                                <div className="col-sm-7">
                                                    <input className="form-control" name="cylinder_qty" id="cylinder_qty" type="number" placeholder="Cylinder Quantity" ref={register({ required: true })} />
                                                    <span>{errors.cylinder_qty && 'Cylinder Quantity is required'}</span>
                                                    <div className="valid-feedback">Looks good!</div>
                                                </div>
                                            </div> */}
                                        
                                            {/* <div className="form-group row">
                                                <label className="col-sm-3 col-form-label" htmlFor="remarks">Remarks</label>
                                                <div className="col-sm-9">
                                                    <input className="form-control" name="remarks" id="remarks" type="text" placeholder="Remarks" ref={register({})} />
                                                    <div className="valid-feedback">Looks good!</div>
                                                </div>
                                            </div> */}
                                        </div>
                                        
                                        <div className="col-md-10">
                                            <pre className="helper-classes m-t-10">
                                                <div className="display-div">
                                                    <table className="table table-bordernone">
                                                        <tbody>
                                                            <div class="row">
                                                                <div className="col-md-6">
                                                                    <tr>
                                                                        <td  align="right">Order Date</td>
                                                                        <td>:</td>
                                                                        <td>{clientStockInput.entry_date}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td  align="right">Job Name</td>
                                                                        <td>:</td>
                                                                        <td>{clientStockInput.job_name}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="right">Client Name</td>
                                                                        <td>:</td>
                                                                        <td>{clientStockInput.client_name}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="right">Printer Name</td>
                                                                        <td>:</td>
                                                                        <td>{clientStockInput.printer_name}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="right">Job Type</td>
                                                                        <td>:</td>
                                                                        <td>{clientStockInput.job_type}</td>
                                                                    </tr>
                                                                </div>
                                                            
                                                                <div className="col-md-4">
                                                                    
                                                                    <tr>
                                                                        <td align="right">Agreement Date</td>
                                                                        <td>:</td>
                                                                        <td>{clientStockInput.agreement_date}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="right">Face Length</td>
                                                                        <td>:</td>
                                                                        <td>{clientStockInput.fl}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="right">Circumference</td>
                                                                        <td>:</td>
                                                                        <td>{clientStockInput.cir}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="right">Total SA</td>
                                                                        <td>:</td>
                                                                        <td>{clientStockInput.total_surface_area}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="right">Total Cyl</td>
                                                                        <td>:</td>
                                                                        <td>{clientStockInput.total_cylinder_qty}</td>
                                                                    </tr>
                                                                </div>
                                                            </div>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </pre>
                                        </div>
                                        <div className="row m-t-10 m-l-10">
                                            <fieldset className="border" style={{width: '98%'}}> 
                                                <legend className="w-auto text-left">Stock Receive</legend>
                                                <div className="col-md-12">
                                                    <div className="form-row">
                                                        <div className="col-md-3 mb-4">
                                                            <label for="receive_date">Receive Date</label>
                                                            <input 
                                                                className="form-control" 
                                                                id="receive_date" 
                                                                name="receive_date" 
                                                                type="date"  
                                                                // onChange={orderDetailsInputHander}
                                                                // value={jobOrderData.qty}
                                                            />
                                                        </div> 
                                                        <div className="col-md-3 mb-4">
                                                            <label for="qty">Qty</label>
                                                            <input 
                                                                className="form-control" 
                                                                id="qty" 
                                                                name="qty" 
                                                                type="number" 
                                                                placeholder="Cylinder Quantity" 
                                                                // onChange={orderDetailsInputHander}
                                                                // value={jobOrderData.job_ref_id}
                                                            />
                                                        </div>

                                                        <div className="col-md-3 mb-4">
                                                            <label for="rermarks">Rermarks</label>
                                                            <input 
                                                                className="form-control" 
                                                                id="rermarks" 
                                                                name="rermarks" 
                                                                type="text" 
                                                                placeholder="Remarks" 
                                                                // onChange={orderDetailsInputHander}
                                                                // value={jobOrderData.qty}
                                                            />
                                                        </div>

                                                        <div className="col-md-1 mb-4 m-t-5">
                                                            {/* <span className="btn btn-primary btn-sm mr-1 m-t-20" type="add" onClick={addOrderDetailsHandler}>Add</span> */}
                                                            <span className="btn btn-primary btn-sm mr-1 m-t-20" type="add">Add</span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>



                                    <div className="row m-t-10 m-l-10">
                                        <fieldset className="border" style={{width: '98%'}}> 
                                            <legend className="w-auto text-left">Added Client Stock</legend>
                                            <div className="col-md-12">
                                                <table className="table table-bordered" style={{width: '100%'}}>
                                                    <thead>
                                                        <tr>
                                                            <th scope="col" width="15%">Received Date</th>
                                                            <th scope="col" width="20%">Received Cyl</th>
                                                            <th scope="col" width="10%">Remarks</th>
                                                            <th scope="col" width="10%">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            //baseOrderDetails.length > 0 ?
                                                            <>
                                                                {/* {baseOrderDetails.map((item, index)=> 
                                                                    ( */}
                                                                    {/* <tr key={index}> */}
                                                                    <tr>
                                                                        {/* <th scope="row">{item.supplier_id_name}</th>
                                                                        <td>{item.job_ref_id}</td>
                                                                        <td>{item.qty}</td>
                                                                        <td>{item.delivery_date}</td>
                                                                        <td>{item.remarks}</td>
                                                                        <td align="center"> */}
                                                                        <th scope="row"></th>
                                                                        <td></td>
                                                                        <td></td>
                                                                        <td align="center">
                                                                            {/* <span onClick={()=>removeBaseOrderHandler(item.supplier_id, item.qty)}> */}
                                                                            <span>
                                                                                <i className="icon-close" style={{ width: 25, fontSize: 16, padding: 0, color: '#e4566e', cursor: 'pointer' }}
                                                                                ></i>
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                    {/* )
                                                                )} */}
                                                            </>
                                                            //: <tr><td colSpan="6" className="text-center">No data Added</td></tr>
                                                        }
                                                    </tbody>
                                                    <tfoot>
                                                        <tr>
                                                            <td colSpan="1" align="right">Qty = </td>
                                                            {/* <td>{jobOrderData.orderQty}</td> */}
                                                            <td></td>
                                                            <td colSpan="3"></td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                        </fieldset>
                                    </div>

                                    <SubmitButton link="clientStock/index" menuId={menuId} />
                            
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