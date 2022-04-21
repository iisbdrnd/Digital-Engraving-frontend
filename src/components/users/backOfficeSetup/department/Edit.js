import React, { Fragment, useEffect, useReducer } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { UserDepartment } from '../../../../api/userUrl';
import { userGetMethod, userPutMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';

const Edit = (props) => {
    const { handleSubmit, register, errors } = useForm();

    const [userDepartmentInput, setUserDepartmentInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            name     : '',
            comment    : '',
            isLoading: true
        }
    );

    const departmentId = props.match.params.departmentId;

    const changeHandler = (event) => {
        setUserDepartmentInput({[event.target.name]: event.target.value});
    }

    useEffect(() => {
        userGetMethod(`${UserDepartment}/${departmentId}/edit`)
            .then(response => {
                console.log('response', response);
                setUserDepartmentInput({
                    name     : response.data.department.name,
                    comment    : response.data.department.comment,
                    isLoading: false
                });
            })
            .catch(error => console.log(error))   
    },[]);

    const submitHandler = (e) => {
        userPutMethod(`${UserDepartment}/${departmentId}`, userDepartmentInput )
            .then(response => {
                setUserDepartmentInput({
                    name     : "",
                    comment  : "",
                    isLoading: false
                });
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
            {/* <Breadcrumb title="Designation Edit" parent="Designation" /> */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">

                    {userDepartmentInput.isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                    (
                        <div className="card">
                            <div className="card-header">
                                <h5>Update Designation</h5>
                            </div>
                            <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                <div className="card-body">
                                    <div className="form-group row offset-md-2">
                                        <label className="col-sm-2 col-form-label" htmlFor="name">Designation Name</label>
                                        <div className="col-sm-7">
                                            <input 
                                                className="form-control"
                                                id="name" 
                                                name="name" 
                                                type="text" 
                                                placeholder="Designation Name"
                                                onChange={changeHandler}
                                                value={userDepartmentInput.name}
                                                ref={register({
                                                    required: true
                                                })}
                                            />
                                            {errors.name && <p className='text-danger'> Name Field Required </p>}
                                        </div>
                                    </div>
                                    <div className="form-group row offset-md-2">
                                        <label className="col-sm-2 col-form-label" htmlFor="grade">Comment</label>
                                        <div className="col-sm-7">
                                            <input 
                                                className="form-control"
                                                id="comment" 
                                                name="comment" 
                                                type="text" 
                                                placeholder="Enter Comment"
                                                onChange={changeHandler}
                                                value={userDepartmentInput.comment}
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
                        
                    )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Edit;