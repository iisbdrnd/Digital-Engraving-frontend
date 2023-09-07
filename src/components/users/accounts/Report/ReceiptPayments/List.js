import React, { Fragment , useEffect, useState } from 'react';
import useForm from "react-hook-form";
import { userGetMethod, userDeleteMethod, userPostMethod } from '../../../../../api/userAction';
import {PaymentReceiptsList} from '../../../../../api/userUrl'
import { SubmitButton, PanelRefreshIcons } from '../../../../common/GlobalButton';

const Form = (props) => {

    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [reportType, setReportType] = useState('date_range');
    const [accType, setAccType] = useState('both');
    const [branchData, setBranchData] = useState([]);
    const [cashAccount, setCashAccount] = useState([]);
    const [bankAccount, setBankAccount] = useState([]);

    var menuId = 0;
    if (props.location.state === undefined) {
        menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }

    useEffect( () => {
        userGetMethod(`${PaymentReceiptsList}`)
        .then(response => {
            console.log('bb', response.data);
            setBranchData(response.data.branches);
            setCashAccount(response.data.cash_accounts);
            setBankAccount(response.data.bank_accounts);
            setIsLoading(false);
        })
    }, []);
    

    function onChangeValue(event) {
        setReportType(event.target.value);
    }


    function onChangeAccountValue(event) {
        setAccType(event.target.value);
    }

    const submitHandler = (data, e) => {

        const branch_id    = data.branch_id;
        var from_date    = data.from_date;
        var to_date      = data.to_date;

        console.log({accType});

        if(accType == "cash"){
            var accCode = data.cashAccounts;
            console.log('accCode', accCode);
            var url = `${process.env.PUBLIC_URL}/user/receipt-payment-report-action?type=1&branch_id=${branch_id}&accCode=${accCode}&from_date=${from_date}&to_date=${to_date}`;
            window.open(url, '_blank', 'height=800,width=1200');
        } 
        
        if(accType == "bank"){
            var accCode = data.bankAccounts;
            console.log('accCode', accCode);
            var url = `${process.env.PUBLIC_URL}/user/receipt-payment-report-action?type=2&branch_id=${branch_id}&accCode=${accCode}&from_date=${from_date}&to_date=${to_date}`;
            window.open(url, '_blank', 'height=800,width=1200');
        }
        
        if(accType == "both"){
            var accCode = 0;
            var url = `${process.env.PUBLIC_URL}/user/receipt-payment-report-action?type=0&branch_id=${branch_id}&accCode=${accCode}&from_date=${from_date}&to_date=${to_date}`;
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
                                            <h5>Receipt Payment</h5>
                                        </div>
                                        <div className="col-md-6">
                                            {/* <PanelRefreshIcons panelRefresh={pageRefreshHandler} /> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(submitHandler)} className="needs-validation theme-form">

                                        <div className="form-group row offset-sm-1">
                                            <label className="col-sm-4 col-form-label" htmlFor="branch_id">Select Branch</label>
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

                                        <div className="form-group">
                                            <div className="col-sm-4 offset-sm-4" onChange={onChangeAccountValue}>
                                                <input 
                                                    name="both" 
                                                    value="both" 
                                                    id="both" 
                                                    type="radio" 
                                                    checked={accType == "both"}
                                                />
                                                <label className="col-form-label mr10" htmlFor="both">Both</label>

                                                <input 
                                                    name="cash" 
                                                    value="cash" 
                                                    id="cash" 
                                                    type="radio" 
                                                    className="m-l-10"
                                                    checked={accType == "cash"}
                                                />
                                                <label className="col-form-label" htmlFor="cash">Cash</label>

                                                <input 
                                                    name="bank" 
                                                    value="bank" 
                                                    id="bank" 
                                                    type="radio" 
                                                    className="m-l-10"
                                                    checked={accType == "bank"}
                                                />
                                                <label className="col-form-label" htmlFor="bank">Bank</label>
                                            </div>

                                        </div>

                                        {
                                            accType == 'cash' ? (
                                                
                                                <div className="col-sm-4 offset-sm-4" style={{'padding':'0'}}>
                                                    <select 
                                                        name="cashAccounts" 
                                                        id="cashAccounts" 
                                                        className="form-control" 
                                                        defaultValue=""
                                                        ref={register({
                                                            required: 'Cash Accounts Field Required'
                                                        })} 
                                                    >
                                                    <option value="">Select one</option>
                                                    {cashAccount.map(cashAcc => (
                                                        <option value={cashAcc.account_code}>{cashAcc.account_code+'-'+cashAcc.account_head}</option>
                                                    ))}
                                                    </select>
                                                    {errors.cashAccounts && <p className='text-danger'>{errors.cashAccounts.message}</p>}
                                                </div>

                                            ) : (accType == 'bank') ? 
                                            (
                                                    <div className="col-sm-4 offset-sm-4" style={{'padding':'0'}}>
                                                        <select 
                                                            name="bankAccounts" 
                                                            id="bankAccounts" 
                                                            className="form-control" 
                                                            defaultValue=""
                                                            ref={register({
                                                                required: 'Bank Accounts Field Required'
                                                            })} 
                                                        >
                                                        <option value="">Select one</option>
                                                        {bankAccount.map(bankAcc => (
                                                            <option value={bankAcc.account_code}>{bankAcc.account_code+'-'+bankAcc.account_head}</option>
                                                        ))}
                                                        </select>
                                                        {errors.bankAccounts && <p className='text-danger'>{errors.bankAccounts.message}</p>}
                                                    </div>
                                            ) : ""

                                        }


                                        <div className="form-group">
                                            <div className="col-sm-4 offset-sm-4" onChange={onChangeValue} style={{'padding':'0'}}>
    
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

                                                <div className="form-group" style={{'padding':'0'}}>

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
                                        
                                        <div className="col-md-4 offset-sm-4 m-t-20" style={{'padding':'0'}}>
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