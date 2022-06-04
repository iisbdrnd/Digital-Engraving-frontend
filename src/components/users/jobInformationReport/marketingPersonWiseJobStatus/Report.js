import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader';
import {MARKETING_PERSON_WISE_JOB_STATUS_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [employees, setEmployees] = useState([]);
    const [grandTotal, setGrandTotal] = useState([]);
    const tableStyle = {
        "margin" : "2% 1% 2% 0%"
    }
    const month = props.match.params.month;
    const year = props.match.params.year;
    const employeeId = props.match.params.employeeId;
    useEffect(()=>{
        userGetMethod(`${MARKETING_PERSON_WISE_JOB_STATUS_REPORT}?month=${month}&&year=${year}&&employeeId=${employeeId}`) 
        .then(response => {
            console.log('response', response.data);
            setEmployees(response.data.employees);
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
                                            <h5>{'Marketing Person Wise Job Status Report'}</h5>
                                        </div>
                                        <Fragment>
                                            <div className="row">
                                                <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                    <thead>    
                                                        <tr>
                                                            <th width="6%" align="center">Job No</th>
                                                            <th width="8%" align="center">Job Name</th>
                                                            <th width="6%" align="center">Client Name</th>
                                                            <th width="6%" align="center">Printer</th>
                                                            <th width="6%" align="center">New</th>
                                                            <th width="6%" align="center">Remake</th>
                                                            <th width="6%" align="center">Redo</th>
                                                            <th width="8%" align="center">DC/RC</th>
                                                            <th width="6%" align="center">FL</th>
                                                            <th width="10%" align="center">Cir</th>
                                                            <th width="6%" align="center">Surface Area</th>
                                                            <th width="6%" align="center">Total Amount</th>
                                                        </tr>    
                                                    </thead>
                                                    <tbody>
                                                        {employees.length > 0 ? 
                                                            employees.map((employee)=>(
                                                                employee.jobs.length > 0 ?
                                                                    <>
                                                                        <tr>
                                                                            <th colSpan="12" >{employee.name}</th>
                                                                        </tr>
                                                                        {employee.jobs.map((job)=>( 
                                                                            <tr>
                                                                                <td>{job.job_no}</td>
                                                                                <td>{job.job_name}</td>
                                                                                <td>{job.client_name}</td>
                                                                                <td>{job.printer_name}</td>
                                                                                <td>{job.new_qty}</td>
                                                                                <td>{job.remake_qty}</td>
                                                                                <td>{job.redo_qty}</td>
                                                                                <td>{job.dc_rc_qty}</td>
                                                                                <td>{job.face_length}</td>
                                                                                <td>{job.circumference}</td>
                                                                                <td>{job.total_surface_area}</td>
                                                                                <td></td>
                                                                            </tr>
                                                                        ))}
                                                                        {employee.total.map((data)=>(
                                                                            <tr> 
                                                                                <th colSpan="10">Total</th>                                                                               
                                                                                <th>{data.total_surface_area}</th> 
                                                                            </tr>
                                                                        ))}
                                                                    </>
                                                                : null
                                                            ))
                                                        : null
                                                        }
                                                    </tbody>
                                                </table>
                                                <table className="particulars table table-bordered table-stripped" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                    <tr className="groupFont">
                                                        <td  className="text-center">Total Surface Area</td>
                                                        <td>{grandTotal.total_surface_area}</td>
                                                    </tr>
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