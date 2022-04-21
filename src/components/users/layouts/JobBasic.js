import React, { Fragment } from 'react';
import useForm from 'react-hook-form'

const JobBasic = () => {
    const { register, handleSubmit, errors } = useForm(); // initialise the hook

    const onSubmit = data => {

        if (data != '') {
            alert('You submitted the form and stuff!');
            // props.history.push('/ecommerce/invoice');
        } else {
            errors.showMessages();
        }
    };
    return (
        <Fragment>
            <div className="row">
                <div className="col-sm-12">
                    <form className="needs-validation theme-form" onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-group row offset-md-2">
                            <label className="col-sm-2 col-form-label required" htmlFor="job_name">Job Name</label>
                            <div className="col-sm-7">
                                <input className="form-control" id="job_name" name="job_name" type="text" placeholder="Job Name" ref={register({ required: true })}/>
                                {errors.job_name && 'Job Name is required'}
                                <div className="valid-feedback">Looks good!</div>
                            </div>
                        </div>

                        <div className="form-group row offset-md-2">
                            <label className="col-sm-2 col-form-label required" htmlFor="subclass_id">Sub Class</label>
                            <div className="col-sm-7">
                                <select name="subclass_id" id="subclass_id" required className="form-control" 
                                defaultValue="">
                                    <option>Select One</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group row offset-md-2">
                            <label className="col-sm-2 col-form-label required" htmlFor="client_name">Client Name</label>
                            <div className="col-sm-7">
                                <input className="form-control" id="client_name" name="client_name" type="text" placeholder="Client Name" ref={register({ required: true })} />
                                {errors.client_name && 'Client Name is required'}
                                <div className="valid-feedback">Looks good!</div>
                            </div>
                        </div>

                        <div className="form-group row offset-md-2">
                            <label className="col-sm-2 col-form-label required" htmlFor="printer_name_id">Printer Name</label>
                            <div className="col-sm-7">
                                <select name="printer_name_id" id="printer_name_id" required className="form-control" 
                                defaultValue="">
                                    <option>Select One</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group row offset-md-2">
                            <label className="col-sm-2 col-form-label required" htmlFor="delivery_date">Date of Delivery</label>
                            <div className="col-sm-7">
                                <input className="form-control digits" id="delivery_date" name="delivery_date" type="date" defaultValue="2018-01-01" />
                            </div>
                        </div>

                        <div className="form-group row offset-md-2">
                            <label className="col-sm-2 col-form-label required" htmlFor="design_location_id">Design Location</label>
                            <div className="col-sm-7">
                                <select name="design_location_id" id="design_location_id" required className="form-control" 
                                defaultValue="">
                                    <option>Select One</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group row offset-md-2">
                            <label className="col-sm-2 col-form-label required" htmlFor="marketing_person_id">Marketing Person</label>
                            <div className="col-sm-7">
                                <select name="marketing_person_id" id="marketing_person_id" required className="form-control" 
                                defaultValue="">
                                    <option>Select One</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default JobBasic;