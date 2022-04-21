import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader';
import {YEARLY_JOB_FLOW_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [grandTotals, setGrandTotals] = useState([]);
    const [yearlyTarget, setYearlyTarget] = useState([]);
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
    const report_type = props.match.params.report_type;
    const cylinder_type = props.match.params.cylinder_type;
    const year = props.match.params.year;
    useEffect(()=>{
        // console.log({report_type, cylinder_type, year});
        userGetMethod(`${YEARLY_JOB_FLOW_REPORT}?report_type=${report_type}&&cylinder_type=${cylinder_type}&&year=${year}`) 
        .then(response => {
            console.log('response', response.data);
            setJobs(response.data.jobs);
            setGrandTotals(response.data.grand_totals);
            setYearlyTarget(response.data.yearly_target);
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
                                                <h5>{report_type == 'weekly' ? 'Weekly Job Flow' : 'Yearly Job Flow'}</h5>
                                            </div>
                                            <Fragment>
                                                <div className="row">
                                                    <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                        <thead>
                                                            {report_type == 'weekly' ? (
                                                                <tr>
                                                                    <th width="10%">Week</th>
                                                                    <th width="5%" align="center">New</th>
                                                                    <th width="10%">Remake</th>
                                                                    <th width="5%">Redo</th>
                                                                    <th width="5%">DC/RC</th>
                                                                    <th width="10%" align="center">Total Cyl</th>
                                                                    <th width="10%" align="center">% of Total</th>
                                                                    <th width="10%" align="center">Total S.A</th>
                                                                    <th width="10%" align="center">Billable Cyl</th>
                                                                    <th width="10%" align="center">Billable S.A</th>
                                                                    <th width="5%">Return</th>
                                                                    <th width="10%" align="center">Base Stock</th>
                                                                    <th width="10%" align="center">Cancel Cyl</th>
                                                                </tr>
                                                            ) : (
                                                                <tr>
                                                                    <th width="5%">Month</th>
                                                                    <th width="5%" align="center">New</th>
                                                                    <th width="5%">Remake</th>
                                                                    <th width="5%">Redo</th>
                                                                    <th width="5%">DC/RC</th>
                                                                    <th width="10%" align="center">Total Cyl</th>
                                                                    <th width="10%" align="center">% of Total</th>
                                                                    <th width="10%" align="center">Total S.A</th>
                                                                    <th width="10%" align="center">Billable Cyl</th>
                                                                    <th width="10%" align="center">Billable S.A</th>
                                                                    <th width="5%">Return</th>
                                                                    <th width="10%" align="center">Base Stock</th>
                                                                    <th width="10%" align="center">Cancel Cyl</th>
                                                                </tr>
                                                            )}
                                                            
                                                        </thead>
                                                        <tbody>
                                                            {report_type == 'weekly' ? 
                                                                jobs.length > 0 ? 
                                                                    jobs.map((job, key)=>(    
                                                                        <tr key={key}>
                                                                            <td>Week {job.agreement_week_sl}</td>
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
                                                                        </tr>
                                                                    ))
                                                                : null
                                                            :(
                                                                
                                                                jobs.length > 0 ? 
                                                                    jobs.map((job, key)=>(    
                                                                            <tr key={key}>
                                                                                {handleTotalData(job.new_qty, job.remake_qty, job.redu_qty, job.total_cylinders, job.total_surface_area, job.billable_total_surface_area, job.total_billable_cyl)}
                                                                                <td>{job.agreement_month}</td>
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
                                                                            </tr>
                                                                    ))
                                                                : null
                                                            )}
                                                            <>
                                                                {
                                                                    grandTotals.length > 0 ? 
                                                                        grandTotals.map((grandTotal, key)=>(
                                                                                <tr>
                                                                                    <td align="right">Total</td>
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
                                                                                </tr>
                                                                            ))
                                                                    : null
                                                                }
                                                            </>
                                                            
                                                        </tbody>
                                                    </table>
                                                    <div className="footerCalculation col-md-8">
                                                    <table>
                                                        
                                                        {
                                                            grandTotals.length > 0 ? 
                                                            grandTotals.map((grandTotal, key)=>(
                                                                <>
                                                                    <tr>
                                                                        <td>Billable Cylinder:  {grandTotal.billable_cylinder}</td>
                                                                        {
                                                                            yearlyTarget != null ?
                                                                                <td>This Year's Target: {yearlyTarget.no_of_cylinder}</td>
                                                                            : null
                                                                        }
                                                                    </tr>
                                                                
                                                                    <tr>
                                                                        <td>Total Work Load: {grandTotal.total_cyl_qty}</td>
                                                                        {
                                                                            yearlyTarget != null ?
                                                                                <td>Target Balance: {grandTotal.billable_cylinder - yearlyTarget.no_of_cylinder}</td>
                                                                                : null
                                                                        }
                                                                    </tr>
                                                                    <tr> 
                                                                        {
                                                                            report_type == 'weekly' ?
                                                                                <td>Average Billiable Cylinder Per Week: {grandTotal.billable_cylinder / jobs.length}</td>
                                                                            :
                                                                            <td>Average Billiable Cylinder Per Month: {grandTotal.billable_cylinder / jobs.length}</td>

                                                                        }
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