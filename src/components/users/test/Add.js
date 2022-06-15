import React, { Fragment, useState} from 'react';
import { TEST_RSURL } from '../../../api/userUrl';
import { userPostMethod } from '../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../common/GlobalButton';

const Add = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [changeUseEffect, setChangeUseEffect] = useState(0);

    const submitHandler = (data, e) => {
        console.log("data", data);
        userPostMethod(TEST_RSURL, data)
            .then(response => {
                if (response.data.status == 1) {
                    toast.success(response.data.message)
                    e.target.reset();
                    setChangeUseEffect(changeUseEffect+1);
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
    
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Test</h5>
                            </div>
                            <div className="card-body">
                            {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                    <div className="row">
                                        <div className="col-md-6">   
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="name">Name</label>
                                                <div className="col-sm-8">
                                                    <input 
                                                        className="form-control"
                                                        id="name" 
                                                        name="name" 
                                                        type="text" 
                                                        placeholder="Name"
                                                        ref={register({
                                                            required: 'Name Field Required'
                                                        })}
                                                    />
                                                    {errors.name && <p className='text-danger'>{errors.name.message}</p>}
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="address">Address</label>
                                                <div className="col-sm-8">
                                                    <textarea 
                                                        className="form-control"
                                                        id="address" 
                                                        name="address" 
                                                        type="text" 
                                                        placeholder="Enter Address"
                                                        ref={register({
                                                            required: 'Address Field Required'
                                                        })}
                                                    />
                                                    {errors.address && <p className='text-danger'>{errors.address.message}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <SubmitButton link="test/store" menuId={ menuId } />
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