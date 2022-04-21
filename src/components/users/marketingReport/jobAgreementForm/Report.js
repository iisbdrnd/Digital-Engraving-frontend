import React, { Fragment , useEffect, useState } from 'react';
import ReportHeader from './ReportHeader';
import {JOB_AGREEMENT_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [jobAgreementInfo, setJobAgreementInfo] = useState({});

    const tableStyle = {
        // "border" : "1px solid #ccc",
        "margin" : "2% 1% 2% 0%"
    }
    useEffect(()=>{
        const jobOrderId = props.match.params.jobOrderId;
        userGetMethod(`${JOB_AGREEMENT_REPORT}?jobOrderId=${jobOrderId}`) 
        .then(response => {
            setJobAgreementInfo(response.data.jobOrderInfo);
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
                            <ReportHeader reportTtile="Print Voucher Report" />

                            <div className="mainDiv" style={{"padding": "1% 5%"}}>
                            {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    jobAgreementInfo != null ? (
                                        <>
                                        <div className="row">
                                            <table className="particulars table-stripped groupFont" width="100%"  style={tableStyle}>
                                                <tr>
                                                    <td width="15%">Req./PO No.</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%"></td>
                                                    <td width="15%">Date of Agreement</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobAgreementInfo.agreement_date}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%">Job No.</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobAgreementInfo.job_no}</td>
                                                    <td width="15%">Client ID</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobAgreementInfo.client_id}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%">Name of Job</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" colSpan="4">{jobAgreementInfo.job_name}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%">Client Name</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" colSpan="4">{jobAgreementInfo.client_name}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%">Contact No.</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobAgreementInfo.client_mobile}</td>
                                                    <td width="15%">Address</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobAgreementInfo.client_address}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%">Name of Printer</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" colSpan="4">{jobAgreementInfo.printer_name}</td>
                                                </tr>
                                                
                                            </table>

                                            <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                <tr>
                                                    <td width="15%">Job Width</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobAgreementInfo.design_width}</td>
                                                    <td width="15%">Job Height</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobAgreementInfo.design_height}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%">Printing Width</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobAgreementInfo.printing_width}</td>
                                                    <td width="15%">Printing Height</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobAgreementInfo.printing_height}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%">Face Length</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobAgreementInfo.face_length}</td>
                                                    <td width="15%">Circumference</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobAgreementInfo.circumference}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%">Surface Area</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobAgreementInfo.surface_area}</td>
                                                    <td width="15%">Number of Cylinder</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobAgreementInfo.total_cylinder_qty}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%">Total Surface Area</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobAgreementInfo.total_surface_area}</td>
                                                    <td width="15%">Printing Mark</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobAgreementInfo.printer_mark}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%">Approved By</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" colSpan="4">{jobAgreementInfo.approver_name}</td>
                                                </tr>
                                            </table>

                                            <table className="particulars table-stripped groupFont" width="100%"  style={tableStyle}>
                                                <tr>
                                                    <td width="15%">Name of Color</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="80%" colSpan="4">{jobAgreementInfo.approver_name}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%">Type of Printing</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobAgreementInfo.printing_status}</td>
                                                    <td width="15%">Design Location</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%"></td>
                                                </tr>
                                                <tr>
                                                    <td width="15%">Note</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="80%" colSpan="4">{jobAgreementInfo.remarks}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%">Bill of Amount</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="80%" colSpan="4"></td>
                                                </tr>
                                                <tr>
                                                    <td width="15%">Out Standing Amount</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="80%" colSpan="4"></td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div className="row report-footer groupFont">
                                            <div className="col-md-4">
                                                <h5>Job order by</h5>
                                                <div className="put-signature"></div>
                                                <span className="footer-signature">Signature and Date</span> <br />
                                                <h5><span>for</span> Meghna Group of Industries Ltd</h5>
                                            </div>
                                            <div className="col-md-4">
                                                <h5>Job Measured by</h5>
                                                <div className="put-signature"></div>
                                                <span className="footer-signature">Signature and Date</span> <br />
                                                <h5><span>for</span> Meghna Group of Industries Ltd</h5>
                                            </div>
                                            <div className="col-md-4">
                                                <h5>Order Received by</h5>
                                                <div className="put-signature"></div>
                                                <span className="footer-signature">Signature and Date</span> <br />
                                                <h5><span>for</span> Meghna Group of Industries Ltd</h5>
                                            </div>
                                        </div>
                                        </>
                                    ):(
                                        <div className="text-center">
                                            No Data Found
                                        </div>
                                    )
                                    
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