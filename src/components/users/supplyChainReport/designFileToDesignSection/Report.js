/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment , useEffect, useState, useRef } from 'react';
import ReportHeader from './ReportHeader';
import {DESIGN_TO_DESIGN_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import styles from "./report.module.css";
import './style.scss';
import ReactToPrint from 'react-to-print';

const Report = ({fromDate, toDate}) => {
    const componentRef = useRef();
    const [isLoading, setIsLoading] = useState(true);
    const [orderTypes, setJorderTypes] = useState([]);
    const [grandTotalCylinder, setGrandTotalCyl] = useState([]);
    const [grandTotalSurfaceArea, setGrandTotalSurfaceArea] = useState([]);
    // const [calculateCyl, setCalculateCyl] = useState(0);

    const tableStyle = {
        // "border" : "1px solid #ccc",
        "margin" : "2% 1% 2% 0%"
    }
    useEffect(()=>{

        userGetMethod(`${DESIGN_TO_DESIGN_REPORT}?fromDate=${fromDate}&&toDate=${toDate}`)
        .then(response => {
            console.log('res', response.data);
            setJorderTypes(response.data.orderTypes);
            setGrandTotalCyl(response.data.grandTotalCyl);
            setGrandTotalSurfaceArea(response.data.grandTotalSurfaceArea);
            setIsLoading(false);
        })
        .catch(error => console.log(error))
    }, [fromDate]);

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className={styles.reportWrapper}> 
                            <div className="report-header">
                                <div className="print_button">
                                    <ReactToPrint
                                        trigger={() => {
                                            return <button className="btn btn-default"><i className="fa fa-print" aria-hidden="true"></i> Print</button>;
                                        }}
                                        content={() => componentRef.current}
                                        />
                                    {/* <button className="btn btn-default"><i className="fa fa-print" aria-hidden="true"></i> Print</button>&nbsp;
                                    <button className="btn btn-default"><i className="fa fa-file-pdf-o" aria-hidden="true"></i>Pdf</button> */}
                                </div>
                                {/* <div className="company-info">
                                    <img className="img-responsive" src={process.env.PUBLIC_URL+'/digitalLogo.png'} alt="Company Logo"/>
                                    <div className="company-name text-left">
                                        <h1>Digital Engravers Ltd</h1>
                                        <span className="company-moto">53 Purana Paltan (6th Floor)</span>
                                    </div>
                                </div>
                                <div className="report-for">
                                    <h2>Design File to Design</h2>
                                </div> */}
                            </div>
                            {/* <ReportHeader reportTitle="Design File to Design" /> */}

                            <div className="mainDiv" style={{"padding": "1% 5%"}}>
                            {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <div ref={componentRef} className="row">
                                        <div className="col-sm-12">
                                            <div className="company-info d-flex  justify-content-center align-items-center  my-4">
                                                <img className="img-responsive" src={process.env.PUBLIC_URL+'/digitalLogo.png'} alt="Company Logo"/>
                                                <div className="company-name text-left">
                                                    <h1>Digital Engravers Ltd</h1>
                                                    <span className="company-moto">53 Purana Paltan (6th Floor)</span>
                                                </div>
                                            </div>
                                            <div className="report-for mt-3 d-flex justify-content-center">
                                                <button className="btn btn-secondary">Design File to Design</button>
                                            </div>
                                        </div>
                                        <table className="particulars table table-bordered table-stripped" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                            <thead className="groupFont">
                                                <tr>
                                                    <th width="10%" align="center">JobNo</th>
                                                    <th width="15%" align="center">Agreement Date</th>
                                                    <th width="20%" align="center">Job Name</th>
                                                    <th width="10%" align="center">Client Name</th>
                                                    <th width="10%" align="center">Printers Name</th>
                                                    <th width="10%" align="center">Size(mm X mm)</th>
                                                    <th width="5%" align="center">No Cyl</th>
                                                    <th width="5%" align="center">Base Date</th>
                                                    <th width="10%" align="center">Surface Area</th>
                                                    <th width="10%" align="center">Remarks</th>
                                                </tr>
                                            </thead>
                                            <tbody className="reportBody">
                                            {
                                                orderTypes?.length > 0 ? 
                                                <>
                                                    {orderTypes.map((orderType, index1) => 
                                                        (
                                                            <>
                                                                <tr key={index1}>
                                                                    <td colSpan="10">{orderType.job_type}</td>
                                                                </tr>
                                                                { orderType.jobOrders.length > 0 ? 
                                                                    orderType.jobOrders.map((jobOrder, index2) => (
                                                                        <tr key={index2}>
                                                                            <td>{jobOrder.job_no}</td>
                                                                            <td>{jobOrder.agreement_date}</td>
                                                                            <td>{jobOrder.job_name}</td>
                                                                            <td>{jobOrder.client_name}</td>
                                                                            <td>{jobOrder.printer_name}</td>
                                                                            <td>{`${jobOrder.eye_mark_size_one} X ${jobOrder.eye_mark_size_one}`}</td>
                                                                            <td className="text-center">{jobOrder.total_cylinder_qty}</td>
                                                                            <td></td>
                                                                            <td className="text-center">{jobOrder.surface_area}</td>
                                                                            <td>{jobOrder.remarks}</td>
                                                                        </tr>
                                                                    ))
                                                                    : <tr><td colSpan="10" className="text-center">No data found</td></tr>
                                                                }
                                                                <tr className="groupFont">
                                                                    <td colSpan="5">
                                                                        Total Number of Job: {orderType.jobOrders.length}
                                                                    </td>
                                                                    <td className="text-right">
                                                                        Total
                                                                    </td>
                                                                    <td className="text-center">
                                                                        {orderType.calculateTotalCyl}
                                                                    </td>
                                                                    <td></td>
                                                                    <td className="text-center">
                                                                        {orderType.calculateTotalSurfaceArea}
                                                                    </td>
                                                                    <td colSpan="2"></td>
                                                                </tr>
                                                            </>
                                                        )
                                                    )}
                                                </>
                                                : <tr><td colSpan="10" className="text-center">No data found</td></tr>
                                            }
                                            </tbody>
                                        </table>
                                        <table className="particulars table table-bordered table-stripped" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                            <tr className="groupFont">
                                                <td>Grand Total Cylinder: {grandTotalCylinder}</td>
                                                <td>Grand Total Surface Area: {grandTotalSurfaceArea}</td>
                                            </tr>
                                        </table>
                                    </div>
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