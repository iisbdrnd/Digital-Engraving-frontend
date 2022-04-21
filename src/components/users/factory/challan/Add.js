import React, { Fragment, useEffect, useState, useReducer } from 'react';
import { challanAPI, filterJobOrderChallanAPI } from '../../../../api/userUrl';
import { userGetMethod, userPutMethod, userPostMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { Typeahead } from 'react-bootstrap-typeahead';
import { SubmitButton } from '../../../common/GlobalButton';



const Add = (props) => {

    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [job_orders, setJobOrder] = useState([]);
    const [dropDownData, setDropdownData] = useState();

    var menuId = 0;
    if (props.location.state === undefined) {
        var menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }

    useEffect(() => {
        userGetMethod(`${filterJobOrderChallanAPI}`)
        .then(response => {
            let jobOrderOptions = [];
            if (response.data.jobOrders && response.data.jobOrders.length > 0) {
                console.log('jobOrders', response.data.jobOrders);
                response.data.jobOrders.map(order => 
                {
                    let jobOrderObj = {};
                    jobOrderObj.id = order.id;
                    jobOrderObj.name = `[${order.job_no}] ` + order.job_name;
                    jobOrderOptions.push(jobOrderObj);
                    
                })
            }
            setJobOrder(jobOrderOptions);
            setIsLoading(false);

        })
        .catch(error => console.log(error))
    }, []);

    const dropDownChange = (e, fieldName) => {

        if(e.length > 0){

            const selectedValueId = e[0].id;

            setDropdownData(
                (prevstate) => ({
                    ...prevstate,
                    [fieldName]: selectedValueId,
                })
            );

        }
    }

    
    const submitHandler = (data, e) => {
        console.log(data);
        // userPostMethod(challanAPI, data)
        //     .then(response => {
        //         console.log(response);
        //         if (response.data.status == 1) {
        //             toast.success(response.data.message)
        //             e.target.reset();
        //         } else {
        //             toast.error(response.data.message)
        //         }
        //     })
        // .catch(error => toast.error(error))
    }


    
    return (
        <Fragment>
            {/* <Breadcrumb title="User Designation Add" parent="Designation" /> */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Create Challan</h5>
                            </div>
                            <div className="card-body">

                                <form onSubmit={handleSubmit(submitHandler)} className="theme-form row">
                                    <div className="col-md-8">
                                        <fieldset className="border p-2" >
                                            <legend className="w-auto text-left">Job and base Information</legend>

                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label required">Job Id</label>
                                                <div className="col-md-9">
                                                    
                                                </div>

                                                <label className="col-md-3 col-form-label label-form required ">Cylinder Id</label>
                                                <div className="col-md-9">
                                                    
                                                </div>
                                            </div>
                                        </fieldset>

                                        <fieldset className="border p-2" >
                                            <legend className="w-auto text-left">Polishing</legend>
                                            
                                            <div className="form-row">
                                                <div className="col-md-6 row">
                                                    <label className="col-md-5 col-form-label label-form">Machine Rough Cut</label>
                                                    <div className="col-md-7">
                                                        
                                                    </div>
                                                
                                                    <label className="col-md-5 col-form-label label-form">Machine Fine Cut</label>
                                                    <div className="col-md-7">
                                                        
                                                    </div>
                                                
                                                    <label className="col-md-5 col-form-label label-form">On Time</label>
                                                    <div className="col-md-7">
                                                        
                                                    </div>
                                                
                                                    <label className="col-md-5 col-form-label label-form">Polishing Date</label>
                                                    <div className="col-md-7">
                                                        
                                                    </div>
                                                
                                                </div>      

                                                <div className="col-md-6 row">
                                        
                                                    <label className="col-md-5 col-form-label label-form">Production Date</label>
                                                    <div className="col-md-7">
                                                        
                                                    </div>
                                                        
                                                    <label className="col-md-5 col-form-label label-form">Shift</label>
                                                    <div className="col-md-7">
                                                        
                                                    </div>
                                                    
                                        
                                                    <label className="col-md-5 col-form-label label-form">Est, Duration</label>
                                                    <div className="col-md-5">
                                                        
                                                    </div>
                                                    <label className="col-form-label label-form pull-right">hh:mm</label>
                                                
                                                    <label className="col-md-5 col-form-label label-form">Est, End Time</label>
                                                    <div className="col-md-7">
                                                        
                                                    </div>
                 
                                                    
                                                </div>
                                            </div>
                                        </fieldset>

                                        <fieldset className="border p-2" >
                                            <legend className="w-auto text-left">Output, QC and Remarks</legend>
                                            <div className="form-row">
                                                <div className="col-md-6 row">
                                                    <label className="col-md-5 col-form-label label-form">Chrome Cylinder? </label>
                                                    <div className="col-md-7">
                                                        
                                                    </div>
                                                    
                                                    <label className="col-md-5 col-form-label label-form"> Dia after Rough Cut</label>
                                                    <div className="col-md-7">
                                                        
                                                    </div>
                                                
                                                    <label className="col-md-5 col-form-label label-form">Dia after Fine Cut</label>
                                                    <div className="col-md-7">
                                                        
                                                    </div>
                                                
                                                    <label className="col-md-5 col-form-label label-form">A. off Time</label>
                                                    <div className="col-md-7">
                                                        
                                                    </div>
                                                </div>
                                                <div className="col-md-6 row">
                                                    <label className="col-md-5 col-form-label label-form">A. Duration</label>
                                                    <div className="col-md-5">
                                                        
                                                    </div>
                                                    <label className="col-form-label label-form pull-right">hh:mm</label>
                                                    
                                                    <label className="col-md-5 col-form-label label-form">Output Status</label>
                                                    <div className="col-md-7">
                                                        
                                                    </div>
                                                    
                                                    <label className="col-md-5 col-form-label label-form">Action if output is not OK</label>
                                                    <div className="col-md-7">
                                                        
                                                    </div>
                                                    
                                                    <label className="col-md-5 col-form-label label-form">Remarks</label>
                                                    <div className="col-md-7">
                                                        
                                                    </div>
                                                </div>
                                            </div>       
                                        </fieldset>
                                    </div>
                                    <div className="col-md-4">
                                        <pre className="helper-classes m-t-10">
                                            <div className="display-div">
                                                <div className='p-0'>
                                                    <table className="table table-bordernone">
                                                        
                                                    </table>
                                                </div>
                                                
                                            </div>
                                        </pre>
                                        <fieldset className="border p-2" >
                                            <legend className="w-auto text-left">Plating</legend>

                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Count</th>
                                                        <th>Order</th>
                                                        <th>Cycle ID</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    
                                                </tbody>
                                            </table>
                                        </fieldset>
                                    </div>
                                    <SubmitButton link="challan/index" menuId={ menuId } />
                                </form>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        
        </Fragment>
    );
};

export default Add;