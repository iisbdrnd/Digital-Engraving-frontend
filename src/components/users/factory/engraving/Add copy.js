import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { designationRsURL } from '../../../../api/adminUrl';
import { adminPostMethod } from '../../../../api/action';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';

const Add = () => {
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = (data) => {
        let response = adminPostMethod(designationRsURL, data)
            .then(response => {
                if (response.data.status == 1) {
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            })
        .catch(error => toast.error(error))
    }

    var mt10 = {
        marginTop: '10px',
    };
    
    var bcolor = {
        backgroundColor: 'gray',
        textAlign: 'center',
    };
    
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Machine Form</h5>
                            </div>
                            <div className="card-body">
                                {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                        <div className="row">
                                            <div className="col-sm-6 row">
                                                <fieldset className="border p-2" >
                                                    <legend className="w-auto text-left">Job and base Information</legend>

                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label required">BGO</label>
                                                        <div className="col-md-2">
                                                            <input type="text" className="form-control" name="bgo" />
                                                        </div>

                                                        <label className="col-md-2 col-form-label label-form required ">Job Name</label>
                                                        <div className="col-md-2">
                                                            <input type="text" className="form-control" name="jobname" disabled />
                                                        </div>

                                                        <label className="col-md-2 col-form-label label-form required">Job Type</label>
                                                        <div className="col-md-2">
                                                            <input type="text" className="form-control" name="job_typea" disabled />
                                                        </div>
                                                    </div>

                                                    {/* <div className="row col-md-12" style={mt10}></div> */}
                                                    <div className="form-group row">
                                                        <label className="col-md-2 col-form-label label-form">Cyl S1</label>
                                                        <div className="col-md-2">
                                                            <input type="text" className="form-control" name="cyls1" />
                                                        </div>

                                                        <label className="col-md-2 col-form-label label-form">Cyl</label>
                                                        <div className="col-md-2">
                                                            <input type="text" className="form-control" name="cyl" disabled />
                                                        </div>

                                                        <label className="col-md-2 col-form-label label-form">FL</label>
                                                        <div className="col-md-2">
                                                            <input type="text" className="form-control" name="fl" disabled/>
                                                        </div>

                                                        <label className="col-md-2 col-form-label label-form">Cir</label>
                                                        <div className="col-md-2">
                                                            <input type="text" className="form-control" name="cyls1" disabled/>
                                                        </div>

                                                        <label className="col-md-2 col-form-label label-form">Dia</label>
                                                        <div className="col-md-2">
                                                            <input type="text" className="form-control" name="cyl" disabled />
                                                        </div>

                                                        <label className="col-md-2 col-form-label label-form">S. Area</label>
                                                        <div className="col-md-2">
                                                            <input type="text" className="form-control" name="fl" disabled/>
                                                        </div>
                                                        
                                                    </div>
                                                </fieldset>
                                                <div className="col-md-6 p-0">
                                                    <fieldset className="border p-2" >
                                                        <legend className="w-auto text-left">Grinding</legend>

                                                        <div className="form-group row">
                                                            <label className="col-md-4 col-form-label label-form">Dia after Grinding</label>
                                                            <div className="col-md-8">
                                                                <input type="text" className="form-control" name="cyls1" />
                                                            </div>
                                                            
                                                            <label className="col-md-4 col-form-label label-form" style={mt10}>Dia-Final (Desired)</label>
                                                            <div className="col-md-8" style={mt10}>
                                                                <input type="text" className="form-control" name="cyls1" />
                                                            </div>
                                                            
                                                            <label className="col-md-4 col-form-label label-form" style={mt10}>Des. Polishing</label>
                                                            <div className="col-md-8" style={mt10}>
                                                                <input type="text" className="form-control" name="cyls1" />
                                                            </div>
                                                            
                                                            <label className="col-md-4 col-form-label label-form" style={mt10}>Remarks</label>
                                                            <div className="col-md-8" style={mt10}>
                                                                <input type="text" className="form-control" name="cyls1" />
                                                            </div>
                                                        </div>

                                                    </fieldset>
                                                </div>
                                                <div className="col-md-6 p-r-0">
                                                    <fieldset className="border p-2" >
                                                        <legend className="w-auto text-left">Plating</legend>
                                                        <div class="form-row">
                                                            <div className="p-0 col-md-4">
                                                                <label className=" col-form-label label-form">Count</label>
                                                                <div className="">
                                                                    <input type="text" className="form-control" name="fl"/>
                                                                </div>
                                                            </div>
                                                            <div className="p-l-1 p-r-1 col-md-4">   
                                                                <label className=" col-form-label label-form">Order</label>
                                                                <div className="">
                                                                    <input type="text" className="form-control" name="fl"/>
                                                                </div>
                                                            </div>
                                                            <div className="p-0 col-md-4">
                                                                <label className=" col-form-label label-form">Cycle ID</label>
                                                                <div className="">
                                                                    <input type="text" className="form-control" name="fl"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                </div>

                                            </div>

                                            

                                            <div className="col-md-6">
                                                <fieldset className="border p-2" >
                                                    <legend className="w-auto text-left">Polishing</legend>

                                                    <div className="form-row">
                                                        <div className="col-md-6 row">
                                                            <label className="col-md-5 col-form-label label-form">A. Machine Rough Cut</label>
                                                            <div className="col-md-7">
                                                                <select className="form-control">
                                                                    <option>select one</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 row">
                                                            <label className="col-md-5 col-form-label label-form">A. Machine Fine Cut</label>
                                                            <div className="col-md-7">
                                                                <select className="form-control">
                                                                    <option>select one</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="col-md-6 row">
                                                            <label className="col-md-5 col-form-label label-form">On Time</label>
                                                            <div className="col-md-7">
                                                                <input type="text" className="form-control" name="cyls1" />
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="col-md-6 row">
                                                            <label className="col-md-5 col-form-label label-form">Polishing Date</label>
                                                            <div className="col-md-7">
                                                                <input type="date" className="form-control" name="cyls1" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-row">
                                                        <div className="col-md-6 row">
                                                            <label className="col-md-5 col-form-label label-form">Production Date</label>
                                                            <div className="col-md-7">
                                                                <input type="date" className="form-control" name="cyls1" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 row">
                                                            <label className="col-md-5 col-form-label label-form">Shift</label>
                                                            <div className="col-md-7">
                                                                <input type="text" className="form-control" name="cyls1" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="col-md-6 row">
                                                            <label className="col-md-5 col-form-label label-form">Est, Duration</label>
                                                            <div className="col-md-5">
                                                                <input type="time" className="form-control" name="cyls1" />
                                                            </div>
                                                            <label className="col-md-2 col-form-label label-form pull-right">hh:mm</label>
                                                        </div>
                                                        <div className="col-md-6 row">
                                                            <label className="col-md-5 col-form-label label-form">Est, End Time</label>
                                                            <div className="col-md-7">
                                                                <input type="text" className="form-control" name="cyls1" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-row">
                                                        <div className="col-md-6 row">
                                                            
                                                            <label className="col-md-5 col-form-label label-form">Rework <input type="checkbox" /> Rework reason</label>
                                                            <div className="col-md-7">
                                                                <select className="form-control">
                                                                    <option>select one</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 row">
                                                            <label className="col-md-5 col-form-label label-form">Done by</label>
                                                            <div className="col-md-7">
                                                                <select className="form-control">
                                                                    <option>select one</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </fieldset>

                                                <fieldset className="border p-2" >
                                                    <legend className="w-auto text-left">Output, QC and Remarks</legend>

                                                    <div className="form-row">
                                                        <div className="col-md-6 row">
                                                            <label className="col-md-5 col-form-label label-form">Rework <input type="checkbox" /> Rework reason</label>
                                                            <div className="col-md-7">
                                                                <select className="form-control">
                                                                    <option>select one</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 row">
                                                            <label className="col-md-5 col-form-label label-form">Done by</label>
                                                            <div className="col-md-7">
                                                                <select className="form-control">
                                                                    <option>select one</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    
                                                </fieldset>

                                                <fieldset className="border p-2" >
                                                    <legend className="w-auto text-left">Polishing for this Job No./BCO</legend>

                                                    <div className="col-md-6">
                                                        <label className="col-md-1 col-form-label label-form" style={mt10}>Cyl SL</label>
                                                        <label className="col-md-3 col-form-label label-form" style={mt10}>Rough Cut Dia</label>
                                                        <label className="col-md-3 col-form-label label-form" style={mt10}>Fice Cut Dia</label>
                                                        <label className="col-md-2 col-form-label label-form" style={mt10}>R. Cut Mach</label>
                                                        <label className="col-md-3 col-form-label label-form" style={mt10}>F. Cut Mach</label>
                                                    </div>

                                                    <div className="col-md-6 pull-right">
                                                        <label className="col-md-2 col-form-label label-form" style={mt10}>Date Polishing </label>
                                                        <label className="col-md-2 col-form-label label-form" style={mt10}> Shift</label>
                                                        <label className="col-md-2 col-form-label label-form" style={mt10}>Output Status </label>
                                                        <label className="col-md-2 col-form-label label-form" style={mt10}>Operaton</label>
                                                        <label className="col-md-2 col-form-label label-form" style={mt10}>Re-Work</label>
                                                        <label className="col-md-2 col-form-label label-form" style={mt10}>Remarks</label>
                                                    </div>     

                                                    <div className="col-md-6">

                                                        <div className="col-md-1">
                                                            <input type="text" className="form-control" name="fl"/>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <input type="text" className="form-control" name="fl"/>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <input type="text" className="form-control" name="fl"/>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <input type="text" className="form-control" name="fl"/>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <input type="text" className="form-control" name="fl"/>
                                                        </div>
                                                
                                                    </div>

                                                    <div className="col-md-6 pull-right">
                                                        <div className="col-md-2">
                                                            <input type="text" className="form-control" name="fl"/>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <input type="text" className="form-control" name="fl"/>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <input type="text" className="form-control" name="fl"/>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <input type="text" className="form-control" name="fl"/>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <input type="text" className="form-control" name="fl"/>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <input type="text" className="form-control" name="fl"/>
                                                        </div>
                                                        
                                                    </div>   
            
                                                </fieldset>

                                            </div>

                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">

                        <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                            <div className="row">
                                <div className="col-md-6">

                                    {/* <div className="cart">
                                        <fieldset className="border p-2" >
                                            <legend className="w-auto text-left">Job and base Information</legend>

                                            <div className="row col-md-12">
                                                <label className="col-md-1 col-form-label label-form pull-left">BGO</label>
                                                <div className="col-md-2 pull-left">
                                                    <input type="text" className="form-control" name="bgo" />
                                                </div>

                                                <label className="col-md-2 col-form-label label-form pull-left">Job Name</label>
                                                <div className="col-md-3 pull-left">
                                                    <input type="text" className="form-control" name="jobname" disabled />
                                                </div>

                                                <label className="col-md-2 col-form-label label-form pull-left">Job Type</label>
                                                <div className="col-md-2 pull-left">
                                                    <input type="text" className="form-control" name="job_typea" disabled />
                                                </div>
                                            </div>

                                            <div className="row col-md-12" style={mt10}>

                                                <div className="col-md-6">
                                                    <label className="col-md-2 col-form-label label-form pull-left">Cyl S1</label>
                                                    <div className="col-md-4 pull-left" style={{paddingLeft: "5px"}}>
                                                        <input type="text" className="form-control" name="cyls1" />
                                                    </div>

                                                    <label className="col-md-1 col-form-label label-form pull-left">Cyl</label>
                                                    <div className="col-md-2 pull-left">
                                                        <input type="text" className="form-control" name="cyl" disabled />
                                                    </div>

                                                    <label className="col-md-1 col-form-label label-form pull-left">FL</label>
                                                    <div className="col-md-2 pull-left">
                                                        <input type="text" className="form-control" name="fl" disabled/>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <label className="col-md-1 col-form-label label-form pull-left">Cir</label>
                                                    <div className="col-md-3 pull-left">
                                                        <input type="text" className="form-control" name="cyls1" disabled/>
                                                    </div>

                                                    <label className="col-md-1 col-form-label label-form pull-left">Dia</label>
                                                    <div className="col-md-3 pull-left">
                                                        <input type="text" className="form-control" name="cyl" disabled />
                                                    </div>

                                                    <label className="col-md-1 col-form-label label-form pull-left">S. Area</label>
                                                    <div className="col-md-3 pull-left">
                                                        <input type="text" className="form-control" name="fl" disabled/>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </fieldset>
                                    </div> */}

                                    <div className="cart col-md-6 pull-left" style={{paddingLeft: "0px",marginTop:"10px"}}>
                                        <fieldset className="border p-2" >
                                            <legend className="w-auto text-left">Grinding</legend>

                                            <div className="form-group">
                                                <label className="col-md-4 col-form-label label-form pull-left">Dia after Grinding</label>
                                                <div className="col-md-8 pull-left">
                                                    <input type="text" className="form-control" name="cyls1" />
                                                </div>
                                            </div>
                                            
                                            <div className="form-group">
                                                <label className="col-md-4 col-form-label label-form pull-left" style={mt10}>Dia-Final (Desired)</label>
                                                <div className="col-md-8 pull-left" style={mt10}>
                                                    <input type="text" className="form-control" name="cyls1" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-md-4 col-form-label label-form pull-left" style={mt10}>Des. Polishing</label>
                                                <div className="col-md-8 pull-left" style={mt10}>
                                                    <input type="text" className="form-control" name="cyls1" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-md-4 col-form-label label-form pull-left" style={mt10}>Remarks</label>
                                                <div className="col-md-8 pull-left" style={mt10}>
                                                    <input type="text" className="form-control" name="cyls1" />
                                                </div>
                                            </div>

                                            
                                        </fieldset>
                                    </div>

                                    <div className="cart col-md-6 pull-right" style={mt10}>
                                        <fieldset className="border p-2" >
                                            <legend className="w-auto text-left">Grinding</legend>

                                            <div className="row col-md-12">
                                                <label className="col-md-4 col-form-label label-form pull-left">Plating Count</label>
                                                
                                                <label className="col-md-4 col-form-label label-form pull-left">Plating Order</label>
                                                
                                                <label className="col-md-4 col-form-label label-form pull-left">Plating Cycle ID</label>
                                            </div>

                                            <div className="row col-md-12">
                                                <div className="col-md-4 pull-left">
                                                    <input type="text" className="form-control" name="fl"/>
                                                </div>
                                                <div className="col-md-4 pull-left">
                                                    <input type="text" className="form-control" name="fl"/>
                                                </div>
                                                <div className="col-md-4 pull-left">
                                                    <input type="text" className="form-control" name="fl"/>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>

                                
                                </div>

                                <div className="col-md-6">

                                    <div className="col-md-12">
                                        <fieldset className="border p-2" >
                                            <legend className="w-auto text-left">Polishing</legend>

                                            <div className="col-md-6 pull-left">
                                                <div className="row">
                                                    <label className="col-md-5 col-form-label label-form pull-left">A. Machine Rough Cut</label>
                                                    <div className="col-md-7 pull-left">
                                                        <select className="form-control">
                                                            <option>select one</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                
                                                <div className="row">
                                                    <label className="col-md-5 col-form-label label-form pull-left" style={mt10}>On Time</label>
                                                    <div className="col-md-7 pull-left" style={mt10}>
                                                        <input type="text" className="form-control" name="cyls1" />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-md-5 col-form-label label-form pull-left" style={mt10}>Production Date</label>
                                                    <div className="col-md-7 pull-left" style={mt10}>
                                                        <input type="date" className="form-control" name="cyls1" />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-md-5 col-form-label label-form pull-left" style={mt10}>Est, Duration</label>
                                                    <div className="col-md-5 pull-left" style={mt10}>
                                                        <input type="time" className="form-control" name="cyls1" />
                                                    </div>
                                                    <label className="col-md-2 col-form-label label-form pull-right" style={mt10}>hh:mm</label>
                                                </div>
                                                <div className="row">
                                                    
                                                    <label className="col-md-5 col-form-label label-form pull-left" style={mt10}>Rework <input type="checkbox" /> Rework reason</label>
                                                    <div className="col-md-7 pull-left" style={mt10}>
                                                        <select className="form-control">
                                                            <option>select one</option>
                                                        </select>
                                                    </div>
                                                </div>
    
                                            </div>

                                            <div className="col-md-6 pull-right">
                                                <div className="row">
                                                    <label className="col-md-5 col-form-label label-form pull-left">A. Machine Fine Cut</label>
                                                    <div className="col-md-7 pull-left">
                                                        <select className="form-control">
                                                            <option>select one</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                
                                                <div className="row">
                                                    <label className="col-md-5 col-form-label label-form pull-left" style={mt10}>Polishing Date</label>
                                                    <div className="col-md-7 pull-left" style={mt10}>
                                                        <input type="date" className="form-control" name="cyls1" />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-md-5 col-form-label label-form pull-left" style={mt10}>Shift</label>
                                                    <div className="col-md-7 pull-left" style={mt10}>
                                                        <input type="text" className="form-control" name="cyls1" />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-md-5 col-form-label label-form pull-left" style={mt10}>Est, End Time</label>
                                                    <div className="col-md-7 pull-left" style={mt10}>
                                                        <input type="text" className="form-control" name="cyls1" />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-md-5 col-form-label label-form pull-left" style={mt10}>Done by</label>
                                                    <div className="col-md-7 pull-left" style={mt10}>
                                                        <select className="form-control">
                                                            <option>select one</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>                                                
                                            
    
                                        </fieldset>
                                    </div>

                                    <div className="col-md-12" style={mt10}>
                                        <fieldset className="border p-2" >
                                            <legend className="w-auto text-left">Output, QC and Remarks</legend>

                                            <div className="col-md-8 pull-left">
                                                <label className="col-md-6 col-form-label label-form pull-left" style={mt10}>Chrome Cylinder? <input type="checkbox" /> Dai after Rough Cut</label>
                                                <div className="col-md-5 pull-left" style={mt10}>
                                                    <input type="text" className="form-control" name="cyls1" />
                                                </div>
                                            </div>

                                            <div className="col-md-4 pull-right">
                                                    <label className="col-md-6 col-form-label label-form pull-left" style={mt10}>Dai after Fine Cut</label>
                                                    <div className="col-md-6 pull-left" style={mt10}>
                                                        <input type="text" className="form-control" name="cyls1" />
                                                    </div>
                                            </div>

                                            <div className="col-md-6 pull-left">
                                                <div className="form-group">
                                                    <label className="col-md-5 col-form-label label-form pull-left" style={mt10}>A. off Time</label>
                                                    <div className="col-md-7 pull-left" style={mt10}>
                                                        <input type="text" className="form-control" name="cyls1" />
                                                    </div>
                                                </div>
                                                
                                                <div className="form-group">
                                                    <label className="col-md-5 col-form-label label-form pull-left" style={mt10}>Output Status</label>
                                                    <div className="col-md-7 pull-left" style={mt10}>
                                                        <select className="form-control">
                                                            <option>select one</option>
                                                        </select>
                                                    </div>
                                                </div>

    
                                            </div>

                                            <div className="col-md-6 pull-right">
                                                <div className="form-group">
                                                    <label className="col-md-5 col-form-label label-form pull-left" style={mt10}>A. Duration</label>
                                                    <div className="col-md-5 pull-left" style={mt10}>
                                                        <input type="time" className="form-control" name="cyls1" />
                                                    </div>
                                                    <label className="col-md-2 col-form-label label-form pull-right" style={mt10}>hh:mm</label>
                                                </div>
                                                
                                                <div className="form-group">
                                                    <label className="col-md-5 col-form-label label-form pull-left" style={mt10}>Action if output is not OK</label>
                                                    <div className="col-md-7 pull-left" style={mt10}>
                                                        <input type="text" className="form-control" name="cyls1" />
                                                    </div>
                                                </div>

                                            </div>     

                                            <div className="col-md-12 pull-left">
                                                <label className="col-md-2 col-form-label label-form pull-left" style={mt10}>Remarks</label>
                                                <div className="col-md-10 pull-left" style={mt10}>
                                                    <input type="text" className="form-control" name="cyls1" />
                                                </div>
                                            </div>                                          
                                            
    
                                        </fieldset>
                                    </div>


                                    
                                    <div className="col-md-12" style={mt10}>
                                        <fieldset className="border p-2" >
                                            <legend className="w-auto text-left">Polishing for this Job No./BCO</legend>

                                            <div className="col-md-6 pull-left">

                                                <label className="col-md-1 col-form-label label-form pull-left" style={mt10}>Cyl SL</label>
                                                <label className="col-md-3 col-form-label label-form pull-left" style={mt10}>Rough Cut Dia</label>
                                                <label className="col-md-3 col-form-label label-form pull-left" style={mt10}>Fice Cut Dia</label>
                                                <label className="col-md-2 col-form-label label-form pull-left" style={mt10}>R. Cut
Mach</label>
                                                <label className="col-md-3 col-form-label label-form pull-left" style={mt10}>F. Cut
Mach</label>
                                                
                                            </div>

                                            <div className="col-md-6 pull-right">
                                                <label className="col-md-2 col-form-label label-form pull-left" style={mt10}>Date Polishing </label>
                                                <label className="col-md-2 col-form-label label-form pull-left" style={mt10}> Shift</label>
                                                <label className="col-md-2 col-form-label label-form pull-left" style={mt10}>Output Status </label>
                                                <label className="col-md-2 col-form-label label-form pull-left" style={mt10}>Operaton</label>
                                                <label className="col-md-2 col-form-label label-form pull-left" style={mt10}>Re-Work</label>
                                                <label className="col-md-2 col-form-label label-form pull-left" style={mt10}>Remarks</label>
                                            </div>     

                                            <div className="col-md-6 pull-left">

                                                <div className="col-md-1 pull-left">
                                                    <input type="text" className="form-control" name="fl"/>
                                                </div>
                                                <div className="col-md-3 pull-left">
                                                    <input type="text" className="form-control" name="fl"/>
                                                </div>
                                                <div className="col-md-3 pull-left">
                                                    <input type="text" className="form-control" name="fl"/>
                                                </div>
                                                <div className="col-md-2 pull-left">
                                                    <input type="text" className="form-control" name="fl"/>
                                                </div>
                                                <div className="col-md-3 pull-left">
                                                    <input type="text" className="form-control" name="fl"/>
                                                </div>
                                        
                                            </div>

                                            <div className="col-md-6 pull-right">
                                                <div className="col-md-2 pull-left">
                                                    <input type="text" className="form-control" name="fl"/>
                                                </div>
                                                <div className="col-md-2 pull-left">
                                                    <input type="text" className="form-control" name="fl"/>
                                                </div>
                                                <div className="col-md-2 pull-left">
                                                    <input type="text" className="form-control" name="fl"/>
                                                </div>
                                                <div className="col-md-2 pull-left">
                                                    <input type="text" className="form-control" name="fl"/>
                                                </div>
                                                <div className="col-md-2 pull-left">
                                                    <input type="text" className="form-control" name="fl"/>
                                                </div>
                                                <div className="col-md-2 pull-left">
                                                    <input type="text" className="form-control" name="fl"/>
                                                </div>
                                                
                                            </div>   
    
                                        </fieldset>
                                    </div>

                                </div>
                            </div>



                            <SubmitButton link="#" />
                        </form>
          
                        
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Add;