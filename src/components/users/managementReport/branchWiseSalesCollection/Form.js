import React, { Fragment , useEffect, useState } from 'react';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton'
import {BRANCH_WISE_SALES_COLLECTION_FORM} from '../../../../api/userUrl'
import { userGetMethod} from '../../../../api/userAction';

const Form = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    //const [reportType, setReportType] = useState(null);
    const [branches, setBranches] = useState([]);

    var menuId = 0;
    if (props.location.state === undefined) {
        menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }

    useEffect(() => {
        userGetMethod(`${BRANCH_WISE_SALES_COLLECTION_FORM}`)
        .then(response => {
            console.log('response', response.data);
            setBranches(response.data.branches);
            setIsLoading(false);
        })
        .catch(error => console.log(error))
    }, []);
    
    const submitHandler = (data, e) => {
        const branch_id = data.branch_id;
        const from_date = data.from_date;
        console.log('from_date ', data);
        let url = `${process.env.PUBLIC_URL}/branchWiseSalesCollection/${data.from_date}/${data.to_date}/${data.branch_id ? data.branch_id : null}`;
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
                                        <h5>Branch Wise Sales Collection</h5>
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
                                        <label className="col-sm-3 col-form-label" htmlFor="branch_id">Select Branch</label>
                                        <div className="col-sm-3">
                                            <select 
                                                name="branch_id" 
                                                id="branch_id" 
                                                className="form-control" 
                                                defaultValue=""
                                                ref={register({})} 
                                            >
                                            <option value="">Select One</option>
                                            {branches.map(branch => (
                                                <option value={branch.id}>{branch.branch_name}</option>
                                            ))}
                                            </select>
                                            {errors.branch_id && <p className='text-danger'>{errors.branch_id.message}</p>}

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