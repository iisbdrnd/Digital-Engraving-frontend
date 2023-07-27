import React, { Fragment, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { MACHINE_RSURL, userHasAccess } from '../../../../api/userUrl';
import { userGetMethod, userDeleteMethod } from '../../../../api/userAction';
import { AddButton, EditButton, DeleteButton, SubmitButton } from '../../../common/GlobalButton';
import { Link } from 'react-router-dom'
import Pagination from "react-js-pagination";
import useForm from "react-hook-form";

import { Accordion, AccordionItem } from 'react-light-accordion';
import 'react-light-accordion/demo/css/index.css';

export default function ListData(props) {
    
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { handleSubmit, register, errors } = useForm();

    var menuId = 0;
    if (props.location.state === undefined) {
        menuId = 0;
    } else {
        menuId = props.location.state.params.menuId;
    }
    
    const submitHandler = () => {}

    return (
        
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5>Plating Department List</h5>
                                    </div>
                                    
                                </div>
                            </div>
                            
                                
                            <div className="card-body datatable-react">
                                {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <>
                                        <div className="row">
                                            <div className="col-md-9">
                                                <div className="platingDept">
                                                    <div >
                                                        <p>Copper Plating</p>
                                                    </div>
                                                    

                                                    <Link to={{
                                                        pathname: `${process.env.PUBLIC_URL}/platingTankConfigure/add`,
                                                        state: { params: {menuId: menuId} }
                                                    }}className="col-md-1 btn btn-success">C1</Link>
                                                    <Link className="col-md-1 btn btn-success">C1</Link>
                                                    <Link className="col-md-1 btn btn-success">C1</Link>
                                                    <Link className="col-md-1 btn btn-success">C1</Link>
                                                    <Link className="col-md-1 btn btn-success">C1</Link>
                                                    <Link className="col-md-1 btn btn-success">C1</Link>
                                                    <Link className="col-md-1 btn btn-success">C1</Link>
                                                    <Link className="col-md-1 btn btn-success">C1</Link>
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-lg-3">
                                                <Link className="mt-3 btn btn-info" style={{'marginRight': '3px'}}>Tank Settings</Link>
                                                <Link 
                                                    to={{
                                                        pathname: `#`,
                                                        state: { params: {menuId: menuId} }
                                                    }} className="btn btn-primary bt-xs mt-3" style={{'marginRight': '5px'}}>
                                                        Shift
                                                </Link>
                                                
                                                <Link className="btn btn-warning bt-xs mt-2 mr-1">Plating Schedule</Link>
                                                <Link className="btn btn-danger bt-xs mt-2 mr-1">All Tanks</Link>
                                            </div>
                                        </div>
                                    </>
                                )}
                                
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5>Next Cycle 1</h5>
                                    </div>
                                    <div className="col-md-6">
                                        <ul className="d-flex pull-right">
                                            <li className="p-r-10"><i className="fa fa-minus"></i></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body" >
                                <div class="panel">
                                    <table className="table table-bordered m-t-10" style={{width: '100%'}}>
                                        <thead>
                                            <tr>
                                                <th width="5%">Slot</th>
                                                <th width="10%">Cylinder Id</th>
                                                <th width="15%">Job Name</th>
                                                <th width="5%">FL</th>
                                                <th width="5%">Cir</th>
                                                <th width="5%">Dia</th>
                                                <th width="10%">Plating Area</th>
                                                <th width="10%">Surface Area</th>
                                                <th width="10%">Priority Level</th>
                                                <th width="10%">QC Level</th>
                                                <th width="10%">With Copper</th>
                                            </tr>
                                            
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td> 
                                                    <input className="form-control" name="before_fl" id="before_fl" type="number" placeholder="Slot" />
                                                </td>
                                                <td> 
                                                    <input className="form-control" name="before_fl" id="before_fl" type="number" placeholder="FL" />
                                                </td>
                                                <td>
                                                    <input className="form-control" name="before_fl" id="before_fl" type="number" placeholder="FL" />

                                                </td>
                                                <td>
                                                    <input className="form-control" name="before_fl" id="before_fl" type="number" placeholder="FL" />

                                                </td>
                                                <td>
                                                    <input className="form-control" name="before_fl" id="before_fl" type="number" placeholder="FL" />

                                                </td>
                                                <td>
                                                    <input className="form-control" name="before_fl" id="before_fl" type="number" placeholder="FL" />

                                                </td>
                                                <td>
                                                    <input className="form-control" name="before_fl" id="before_fl" type="number" placeholder="FL" />

                                                </td>
                                                <td>
                                                    <input className="form-control" name="before_fl" id="before_fl" type="number" placeholder="FL" />

                                                </td>
                                                <td>
                                                    <input className="form-control" name="before_fl" id="before_fl" type="number" placeholder="FL" />

                                                </td>
                                                <td>
                                                    <input className="form-control" name="before_fl" id="before_fl" type="number" placeholder="FL" />

                                                </td>
                                                <td>
                                                    <input className="form-control" name="before_fl" id="before_fl" type="number" placeholder="FL" />

                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>





                        <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5>Next Cycle 1</h5>
                                    </div>
                                </div>
                            </div>
                            
                                 
                            <div className="card-body datatable-react">
                                {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <>
                                        <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                            <fieldset className="border" style={{width: '98%'}}> 
                                                <legend className="w-auto text-left">Current Cycle</legend>

                                                <div className="row">
                                                    <div className="col-md-10 form-group row">
                                                        <label className="col-sm-1 col-form-label" htmlFor="design_width">Cycle#</label>
                                                        <div className="col-sm-3">
                                                            <input 
                                                                className="form-control" 
                                                                id="design_width" 
                                                                name="design_width" 
                                                                type="text" 
                                                                placeholder="Cycle#" 
                                                                // value={jobOrderData.design_width}
                                                                // onChange={e=>calculateFormValue(e)}
                                                                ref={register({
                                                                    required: 'Cycle# Field Required'
                                                                })}
                                                            />
                                                            {errors.design_width && <p className='text-danger'>{errors.design_width.message}</p>}
                                                        </div>
                                                    </div>
                                                    <Link className="btn btn-warning bt-xs m-1 col-md-2" style={{whiteSpace: "normal"}}>Plan Next Cycle (Manual)</Link>
                                                </div>

                                                <div className="col-md-12 m-t-2">
                                                    <div className="m-t-10">
                                                        <Accordion atomic={true}>
                                                            <AccordionItem className="card-header bg-info p-0" title="Test 1">
                                                                <div className="pull-right m-1">
                                                                    <button className="btn btn-secondary text-center">Add New</button>
                                                                </div>
                                                                <table className="table table-bordered" style={{width: '100%'}}>
                                                                    <thead>
                                                                        <tr>
                                                                            <th width="5%">Slot</th>
                                                                            <th width="10%">Cylinder Id</th>
                                                                            <th width="15%">Job Name</th>
                                                                            <th width="5%">FL</th>
                                                                            <th width="5%">Cir</th>
                                                                            <th width="5%">Dia</th>
                                                                            <th width="10%">Plating Area</th>
                                                                            <th width="10%">Surface Area</th>
                                                                            <th width="10%">Priority Level</th>
                                                                            <th width="10%">QC Level</th>
                                                                            <th width="10%">With Copper</th>
                                                                        </tr>
                                                                        
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td> 
                                                                                <input className="form-control" name="before_fl" id="before_fl" type="number" placeholder="Slot" />
                                                                            </td>
                                                                            <td> 
                                                                                <input className="form-control" name="before_fl" id="before_fl" type="number" placeholder="FL" />
                                                                            </td>
                                                                            <td>
                                                                                <input className="form-control" name="before_fl" id="before_fl" type="number" placeholder="FL" />

                                                                            </td>
                                                                            <td>
                                                                                <input className="form-control" name="before_fl" id="before_fl" type="number" placeholder="FL" />

                                                                            </td>
                                                                            <td>
                                                                                <input className="form-control" name="before_fl" id="before_fl" type="number" placeholder="FL" />

                                                                            </td>
                                                                            <td>
                                                                                <input className="form-control" name="before_fl" id="before_fl" type="number" placeholder="FL" />

                                                                            </td>
                                                                            <td>
                                                                                <input className="form-control" name="before_fl" id="before_fl" type="number" placeholder="FL" />

                                                                            </td>
                                                                            <td>
                                                                                <input className="form-control" name="before_fl" id="before_fl" type="number" placeholder="FL" />

                                                                            </td>
                                                                            <td>
                                                                                <input className="form-control" name="before_fl" id="before_fl" type="number" placeholder="FL" />

                                                                            </td>
                                                                            <td>
                                                                                <input className="form-control" name="before_fl" id="before_fl" type="number" placeholder="FL" />

                                                                            </td>
                                                                            <td>
                                                                                <input className="form-control" name="before_fl" id="before_fl" type="number" placeholder="FL" />

                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </AccordionItem>
                                                        </Accordion>
                                                    </div>
                                                    <div className="m-t-10">
                                                        <Accordion atomic={true}>
                                                            <AccordionItem className="card-header bg-info p-0" title="Test 1">
                                                                <div className="pull-right m-1"  style={{marginTop: '10px'}}>
                                                                    <button className="btn btn-secondary text-center">Add New</button>
                                                                </div>
                                                                <table className="table table-bordered" style={{width: '100%'}}>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Slot</th>
                                                                            <th>Cylinder</th>
                                                                            <th>Job Name</th>
                                                                            <th>FL</th>
                                                                            <th>Cir</th>
                                                                            <th>Dia</th>
                                                                            <th>Plating Area</th>
                                                                            <th>Surface Area</th>
                                                                            <th>Priority Level</th>
                                                                            <th>QC Level</th>
                                                                            <th>With Copper</th>
                                                                        </tr>
                                                                        
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td> Hello </td>
                                                                            <td> Hello </td>
                                                                            <td> Hello </td>
                                                                            <td> Hello </td>
                                                                            <td> Hello </td>
                                                                            <td> Hello </td>
                                                                            <td> Hello </td>
                                                                            <td> Hello </td>
                                                                            <td> Hello </td>
                                                                            <td> Hello </td>
                                                                            <td> Hello </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </AccordionItem>
                                                        </Accordion>
                                                    </div>
                                                    {/* <Accordion atomic={true}>
                                                        <AccordionItem className="card-header bg-primary" style={{marginTop: '2px'}} title="Test 2">
                                                            <>
                                                                <div className="default-according style-1">
                                                                    <div className="card">
                                                                        <div className="form-group">
                                                                        <table className="table table-bordered" style={{width: '100%'}}>
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Slot</th>
                                                                                    <th>Cylinder</th>
                                                                                    <th>Job Name</th>
                                                                                    <th>FL</th>
                                                                                    <th>Cir</th>
                                                                                    <th>Dia</th>
                                                                                    <th>Plating Area</th>
                                                                                    <th>Surface Area</th>
                                                                                    <th>Priority Level</th>
                                                                                    <th>QC Level</th>
                                                                                    <th>With Copper</th>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td> </td>
                                                                                    <td> </td>
                                                                                    <td> </td>
                                                                                    <td> </td>
                                                                                    <td> </td>
                                                                                    <td> </td>
                                                                                    <td> </td>
                                                                                    <td> </td>
                                                                                    <td> </td>
                                                                                    <td> </td>
                                                                                    <td> </td>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                
                                                                            </tbody>
                                                                        </table>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </> 
                                                            
                                                        </AccordionItem>
                                                    </Accordion> */}
                                                </div>
                                            </fieldset>

                                            <SubmitButton link="platingDept/index" addClass="offset-md-2" menuId={ menuId } />
                                        </form>
                                    </>
                                )}
                                
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}