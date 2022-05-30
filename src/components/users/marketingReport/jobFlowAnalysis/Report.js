import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader';
import {JOB_FLOW_ANALYSIS_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [grandTotal, setGrandTotal] = useState([]);
    
    const tableStyle = {
        "margin" : "2% 1% 2% 0%"
    }
    const fromDate = props.match.params.fromDate;
    const toDate = props.match.params.toDate;
    const clientId = props.match.params.clientId;
    useEffect(()=>{
        userGetMethod(`${JOB_FLOW_ANALYSIS_REPORT}?fromDate=${fromDate}&&toDate=${toDate}&&clientId=${clientId}`) 
        .then(response => {
            console.log('response', response.data);
            setJobs(response.data.jobs);
            setGrandTotal(response.data.grandTotal);
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
                                            <h5>{'Job Flow Analysis Report - '+fromDate+' to '+toDate}</h5>
                                        </div>
                                        <Fragment>
                                            <div className="row">
                                                <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                    <thead>    
                                                        <tr>
    
                                                            <th width="15%" align="center">Client Name</th>
                                                            <th width="15%" align="center">Printer Name</th>
                                                            <th width="15%" align="center">Marketing Person</th>
                                                            <th width="10%" align="center">Cylinder</th>
                                                            {/* <th width="10%" align="center">Times</th> */}
                                                            <th width="10%" align="center">Surface Area</th>   
                                                        </tr>    
                                                    </thead>
                                                    <tbody>
                                                        <>
                                                            {jobs.length > 0 ? 
                                                                jobs.map((job)=>(      
                                                                    <tr>
                                                                        <td>{job.client_name}</td>
                                                                        <td>{job.printer_name}</td>
                                                                        <td>{job.employee_name}</td>
                                                                        <td>{job.total_cylinder_qty}</td>
                                                                        {/* <td>{job.times}</td> */}
                                                                        <td>{job.surface_area}</td>
                                                                    </tr>
                                                                ))
                                                            : null
                                                            }
                                                        </>
                                                        <>
                                                               <tr>
                                                                    <th colSpan="4" className="text-right">Total Surface Area</th>
                                                                    <th>{grandTotal.total_surface_area}</th>
                                                                </tr>
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