import React, { Fragment } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { designationRsURL } from '../../../api/adminUrl';
import { adminPostMethod } from '../../../api/action';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../common/GlobalButton';

const Add = () => {
    const { handleSubmit, register, errors } = useForm();

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
   
    
    return (
        <Fragment>
            <Breadcrumb title="Design To Factory" parent="Design To Factory" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                            <div className="cart">
                                <fieldset className="border p-2" >
                                    <legend className="w-auto text-left">Design To Factory</legend>

                                        <label className="col-md-2 col-form-label label-form pull-left">Job No</label>
                                        <div className="col-md-10 pull-left">
                                            <input type="text" className="form-control" name="cyls1" disabled />
                                        </div>
                          
                                        <div className="clearfix"></div>
                                        
                                        <label className="col-md-2 col-form-label label-form pull-left" style={mt10}>Send Date</label>
                                        <div className="col-md-10 pull-left" style={mt10}>
                                            <input type="date" className="form-control" name="cyls1" />
                                        </div>

                                        <div className="clearfix"></div>

                                        <label className="col-md-2 col-form-label label-form pull-left" style={mt10}>Job Name</label>
                                        <div className="col-md-10 pull-left" style={mt10}>
                                            <input type="text" className="form-control" name="cyls1" disabled />
                                        </div>

                                        <div className="clearfix"></div>

                                        <label className="col-md-2 col-form-label label-form pull-left" style={mt10}>Client Name</label>
                                        <div className="col-md-10 pull-left" style={mt10}>
                                            <input type="text" className="form-control" name="cyls1" disabled />
                                        </div>

                                        <div className="clearfix"></div>

                                        <label className="col-md-2 col-form-label label-form pull-left" style={mt10}>Printer Name</label>
                                        <div className="col-md-10 pull-left" style={mt10}>
                                            <input type="text" className="form-control" name="cyls1" disabled />
                                        </div>
                                        <div className="clearfix"></div>

                                        <label className="col-md-2 col-form-label label-form pull-left" style={mt10}>No of Cylinder</label>
                                        <div className="col-md-10 pull-left" style={mt10}>
                                            <input type="text" className="form-control" name="cyls1" disabled />
                                        </div>
                                        <div className="clearfix"></div>

                                        <label className="col-md-2 col-form-label label-form pull-left" style={mt10}>Remarks</label>
                                        <div className="col-md-10 pull-left" style={mt10}>
                                            <input type="text" className="form-control" name="cyls1" />
                                        </div>

                                </fieldset>
                            </div>

                            <SubmitButton link="#" />
                        </form>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </Fragment>
    );
};

export default Add;