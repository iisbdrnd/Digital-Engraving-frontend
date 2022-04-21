import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { internalLinkRsURL } from '../../../api/adminUrl';
import { adminPostMethod, adminGetMethod } from '../../../api/action';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../common/GlobalButton';

const Add = () => {
    const { handleSubmit, register, errors } = useForm();
    const [resource, setResource] = useState(false)
    const [status, setStatus] = useState(true)
    const [menuList, setMenuList] = useState([])

    useEffect(() => {
        adminGetMethod(`${internalLinkRsURL}/create`)
            .then(response => {
                setMenuList(response.data.adminMenus);
            })
            .catch(error => console.log(error))   
    },[]);

    const submitHandler = (data) => {
        adminPostMethod(internalLinkRsURL, data)
            .then(response => {
                if (response.data.status === 1) {
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            })
        .catch(error => toast.error(error))
    }

    let menuOption = [];
    if (menuList && menuList.length > 0) {
        menuOption = menuList.map((menu) => (<option key={menu.id} value={menu.id}>{menu.menu_name}</option>))
    }

    return (
        
        <Fragment>
            <Breadcrumb title="Internal Link Add" parent="Internal Link" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Add Admin Internal Link</h5>
                            </div>
                            <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                <div className="card-body">
                                    <div className="form-group row ">
                                        <label className="col-sm-2 col-form-label" htmlFor="menu_id">Menu</label>
                                        <div className="col-sm-4">
                                            <select className="form-control" required ref={register}  id="menu_id" name="menu_id"
                                            ref={register({
                                                required: 'Menu Name Field Required'
                                            })} >
                                                <option> Select One </option>
                                                { menuOption }
                                            </select>
                                            {errors.menu_id && <p className='text-danger'>{errors.menu_id.message}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group row ">
                                        <label className="col-sm-2 col-form-label" htmlFor="inline-sqr-2">Using Resource</label>
                                        <div className="col-sm-10 checkbox checkbox-dark m-squar">
                                            <input id="inline-sqr-2" name='resource' type="checkbox" 
                                            ref={register} 
                                            onChange={() => setResource( !resource ) }
                                            />
                                            <label htmlFor="inline-sqr-2">{ !resource ? 'No' : 'Yes'}</label>
                                        </div>
                                    </div>

                                    { resource === false ?
                                        
                                        (
                                            <div>
                                                <div className="form-group row ">
                                                    <label className="col-sm-2 col-form-label" htmlFor="link_name">Link Name</label>
                                                    <div className="col-sm-4">
                                                        <input className="form-control" id="link_name" name="link_name" type="text" placeholder="Link Name"
                                                        ref={register({
                                                            required: 'Link Name Field Required'
                                                        })}
                                                        />
                                                        {errors.link_name && <p className='text-danger'>{errors.link_name.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="form-group row ">
                                                    <label className="col-sm-2 col-form-label" htmlFor="route">Route</label>
                                                    <div className="col-sm-4">
                                                        <input className="form-control" id="route" name="route" type="text" placeholder="Route"
                                                        ref={register({
                                                            required: 'Route Field Required'
                                                        })}
                                                        />
                                                        {errors.route && <p className='text-danger'>{errors.route.message}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                        :
                                        (
                                            <div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label" htmlFor="link_add">Link Name</label>
                                                    <div className="row col-sm-10">
                                                        <div className="col-sm-3">
                                                            <input className="form-control" id="link_add" name="link_name_add" type="text" placeholder="Add Link"
                                                            ref={register}
                                                            />
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <input className="form-control" id="link_name_edit" name="link_name_edit" type="text" placeholder="Edit Link"
                                                            ref={register}
                                                            />
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <input className="form-control" id="link_name_delete" name="link_name_delete" type="text" placeholder="Delete Link"
                                                            ref={register}
                                                            />
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <input className="form-control" id="link_name_show" name="link_name_show" type="text" placeholder="Show Link"
                                                            ref={register}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-group row ">
                                                    <label className="col-sm-2 col-form-label" htmlFor="route">Main Link</label>
                                                    <div className="col-sm-4">
                                                        <input  className="form-control" id="route"  name="route"  type="text"  placeholder="Main Link"
                                                            ref={register({
                                                                required: 'Menu Link Field Required'
                                                            })}
                                                        />
                                                        {errors.route && <p className='text-danger'>{errors.route.message}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    

                                    <div className="form-group row ">
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
                                <SubmitButton link="internalLink/list" />
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Add;