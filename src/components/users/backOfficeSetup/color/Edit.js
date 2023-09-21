import React, { Fragment, useEffect, useReducer } from 'react';
import { colorAPI } from '../../../../api/userUrl';
import { userGetMethod, userPutMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';
import { ToggleButton } from '../../../common/toggleBtn/toggleButton';

const Edit = (props) => {
    const { handleSubmit, register, errors } = useForm();

    const [colorInput, setColorInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            color_name: '',
            isLoading   : true,
            active_status:''
        }
    );

    const colorId = props.match.params.colorId;

    const changeHandler = (event) => {
        setColorInput({[event.target.name]: event.target.value});
    }

    useEffect(() => {
        userGetMethod(`${colorAPI}/${colorId}/edit`)
            .then(response => {
                setColorInput({
                    color_name : response.data.color.color_name,
                    short_name : response.data.color.short_name,
                    active_status: response.data.color.active_status == 1 ? true: false,
                    isLoading: false,
                });
            })
            .catch(error => console.log(error))   
    },[]);

    const submitHandler = (data) => {
        data.status = colorInput.active_status == false ? 0 : 1;
        // console.log("data", data);
        userPutMethod(`${colorAPI}/${colorId}`, data )
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
            {/* <Breadcrumb title="Designation Edit" parent="Designation" /> */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">

                        <div className="card">
                            <div className="card-header">
                                <h5>Update Color</h5>
                            </div>
                            <div className="card-body">
                                {colorInput.isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
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
                                                    onChange={changeHandler}
                                                    value={colorInput.color_name}
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
                                                    onChange={changeHandler}
                                                    value={colorInput.short_name}
                                                    ref={register({
                                                        required: 'Name Field Required'
                                                    })}
                                                />
                                                {errors.short_name && <p className='text-danger'>{errors.short_name.message}</p>}
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label" htmlFor="inline-sqr-3">Active Status</label>
                                            <div className="col-md-4">
                                                <ToggleButton
                                                    selected={colorInput.active_status}
                                                    toggleSelected={() => {
                                                        setColorInput({
                                                            active_status : !colorInput.active_status
                                                        });
                                                    }}
                                                    toggleYesMsg="Active"
                                                    toggleNoMsg="Inactive"
                                                />
                                            </div>
                                        </div>
                                    
                                        <SubmitButton link="color/index" offset="2" menuId={ menuId }/>
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