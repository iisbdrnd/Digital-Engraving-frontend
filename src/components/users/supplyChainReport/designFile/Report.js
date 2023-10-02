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
                                            <h4 style={{fontSize:"13px",fontWeight:'bold'}}>Marketing Person: {jobOrdersInfo.marketing_person}</h4>
                                            <h4 align="right" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.job_type}</h4>

                                        </div>
                                        <div className="row">
                                        <h3>General Information</h3>
                                            <table className="particulars table-stripped groupFont" width="100%"  style={tableStyle}>
                                                <tr>
                                                    <td width="15%" style={{fontSize:"14px",fontWeight:'bold'}}>Job No.</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.job_no}</td>
                                                    <td width="15%" style={{fontSize:"14px",fontWeight:'bold'}}>Date of Agreement</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.agreement_date}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%" style={{fontSize:"14px",fontWeight:'bold'}}>Name of Job</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" colSpan="4" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.job_name}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%" style={{fontSize:"14px",fontWeight:'bold'}}>Client Name</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" colSpan="4" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.client_name}</td>
                                                </tr>
                                                {/* <tr>
                                                    <td width="15%">Address</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobOrdersInfo.client_address}</td>
                                                </tr> */}
                                                <tr>
                                                    <td width="15%" style={{fontSize:"14px",fontWeight:'bold'}}>Name of Printer</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" colSpan="4" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.printer_name}</td>
                                                </tr>
                                                
                                            </table>
                                            <h3>Design Information</h3>
                                            {/* <h6>Printing Area</h6> */}
                                            <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                <tr>
                                                    <td width="15%" style={{fontSize:"14px",fontWeight:'bold'}}>Job Height</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.design_height}</td>
                                                    <td width="15%" style={{fontSize:"14px",fontWeight:'bold'}}>Job Width</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.design_width}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%" style={{fontSize:"14px",fontWeight:'bold'}}>Repeat</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.rpt}</td>
                                                    <td width="15%" style={{fontSize:"14px",fontWeight:'bold'}}>Ups</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.ups}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%" style={{fontSize:"14px",fontWeight:'bold'}}>Printing Height</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.printing_height}</td>
                                                    <td width="15%" style={{fontSize:"14px",fontWeight:'bold'}}>Printing Width</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.printing_width}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%" style={{fontSize:"14px",fontWeight:'bold'}}>Circumference</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.circumference}</td>
                                                    <td width="15%" style={{fontSize:"14px",fontWeight:'bold'}}>Face Length</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.face_length}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%" style={{fontSize:"14px",fontWeight:'bold'}}>Eye Mark Size One</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.eye_mark_size_one}</td>
                                                    <td width="15%" style={{fontSize:"14px",fontWeight:'bold'}}>Eye Mark Size Two</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.eye_mark_size_two}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%" style={{fontSize:"14px",fontWeight:'bold'}}>Surface Area</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.surface_area}</td>
                                                    <td width="15%" style={{fontSize:"14px",fontWeight:'bold'}}>Number of Cylinder</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.total_cylinder_qty}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%" style={{fontSize:"14px",fontWeight:'bold'}}>Total Surface Area</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.total_surface_area}</td>
                                                    <td width="15%" style={{fontSize:"14px",fontWeight:'bold'}}>Printing Mark</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.printer_mark}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%" style={{fontSize:"14px",fontWeight:'bold'}}>Diameter</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.dia}</td>
                                                    <td width="15%" style={{fontSize:"14px",fontWeight:'bold'}}>Cone</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.cone}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%" style={{fontSize:"14px",fontWeight:'bold'}}>Extra Face Length</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.extra_face_length}</td>
                                                    <td width="15%" style={{fontSize:"14px",fontWeight:'bold'}}>Angle</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.angle}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="7">
                                                        <div className="cylImgDiv">
                                                            <img className="img-responsive cylImgTag" src={process.env.PUBLIC_URL+'/cylinder.bmp'} alt="Company Logo"/>
                                                            <div className="fl" style={{fontSize:"14px",fontWeight:'bold'}}>FL</div>
                                                            <div className="flValue" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.face_length} mm</div>
                                                            <div className="ups" style={{fontSize:"14px",fontWeight:'bold'}}>Ups</div>
                                                            <div className="upsValue" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.ups} Nos</div>
                                                            <div className="printArea" style={{fontSize:"14px",fontWeight:'bold'}}>Printing Area</div>
                                                            <div className="printAreaValue" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.printing_width} mm</div>
                                                            <div className="cirRpt" style={{fontSize:"14px",fontWeight:'bold'}}>Cir <br /> RPT</div>
                                                            <div className="cirRptValue" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.circumference} mm <br /> {jobOrdersInfo.rpt} Nos</div>
                                                            <div className="designHeight" style={{fontSize:"14px",fontWeight:'bold'}}> Design Height - <span style={{'padding': '2px', 'border': '1px solid black'}}>{jobOrdersInfo.printing_height}</span> mm </div>
                                                            <div className="designWidth" style={{fontSize:"14px",fontWeight:'bold'}}> Design Width - <span style={{'padding': '2px', 'border': '1px solid black'}}>{jobOrdersInfo.printing_height}</span> mm </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>

                                            <table className="particulars table-stripped groupFont" width="100%"  style={tableStyle}>
                                                <tr>
                                                    <td width="15%" style={{fontSize:"14px",fontWeight:'bold'}}>Name of Color</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="80%" colSpan="4" style={{fontSize:"13px",fontWeight:'bold'}}>
                                                    {colorInfo.map((name,index) => (index ? ', ' : '')+(name.color_name))}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%" style={{fontSize:"14px",fontWeight:'bold'}}>Type of Printing</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.printing_status}</td>
                                                    <td width="15%" style={{fontSize:"14px",fontWeight:'bold'}}>Design Location</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%"></td>
                                                </tr>
                                                <tr>
                                                    <td width="15%" style={{fontSize:"14px",fontWeight:'bold'}}>Note</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="80%" colSpan="4" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.remarks}</td>
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