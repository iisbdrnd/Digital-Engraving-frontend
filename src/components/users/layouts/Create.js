import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { toast } from 'react-toastify';
import StepZilla from "react-stepzilla";
import JobBasic from './JobBasic';
import CylinderInfo from './CylinderInfo';
import Color from './Color';
import FinishStep from './FinishStep';
import 'react-toastify/dist/ReactToastify.css';
import { SubmitButton } from '../../common/GlobalButton';
import { SOFTWARE_MODULE_RSURL } from '../../../api/adminUrl';
import { adminPostMethod, adminGetMethod } from '../../../api/action';
import useForm from "react-hook-form";

const Add = () => {
    const { handleSubmit, register, errors } = useForm();
    const [status, setStatus] = useState(true);
    const [folders, setFolder] = useState([]);
    const steps = [
            { name: 'Basic', component: <JobBasic /> },
            { name: 'Cylinder Info', component: <CylinderInfo /> },
            { name: 'Color', component: <Color /> },
            { name: 'Finished', component: <FinishStep /> },
        ]

    const submitHandler = (data) => {
        let response = adminPostMethod(SOFTWARE_MODULE_RSURL, data)
            .then(response => {
                if (response.data.status == 1) {
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            })
        .catch(error => toast.error(error))
    }

    useEffect(() => {
        let response = adminGetMethod(`${SOFTWARE_MODULE_RSURL}/create`)
            .then(response => {
                setFolder(response.data);
            })
        .catch(error => toast.error(error))
    },[])
    
    let folderOption = [];
    if (folders && folders.length > 0) {
        folderOption = folders.map((folder) => (<option key={folder.id} value={folder.id}>{folder.folder_name}</option>))
    }
    return (
        <Fragment>
            <Breadcrumb title="Module List" parent="Module" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Create Job Order</h5>
                            </div>
                            <div className="card-body">
                                <StepZilla steps={steps} showSteps={true} showNavigation={true} stepsNavigation={true} prevBtnOnLastStep={true} dontValidate={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Add;