import React, { Fragment, useEffect, useReducer, useState, useRef } from 'react';
import {AccountsReceivableReportActionApi} from '../../../../../api/userUrl'
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

    const [inputData, setInputData] = useState({});
    const [ branchName, setBranchName] = useState();
    const [ chartOfAccountData, setChartOfAccountData ] = useState();
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
            var url = `${AccountsReceivableReportActionApi}?type=1&branch_id=${branch_id}&`;
        }else{
            var url = `${AccountsReceivableReportActionApi}?type=2&branch_id=${branch_id}&to_date=${to_date}&`;
        }

        userGetMethod(`${url}?page=${pageNumber}`)
            .then(response => {


                console.log('response', response.data);
        
                setCurrentPage(pageNumber);
                setPerPage(defaultPerPage);
                setTotalData(Object.values(response.data.ledgers).length);
                setBranchName(response.data.branch_name);
                setChartOfAccountData(response.data.chart_of_accounts);


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
            var url = `${AccountsReceivableReportActionApi}?type=1&branch_id=${branch_id}&`;
        }else{
            var url = `${AccountsReceivableReportActionApi}?type=2&branch_id=${branch_id}&to_date=${to_date}&`;
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

    var totalBalance = 0;

    const TotalBalanceAmount = (debit_amount , credit_amount) => {
        totalBalance += debit_amount - credit_amount;  
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

                            <ReportHeader reportTtile="Ledger Query Report" showPrint={showprint} />
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
                                                                    <td width="10%"><strong>Code</strong></td>
                                                                    <td><strong>Particulars</strong></td>
                                                                    <td width="12%" class="text-center"><strong>Balance</strong></td>
                                                                </tr>
                                                            </thead>
                                                                
                                                            <tbody>
                                                                

                                                                { Object.values(voucherData).map( (ledger, index) =>  
                                                                    (
                                                                        <>
         
                                                                            {TotalBalanceAmount(ledger.debit_amount,ledger.credit_amount)}

                                                                            <tr>
                                                                                <td style={{fontSize:"12px", fontWeight:"bold"}}>{ledger.account_code}</td>
                                                                                <td style={{fontSize:"12px", fontWeight:"bold"}}>{chartOfAccountData[ledger.account_code].account_head}</td>
                                                                                <td style={{fontSize:"12px", fontWeight:"bold"}}>{ledger.debit_amount-ledger.credit_amount}</td>
                                                                            </tr>

                                                                        </>
                                                                    )           
                                                                )}


                                                            </tbody>

                                                            <tfoot>
                                                                <tr>
                                                                    <td style={{fontSize:"13px", fontWeight:"bold"}} colspan="2" class="text-right"><strong>Total</strong></td>
                                                                    <td style={{fontSize:"13px", fontWeight:"bold"}} class="text-center"><strong>{fixedNumber(totalBalance)}</strong></td>
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