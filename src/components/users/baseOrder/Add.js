import React, { Fragment, useState, useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from 'react-hook-form'
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { PanelRefreshIcons, SubmitButton } from '../../common/GlobalButton';
import { userGetMethod, userPostMethod } from '../../../api/userAction';
import { BASE_ORDER_RSURL, JOB_ORDER_DETAILS } from '../../../api/userUrl';
import SweetAlert from 'sweetalert2';

const Add = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [dropdownData, setDropdownData] = useState({});
    const [typeheadOptions, setTypeheadOptions] = useState({});
    const [baseOrderDetails, setBaseOrderDetails] = useState([]);
    const [refDisabled, setRefDisabled] = useState(true);
    const [stockdel, setStockdel] = useState(false);
    const [stockClient, setStockClient] = useState(false);
    const [clientStockDetails, setClientStockDetails] = useState();
    const [delStockDetails, setDelStockDetails] = useState();
    const [addLimit, setaddLimit] = useState();
    const [jobOrderDetails, setJobOrderDetails] = useState();
    const [jobId,setJobId] = useState();

    let [jobOrderData, setJobOrderData] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            order_date         : new Date().toLocaleDateString(),
            supplier_id        : '',
            job_ref_id         : '',
            delivery_date      : '',
            qty                : '',
            remarks            : '',
            job_order_qty_limit: 0,
            orderQty           : 0,
        }
    );
    let job_order_id = props.location.state.params.job_order_id ? props.location.state.params.job_order_id : null;
    useEffect(() => {
        pageRefreshHandler(job_order_id);
        setJobId(job_order_id);
    },[]);

    const pageRefreshHandler = (job_order_id = null) => {
        setIsLoading(true);
        userGetMethod(`${BASE_ORDER_RSURL}/create`)
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
                            setaddLimit( order.total_cylinder_qty);
                        }
                    })
                }
                // FOR SUPPLIERS
                let supplierOptions = [];
                if (response.data.suppliers && response.data.suppliers.length > 0) {
                    response.data.suppliers.map(order => 
                    {
                        let supplierObj = {};
                        supplierObj.id = order.id;
                        supplierObj.name = `[${order.supplier_id}] ` + order.name;
                        supplierOptions.push(supplierObj);
                    })
                }
                // For delstocks
                let delStockOptions = [];
                if(response.data.delStocks && response.data.delStocks.length > 0) {
                    response.data.delStocks.map((item) => {
                        let delObj = {};
                        Object.assign(delObj, {id: item['job_no'],name:`[${item.job_no}] ` + item['job_name']});
                        delStockOptions.push(delObj);
                    })
                }
                // For client stock
                let clientStockOptions =[];
                if(response.data.clientStocks && response.data.clientStocks.length > 0) {
                    response.data.clientStocks.map((item) => {
                        let clientObj = {};
                        Object.assign(clientObj, {id: item['job_no'],name:`[${item.job_no}] ` +item['job_name']});
                        clientStockOptions.push(clientObj);
                    })
                }
                setClientStockDetails(response.data.clientStocks);
                setDelStockDetails(response.data.delStocks);
                setJobOrderDetails(response.data.jobOrders);
                setTypeheadOptions(
                    (prevstate) => ({
                        ...prevstate,
                        ['job_orders']: jobOrderOptions,
                        ['suppliers']: supplierOptions,
                        ['del_stocks']: delStockOptions,
                        ['client_stocks']: clientStockOptions
                    })
                );
                setBaseOrderDetails([]);

                setIsLoading(false);
            });
    }

    // FOR Typeahead DATA INPUT
    const dropDownChange = (event, stateName) => {
        if(event.length > 0){
            const selectedValue = event[0].id;
            if(stateName === 'job_order_id'){
                setJobId(selectedValue)
            }
            if(stateName == 'supplier_id' && (selectedValue == 7 || selectedValue == 8)){
                selectedValue == 7 ? setStockdel(true) : setStockdel(false);
                selectedValue == 8 ? setStockClient(true) : setStockClient(false);
                setRefDisabled(false);
            }else if(stateName == 'supplier_id' && (selectedValue != 7 && selectedValue != 8)){
                userGetMethod(`${JOB_ORDER_DETAILS}?jobOrderId=${jobId}`)
                .then(response => {
                    let { total_cylinder_qty } = response.data.jobOrderDetails;
                    // setJobOrderData({
                    //     'job_order_qty_limit' : total_cylinder_qty,
                    // });
                    setaddLimit( total_cylinder_qty);
                });
                setRefDisabled(true);
                setStockdel(true);
                setStockClient(true);

            }
            const selectedValueName = event[0].name;
            var obj={
                id : selectedValue,
                name: selectedValueName
            }
            setDropdownData(
                (prevstate) => ({
                    ...prevstate,
                   [stateName]:[obj]
                })
            );
            if (stateName === 'job_order_id') {
                userGetMethod(`${JOB_ORDER_DETAILS}?jobOrderId=${selectedValue}`)
                    .then(response => {
                        let { total_cylinder_qty } = response.data.jobOrderDetails;
                        setJobOrderData({
                            'job_order_qty_limit' : total_cylinder_qty,
                        });
                    });
            }
        } 

    }
    console.log(dropdownData['supplier_id']);
    // FOR ORDER DETAILS DATA INPUT
    const orderDetailsInputHander = (event) => {
        console.log(event.target.name, event.target.value);
        if (event.target.name == 'job_ref_id') {
            if (stockClient) {
                clientStockDetails.map((item) => {
                    console.log(item);
                    if (event.target.value == item?.job_no) {
                        setaddLimit(item?.total_cylinder_qty);
                        // setJobOrderData({
                        //     'job_order_qty_limit': item?.total_cylinder_qty,
                        // });
                    }
                })
            } else if (stockdel) {
                delStockDetails.map((item) => {
                    if (event.target.value == item?.job_no) {
                        setaddLimit(item?.total_cylinder_qty);
                        // setJobOrderData({
                        //     'job_order_qty_limit': item?.total_cylinder_qty,
                        // });
                    }
                })
            } 
        }
        setJobOrderData(
            {[event.target.name] : event.target.value},
        );
    }
    console.log(jobOrderData,addLimit);
    // FOR ORDER DETAILS ARRAY READY
    const addOrderDetailsHandler = (event) => {
        
        let {job_ref_id, delivery_date, qty, remarks} = jobOrderData;
        
        if (dropdownData.supplier_id === '' || delivery_date === '' || qty == '' || qty <= 0) {
            SweetAlert.fire({title:"Warning", text:"Please Fill up all details", icon:"warning"});
        } else {
            if (jobOrderData.job_order_qty_limit > 0) {
                // OBJECT CREATE & PUSH IN AN ARRAY
                let baseOrderDetails_arr = [];
                let baseOrderDetails_obj = {};
                baseOrderDetails_obj.supplier_id = dropdownData.supplier_id[0].id;
                baseOrderDetails_obj.supplier_id_name = dropdownData.supplier_id[0].name;
                baseOrderDetails_obj.job_ref_id = job_ref_id;
                baseOrderDetails_obj.delivery_date = delivery_date;
                baseOrderDetails_obj.qty = qty;
                baseOrderDetails_obj.remarks = remarks;
    
                // if((parseInt(baseOrderDetails_obj.qty) <= addLimit) && (parseInt(jobOrderData.orderQty)+(parseInt(baseOrderDetails_obj.qty) <= parseInt(jobOrderData.job_order_qty_limit))) 
                if((parseInt(baseOrderDetails_obj.qty) <= addLimit) && (parseInt(jobOrderData.orderQty)+parseInt(baseOrderDetails_obj.qty) <= parseInt(jobOrderData.job_order_qty_limit))){
                    baseOrderDetails_arr.push(baseOrderDetails_obj);
                    // PUSH BASE ORDER DETAILS MAIN ARRAY
                    if (baseOrderDetails.length > 0) {
                        // CHECKING FOR DUPLICATE ENTRY
                        let isExist = baseOrderDetails.some(item => item.supplier_id === baseOrderDetails_obj.supplier_id);
                        if (isExist === false) {
                            setBaseOrderDetails([
                                ...baseOrderDetails,
                                ...baseOrderDetails_arr
                            ]);
                            // TOTAL ORDER QTY
                            setJobOrderData({
                                orderQty: parseInt(jobOrderData.orderQty) + parseInt(baseOrderDetails_obj.qty)
                            });
                        } else {
                            SweetAlert.fire({title:"Warning", text:"Order from this supplier already exists!", icon:"warning"});
                        }
                    } else { //FIRST TIME PUSH
                        setBaseOrderDetails([
                            ...baseOrderDetails,
                            ...baseOrderDetails_arr
                        ]);
                        // TOTAL ORDER QTY
                        setJobOrderData({
                            orderQty: parseInt(jobOrderData.orderQty) + parseInt(baseOrderDetails_obj.qty)
                        });
                    }
                    // EMPTY ORDER DETAILS ALL FIELDS
                    setJobOrderData({
                        supplier_id  : '',
                        job_ref_id   : '',
                        delivery_date: '',
                        qty          : '',
                        remarks      : '',
                    });
                } else {
                    SweetAlert.fire({title:"Warning", text:"You can't Cross Job Order Cyl Qty Limit", icon:"warning"});
                }
            } else {
                SweetAlert.fire({title:"Warning", text:"Your Job Order Cyl Qty is 0, Please Select Job No first", icon:"warning"});
            }

        }
    }
    // FOR REMOVE ORDER DETAILS SINGLE DATA FROM ORDER DETAILS ARRAY
    const removeBaseOrderHandler = (supplierId, thisRowQty) => {
        console.log(supplierId);
        setJobOrderData({
            orderQty: parseInt(jobOrderData.orderQty) - parseInt(thisRowQty)
        })
        let availableBaseOrder = baseOrderDetails.filter((item) => item.supplier_id != supplierId );
        setBaseOrderDetails([
            ...availableBaseOrder
        ]);
    }
    // FINALLY SUBMIT FOR SAVE TO SERVER
    const submitHandler = (data, e) => {
        data.job_order_id = dropdownData.job_order_id[0].id;
        data.order_date = jobOrderData.order_date;
        data.totalOrderQty = jobOrderData.orderQty;
        data.base_order_details = baseOrderDetails;

        // if (jobOrderData.orderQty == jobOrderData.job_order_qty_limit) {
            userPostMethod(BASE_ORDER_RSURL, data)
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
        // } else {
        //     SweetAlert.fire({title:"Warning", text:"Please order all required cylinder qty!", icon:"warning"});
        // }
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
                                        <div className="row">

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
                                                            inputProps={{ required: true }}
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

                                            <div className="col-md-3">
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="total_cylinder_qty">Cyl Qty Limit</label>
                                                    <div className="col-sm-6">
                                                        <input 
                                                            className="form-control" 
                                                            id="total_cylinder_qty" 
                                                            name="total_cylinder_qty"
                                                            required 
                                                            readOnly={'readonly'}
                                                            value={jobOrderData.job_order_qty_limit}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="order_date">Order Date</label>
                                                    <div className="col-sm-6">
                                                        <input 
                                                            className="form-control" 
                                                            id="order_date" 
                                                            name="order_date" 
                                                            required
                                                            readOnly={'readonly'}
                                                            value={jobOrderData.order_date}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="row m-t-10 m-l-10">
                                            <fieldset className="border" style={{width: '98%'}}> 
                                                <legend className="w-auto text-left">Base Order</legend>
                                                <div className="col-md-12"> 

                                                    <div className="form-row">
                                                        <div className="col-md-2 mb-3">
                                                            <label for="supplier_id">Issue To</label>
                                                            <Typeahead
                                                                id="supplier_id"
                                                                name="supplier_id"
                                                                labelKey={option => `${option.name}`}
                                                                options={typeheadOptions['suppliers']}
                                                                placeholder="Select Issue To"
                                                                onChange={(e) => dropDownChange(e, 'supplier_id')}
                                                                inputProps={{ required: true }}
                                                                defaultValue={jobOrderData.supplier_id}
                                                            />
                                                        </div>

                                                        <div className="col-md-2 mb-3">
                                                            <label for="job_ref_id">Job Ref No</label>
                                                            <select 
                                                                className="form-control" 
                                                                id="job_ref_id" 
                                                                name="job_ref_id"
                                                                placeholder="Job Ref" 
                                                                onChange={orderDetailsInputHander} 
                                                                disabled={refDisabled}
                                                                >
                                                                <option value="">Select one...</option>
                                                                {
                                                                   stockdel && typeheadOptions['del_stocks'].map((item, i) => <option key={i} value={item['id']}>{item['name']}</option>)
                                                                }
                                                                 {
                                                                   stockClient && typeheadOptions['client_stocks'].map((item, i) => <option key={i} value={item['id']}>{item['name']}</option>)
                                                                }
                                                            </select>
                                                        </div>

                                                        <div className="col-md-2 mb-3">
                                                            <label for="qty">Qty<span>(Order-limit <span className="text-danger">{addLimit}</span>)</span></label>
                                                            <input 
                                                                className="form-control" 
                                                                id="qty" 
                                                                name="qty" 
                                                                // required
                                                                type="number" 
                                                                placeholder="Qty" 
                                                                onChange={orderDetailsInputHander}
                                                                value={jobOrderData.qty}
                                                            />
                                                        </div>

                                                        <div className="col-md-2 mb-3">
                                                            <label for="delivery_date">Delivery Date</label>
                                                            <input 
                                                                className="form-control" 
                                                                id="delivery_date" 
                                                                name="delivery_date"
                                                                // required 
                                                                type="date" 
                                                                placeholder="Delivery Date" 
                                                                onChange={orderDetailsInputHander}
                                                                value={jobOrderData.delivery_date}
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
                                                                onChange={orderDetailsInputHander}
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
                                                <legend className="w-auto text-left">Added Base Orders</legend>
                                                <div className="col-md-12">
                                                    <table className="table table-bordered" style={{width: '100%'}}>
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" width="15%">Issue To</th>
                                                                <th scope="col" width="20%">Job Ref No</th>
                                                                <th scope="col" width="10%">Qty</th>
                                                                <th scope="col" width="20%">Delivery Date</th>
                                                                <th scope="col" width="25%">Remarks</th>
                                                                <th scope="col" width="10%">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                baseOrderDetails.length > 0 ?
                                                                <>
                                                                    {baseOrderDetails.map((item, index)=> 
                                                                        (
                                                                        <tr key={index}>
                                                                            <th scope="row">{item.supplier_id_name}</th>
                                                                            <td>{item.job_ref_id}</td>
                                                                            <td>{item.qty}</td>
                                                                            <td>{item.delivery_date}</td>
                                                                            <td>{item.remarks}</td>
                                                                            <td align="center">
                                                                                <span onClick={()=>removeBaseOrderHandler(item.supplier_id, item.qty)}>
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

                                        <SubmitButton link="baseOrder/index" menuId={ menuId } offset="4" />
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