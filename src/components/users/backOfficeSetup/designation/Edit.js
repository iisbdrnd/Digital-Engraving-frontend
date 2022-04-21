import React, { Fragment, useEffect, useReducer } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { UserDesignation } from '../../../../api/userUrl';
import { userGetMethod, userPutMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';

const Edit = (props) => {
    const { handleSubmit, register, errors } = useForm();

    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            name     : '',
            grade    : '',
            isLoading: true
        }
    );

    const designationId = props.match.params.designationId;
    console.log(designationId);

    const changeHandler = (event) => {
        setUserInput({[event.target.name]: event.target.value});
    }

    useEffect(() => {
        userGetMethod(`${UserDesignation}/${designationId}/edit`)
            .then(response => {
                setUserInput({
                    name     : response.data.designation.name,
                    grade    : response.data.designation.grade,
                    isLoading: false
                });
            })
            .catch(error => console.log(error))   
    },[]);

    const submitHandler = (e) => {
        userPutMethod(`${UserDesignation}/${designationId}`, userInput )
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
                                        <label className="col-sm-2 col-form-label" htmlFor="name">Designation Name</label>
                                        <div className="col-sm-7">
                                            <input 
                                                className="form-control"
                                                id="name" 
                                                name="name" 
                                                type="text" 
                                                placeholder="Designation Name"
                                                onChange={changeHandler}
                                                value={userInput.name}
                                                ref={register({
                                                    required: true
                                                })}
                                            />
                                            {errors.name && <p className='text-danger'> Name Field Required </p>}
                                        </div>
                                    </div>
                                    <div className="form-group row offset-md-2">
                                        <label className="col-sm-2 col-form-label" htmlFor="grade">Grade</label>
                                        <div className="col-sm-7">
                                            <input 
                                                className="form-control"
                                                id="grade" 
                                                name="grade" 
                                                type="text" 
                                                placeholder="Enter Grade"
                                                onChange={changeHandler}
                                                value={userInput.grade}
                                                ref={register({
                                                    required: 'Grade Field Required'
                                                })}
                                            />
                                            {errors.grade && <p className='text-danger'>{errors.grade.message}</p>}
                                        </div>
                                    </div>
                                
                                </div>
                                <SubmitButton link="user-designation/list" />
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