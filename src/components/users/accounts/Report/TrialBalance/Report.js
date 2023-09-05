import React, { Fragment, useEffect, useReducer, useState, useRef } from 'react';
import {TrialBalanceReportActionApi} from '../../../../../api/userUrl'
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
    const [ accountLevel, setAccountLevel] = useState();
    const [ accountHead, setAccountHead] = useState();
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
    var level_id = params.get('level_id'); 

    const defaultPerPage = 10;

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
            var url = `${TrialBalanceReportActionApi}?type=1&branch_id=${branch_id}&level_id=${level_id}`;
        }else{
            var url = `${TrialBalanceReportActionApi}?type=2&branch_id=${branch_id}&level_id=${level_id}&from_date=${from_date}&to_date=${to_date}`;
        }

        userGetMethod(`${url}?page=${pageNumber}`)
            .then(response => {


                console.log('response', response.data);
        
                setCurrentPage(pageNumber);
                setPerPage(defaultPerPage);
                setTotalData(Object.values(response.data.trial_balances).length);
                setBranchName(response.data.branch_name);
                setAccountLevel(response.data.account_level);
                setAccountHead(response.data.accHead);


                if(pageNumber > 1){
                    var startArray = (pageNumber-1)*defaultPerPage;
                    var endArray = pageNumber * defaultPerPage;
                    setVoucherData(Object.values(response.data.trial_balances).slice(startArray, endArray));
                }else{
                    setVoucherData(Object.values(response.data.trial_balances).slice(0,defaultPerPage));
                }
                
                setIsLoading(false);
            })
            .catch(error => console.log(error))
    }

    const viewAllData = () => {

        setIsLoading(true);
        if(type == 1){
            var url = `${TrialBalanceReportActionApi}?type=1&branch_id=${branch_id}&level_id=${level_id}`;
        }else{
            var url = `${TrialBalanceReportActionApi}?type=2&branch_id=${branch_id}&level_id=${level_id}&from_date=${from_date}&to_date=${to_date}`;
        }

        userGetMethod(url)
            .then(response => {
                setVoucherData(Object.values(response.data.trial_balances));
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

    var account_code;
    var particulars;

    const updateCodeParicular = (trial_balance) => {
        console.log('trial', trial_balance);
        if(accountLevel == 1) {
            account_code = trial_balance.main_code+'000000000';
            particulars = accountHead[account_code].account_head;
        } else if(accountLevel == 2) {
            account_code = trial_balance.main_code+''+trial_balance.classified_code+'00000000';
            particulars = accountHead[account_code].account_head;
        } else if(accountLevel==3) {
            account_code = trial_balance.main_code+''+trial_balance.classified_code+''+trial_balance.control_code+'000000';
            particulars  = accountHead[account_code].account_head;
        } else {
            account_code = trial_balance.account_code;
            particulars = trial_balance.account_head;
        }
    }

    var debit_amount;
    var credit_amount;

    const Debit = (amount) => {
        if(amount == "zero"){
            debit_amount = 0;
            return "";
        }else{
            debit_amount += amount;
            return amount;
        }
        
    }

    const Credit = (amount) => {
        if(amount == "zero"){
            credit_amount = 0;
            return "";
        }else{
            credit_amount += amount;
            return amount;
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

                            <ReportHeader reportTtile="Trial Balance Report" showPrint={showprint} />
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
                                                                    <th width="10%" align="left" valign="middle">Particulars.</th>
                                                                    <th width="10%" align="left" valign="middle">Debit</th>
                                                                    <th width="10%" align="left" valign="middle">Credit</th>
                                                                </tr>
                                                            </thead>

                                                            {Debit("zero")}
                                                            {Credit("zero")}

                                                                
                                                            <tbody>
                                                                
                                                                { Object.values(voucherData).map( (item, index) =>  
                                                                    (

                                                                      <>
                                                                        { updateCodeParicular(item) }
                          
                                                                        <tr>
                                                                            <td>{account_code}</td>
                                                                            <td>{particulars}</td>
                                                                            <td align="left" valign="middle">{Debit(item.debit_amount)}</td>
                                                                            <td align="left" valign="middle">{Credit(item.credit_amount)}</td>
                                                                        </tr> 

                                                                    </>
                                                                            
                                                                    )           
                                                                )}
                                                            </tbody>

                                                            <tfoot>
                                                                <tr>
                                                                    <td align="right" colSpan="2"><strong>Total:</strong></td>
                                                                    <td align="left" valign="middle"><strong>{debit_amount}</strong></td>
                                                                    <td align="left" valign="middle"><strong>{credit_amount}</strong></td>
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