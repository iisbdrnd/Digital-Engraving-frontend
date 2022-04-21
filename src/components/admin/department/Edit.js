import React, { Fragment, useEffect, useReducer } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { DEPARTMENTS_RSURL } from '../../../api/adminUrl';
import { adminGetMethod, adminPutMethod } from '../../../api/action';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../common/GlobalButton';
import { ToggleButton } from "../../common/toggleBtn/toggleButton";

const Edit = (props) => {
    const { handleSubmit, register, errors } = useForm();

    const [departmentInput, setDepartmentInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            department     : '',
            active_status  : '',
            isLoading      : true
        }
    );

    const deptId = props.match.params.deptId;
    
    const changeHandler = (event) => {
        setDepartmentInput({[event.target.name]: event.target.value});
    }

    useEffect(() => {
        let response = adminGetMethod(`${DEPARTMENTS_RSURL}/${deptId}/edit`)
            .then(response => {
                setDepartmentInput({
                    department   : response.data.department.department,
                    active_status: response.data.department.active_status == 1 ? true : false,
                    isLoading    : false
                });
            })
            .catch(error => console.log(error))   
    },[]);

    const submitHandler = (e) => {
        let response = adminPutMethod(`${DEPARTMENTS_RSURL}/${deptId}`, departmentInput )
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
            <Breadcrumb title="Designation Edit" parent="Designation" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">

                    {departmentInput.isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                    (
                        <div className="card">
                            <div className="card-header">
                                <h5>Update Designation</h5>
                            </div>
                            <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                <div className="card-body">
                                <div className="form-group row">
                                        <label className="col-sm-2 col-form-label" htmlFor="department">Name</label>
                                        <div className="col-sm-4">
                                            <input 
                                                className="form-control"
                                                id="department" 
                                                name="department" 
                                                type="text" 
                                                placeholder="Department Name"
                                                onChange={changeHandler}
                                                value={departmentInput.department}
                                                ref={register({
                                                    required: 'Department Name Field Required'
                                                })}
                                            />
                                            {errors.name && <p className='text-danger'>{errors.name.message}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label" htmlFor="inline-sqr-3">Active Status</label>
                                        <div className="col-md-4">
                                            <ToggleButton
                                                selected={departmentInput.active_status}
                                                toggleSelected={() => {
                                                    setDepartmentInput({
                                                        active_status : !departmentInput.active_status
                                                    });
                                                }}
                                            />
                                        </div>
                                    </div>
                                
                                </div>
                                <SubmitButton link="department/list" />
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