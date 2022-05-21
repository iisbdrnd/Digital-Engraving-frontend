import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader';
import {STATUS_REPORT} from '../../../../api/userUrl'
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
    const status = props.match.params.status;
    useEffect(()=>{
        userGetMethod(`${STATUS_REPORT}?fromDate=${fromDate}&&toDate=${toDate}&&status=${status}`)
        .then(response => {
            console.log('response', response.data);
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
                                            <h5>{'Status Report - '+fromDate+' to '+toDate}</h5>
                                        </div>
                                        <div className="text-left">
                                            <h5>{'Status - '+status}</h5>
                                        </div>
                                        <Fragment>
                                            <div className="row">
                                                <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                    <thead>    
                                                        <tr>
                                                            <th width="6%" align="center">Job No</th>
                                                            <th width="8%" align="center">Job Name</th>
                                                            <th width="6%" align="center">Printer Name</th>
                                                            <th width="4%" align="center">Cylinder</th>
                                                            <th width="6%" align="center">Face Length</th>
                                                            <th width="6%" align="center">Circumference</th>
                                                            <th width="8%" align="center">Surface Area</th>
                                                            <th width="10%" align="center">Remarks</th>   
                                                        </tr>    
                                                    </thead>
                                                    <tbody>
                                                        {clients.length > 0 ? 
                                                            clients.map((client)=>(
                                                                client.statuses.length > 0 ?
                                                                    <>
                                                                        <tr>
                                                                            <th colspan="8">Client :{client.name}</th>
                                                                        </tr>
                                                
                                                                        {client.statuses.map((status)=>( 
                                                                            <tr>
                                                                                <td>{status.job_no}</td>
                                                                                <td>{status.job_name}</td>
                                                                                <td>{status.printer_name}</td>
                                                                                <td>{status.total_cylinder_qty}</td>
                                                                                <td>{status.face_length}</td>
                                                                                <td>{status.circumference}</td>
                                                                                <td>{status.surface_area}</td> 
                                                                                <td>{status.remarks}</td> 
                                                                            </tr>
                                                                        ))}
                                                                        {client.total.map((data)=>(
                                                                            <tr>
                                                                                <th colspan="3">Sub Total Job  :{data.total_job}</th>
                                                                                <th>{data.total_cylinder_qty}</th>
                                                                                <th>{data.face_length}</th>
                                                                                <th>{data.circumference}</th>
                                                                                <th>{data.surface_area}</th>
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
                                                                        <th colspan="3">Grand Total Job  :{grandTotal.total_job}</th>
                                                                        <th>{grandTotal.total_cylinder_qty}</th>
                                                                        <th>{grandTotal.face_length}</th>
                                                                        <th>{grandTotal.circumference}</th>
                                                                        <th>{grandTotal.surface_area}</th>
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