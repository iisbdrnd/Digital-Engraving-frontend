import React, { Fragment, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom'
import Breadcrumb from '../../common/breadcrumb';
import { ShowJobOrderBillAPI } from '../../../../api/userUrl';
import { userGetMethod, userPutMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';

const Edit = (props) => {
    const { handleSubmit, register, errors } = useForm();

    const [userBillInput, setBillInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            job_no: '',
            total_cylinder_qty: '',
            job_name: '',
            printer_name: '',
            client_name: '',
            challan_no: '',
            challan_date: '',
            bill_no: '',
            bill_date: '',
            total_surface_area: '',
            total_sur_sqr_cm: '',
            total_sur_sqr_inch: '',
            rate_per_cm: '',
            rate_per_inch: '',
            number_of_chylinder: '',
            per_chylinder_rate: '',
            net_receivable: '',
            less_amount: '',
            less_bare_cost: '',
            add_cost: '',
            vat_type: '',
            vat_value: '',
            vat_amount: '',
            net_total_amount: '',
            cylinder_details: [],
            isLoading   : true
        }
    );

    const job_order_id = props.match.params.challanId;

    console.log('job id', job_order_id);

    useEffect(() => {
        userGetMethod(`${ShowJobOrderBillAPI}/8`)
            .then(response => {

                console.log('response', response);
                setBillInput({
                    job_no : response.data.jobOrders_details.job_no,
                    total_cylinder_qty : response.data.jobOrders_details.total_cylinder_qty,
                    job_name : response.data.jobOrders_details.job_name,
                    printer_name : response.data.jobOrders_details.printer_name,
                    client_name : response.data.jobOrders_details.client_name,
                    challan_no : response.data.jobOrders_details.challan_no,
                    challan_date : response.data.jobOrders_details.challan_date,
                    bill_no : response.data.jobOrders_details.bill_no,
                    bill_date : response.data.jobOrders_details.bill_date,
                    total_surface_area : response.data.jobOrders_details.total_surface_area,
                    total_sur_sqr_cm : response.data.jobOrders_details.total_sur_sqr_cm,
                    total_sur_sqr_inch : response.data.jobOrders_details.total_sur_sqr_inch,
                    rate_per_cm : response.data.jobOrders_details.rate_per_cm,
                    rate_per_inch : response.data.jobOrders_details.rate_per_inch,
                    number_of_chylinder : response.data.jobOrders_details.number_of_chylinder,
                    per_chylinder_rate : response.data.jobOrders_details.per_chylinder_rate,
                    net_receivable : response.data.jobOrders_details.net_receivable,
                    less_amount : response.data.jobOrders_details.less_amount,
                    less_bare_cost : response.data.jobOrders_details.less_bare_cost,
                    add_cost : response.data.jobOrders_details.add_cost,
                    vat_type : response.data.jobOrders_details.vat_type,
                    vat_value : response.data.jobOrders_details.vat_value,
                    vat_amount : response.data.jobOrders_details.vat_amount,
                    net_total_amount : response.data.jobOrders_details.net_total_amount,
                    cylinder_details : response.data.cylinder_details,
                    isLoading: false
                });
            })
            .catch(error => console.log(error))   
    },[]);


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
                                <h5>Bill Details</h5>
                            </div>
                            <div className="card-body">
                                {userBillInput.isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <form className="theme-form row">

                                        <div className="col-md-10 offset-sm-1">

                                            <fieldset className="border p-2" >
                                                <legend className="w-auto text-left">Job Information</legend>
                                                
                                                <div className="form-row">
                                                    <div className="col-md-6 row">

                                                        <label className="col-md-5 col-form-label label-form" style={{paddingTop: '0'}}>Job No:</label>
                                                        <div className="col-md-7">
                                                            {userBillInput.job_no}
                                                        </div>
                                                    
                                                        <label className="col-md-5 col-form-label label-form" style={{paddingTop: '0'}}>Client Name:</label>
                                                        <div className="col-md-7">
                                                            {userBillInput.client_name}
                                                        </div>

                                                    </div>      

                                                    <div className="col-md-6 row">

                                                        <label className="col-md-5 col-form-label label-form" style={{paddingTop: '0'}}>Job Name:</label>
                                                        <div className="col-md-7">
                                                            {userBillInput.job_name}
                                                        </div>
                                            
                                                        <label className="col-md-5 col-form-label label-form" style={{paddingTop: '0'}}>Printers Name:</label>
                                                        <div className="col-md-7">
                                                            {userBillInput.printer_name}
                                                        </div>
                                                    
                                                    </div>
                                                </div>
                                            </fieldset>

                                            <fieldset className="border p-2" >
                                                <legend className="w-auto text-left">Challan and Bill Information</legend>

                                                <div className="form-group row">

                                                    <label className="col-sm-2 col-form-label" style={{paddingTop: '0'}}>Challan No:</label>
                                                    <div className="col-md-4">
                                                        {userBillInput.challan_no}
                                                    </div>

                                                    <label className="col-sm-2 col-form-label" style={{paddingTop: '0'}}>Challan date:</label>
                                                    <div className="col-md-4">
                                                        {userBillInput.challan_date}
                                                    </div>
                                           
                                                    <label className="col-sm-2 col-form-label" style={{paddingTop: '0'}}>Bill No:</label>
                                                    <div className="col-md-4">
                                                        {userBillInput.bill_no}
                                                    </div>

                                                    <label className="col-sm-2 col-form-label" style={{paddingTop: '0'}}>Bill Date:</label>
                                                    <div className="col-md-4">
                                                        {userBillInput.bill_date}
                                                    </div>
 
                                                </div>

                                                <div className="row">
                                                    <label className="col-md-2 col-form-label label-form">Surface Area:</label>
                                                    <div className="col-md-1" style={{marginTop: '5px'}}>
                                                        {userBillInput.total_surface_area}
                                                    </div>
                                                    <label className="col-md-2 col-form-label label-form">S. Area (Sqrcm):</label>
                                                    <div className="col-md-1" style={{marginTop: '5px'}}>
                                                        {userBillInput.total_sur_sqr_cm}
                                                    </div>
                                                    <label className="col-md-2 col-form-label label-form">S. Area (Sqr Inch):</label>
                                                    <div className="col-md-1" style={{marginTop: '5px'}}>
                                                        {userBillInput.total_sur_sqr_inch}
                                                    </div>
                                                    <label className="col-md-2 col-form-label label-form">Rate Per CM:</label>
                                                    <div className="col-md-1" style={{marginTop: '5px'}}>
                                                        {userBillInput.rate_per_cm}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-md-2 col-form-label label-form">Rate per Inch:</label>
                                                    <div className="col-md-1" style={{marginTop: '5px'}}>
                                                        {userBillInput.rate_per_inch}
                                                    </div>
                                                    <label className="col-md-2 col-form-label label-form">Chylinder Qty:</label>
                                                    <div className="col-md-1" style={{marginTop: '5px'}}>
                                                        {userBillInput.number_of_chylinder}
                                                    </div>
                                                    <label className="col-md-2 col-form-label label-form">Per Chylinder Rate:</label>
                                                    <div className="col-md-1" style={{marginTop: '5px'}}>
                                                        {userBillInput.per_chylinder_rate}
                                                    </div>
                                                    <label className="col-md-2 col-form-label label-form">Net Receivable:</label>
                                                    <div className="col-md-1" style={{marginTop: '5px'}}>
                                                        {userBillInput.net_receivable}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-md-2 col-form-label label-form">Less Amount:</label>
                                                    <div className="col-md-1" style={{marginTop: '5px'}}>
                                                        {userBillInput.less_amount}
                                                    </div>
                                                    <label className="col-md-2 col-form-label label-form">Less Bare Cost:</label>
                                                    <div className="col-md-1" style={{marginTop: '5px'}}>
                                                        {userBillInput.less_bare_cost}
                                                    </div>
                                                    <label className="col-md-2 col-form-label label-form">Add Cost:</label>
                                                    <div className="col-md-1" style={{marginTop: '5px'}}>
                                                        {userBillInput.add_cost}
                                                    </div>
                                                    <label className="col-md-2 col-form-label label-form">Vat Type:</label>
                                                    <div className="col-md-1" style={{marginTop: '5px'}}>
                                                        {userBillInput.vat_type == 1 ? 'Yes' : 'No'}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-md-2 col-form-label label-form">Vat Value:</label>
                                                    <div className="col-md-1" style={{marginTop: '5px'}}>
                                                        {userBillInput.vat_value}
                                                    </div>
                                                    <label className="col-md-2 col-form-label label-form">Vat Amount:</label>
                                                    <div className="col-md-1" style={{marginTop: '5px'}}>
                                                        {userBillInput.vat_amount}
                                                    </div>
                                                    <label className="col-md-2 col-form-label label-form">Net Total Amount:</label>
                                                    <div className="col-md-1" style={{marginTop: '5px'}}>
                                                        {userBillInput.net_total_amount}
                                                    </div>
                                                </div>
                                            </fieldset>

                                            <fieldset className="border p-2" >
                                                <legend className="w-auto text-left">Cylinder Details</legend>
                                                <div className="form-row">

                                                    <div className="col-md-10 offset-sm-1 row">
                                                        <table className="table table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th>SL.</th>
                                                                    <th>Job No</th>
                                                                    <th>Cylinder ID</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    userBillInput.cylinder_details.length > 0 ? 
                                                                    userBillInput.cylinder_details.map((cylinder, key)=>(        
                                                                            <tr key={key}>
                                                                                <td>{++key}</td>
                                                                                <td>{cylinder.job_orders_job_no}</td>
                                                                                <td>{cylinder.cylinder_id}</td>
                                                                            </tr>
                                                                        ))
                                                                    :
                                                                    (
                                                                        <tr>
                                                                            <td colSpan={3} align="center">No Data Found</td>
                                                                        </tr>
                                                                    )
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
              
                                                </div>       
                                            </fieldset>
                                        </div>
                                  
                                        <div className={`col-md-12 offset-sm-1`} style={{'paddingTop':'10px'}}>                           
                                            <Link 
                                                to={{
                                                    pathname: `${process.env.PUBLIC_URL}/bill/index`,
                                                }}
                                                className="btn btn-secondary btn-sm">Back To List
                                            </Link>
                                        </div>

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