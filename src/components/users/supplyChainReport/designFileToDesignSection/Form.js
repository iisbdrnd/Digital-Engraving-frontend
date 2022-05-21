import React, { Fragment , useEffect, useState } from 'react';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton'

const Form = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [reportType, setReportType] = useState(null);

    var menuId = 0;
    if (props.location.state === undefined) {
        menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }
    
    // const submitHandler = (data, e) => {
    //     const from_date = data.from_date;
    //     console.log('from_date ', data);
    //     var url = `${process.env.PUBLIC_URL}/designFileToFactoryReport/${from_date}`;
    //     window.open(url, '_blank', 'height=800,width=1200');
    // }
    const submitHandler = (data, e) => {
        const from_date = data.from_date;
        let url =  `${process.env.PUBLIC_URL}/designToDesignReport/${from_date}`;
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
                                        <h5>Design to Design Report Form</h5>
                                    </div>
                                    <div className="col-md-6">
                                        {/* <PanelRefreshIcons panelRefresh={pageRefreshHandler} /> */}
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit(submitHandler)} className="needs-validation theme-form">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label" htmlFor="from_date">From</label>
                                        <div className="col-sm-4">
                                            <input 
                                                className="form-control"
                                                id="from_date" 
                                                name="from_date" 
                                                type="date"
                                                ref={register({
                                                    required: 'From Date Field Required'
                                                })}
                                            />
                                            {errors.from_date && <p className='text-danger'>{errors.from_date.message}</p>}
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