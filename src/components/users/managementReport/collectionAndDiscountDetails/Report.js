import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader';
import {COLLECTION_AND_DISCOUNT_DETAILS_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState([]);
    const tableStyle = {
        "margin" : "2% 1% 2% 0%"
    }
    const fromDate = props.match.params.fromDate;
    const toDate = props.match.params.toDate;
    const status = props.match.params.status;
    useEffect(()=>{
        userGetMethod(`${COLLECTION_AND_DISCOUNT_DETAILS_REPORT}?fromDate=${fromDate}&&toDate=${toDate}&&status=${status}`)
        .then(response => {
            console.log('response', response.data);
            setTransactions(response.data.transactions);
            setIsLoading(false);
        })
        .catch(error => console.log(error))
    }, []);
    
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className=""> 
                            <ReportHeader />

                            <div className="mainDiv" style={{"padding": "1% 5%"}}>
                            {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <>
                                        <div className="text-center">
                                            <h5>{'Collection And Discount Details Report - '+fromDate+' to '+toDate}</h5>
                                        </div>
                                        <div className="text-left">
                                            <h5>{'Status - '+status}</h5>
                                        </div>
                                        <Fragment>
                                            <div className="row">
                                                <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                    <thead>
                                                        {status == 'cash'? (   
                                                            <tr>
                                                                <th width="6%" align="center">Account Code</th>
                                                                <th width="8%" align="center">Branch ID</th>
                                                                <th width="6%" align="center">Amount</th>  
                                                            </tr>
                                                        ):(
                                                            <tr>
                                                                <th width="6%" align="center">Account Code</th>
                                                                <th width="8%" align="center">Branch ID</th>
                                                                <th width="8%" align="center">Cheque No</th>
                                                                <th width="6%" align="center">Amount</th>  
                                                            </tr>
                                                        )
                                                        }   
                                                    </thead>
                                                    <tbody>
                                                        {status == 'cash'?
                                                            transactions.length > 0 ? 
                                                                transactions.map((transaction)=>(
                                                                    <tr>
                                                                        <td>{transaction.account_code}</td>
                                                                        <td>{transaction.branch_id}</td>
                                                                        <td>{transaction.amount}</td>
                                                                    </tr>
                                                                ))
                                                            : null
                                                        :   transactions.length > 0 ? 
                                                                transactions.map((transaction)=>(
                                                                    <tr>
                                                                        <td>{transaction.account_code}</td>
                                                                        <td>{transaction.branch_id}</td>
                                                                        <td>{transaction.cheque_no}</td>
                                                                        <td>{transaction.amount}</td>
                                                                    </tr>
                                                                ))
                                                            : null
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>    
                                        </Fragment>
                                    </>
                                )
                            } 
                            </div>  
                        </div>    
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default Report;