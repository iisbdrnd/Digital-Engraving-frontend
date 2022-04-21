import React, { Fragment, useEffect, useReducer,useState } from 'react';
import { UserEmployee } from '../../../api/userUrl';
import { userGetMethod, userPutMethod } from '../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../common/GlobalButton';

const Edit = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [depertments, setDepertment] = useState([]);
    const [designations, setdesignation] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            employee_id         : '',
            depertment_id       : '',
            designation_id      : '',
            name                : '',
            surname             : '',
            email               : '',
            isLoading: true
        }
    );

    const employeeId = props.match.params.employeeId;
    console.log(employeeId);

    const changeHandler = (event) => {
        setUserInput({[event.target.name]: event.target.value});
    }
    useEffect(() => {
        userGetMethod(`${UserEmployee}/${employeeId}/edit`)
        .then(response => {
            setDepertment(response.data.userDepertments);
            setdesignation(response.data.userDesignations);
            setUserInput({
                employee_id       : response.data.employee.employee_id,
                depertment_id     : response.data.employee.depertment_id,
                designation_id    : response.data.employee.designation_id,
                name              : response.data.employee.name,
                surname           : response.data.employee.surname,
                email             : response.data.employee.email,
                isLoading: false
            });
            setIsLoading(false);
        })
    }, []);
    const submitHandler = (e) => {
        userPutMethod(`${UserEmployee}/${employeeId}`, userInput )
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
            {/* <Breadcrumb title="Designation Edit" parent="Designation" /> */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                    {userInput.isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                    (
                        <div className="card">
                            <div className="card-header">
                                <h5>Update Designation</h5>
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
                                                onChange={changeHandler}
                                                value={userInput.employee_id}
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
                                                onChange={changeHandler}
                                                value={userInput.depertment_id}
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
                                                onChange={changeHandler}
                                                value={userInput.designation_id}
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
                                                onChange={changeHandler}
                                                value={userInput.name}
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
                                                onChange={changeHandler}
                                                value={userInput.surname}
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
                                                onChange={changeHandler}
                                                value={userInput.email}
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
                        
                    )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Edit;