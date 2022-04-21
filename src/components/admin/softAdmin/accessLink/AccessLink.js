import React, { Fragment } from 'react';
import useForm from "react-hook-form";
import AccessLinkData from './AccessLinkData';
import Breadcrumb from '../../../common/breadcrumb';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SubmitButton } from '../../../common/GlobalButton';

const AccessLink = () => {
    const { handleSubmit, register, errors } = useForm();

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
                                <h5>Admin Add</h5>
                            </div>
                            <form onSubmit={handleSubmit(submitHandler)}>
                                <div className="card-body">
                                    <div className="col-sm-12 col-xl-12">
                                        <div className="default-according panel-accordion" id="accordionclose">
                                            <AccessLinkData />
                                        </div>
                                    </div>
                                </div>
                                <SubmitButton link="admin/softAdmin/list" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
 
export default AccessLink;