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
    const fromDate = props.match.params.fromDate;
    const toDate = props.match.params.toDate;
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
                                                            <th width="5%" align="center">Order</th>
                                                            <th width="6%" align="center">Job No</th>
                                                            <th width="8%" align="center">Job Name</th>
                                                            <th width="8%" align="center">Client Name</th>
                                                            <th width="6%" align="center">Printer Name</th>
                                                            <th width="10%" align="center">Base Supplier</th>
                                                            <th width="4%" align="center">New</th>
                                                            <th width="4%" align="center">Remake</th>
                                                            <th width="4%" align="center">Redo</th>
                                                            <th width="4%"align="center">DC/RC</th>
                                                            <th width="6%" align="center">FL</th>
                                                            <th width="6%" align="center">Circumference</th>
                                                            <th width="6%" align="center">Dia</th>
                                                            <th width="8%" align="center">Surface Area</th>
                                                            <th width="8%" align="center">Approved(A)</th>
                                                            <th width="8%" align="center">Challan No</th>
                                                            <th width="8%" align="center">Finished(B)</th>
                                                            <th width="10%" align="center">Duration(B-A)</th>   
                                                        </tr>    
                                                    </thead>
                                                    <tbody>
                                                        {employees.length > 0 ? 
                                                            employees.map((employee)=>(
                                                                employee.dailyProductions.length > 0 ?
                                                                    <>
                                                                        <tr>
                                                                            <th colSpan="18" >{employee.name}</th>
                                                                        </tr>
                                                
                                                                        {employee.dailyProductions.map((dailyProduction)=>( 
                                                                            <tr>
                                                                                <td>{dailyProduction.agreement_date}</td>
                                                                                <td>{dailyProduction.job_no}</td>
                                                                                <td>{dailyProduction.job_name}</td>
                                                                                <td>{dailyProduction.client_name}</td>
                                                                                <td>{dailyProduction.printer_name}</td>
                                                                                <td>Test Supllier</td>
                                                                                <td>{dailyProduction.new_qty}</td>
                                                                                <td>{dailyProduction.remake_qty}</td>
                                                                                <td>{dailyProduction.redo_qty}</td>
                                                                                <td>{dailyProduction.dc_rc_qty}</td>
                                                                                <td>{dailyProduction.face_length}</td>
                                                                                <td>{dailyProduction.circumference}</td>
                                                                                <td>{dailyProduction.dia}</td>
                                                                                <td>{dailyProduction.surface_area}</td> 
                                                                                <td>04/12/2022</td>
                                                                                <td>1479</td>
                                                                                <td>04/15/2022</td>
                                                                                <td>3</td>
                                                                            </tr>
                                                                        ))}
                                                                        {employee.total.map((data)=>(
                                                                            <tr>
                                                                                <th colspan="6">Total</th>
                                                                                <th>{data.new_qty}</th>
                                                                                <th>{data.remake_qty}</th>
                                                                                <th>{data.redo_qty}</th>
                                                                                <th>{data.dc_rc_qty}</th>
                                                                                <th colspan="3"></th>                                                                                 
                                                                                <th>{data.surface_area}</th>
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
                                                                        <th colspan="6" align="right">Grand Total</th>
                                                                        <th>{grandTotal.new_qty}</th>
                                                                        <th>{grandTotal.remake_qty}</th>
                                                                        <th>{grandTotal.redo_qty}</th>
                                                                        <th>{grandTotal.dc_rc_qty}</th>
                                                                        <th colspan="3"></th>
                                                                        <th>{grandTotal.total_surface_area}</th>
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
                                                                        <td>Billable Cylinder:  {grandTotal.billable_cylinder}</td>
                                                                    </tr>
                                                                
                                                                    <tr>
                                                                        <td>Total Work Load: {grandTotal.total_cyl_qty}</td>
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