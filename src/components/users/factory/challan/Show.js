import React, { Fragment, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom'
import Breadcrumb from '../../common/breadcrumb';
import { challanAPI, ShowJobOrderChallanAPI } from '../../../../api/userUrl';
import { userGetMethod, userPutMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';

const Edit = (props) => {
    const { handleSubmit, register, errors } = useForm();

    const [userChallanInput, setChallanInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            job_no: '',
            total_cylinder_qty: '',
            job_name: '',
            printer_name: '',
            client_name: '',
            challan_no: '',
            challan_date: '',
            finished_date : '',
            remarks : '',
            return_note : '',
            cylinder_details: [],
            isLoading   : true
        }
    );

    const inputChangeHandler = (e)=>{
        setChallanInput({[e.target.name]: e.target.value});
    }

    const job_order_id = props.match.params.challanId;

    console.log('job id', job_order_id);


    useEffect(() => {
        userGetMethod(`${ShowJobOrderChallanAPI}/${job_order_id}`)
            .then(response => {

                console.log('response', response);
                setChallanInput({
                    job_no : response.data.jobOrders_details.job_no,
                    total_cylinder_qty : response.data.jobOrders_details.total_cylinder_qty,
                    job_name : response.data.jobOrders_details.job_name,
                    printer_name : response.data.jobOrders_details.printer_name,
                    client_name : response.data.jobOrders_details.client_name,
                    challan_no : response.data.jobOrders_details.challan_no,
                    challan_date : response.data.jobOrders_details.challan_date,
                    finished_date : response.data.jobOrders_details.finished_date,
                    remarks : response.data.jobOrders_details.remarks,
                    return_note : response.data.jobOrders_details.return_note,
                    cylinder_details : response.data.cylinder_details,
                    isLoading: false
                });
            })
            .catch(error => console.log(error))   
    },[]);

    const submitHandler = (data) => {

        console.log('output', data);

        userPutMethod(`${challanAPI}/${job_order_id}`, data )
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
                                <h5>Challan Details</h5>
                            </div>
                            <div className="card-body">
                                {userChallanInput.isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <form onSubmit={handleSubmit(submitHandler)} className="theme-form row">

                                        <div className="col-md-10 offset-sm-1">

                                            <fieldset className="border p-2" >
                                                <legend className="w-auto text-left">Challan Information</legend>

                                                <div className="form-group row">

                                                    <label className="col-sm-2 col-form-label" style={{paddingTop: '0'}}>Challan No:</label>
                                                    <div className="col-md-4">
                                                        {userChallanInput.challan_no}
                                                    </div>

                                                    <label className="col-sm-2 col-form-label" style={{paddingTop: '0'}}>Challan date:</label>
                                                    <div className="col-md-4">
                                                        {userChallanInput.challan_date}
                                                    </div>
                                           
                                                    <label className="col-sm-2 col-form-label" style={{paddingTop: '0'}}>Finished date:</label>
                                                    <div className="col-md-4">
                                                        {userChallanInput.finished_date}
                                                    </div>

                                                    <label className="col-sm-2 col-form-label" style={{paddingTop: '0'}}>Remarks:</label>
                                                    <div className="col-md-4">
                                                        {userChallanInput.remarks}
                                                    </div>

                                                    <label className="col-sm-2 col-form-label" style={{paddingTop: '0'}}>Return Note:</label>
                                                    <div className="col-md-4">
                                                        {userChallanInput.return_note}
                                                    </div>
 
                                                </div>
                                            </fieldset>

                                            <fieldset className="border p-2" >
                                                <legend className="w-auto text-left">Job Information</legend>
                                                
                                                <div className="form-row">
                                                    <div className="col-md-6 row">

                                                        <label className="col-md-5 col-form-label label-form" style={{paddingTop: '0'}}>Job No:</label>
                                                        <div className="col-md-7">
                                                            {userChallanInput.job_no}
                                                        </div>
                                                    
                                                        <label className="col-md-5 col-form-label label-form" style={{paddingTop: '0'}}>Client Name:</label>
                                                        <div className="col-md-7">
                                                            {userChallanInput.client_name}
                                                        </div>

                                                    </div>      

                                                    <div className="col-md-6 row">

                                                        <label className="col-md-5 col-form-label label-form" style={{paddingTop: '0'}}>Job Name:</label>
                                                        <div className="col-md-7">
                                                            {userChallanInput.job_name}
                                                        </div>
                                            
                                                        <label className="col-md-5 col-form-label label-form" style={{paddingTop: '0'}}>Printers Name:</label>
                                                        <div className="col-md-7">
                                                            {userChallanInput.printer_name}
                                                        </div>
                                                    
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
                                                                    userChallanInput.cylinder_details.length > 0 ? 
                                                                    userChallanInput.cylinder_details.map((cylinder, key)=>(        
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
                                                    pathname: `${process.env.PUBLIC_URL}/challan/index`,
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