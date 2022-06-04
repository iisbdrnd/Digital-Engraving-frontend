import React, { Fragment , useEffect, useState } from 'react';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton'
import {MARKETING_PERSON_WISE_JOB_STATUS_FORM} from '../../../../api/userUrl'
import { userGetMethod} from '../../../../api/userAction';

const Form = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [employees, setEmployees] = useState([]);

    var menuId = 0;
    if (props.location.state === undefined) {
        menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }

    useEffect(() => {
        userGetMethod(`${MARKETING_PERSON_WISE_JOB_STATUS_FORM}`)
        .then(response => {
            console.log('response', response.data);
            setEmployees(response.data.employees);
            setIsLoading(false);
        })
        .catch(error => console.log(error))
    }, []);
    
    const submitHandler = (data, e) => {
        let url = `${process.env.PUBLIC_URL}/marketingPersonWiseJobStatus/${data.month}/${data.year}/${data.employee_id ? data.employee_id : null}`;
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
                                        <h5>Marketing Person Wise Job Status</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit(submitHandler)} className="needs-validation theme-form">
                                <div className="form-group row">
                                    <label className="col-sm-1 col-form-label" htmlFor="month">Month</label>
                                        <div className="col-sm-2">
                                            <select className="form-control" name="month" ref={register({})}>
                                                <option value="">Select One</option>
                                                <option value="1">January</option>
                                                <option value="2">February</option>
                                                <option value="3">March</option>
                                                <option value="4">April</option>
                                                <option value="5">May</option>
                                                <option value="6">June</option>
                                                <option value="7">July</option>
                                                <option value="8">August</option>
                                                <option value="9">September</option>
                                                <option value="10">October</option>
                                                <option value="11">November</option>
                                                <option value="12">December</option>
                                            </select>
                                            {errors.month && <p className='text-danger'>{errors.month.message}</p>}
                                        </div>
                                        <label className="col-sm-1 col-form-label" htmlFor="year">Year</label>
                                        <div className="col-sm-2">
                                            <select className="form-control" name="year" ref={register({})}>
                                                <option value="">Select One</option>
                                                <option value="2015">2015</option>
                                                <option value="2016">2016</option>
                                                <option value="2017">2017</option>
                                                <option value="2018">2018</option>
                                                <option value="2019">2019</option>
                                                <option value="2020">2020</option>
                                                <option value="2021">2021</option>
                                                <option value="2022">2022</option>
                                                <option value="2023">2023</option>
                                                <option value="2024">2024</option>
                                                <option value="2025">2025</option>
                                                <option value="2026">2026</option>
                                                <option value="2027">2027</option>
                                                <option value="2028">2028</option>
                                                <option value="2029">2029</option>
                                                <option value="2030">2030</option>
                                            </select>
                                            {errors.year && <p className='text-danger'>{errors.year.message}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label" htmlFor="employee_id">Select Employee</label>
                                        <div className="col-sm-3">
                                            <select 
                                                name="employee_id" 
                                                id="employee_id" 
                                                className="form-control" 
                                                defaultValue=""
                                                ref={register({})} 
                                            >
                                            <option value="">Select one</option>
                                            {employees.map(employee => (
                                                <option value={employee.id}>{employee.name}</option>
                                            ))}
                                            </select>
                                            {errors.employee_id && <p className='text-danger'>{errors.employee_id.message}</p>}

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