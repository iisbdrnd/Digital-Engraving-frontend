import React, { Fragment , useEffect, useState } from 'react';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton'
import { DAILY_JOB_ANALYSIS_EMPLOYEE_WISE_FORM} from '../../../../api/userUrl'
import { userGetMethod} from '../../../../api/userAction';

const Form = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [selectValue, setSelectValue] = useState({});
    const [employees, setEmployees] = useState([]);

    var menuId = 0;
    if (props.location.state === undefined) {
        menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }

    useEffect(() => {
        userGetMethod(`${DAILY_JOB_ANALYSIS_EMPLOYEE_WISE_FORM}`)
        .then(response => {
            console.log('response', response.data);
            setEmployees(response.data.employees);
            setIsLoading(false);
        })
        .catch(error => console.log(error))
    }, []);

    const selectInputChange = (e) =>{
        setSelectValue(e.target.value)
    }
    
    const submitHandler = (data, e) => {
        // console.log(data)
        
        let url = `${process.env.PUBLIC_URL}/dailyJobAnalysisEmployeeWiseReport/${data.from_date}/${data.to_date}/${data.employee_id?data.employee_id: null}`;
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
                                        <h5>Client Wise Account Statement Report Form</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit(submitHandler)} className="needs-validation theme-form">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label" htmlFor="from_date">Date Range</label>
                                        <div className="col-sm-4">
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <input 
                                                                className="form-control"
                                                                id="from_date" 
                                                                name="from_date" 
                                                                type="date"
                                                                ref={register({
                                                                    required: 'From Date Field Required'
                                                                })}
                                                            />
                                                            {errors.from_date && <p className='text-danger'>{errors.from_date.message}</p>}
                                                        </td>
                                                        <td> <span style={{'padding': '5px'}}> - </span> </td>
                                                        <td>
                                                            <input 
                                                                className="form-control"
                                                                id="to_date" 
                                                                name="to_date" 
                                                                type="date"
                                                                ref={register({
                                                                    required: 'To Date Field Required'
                                                                })}
                                                            />
                                                            {errors.to_date && <p className='text-danger'>{errors.to_date.message}</p>}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label" htmlFor="employee_id">Select Client</label>
                                        <div className="col-sm-3">
                                            <select 
                                                name="employee_id" 
                                                id="client_id" 
                                                className="form-control" 
                                                defaultValue=""
                                                onChange={e =>selectInputChange(e)}
                                                ref={register({})} 
                                            >
                                            <option value="">Select one</option>
                                            {employees.map(employee => (
                                               
                                                // <option value={JSON.stringify({
                                                //     accountCode: employee.account_code,
                                                //     subsidiaryCode: employee.subsidiary_code,
                                                // })}>{employee.account_head}</option>
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