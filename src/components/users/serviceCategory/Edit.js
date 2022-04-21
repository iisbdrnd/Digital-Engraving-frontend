import React, { Fragment, useEffect, useReducer } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { ServiceCategory } from '../../../api/userUrl';
import { userGetMethod, userPutMethod } from '../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../common/GlobalButton';

const Edit = (props) => {
    const { handleSubmit, register, errors } = useForm();

    const [serviceCategoryInput, setServiceCategoryInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            name     : '',
            description    : '',
            isLoading: true
        }
    );

    const serviceCategoryId = props.match.params.serviceCategoryId;

    const changeHandler = (event) => {
        setServiceCategoryInput({[event.target.name]: event.target.value});
    }

    useEffect(() => {
        userGetMethod(`${ServiceCategory}/${serviceCategoryId}/edit`)
            .then(response => {
                console.log('response', response);
                setServiceCategoryInput({
                    name     : response.data.serviceCategory.name,
                    description    : response.data.serviceCategory.description,
                    isLoading: false
                });
            })
            .catch(error => console.log(error))   
    },[]);

    const submitHandler = (e) => {
        userPutMethod(`${ServiceCategory}/${serviceCategoryId}`, serviceCategoryInput )
            .then(response => {
                setServiceCategoryInput({
                    name     : "",
                    description  : "",
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

    return (
        <Fragment>
            {/* <Breadcrumb title="Designation Edit" parent="Designation" /> */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">

                    {serviceCategoryInput.isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                    (
                        <div className="card">
                            <div className="card-header">
                                <h5>Update Service Category</h5>
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
                                                placeholder="Service Category Name"
                                                onChange={changeHandler}
                                                value={serviceCategoryInput.name}
                                                ref={register({
                                                    required: true
                                                })}
                                            />
                                            {errors.name && <p className='text-danger'> Name Field Required </p>}
                                        </div>
                                    </div>
                                    <div className="form-group row offset-md-2">
                                        <label className="col-sm-2 col-form-label" htmlFor="grade">Description</label>
                                        <div className="col-sm-7">
                                            <input 
                                                className="form-control"
                                                id="description" 
                                                name="description" 
                                                type="text" 
                                                placeholder="Enter Description"
                                                onChange={changeHandler}
                                                value={serviceCategoryInput.description}
                                                ref={register({
                                                    required: 'Description Field Required'
                                                })}
                                            />
                                            {errors.grade && <p className='text-danger'>{errors.grade.message}</p>}
                                        </div>
                                    </div>
                                
                                </div>
                                <SubmitButton link="service-category/list" />
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