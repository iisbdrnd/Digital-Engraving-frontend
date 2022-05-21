import React, { Fragment , useEffect, useState } from 'react';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton'

const Form = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [reportTypeCheckbox, setReportTypeCheckbox] = useState(0);

    var menuId = 0;
    if (props.location.state === undefined) {
        menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }
    
    const submitHandler = (data, e) => {
        const job_date = data.job_date;
        let url =  `${process.env.PUBLIC_URL}/dailyJobFlowDetails/report/${job_date}/${data.report_type ? data.report_type : null}`;
        window.open(url, '_blank', 'height=800,width=1200');
    }
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5>Daily Job Flow Details Report Form</h5>
                                    </div>
                                    <div className="col-md-6">
                                        {/* <PanelRefreshIcons panelRefresh={pageRefreshHandler} /> */}
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit(submitHandler)} className="needs-validation theme-form">

                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label" htmlFor="job_date">Job Date</label>
                                        <div className="col-sm-4">
                                            <input 
                                                className="form-control"
                                                id="job_date" 
                                                name="job_date" 
                                                type="date"
                                                ref={register({
                                                    required: 'Job Date Field Required'
                                                })}
                                            />
                                            {errors.job_date && <p className='text-danger'>{errors.job_date.message}</p>}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Employee Wise Report</label>
                                        <div className="col-sm-1 mt-2">
                                            <input 
                                                onSelect={(e)=>setReportTypeCheckbox(e.target.value)}
                                                ref={register({})}
                                                name="report_type" 
                                                type="checkbox"
                                                value="employeeWise"
                                            /> Yes
                                        </div>
                                    </div>
                                    
                                    <SubmitButton link="#" offset="2" menuId={ menuId }/>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
export default Form;