import React, { Fragment , useEffect, useState } from 'react';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton'

const Form = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [cylTypeCheckbox, setCylTypeCheckbox] = useState(0);
    const [reportTypeCheckbox, setReportTypeCheckbox] = useState(0);

    var menuId = 0;
    if (props.location.state === undefined) {
        menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }

    const submitHandler = (data, e) => {
        var url = `${process.env.PUBLIC_URL}/dailyProduction/report/${data.date}/${data.cylinder_type ? data.cylinder_type : null}/${data.report_type ? data.report_type : null}`;
        console.log({url});
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
                                        <h5>Daily Production Form</h5>
                                    </div>
                                    <div className="col-md-6">
                                        {/* <PanelRefreshIcons panelRefresh={pageRefreshHandler} /> */}
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit(submitHandler)} className="needs-validation theme-form">
                                    
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label" htmlFor="from_date">Date</label>
                                        <div className="col-sm-4">
                                            <input 
                                                className="form-control"
                                                id="date" 
                                                name="date" 
                                                type="date"
                                                ref={register({
                                                    required: 'From Date Field Required'
                                                })}
                                            />
                                            {errors.date && <p className='text-danger'>{errors.date.message}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Cylinder Type</label>
                                        <div className="col-sm-1 mt-2">
                                            <input 
                                                onChange={(e)=>setCylTypeCheckbox(e.target.value)}
                                                name="cyl_type_checkbox" 
                                                type="radio"
                                                value="1"
                                            /> Yes
                                        </div>
                                        <div className="col-sm-2 mt-2">
                                            <input 
                                                onChange={(e)=>setCylTypeCheckbox(e.target.value)}
                                                name="cyl_type_checkbox" 
                                                type="radio"
                                                value="0"
                                            /> No
                                        </div>
                                        {cylTypeCheckbox == 1 ? (
                                            <div className="col-sm-2">
                                                <select className="form-control" name="cylinder_type" ref={register({})}>
                                                    <option value="">Select Type</option>
                                                    <option value="A">A</option>
                                                    <option value="B">B</option>
                                                    <option value="C">C</option>
                                                </select>
                                            </div>
                                        ) : null}
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