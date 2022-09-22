import React, { Fragment, useState, useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from 'react-hook-form'
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { PanelRefreshIcons, SubmitButton } from '../../common/GlobalButton';
import { userGetMethod, userPostMethod } from '../../../api/userAction';
import { CLIENT_STOCK_RSURL, JOB_ORDER_DETAILS } from '../../../api/userUrl';
import SweetAlert from 'sweetalert2';

const Add = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [dropdownData, setDropdownData] = useState({});
    const [typeheadOptions, setTypeheadOptions] = useState({});
    const [clientStockDetails, setClientStockDetails] = useState([]);

    let [jobOrderData, setJobOrderData] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            job_name           : '',
            job_no             : '',
            printer_name       : '',
            job_type           : '',
            fl                 : '',
            cir                : '',
            total_surface_area : '',
            job_order_id       : '', 
            client_name        : '',
            entry_date         : '',
            agreement_date     : '',
            total_cylinder_qty : '',
            job_order_qty_limit: 0,
            orderQty           : 0
        }
    );
    let job_order_id = props.location.state.params.job_order_id ? props.location.state.params.job_order_id : null;
    useEffect(() => {
        pageRefreshHandler(job_order_id);
    },[]);

    const pageRefreshHandler = (job_order_id = null) => {
        setIsLoading(true);
        userGetMethod(`${CLIENT_STOCK_RSURL}/create`)
            .then(response => {
                // FOR JOB ORDER
                let jobOrderOptions = [];
                if (response.data.jobOrders && response.data.jobOrders.length > 0) {
                    response.data.jobOrders.map(order => 
                    {
                        let jobOrderObj = {};
                        jobOrderObj.id = order.id;
                        jobOrderObj.name = `[${order.job_no}] ` + order.job_name;
                        jobOrderOptions.push(jobOrderObj);
                        if (job_order_id === order.id) {
                            setDropdownData({
                                'job_order_id': [jobOrderObj]
                            })
                            setJobOrderData({
                                //'job_name'           : order.job_name,
                                //'job_no'             : order.job_no,
                                //'printer_name'       : order.printer_name,
                                //'job_type'           : order.job_type,
                                //'fl'                 : order.fl,
                                // 'cir'               : order.cir,
                                //'total_surface_area' : order.total_surface_area,
                                //'client_name'        : order.client_name,
                                //'entry_date'         : order.entry_date,
                                //'agreement_date'     : order.agreement_date,
                                //'total_cylinder_qty' : order.total_cylinder_qty,
                                'job_order_qty_limit': order.total_cylinder_qty
                            })
                        }
                    })
                }
                setTypeheadOptions(
                    (prevstate) => ({
                        ...prevstate,
                        ['job_orders']: jobOrderOptions,
                        // ['suppliers']: supplierOptions,
                    })
                );
                setClientStockDetails([]);

                setIsLoading(false);
            });
    }
    // FOR Typeahead DATA INPUT
    const dropDownChange = (event, stateName) => {
        if(event.length > 0){
            const selectedValue = event[0].id;
            const selectedValueName = event[0].name;
            setDropdownData(
                (prevstate) => ({
                    ...prevstate,
                    [stateName]: selectedValue,
                    [stateName+'_name']: selectedValueName,
                })
            );
            if (stateName === 'job_order_id') {
                userGetMethod(`${JOB_ORDER_DETAILS}?jobOrderId=${selectedValue}`)
                    .then(response => {
                        let { job_name, job_no, printer_name, job_type, fl, cir, total_surface_area, client_email, bill_config_type, printer_mark, marketing_p_name, cyl_rate_status, limit_square_cm, vat_status, client_name, total_cylinder_qty, entry_date, agreement_date } = response.data.jobOrderDetails;
                        setJobOrderData({
                            'job_order_qty_limit': total_cylinder_qty,
                            'job_name'          : job_name,
                            'job_no'            : job_no,
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

    }
    // FOR CLIENT STOCKS DATA INPUT
    const clientStocksInputHander = (event) => {
        setJobOrderData(
            {[event.target.name] : event.target.value},
        );
    }
    // FOR CLIENT STOCKS ARRAY READY
    const addOrderDetailsHandler = (event) => {
        
        let {job_no, receive_date, qty, remarks} = jobOrderData;
        
        if (jobOrderData.job_order_qty_limit > 0) {
            // OBJECT CREATE & PUSH IN AN ARRAY
            let clientStockDetails_arr = [];
            let clientStockDetails_obj = {};
            clientStockDetails_obj.job_no = job_no;
            clientStockDetails_obj.receive_date = receive_date;
            clientStockDetails_obj.qty = qty;
            clientStockDetails_obj.remarks = remarks;

            if ((parseInt(jobOrderData.orderQty) + parseInt(clientStockDetails_obj.qty)) <= parseInt(jobOrderData.job_order_qty_limit)) {
                clientStockDetails_arr.push(clientStockDetails_obj);

                // PUSH  CLIENT STOCKS MAIN ARRAY
                if (clientStockDetails.length > 0) {
                    // CHECKING FOR DUPLICATE ENTRY
                    let isExist = clientStockDetails.some(item => item.job_no === clientStockDetails_obj.job_no);
                    if (isExist === false) {
                        setClientStockDetails([
                            ...clientStockDetails,
                            ...clientStockDetails_arr
                        ]);
                        // TOTAL ORDER QTY
                        setJobOrderData({
                            orderQty: parseInt(jobOrderData.orderQty) + parseInt(clientStockDetails_obj.qty)
                        });
                    } else {
                        SweetAlert.fire({title:"Warning", text:"Stock from this job already exists!", icon:"warning"});
                    }
                } else { //FIRST TIME PUSH
                    setClientStockDetails([
                        ...clientStockDetails,
                        ...clientStockDetails_arr
                    ]);
                    // TOTAL ORDER QTY
                    setJobOrderData({
                        orderQty: parseInt(jobOrderData.orderQty) + parseInt(clientStockDetails_obj.qty)
                    });
                }
                // EMPTY CLIENT STOCKS ALL FIELDS
                setJobOrderData({
                    //supplier_id  : '',    
                    //job_no          : '',
                    receive_date    : '',
                    qty             : '',
                    remarks         : '',
                });
            } else {
                SweetAlert.fire({title:"Warning", text:"You can't Cross Job Order Cyl Qty Limit", icon:"warning"});
            }
        } else {
            SweetAlert.fire({title:"Warning", text:"Your Job Order Cyl Qty is 0, Please Select Job No first", icon:"warning"});
        }
    }
    // FOR REMOVE CLIENT STOCKS SINGLE DATA FROM CLIENT STOCKS ARRAY
    const removeClientStockHandler = (jobNo, thisRowQty) => {
        //console.log(supplierId);
        setJobOrderData({
            orderQty: parseInt(jobOrderData.orderQty) - parseInt(thisRowQty)
        })
        let availableClientStock = clientStockDetails.filter((item) => item.job_no != jobNo );
        // let availableClientStock = clientStockDetails.filter((item) => item.supplier_id != supplierId );
        setClientStockDetails([
            ...availableClientStock
        ]);
    }
    // FINALLY SUBMIT FOR SAVE TO SERVER
    const submitHandler = (data, e) => {
        data.job_order_id = dropdownData.job_order_id[0].id;
        data.order_date = jobOrderData.order_date;
        data.totalOrderQty = jobOrderData.orderQty;
        data.base_order_details = clientStockDetails;

        if (jobOrderData.orderQty == jobOrderData.job_order_qty_limit) {
            userPostMethod(CLIENT_STOCK_RSURL, data)
                .then(response => {
                    console.log(response);
                    if (response.data.status == 1) {
                        toast.success(response.data.message)
                        e.target.reset();
                    } else {
                        toast.error(response.data.message)
                    }
                })
            .catch(error => toast.error(error))
        } else {
            SweetAlert.fire({title:"Warning", text:"Please order all required cylinder qty!", icon:"warning"});
        }
    }

    var menuId = 0;
    if (props.location.state === undefined) {
        var menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5>Base Order Form</h5>
                                    </div>
                                    <div className="col-md-6">
                                        <PanelRefreshIcons panelRefresh={pageRefreshHandler} />
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                        <div className="">

                                            <div className="col-md-5">
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label" htmlFor="job_order_id">Job No</label>
                                                    <div className="col-sm-10">
                                                        <Typeahead
                                                            id="job_order_id"
                                                            name="job_order_id"
                                                            labelKey={option => `${option.name}`}
                                                            options={typeheadOptions['job_orders']}
                                                            placeholder="Select Job No..."
                                                            onChange={(e) => dropDownChange(e, 'job_order_id')}
                                                            selected={dropdownData.job_order_id}
                                                            disabled={job_order_id != null ? 'disabled' : ''}
                                                            ref={register({
                                                                required: 'Job No Field Required'
                                                            })}
                                                        />
                                                        {errors.job_order_id && <p className='text-danger'>{errors.job_order_id.message}</p>}
                                                    </div>
                                                </div>
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
                                                                            <td>{jobOrderData.entry_date}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td  align="right">Job Name</td>
                                                                            <td>:</td>
                                                                            <td>{jobOrderData.job_name}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td align="right">Client Name</td>
                                                                            <td>:</td>
                                                                            <td>{jobOrderData.client_name}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td align="right">Printer Name</td>
                                                                            <td>:</td>
                                                                            <td>{jobOrderData.printer_name}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td align="right">Job Type</td>
                                                                            <td>:</td>
                                                                            <td>{jobOrderData.job_type}</td>
                                                                        </tr>
                                                                    </div>
                                                                
                                                                    <div className="col-md-4">
                                                                        
                                                                        <tr>
                                                                            <td align="right">Agreement Date</td>
                                                                            <td>:</td>
                                                                            <td>{jobOrderData.agreement_date}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td align="right">Face Length</td>
                                                                            <td>:</td>
                                                                            <td>{jobOrderData.fl}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td align="right">Circumference</td>
                                                                            <td>:</td>
                                                                            <td>{jobOrderData.cir}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td align="right">Total SA</td>
                                                                            <td>:</td>
                                                                            <td>{jobOrderData.total_surface_area}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td align="right">Total Cyl</td>
                                                                            <td>:</td>
                                                                            <td>{jobOrderData.total_cylinder_qty}</td>
                                                                        </tr>
                                                                    </div>
                                                                </div>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </pre>
                                            </div>
                                        </div>

                                        <div className="row m-t-10 m-l-10">
                                            <fieldset className="border" style={{width: '98%'}}> 
                                                <legend className="w-auto text-left">Client Stock</legend>
                                                <div className="col-md-12"> 

                                                    <div className="form-row">

                                                        <div className="col-md-2 mb-3">
                                                            <label for="job_no">Job No.</label>
                                                            <input 
                                                                className="form-control" 
                                                                id="job_no" 
                                                                name="job_no" 
                                                                type="text"
                                                                placeholder="Job No." 
                                                                onChange={clientStocksInputHander}
                                                                readOnly
                                                                value={jobOrderData.job_no}
                                                            />
                                                        </div>
                                                        <div className="col-md-2 mb-3">
                                                            <label for="receive_date">Receive Date</label>
                                                            <input 
                                                                className="form-control" 
                                                                id="receive_date" 
                                                                name="receive_date" 
                                                                type="date" 
                                                                placeholder="Receive Date" 
                                                                onChange={clientStocksInputHander}
                                                                value={jobOrderData.receive_date}
                                                            />
                                                        </div>
                                                        <div className="col-md-2 mb-3">
                                                            <label for="qty">Qty</label>
                                                            <input 
                                                                className="form-control" 
                                                                id="qty" 
                                                                name="qty" 
                                                                type="number" 
                                                                placeholder="Qty" 
                                                                onChange={clientStocksInputHander}
                                                                value={jobOrderData.qty}
                                                            />
                                                        </div>


                                                        <div className="col-md-2 mb-3">
                                                            <label for="remarks">Remarks</label>
                                                            <input 
                                                                className="form-control" 
                                                                id="remarks" 
                                                                name="remarks" 
                                                                type="text" 
                                                                placeholder="Remarks" 
                                                                onChange={clientStocksInputHander}
                                                                value={jobOrderData.remarks}
                                                            />
                                                        </div>

                                                        <div className="col-md-1 mb-4 m-t-5">
                                                            <span className="btn btn-primary btn-sm mr-1 m-t-20" type="add" onClick={addOrderDetailsHandler}>Add</span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </fieldset>
                                        </div>

                                        <div className="row m-t-10 m-l-10">
                                            <fieldset className="border" style={{width: '98%'}}> 
                                                <legend className="w-auto text-left">Added Client Stocks</legend>
                                                <div className="col-md-12">
                                                    <table className="table table-bordered" style={{width: '100%'}}>
                                                        <thead>
                                                            <tr>
                                                                {/* <th scope="col" width="15%">Issue To</th> */}
                                                                {/* <th scope="col" width="20%">Job Ref No</th> */}
                                                                <th scope="col" width="10%">Job No.</th>
                                                                <th scope="col" width="20%">Receive Date</th>
                                                                <th scope="col" width="10%">Qty</th>
                                                                <th scope="col" width="25%">Remarks</th>
                                                                <th scope="col" width="10%">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                clientStockDetails.length > 0 ?
                                                                <>
                                                                    {clientStockDetails.map((item, index)=> 
                                                                        (
                                                                        <tr key={index}>
                                                                            {/* <th scope="row">{item.supplier_id_name}</th> */}
                                                                            <td>{item.job_no}</td>
                                                                            <td>{item.receive_date}</td>
                                                                            <td>{item.qty}</td>
                                                                            <td>{item.remarks}</td>
                                                                            <td align="center">
                                                                                <span onClick={()=>removeClientStockHandler(item.job_no, item.qty)}>
                                                                                    <i className="icon-close" style={{ width: 25, fontSize: 16, padding: 0, color: '#e4566e', cursor: 'pointer' }}
                                                                                    ></i>
                                                                                </span>
                                                                            </td>
                                                                        </tr>
                                                                        )
                                                                    )}
                                                                </>
                                                                : <tr><td colSpan="6" className="text-center">No data Added</td></tr>
                                                            }
                                                        </tbody>
                                                        <tfoot>
                                                            <tr>
                                                                <td colSpan="2" align="right">Qty = </td>
                                                                <td>{jobOrderData.orderQty}</td>
                                                                <td colSpan="3"></td>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                </div>
                                            </fieldset>
                                        </div>

                                        <SubmitButton link="clientStock/index" menuId={ menuId } offset="4" />
                                    </form>
                                )}
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Add;