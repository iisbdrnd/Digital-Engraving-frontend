import React, { Fragment, useEffect, useReducer, useState, useRef } from 'react';
import {cashBookReportActionApi} from '../../../../../api/userUrl'
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

    const [currentPage, setCurrentPage] = useState();
    const [perPage, setPerPage] = useState();
    const [totalData, setTotalData] = useState(0);
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
    var account = params.get('account'); 

    const defaultPerPage = 5;

    if(type == 1){
        var showPagination = 1;
    }else if(type == 2){
        var from_date = params.get('from_date'); 
        var to_date = params.get('to_date'); 
        var showPagination = 1;
    }

    useEffect((data, e) => {
        setIsLoading(true);
        handlePageChange();
    },[]);


    const handlePageChange = (pageNumber = 1) => {

        setIsLoading(true);

        if(type == 1){
            var url = `${cashBookReportActionApi}?type=1&branch_id=${branch_id}&account=${account}&`;
        }else{
            var url = `${cashBookReportActionApi}?type=2&branch_id=${branch_id}&account=${account}&from_date=${from_date}&to_date=${to_date}&`;
        }

        userGetMethod(`${url}?page=${pageNumber}`)
            .then(response => {


                console.log('response', response.data);
        
                setCurrentPage(pageNumber);
                setPerPage(defaultPerPage);
                setTotalData(Object.values(response.data.ledgers).length);
                setBranchName(response.data.branch_name);

                setOpeningBalance(response.data.opening_balance);
                setOpeningDate(response.data.opening_date);
                setAccounts(response.data.account);


                if(pageNumber > 1){
                    var startArray = (pageNumber-1)*defaultPerPage;
                    var endArray = pageNumber * defaultPerPage;
                    setVoucherData(Object.values(response.data.ledgers).slice(startArray, endArray));
                }else{
                    setVoucherData(Object.values(response.data.ledgers).slice(0,defaultPerPage));
                }
                
                setIsLoading(false);
            })
            .catch(error => console.log(error))
    }

    const viewAllData = () => {

        setIsLoading(true);
        if(type == 1){
            var url = `${cashBookReportActionApi}?type=1&branch_id=${branch_id}&account=${account}&`;
        }else{
            var url = `${cashBookReportActionApi}?type=2&branch_id=${branch_id}&account=${account}&from_date=${from_date}&to_date=${to_date}&`;
        }

        userGetMethod(url)
            .then(response => {
                setVoucherData(Object.values(response.data.ledgers));
                setShowPrint(1);
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

    var op_balance = 0;

    const OpeningBalanceAmount = (total_debit, total_credit) => {
        if(accounts.main_code==2 || accounts.main_code==4) {
            op_balance = (total_debit - total_credit);
        } else {
            op_balance = (total_credit - total_debit);
        }
    }

    const TotalBalanceAmount = (debit_amount, credit_amount) => {
        if(accounts.main_code==2 || accounts.main_code==4) {
            op_balance += debit_amount - credit_amount;
        }else{
            op_balance += credit_amount - debit_amount;
        }
        
    }


    var debit_amount;
    var credit_amount;

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

                            <div className="row" style={showPagination ? {'display': 'block'} : {'display':'none'} }>
                                <div className="col-sm-8 pull-left">
                                    <Pagination 
                                        activePage={currentPage}
                                        itemsCountPerPage={perPage}
                                        totalItemsCount={totalData}
                                        onChange={handlePageChange}
                                        itemClass="page-item"
                                        linkClass="page-link"
                                        firstPageText="First"
                                        lastPageText="Last"
                                    />  
                                </div>
                                <div className="col-sm-4 pull-left">
                                    <button className="btn btn-info viewAllBtn pull-right" onClick={viewAllData}>View All</button>
                                </div>
                            </div>

                            <div className="clearfix m-b-20"></div>

                            <ReportHeader reportTtile="Cash Book Report" showPrint={showprint} />
                            <p className="text-center">Branch Name: {branchName}</p>

                            <div className="mainDiv" style={{"padding": "2%"}}>

                            {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <div className="row">
   

                                        <div id="PrintDiv" style={{"width": "100%"}}>
                                            { (Object.keys(voucherData).length > 0) ? 
                                                (
                                                        <table className="particulars table table-bordered table-stripped" style={{"width" : "100%"}}>

                                                            <thead>
                                                                <tr>
                                                                    <th width="10%" align="left" valign="middle">Code</th>
                                                                    <th width="5%" align="left" valign="middle">Tr: No.</th>
                                                                    <th width="8%" align="left" valign="middle">Tr: Date.</th>
                                                                    <th width="5%" align="left" valign="middle">Instrument</th>
                                                                    <th width="20%" align="left" valign="middle">Particulars</th>
                                                                    <th width="5%" align="left" valign="middle">Debit</th>
                                                                    <th width="5%" align="left" valign="middle">Credit</th>
                                                                    <th width="5%" align="left" valign="middle">Balance</th>
                                                                </tr>
                                                            </thead>

                                                            {Debit("zero")}
                                                            {Credit("zero")}

                                                                
                                                            <tbody>
                                                                
                                                                { Object.values(openingBalance).map( (opening_balance, index) =>  
                                                                    (

                                                                        <>
                                                                        { OpeningBalanceAmount(opening_balance.total_debit,  opening_balance.total_credit) }

                                                                        {Debit(opening_balance.total_debit)}
                                                                        {Credit(opening_balance.total_credit)}

                                                                        <tr>
                                                                            <td>{opening_balance.account_code}</td>
                                                                            <td> - </td>
                                                                            <td>{openingDate}</td>
                                                                            <td> - </td>
                                                                            <td>Opening Balance</td>
                                                                            <td align="left" valign="middle">{opening_balance.total_debit}</td>
                                                                            <td align="left" valign="middle">{opening_balance.total_credit}</td>
                                                                            <td>{op_balance}</td>
                                                                        </tr> 

                                                                        </>
                                                                            
                                                                    )           
                                                                )}

                                                                { Object.values(voucherData).map( (ledger, index) =>  
                                                                    (

                                                                        <>
                                                                        { TotalBalanceAmount(ledger.debit_amount,  ledger.credit_amount) }

                                                                        {Debit(ledger.debit_amount)}
                                                                        {Credit(ledger.credit_amount)}

                                                                        <tr>
                                                                            <td>{ledger.account_code}</td>
                                                                            <td>{ledger.transaction_no}</td>
                                                                            <td>{ledger.transaction_date}</td>
                                                                            <td>{ledger.voucher_type + '-' + ledger.instrument_no}</td>
                                                                            <td>{ledger.remarks}</td>
                                                                            <td align="left" valign="middle">{ledger.debit_amount}</td>
                                                                            <td align="left" valign="middle">{ledger.credit_amount}</td>
                                                                            <td>{op_balance}</td>
                                                                        </tr> 

                                                                        </>
                                                                            
                                                                    )           
                                                                )}


                                                            </tbody>

                                                            <tfoot>
                                                                <tr>
                                                                    <td align="right" colSpan="5"><strong>Grand Total:</strong></td>
                                                                    <td align="left" valign="middle"><strong>{debit_amount}</strong></td>
                                                                    <td align="left" valign="middle"><strong>{credit_amount}</strong></td>
                                                                    <td align="left" valign="middle"><strong>{op_balance}</strong></td>
                                                                </tr>
                                                            </tfoot>
                                                        </table>
                                               
                                                        
                                                    
                                             
                                                

                                                
                                                    
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