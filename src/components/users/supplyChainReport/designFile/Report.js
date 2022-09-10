import React, { Fragment , useEffect, useState } from 'react';
import ReportHeader from './ReportHeader';
import {DESIGN_FILE_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [jobOrdersInfo, setJobOrdersInfo] = useState({});
    const [colorInfo, setColorInfo] = useState({});

    const tableStyle = {
        // "border" : "1px solid #ccc",
        "margin" : "2% 1% 2% 0%"
    }
    useEffect(()=>{
        const jobOrderId = props.match.params.jobOrderId;
        userGetMethod(`${DESIGN_FILE_REPORT}?jobOrderId=${jobOrderId}`) 
        .then(response => {
            console.log(response.data.colors);
            setJobOrdersInfo(response.data.jobOrderInfo);
            setColorInfo(response.data.colors);
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
                            <ReportHeader reportTtile="Design File" />

                            <div className="mainDiv" style={{"padding": "1% 5%"}}>
                            {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    jobOrdersInfo != null ? (
                                        <>
                                        <div>
                                            <h4>Marketing Person: {jobOrdersInfo.marketing_person}</h4>
                                            <h4 align="right">{jobOrdersInfo.job_type}</h4>

                                        </div>
                                        <div className="row">
                                        <h3>General Information</h3>
                                            <table className="particulars table-stripped groupFont" width="100%"  style={tableStyle}>
                                                <tr>
                                                    <td width="15%">Job No.</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobOrdersInfo.job_no}</td>
                                                    <td width="15%">Date of Agreement</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobOrdersInfo.agreement_date}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%">Name of Job</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" colSpan="4">{jobOrdersInfo.job_name}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%">Client Name</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" colSpan="4">{jobOrdersInfo.client_name}</td>
                                                </tr>
                                                {/* <tr>
                                                    <td width="15%">Address</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobOrdersInfo.client_address}</td>
                                                </tr> */}
                                                <tr>
                                                    <td width="15%">Name of Printer</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" colSpan="4">{jobOrdersInfo.printer_name}</td>
                                                </tr>
                                                
                                            </table>
                                            <h3>Design Information</h3>
                                            {/* <h6>Printing Area</h6> */}
                                            <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                <tr>
                                                    <td width="15%">Job Height</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobOrdersInfo.design_height}</td>
                                                    <td width="15%">Job Width</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobOrdersInfo.design_width}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%">Repeat</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobOrdersInfo.rpt}</td>
                                                    <td width="15%">Ups</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobOrdersInfo.ups}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%">Printing Height</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobOrdersInfo.printing_height}</td>
                                                    <td width="15%">Printing Width</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobOrdersInfo.printing_width}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%">Circumference</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobOrdersInfo.circumference}</td>
                                                    <td width="15%">Face Length</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobOrdersInfo.face_length}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%">Eye Mark Size One</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobOrdersInfo.eye_mark_size_one}</td>
                                                    <td width="15%">Eye Mark Size Two</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobOrdersInfo.eye_mark_size_two}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%">Surface Area</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobOrdersInfo.surface_area}</td>
                                                    <td width="15%">Number of Cylinder</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobOrdersInfo.total_cylinder_qty}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%">Total Surface Area</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobOrdersInfo.total_surface_area}</td>
                                                    <td width="15%">Printing Mark</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobOrdersInfo.printer_mark}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%">Diameter</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobOrdersInfo.dia}</td>
                                                    <td width="15%">Cone</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobOrdersInfo.cone}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%">Extra Face Length</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobOrdersInfo.extra_face_length}</td>
                                                    <td width="15%">Angle</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobOrdersInfo.angle}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="7">
                                                        <div className="cylImgDiv">
                                                            <img className="img-responsive cylImgTag" src={process.env.PUBLIC_URL+'/cylinder.bmp'} alt="Company Logo"/>
                                                            <div className="fl">FL</div>
                                                            <div className="flValue">{jobOrdersInfo.face_length} mm</div>
                                                            <div className="ups">Ups</div>
                                                            <div className="upsValue">{jobOrdersInfo.ups} Nos</div>
                                                            <div className="printArea">Printing Area</div>
                                                            <div className="printAreaValue">{jobOrdersInfo.printing_width} mm</div>
                                                            <div className="cirRpt">Cir <br /> RPT</div>
                                                            <div className="cirRptValue">{jobOrdersInfo.circumference} mm <br /> {jobOrdersInfo.rpt} Nos</div>
                                                            <div className="designHeight"> Design Height - <span style={{'padding': '2px', 'border': '1px solid black'}}>{jobOrdersInfo.printing_height}</span> mm </div>
                                                            <div className="designWidth"> Design Width - <span style={{'padding': '2px', 'border': '1px solid black'}}>{jobOrdersInfo.printing_height}</span> mm </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>

                                            <table className="particulars table-stripped groupFont" width="100%"  style={tableStyle}>
                                                <tr>
                                                    <td width="15%">Name of Color</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="80%" colSpan="4">
                                                    {colorInfo.map((name,index) => (index ? ', ' : '')+(name.color_name))}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%">Type of Printing</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobOrdersInfo.printing_status}</td>
                                                    <td width="15%">Design Location</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%"></td>
                                                </tr>
                                                <tr>
                                                    <td width="15%">Note</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="80%" colSpan="4">{jobOrdersInfo.remarks}</td>
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