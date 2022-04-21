import React, { Fragment } from 'react';
import { colorAPI } from '../../../../api/userUrl';
import { userPostMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';

const Add = (props) => {
    const { handleSubmit, register, errors } = useForm();

    const submitHandler = (data, e) => {
        console.log(data);
        userPostMethod(colorAPI, data)
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
                                <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label" htmlFor="color_name">Color Name</label>
                                        <div className="col-sm-4">
                                            <input 
                                                className="form-control"
                                                id="color_name" 
                                                name="color_name" 
                                                type="text" 
                                                placeholder="Color Name"
                                                // onChange={changeHandler}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Name Field Required'
                                                })}
                                            />
                                            {errors.color_name && <p className='text-danger'>{errors.color_name.message}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label" htmlFor="short_name">Short Name</label>
                                        <div className="col-sm-4">
                                            <input 
                                                className="form-control"
                                                id="short_name" 
                                                name="short_name" 
                                                type="text" 
                                                placeholder="Short Name"
                                                // onChange={changeHandler}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Name Field Required'
                                                })}
                                            />
                                            {errors.short_name && <p className='text-danger'>{errors.short_name.message}</p>}
                                        </div>
                                    </div>
                                            
                                    <SubmitButton link="color/index" offset="2" menuId={ menuId } />
                                </form>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        
        </Fragment>
    );
};

export default Add;