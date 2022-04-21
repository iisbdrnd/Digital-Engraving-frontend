import React, { Fragment, useEffect, useReducer } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { challanAPI } from '../../../../api/userUrl';
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
            finished_date : '',
            remarks : '',
            return_note : '',
            isLoading   : true
        }
    );

    const inputChangeHandler = (e)=>{
        setChallanInput({[e.target.name]: e.target.value});
    }

    const job_order_id = props.match.params.challanId;


    useEffect(() => {
        userGetMethod(`${challanAPI}/${job_order_id}/edit`)
            .then(response => {

                console.log('response', response);
                setChallanInput({
                    job_no : response.data.jobOrders_details.job_no,
                    total_cylinder_qty : response.data.jobOrders_details.total_cylinder_qty,
                    job_name : response.data.jobOrders_details.job_name,
                    printer_name : response.data.jobOrders_details.printer_name,
                    client_name : response.data.jobOrders_details.client_name,
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
                                <h5>Create Challan</h5>
                            </div>
                            <div className="card-body">
                                {userChallanInput.isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <form onSubmit={handleSubmit(submitHandler)} className="theme-form row">
                                        <div className="col-md-10 offset-sm-1">
                                            <fieldset className="border p-2" >
                                                <legend className="w-auto text-left">Job and base Information</legend>

                                                <div className="form-group row">

                                                    <label className="col-sm-3 col-form-label" style={{paddingTop: '0'}}>Job Id:</label>
                                                    <div className="col-md-9">
                                                        <input 
                                                            type="text" 
                                                            className="form-control" 
                                                            name="job_no" 
                                                            value={userChallanInput.job_no}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>

                                                <div className="form-group row">

                                                    <label className="col-md-3 col-form-label label-form" style={{paddingTop: '0'}}>Number Of Cylinder:</label>
                                                    <div className="col-md-9">
                                                        <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                name="total_cylinder_qty" 
                                                                onChange={inputChangeHandler} 
                                                                ref={register({required: true })}
                                                                readOnly
                                                                value={userChallanInput.total_cylinder_qty ? userChallanInput.total_cylinder_qty : ''} 
                                                        />
                                                    </div>
                                                </div>
                                            </fieldset>

                                            <fieldset className="border p-2" >
                                                <legend className="w-auto text-left">Job History</legend>
                                                
                                                <div className="form-row">
                                                    <div className="col-md-6 row">
                                                        <label className="col-md-5 col-form-label label-form" style={{paddingTop: '0'}}>Job Name:</label>
                                                        <div className="col-md-7">
                                                            {userChallanInput.job_name}
                                                        </div>
                                                    
                                                        <label className="col-md-5 col-form-label label-form" style={{paddingTop: '0'}}>Client Name:</label>
                                                        <div className="col-md-7">
                                                            {userChallanInput.client_name}
                                                        </div>
                                                    
                                                      
                                                    
                                                    </div>      

                                                    <div className="col-md-6 row">
                                            
                                                        <label className="col-md-5 col-form-label label-form" style={{paddingTop: '0'}}>Printers Name:</label>
                                                        <div className="col-md-7">
                                                            {userChallanInput.printer_name}
                                                        </div>
                                                    
                                                        <label className="col-md-5 col-form-label label-form" style={{paddingTop: '0'}}>Status:</label>
                                                        <div className="col-md-7">
                                                                Ok
                                                        </div>
                    
                                                        
                                                    </div>
                                                </div>
                                            </fieldset>

                                            <fieldset className="border p-2" >
                                                <legend className="w-auto text-left">Output and Remarks</legend>
                                                <div className="form-row">
                                                    <div className="col-md-10 row">
                                                        <label className="col-md-5 col-form-label label-form required">Finished Date: </label>
                                                        <div className="col-md-7">
                                                            <input 
                                                                type="date" 
                                                                className="form-control" 
                                                                name="finished_date" 
                                                                onChange={inputChangeHandler}
                                                                ref={register({required: true })}
                                                                value={userChallanInput.finished_date ? userChallanInput.finished_date : ''}
                                                            />
                                                        </div>
                                                        
                                                        <label className="col-md-5 col-form-label label-form required"> Remarks:</label>
                                                        <div className="col-md-7">
                                                            <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                name="remarks" 
                                                                onChange={inputChangeHandler} 
                                                                ref={register({required: true })}
                                                                value={userChallanInput.remarks ? userChallanInput.remarks : ''} 
                                                            />
                                                        </div>
                                                    
                                                        <label className="col-md-5 col-form-label label-form required">Return Note:</label>
                                                        <div className="col-md-7">
                                                            <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                name="return_note" 
                                                                onChange={inputChangeHandler} 
                                                                ref={register({required: true })}
                                                                value={userChallanInput.return_note ? userChallanInput.return_note : ''} 
                                                            />
                                                        </div>
                            
                                                    </div>
              
                                                </div>       
                                            </fieldset>
                                        </div>
                                  
                                        <SubmitButton link="challan/index" menuId={ menuId } />
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