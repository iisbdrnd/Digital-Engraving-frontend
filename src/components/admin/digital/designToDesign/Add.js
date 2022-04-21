import React, { Fragment, useState } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';

const Add = () => {
    const { handleSubmit, register, errors } = useForm();

    const [resource, setResource] = useState(false)
    const [status, setStatus] = useState(true)

    const submitHandler = (data) => {
        
    }
    
    return (
        
        <Fragment>
            <Breadcrumb title="Design To Design Add" parent="Design To Design" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Design To Design Section</h5>
                            </div>
                            <form onSubmit={handleSubmit(submitHandler)} className="needs-validation theme-form">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-12">

                                            <div className="row offset-md-2 mb-2">
                                                <label className="col-sm-2 col-form-label" htmlFor="job_no">Job No</label>
                                                <div className="col-sm-7">
                                                    <input disabled className="form-control" id="job_no" name="job_no" type="text" placeholder="Job No"/>
                                                </div>
                                            </div>

                                            <div className="row offset-md-2 mb-2">
                                                <label className="col-sm-2 col-form-label" htmlFor="send_date">Send Date</label>
                                                <div className="col-sm-7">
                                                    <input className="form-control digits" id="send_date" name="send_date" type="date" defaultValue="2018-01-01" ref={register({ required: true })} />
                                                    {errors.send_date && 'Send Date is required'}
                                                    <div className="valid-feedback">Looks good!</div>
                                                </div>
                                            </div>

                                            <div className="row offset-md-2 mb-2">
                                                <label className="col-sm-2 col-form-label" htmlFor="job_name">Job Name</label>
                                                <div className="col-sm-7">
                                                    <input disabled className="form-control" id="job_name" name="job_name" type="text" placeholder="Job Name"/>
                                                </div>
                                            </div>

                                            <div className="row offset-md-2 mb-2">
                                                <label className="col-sm-2 col-form-label" htmlFor="client_name">Client Name</label>
                                                <div className="col-sm-7">
                                                    <input disabled className="form-control" id="client_name" name="client_name" type="text" placeholder="Client Name" />
                                                </div>
                                            </div>

                                            <div className="row offset-md-2 mb-2">
                                                <label className="col-sm-2 col-form-label" htmlFor="printer_name_id">Printer Name</label>
                                                <div className="col-sm-7">
                                                    <input disabled className="form-control" id="printer_name_id" name="printer_name_id" type="text" placeholder="Printer Name" />
                                                </div>
                                            </div>

                                            <div className="row offset-md-2 mb-2">
                                                <label className="col-sm-2 col-form-label" htmlFor="no_of_cylinder">No of Cylinder</label>
                                                <div className="col-sm-7">
                                                    <input disabled className="form-control" id="no_of_cylinder" name="no_of_cylinder" type="text" placeholder="No of Cylinder" />
                                                </div>
                                            </div>

                                            <div className="row offset-md-2 mb-2">
                                                <label className="col-sm-2 col-form-label" htmlFor="remark">Remarks</label>
                                                <div className="col-sm-7">
                                                    <input className="form-control" id="remark" name="remark" type="text" placeholder="Remarks" ref={register({ required: true })} />
                                                    {errors.remark && 'Remarks is required'}
                                                    <div className="valid-feedback">Looks good!</div>
                                                </div>
                                            </div>
                                        
                                        </div>
                                    </div>
                                </div>
                                <SubmitButton link="menu/list" offset="4"/>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Add;