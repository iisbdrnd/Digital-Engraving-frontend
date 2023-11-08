import React, { Fragment, useEffect, useReducer, useState, useRef } from 'react';
import {bankBookReportActionApi} from '../../../../../api/userUrl'
import { userGetMethod, userDeleteMethod, userPostMethod } from '../../../../../api/userAction';

import { toast } from 'react-toastify';
import useForm from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "react-js-pagination";

import ReportHeader from '../../../layouts/ReportHeader';
import '../../../layouts/style.scss';


const Report = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);

    const [inputData, setInputData] = useState({});
    const [ branchName, setBranchName] = useState();

    const [ openingBalance, setOpeningBalance] = useState([]);
    const [ openingDate, setOpeningDate] = useState([]);
    const [ accounts, setAccounts] = useState();
    const [ voucherData, setVoucherData] = useState();

    var menuId = 0;
    if (props.location.state === undefined) {
        var menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }

    const search = props.location.search; 
    const params = new URLSearchParams(search); 
    const type = params.get('type');
    var branch_id = params.get('branch_id'); 
    var account = params.get('account'); 

    const defaultPerPage = 5;


    if(type == 2){
        var from_date = params.get('from_date'); 
        var to_date = params.get('to_date'); 
    }else{
        var from_date = 0;
        var to_date = 0;
    }

    useEffect((data, e) => {
        setIsLoading(true);
        handlePageChange();
    },[]);


    const handlePageChange = () => {

        setIsLoading(true);

        if(type == 1){
            var url = `${bankBookReportActionApi}?type=1&branch_id=${branch_id}&account=${account}&`;
        }else{
            var url = `${bankBookReportActionApi}?type=2&branch_id=${branch_id}&account=${account}&from_date=${from_date}&to_date=${to_date}&`;
        }

        userGetMethod(url)
            .then(response => {

                console.log('response', response.data);
                setBranchName(response.data.branch_name);
                setOpeningBalance(response.data.opening_balance);
                setOpeningDate(response.data.opening_date);
                setAccounts(response.data.accounts);

                setVoucherData(response.data.ledgers);

                setIsLoading(false);
            })
            .catch(error => console.log(error))
    }


    const titleStyle = {
        "fontSize" : "16px",
        "fontWeight": "bold",
        "textDecoration": "underline"
    }

    const tableStyle = {
        "border" : "1px solid #ccc",
        "margin" : "2% 1% 2% 0%"
    }

    const voucherFooterTd = {
        "textDecoration" : "overline"
    }

    var grandTotalDebit = 0;
    var grandTotalCredit = 0;
    var grandTotalBalance = 0;


    var debit_amount = 0;
    var credit_amount = 0;
    var totalBalance = 0;
    var counter = 0;

    const initialCounterFunction = () => {
        counter = 0;
    }

    const initialTotalBalanceFunction = () => {
        totalBalance = 0;
    }


    const Debit = (amount) => {
        if(amount == "zero"){
            debit_amount = 0;
        }else{
            debit_amount += amount;
        }
        
    }

    const Credit = (amount) => {
        if(amount == "zero"){
            credit_amount = 0;
        }else{
            credit_amount += amount;
        }
        
    }

    const CounterFunction = () => {
        counter = counter + 1;
    }

    const totalBalanceFunction = (debit, credit) => {
        totalBalance += debit - credit;
    }

    //grand total

    var grandTotalDebitFunction = (amount) => {
        grandTotalDebit += amount;
    }

    var grandTotalCreditFunction = (amount) => {
        grandTotalCredit += amount;
    }
    var grandTotalBalanceFunction = (amount) => {
        grandTotalBalance += amount;
    }

    const printDocument = () => {
        window.print();

        console.log('v_data', voucherData);
    }

    const pdfDocument = () => {

    }


    
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="">

                            <ReportHeader reportTtile="Bank Book Report" showPrint="1" />
                            <p className="text-center">Branch Name: {branchName}</p>

                            <div className="mainDiv" style={{"padding": "2%"}}>

                            {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <div className="row">
   

                                        <div id="PrintDiv" style={{"width": "100%"}}>
                                            { (Object.keys(accounts).length > 0) ? 
                                                (
                                                    <>
                                                    { Object.values(accounts).map( (accountRow, index) =>  
                                                        (
                                                            <>
                                                                <p class="title">
                                                                    <strong>Bank Book of {accountRow.account_head} 
                                                                        {
                                                                            (from_date !=0) ? from_date + '-' + to_date : ""
                                                                        }
                                                                    </strong>
                                                                </p>

                                                                <table className="particulars table table-bordered table-stripped" style={{"width" : "100%", "margin-bottom" : "5%"}}>

                                                                <tr>
                                                                    <td width="8%"><strong>Code</strong></td>
                                                                    <td width="8%"><strong>Tr No.</strong></td>
                                                                    <td width="8%"><strong>Date</strong></td>
                                                                    <td width="8%"><strong>Instrument</strong></td>
                                                                    <td><strong>Particulars</strong></td>
                                                                    <td width="12%"><strong>Debit</strong></td>
                                                                    <td width="12%"><strong>Credit</strong></td>
                                                                    <td width="12%"><strong>Balance</strong></td>
                                                                </tr>

                                                                    {initialCounterFunction()}
                                                                    {Debit("zero")}
                                                                    {Credit("zero")}
                                                                    {initialTotalBalanceFunction()}

                                                                    { (Object.keys(openingBalance).length > 0 && Object.keys(openingBalance).hasOwnProperty(accountRow.account_code)) ? 

                                                                        <>
                                                                            {CounterFunction()}
                                                                            {Debit(openingBalance[accountRow.account_code].total_debit)}
                                                                            {Credit(openingBalance[accountRow.account_code].total_credit)}

                                                                            { 
                                                                                (accountRow.main_code == 2 || accountRow.main_code == 4) ?
                                                                                totalBalanceFunction(openingBalance[accountRow.account_code].total_debit, openingBalance[accountRow.account_code].total_credit)
                                                                                : totalBalanceFunction(openingBalance[accountRow.account_code].total_credit, openingBalance[accountRow.account_code].total_debit)
                                                                            }

                                                                            <tr>
                                                                                <td style={{fontSize:"12px", fontWeight:"bold"}}>{accountRow.account_code}</td>
                                                                                <td style={{fontSize:"12px", fontWeight:"bold"}}> - </td>
                                                                                <td style={{fontSize:"12px", fontWeight:"bold"}}>{openingDate}</td>
                                                                                <td style={{fontSize:"12px", fontWeight:"bold"}}> - </td>
                                                                                <td style={{fontSize:"12px", fontWeight:"bold"}}>Opening Balance</td>
                                                                                <td style={{fontSize:"12px", fontWeight:"bold"}}>{}</td>
                                                                                <td style={{fontSize:"12px", fontWeight:"bold"}}>{debit_amount}</td>
                                                                                <td style={{fontSize:"12px", fontWeight:"bold"}}>{credit_amount}</td>
                                                                            </tr>

                                                                        </>

                                                                        : ""
                                                                
                                                                    }

                                                         

                                                                    { (voucherData[accountRow.account_code] != undefined) ?

                                                                        <>
                                                                    
                                                                        { 
                                                                           voucherData[accountRow.account_code].map( (ledgerRow, index) =>  
                                                                            (
                                                                                <>
                                                                                    {CounterFunction()}
                                                                                    {Debit(ledgerRow.debit_amount)}
                                                                                    {Credit(ledgerRow.credit_amount)}
                                                                                    { 
                                                                                        (accountRow.main_code == 2 || accountRow.main_code == 4) ?
                                                                                        totalBalanceFunction(ledgerRow.debit_amount, ledgerRow.credit_amount)
                                                                                        : totalBalanceFunction(ledgerRow.credit_amount, ledgerRow.debit_amount)
                                                                                    }

                                                                                    <tr>
                                                                                        <td style={{fontSize:"12px", fontWeight:"bold"}}>{ledgerRow.account_code}</td>
                                                                                        <td style={{fontSize:"12px", fontWeight:"bold"}}>{ledgerRow.transaction_no}</td>
                                                                                        <td style={{fontSize:"12px", fontWeight:"bold"}}>{ledgerRow.transaction_date}</td>
                                                                                        <td style={{fontSize:"12px", fontWeight:"bold"}} className="text-center">
                                                                                            {ledgerRow.voucher_type+'-'+ledgerRow.instrument_no}
                                                                                        </td>
                                                                                        <td style={{fontSize:"12px", fontWeight:"bold"}}>{ledgerRow.remarks}</td>
                                                                                        <td style={{fontSize:"12px", fontWeight:"bold"}}>{ledgerRow.debit_amount}</td>
                                                                                        <td style={{fontSize:"12px", fontWeight:"bold"}}>{ledgerRow.credit_amount}</td>
                                                                                        <td style={{fontSize:"12px", fontWeight:"bold"}}>{totalBalance}</td>
                                                                                    </tr>
                                                                                </>
                                                                            ))
                                                                        }
                                                                        </>
                                                                     

                                                                        : ""
                                                                    }
                                                                    {(counter == 0) ? 
                                                                        <tr>
                                                                            <td colspan="8" class="text-center">Data not found!</td>
                                                                        </tr> : ""
                                                                    } 
              

                                                                    {grandTotalDebitFunction(debit_amount)} 
                                                                    {grandTotalCreditFunction(credit_amount)} 
                                                                    {grandTotalBalanceFunction(totalBalance)} 
                                                                    <>
                                                                        <tr>
                                                                            <td style={{fontSize:"12px", fontWeight:"bold"}} colspan="5"><strong>Total</strong></td>
                                                                            <td style={{fontSize:"12px", fontWeight:"bold"}}><strong>{debit_amount}</strong></td>
                                                                            <td style={{fontSize:"12px", fontWeight:"bold"}}><strong>{credit_amount}</strong></td>
                                                                            <td style={{fontSize:"12px", fontWeight:"bold"}}><strong>{totalBalance}</strong></td>
                                                                        </tr>
                                                                    </>

                                                                </table>
                                                            

                                                            </>
                                                        )
                                                    )}

                                                    </>

                                                ) : 

                                                (
                                                    <div className="voucher"><p className="text-center">Data not found..</p></div>
                                                )

                                            }

                                            {
                                                (account == 0) ? 
                                                    <>
                                            
                                                        <table className="particulars table table-bordered table-stripped m-t-15" style={{"width" : "100%"}}>
                                                            <tr>
                                                                <td style={{fontSize:"13px", fontWeight:"bold"}} colspan="5"><strong>Grand Total</strong></td>
                                                                <td style={{fontSize:"13px", fontWeight:"bold"}} width="12%"><strong>{grandTotalDebit}</strong></td>
                                                                <td style={{fontSize:"13px", fontWeight:"bold"}} width="12%"><strong>{grandTotalCredit}</strong></td>
                                                                <td style={{fontSize:"13px", fontWeight:"bold"}} width="12%" className=""><strong>{grandTotalBalance}</strong></td>
                                                            </tr>
                                                        </table>
                                                  
                                                    </>

                                                : ""
                                            }


                                        </div>
                                    
                                    </div>
                                )
                            }

                            </div>  
                        </div>
                        
                    </div>
                </div>
            </div>
        
        </Fragment>
    );
};

export default Report;