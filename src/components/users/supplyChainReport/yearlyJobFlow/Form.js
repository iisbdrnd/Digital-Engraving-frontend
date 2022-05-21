import React, { Fragment , useEffect, useState } from 'react';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton'

const Form = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [cylTypeCheckbox, setCylTypeCheckbox] = useState(0);

    var menuId = 0;
    if (props.location.state === undefined) {
        menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }

    const submitHandler = (data, e) => {
        // const job_order_id = data.job_order_id;
        var url = `${process.env.PUBLIC_URL}/yearlyJobFlow/report/${data.report_type}/${data.year}/${data.cylinder_type ? data.cylinder_type : null}`;
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
                                        <h5>Yearly Job Flow Form</h5>
                                    </div>
                                    <div className="col-md-6">
                                        {/* <PanelRefreshIcons panelRefresh={pageRefreshHandler} /> */}
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit(submitHandler)} className="needs-validation theme-form">
                                    
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label" htmlFor="report_type">Report Type</label>
                                        <div className="col-sm-2">
                                            <select className="form-control" name="report_type" ref={register({})}>
                                                <option value="">Select One</option>
                                                <option value="weekly">Weekly</option>
                                                <option value="monthly">Monthly</option>
                                            </select>
                                        </div>
                                        <label className="col-sm-1 col-form-label" htmlFor="year">Year</label>
                                        <div className="col-sm-2">
                                            <select className="form-control" name="year" ref={register({})}>
                                                <option value="">Select One</option>
                                                <option value="2015">2015</option>
                                                <option value="2016">2016</option>
                                                <option value="2017">2017</option>
                                                <option value="2018">2018</option>
                                                <option value="2019">2019</option>
                                                <option value="2020">2020</option>
                                                <option value="2021">2021</option>
                                                <option value="2022">2022</option>
                                                <option value="2023">2023</option>
                                                <option value="2024">2024</option>
                                                <option value="2025">2025</option>
                                                <option value="2026">2026</option>
                                                <option value="2027">2027</option>
                                                <option value="2028">2028</option>
                                                <option value="2029">2029</option>
                                                <option value="2030">2030</option>
                                            </select>
                                            {errors.year && <p className='text-danger'>{errors.year.message}</p>}
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