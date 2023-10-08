import React, { Fragment , useEffect, useState } from 'react';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton'
import {CLIENT_WISE_BILL_INFO_FORM, DUE_BILL_INFO_FORM,} from '../../../../api/userUrl'
import { userGetMethod} from '../../../../api/userAction';

const Form = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [reportType, setReportType] = useState(null);
    const [employees, setEmployees] = useState([]);

    var menuId = 0;
    if (props.location.state === undefined) {
        menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }

    useEffect(() => {
        userGetMethod(`${DUE_BILL_INFO_FORM}`)
        .then(response => {
            console.log('response', response.data);
            setEmployees(response.data.clients);
            setIsLoading(false);
        })
        .catch(error => console.log(error))
    }, []);
    
    const submitHandler = (data, e) => {
        // const client_id = data.client_id;
        // const from_date = data.from_date;
        console.log('from_date ', data);
        let url = `${process.env.PUBLIC_URL}/dueBillInformation/${data.client_id ? data.client_id : null}`;
        window.open(url, '_blank', 'height=800,width=1200');
    }
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5>Due Bill Information</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit(submitHandler)} className="needs-validation theme-form">
                                    
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label" htmlFor="employee_id">Select Client</label>
                                        <div className="col-sm-3">
                                            <select 
                                                name="client_id" 
                                                id="client_id" 
                                                className="form-control" 
                                                defaultValue=""
                                                ref={register({ required: 'Client Field Required'})} 
                                            >
                                            <option value="">Select one</option>
                                            {employees.map(employee => (
                                                <option value={employee.id}>{employee.name}</option>
                                            ))}
                                            </select>
                                            {errors.client_id && <p className='text-danger'>{errors.client_id.message}</p>}

                                        </div>
                                    </div>
                                    <SubmitButton link="#" offset="2" menuId={ menuId }/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
export default Form;