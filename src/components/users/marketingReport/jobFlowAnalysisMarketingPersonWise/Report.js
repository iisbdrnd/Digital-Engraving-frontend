import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader';
import {JOB_FLOW_ANALYSIS_MARKETING_PERSON_WISE_REPORT} from '../../../../api/userUrl'
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
    const employeeId = props.match.params.employeeId;
    useEffect(()=>{
        userGetMethod(`${JOB_FLOW_ANALYSIS_MARKETING_PERSON_WISE_REPORT}?fromDate=${fromDate}&&toDate=${toDate}&&employeeId=${employeeId}`) 
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
                                            <h5>{'Job Flow Analysis Report Marketing Person Wise - '+fromDate+' to '+toDate}</h5>
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
                                                        {employees.length > 0 ? 
                                                            employees.map((employee)=>(
                                                                employee.jobs.length > 0 ?
                                                                    <>
                                                                        <tr>
                                                                            <th colSpan="5" >{employee.name}</th>
                                                                        </tr>
                                                
                                                                        {employee.jobs.map((job)=>( 
                                                                            <tr>
                                                                                <td>{job.client_name}</td>
                                                                                <td>{job.printer_name}</td>
                                                                                <td>{job.employee_name}</td>
                                                                                <td>{job.total_cylinder_qty}</td>
                                                                                <td>{job.surface_area}</td>
                                                                            </tr>
                                                                        ))}
                                                                        {employee.total.map((data)=>(
                                                                            <tr>
                                                                                <th colspan="4">Total</th>                                                                                
                                                                                <th>{data.surface_area}</th>
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