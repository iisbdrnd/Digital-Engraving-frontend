import React, { Fragment, useState, useEffect } from 'react';
import { jobSubClassAPI } from '../../../../api/userUrl';
import { userGetMethod, userPostMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';

const Add = (props) => {
    console.log("props from printer add", props);
    const { handleSubmit, register, errors } = useForm();
    const [jobClassData, setJobClassData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        userGetMethod(`${jobSubClassAPI}/create`)
            .then(response => {
                console.log('response', response.data);
                setJobClassData(response.data);
                setIsLoading(false);
            })
            .catch(error => console.log(error))   
    },[]);

    const submitHandler = (data, e) => {
        console.log(data);
        userPostMethod(jobSubClassAPI, data)
            .then(response => {
                if (response.data.status == 1) {
                    e.target.reset();
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            })
        .catch(error => toast.error(error))
    }

    var menuId = 0;
    if (props.location.state === undefined) {
        var menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }

    let jobClassOptions = [];
    if (jobClassData && jobClassData.jobClasses.length > 0) {
        jobClassOptions = jobClassData.jobClasses.map((jobClass) => (<option key={jobClass.id} value={jobClass.id}>{jobClass.job_class_code}</option>))
    }
    
    return (
        <Fragment>
            {/* <Breadcrumb title="User Designation Add" parent="Designation" /> */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Add Printer</h5>
                            </div>
                            <div className="card-body">
                                {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label" htmlFor="job_class_id">Job Class</label>
                                        <div className="col-sm-4">
                                            <select className="form-control" required ref={register}  id="job_class_id" name="job_class_id"
                                                ref={register({
                                                    required: 'Branch Field Required'
                                                })} >
                                                <option> Select One </option>
                                                {jobClassOptions}
                                            </select>
                                            {errors.job_class_id && <p className='text-danger'>{errors.job_class_id.message}</p>}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label" htmlFor="label_2">Label 2</label>
                                        <div className="col-sm-4">
                                            <input 
                                                className="form-control"
                                                id="label_2" 
                                                name="label_2" 
                                                type="text" 
                                                placeholder="Label2"
                                                // onChange={changeHandler}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Label2 Field Required'
                                                })}
                                            />
                                            {errors.label_2 && <p className='text-danger'>{errors.label_2.message}</p>}
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label" htmlFor="sub_class">Sub Class</label>
                                        <div className="col-sm-4">
                                            <input 
                                                className="form-control"
                                                id="sub_class" 
                                                name="sub_class" 
                                                type="text" 
                                                placeholder="Sub Class"
                                                // onChange={changeHandler}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Sub Class Field Required'
                                                })}
                                            />
                                            {errors.sub_class && <p className='text-danger'>{errors.sub_class.message}</p>}
                                        </div>
                                    </div>
                                            
                                    <SubmitButton link="jobSubClass/index" offset="2" menuId={ menuId } />
                                </form>
                                )}
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        
        </Fragment>
    );
};

export default Add;