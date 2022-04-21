import React, { Fragment , useEffect, useState } from 'react';
import { UserEmployee } from '../../../api/userUrl';
import { userPostMethod, userGetMethod } from '../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../common/GlobalButton';

const Add = () => {
    const { handleSubmit, register, errors } = useForm({
        mode:"onBlar"
    });
    const [depertments, setDepertment] = useState([]);
    const [designations, setdesignation] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        userGetMethod(`${UserEmployee}/create`)
        .then(response => {
            setDepertment(response.data.userDepertments);
            setdesignation(response.data.userDesignations);
            setIsLoading(false);
        })
    }, []);

    const submitHandler = (data) => {
        console.log(data);
        userPostMethod(UserEmployee, data)
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
        isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
        (
        <Fragment>
            {/* <Breadcrumb title="User Designation Add" parent="Designation" /> */}
            
            <div className="container-fluid">
                {
                    console.log('data',depertments)
                }
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Add Employee</h5>
                            </div>
                            <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                <div className="card-body">
                                    <div className="form-group row offset-md-2">
                                        <label className="col-sm-2 col-form-label" htmlFor="employeeId">Employee Id</label>
                                        <div className="col-sm-7">
                                            <input 
                                                className="form-control"
                                                id="employeeId"
                                                name="employee_id" 
                                                type="text" 
                                                placeholder="Employee Id"
                                                ref={register({
                                                    required: 'Name Field Required',
                                                    valueAsNumber: true
                                                })}
                                            />
                                            {errors.employee_id && <p className='text-danger'>{errors.employee_id.message}</p>}
                                        </div>
                                    </div>

                                    <div className="form-group row offset-md-2">
                                        <label className="col-sm-2 col-form-label" htmlFor="depertment_id">Depertment</label>
                                        <div className="col-sm-7">
                                            <select 
                                                name="depertment_id" 
                                                id="depertment_id" 
                                                required 
                                                className="form-control" 
                                                defaultValue=""
                                                ref={register({
                                                    required: 'depertment_id Field Required'
                                                })} 
                                             >
                                            <option value="">Select one</option>
                                            {depertments.map(depertment => (
                                                <option value={depertment.id}>{depertment.name}</option>
                                            ))}
                                            </select>
                                            {errors.depertment_id && <p className='text-danger'>{errors.depertment_id.message}</p>}

                                        </div>
                                    </div>
                                    <div className="form-group row offset-md-2">
                                        <label className="col-sm-2 col-form-label" htmlFor="designation_id">Designation</label>
                                        <div className="col-sm-7">
                                            <select 
                                                name="designation_id" 
                                                id="designation_id" 
                                                required 
                                                className="form-control" 
                                                defaultValue=""
                                                ref={register({
                                                    required: 'designation_id Field Required'
                                                })} 
                                             >
                                            <option value="">Select one</option>
                                            {designations.map(designation => (
                                                <option value={designation.id}>{designation.name}</option>
                                            ))}
                                            </select>
                                            {errors.designation_id && <p className='text-danger'>{errors.designation_id.message}</p>}

                                        </div>
                                    </div>
                                    <div className="form-group row offset-md-2">
                                        <label className="col-sm-2 col-form-label" htmlFor="name">Name</label>
                                        <div className="col-sm-7">
                                            <input 
                                                className="form-control"
                                                id="name" 
                                                name="name" 
                                                type="text" 
                                                placeholder=" Name"
                                                ref={register({
                                                    required: 'Name Field Required'
                                                })}
                                            />
                                            {errors.name && <p className='text-danger'>{errors.name.message}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group row offset-md-2">
                                        <label className="col-sm-2 col-form-label" htmlFor="surname">Sur Name</label>
                                        <div className="col-sm-7">
                                            <input 
                                                className="form-control"
                                                id="surname" 
                                                name="surname" 
                                                type="text" 
                                                placeholder="Sur Name"
                                                ref={register({
                                                    required: 'surname Field Required'
                                                })}
                                            />
                                            {errors.surname && <p className='text-danger'>{errors.surname.message}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group row offset-md-2">
                                        <label className="col-sm-2 col-form-label" htmlFor="email">Email</label>
                                        <div className="col-sm-7">
                                            <input 
                                                className="form-control"
                                                id="email" 
                                                name="email" 
                                                type="email"
                                                placeholder="Email"
                                                ref={register({
                                                    required: 'Email Field Required',
                                                    pattern:{
                                                        value:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                                        message:"Please Input Valid Email Address"

                                                    }
                                                })}
                                            />
                                            {errors.email && <p className='text-danger'>{errors.email.message}</p>}
                                        </div>
                                    </div>
                                </div>
                                <SubmitButton link="user-employee/list" />
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
        
        </Fragment>
        )
    );
};

export default Add;