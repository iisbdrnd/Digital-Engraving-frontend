import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader';
import {RECEIVED_BASE_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [clients, setClients] = useState([]);
    const [dates, setDates] = useState([]);
    
    const tableStyle = {
        "margin" : "2% 1% 2% 0%"
    }
    const fromDate = props.match.params.fromDate;
    const toDate = props.match.params.toDate;
    const clientId = props.match.params.clientId;
    const oneDay = 24 * 60 * 60 * 1000;
    useEffect(()=>{
        userGetMethod(`${RECEIVED_BASE_REPORT}?fromDate=${fromDate}&&toDate=${toDate}&&clientId=${clientId}`) 
        .then(response => {
            console.log('response', response.data);
            setClients(response.data.clients);
            setDates(response.data.dates);
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
                                            <h5>{'Received Base Report - '+fromDate+' to '+toDate}</h5>
                                        </div>
                                        <Fragment>
                                            <div className="row">
                                                <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                    <thead>    
                                                        <tr>
                                                            <th width="6%" align="center">Order Date</th>
                                                            <th width="6%" align="center">Job No</th>
                                                            <th width="8%" align="center">Job Name</th>
                                                            <th width="6%" align="center">Printer Name</th>
                                                            <th width="6%" align="center">Size</th>
                                                            <th width="8%" align="center">Surface Area</th>
                                                            <th width="6%" align="center">No of Cyl</th>
                                                            <th width="6%" align="center">Materials</th>
                                                            <th width="6%" align="center">Intitial Weight</th>
                                                            <th width="6%" align="center">Final Weight</th>

                                                        </tr>    
                                                    </thead>
                                                    <tbody>
                                                        {clientId == 'null' ?
                                                            clients.length > 0 ? 
                                                                clients.map((client)=>(
                                                                    client.jobs.length > 0 ?
                                                                        <>
                                                                            <tr>
                                                                                <th colSpan="9" >{client.name}</th>
                                                                            </tr>
                                                    
                                                                            {client.jobs.map((job)=>( 
                                                                                <tr>
                                                                                    <td>{job.order_date}</td>
                                                                                    <td>{job.job_no}</td>
                                                                                    <td>{job.job_name}</td>
                                                                                    <td>{job.printer_name}</td>
                                                                                    <td>{job.face_length}x{job.circumference}</td>
                                                                                    <td>{job.total_surface_area}</td>
                                                                                    <td>{job.total_cylinder_qty}</td>
                                                                                    <td>{job.material == 1 ? "sheet":job.material == 2 ? "pipe":"ex-stock"}</td>
                                                                                    <td>{job.initial_weight}</td>
                                                                                    <td>{job.final_weight}</td>
                                                                                </tr>
                                                                            ))}
                                                                            {client.total.map((data)=>(
                                                                                <tr> 
                                                                                    <th colSpan="5">Total</th>                                                                               
                                                                                    <th>{data.total_surface_area}</th>  
                                                                                    <th>{data.total_cylinder_qty}</th>
                                                                                    <th colSpan="3"></th>                                                                              
                                                                                </tr>
                                                                            ))}
                                                                        </>
                                                                    : null
                                                                ))
                                                            : null
                                                        :   dates.length > 0 ? 
                                                                dates.map((date)=>(
                                                                    date.jobs.length > 0 ?
                                                                        <>
                                                                            <tr>
                                                                                <th colSpan="9" >{date.order_date}</th>
                                                                            </tr>
                                                    
                                                                            {date.jobs.map((job)=>( 
                                                                                <tr>
                                                                                    <td>{job.order_date}</td>
                                                                                    <td>{job.job_no}</td>
                                                                                    <td>{job.job_name}</td>
                                                                                    <td>{job.printer_name}</td>
                                                                                    <td>{job.face_length}x{job.circumference}</td>
                                                                                    <td>{job.total_surface_area}</td>
                                                                                    <td>{job.total_cylinder_qty}</td>
                                                                                    <td>{job.material == 1 ? "sheet":job.material == 2 ? "pipe":"ex-stock"}</td>
                                                                                    <td>{job.initial_weight}</td>
                                                                                    <td>{job.final_weight}</td>
                                                                                </tr>
                                                                            ))}
                                                                            {date.total.map((data)=>(
                                                                                <tr> 
                                                                                    <th colSpan="5">Total</th>                                                                               
                                                                                    <th>{data.total_surface_area}</th>  
                                                                                    <th>{data.total_cylinder_qty}</th>
                                                                                    <th colSpan="3"></th>                                                                                 
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