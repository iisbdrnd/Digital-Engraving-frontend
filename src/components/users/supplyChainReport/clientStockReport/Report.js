import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader';
import {CLIENT_STOCK_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    
    const tableStyle = {
        "margin" : "2% 1% 2% 0%"
    }
    const client_id = props.match.params.client_id;
    const printer_id = props.match.params.printer_id;
    const oneDay = 24 * 60 * 60 * 1000;
    useEffect(()=>{
        userGetMethod(`${CLIENT_STOCK_REPORT}?client_id=${client_id}&&printer_id=${printer_id}`) 
        .then(response => {
            console.log('response', response.data);
            setJobs(response.data.jobs);
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
                                            <h5>{'Client Stock Report'}</h5>
                                        </div>
                                        <Fragment>
                                            <div className="row">
                                                <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                    <thead>    
                                                        <tr>
                                                            <th width="6%" align="center">Job No</th>
                                                            <th width="6%" align="center">Date</th>
                                                            <th width="8%" align="center">Client Name</th>
                                                            <th width="8%" align="center">Job Name</th>
                                                            <th width="6%" align="center">Printer's Name</th>
                                                            <th width="6%" align="center">Size</th>
                                                            <th width="6%" align="center">In</th>
                                                            <th width="8%" align="center">Out</th>
                                                            <th width="6%" align="center">Remarks</th>
                                                        </tr>    
                                                    </thead>
                                                    <tbody>
                                                        {jobs.length > 0 ? 
                                                            jobs.map((job)=>(
                                                                job.client_stocks.length > 0 ?
                                                                    <>
                                                                        <tr>
                                                                            <th colSpan="13" >{job.job_no}</th>
                                                                        </tr>
                                                
                                                                        {job.client_stocks.map((client_stock)=>( 
                                                                            <tr>
                                                                                <td>{client_stock.job_no}</td>
                                                                                <td>{client_stock.tr_date}</td>
                                                                                <td>{client_stock.client_name}</td>
                                                                                <td>{client_stock.job_name}</td>
                                                                                <td>{client_stock.printer_name}</td>
                                                                                <td>{client_stock.face_length}x{client_stock.circumference}</td>
                                                                                <td>{client_stock.stock_in}</td>
                                                                                <td>{client_stock.stock_out}</td>
                                                                                <td>{client_stock.remarks}</td>
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