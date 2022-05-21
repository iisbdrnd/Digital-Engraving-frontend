import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader';
import {DAILY_PRODUCTION_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [grandTotals, setGrandTotals] = useState([]);
    const tableStyle = {
        // "border" : "1px solid #ccc",
        "margin" : "2% 1% 2% 0%"
    }
    const date = props.match.params.date;
    const cylinder_type = props.match.params.cylinder_type;
    const report_type = props.match.params.report_type;
    useEffect(()=>{
        // console.log({report_type, cylinder_type, year});
        userGetMethod(`${DAILY_PRODUCTION_REPORT}?date=${date}&&cylinder_type=${cylinder_type}&&report_type=${report_type}`) 
        .then(response => {
            console.log('response', response.data);
            setJobs(response.data.jobs);
            setEmployees(response.data.employees);
            setGrandTotals(response.data.grand_totals);
            setIsLoading(false);
        })
        .catch(error => console.log(error))
    }, []);
    const handleTotalData = (new_qty, remake_qty, redu_qty, total_cylinders, total_surface_area, billable_total_surface_area, total_billable_cyl) => {
        
    }
    
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
                                        <>
                                            <div className="text-center">
                                                <h5>{'Daily Production '}{date}</h5>
                                            </div>
                                            <Fragment>
                                                <div className="row">
                                                    <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                        <thead>
                                                    
                                                            <tr>
                                                                <th width="5%" align="center">Job No</th>
                                                                <th width="5%" align="center">Job Name</th>
                                                                <th width="10%" align="center">Client Name</th>
                                                                <th width="10%" align="center">Printer Name</th>
                                                                <th width="5%" align="center">New</th>
                                                                <th width="5%" align="center">Remake</th>
                                                                <th width="5%" align="center">Redo</th>
                                                                <th width="5%"align="center">DC/RC</th>
                                                                <th width="10%" align="center">FL</th>
                                                                <th width="10%" align="center">Cir</th>
                                                                <th width="10%" align="center"> S. Area</th>
                                                                <th width="10%" align="center">Marketing By</th>
                                                                <th width="10%" align="center">Challan</th>
                                                               
                                                            </tr>
                                                            
                                                        </thead>
                                                        <tbody>
                                                            {report_type == 'employeeWise' ?
                                                                employees.length > 0 ? 
                                                                    employees.map((employee)=>(
                                                                        employee.dailyProductions.length > 0 ?
                                                                            <>
                                                                                <tr>
                                                                                    <th colSpan="11" >{employee.name}</th>
                                                                                </tr>
                                                    
                                                                                {employee.dailyProductions.map((dailyProduction)=>( 
                                                                                    <tr>
                                                                                        <td>{dailyProduction.job_no}</td>
                                                                                        <td>{dailyProduction.job_name}</td>
                                                                                        <td>{dailyProduction.client_name}</td>
                                                                                        <td>{dailyProduction.printer_name}</td>
                                                                                        <td>{dailyProduction.new_qty}</td>
                                                                                        <td>{dailyProduction.remake_qty}</td>
                                                                                        <td>{dailyProduction.redo_qty}</td>
                                                                                        <td>{dailyProduction.dc_rc_qty}</td>
                                                                                        <td>{dailyProduction.face_length}</td>
                                                                                        <td>{dailyProduction.circumference}</td>
                                                                                        <td>{dailyProduction.surface_area}</td> 
                                                                                        <td>{dailyProduction.employee_name}</td> 
                                                                                        <td></td> 
                                                                                    </tr>
                                                                                ))}
                                                                                {employee.total.map((data)=>(
                                                                                <tr>
                                                                                    <th colspan="4">Total</th>
                                                                                    <th>{data.new_qty}</th>
                                                                                    <th>{data.remake_qty}</th>
                                                                                    <th>{data.redo_qty}</th>
                                                                                    <th>{data.dc_rc_qty}</th>
                                                                                    <th></th>
                                                                                    <th></th>                                                                                  
                                                                                    <th>{data.surface_area}</th>
                                                                                    <th></th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            ))}
                                                                            </>
                                                                        : null
                                                                    ))
                                                                : null
                                                            :(
                                                                jobs.length > 0 ?
                                                                    <> 
                                                                    {jobs.map((job, key)=>(    
                                                                        <tr key={key++}>
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
                                                                            <td>{job.surface_area}</td>
                                                                            <td>{job.employee_name}</td>
                                                                            <td></td>
                                                                        </tr>
                                                                    ))}

                                                                    {grandTotals.map((grandTotal, key)=>(
                                                                        <tr>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td align="right">Total</td>
                                                                            <td>{grandTotal.new_qty}</td>
                                                                            <td>{grandTotal.remake_qty}</td>
                                                                            <td>{grandTotal.redo_qty}</td>
                                                                            <td>{grandTotal.dc_rc_qty}</td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td>{grandTotal.total_surface_area}</td>
                                                                            <td></td>
                                                                            <td></td>
                                                                        </tr>
                                                                    
                                                                    ))}
                                                                    </>
                                                                     

                                                                : null
                                                            )}
                                                        </tbody>
                                                    </table>
                                                    <div className="footerCalculation col-md-12">
                                                    <table>
                                                        {report_type != 'employeeWise' ?
                                                            grandTotals.length > 0 ? 
                                                                grandTotals.map((grandTotal, key)=>(
                                                                    <>
                                                                        <tr>
                                                                            <td>Billable Cylinder:  {grandTotal.billable_cylinder}</td>
                                                                        </tr>
                                                                    
                                                                        <tr>
                                                                            <td>Total Work Load: {grandTotal.total_cyl_qty}</td>
                                                                        </tr>
                                                                        
                                                                    </>
                                                                ))
                                                            : null
                                                        : null
                                                        }
                                                    </table>
                                                </div>
                                                </div>
                                                
                                            </Fragment>
                                        </>
                                        
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