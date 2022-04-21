import React, { Fragment , useEffect, useState } from 'react';
import useForm from "react-hook-form";
import { userGetMethod, userDeleteMethod, userPostMethod } from '../../../../../api/userAction';
import {bankBookList} from '../../../../../api/userUrl'
import { SubmitButton, PanelRefreshIcons } from '../../../../common/GlobalButton';

const Form = (props) => {

    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [reportType, setReportType] = useState('upto_date');
    const [branchData, setBranchData] = useState([]);
    const [bankAccounts, setBankAccounts] = useState();

    var menuId = 0;
    if (props.location.state === undefined) {
        menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }

    useEffect( () => {
        userGetMethod(`${bankBookList}`)
        .then(response => {
            setBranchData(response.data.branches);
            setBankAccounts(response.data.bank_accounts);
            setIsLoading(false);
        })
    }, []);
    

    function onChangeValue(event) {
        setReportType(event.target.value);
    }

    const submitHandler = (data, e) => {

        const branch_id = data.branch_id;
        const account = data.account;

        if(reportType == 'upto_date'){
            var url = `${process.env.PUBLIC_URL}/user/bank-book-report-action?type=1&branch_id=${branch_id}&account=${account}&`;
            window.open(url, '_blank', 'height=800,width=1200');
        }

        if(reportType == 'date_range'){
            const from_date = data.from_date;
            const to_date = data.to_date;
            var url = `${process.env.PUBLIC_URL}/user/bank-book-report-action?type=2&branch_id=${branch_id}&account=${account}&from_date=${from_date}&to_date=${to_date}&`;
            window.open(url, '_blank', 'height=800,width=1200');
        }
    }

    return (
        isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
        (
            <Fragment>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h5>Cash Book</h5>
                                        </div>
                                        <div className="col-md-6">
                                            {/* <PanelRefreshIcons panelRefresh={pageRefreshHandler} /> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(submitHandler)} className="needs-validation theme-form">

                                        <div className="form-group row offset-sm-1">
                                            <label className="col-sm-4 col-form-label" htmlFor="branch_id">Select Branchss</label>
                                            <div className="col-sm-4">
                                                <select 
                                                    name="branch_id" 
                                                    id="branch_id" 
                                                    className="form-control" 
                                                    defaultValue=""
                                                    ref={register({
                                                        required: 'Branch Field Required'
                                                    })} 
                                                >
                                                <option value="">Select one</option>
                                                {branchData.map(branch => (
                                                    <option value={branch.id}>{branch.branch_name}</option>
                                                ))}
                                                </select>
                                                {errors.branch_id && <p className='text-danger'>{errors.branch_id.message}</p>}

                                            </div>
                                        </div>

                                        <div className="form-group row offset-sm-1">
                                            <label className="col-sm-4 col-form-label" htmlFor="branch_id">Account:</label>
                                            <div className="col-sm-4">
                                                <select 
                                                    name="account" 
                                                    id="account" 
                                                    className="select2 form-control" 
                                                    defaultValue=""
                                                    ref={register({
                                                        required: 'Account Field Required'
                                                    })} 
                                                >
                                                    <option value="">Select one</option>
                                                    <option value="0">All Bank</option>
                                                    {bankAccounts.map(cash => (
                                                        <option value={cash.account_code}>{cash.account_code+'-'+cash.account_head}</option>
                                                    ))}
                                                </select>
                                                {errors.account && <p className='text-danger'>{errors.account.message}</p>}
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <div className="col-sm-4 offset-sm-4" onChange={onChangeValue}>
                                                <input 
                                                    name="upto_date" 
                                                    value="upto_date" 
                                                    id="upto_date" 
                                                    type="radio" 
                                                    checked={reportType === "upto_date"}
                                                />
                                                <label className="col-form-label mr10" htmlFor="upto_date">Upto date</label>

                                                <input 
                                                    name="voucher_type" 
                                                    value="date_range" 
                                                    id="date_range" 
                                                    type="radio" 
                                                    className="m-l-10"
                                                    checked={reportType === "date_range"}
                                                />
                                                <label className="col-form-label" htmlFor="date_range">Date Range</label>
                                            </div>

                                        </div>

                                        { 
                                            reportType == 'date_range' ? (

                                                <div className="form-group row">

                                                    <div className="col-lg-4 col-md-4 offset-sm-4">
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
                                                    </div>
                                    
                                                
                                                    <div className="col-lg-4 col-md-4 offset-sm-4 m-t-10">
                                                        <input 
                                                            className="form-control"
                                                            id="to_date" 
                                                            name="to_date" 
                                                            type="date"
                                                            ref={register({
                                                                required: 'From Date Field Required'
                                                            })}
                                                        />
                                                        {errors.to_date && <p className='text-danger'>{errors.to_date.message}</p>}
                                                    </div>

                                                </div>

                                            ): null
                                        
                                        }
                                        
                                        <div className="col-md-4 offset-sm-4 m-t-11" style={{'padding':'0'}}>
                                            <button className="btn btn-primary btn-sm mr-1" type="submit">Submit</button>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    );
};
export default Form;