import React, { Fragment } from 'react';
import { customMenuAPI } from '../../../../api/userUrl';
import { userPostMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';

const Add = (props) => {
    console.log("props from custom menu add", props);
    const { handleSubmit, register, errors } = useForm();

    const submitHandler = (data, e) => {
        console.log(data);
        userPostMethod(customMenuAPI, data)
            .then(response => {
                console.log(response);
                if (response.data.status == 1) {
                    toast.success(response.data.message)
                    e.target.reset();
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
                                <h5>Add Custom Menu</h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                    
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label" htmlFor="custom_menu_code">Custom Menu Code</label>
                                        <div className="col-sm-4">
                                            <input 
                                                className="form-control"
                                                id="custom_menu_code" 
                                                name="custom_menu_code" 
                                                type="text" 
                                                placeholder="Custom Menu Code"
                                                // onChange={changeHandler}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Code Field Required'
                                                })}
                                            />
                                            {errors.custom_menu_code && <p className='text-danger'>{errors.custom_menu_code.message}</p>}
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label" htmlFor="custom_menu_name">Custom Menu Name</label>
                                        <div className="col-sm-4">
                                            <input 
                                                className="form-control"
                                                id="custom_menu_name" 
                                                name="custom_menu_name" 
                                                type="text" 
                                                placeholder="Custom Menu Name"
                                                // onChange={changeHandler}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Name Field Required'
                                                })}
                                            />
                                            {errors.custom_menu_name && <p className='text-danger'>{errors.custom_menu_name.message}</p>}
                                        </div>
                                    </div>
                                            
                                    <SubmitButton link="custom-menu/index" offset="2" menuId={ menuId } />
                                </form>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        
        </Fragment>
    );
};

export default Add;