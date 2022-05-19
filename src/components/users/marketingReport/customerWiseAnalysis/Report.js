import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader';
import {CUSTOMER_WISE_ANALYSIS_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import { Link } from 'react-router-dom';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [clients, setClients] = useState([]);
    const [grandTotals, setGrandTotals] = useState([]);
    var menuId = 0;
    const tableStyle = {
        "margin" : "2% 1% 2% 0%"
    }
    const fromDate = props.match.params.fromDate;
    const toDate = props.match.params.toDate;
    useEffect(()=>{
        userGetMethod(`${CUSTOMER_WISE_ANALYSIS_REPORT}?fromDate=${fromDate}&&toDate=${toDate}`) 
        .then(response => {
            console.log('response', response.data);
            setJobs(response.data.jobs);
            setClients(response.data.clients);
            setGrandTotals(response.data.grand_totals);
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
                                            <h5>{'Customer Wise Analysis Report - '+fromDate+' to '+toDate}</h5>
                                        </div>
                                        <Fragment>
                                            <div className="row">
                                                <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                    <thead>    
                                                        <tr>
                                                            <th width="6%" align="center">Job No</th>
                                                            <th width="8%" align="center">Job Name</th>
                                                            <th width="6%" align="center">Printer Name</th>
                                                            <th width="6%" align="center">Cyl</th>
                                                            <th width="6%" align="center">FL</th>
                                                            <th width="6%" align="center">Cir</th>
                                                            <th width="8%" align="center">S Area</th>
                                                            <th width="10%" align="center">Base Received</th>
                                                            <th width="10%" align="center">Design to Factory</th>
                                                            <th width="10%" align="center">Prod. Status</th>
                                                            <th width="8%" align="center">Challan Status</th>
                                                            <th width="8%" align="center">Delivery Job</th>
                                                            <th width="4%" align="center">Bill No</th>
                                                            <th width="4%" align="center">Bill Amount</th>
                                                            <th width="4%" align="center">Remarks</th>
                                                        </tr>    
                                                    </thead>
                                                    <tbody>
                                                        {clients.length > 0 ? 
                                                            clients.map((client)=>(
                                                                client.jobs.length > 0 ?
                                                                    <>
                                                                        <tr>
                                                                            <th colSpan="5">
                                                                                <Link
                                                                                    to={{
                                                                                        pathname: `${process.env.PUBLIC_URL}/customerWiseAnalysis/clientDetails/${client.id}`,
                                                                                            state: { params: {client_id : client.id, menuId : menuId} }
                                                                                        }}
                                                                                    className="btn btn-secondary btn-xs">
                                                                                    Client :{client.name}
                                                                                </Link></th>
                                                                            <th colSpan="5" >Due Amount :</th>
                                                                            <th colSpan="5" >Collection Amount :</th>
                                                                        </tr>
                                                
                                                                        {client.jobs.map((job)=>( 
                                                                            <tr>
                                                                                <td>{job.job_no}</td>
                                                                                <td>{job.job_name}</td>
                                                                                <td>{job.printer_name}</td>
                                                                                <td>{job.total_cylinder_qty}</td>
                                                                                <td>{job.face_length}</td>
                                                                                <td>{job.circumference}</td>
                                                                                <td>{job.surface_area}</td> 
                                                                                <td>{job.base_receive_status==1?'Yes':'No'}</td>
                                                                                <td>{job.design_to_factory_status==1?'Yes':'No'}</td>
                                                                                <td>{job.ready_for_challan==1?'Yes':'No'}</td>
                                                                                <td>{job.challan_complete==1?'Yes':'No'}</td>
                                                                                <td>{job.bill_complete==1?'Yes':'No'}</td>
                                                                                <td>{job.bill_no}</td>
                                                                                <td>{job.grand_total_amount}</td>
                                                                                <td>{job.remarks}</td>
                                                                            </tr>
                                                                        ))}
                                                                        {client.total.map((data)=>(
                                                                            <tr>
                                                                                <th colspan="3">Total</th>
                                                                                <th>{data.total_cylinder_qty}</th>
                                                                                <th>{data.face_length}</th>
                                                                                <th>{data.circumference}</th>
                                                                                <th>{data.surface_area}</th>
                                                                                <th colspan="6"></th>
                                                                                <th>{data.grand_total_amount}</th>
                                                                                <th></th>
                                                                                   
                                                                            </tr>
                                                                        ))}
                                                                    </>
                                                                : null
                                                            ))
                                                        : null
                                                        }
                                                        <>
                                                            {grandTotals.length > 0 ? 
                                                                grandTotals.map((grandTotal, key)=>(
                                                                    <tr>  
                                                                        <th colspan="3" align="right">Grand Total</th>
                                                                        <th>{grandTotal.total_cylinder_qty}</th>
                                                                        <th>{grandTotal.face_length}</th>
                                                                        <th>{grandTotal.circumference}</th>
                                                                        <th>{grandTotal.surface_area}</th>
                                                                        <th colspan="6"></th>
                                                                        <th>{grandTotal.grand_total_amount}</th>
                                                                        <th></th>
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