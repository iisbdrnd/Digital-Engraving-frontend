import React, { Fragment , useEffect, useState } from 'react';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton'

const Form = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);

    var menuId = 0;
    if (props.location.state === undefined) {
        menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }

    const submitHandler = (data, e) => {
        // const job_order_id = data.job_order_id;
        var url = `${process.env.PUBLIC_URL}/finishedCylinderStatus/123`;
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
                                        <h5>Finished Cylinder Status</h5>
                                    </div>
                                    <div className="col-md-6">
                                        {/* <PanelRefreshIcons panelRefresh={pageRefreshHandler} /> */}
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit(submitHandler)} className="needs-validation theme-form">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label" htmlFor="job_order_id">From</label>
                                        <div className="col-sm-2">
                                            <input 
                                                className="form-control"
                                                id="form_date" 
                                                name="form_date" 
                                                type="date" 
                                                placeholder="From"
                                                ref={register({
                                                    required: 'From Field Required'
                                                })}
                                            />
                                            {errors.job_order_id && <p className='text-danger'>{errors.job_order_id.message}</p>}
                                        </div>
                                        <label className="col-sm-1 col-form-label" htmlFor="job_order_id">To</label>
                                        <div className="col-sm-2">
                                            <input 
                                                className="form-control"
                                                id="to_date" 
                                                name="to_date" 
                                                type="date" 
                                                placeholder="To"
                                                ref={register({
                                                    required: 'To Field Required'
                                                })}
                                            />
                                            {errors.job_order_id && <p className='text-danger'>{errors.job_order_id.message}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="job_order_id">Cylinder Size</label>
                                        <div className="col-sm-5">
                                            <select className="form-control" name="cylinder_size">
                                                <option value="">Select One</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <SubmitButton link="#" offset="3" menuId={ menuId }/>

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