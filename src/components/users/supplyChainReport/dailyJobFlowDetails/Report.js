import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader';
import {DAILY_JOB_FLOW_DETAILS_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [dailyJobFlowDetails, setDailyJobFlowDetails] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [grandTotals, setGrandTotals] = useState([]);
    
    const tableStyle = {
        // "border" : "1px solid #ccc",
        "margin" : "2% 1% 2% 0%"
    }
    const job_date = props.match.params.job_date;
    const report_type = props.match.params.report_type;
    // const year = props.match.params.year;
    useEffect(()=>{
        // console.log({report_type, cylinder_type, year});
        userGetMethod(`${DAILY_JOB_FLOW_DETAILS_REPORT}?job_date=${job_date}&&report_type=${report_type}`) 
        .then(response => {
            console.log('response', response.data);
            setDailyJobFlowDetails(response.data.dailyJobFlowDetails);
            setEmployees(response.data.employees);
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
                                            <h5>{'Daily Job Flow Details - '+job_date}</h5>
                                        </div>
                                        <Fragment>
                                            <div className="row">
                                                <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                    <thead>
                                                        {report_type != 'employeeWise' ? (
                                                            <tr>
                                                                <th width="8%" align="center">Job No</th>
                                                                <th width="8%" align="center">Job Name</th>
                                                                <th width="8%" align="center">Client Name</th>
                                                                <th width="8%" align="center">Printer Name</th>
                                                                <th width="5%" align="center">New</th>
                                                                <th width="5%" align="center">Remake</th>
                                                                <th width="5%" align="center">Redo</th>
                                                                <th width="5%"align="center">DC/RC</th>
                                                                <th width="8%" align="center">Face Length</th>
                                                                <th width="8%" align="center">Circumference</th>
                                                                <th width="8%" align="center">Surface Area</th>
                                                                <th width="8%" align="center">Marketing By</th>
                                                                <th width="8%" align="center">Remarks</th>
                                                            </tr>
                                                        ) : (
                                                            <tr>
                                                                <th width="8%" align="center">Job No</th>
                                                                <th width="8%" align="center">Job Name</th>
                                                                <th width="8%" align="center">Client Name</th>
                                                                <th width="8%" align="center">Printer Name</th>
                                                                <th width="5%" align="center">New</th>
                                                                <th width="5%" align="center">Remake</th>
                                                                <th width="5%" align="center">Redo</th>
                                                                <th width="5%"align="center">DC/RC</th>
                                                                <th width="8%" align="center">Face Length</th>
                                                                <th width="8%" align="center">Circumference</th>
                                                                <th width="8%" align="center">Surface Area</th>
                                                            </tr>
                                                        )}
                                                        
                                                    </thead>
                                                    <tbody>
                                                        {report_type != 'employeeWise' ?
                                                            dailyJobFlowDetails.length > 0 ? 
                                                                dailyJobFlowDetails.map((dailyJobFlowDetail, key)=>(    
                                                                    <tr key={key++}>
                                                                        <td>{dailyJobFlowDetail.job_no}</td>
                                                                        <td>{dailyJobFlowDetail.job_name}</td>
                                                                        <td>{dailyJobFlowDetail.client_name}</td>
                                                                        <td>{dailyJobFlowDetail.printer_name}</td>
                                                                        <td>{dailyJobFlowDetail.new_qty}</td>
                                                                        <td>{dailyJobFlowDetail.remake_qty}</td>
                                                                        <td>{dailyJobFlowDetail.redo_qty}</td>
                                                                        <td>{dailyJobFlowDetail.dc_rc_qty}</td>
                                                                        <td>{dailyJobFlowDetail.face_length}</td>
                                                                        <td>{dailyJobFlowDetail.circumference}</td>
                                                                        <td>{dailyJobFlowDetail.surface_area}</td>
                                                                        <td>{dailyJobFlowDetail.employee_name}</td>
                                                                        <td>{dailyJobFlowDetail.remarks}</td>
                                                                    </tr>
                                                                ))
                                                            : null
                                                        :(
                                                            employees.length > 0 ? 
                                                                employees.map((employee)=>(
                                                                    employee.dailyJobFlowDetails.length > 0 ?
                                                                        <>
                                                                            <tr>
                                                                                <th colSpan="11" >{employee.name}</th>
                                                                            </tr>
                                                    
                                                                            {employee.dailyJobFlowDetails.map((dailyJobFlowDetail)=>( 
                                                                                <tr>
                                                                                    <td>{dailyJobFlowDetail.job_no}</td>
                                                                                    <td>{dailyJobFlowDetail.job_name}</td>
                                                                                    <td>{dailyJobFlowDetail.client_name}</td>
                                                                                    <td>{dailyJobFlowDetail.printer_name}</td>
                                                                                    <td>{dailyJobFlowDetail.new_qty}</td>
                                                                                    <td>{dailyJobFlowDetail.remake_qty}</td>
                                                                                    <td>{dailyJobFlowDetail.redo_qty}</td>
                                                                                    <td>{dailyJobFlowDetail.dc_rc_qty}</td>
                                                                                    <td>{dailyJobFlowDetail.face_length}</td>
                                                                                    <td>{dailyJobFlowDetail.circumference}</td>
                                                                                    <td>{dailyJobFlowDetail.surface_area}</td> 
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
                                                                                </tr>
                                                                            ))}
                                                                        </>
                                                                    : null
                                                                ))
                                                            : null
                                                        )}
                                                        <>
                                                            {report_type != 'employeeWise' ?
                                                                grandTotals.length > 0 ? 
                                                                    grandTotals.map((grandTotal, key)=>(
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
                                                                    ))
                                                                : null
                                                            : null
                                                            }
                                                        </> 
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