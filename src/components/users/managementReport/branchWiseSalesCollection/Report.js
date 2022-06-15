import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader';
import {BRANCH_WISE_SALES_COLLECTION_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [branches, setBranches] = useState([]);
    
    const tableStyle = {
        "margin" : "2% 1% 2% 0%"
    }
    const fromDate = props.match.params.fromDate;
    const toDate = props.match.params.toDate;
    const branchId = props.match.params.branchId;
    const oneDay = 24 * 60 * 60 * 1000;
    useEffect(()=>{
        userGetMethod(`${BRANCH_WISE_SALES_COLLECTION_REPORT}?fromDate=${fromDate}&&toDate=${toDate}&&branchId=${branchId}`) 
        .then(response => {
            console.log('response', response.data);
            setBranches(response.data.branches);
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
                                            <h5>{'Branch Wise Sales Collection Report - '+fromDate+' to '+toDate}</h5>
                                        </div>
                                        <Fragment>
                                            <div className="row">
                                                <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                    <thead>    
                                                        <tr>
                                                            <th width="8%" align="center">Tr Date</th>
                                                            <th width="5%" align="center">Sales Amount</th>
                                                            <th width="5%" align="center">Bill Cancel</th>
                                                            <th width="5%" align="center">Net Sale</th>
                                                            <th width="8%" align="center">Cash Collection</th>
                                                            <th width="8%" align="center">Bank Collection</th>
                                                            <th width="8%" align="center">Total Collection</th>
                                                            <th width="8%" align="center">Discount Amount</th>
                                                            <th width="8%" align="center">Adjust Debit</th>
                                                            <th width="8%" align="center">Adjust Credit</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {branches.length > 0 ? 
                                                            branches.map((branch)=>(
                                                                branch.jobs.length > 0 ?
                                                                    <>
                                                                        <tr>
                                                                            <th colSpan="13" >{branch.branch_name}</th>
                                                                        </tr>
                                                
                                                                        {branch.jobs.map((job)=>( 
                                                                            <tr>
                                                                                <td>{job.bill_date}</td>
                                                                            <td>{job.grand_total_amount}</td>
                                                                            <td></td>
                                                                            <td>{job.net_total_amount}</td>
                                                                            <td>{job.collect_amount}</td>
                                                                            <td></td>
                                                                            <td>{job.collect_amount}</td>
                                                                            <td>{job.less_amount}</td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            </tr>
                                                                        ))}
                                                                        {branch.total.map((data)=>( 
                                                                            <tr>  
                                                                                <th>Grand Total</th>
                                                                                <th>{data.grand_total_amount}</th>
                                                                                <th></th>
                                                                                <th>{data.net_total_amount}</th>
                                                                                <th>{data.collect_amount}</th>                                                                                 
                                                                                <th></th>                                                                             
                                                                                <th>{data.collect_amount}</th>  
                                                                                <th>{data.less_amount}</th>  
                                                                                <th colSpan= "2"></th>
                                                                            </tr>
                                                                        ))}
                                                                    </>
                                                                : null
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