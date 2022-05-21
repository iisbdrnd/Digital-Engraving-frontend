import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader';
import {MONTHLY_JOB_FLOW_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [grandTotals, setGrandTotals] = useState([]);
    const [monthlyTarget, setMonthlyTarget] = useState([]);
    // const [totalData, setTotalData] = useReducer(
    //     (state, newState) => ({...state, ...newState}),
    //     {
    //         new_qty                    : 0, 
    //         remake_qty                 : 0, 
    //         redu_qty                   : 0, 
    //         total_cylinders            : 0, 
    //         total_surface_area         : 0, 
    //         billable_total_surface_area: 0, 
    //         total_billable_cyl         : 0
    //     }
    // );

    const tableStyle = {
        // "border" : "1px solid #ccc",
        "margin" : "2% 1% 2% 0%"
    }
    const month = props.match.params.month;
    const cylinder_type = props.match.params.cylinder_type;
    const year = props.match.params.year;
    useEffect(()=>{
        // console.log({report_type, cylinder_type, year});
        userGetMethod(`${MONTHLY_JOB_FLOW_REPORT}?month=${month}&&year=${year}&&cylinder_type=${cylinder_type}`) 
        .then(response => {
            console.log('response', response.data.monthly_target);
            setJobs(response.data.jobs);
            setGrandTotals(response.data.grand_totals);
            setMonthlyTarget(response.data.monthly_target);
            setIsLoading(false);
        })
        .catch(error => console.log(error))
    }, []);
    const handleTotalData = (new_qty, remake_qty, redu_qty, total_cylinders, total_surface_area, billable_total_surface_area, total_billable_cyl) => {
        // new_qty = totalData.new_qty + new_qty, 
        // remake_qty = totalData.remake_qty + remake_qty, 
        // redu_qty = totalData.redu_qty + redu_qty, 
        // total_cylinders = totalData.total_cylinders + total_cylinders, 
        // total_surface_area = totalData.total_surface_area + total_surface_area, 
        // billable_total_surface_area = totalData.billable_total_surface_area + billable_total_surface_area, 
        // total_billable_cyl = totalData.total_billable_cyl + total_billable_cyl 
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
                                                <h5>{'Monthly Job Flow'}</h5>
                                            </div>
                                            <Fragment>
                                                <div className="row">
                                                    <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                        <thead>
                                                    
                                                            <tr>
                                                                <th width="5%" align="center">Date</th>
                                                                <th width="5%" align="center">Day</th>
                                                                <th width="5%" align="center">New</th>
                                                                <th width="5%" align="center">Remake</th>
                                                                <th width="5%" align="center">Redo</th>
                                                                <th width="5%"align="center">DC/RC</th>
                                                                <th width="10%" align="center">Total Cyl</th>
                                                                <th width="10%" align="center">% of Total</th>
                                                                <th width="10%" align="center">Total S.A</th>
                                                                <th width="10%" align="center">Billable Cyl</th>
                                                                <th width="10%" align="center">Billable S.A</th>
                                                                <th width="5%" align="center">Return</th>
                                                                <th width="10%" align="center">Base To Stock</th>
                                                                <th width="10%" align="center">Cancel Cyl</th>
                                                                <th width="10%" align="center">Total Order</th>
                                                            </tr>
                                                            
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                jobs.length > 0 ? 
                                                                    jobs.map((job, key)=>(    
                                                                        <tr key={key++}>
                                                                            <td>{job.agreement_date}</td>
                                                                            <td>{job.agreement_day}</td>
                                                                            <td>{job.new_qty}</td>
                                                                            <td>{job.remake_qty}</td>
                                                                            <td>{job.redo_qty}</td>
                                                                            <td>{job.dc_rc_qty}</td>
                                                                            <td>{job.total_cyl_qty}</td>
                                                                            <td>{Math.round((job.total_cyl_qty * 100) / job.total_quantity)}%</td>
                                                                            <td>{job.total_surface_area}</td>
                                                                            <td>{job.billable_cylinder}</td>
                                                                            <td>{job.billable_surface_area}</td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td>{job.total_cyl_qty}</td>
                                                                        </tr>
                                                                    ))
                                                                : null
                                                            }
                                                            <>
                                                                {
                                                                    grandTotals.length > 0 ? 
                                                                        grandTotals.map((grandTotal, key)=>(
                                                                                <tr>
                                                                                    <td align="right">Total</td>
                                                                                    <td>{jobs.length}</td>
                                                                                    <td>{grandTotal.new_qty}</td>
                                                                                    <td>{grandTotal.remake_qty}</td>
                                                                                    <td>{grandTotal.redo_qty}</td>
                                                                                    <td>{grandTotal.dc_rc_qty}</td>
                                                                                    <td>{grandTotal.total_cyl_qty}</td>
                                                                                    <td>100%</td>
                                                                                    <td>{grandTotal.total_surface_area}</td>
                                                                                    <td>{grandTotal.billable_cylinder}</td>
                                                                                    <td>{grandTotal.billable_surface_area}</td>
                                                                                    <td></td>
                                                                                    <td></td>
                                                                                    <td></td>
                                                                                    <td>{grandTotal.total_cyl_qty}</td>
                                                                                </tr>
                                                                            ))
                                                                    : null
                                                                }
                                                            </>
                                                        </tbody>
                                                    </table>
                                                    <div className="footerCalculation col-md-12">
                                                        <table>
                                                            {
                                                                grandTotals.length > 0 ? 
                                                                grandTotals.map((grandTotal, key)=>(
                                                                    <>
                                                                        <tr>
                                                                            <td>Billable Cylinder:  {grandTotal.billable_cylinder}</td>
                                                                            {
                                                                                monthlyTarget != null ?
                                                                                    <td>This Month's Target: {monthlyTarget.no_of_cylinder}</td>
                                                                                : null
                                                                            }
                                                                        </tr>
                                                                    
                                                                        <tr>
                                                                            <td>Total Work Load: {grandTotal.total_cyl_qty}</td>
                                                                            {
                                                                                monthlyTarget != null ?
                                                                                    <td>Target Balance: {grandTotal.billable_cylinder - monthlyTarget.no_of_cylinder}</td>
                                                                                    : null
                                                                            }
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Average Billiable Cylinder Per Day: {grandTotal.billable_cylinder / jobs.length}</td>
                                                                        </tr>
                                                                    </>
                                                                ))
                                                                : null
                                                        
                                                            }
                                                        
                                                        </table>
                                                    </div>
                                                </div>
                                                
                                            </Fragment>
                                        </>
                                        
                                        
                                        {/* //Factory Copy End */}
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