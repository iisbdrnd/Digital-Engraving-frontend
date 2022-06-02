import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader';
import {CLIENT_SUMMARY_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [clients, setClients] = useState([]);
    const [grandTotals, setGrandTotals] = useState([]);
    
    const tableStyle = {
        "margin" : "2% 1% 2% 0%"
    }
    const fromDate = props.match.params.fromDate;
    const toDate = props.match.params.toDate;
    useEffect(()=>{
        userGetMethod(`${CLIENT_SUMMARY_REPORT}?fromDate=${fromDate}&&toDate=${toDate}`) 
        .then(response => {
            console.log('response', response.data);
            setClients(response.data.clients);
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
                                        <h5>{'Client Summary Report - '+fromDate+' to '+toDate}</h5>
                                        </div>
                                        <Fragment>
                                            <div className="row">
                                                <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                    <thead>    
                                                            <tr>
                                                                <th width="8%" align="center">Client Name</th>
                                                                <th width="5%" align="center">New</th>
                                                                <th width="5%" align="center">Remake</th>
                                                                <th width="5%" align="center">Redo</th>
                                                                <th width="5%" align="center">DC/RC</th>
                                                                <th width="8%" align="center">Total Cyl</th>
                                                                <th width="8%" align="center">% of Total</th>
                                                                <th width="8%" align="center">Total S.A.</th>
                                                                <th width="8%" align="center">Billable Cyl</th>
                                                                <th width="8%" align="center">Billable S.A.</th>
                                                                <th width="8%" align="center">Cancel Cyl</th>
                                                            </tr>  
                                                    </thead>
                                                    <tbody>
                                                        {clients.length > 0 ? 
                                                            clients.map((client)=>(
                                                                client.jobs.length > 0 ?
                                                                    <>
                                                                        <tr>
                                                                            <th colSpan="11" >{client.name}</th>
                                                                        </tr>
                                                
                                                                        {client.jobs.map((job)=>( 
                                                                            <tr>
                                                                                <td></td>
                                                                                <td>{job.new_qty}</td>
                                                                                <td>{job.remake_qty}</td>
                                                                                <td>{job.redo_qty}</td>
                                                                                <td>{job.dc_rc_qty}</td>
                                                                                <td>{job.total_cylinder_qty}</td>
                                                                                <td>{
                                                                                    Math.round((job.total_cylinder_qty*100) / grandTotals.map((grandTotal)=>((grandTotal.total_cylinder_qty))))
                                                                                }%</td>
                                                                                <td>{job.total_surface_area}</td>
                                                                                <td>{job.billable_cyl}</td>
                                                                                <td>{job.billable_sa}</td>
                                                                                <td>{job.cancel_quantity}</td>
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
                                                                        <th>Grand Total</th>
                                                                        <th>{grandTotal.new_qty}</th>
                                                                        <th>{grandTotal.remake_qty}</th>
                                                                        <th>{grandTotal.redo_qty}</th>
                                                                        <th>{grandTotal.dc_rc_qty}</th>                                                                                 
                                                                        <th>{grandTotal.total_cylinder_qty}</th>
                                                                        <th>100%</th>                                                                                 
                                                                        <th>{grandTotal.total_surface_area}</th>  
                                                                        <th>{grandTotal.billable_cyl}</th>  
                                                                        <th>{grandTotal.billable_sa}</th>  
                                                                        <th>{grandTotal.cancel_quantity}</th>  
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