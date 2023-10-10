import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader';
import {PRODUCTION_REPORT_DETAILS_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [dailyProductions, setDailyProductions] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [grandTotals, setGrandTotals] = useState([]);
    
    const tableStyle = {
        "margin" : "2% 1% 2% 0%"
    }
    const bodySize = {fontSize:'12px', fontWeight:'bold'}
    const HeaderSize = {fontSize:'15px', fontWeight:'bold'}
    const fromDate = props.match.params.fromDate;
    const toDate = props.match.params.toDate;
    const oneDay = 24 * 60 * 60 * 1000;
    useEffect(()=>{
        userGetMethod(`${PRODUCTION_REPORT_DETAILS_REPORT}?fromDate=${fromDate}&&toDate=${toDate}`) 
        .then(response => {
            console.log('response', response.data);
            setDailyProductions(response.data.dailyProductions);
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
                                            <h5>{'Production Report Details - '+fromDate+' to '+toDate}</h5>
                                        </div>
                                        <Fragment>
                                            <div className="row">
                                                <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                    <thead>    
                                                        <tr>
                                                            <th width="5%" align="center" style={HeaderSize}>Order</th>
                                                            <th width="6%" align="center" style={HeaderSize}>Job No</th>
                                                            <th width="8%" align="center" style={HeaderSize}>Job Name</th>
                                                            <th width="8%" align="center" style={HeaderSize}>Client Name</th>
                                                            <th width="6%" align="center" style={HeaderSize}>Printer Name</th>
                                                            <th width="10%" align="center" style={HeaderSize}>Base Supplier</th>
                                                            <th width="4%" align="center" style={HeaderSize}>New</th>
                                                            <th width="4%" align="center" style={HeaderSize}>Remake</th>
                                                            <th width="4%" align="center" style={HeaderSize}>Redo</th>
                                                            <th width="4%"align="center" style={HeaderSize}>DC/RC</th>
                                                            <th width="6%" align="center" style={HeaderSize}>FL</th>
                                                            <th width="6%" align="center" style={HeaderSize}>Circumference</th>
                                                            <th width="6%" align="center" style={HeaderSize}>Dia</th>
                                                            <th width="8%" align="center" style={HeaderSize}>Surface Area</th>
                                                            <th width="8%" align="center" style={HeaderSize}>Approved(A)</th>
                                                            <th width="8%" align="center" style={HeaderSize}>Challan No</th>
                                                            <th width="8%" align="center" style={HeaderSize}>Finished(B)</th>
                                                            <th width="10%" align="center" style={HeaderSize}>Duration(B-A)</th>   
                                                        </tr>    
                                                    </thead>
                                                    <tbody>
                                                        {employees.length > 0 ? 
                                                            employees.map((employee)=>(
                                                                employee.dailyProductions.length > 0 ?
                                                                    <>
                                                                        <tr>
                                                                            <th colSpan="18" style={HeaderSize}>{employee.name}</th>
                                                                        </tr>
                                                
                                                                        {employee.dailyProductions.map((dailyProduction)=>( 
                                                                            <tr>
                                                                                <td style={bodySize}>{dailyProduction.agreement_date}</td>
                                                                                <td style={bodySize}>{dailyProduction.job_no}</td>
                                                                                <td style={bodySize}>{dailyProduction.job_name}</td>
                                                                                <td style={bodySize}>{dailyProduction.client_name}</td>
                                                                                <td style={bodySize}>{dailyProduction.printer_name}</td>
                                                                                <td style={bodySize}>Test Supllier</td>
                                                                                <td style={bodySize}>{dailyProduction.new_qty}</td>
                                                                                <td style={bodySize}>{dailyProduction.remake_qty}</td>
                                                                                <td style={bodySize}>{dailyProduction.redo_qty}</td>
                                                                                <td style={bodySize}>{dailyProduction.dc_rc_qty}</td>
                                                                                <td style={bodySize}>{dailyProduction.face_length}</td>
                                                                                <td style={bodySize}>{dailyProduction.circumference}</td>
                                                                                <td style={bodySize}>{dailyProduction.dia}</td>
                                                                                <td style={bodySize}>{dailyProduction.surface_area}</td> 
                                                                                <td style={bodySize}>{dailyProduction.approved_date}</td> 
                                                                                <td style={bodySize}>{dailyProduction.challan_no}</td> 
                                                                                <td style={bodySize}>{dailyProduction.finished_date}</td>
                                                                                <td style={bodySize}>{dailyProduction.finished_date != null ? Math.round(Math.abs((new Date(dailyProduction.approved_date) - new Date(dailyProduction.finished_date)) / oneDay)):'N/A'}</td>
                                                                                <td style={bodySize}></td>
                                                                            </tr>
                                                                        ))}
                                                                        {employee.total.map((data)=>(
                                                                            <tr>
                                                                                <th colspan="6" style={HeaderSize}>Total</th>
                                                                                <th style={HeaderSize}>{data.new_qty}</th>
                                                                                <th style={HeaderSize}>{data.remake_qty}</th>
                                                                                <th style={HeaderSize}>{data.redo_qty}</th>
                                                                                <th style={HeaderSize}>{data.dc_rc_qty}</th>
                                                                                <th colspan="3"></th>                                                                                 
                                                                                <th style={HeaderSize}>{data.surface_area}</th>
                                                                                <th colspan="4"></th>   
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
                                                                        <th colspan="6" align="right" style={HeaderSize}>Grand Total</th>
                                                                        <th style={HeaderSize}>{grandTotal.new_qty}</th>
                                                                        <th style={HeaderSize}>{grandTotal.remake_qty}</th>
                                                                        <th style={HeaderSize}>{grandTotal.redo_qty}</th>
                                                                        <th style={HeaderSize}>{grandTotal.dc_rc_qty}</th>
                                                                        <th colspan="3"></th>
                                                                        <th style={HeaderSize}>{grandTotal.total_surface_area}</th>
                                                                        <th colspan="4"></th>
                                                                    </tr>
                                                                ))
                                                            : null
                                                            }
                                                        </> 
                                                    </tbody>
                                                </table>
                                                <div className="footerCalculation col-md-12">
                                                    <table>
                                                        {grandTotals.length > 0 ? 
                                                            grandTotals.map((grandTotal, key)=>(
                                                                <>
                                                                    <tr>
                                                                        <td style={HeaderSize}>Billable Cylinder:  {grandTotal.billable_cylinder}</td>
                                                                    </tr>
                                                                
                                                                    <tr>
                                                                        <td style={HeaderSize}>Total Work Load: {grandTotal.total_cyl_qty}</td>
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