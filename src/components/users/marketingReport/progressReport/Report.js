import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader';
import {PROGRESS_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [employees, setEmployees] = useState([]);
    
    const tableStyle = {
        "margin" : "2% 1% 2% 0%"
    }
    const fromDate = props.match.params.fromDate;
    const toDate = props.match.params.toDate;
    useEffect(()=>{
        userGetMethod(`${PROGRESS_REPORT}?fromDate=${fromDate}&&toDate=${toDate}`) 
        .then(response => {
            console.log('response', response.data);
            setEmployees(response.data.employees);
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
                                            <h5>{'Progress Report - '+fromDate+' to '+toDate}</h5>
                                        </div>
                                        <Fragment>
                                            <div className="row">
                                                <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                    <thead>    
                                                        <tr>
                                                            <th width="6%" align="center">Job No</th>
                                                            <th width="6%" align="center">Date</th>
                                                            <th width="8%" align="center">Job Name</th>
                                                            <th width="8%" align="center">Client</th>
                                                            <th width="6%" align="center">Printer</th>
                                                            <th width="10%" align="center">Marketing</th>
                                                            <th width="6%" align="center">Status</th>
                                                            <th width="6%" align="center">Size</th>
                                                            <th width="6%" align="center">Quantity</th>
                                                            <th width="6%" align="center">Date Diff</th>
                                                            <th width="6%" align="center">Base Order Date</th>
                                                            <th width="6%" align="center">Base to Factory</th>
                                                            <th width="6%" align="center">Designer</th>
                                                            <th width="6%" align="center">Design Assign Date</th>
                                                            <th width="6%" align="center">Design to Factory</th>
                                                            <th width="8%" align="center">Proposed Delivery Date</th>
                                                            <th width="10%" align="center">Actual Production Date</th>   
                                                        </tr>    
                                                    </thead>
                                                    <tbody>
                                                        {employees.length > 0 ? 
                                                            employees.map((employee)=>(
                                                                employee.progresses.length > 0 ?
                                                                    <>
                                                                        <tr>
                                                                            <th colSpan="17" >{employee.name}</th>
                                                                        </tr>
                                                
                                                                        {employee.progresses.map((progress)=>( 
                                                                            <tr>
                                                                                <td>{progress.job_no}</td>
                                                                                <td>{progress.agreement_date}</td>
                                                                                <td>{progress.job_name}</td>
                                                                                <td>{progress.client_name}</td>
                                                                                <td>{progress.printer_name}</td>
                                                                                <td>{progress.employee_name}</td>
                                                                                <td>{progress.job_type}</td>
                                                                                <td></td>
                                                                                <td>{progress.total_cylinder_qty}</td>
                                                                                <td></td>
                                                                                <td>{progress.base_order_date}</td>
                                                                                <td>{progress.base_send_factory_date}</td>
                                                                                <td></td>
                                                                                <td>{progress.assign_date}</td>
                                                                                <td>{progress.design_to_factory_date}</td>
                                                                                <td></td>
                                                                                <td></td>
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