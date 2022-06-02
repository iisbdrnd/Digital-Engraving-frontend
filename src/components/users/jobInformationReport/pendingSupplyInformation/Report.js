import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader';
import {PENDING_SUPPLY_INFORMATION_REPORT} from '../../../../api/userUrl'
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
    const pendingCategory = props.match.params.pendingCategory;
    const oneDay = 24 * 60 * 60 * 1000;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '/' + mm + '/' + dd;
    useEffect(()=>{
        userGetMethod(`${PENDING_SUPPLY_INFORMATION_REPORT}?fromDate=${fromDate}&&toDate=${toDate}&&employeeId=${employeeId}&&pendingCategory=${pendingCategory}`) 
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
                                            <h5>{'Pending Supply Information Report - '+fromDate+' to '+toDate}</h5>
                                        </div>
                                        <Fragment>
                                            <div className="row">
                                                <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                    <thead>    
                                                        <tr>
                                                            <th width="6%" align="center">Aggrement Date</th>
                                                            <th width="6%" align="center">Job No</th>
                                                            <th width="8%" align="center">Job Name</th>
                                                            <th width="8%" align="center">Client Name</th>
                                                            <th width="6%" align="center">Status</th>
                                                            <th width="6%" align="center">Size</th>
                                                            <th width="6%" align="center">Cyl</th>
                                                            <th width="6%" align="center">Duration</th>
                                                        </tr>    
                                                    </thead>
                                                    <tbody>
                                                        {employees.length > 0 ? 
                                                            employees.map((employee)=>(
                                                                employee.jobs.length > 0 ?
                                                                    <>
                                                                        <tr>
                                                                            <th colSpan="13" >{employee.name}</th>
                                                                        </tr>
                                                
                                                                        {employee.jobs.map((job)=>( 
                                                                            <tr>
                                                                                <td>{job.agreement_date}</td>
                                                                                <td>{job.job_no}</td>
                                                                                <td>{job.job_name}</td>
                                                                                <td>{job.client_name}</td>
                                                                                <td>{job.job_type}</td>
                                                                                <td>{job.face_length}x{job.circumference}</td>
                                                                                <td>{job.total_cylinder_qty}</td>
                                                                                <td>{Math.round(Math.abs((new Date(job.agreement_date) - new Date(today)) / oneDay))}</td>
                                                                            </tr>
                                                                        ))}
                                                                        {employee.total.map((data)=>(
                                                                            <tr> 
                                                                                <th colspan="6">Total</th>                                                                               
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