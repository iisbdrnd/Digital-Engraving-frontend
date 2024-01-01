import React, { Fragment, useState, useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from 'react-hook-form'
import { Typeahead,ClearButton } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { PanelRefreshIcons, SubmitButton } from '../../common/GlobalButton';
import { userGetMethod, userPostMethod } from '../../../api/userAction';
import { DEL_STOCK_RSURL, GET_CLIENT_STOCK_JOB_RSURL, JOB_ORDER_DETAILS } from '../../../api/userUrl';
import SweetAlert from 'sweetalert2';
import { placeHolderText } from '../../common/GlobalComponent';
import { trStyleNormal } from '../jobAgreement/Create';
import moment from 'moment';

const Add = (props) => {
    const { handleSubmit, register, errors, reset } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [dropdownData, setDropdownData] = useState({});
    const [typeheadOptions, setTypeheadOptions] = useState({
        'job_orders' : []
    });
    const [delStockDetails, setDelStockDetails] = useState([]);
    const [selectedValue,setSelectedValue] = useState([])
    const [delStockText,setDelStockText] = useState([])

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
            id                 : '',
            entry_date         : '',
            agreement_date     : '',
            total_cylinder_qty : '',
            client_id          : '',
            printer_id         : '',
            job_order_qty_limit: 0,
            orderQty           : 0
        }
    );
    let job_order_id = props.location.state.params.job_order_id ? props.location.state.params.job_order_id : null;
    useEffect(() => {
        pageRefreshHandler(job_order_id);
    },[]);

    const handleOnChangeInput = (text) => {
        setDelStockText(text)
    }
    useEffect(()=>{
        if (job_order_id == null && delStockText.length > 3) {
            userGetMethod(`${GET_CLIENT_STOCK_JOB_RSURL}?searchText=${delStockText}`)
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
                                'job_order_qty_limit': order.total_cylinder_qty
                            })
                        }
                    })
                }
                setTypeheadOptions(
                    (prevstate) => ({
                        ...prevstate,
                        ['job_orders']: jobOrderOptions,
                    })
                );
                setDelStockDetails([]);

                setIsLoading(false);
            });
        }
    },[delStockText])

    const pageRefreshHandler = (job_order_id = null) => {
        setIsLoading(true);
        
           if (job_order_id == null && delStockText.length < 4) {
            userGetMethod(`${DEL_STOCK_RSURL}/create`)
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
                                'job_order_qty_limit': order.total_cylinder_qty
                            })
                        }
                    })
                }
                setTypeheadOptions(
                    (prevstate) => ({
                        ...prevstate,
                        ['job_orders']: [],
                    })
                );
                setDelStockDetails([]);

                setIsLoading(false);
            });
           }
        
    }
    // FOR Typeahead DATA INPUT
    const dropDownChange = (event, stateName) => {
        if(event.length > 0){
            const selectedValue = event[0].id;
            const selectedValueName = event[0].name;
            setDropdownData(
                (prevstate) => ({
                    ...prevstate,
                    job_order_id: selectedValue,
                    [stateName + '_name']: selectedValueName,
                })
            );
            if (stateName == 'job_order_id') {
                setSelectedValue(event)
                userGetMethod(`${JOB_ORDER_DETAILS}?jobOrderId=${selectedValue}`)
                    .then(response => {
                        let { id, job_name, job_no, printer_name, job_type, fl, cir, total_surface_area, client_name, total_cylinder_qty, entry_date, agreement_date, client_id, printer_id } = response.data.jobOrderDetails;
                        setJobOrderData({
                            'job_order_qty_limit': total_cylinder_qty,
                            'job_name'          : job_name,
                            'job_no'            : job_no,
                            'printer_name'      : printer_name,
                            'job_type'          : job_type,
                            'fl'                : fl,
                            'cir'               : cir,
                            'total_surface_area': total_surface_area,
                            'client_name'       : client_name,
                            'id'                : id,
                            'entry_date'        : entry_date,
                            'agreement_date'    : agreement_date,
                            'total_cylinder_qty': total_cylinder_qty,
                            'client_id'         : client_id,
                            'printer_id'        : printer_id
                        });
                    });
            }
        } 

    }
    // FOR DEL STOCKS DATA INPUT
    const delStocksInputHander = (event) => {
        setJobOrderData(
            {[event.target.name] : event.target.value},
        );
    }
    // FOR DEL STOCKS ARRAY READY
    const addOrderDetailsHandler = (event) => {
        let {job_no, receive_date, qty, remarks,client_name, id, total_cylinder_qty, client_id, printer_id} = jobOrderData;
        if(!receive_date || job_no == '' || !qty){
            toast.warn("Please enter all required field");
            return;
        }
        
        if (jobOrderData.job_order_qty_limit > 0) {
            // OBJECT CREATE & PUSH IN AN ARRAY
            let delStockDetails_arr = [];
            let delStockDetails_obj = {};
            delStockDetails_obj.job_no = job_no;
            delStockDetails_obj.receive_date = receive_date;
            delStockDetails_obj.qty = qty;
            delStockDetails_obj.remarks = remarks;
            delStockDetails_obj.client_name = client_name;
            delStockDetails_obj.id = id;
            delStockDetails_obj.total_cylinder_qty = total_cylinder_qty;
            delStockDetails_obj.client_id = client_id;
            delStockDetails_obj.printer_id = printer_id;

            if ((parseInt(delStockDetails_obj.qty)) <= parseInt(jobOrderData.job_order_qty_limit)) {
                delStockDetails_arr.push(delStockDetails_obj);

                // PUSH  DEL STOCKS MAIN ARRAY
                if (delStockDetails.length > 0) {
                    // CHECKING FOR DUPLICATE ENTRY
                    let isExist = delStockDetails.some(item => item.job_no === delStockDetails_obj.job_no);
                    if (isExist === false) {
                        setDelStockDetails([
                            ...delStockDetails,
                            ...delStockDetails_arr
                        ]);
                        // TOTAL ORDER QTY
                        setJobOrderData({
                            orderQty: parseInt(jobOrderData.orderQty) + parseInt(delStockDetails_obj.qty)
                        });
                    } else {
                        SweetAlert.fire({title:"Warning", text:"Stock from this job already exists!", icon:"warning"});
                    }
                } else { //FIRST TIME PUSH
                    setDelStockDetails([
                        ...delStockDetails,
                        ...delStockDetails_arr
                    ]);
                    // TOTAL ORDER QTY
                    setJobOrderData({
                        orderQty: parseInt(jobOrderData.orderQty) + parseInt(delStockDetails_obj.qty)
                    });
                }
                // EMPTY DEL STOCKS ALL FIELDS
                setJobOrderData({
                    job_no          :'',
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
    // FOR REMOVE DEL STOCKS SINGLE DATA FROM DEL STOCKS ARRAY
    const removeDelStockHandler = (jobNo, thisRowQty) => {
        //console.log(supplierId);
        setJobOrderData({
            orderQty: parseInt(jobOrderData.orderQty) - parseInt(thisRowQty)
        })
        let availableDelStock = delStockDetails.filter((item) => item.job_no != jobNo );
        setDelStockDetails([
            ...availableDelStock
        ]);
    }
    // FINALLY SUBMIT FOR SAVE TO SERVER
    const submitHandler = (data, e) => {
        data.totalOrderQty = jobOrderData.orderQty;
        data.del_stock_details = delStockDetails;

        // if (jobOrderData.orderQty <= jobOrderData.job_order_qty_limit) {
            userPostMethod(DEL_STOCK_RSURL, data)
                .then(response => {
                    console.log(response);
                    if (response.data.status == 1) {
                        toast.success(response.data.message)
                        clearFormField(e);
                        e.target.reset();
                    } else {
                        toast.error(response.data.message)
                    }
                })
            .catch(error => toast.error(error))
        // } else {
        //     SweetAlert.fire({title:"Warning", text:"Please order all required cylinder qty!", icon:"warning"});
        // }
    }

    const clearFormField = (event) => {
        setJobOrderData({
            'job_order_qty_limit': null,
            'job_name': null,
            'job_no': '',
            'printer_name': null,
            'job_type': null,
            'fl': null,
            'cir': null,
            'total_surface_area': null,
            'client_name': null,
            'id': null,
            'entry_date': null,
            'agreement_date': null,
            'total_cylinder_qty': null,
            'client_id': null,
            'printer_id': null,
            'orderQty': 0
        });
        setSelectedValue([]);
        setDelStockDetails([]);
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
                                        <h5>Del Stock Form</h5>
                                    </div>
                                    <div className="col-md-6">
                                        {/* <PanelRefreshIcons panelRefresh={pageRefreshHandler} /> */}
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
                                                            placeholder={placeHolderText}
                                                            onChange={(e) => { dropDownChange(e, 'job_order_id') }}
                                                            onInputChange={(text)=>handleOnChangeInput(text)}
                                                            inputProps={{ required: true }}
                                                            selected={selectedValue}
                                                            disabled={job_order_id != null ? 'disabled' : ''}
                                                            // ref={register({
                                                            //     required: 'Job No Field Required'
                                                            // })}
                                                            {...register('job_order_id')}
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
                                                                        <tr style={trStyleNormal}>
                                                                            <td  align="right">Order Date</td>
                                                                            <td>:</td>
                                                                            <td>{jobOrderData.entry_date}</td>
                                                                        </tr>
                                                                        <tr style={trStyleNormal}>
                                                                            <td  align="right">Job Name</td>
                                                                            <td>:</td>
                                                                            <td>{jobOrderData.job_name}</td>
                                                                        </tr>
                                                                        <tr style={trStyleNormal}>
                                                                            <td align="right">Client Name</td>
                                                                            <td>:</td>
                                                                            <td>{jobOrderData.client_name}</td>
                                                                        </tr>
                                                                        <tr style={trStyleNormal}>
                                                                            <td align="right">Printer Name</td>
                                                                            <td>:</td>
                                                                            <td>{jobOrderData.printer_name}</td>
                                                                        </tr>
                                                                        <tr style={trStyleNormal}>
                                                                            <td align="right">Job Type</td>
                                                                            <td>:</td>
                                                                            <td>{jobOrderData.job_type}</td>
                                                                        </tr>
                                                                    </div>
                                                                
                                                                    <div className="col-md-4">
                                                                        
                                                                        <tr style={trStyleNormal}>
                                                                            <td align="right">Agreement Date</td>
                                                                            <td>:</td>
                                                                            <td>{jobOrderData.agreement_date}</td>
                                                                        </tr>
                                                                        <tr style={trStyleNormal}>
                                                                            <td align="right">Face Length</td>
                                                                            <td>:</td>
                                                                            <td>{jobOrderData.fl}</td>
                                                                        </tr>
                                                                        <tr style={trStyleNormal}>
                                                                            <td align="right">Circumference</td>
                                                                            <td>:</td>
                                                                            <td>{jobOrderData.cir}</td>
                                                                        </tr>
                                                                        <tr style={trStyleNormal}>
                                                                            <td align="right">Total SA</td>
                                                                            <td>:</td>
                                                                            <td>{jobOrderData.total_surface_area}</td>
                                                                        </tr>
                                                                        <tr style={trStyleNormal}>
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
                                                <legend className="w-auto text-left">Del Stock</legend>
                                                <div className="col-md-12"> 
                                                    <div className="form-row">
                                                        <div className="col-md-2 mb-3">
                                                            <label for="job_no">Job No.</label>
                                                            <input 
                                                                className="form-control" 
                                                                id="job_no" 
                                                                name="job_no"
                                                                // required 
                                                                type="text"
                                                                placeholder="Job No." 
                                                                onChange={delStocksInputHander}
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
                                                                // required
                                                                type="date" 
                                                                placeholder="Receive Date" 
                                                                onChange={delStocksInputHander}
                                                                value={jobOrderData.receive_date ? jobOrderData.receive_date : moment().format('YYYY-MM-DD')}
                                                            />
                                                        </div>
                                                        <div className="col-md-2 mb-3">
                                                            <label for="qty">Qty</label>
                                                            <input 
                                                                className="form-control" 
                                                                id="qty" 
                                                                name="qty" 
                                                                // required
                                                                type="number" 
                                                                placeholder="Qty" 
                                                                onChange={delStocksInputHander}
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
                                                                onChange={delStocksInputHander}
                                                                value={jobOrderData.remarks}
                                                            />
                                                        </div>
                                                        <input 
                                                            className="form-control" 
                                                            id="client_name" 
                                                            name="client_name" 
                                                            type="hidden"  
                                                            onChange={delStocksInputHander}
                                                            value={jobOrderData.client_name}
                                                        />
                                                        <input 
                                                            className="form-control" 
                                                            id="id" 
                                                            name="id" 
                                                            type="hidden"  
                                                            onChange={delStocksInputHander}
                                                            value={jobOrderData.id}
                                                        />
                                                        <input 
                                                            className="form-control" 
                                                            id="client_id" 
                                                            name="client_id" 
                                                            type="hidden"  
                                                            onChange={delStocksInputHander}
                                                            value={jobOrderData.client_id}
                                                        />
                                                        <input 
                                                            className="form-control" 
                                                            id="printer_id" 
                                                            name="printer_id" 
                                                            type="hidden"  
                                                            onChange={delStocksInputHander}
                                                            value={jobOrderData.printer_id}
                                                        />
                                                        <div className="col-md-1 mb-4 m-t-5">
                                                            <span className="btn btn-primary btn-sm mr-1 m-t-20" type="add" onClick={addOrderDetailsHandler}>Add</span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </fieldset>
                                        </div>

                                        <div className="row m-t-10 m-l-10">
                                            <fieldset className="border" style={{width: '98%'}}> 
                                                <legend className="w-auto text-left">Added Del Stocks</legend>
                                                <div className="col-md-12">
                                                    <table className="table table-bordered" style={{width: '100%'}}>
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" width="10%">Job No.</th>
                                                                <th scope="col" width="20%">Receive Date</th>
                                                                <th scope="col" width="10%">Qty</th>
                                                                <th scope="col" width="25%">Remarks</th>
                                                                <th scope="col" width="10%">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                delStockDetails.length > 0 ?
                                                                <>
                                                                    {delStockDetails.map((item, index)=> 
                                                                        (
                                                                        <tr key={index}>
                                                                            <td>{item.job_no}</td>
                                                                            <td>{item.receive_date}</td>
                                                                            <td>{item.qty}</td>
                                                                            <td>{item.remarks}</td>
                                                                            <td align="center">
                                                                                <span onClick={()=>removeDelStockHandler(item.job_no, item.qty)}>
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

                                        <SubmitButton link="delStock/index" menuId={ menuId } offset="4" />
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