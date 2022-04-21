import React, { Fragment } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { UserDepartment } from '../../../../api/userUrl';
import { userPostMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';

const Add = (props) => {
    const { handleSubmit, register, errors } = useForm();

    const submitHandler = (data) => {
        userPostMethod(UserDepartment, data)
            .then(response => {
                if (response.data.status == 1) {
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
                                <h5>Add Department</h5>
                            </div>
                            <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                <div className="card-body">
                                    <div className="form-group row offset-md-2">
                                        <label className="col-sm-2 col-form-label" htmlFor="name">Name</label>
                                        <div className="col-sm-7">
                                            <input 
                                                className="form-control"
                                                id="name" 
                                                name="name" 
                                                type="text" 
                                                placeholder="Department Name"
                                                // onChange={changeHandler}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Name Field Required'
                                                })}
                                            />
                                            {errors.name && <p className='text-danger'>{errors.name.message}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group row offset-md-2">
                                        <label className="col-sm-2 col-form-label" htmlFor="grade">Comment</label>
                                        <div className="col-sm-7">
                                            {/* <input 
                                                className="form-control"
                                                id="comment" 
                                                name="comment" 
                                                type="text" 
                                                placeholder="Enter Comment"
                                                // onChange={changeHandler}
                                                ref={register({
                                                    required: 'Comment Field Required'
                                                })}
                                            /> */}
                                            <textarea 
                                                className="form-control"
                                                id="comment" 
                                                name="comment" 
                                                type="text" 
                                                placeholder="Enter Comment"
                                                // onChange={changeHandler}
                                                ref={register({
                                                    required: 'Comment Field Required'
                                                })}
                                            />
                                            {errors.grade && <p className='text-danger'>{errors.grade.message}</p>}
                                        </div>
                                    </div>
                                </div>
                                <SubmitButton link="department/index" menuId={ menuId } />
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
        
        </Fragment>
    );
};

export default Add;