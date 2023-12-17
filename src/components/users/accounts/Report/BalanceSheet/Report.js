import React, { Fragment, useEffect, useReducer, useState, useRef } from 'react';
import {BalanceSheetReportActionApi} from '../../../../../api/userUrl'
import { userGetMethod, userDeleteMethod, userPostMethod } from '../../../../../api/userAction';

import { toast } from 'react-toastify';
import useForm from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "react-js-pagination";

import ReportHeader from '../../../layouts/ReportHeader';
import '../../../layouts/style.scss';
import { fixedNumber } from '../../../../common/GlobalComponent';


const Report = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [ branchName, setBranchName] = useState();
    const [ accountLevel, setAccountLevel] = useState();
    const [ accountHead, setAccountHead] = useState();
    const [ assets, setAssets] = useState();
    const [ capitalAndLiability, setCapitalAndLiability] = useState();

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
    var level_id = params.get('level_id'); 

    if(type == 2){
        var from_date = params.get('from_date'); 
        var to_date = params.get('to_date'); 
    }else{
        var from_date = "";
        var to_date = "";
    }
    


    useEffect((data, e) => {
        setIsLoading(true);
        handlePageChange();
    },[]);


    const handlePageChange = () => {

        setIsLoading(true);

        var url = `${BalanceSheetReportActionApi}?type=${type}&branch_id=${branch_id}&level_id=${level_id}&from_date=${from_date}&to_date=${to_date}&`;
 

        userGetMethod(url)
            .then(response => {

                console.log('response', response.data);

                console.log('response', response);
                setBranchName(response.data.branch_name);
                setAccountLevel(response.data.level_id);
                setAccountHead(response.data.accHead);
                setAssets(response.data.assets);
                
                setCapitalAndLiability(response.data.capital_and_liabilities);
                
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

    var asset_amount = 0;
    var liability_amount = 0;

    const assetAmountFunction = (amount) => {
        if(amount == "zero"){
            asset_amount = 0;
        }else{
            asset_amount += amount;
        }
        
    }

    const liabilityAmountFunction = (amount) => {
        if(amount == "zero"){
            liability_amount = 0;
        }else{
            liability_amount += amount;
        } 
    }

    var asset_account_code = 0;
    var asset_account_head = 0;

    const updateCodeParicular = (balance) => {
        console.log('balance', balance);

        // if(accountLevel == 1) {
        //     asset_account_code = balance.main_code+'000000000';
        //     asset_account_head = accountHead[asset_account_code].account_head;
        // } else if(accountLevel == 2) {
        //     asset_account_code = balance.main_code+''+balance.classified_code+'00000000';
        //     asset_account_head = accountHead[asset_account_code].account_head;
        // } else if(accountLevel==3) {
        //     asset_account_code = balance.main_code+''+balance.classified_code+''+balance.control_code+'000000';
        //     asset_account_head  = accountHead[asset_account_code].account_head;
        // } else {
        //     asset_account_code = balance.account_code;
        //     asset_account_head = balance.account_head;
        // }
    }


    var capital_account_code = 0;
    var capital_account_head = 0;

    const updateCodeCapital = (balance) => {
        console.log('balance', balance);

        // if(accountLevel == 1) {
        //     capital_account_code = balance.main_code+'000000000';
        //     capital_account_head = accountHead[capital_account_code].account_head;
        // } else if(accountLevel == 2) {
        //     capital_account_code = balance.main_code+''+balance.classified_code+'00000000';
        //     capital_account_head = accountHead[capital_account_code].account_head;
        // } else if(accountLevel==3) {
        //     capital_account_code = balance.main_code+''+balance.classified_code+''+balance.control_code+'000000';
        //     capital_account_head  = accountHead[capital_account_code].account_head;
        // } else {
        //     capital_account_code = balance.account_code;
        //     capital_account_head = balance.account_head;
        // }
    }

    var totalAmount = 0;

    const calculateTotal = (asset_amount, liability_amount) => {

        if(asset_amount > liability_amount){
            totalAmount = asset_amount - liability_amount;
        }else if(asset_amount < liability_amount){
            totalAmount = asset_amount - liability_amount;
        }
    }

    
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="">

                            <ReportHeader reportTtile="Balance Sheet Report" showPrint="1" />
                            <p className="text-center">Branch Name: {branchName}</p>
                            

                            <div className="mainDiv" style={{"padding": "2%"}}>

                            {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <div className="">

 
                                        <div id="PrintDiv" style={{"width": "100%"}}>

                                            <table className="particulars table table-bordered table-stripped" style={{"width" : "100%"}}>

                                                <thead>
                                                    <tr>
                                                        <th width="10%"><strong>Code</strong></th>
                                                        <th><strong>Particulars.</strong></th>
                                                        <th width="15%"><strong>Amount</strong></th>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td colspan="2"><strong>Asset</strong></td>
                                                    </tr>
                                                </thead>

                                                {assetAmountFunction("zero")}

                                                    
                                                <tbody>

                                                    { Object.values(assets).map( (balance, index) =>  
                                                        (

                                                            <>

                                                                { updateCodeParicular(balance) }

                                                                {assetAmountFunction(balance.amount)}

                                                                <tr>
                                                                    <td style={{fontSize:"12px", fontWeight:"bold"}}>{balance?.account_code}</td>
                                                                    <td style={{fontSize:"12px", fontWeight:"bold"}}>{balance?.account_head}</td>
                                                                    <td style={{fontSize:"12px", fontWeight:"bold"}} class="text-right">{parseFloat(balance.amount).toFixed(2)}</td>
                                                                </tr>

                                                            </>
                                                                
                                                        )           
                                                    )}


                                                </tbody>

                                                <tfoot>
                                                    <tr>
                                                        <td colspan="2" class="text-right"><strong>Grand Total</strong></td>
                                                        <td class="text-right"><strong>{fixedNumber(asset_amount)}</strong></td>
                                                    </tr>
                                                </tfoot>

                                                
                                            </table>

                                        </div>


                                        <div id="PrintDiv" style={{"width": "100%"}}>
                                               
                                            <table className="particulars table table-bordered table-stripped" style={{"width" : "100%"}}>

                                                <thead>
                                                    <tr>
                                                        <td></td>
                                                        <td colspan="2"  border="0"><strong>Capital and Liabilities</strong></td>
                                                    </tr>
                                                </thead>

                                                {liabilityAmountFunction("zero")}

                                                    
                                                <tbody>
                                                    
                                                    { Object.values(capitalAndLiability).map( (balance, index) =>  
                                                        (

                                                            <>
                                                            { updateCodeCapital(balance) }

                                                            {liabilityAmountFunction(balance.amount)}
                                
                                                            <tr>
                                                                <td style={{fontSize:"12px", fontWeight:"bold"}} width="10%">{balance.account_code}</td>
                                                                <td style={{fontSize:"12px", fontWeight:"bold"}}>{balance.account_head}</td>
                                                                
                                                                <td style={{fontSize:"12px", fontWeight:"bold"}} width="15%" class="text-right">{parseFloat(balance.amount).toFixed(2)}</td>
                                                            </tr>

                                                        </>
                                                                
                                                        )           
                                                    )}


                                                </tbody>

                                                {calculateTotal(asset_amount, liability_amount)}

                                                <tfoot>
                                                    <tr>
                                                        <td style={{fontSize:"13px", fontWeight:"bold"}} width="10%"></td>
                                                        <td style={{fontSize:"13px", fontWeight:"bold"}}>Current Year Profit/Loss</td>
                                                        <td style={{fontSize:"13px", fontWeight:"bold"}} width="15%" class="text-right">{fixedNumber(totalAmount)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{fontSize:"13px", fontWeight:"bold"}} colspan="2" class="text-right"><strong>Grand Total</strong></td>
                                                        <td style={{fontSize:"13px", fontWeight:"bold"}} class="text-right"><strong>{fixedNumber(liability_amount) + fixedNumber(totalAmount)}
                                                    </strong></td>
                                                    </tr>
                                                </tfoot>

                                                
                                            </table>

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