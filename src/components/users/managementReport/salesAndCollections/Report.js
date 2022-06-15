import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader';
import {SALES_AND_COLLECTIONS_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [grandTotals, setGrandTotals] = useState([]);
    
    const tableStyle = {
        "margin" : "2% 1% 2% 0%"
    }
    const fromDate = props.match.params.fromDate;
    const toDate = props.match.params.toDate;
    useEffect(()=>{
        userGetMethod(`${SALES_AND_COLLECTIONS_REPORT}?fromDate=${fromDate}&&toDate=${toDate}`) 
        .then(response => {
            console.log('response', response.data);
            setJobs(response.data.jobs);
            setIsLoading(false);
            setGrandTotals(response.data.grand_totals);
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
                                        <h5>{'Sales and Collections Report - '+fromDate+' to '+toDate}</h5>
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
                                                        {
                                                            jobs.length > 0 ?
                                                                <>
                                                                    {jobs.map((job)=>( 
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
                                                                </>
                                                            : null
                                                        }
                                                        <>
                                                            {grandTotals.length > 0 ? 
                                                                grandTotals.map((grandTotal, key)=>(
                                                                    <tr>  
                                                                        <th>Grand Total</th>
                                                                        <th>{grandTotal.grand_total_amount}</th>
                                                                        <th></th>
                                                                        <th>{grandTotal.net_total_amount}</th>
                                                                        <th>{grandTotal.collect_amount}</th>                                                                                 
                                                                        <th></th>                                                                             
                                                                        <th>{grandTotal.collect_amount}</th>  
                                                                        <th>{grandTotal.less_amount}</th>  
                                                                        <th colSpan= "2"></th>
                                                                    </tr>
                                                                ))
                                                            : null
                                                            }
                                                        </> 
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