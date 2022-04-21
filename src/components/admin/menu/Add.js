import React, { Fragment, useState } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { menuRsURL } from '../../../api/adminUrl';
import { adminPostMethod } from '../../../api/action';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../common/GlobalButton';

const Add = () => {
    const { handleSubmit, register, errors } = useForm();

    const [resource, setResource] = useState(false)
    const [status, setStatus] = useState(true)

    const submitHandler = (data) => {
        let response = adminPostMethod(menuRsURL, data)
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
            <Breadcrumb title="Menu Add" parent="Menu" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Add Admin Menu</h5>
                            </div>
                            <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                <div className="card-body">
                                    <div className="form-group row offset-md-1">
                                        <label className="col-sm-2 col-form-label" htmlFor="menu_name">Menu Name</label>
                                        <div className="col-sm-9">
                                            <input  className="form-control" id="menu_name"  name="menu_name"  type="text"  placeholder="Menu Name"
                                                ref={register({
                                                    required: 'Menu Name Field Required'
                                                })}
                                            />
                                            {errors.menu_name && <p className='text-danger'>{errors.menu_name.message}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group row offset-md-1">
                                        <label className="col-sm-2 col-form-label" htmlFor="inline-sqr-2">Using Resource</label>
                                        <div className="col-sm-9 checkbox checkbox-dark m-squar">
                                            <input id="inline-sqr-2" name='resource' type="checkbox" 
                                            ref={register} 
                                            onChange={() => setResource( !resource ) }
                                            />
                                            <label htmlFor="inline-sqr-2">{ !resource ? 'No' : 'Yes'}</label>
                                        </div>
                                    </div>

                                    { resource == false ?
                                        
                                        (<div className="form-group row offset-md-1">
                                            <label className="col-sm-2 col-form-label" htmlFor="route">Route</label>
                                            <div className="col-sm-9">
                                                <input className="form-control" id="route" name="route" type="text" placeholder="Route"
                                                ref={register({
                                                    required: 'Route Field Required'
                                                })}
                                                />
                                                {errors.route && <p className='text-danger'>{errors.route.message}</p>}
                                            </div>
                                        </div>)
                                        :
                                        (
                                            <div className="row offset-md-1">
                                                <div className="form-group row col-sm-6">
                                                    <label className="col-sm-4 col-form-label" htmlFor="link_name">Main Link</label>
                                                    <div className="col-sm-8">
                                                        <input className="form-control" id="link_name" name="link_name" type="text" placeholder="Main Link"
                                                        ref={register({
                                                            required: 'Main Link Field Required'
                                                        })}
                                                        />
                                                        {errors.link_name && <p className='text-danger'>{errors.link_name.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="form-group row col-sm-6">
                                                    <label className="col-sm-4 col-form-label" htmlFor="resource_function">Resource Function</label>
                                                    <div className="col-sm-7">
                                                        <select className="form-control" ref={register}  id="resource_function" name="resource_function">
                                                            <option> Select One </option>
                                                            <option value = "index"> index </option>
                                                            <option value = "create"> create </option>
                                                            <option value = "show"> show </option>
                                                            <option value = "edit"> edit </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    <div className="form-group row offset-md-1">
                                        <label className="col-sm-2 col-form-label" htmlFor="inline-sqr-3">Status</label>
                                        <div className="col-md-7 checkbox checkbox-dark m-squar">
                                            <input id="inline-sqr-3" name='status' type="checkbox" defaultChecked 
                                            ref={register} 
                                            onChange={() => setStatus( !status )}
                                            />
                                            <label htmlFor="inline-sqr-3">{status ? 'Yes' : 'No'}</label>
                                        </div>
                                    </div>
                                </div>
                                <SubmitButton link="menu/list" />
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Add;