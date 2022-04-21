import React, { Fragment, useEffect, useReducer, useState } from 'react';
import { branches } from '../../../api/userUrl';
import { userGetMethod, userPutMethod } from '../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../common/GlobalButton';
import { ToggleButton } from "../../common/toggleBtn/toggleButton";

const Edit = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [selected, setSelected] = useState(false);

    var menuId = 0;
    if (props.location.state === undefined) {
        var menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }

    const [branchesInput, setBranchesInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            branch_name  : '',
            active_status: '',
            isLoading    : true
        }
    );

    const branchId = props.match.params.id;

    const changeHandler = (event) => {
        setBranchesInput({[event.target.name]: event.target.value});
    }

    useEffect(() => {
        userGetMethod(`${branches}/${branchId}/edit`)
            .then(response => {
                console.log('response', response);
                setBranchesInput({
                    branch_name     : response.data.branch.branch_name,
                    active_status   : response.data.branch.active_status == 1 ? true : false,
                    isLoading       : false
                });
            })
            .catch(error => console.log(error))   
    },[]);

    const submitHandler = (e) => {
        console.log("branchInput", branchesInput);
        userPutMethod(`${branches}/${branchId}`, branchesInput )
            .then(response => {
                // setBranchesInput({
                //     name     : "",
                //     comment  : "",
                //     isLoading: false
                // });
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

                        <div className="card">
                            <div className="card-header">
                                <h5>Update Designation</h5>
                            </div>
                            <div className="card-body"> 
                                {branchesInput.isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                    <div className="card-body">
                                        
                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label" htmlFor="branch_name">Branch Name</label>
                                            <div className="col-sm-4">
                                                <input 
                                                    className="form-control"
                                                    id="branch_name" 
                                                    name="branch_name" 
                                                    type="text" 
                                                    placeholder="Branch Name"
                                                    onChange={changeHandler}
                                                    value={branchesInput.branch_name}
                                                    ref={register({
                                                        required: 'Branch Name Field Required'
                                                    })}
                                                />
                                                {errors.branch_name && <p className='text-danger'>{errors.branch_name.message}</p>}
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label" htmlFor="inline-sqr-3">Active Status</label>
                                            <div className="col-md-4">
                                                <ToggleButton
                                                    selected={branchesInput.active_status}
                                                    toggleSelected={() => {
                                                        setBranchesInput({
                                                            active_status : !branchesInput.active_status
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </div>


                                        {/* <div className="form-group row offset-md-2">
                                            <label className="col-sm-2 col-form-label" htmlFor="grade">Comment</label>
                                            <div className="col-sm-7">
                                                <input 
                                                    className="form-control"
                                                    id="comment" 
                                                    name="comment" 
                                                    type="text" 
                                                    placeholder="Enter Comment"
                                                    onChange={changeHandler}
                                                    value={branchesInput.comment}
                                                    ref={register({
                                                        required: 'Comment Field Required'
                                                    })}
                                                />
                                                {errors.grade && <p className='text-danger'>{errors.grade.message}</p>}
                                            </div>
                                        </div> */}
                                    
                                    </div>
                                    <SubmitButton link="branches/index" menuId={ menuId } />
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

export default Edit;