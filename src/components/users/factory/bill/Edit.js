import React, { Fragment, useEffect, useReducer } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { billAPI } from '../../../../api/userUrl';
import { userGetMethod, userPutMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';

const Edit = (props) => {
    const { handleSubmit, register, errors } = useForm();

    var runningDate = new Date().toISOString().slice(0, 10);

    const [userBillInput, setBillInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            job_order_id: '',
            bill_date: '',
            cyl_rate_status: '',
            job_no: '',
            total_cylinder_qty: '',
            job_name: '',
            job_type: '',
            printer_name: '',
            client_name: '',
            client_phone: '',
            client_address: '',
            circumference: '',
            face_length: '',
            surface_area: '',
            total_surface_area_sqr_cm: '',
            total_surface_area_sqr_inch: '',
            rate_per_cm: '',
            rate_per_inch: '',
            rate_per_cm_total: '',
            rate_per_inch_total: '',
            rate: '',
            grand_total: '',
            challan_no: '',
            finished_date : '',
            type: '',
            isLoading   : true,
            less: 0,
            less_bare_cost: 0,
            add_cost: 0,
            vat_type: 0,
            vat_value: '',
            vat_amount: '',
            net_total: '',
            fixed_amount: '',
            base_total_amount : 0,
        }
    );

    const inputChangeHandler = (e)=>{
        var grand_total = userBillInput.grand_total;

        
        setBillInput({
            [e.target.name]: e.target.value
        });

        if(e.target.name == "less"){
            var less_amount = parseInt(e.target.value);
            var base_total_amount = userBillInput.base_total_amount;
            if(isNaN(less_amount)){
                setBillInput({
                    ['net_total'] : grand_total - base_total_amount,
                });
            }else{
                setBillInput({
                    ['net_total'] : grand_total - parseInt(less_amount) - base_total_amount,
                });
            }
            
        }

        if(e.target.name == "base_total_amount"){
            var less_amount = userBillInput.less;
            var base_total_amount = parseInt(e.target.value);
            if(isNaN(base_total_amount)){
                setBillInput({
                    ['net_total'] : grand_total - less_amount,
                });
            }else{
                setBillInput({
                    ['net_total'] : grand_total - parseInt(less_amount) - base_total_amount,
                });
            }
        }

        if(e.target.name == "add_cost"){
            var less_amount = userBillInput.less;
            var base_total_amount = userBillInput.base_total_amount;
            var add_cost = parseInt(e.target.value);
            if(isNaN(add_cost)){
                setBillInput({
                    ['net_total'] : grand_total - less_amount - base_total_amount,
                });
            }else{
                setBillInput({
                    ['net_total'] : grand_total - less_amount - base_total_amount + add_cost,
                });
            }
        }

        if(e.target.name == "vat_value"){
            var vat_type = userBillInput.vat_type;
            var vat_value = parseInt(e.target.value);
            if(vat_type == 1){
                var calculate_vat = (grand_total * vat_value) / 100;
                setBillInput({
                    ['vat_amount'] : calculate_vat,
                });
            }
        }

        if(e.target.name == "vat_type"){
            var vat_type = e.target.value;
            if(vat_type == 0){
                console.log(vat_type);
                setBillInput({
                    ['vat_value'] : "0.00",
                    ['vat_amount'] : "0.00",
                });
            }else{
                var vat_value = userBillInput.vat_value;
                var calculate_vat = (grand_total * vat_value) / 100;
                setBillInput({
                    ['vat_amount'] : calculate_vat,
                });
            }
        }



    }

    const job_order_id = props.match.params.challanId;


    useEffect(() => {
        userGetMethod(`${billAPI}/${job_order_id}/edit`)
            .then(response => {

                console.log('response', response);
                var rate_per_cm_total_amount;
                if(response.data.jobOrders_details.cyl_rate_status == 2) {
                    rate_per_cm_total_amount = response.data.jobOrders_details.total_surface_area * response.data.jobOrders_details.per_sqr_amount;
                    rate_per_cm_total_amount = rate_per_cm_total_amount.toFixed(2);
                }
                if(response.data.jobOrders_details.cyl_rate_status == 1){
                    rate_per_cm_total_amount = response.data.jobOrders_details.fixed_amount.toFixed(2);
                }
                if(response.data.jobOrders_details.cyl_rate_status == 0){
                    rate_per_cm_total_amount = parseInt(0);
                }
                

                var total_surface_area_sqr_inch_total = response.data.jobOrders_details.total_surface_area * 0.393701;
                total_surface_area_sqr_inch_total = total_surface_area_sqr_inch_total.toFixed(2);

                var total_rate_per_cm = response.data.jobOrders_details.per_sqr_amount / 0.393701;
                total_rate_per_cm = total_rate_per_cm.toFixed(2);

                var total_per_inch_total_amount = total_surface_area_sqr_inch_total * total_rate_per_cm;
                total_per_inch_total_amount = total_per_inch_total_amount.toFixed(2);

                var per_chylider_rate = rate_per_cm_total_amount / response.data.jobOrders_details.total_cylinder_qty;
                per_chylider_rate = per_chylider_rate.toFixed(2);


                setBillInput({
                    job_order_id: job_order_id,
                    bill_date: runningDate,
                    cyl_rate_status: response.data.jobOrders_details.cyl_rate_status,
                    job_no : response.data.jobOrders_details.job_no,
                    total_cylinder_qty : response.data.jobOrders_details.total_cylinder_qty,
                    job_name : response.data.jobOrders_details.job_name,
                    job_type : response.data.jobOrders_details.job_type,
                    printer_name : response.data.jobOrders_details.printer_name,
                    client_name : response.data.jobOrders_details.client_name,
                    client_phone : response.data.jobOrders_details.client_phone,
                    client_address : response.data.jobOrders_details.client_address,
                    circumference : response.data.jobOrders_details.circumference,
                    face_length : response.data.jobOrders_details.face_length,
                    surface_area : response.data.jobOrders_details.surface_area,
                    base_total_amount : response.data.base_total_amount,

                    total_surface_area_sqr_cm : response.data.jobOrders_details.total_surface_area,
                    total_surface_area_sqr_inch : total_surface_area_sqr_inch_total,

                    rate_per_cm: response.data.jobOrders_details.per_sqr_amount,
                    rate_per_inch: total_rate_per_cm,

                    rate_per_cm_total: rate_per_cm_total_amount,
                    rate_per_inch_total: Math.round(total_per_inch_total_amount).toFixed(2),

                    rate:per_chylider_rate,
                    grand_total: rate_per_cm_total_amount,
                    net_total : rate_per_cm_total_amount -  response.data.base_total_amount,

                    challan_no: response.data.challan_details.challan_no,
                    finished_date: response.data.challan_details.finished_date,
                    fixed_amount: rate_per_cm_total_amount,

                    isLoading: false
                    
                });
            })
            .catch(error => console.log(error))   
    },[]);
    console.log(userBillInput);

    const submitHandler = (data) => {

        console.log('output', data);

        if(data.net_total > 0){

            userPutMethod(`${billAPI}/${job_order_id}`, data )
                .then(response => {
                    if (response.data.status == 1) {
                        toast.success(response.data.message);
                    } else {
                        toast.error(response.data.message);
                    }
                })
                .catch(error => toast.error(error))
        }else{
            toast.error("Net Total Amount can't be less than zero");
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
                                <h5>Create Bill</h5>
                            </div>
                            <div className="card-body">
                                {userBillInput.isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <form onSubmit={handleSubmit(submitHandler)} className="theme-form row">
                                        <div className="col-md-10 offset-sm-1">
                                            <fieldset className="border p-2" >
                                                <legend className="w-auto text-left">Job and base Information</legend>

                                                <div className="row">

                                                    <input 
                                                        type="hidden" 
                                                        className="form-control" 
                                                        name="job_order_id" 
                                                        ref={register({required: true })}
                                                        value={userBillInput.job_order_id ? userBillInput.job_order_id : ""}
                                                    />

                                                    <label className="col-sm-2 col-form-label">Bill Date:</label>
                                                    <div className="col-md-4">
                                                        <input 
                                                            type="date" 
                                                            className="form-control" 
                                                            name="bill_date" 
                                                            onChange={inputChangeHandler}
                                                            ref={register({required: true })}
                                                            value={userBillInput.bill_date ? userBillInput.bill_date : ""}
                                                        />
                                                    </div>
                                                    <label className="col-sm-2 col-form-label">Cyl Rate Status:</label>
                                                    <div className="col-md-4">
                                                        <select 
                                                            className="form-control" 
                                                            onChange={inputChangeHandler} 
                                                            name="cyl_rate_status"
                                                            disabled
                                                        >
                                                            <option> Select One </option>
                                                            <option value="0" selected={userBillInput.cyl_rate_status == 0? 'selected' : ''}>Redo</option>
                                                            <option value="1" selected={userBillInput.cyl_rate_status == 1? 'selected' : ''}>Per Cylinder</option>
                                                            <option value="2" selected={userBillInput.cyl_rate_status == 2? 'selected' : ''}>Per Sqr cm</option>
                                                            <option value="3" selected={userBillInput.cyl_rate_status == 3? 'selected' : ''}>Per Sqr inch</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <label className="col-sm-2 col-form-label">Job No:</label>
                                                    <div className="col-md-4">
                                                        <input 
                                                            type="text" 
                                                            className="form-control" 
                                                            name="job_no" 
                                                            onChange={inputChangeHandler}
                                                            readOnly
                                                            value={userBillInput.job_no ? userBillInput.job_no : ''} 
                                                        />
                                                    </div>
                                                    
                                                    <label className="col-sm-2 col-form-label">Job Name:</label>
                                                    <div className="col-md-4">
                                                        <input 
                                                            type="text" 
                                                            className="form-control" 
                                                            name="job_name" 
                                                            readOnly
                                                            value={userBillInput.job_name ? userBillInput.job_name : ''} 
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <label className="col-md-2 col-form-label label-form">Challan No:</label>
                                                    <div className="col-md-4">
                                                        <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                name="challan_no" 
                                                                onChange={inputChangeHandler} 
                                                                ref={register({required: true })}
                                                                readOnly
                                                                value={userBillInput.challan_no ? userBillInput.challan_no : ''} 
                                                        />
                                                    </div>

                                                    <label className="col-md-2 col-form-label label-form">Printer Name:</label>
                                                    <div className="col-md-4">
                                                        <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                name="printer_name" 
                                                                onChange={inputChangeHandler} 
                                                                readOnly
                                                                value={userBillInput.printer_name ? userBillInput.printer_name : ''} 
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
               
                                                    <label className="col-md-2 col-form-label label-form">Delivery Date:</label>
                                                    <div className="col-md-4">
                                                        <input 
                                                                type="date" 
                                                                className="form-control" 
                                                                name="delivery_date" 
                                                                onChange={inputChangeHandler} 
                                                                readOnly
                                                                value={userBillInput.finished_date ? userBillInput.finished_date : ''}
                                                        />
                                                    </div>

                                                    <label className="col-md-2 col-form-label label-form">Type:</label>
                                                    <div className="col-md-4">
                                                        <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                name="job_type" 
                                                                onChange={inputChangeHandler} 
                                                                readOnly
                                                                value={userBillInput.job_type ? userBillInput.job_type : ''} 
                                                        />
                                                    </div>

                                                </div>
                                            </fieldset>

                                            <fieldset className="border p-2" >
                                                <legend className="w-auto text-left">Customer History</legend>
                                                
                                                <div className="row">
                                                    <label className="col-md-2 col-form-label label-form">Customer Name:</label>
                                                    <div className="col-md-5">
                                                        <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                name="client_name" 
                                                                onChange={inputChangeHandler} 
                                                                readOnly
                                                                value={userBillInput.client_name ? userBillInput.client_name : ''} 
                                                        />
                                                    </div>
                                                    <label className="col-md-2 col-form-label label-form">Phone No:</label>
                                                    <div className="col-md-3">
                                                        <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                name="client_phone" 
                                                                onChange={inputChangeHandler} 
                                                                readOnly
                                                                value={userBillInput.client_phone ? userBillInput.client_phone : ''} 
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <label className="col-md-2 col-form-label label-form">Address:</label>
                                                    <div className="col-md-6">
                                                        <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                name="client_address" 
                                                                onChange={inputChangeHandler} 
                                                                readOnly
                                                                value={userBillInput.client_address ? userBillInput.client_address : ''} 
                                                        />
                                                    </div>
                                                    <label className="col-md-1 col-form-label label-form">Cir:</label>
                                                    <div className="col-md-1">
                                                        <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                name="circumference" 
                                                                onChange={inputChangeHandler} 
                                                                ref={register({required: true })}
                                                                readOnly
                                                                value={userBillInput.circumference ? userBillInput.circumference : ''} 
                                                        />
                                                    </div>
                                                    <label className="col-md-1 col-form-label label-form">FL:</label>
                                                    <div className="col-md-1">
                                                        <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                name="face_length" 
                                                                onChange={inputChangeHandler} 
                                                                ref={register({required: true })}
                                                                readOnly
                                                                value={userBillInput.face_length ? userBillInput.face_length : ''} 
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <label className="col-md-2 col-form-label label-form">S. Area (Sqrcm):</label>
                                                    <div className="col-md-2">
                                                        <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                name="surface_area" 
                                                                onChange={inputChangeHandler} 
                                                                ref={register({required: true })}
                                                                readOnly
                                                                value={userBillInput.surface_area ? userBillInput.surface_area : ''} 
                                                        />
                                                    </div>
                                                    <label className="col-md-3 col-form-label label-form">Total S. Area (Sqrcm):</label>
                                                    <div className="col-md-3">
                                                        <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                name="total_surface_area_sqr_cm" 
                                                                onChange={inputChangeHandler} 
                                                                readOnly
                                                                ref={register({required: true })}
                                                                value={userBillInput.total_surface_area_sqr_cm ? userBillInput.total_surface_area_sqr_cm : ''} 
                                                        />
                                                    </div>

                                                </div>
                                                <div className="row">
                                                    <label className="col-md-2 col-form-label label-form"></label>
                                                    <div className="col-md-2">
      
                                                    </div>
                                                    {userBillInput.cyl_rate_status == 2 && (<><label className="col-md-3 col-form-label label-form">Rate Per Sqrcm:</label>
                                                    <div className="col-md-3" style={{marginTop: '5px'}}>
                                                        <input  
                                                            className="form-control" 
                                                            name="rate_per_cm" 
                                                            onChange={inputChangeHandler} 
                                                            readOnly
                                                            ref={register({required: true })}
                                                            value={userBillInput.rate_per_cm ? userBillInput.rate_per_cm : ''} 
                                                        />
                                                    </div></>)}
                                                    {userBillInput.cyl_rate_status == 1 && (<><label className="col-md-3 col-form-label label-form">Fixed Amount:</label>
                                                    <div className="col-md-3" style={{marginTop: '5px'}}>
    
                                                        <input 
                                                            className="form-control" 
                                                            name="rate_per_cm" 
                                                            onChange={inputChangeHandler} 
                                                            readOnly
                                                            ref={register({required: true })}
                                                            value={userBillInput.rate_per_cm_total ? userBillInput.rate_per_cm_total : ''} 
                                                        />
                                                    </div></>)}
                                                    {userBillInput.cyl_rate_status == 0 && (<><label className="col-md-3 col-form-label label-form">Fee not applicable</label>
                                                   
                                                    </>)}
                                                </div>
                                                <div className="row">
                                                    <label className="col-md-2 col-form-label label-form"></label>
                                                    <div className="col-md-2">
      
                                                    </div>
                                                    <label className="col-md-3 col-form-label label-form">Total:</label>
                                                    <div className="col-md-3" style={{marginTop: '5px'}}>
                                                        <input 
                                                            className="form-control" 
                                                            name="rate_per_cm_total" 
                                                            onChange={inputChangeHandler} 
                                                            readOnly
                                                            ref={register({required: true })}
                                                            value={userBillInput.rate_per_cm_total ? userBillInput.rate_per_cm_total : 0} 
                                                        />
                                                    </div>
                                                </div>

                                            </fieldset>

                                            <fieldset className="border p-2" >

                                                <legend className="w-auto text-left">Output and Remarks</legend>

                                                <div className="form-row">
                                                    <label className="col-md-2 col-form-label label-form">Number Of Cylinder:</label>
                                                    <div className="col-md-2">
                                                        <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                name="total_cylinder_qty" 
                                                                onChange={inputChangeHandler} 
                                                                ref={register({required: true })}
                                                                readOnly
                                                                value={userBillInput.total_cylinder_qty ? userBillInput.total_cylinder_qty : ''} 
                                                        />
                                                    </div>

                                                    <label className="col-md-2 col-form-label label-form">Rate:</label>
                                                    <div className="col-md-2">
                                                        <input 
                                                            type="text" 
                                                            className="form-control" 
                                                            name="rate" 
                                                            onChange={inputChangeHandler} 
                                                            readOnly
                                                            ref={register({required: true })}
                                                            value={userBillInput.rate ? userBillInput.rate : ''} 
                                                        />
                                                    </div>

                                                    <label className="col-md-2 col-form-label label-form">Grand Total:</label>
                                                    <div className="col-md-2">
                                                        <input 
                                                            className="form-control" 
                                                            name="grand_total" 
                                                            onChange={inputChangeHandler} 
                                                            ref={register({required: true })}
                                                            readOnly
                                                            value={userBillInput.grand_total ? userBillInput.grand_total : 0} 
                                                        />
                                                    </div>
                                                </div>  

                                                <div className="form-row">
                                                    <label className="col-md-2 col-form-label label-form">Less:</label>
                                                    <div className="col-md-2">
                                                        <input 
                                                                type="number" 
                                                                className="form-control" 
                                                                name="less" 
                                                                ref={register({required: true })}
                                                                onChange={inputChangeHandler} 
                                                                value={userBillInput.less ? userBillInput.less : 0} 
                                                        />
                                                    </div>

                                                    <label className="col-md-2 col-form-label label-form d-none">Less Bare Cost:</label>
                                                    <div className="col-md-2 d-none">
                                                        <input 
                                                            type="number" 
                                                            className="form-control" 
                                                            name="less_bare_cost" 
                                                            ref={register({required: true })}
                                                            onChange={inputChangeHandler} 
                                                            value={0} 
                                                        />
                                                    </div>
                                                    <label className="col-md-2 col-form-label label-form">Less Base Cost:</label>
                                                    <div className="col-md-2">
                                                        <input 
                                                            type="number" 
                                                            className="form-control" 
                                                            name="base_total_amount" 
                                                            ref={register({required: true })}
                                                            onChange={inputChangeHandler} 
                                                            value={userBillInput.base_total_amount ? userBillInput.base_total_amount : 0} 
                                                        />
                                                    </div>

                                                    <label className="col-md-2 col-form-label label-form">Add Cost:</label>
                                                    <div className="col-md-2">
                                                        <input 
                                                            type="number" 
                                                            className="form-control" 
                                                            name="add_cost" 
                                                            ref={register({required: true })}
                                                            onChange={inputChangeHandler} 
                                                            value={userBillInput.add_cost ? userBillInput.add_cost : 0} 
                                                        />
                                                    </div>
                                                </div>   

                                                <div className="form-row">
                                                    <label className="col-md-2 col-form-label label-form">Vat(%):</label>
                                                    <div className="col-md-1">
                                                        <select 
                                                            className="form-control" 
                                                            onChange={inputChangeHandler} 
                                                            id="vat_type" 
                                                            name="vat_type"
                                                            ref={register({required: true })}
                                                        >
                                                            <option value="0">No</option>
                                                            <option value="1">Yes</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-1">
                                                        <input 
                                                                type="number" 
                                                                className="form-control" 
                                                                name="vat_value" 
                                                                onChange={inputChangeHandler} 
                                                                ref={register({required: true })}
                                                                value={userBillInput.vat_value ? userBillInput.vat_value : 0} 
                                                        />
                                                    </div>

                                                    <label className="col-md-2 col-form-label label-form">Vat Amt:</label>
                                                    <div className="col-md-2">
                                                        <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                name="vat_amount" 
                                                                onChange={inputChangeHandler} 
                                                                readOnly
                                                                ref={register({required: true })}
                                                                value={userBillInput.vat_amount ? userBillInput.vat_amount : 0} 
                                                        />
                                                    </div>

                                                    <label className="col-md-2 col-form-label label-form">Net Total:</label>
                                                    <div className="col-md-2">
                                                        <input 
                                                                className="form-control" 
                                                                name="net_total" 
                                                                onChange={inputChangeHandler} 
                                                                readOnly
                                                                ref={register({required: true })}
                                                                value={userBillInput.net_total ? userBillInput.net_total : 0} 
                       
                                                        />
                                                    </div>

                                                </div>

                                                <div className="form-row">

                                                    <label className="col-md-2 col-form-label label-form">Remarks:</label>
                                                    <div className="col-md-10">
                                                        <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                name="remarks" 
                                                                onChange={inputChangeHandler} 
                                                                ref={register({required: true })}
                                                        />
                                                    </div>

                                                </div>

                                            </fieldset>
                                        </div>
                                  
                                        <SubmitButton link="bill/index" menuId={ menuId } />
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

export default Edit;