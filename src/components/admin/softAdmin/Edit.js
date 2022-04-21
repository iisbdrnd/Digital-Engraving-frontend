import React, { Fragment, useEffect, useReducer } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SubmitButton } from '../../common/GlobalButton';
import { adminsRsurl } from '../../../api/adminUrl';
import { adminPutMethod, adminGetMethod } from '../../../api/action';
import useForm from "react-hook-form";

const Edit = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            name: "",
            email: "",
            username: ""
        }
    );
    const adminId = props.match.params.adminId;
    useEffect(() => {
        let response = adminGetMethod(`${adminsRsurl}/${adminId}/edit`)
            .then(response => {
                setUserInput({ 
                    name     : response.data.name, 
                    email    : response.data.email, 
                    username : response.data.username
                });
            })
            .catch(error => console.log(error))   
    },[]);

    const submitHandler = (data) => {
        let response = adminPutMethod(`${adminsRsurl}/${adminId}`, data)
            .then(response => {
                if (response.data.status == 1) {
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            })
        .catch(error => toast.error(error))
    }

    return ( 
        <Fragment>
            <Breadcrumb title="Admin Update" parent="Admin" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Update Admin</h5>
                            </div>
                            <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                <div className="card-body">
                                    <div className="form-group row offset-md-2">
                                        <label className="col-sm-2 col-form-label" htmlFor="name">Name</label>
                                        <div className="col-sm-7">
                                            <input className="form-control" id="name" name="name" type="text" placeholder="Name"
                                                defaultValue={userInput.name}
                                                ref={register({
                                                    required: 'Name Field Required'
                                                })}
                                            />
                                            {errors.name && <p className='text-danger'>{errors.name.message}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group row offset-md-2">
                                        <label className="col-sm-2 col-form-label" htmlFor="email">Email</label>
                                        <div className="col-sm-7">
                                            <input className="form-control" id="email" name="email" type="email" placeholder="Email" readOnly
                                                defaultValue={userInput.email}
                                                ref={register}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row offset-md-2">
                                        <label className="col-sm-2 col-form-label" htmlFor="username">Username</label>
                                        <div className="col-sm-7">
                                            <input className="form-control" id="username" name="username" type="text" placeholder="Username"
                                                defaultValue={userInput.username}
                                                ref={register({
                                                    required: 'Username Field Required'
                                                })}
                                            />
                                            {errors.username && <p className='text-danger'>{errors.username.message}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group row offset-md-2">
                                        <label className="col-sm-2 col-form-label" htmlFor="password">Password</label>
                                        <div className="col-sm-7">
                                            <input className="form-control" id="password" name="password" type="password" placeholder="Password"
                                                ref={register({
                                                    required: 'Password Field Required'
                                                })}
                                            />
                                            {errors.password && <p className='text-danger'>{errors.password.message}</p>}
                                        </div>
                                    </div>
                                </div>
                                <SubmitButton link="softAdmin/list" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
 
export default Edit;