import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader';
import {MONTHLY_JOB_FLOW_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import './style.scss';
import { fixedNumber } from '../../../common/GlobalComponent';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    
    const [monthlyTarget, setMonthlyTarget] = useState(0);
    const [result, setResult] = useState({
        newQty: 0,
        redoQty: 0,
        remakeQty: 0,
        dcRcQty: 0,
        totalSA: 0,
        billableSA: 0,
        billableCA: 0,
      });
    
    const tableStyle = {
        // "border" : "1px solid #ccc",
        "margin" : "2% 1% 2% 0%"
    }
    const month = props.match.params.month;
    const cylinder_type = props.match.params.cylinder_type;
    const year = props.match.params.year;
    let viewMonth;
    // February,March,April,May,June,July,August,September,October,November,December
    if (month == 1) {
        viewMonth = "January"
    }else if (month == 2) {
        viewMonth = "February"
    }else if (month == 3) {
        viewMonth = "March"
    }
    else if (month == 4) {
        viewMonth = "April"
    }
    else if (month == 5) {
        viewMonth = "May"
    }
    else if (month == 6) {
        viewMonth = "June"
    }
    else if (month == 7) {
        viewMonth = "July"
    }
    else if (month == 8) {
        viewMonth = "August"
    }
    else if (month == 9) {
        viewMonth = "September"
    }
    else if (month == 10) {
        viewMonth = "October"
    }
    else if (month == 11) {
        viewMonth = "November"
    }
    else if (month == 12) {
        viewMonth = "December"
    }





    useEffect(()=>{
        // console.log({report_type, cylinder_type, year});
        userGetMethod(`${MONTHLY_JOB_FLOW_REPORT}?month=${month}&&year=${year}&&cylinder_type=${cylinder_type}`) 
        .then(response => {
            console.log('response', response.data.monthly_target);
            setJobs(response.data.jobs);
            // setGrandTotals(response.data.grand_totals);
            setMonthlyTarget(response.data.monthly_target);
            setIsLoading(false);
        })
        .catch(error => console.log(error))
    }, []);
    const handleTotalData = (new_qty, remake_qty, redu_qty, total_cylinders, total_surface_area, billable_total_surface_area, total_billable_cyl) => {
    }
    const totalValue = jobs.reduce((acc,current)=> acc + parseInt(current.total_cyl_qty),0)
    // useEffect(()=>{
    //     result
    // },[jobs])
    //     const result = jobs.reduce((acc,current)=>{
    //         const newQyt = acc + current.new_qty;
    //         const redoQyt = acc + current.redo_qty;
    //         const remakeQyt = acc + current.remake_qty;
    //         const dc_rc_qty = acc + current.dc_rc_qty;
    //         const totalSA = acc + current.total_surface_area;
    //         const billableSA = acc + current.billable_surface_area;
    //         const billableCA = acc + current.billable_cylinder;
    //         return {newQyt,redoQyt,remakeQyt,dc_rc_qty,totalSA,billableSA,billableCA}
    //     },0)
        
    //     console.log(result)

    useEffect(() => {
        const calculatedResult = jobs.reduce((acc, current) => {
          return {
            newQty: acc.newQty + parseInt(current.new_qty),
            redoQty: acc.redoQty + parseInt(current.redo_qty),
            remakeQty: acc.remakeQty + parseInt(current.remake_qty),
            dcRcQty: acc.dcRcQty + parseInt(current.dc_rc_qty),
            totalSA: acc.totalSA + parseInt(current.total_surface_area),
            billableSA: acc.billableSA + parseInt(current.billable_surface_area),
            billableCA: acc.billableCA + parseInt(current.billable_cylinder),
          };
        }, {
          newQty: 0,
          redoQty: 0,
          remakeQty: 0,
          dcRcQty: 0,
          totalSA: 0,
          billableSA: 0,
          billableCA: 0,
        });
    
        setResult(calculatedResult);
      }, [jobs]);

      
    
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
                                                <h5 style={{fontWeight: "bold"}}>{`Monthly Job Flow in ${viewMonth}`}</h5>
                                            </div>
                                            <Fragment>
                                                <div className="row">
                                                    <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                        <thead>
                                                    
                                                            <tr style={{backgroundColor:"#bab6b6"}}>
                                                                <th width="10%" align="center" style={{fontSize:"15px",fontWeight:'bold'}}>Date</th>
                                                                <th width="5%" align="center" style={{fontSize:"15px",fontWeight:'bold'}}>Day</th>
                                                                <th width="5%" align="center" style={{fontSize:"15px",fontWeight:'bold'}}>New</th>
                                                                <th width="5%" align="center" style={{fontSize:"15px",fontWeight:'bold'}}>Remake</th>
                                                                <th width="5%" align="center" style={{fontSize:"15px",fontWeight:'bold'}}>Redo</th>
                                                                <th width="5%"align="center" style={{fontSize:"15px",fontWeight:'bold'}}>DC/RC</th>
                                                                <th width="10%" align="center" style={{fontSize:"15px",fontWeight:'bold'}}>Total Cyl</th>
                                                                <th width="10%" align="center" style={{fontSize:"15px",fontWeight:'bold'}}>% of Total</th>
                                                                <th width="10%" align="center" style={{fontSize:"15px",fontWeight:'bold'}}>Total S.A</th>
                                                                <th width="10%" align="center" style={{fontSize:"15px",fontWeight:'bold'}}>Billable Cyl</th>
                                                                <th width="10%" align="center" style={{fontSize:"15px",fontWeight:'bold'}}>Billable S.A</th>
                                                                <th width="5%" align="center" style={{fontSize:"15px",fontWeight:'bold'}}>Return</th>
                                                                <th width="10%" align="center" style={{fontSize:"15px",fontWeight:'bold'}}>Base To Stock</th>
                                                                <th width="10%" align="center" style={{fontSize:"15px",fontWeight:'bold'}}>Cancel Cyl</th>
                                                                <th width="10%" align="center" style={{fontSize:"15px",fontWeight:'bold'}}>Total Order</th>
                                                            </tr>
                                                            
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                jobs.length > 0 ? 
                                                                    jobs.map((job, key)=>(    
                                                                        <tr key={key++}>
                                                                            <td style={{fontSize:"14px",fontWeight:'bold'}}>{job.agreement_date}</td>
                                                                            <td style={{fontSize:"14px",fontWeight:'bold'}}>{job.agreement_day}</td>
                                                                            <td style={{fontSize:"14px",fontWeight:'bold'}}>{job.new_qty}</td>
                                                                            <td style={{fontSize:"14px",fontWeight:'bold'}}>{job.remake_qty}</td>
                                                                            <td style={{fontSize:"14px",fontWeight:'bold'}}>{job.redo_qty}</td>
                                                                            <td style={{fontSize:"14px",fontWeight:'bold'}}>{job.dc_rc_qty}</td>
                                                                            <td style={{fontSize:"14px",fontWeight:'bold'}}>{job.total_cyl_qty}</td>

                                                                            <td style={{fontSize:"14px",fontWeight:'bold'}}>{Math.round((job.total_cyl_qty * 100) / totalValue)}%</td>



                                                                            <td style={{fontSize:"14px",fontWeight:'bold'}}>{fixedNumber(job.total_surface_area)}</td>
                                                                            <td style={{fontSize:"14px",fontWeight:'bold'}}>{job.billable_cylinder}</td>
                                                                            <td style={{fontSize:"14px",fontWeight:'bold'}}>{fixedNumber(job.billable_surface_area)}</td>
                                                                            <td style={{fontSize:"14px",fontWeight:'bold'}}></td>
                                                                            <td style={{fontSize:"14px",fontWeight:'bold'}}></td>
                                                                            <td style={{fontSize:"14px",fontWeight:'bold'}}></td>
                                                                            <td style={{fontSize:"14px",fontWeight:'bold'}}>{job.total_cyl_qty}</td>
                                                                        </tr>
                                                                    ))
                                                                : null
                                                            }
                                                            <>
                                                                
                                                                <tr>
                                                                    <td align="right" style={{fontSize:"16px",fontWeight:'bold'}}>Total</td>
                                                                    <td style={{fontSize:"15px",fontWeight:'bold'}}></td>
                                                                    <td style={{fontSize:"15px",fontWeight:'bold'}}>{result.newQty}</td>
                                                                    <td style={{fontSize:"15px",fontWeight:'bold'}}>{result.remakeQty}</td>
                                                                    <td style={{fontSize:"15px",fontWeight:'bold'}}>{result.redoQty}</td>
                                                                    <td style={{fontSize:"15px",fontWeight:'bold'}}>{result.dcRcQty}</td>
                                                                    <td style={{fontSize:"15px",fontWeight:'bold'}}>{totalValue}</td>
                                                                    <td style={{fontSize:"15px",fontWeight:'bold'}}>100%</td>

                                                                    {/* <td style={{fontSize:"13px",fontWeight:'bold'}}>{fixedNumber(grandTotal.total_surface_area)}</td> */}


                                                                    <td style={{fontSize:"15px",fontWeight:'bold'}}>{result.totalSA}</td>

                                                                    <td style={{fontSize:"15px",fontWeight:'bold'}}>{result.billableCA}</td>

                                                                    <td style={{fontSize:"15px",fontWeight:'bold'}}>{result.billableSA}</td>

                                                                    <td style={{fontSize:"15px",fontWeight:'bold'}}></td>
                                                                    <td style={{fontSize:"15px",fontWeight:'bold'}}></td>
                                                                    <td style={{fontSize:"15px",fontWeight:'bold'}}></td>
                                                                    <td style={{fontSize:"15px",fontWeight:'bold'}}>{totalValue}</td>
                                                                </tr>
                                                           
                                            </>
                                                            {/* <>
                                                                {
                                                                    grandTotals.length > 0 ? 
                                                                        grandTotals.map((grandTotal, key)=>(
                                                                                <tr>
                                                                                    <td align="right" style={{fontSize:"14px",fontWeight:'bold'}}>Total</td>
                                                                                    <td style={{fontSize:"13px",fontWeight:'bold'}}>{jobs.length}</td>
                                                                                    <td style={{fontSize:"13px",fontWeight:'bold'}}>{grandTotal.new_qty}</td>
                                                                                    <td style={{fontSize:"13px",fontWeight:'bold'}}>{grandTotal.remake_qty}</td>
                                                                                    <td style={{fontSize:"13px",fontWeight:'bold'}}>{grandTotal.redo_qty}</td>
                                                                                    <td style={{fontSize:"13px",fontWeight:'bold'}}>{grandTotal.dc_rc_qty}</td>
                                                                                    <td style={{fontSize:"13px",fontWeight:'bold'}}>{grandTotal.total_cyl_qty}</td>
                                                                                    <td style={{fontSize:"13px",fontWeight:'bold'}}>100%</td>
                                                                                    <td style={{fontSize:"13px",fontWeight:'bold'}}>{fixedNumber(grandTotal.total_surface_area)}</td>
                                                                                    <td style={{fontSize:"13px",fontWeight:'bold'}}>{grandTotal.billable_cylinder}</td>
                                                                                    <td style={{fontSize:"13px",fontWeight:'bold'}}>{fixedNumber(grandTotal.billable_surface_area)}</td>
                                                                                    <td style={{fontSize:"13px",fontWeight:'bold'}}></td>
                                                                                    <td style={{fontSize:"13px",fontWeight:'bold'}}></td>
                                                                                    <td style={{fontSize:"13px",fontWeight:'bold'}}></td>
                                                                                    <td style={{fontSize:"13px",fontWeight:'bold'}}>{grandTotal.total_cyl_qty}</td>
                                                                                </tr>
                                                                            ))
                                                                    : null
                                                                }
                                                            </> */}
                                                        </tbody>
                                                    </table>
                                                            

                                                    <div className="footerCalculation col-md-12 mt-3">
                                                        <table className="mt-3">
                                                            
                                                                    <>
                                                                        <tr>
                                                                            <td style={{fontSize:"15px",fontWeight:'bold'}}>Billable Cylinder:  <span style={{fontSize:"16px",fontWeight:'bold'}}><i>{result.billableCA}</i></span></td>
                                                                            
                                                                                    <td style={{fontSize:"15px",fontWeight:'bold'}}>This Month's Target: <span style={{fontSize:"16px",fontWeight:'bold'}}>
                                                                                    <i>{monthlyTarget ? monthlyTarget: 0}</i>
                                                                                    </span>
                                                                                    </td>
                                                                              
                                                                            
                                                                        </tr>
                                                                    
                                                                        <tr>
                                                                            <td style={{fontSize:"15px",fontWeight:'bold'}}>Total Work Load: <span style={{fontSize:"16px",fontWeight:'bold'}}><i>{totalValue}</i></span></td>
                                                                            
                                                                           
                                                                                    <td style={{fontSize:"15px",fontWeight:'bold'}}>Target Balance: 
                                                                                    <span style={{fontSize: "16px", fontWeight: 'bold'}}>
                                                                                    <i> {monthlyTarget - totalValue}</i>
                                                                                        </span> </td>
                                                                                    
                                                                            
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{fontSize:"15px",fontWeight:'bold'}}>Average Billiable Cylinder Per Day: <span style={{fontSize: "16px", fontWeight:'bold'}}><i>{fixedNumber(result.billableCA / jobs.length)}</i></span></td>
                                                                            
                                                                        </tr>
                                                                    </>
                                                            
                                                        
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