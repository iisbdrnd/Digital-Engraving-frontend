import React, { Fragment, useEffect, useReducer, useState } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { challanAPI } from '../../../../api/userUrl';
import { userGetMethod, userPutMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';
import { trStyleNormal } from '../../jobAgreement/Create';

const Edit = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [isLoading,setIsLoading] = useState(true)

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
                setIsLoading(false)
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
        // <Fragment>
  
        //     <div className="container-fluid">
        //         <div className="row">
        //             <div className="col-sm-12">

        //                 <div className="card">
        //                     <div className="card-header">
        //                         <h5>Create Challan</h5>
        //                     </div>
        //                     <div className="card-body">
        //                         {userChallanInput.isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
        //                         (
        //                             <form onSubmit={handleSubmit(submitHandler)} className="theme-form row">
        //                                 <div className="col-md-10 offset-sm-1">
        //                                     <fieldset className="border p-2" >
        //                                         <legend className="w-auto text-left">Job and base Information</legend>

        //                                         <div className="form-group row">

        //                                             <label className="col-sm-3 col-form-label" style={{paddingTop: '0'}}>Job Id:</label>
        //                                             <div className="col-md-9">
        //                                                 <input 
        //                                                     type="text" 
        //                                                     className="form-control" 
        //                                                     name="job_no" 
        //                                                     value={userChallanInput.job_no}
        //                                                     readOnly
        //                                                 />
        //                                             </div>
        //                                         </div>

        //                                         <div className="form-group row">

        //                                             <label className="col-md-3 col-form-label label-form" style={{paddingTop: '0'}}>Number Of Cylinder:</label>
        //                                             <div className="col-md-9">
        //                                                 <input 
        //                                                         type="text" 
        //                                                         className="form-control" 
        //                                                         name="total_cylinder_qty" 
        //                                                         onChange={inputChangeHandler} 
        //                                                         ref={register({required: true })}
        //                                                         readOnly
        //                                                         value={userChallanInput.total_cylinder_qty ? userChallanInput.total_cylinder_qty : ''} 
        //                                                 />
        //                                             </div>
        //                                         </div>
        //                                     </fieldset>

        //                                     <fieldset className="border p-2" >
        //                                         <legend className="w-auto text-left">Job History</legend>
                                                
        //                                         <div className="form-row">
        //                                             <div className="col-md-6 row">
        //                                                 <label className="col-md-5 col-form-label label-form" style={{paddingTop: '0'}}>Job Name:</label>
        //                                                 <div className="col-md-7">
        //                                                     {userChallanInput.job_name}
        //                                                 </div>
                                                    
        //                                                 <label className="col-md-5 col-form-label label-form" style={{paddingTop: '0'}}>Client Name:</label>
        //                                                 <div className="col-md-7">
        //                                                     {userChallanInput.client_name}
        //                                                 </div>
                                                    
                                                      
                                                    
        //                                             </div>      

        //                                             <div className="col-md-6 row">
                                            
        //                                                 <label className="col-md-5 col-form-label label-form" style={{paddingTop: '0'}}>Printers Name:</label>
        //                                                 <div className="col-md-7">
        //                                                     {userChallanInput.printer_name}
        //                                                 </div>
                                                    
        //                                                 <label className="col-md-5 col-form-label label-form" style={{paddingTop: '0'}}>Status:</label>
        //                                                 <div className="col-md-7">
        //                                                         Ok
        //                                                 </div>
                    
                                                        
        //                                             </div>
        //                                         </div>
        //                                     </fieldset>

        //                                     <fieldset className="border p-2" >
        //                                         <legend className="w-auto text-left">Output and Remarks</legend>
        //                                         <div className="form-row">
        //                                             <div className="col-md-10 row">
        //                                                 <label className="col-md-5 col-form-label label-form required">Finished Date: </label>
        //                                                 <div className="col-md-7">
        //                                                     <input 
        //                                                         type="date" 
        //                                                         className="form-control" 
        //                                                         name="finished_date" 
        //                                                         onChange={inputChangeHandler}
        //                                                         ref={register({required: true })}
        //                                                         value={userChallanInput.finished_date ? userChallanInput.finished_date : ''}
        //                                                     />
        //                                                 </div>
                                                        
        //                                                 <label className="col-md-5 col-form-label label-form required"> Remarks:</label>
                                                        
                                                    
        //                                                 <label className="col-md-5 col-form-label label-form required">Return Note:</label>
        //                                                 <div className="col-md-7">
        //                                                     <input 
        //                                                         type="text" 
        //                                                         className="form-control" 
        //                                                         name="return_note" 
        //                                                         onChange={inputChangeHandler} 
        //                                                         ref={register({required: true })}
        //                                                         value={userChallanInput.return_note ? userChallanInput.return_note : ''} 
        //                                                     />
        //                                                 </div>
                            
        //                                             </div>
              
        //                                         </div>       
        //                                     </fieldset>
        //                                 </div>
                                  
        //                                 <SubmitButton link="challan/index" menuId={ menuId } />
        //                             </form>
                                
        //                         )}
        //                     </div>
                        
        //                 </div>
                        
        //             </div>
        //         </div>
        //     </div>
        // </Fragment>
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5>Challan Add Form</h5>
                                    </div>
                                    <div className="col-md-6">
                                        {/* <PanelRefreshIcons panelRefresh={pageRefreshHandler} /> */}
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                            {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                <form onSubmit={handleSubmit(submitHandler)} className="needs-validation theme-form">
                                    <div className="row">
                                        <div className="col-md-6" style={{marginTop: '20px'}}>
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label required" htmlFor="job_no">Job No</label>
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
                                                <label className="col-sm-3 col-form-label required" htmlFor="send_date">Send Date</label>
                                                <div className="col-md-9">
                                                 <input 
                                                                type="date" 
                                                                className="form-control" 
                                                                name="finished_date" 
                                                                onChange={inputChangeHandler}
                                                                ref={register({required: true })}
                                                                value={userChallanInput.finished_date ? userChallanInput.finished_date : ''}
                                                            />
                                                        </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label required" htmlFor="job_no">Attached</label>
                                                <div className="col-sm-9">
                                                    {/* <Typeahead
                                                        id="job_order_id"
                                                        name="job_order_id"
                                                        labelKey={option => `${option.name}`}
                                                        options={typeHeadOptions['job_orders']}
                                                        placeholder="Select Job No..."
                                                        onChange={(e) => dropDownChange(e, 'job_order_id')}
                                                        selected={jobNoValue}
                                                        disabled={job_order_id != null ? 'disabled' : ''}
                                                        ref={register({
                                                            required: 'Job No Field Required'
                                                        })}
                                                    /> */}
                                                    {errors.job_order_id && 'Job No. is required'}
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label" htmlFor="remark">Remarks</label>
                                                <div className="col-md-9">
                                                            <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                name="remarks" 
                                                                onChange={inputChangeHandler} 
                                                                ref={register({required: true })}
                                                                value={userChallanInput.remarks ? userChallanInput.remarks : ''} 
                                                            />
                                                        </div>
                                            </div>
                                           

                                            {/* <div className="form-group row">
                                                <div className="col-md-3">

                                                </div>
                                                <div className="col-md-9">
                                                {uploadImg != '' &&  <img src={uploadImg ? uploadImg : ""} style={{height: '100%', width: '100%',marginBottom : '20px'}} />}
                                                </div>
                                            </div> */}

                                        </div>


                                        <div className="col-md-6">
                                            <pre className="helper-classes m-t-10">
                                                <div className="table-responsive display-div">
                                                    <table className="table table-bordernone">
                                                        <tbody>
                                                            <tr style={trStyleNormal}>
                                                                <td width="25%" align="right">Job Name</td>
                                                                <td width="5%">:</td>
                                                                <td width="70%">{userChallanInput.job_name}</td>
                                                            </tr>
                                                            <tr style={trStyleNormal}>
                                                                <td align="right">Client Name</td>
                                                                <td>:</td>
                                                                <td>{userChallanInput.client_name}</td>
                                                            </tr>
                                                            <tr style={trStyleNormal}>
                                                                <td align="right">Printer Name</td>
                                                                <td>:</td>
                                                                <td>{userChallanInput.printer_name}</td>
                                                            </tr>
                                                            <tr style={trStyleNormal}>
                                                                <td align="right">No of Cylinder</td>
                                                                <td>:</td>
                                                                <td>{userChallanInput.total_cylinder_qty ? userChallanInput.total_cylinder_qty : ''}</td>
                                                            </tr>
                                                            <tr style={trStyleNormal}>
                                                                <td align="right">Job Status</td>
                                                                <td>:</td>
                                                                <td>{userChallanInput.job_type? userChallanInput.job_type : ''}</td>
                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </pre>
                                        </div>
                                    </div>
                                    <SubmitButton link="challan/index" offset="4" menuId={ menuId }/>
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

export default Edit;