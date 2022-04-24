import React, { Fragment , useEffect, useState } from 'react';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton'

const Form = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    //const [reportType, setReportType] = useState(null);

    var menuId = 0;
    if (props.location.state === undefined) {
        menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }

    const submitHandler = (data, e) => {
        const date = data.date;
        let url =  `${process.env.PUBLIC_URL}/dailyDesignFileToFactoryReport/${date}`;
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
                                        <h5>Daily Design File to Factory Report Form</h5>
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