import React, { Fragment , useEffect, useState } from 'react';
import ReportHeader from './ReportHeader';
import {DAILY_DESIGN_FILE_TO_FACTORY_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [grandTotalCylinder, setGrandTotalCyl] = useState([]);
    const [grandTotalSurfaceArea, setGrandTotalSurfaceArea] = useState([]);
    const [calculateCyl, setCalculateCyl] = useState(0);

    const tableStyle = {
        "margin" : "2% 1% 2% 0%"
    }
    useEffect(()=>{
        const date = props.match.params.date;
        userGetMethod(`${DAILY_DESIGN_FILE_TO_FACTORY_REPORT}?date=${date}`)
        .then(response => {
            console.log('res', response.data);
            setJobs(response.data.jobs);
            setGrandTotalCyl(response.data.grandTotalCyl);
            setGrandTotalSurfaceArea(response.data.grandTotalSurfaceArea);
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
                            <ReportHeader reportTitle="Daily Design File to Factory Report" />

                            <div className="mainDiv" style={{"padding": "1% 5%"}}>
                            {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <div className="row">
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
                                                jobs.length > 0 ? 
                                                <>
                                                    {jobs.map((job, index1) => 
                                                        (
                                                            <>
                                                                <tr key={index1}>
                                                                    <td colSpan="10">{job.job_type}</td>
                                                                </tr>
                                                                { job.jobOrders.length > 0 ? 
                                                                    job.jobOrders.map((jobOrder, index2) => (
                                                                        <tr key={index2}>
                                                                            <td>{jobOrder.job_no}</td>
                                                                            <td>{jobOrder.agreement_date}</td>
                                                                            <td>{jobOrder.job_name}</td>
                                                                            <td>{jobOrder.client_name}</td>
                                                                            <td>{jobOrder.printer_name}</td>
                                                                            <td>{`${jobOrder.eye_mark_size_one} X ${jobOrder.eye_mark_size_two}`}</td>
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
                                                                        Total Number of Job: {job.jobOrders.length}
                                                                    </td>
                                                                    <td className="text-right">
                                                                        Total
                                                                    </td>
                                                                    <td className="text-center">
                                                                        {job.calculateTotalCyl}
                                                                    </td>
                                                                    <td></td>
                                                                    <td className="text-center">
                                                                        {job.calculateTotalSurfaceArea}
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