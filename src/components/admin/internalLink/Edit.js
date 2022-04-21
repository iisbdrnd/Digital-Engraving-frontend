import React, { Fragment, useState, useEffect, useReducer } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { internalLinkRsURL } from '../../../api/adminUrl';
import { adminPutMethod, adminGetMethod } from '../../../api/action';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../common/GlobalButton';

const Edit = (props) => {
    const { handleSubmit, register, errors } = useForm();

    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            menu_id         : '',
            link_name       : '',
            route           : '',
            link_name_add   : '',
            link_name_edit  : '',
            link_name_delete: '',
            link_name_show  : '',

            isLoading       : true
        }
    );

    const [resource, setResource] = useState(false)
    const [status, setStatus] = useState(true)
    const [menuList, setMenuList] = useState([])
    
    const internalLinkID = props.match.params.internalLinkID;

    useEffect(() => {
        let response = adminGetMethod(`${internalLinkRsURL}/${internalLinkID}/edit`)
            .then(response => {
                setMenuList(response.data.adminMenus)
                setUserInput({
                    menu_id         : response.data.internalLink.menu_id, 
                    link_name       : response.data.internalLink.link_name, 
                    route           : response.data.internalLink.route, 
                    link_name_add   : response.data.internalLink.link_name_add, 
                    link_name_edit  : response.data.internalLink.link_name_edit, 
                    link_name_delete: response.data.internalLink.link_name_delete, 
                    link_name_show  : response.data.internalLink.link_name_show, 

                    isLoading       : false 
                })

                setResource(response.data.internalLink.resource == 0 ? false: true)
                setStatus(response.data.internalLink.status     == 0 ? false: true)
                
            })
            .catch(error => console.log(error))   
    },[]);

    const submitHandler = (data) => {
        let response = adminPutMethod(`${internalLinkRsURL}/${internalLinkID}`, data)
            .then(response => {
                if (response.data.status == 1) {
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
            <Breadcrumb title="Internal Link Edit" parent="Internal Link" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">

                    {userInput.isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                    (
                        <div className="card">
                            <div className="card-header">
                                <h5>Update Admin Internal Link</h5>
                            </div>
                            <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                <div className="card-body">
                                    <div className="form-group row ">
                                        <label className="col-sm-2 col-form-label" htmlFor="menu_id">Menu</label>
                                        <div className="col-sm-4">
                                            <select className="form-control" required ref={register}  id="menu_id" name="menu_id"
                                            ref={register({
                                                required: 'Menu Name Field Required'
                                            })} 
                                            defaultValue={userInput.menu_id}>
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
                                            checked={resource}
                                            ref={register} 
                                            onChange={() => setResource( !resource ) }
                                            />
                                            <label htmlFor="inline-sqr-2">{ !resource ? 'No' : 'Yes'}</label>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="form-group row ">
                                            <label className="col-sm-2 col-form-label" htmlFor="link_name">Link Name</label>
                                            <div className="col-sm-4">
                                                <input className="form-control" id="link_name" name="link_name" type="text" placeholder="Link Name"
                                                defaultValue={userInput.link_name}
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
                                                defaultValue={userInput.route}
                                                ref={register({
                                                    required: 'Route Field Required'
                                                })}
                                                />
                                                {errors.route && <p className='text-danger'>{errors.route.message}</p>}
                                            </div>
                                        </div>
                                    </div>
                                        
                                    <div className="form-group row ">
                                        <label className="col-sm-2 col-form-label" htmlFor="inline-sqr-3">Status</label>
                                        <div className="col-md-7 checkbox checkbox-dark m-squar">
                                            <input id="inline-sqr-3" name='status' type="checkbox" checked={status} 
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

                    )}
   
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Edit;