import React, { Fragment, useEffect, useReducer, useState, useRef } from 'react';
import {PaymentReceiptseReportActionApi} from '../../../../../api/userUrl'
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
    const [ branchName, setBranchName] = useState();
    const [ openingBalance, setOpeningBalance] = useState();
    const [ leadger, setLeadger] = useState();
    const [ closingBalance, setClosingBalance] = useState();

    const [showprint, setShowPrint] = useState(0);

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
    var accCode = params.get('accCode'); 

    var from_date = params.get('from_date'); 
    var to_date = params.get('to_date'); 


    useEffect((data, e) => {
        setIsLoading(true);
        handlePageChange();
    },[]);


    const handlePageChange = () => {

        setIsLoading(true);

        var url = `${PaymentReceiptseReportActionApi}?type=${type}&branch_id=${branch_id}&accCode=${accCode}&from_date=${from_date}&to_date=${to_date}&`;
 

        userGetMethod(url)
            .then(response => {

                console.log('response', response);
                setBranchName(response.data.branch_name);
                setOpeningBalance(response.data.opening_balance);
                setLeadger(response.data.ledgers);
                setClosingBalance( response.data.closing_balance );
                
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

    var receipt_amount;
    var payment_amount;

    const Receipts = (amount) => {
        if(amount == "zero"){
            receipt_amount = 0;
            return "";
        }else{
            receipt_amount += amount;
            return amount;
        }
        
    }

    const Payments = (amount) => {
        if(amount == "zero"){
            payment_amount = 0;
            return "";
        }else{
            payment_amount += amount;
            return amount;
        }
        
    }



    var closing_receipt_amount;
    var closing_payment_amount;

    const ClosingReceipts = (amount) => {
        if(amount == "zero"){
            closing_receipt_amount = 0;
            return "";
        }else{
            closing_receipt_amount += amount;
            return amount;
        }
        
    }

    const CloasingPayments = (amount) => {
        if(amount == "zero"){
            closing_payment_amount = 0;
            return "";
        }else{
            closing_payment_amount += amount;
            return amount;
        }
        
    }

    
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="">

                            <ReportHeader reportTtile="Receive Payments Report" showPrint="1" />
                            <p className="text-center">Branch Name: {branchName}</p>
                            

                            <div className="mainDiv" style={{"padding": "2%"}}>

                            {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <div className="">

                                   
                                        <h5 className="text-center"><b>Receipts and Payments from {from_date} to {to_date}</b></h5>
                                      

                                        <div id="PrintDiv" style={{"width": "100%"}}>


                                            { (Object.keys(leadger).length > 0) ? 
                                                (
                                                    <>
                                                        <table className="particulars table table-bordered table-stripped" style={{"width" : "100%"}}>

                                                            <thead>
                                                                <tr>
                                                                    <th width="10%" align="left" valign="middle">Code</th>
                                                                    <th width="10%" align="left" valign="middle">Particulars.</th>
                                                                    <th width="10%" align="left" valign="middle">Receipts</th>
                                                                    <th width="10%" align="left" valign="middle">Payments</th>
                                                                </tr>
                                                            </thead>

                                                            {Receipts("zero")}
                                                            {Payments("zero")}

                                                                
                                                            <tbody>
                                                                
                                                                { Object.values(openingBalance).map( (opening_balance, index) =>  
                                                                    (

                                                                      <>
                                           
                                                                        <tr>
                                                                            <td style={{fontSize:'12px', fontWeight:"bold"}}> {opening_balance.account_code}</td>
                                                                            <td style={{fontSize:'12px', fontWeight:"bold"}}> {"'B/F - "+opening_balance.account_head}</td>
                                                                            <td style={{fontSize:'12px', fontWeight:"bold"}} align="left" valign="middle">{Receipts(opening_balance.total_credit)}</td>
                                                                            <td style={{fontSize:'12px', fontWeight:"bold"}} align="left" valign="middle">{Payments(opening_balance.total_debit)}</td>
                                                                        </tr> 

                                                                    </>
                                                                            
                                                                    )           
                                                                )}

                                                                { Object.values(leadger).map( (ledger_balance, index) =>  
                                                                    (

                                                                      <>
                                           
                                                                        <tr>
                                                                            <td>{ledger_balance.account_code}</td>
                                                                            <td>{ledger_balance.account_head}</td>
                                                                            <td align="left" valign="middle">{Receipts(ledger_balance.total_credit)}</td>
                                                                            <td align="left" valign="middle">{Payments(ledger_balance.total_debit)}</td>
                                                                        </tr> 

                                                                    </>
                                                                            
                                                                    )           
                                                                )}


                                                            </tbody>

                                                            <tfoot>
                                                                <tr>
                                                                    <td align="right" colSpan="2"><strong>Total:</strong></td>
                                                                    <td align="left" valign="middle"><strong>{receipt_amount}</strong></td>
                                                                    <td align="left" valign="middle"><strong>{payment_amount}</strong></td>
                                                                </tr>
                                                            </tfoot>

                                                           
                                                        </table>

                                               
                                                    </>
                                                    
                                                ) : 

                                                (
                                                    <div className="voucher"><p className="text-center">Data not found..</p></div>
                                                )

                                            }


                                        </div>

                                       
                                        <h5 className="text-center m-t-20"><b>Closing Balance</b></h5>
                                      

                                        <div id="PrintDiv" style={{"width": "100%"}}>


                                            { (Object.keys(closingBalance).length > 0) ? 
                                                (
                                                    <>
                                                        <table className="particulars table table-bordered table-stripped" style={{"width" : "100%"}}>

                                                            <thead>
                                                                <tr>
                                                                    <th width="10%" align="left" valign="middle">Code</th>
                                                                    <th width="10%" align="left" valign="middle">Particulars.</th>
                                                                    <th width="10%" align="left" valign="middle">Receipts</th>
                                                                    <th width="10%" align="left" valign="middle">Payments</th>
                                                                </tr>
                                                            </thead>

                                                            {ClosingReceipts("zero")}
                                                            {CloasingPayments("zero")}

                                                                
                                                            <tbody>
                                                                
                                                                { Object.values(closingBalance).map( (closing_balance, index) =>  
                                                                    (

                                                                      <>
                                           
                                                                        <tr>
                                                                            <td>{closing_balance.account_code}</td>
                                                                            <td>{"Closing Balance - "+closing_balance.account_head}</td>
                                                                            <td align="left" valign="middle">{ClosingReceipts(closing_balance.total_credit)}</td>
                                                                            <td align="left" valign="middle">{CloasingPayments(closing_balance.total_debit)}</td>
                                                                        </tr> 

                                                                    </>
                                                                            
                                                                    )           
                                                                )}


                                                            </tbody>

                                                            <tfoot>
                                                                <tr>
                                                                    <td align="right" colSpan="2"><strong>Total:</strong></td>
                                                                    <td align="left" valign="middle"><strong>{closing_receipt_amount}</strong></td>
                                                                    <td align="left" valign="middle"><strong>{closing_payment_amount}</strong></td>
                                                                </tr>
                                                            </tfoot>

                                                           
                                                        </table>

                                               
                                                    </>
                                                    
                                                ) : 

                                                (
                                                    <div className="voucher"><p className="text-center">Data not found..</p></div>
                                                )

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