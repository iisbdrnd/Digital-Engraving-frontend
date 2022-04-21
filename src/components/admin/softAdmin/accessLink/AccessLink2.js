import React, { Fragment, useEffect } from 'react';
import useForm from "react-hook-form";
import AccessLinkData from './AccessLinkData';
import Breadcrumb from '../../../common/breadcrumb';
import 'react-toastify/dist/ReactToastify.css';

const AccessLink = (props) => {
    const { handleSubmit, register, errors } = useForm();
    // console.log(props.match.params);
    
    
    const adminId = props.match.params.adminId;
    
    const submitHandler = () =>{
        
    }
    return ( 
        <Fragment>
            <Breadcrumb title="Admin Add" parent="Admin" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Admin Access</h5>
                            </div>
                            
                            <AccessLinkData adminId = {adminId} />
                                        
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    
    );
}

export default AccessLink;