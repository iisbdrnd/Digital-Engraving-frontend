import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader';
import {PRINTER_WISE_JOB_STATUS_DETAILS_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [printers, setprinters] = useState([]);
    
    const tableStyle = {
        "margin" : "2% 1% 2% 0%"
    }
    const fromDate = props.match.params.fromDate;
    const toDate = props.match.params.toDate;
    const printerId = props.match.params.printerId;
    const oneDay = 24 * 60 * 60 * 1000;
    useEffect(()=>{
        userGetMethod(`${PRINTER_WISE_JOB_STATUS_DETAILS_REPORT}?fromDate=${fromDate}&&toDate=${toDate}&&printerId=${printerId}`) 
        .then(response => {
            console.log('response', response.data);
            setprinters(response.data.printers);
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
                                            <h5>{'Printer Wise Job Status Details Report - '+fromDate+' to '+toDate}</h5>
                                        </div>
                                        <Fragment>
                                            <div className="row">
                                                <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                <thead>    
                                                        <tr>
                                                            <th width="6%" align="center">Aggrement Date</th>
                                                            <th width="6%" align="center">Job No</th>
                                                            <th width="8%" align="center">Job Name</th>
                                                            <th width="6%" align="center">Client's Name</th>
                                                            <th width="6%" align="center">Size</th>
                                                            <th width="6%" align="center">Cyl</th>
                                                            <th width="6%" align="center">Height</th>
                                                            <th width="6%" align="center">Width</th>
                                                            <th width="6%" align="center">Status</th>
                                                            <th width="6%" align="center">Delivered Date</th>
                                                        </tr>    
                                                    </thead>
                                                    <tbody>
                                                        {printers.length > 0 ? 
                                                            printers.map((printer)=>(
                                                                printer.jobs.length > 0 ?
                                                                    <>
                                                                        <tr>
                                                                            <th colSpan="10" >{printer.printer_name}</th>
                                                                        </tr>
                                                
                                                                        {printer.jobs.map((job)=>( 
                                                                            <tr>
                                                                                <td>{job.agreement_date}</td>
                                                                                <td>{job.job_no}</td>
                                                                                <td>{job.job_name}</td>
                                                                                <td>{job.client_name}</td>
                                                                                <td>{job.face_length}x{job.circumference}</td>
                                                                                <td>{job.total_cylinder_qty}</td>
                                                                                <td>{job.height}</td>
                                                                                <td>{job.width}</td>
                                                                                <td>{job.status}</td>
                                                                                <td>{job.delivery_date}</td>
                                                                            </tr>
                                                                        ))}
                                                                        {printer.total.map((data)=>(
                                                                            <tr> 
                                                                                <th colspan="5">Total</th>                                                                               
                                                                                <th>{data.total_cylinder_qty}</th> 
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