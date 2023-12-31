import React, { Fragment , useEffect, useState } from 'react';
import {JOB_ORDER_RSURL} from '../../../api/userUrl'
import { userGetMethod } from '../../../api/userAction';
//import './style.scss';

const Show = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [jobOrdersInfo, setJobOrdersInfo] = useState({});
    const [colorInfo, setColorInfo] = useState({});

    const tableStyle = {
        "margin" : "2% 1% 2% 0%"
    }
    useEffect(()=>{
        // const id = props.match.params.id;
        const id = props.showId;
        // console.log(id)
        userGetMethod(`${JOB_ORDER_RSURL}/${id}`)
        .then(response => {
            setColorInfo(response.data?.colors);
            setJobOrdersInfo(response.data?.jobOrder);
            // console.log(response.data.jobOrder)
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
                            {/* <ReportHeader reportTtile="Design File" /> */}

                            <div className="mainDiv" style={{"padding": "1% 5%"}}>
                            {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    jobOrdersInfo != null ? (
                                        <>
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
                                                    <td width="15%" style={{fontSize:"13px",fontWeight:'bold'}}>Job Height</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.design_height}</td>
                                                    <td width="15%" style={{fontSize:"13px",fontWeight:'bold'}}>Job Width</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.design_width}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%" style={{fontSize:"13px",fontWeight:'bold'}}>Repeat</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.rpt}</td>
                                                    <td width="15%" style={{fontSize:"13px",fontWeight:'bold'}}>Ups</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.ups}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%" style={{fontSize:"13px",fontWeight:'bold'}}>Printing Height</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.printing_height}</td>
                                                    <td width="15%" style={{fontSize:"13px",fontWeight:'bold'}}>Printing Width</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.printing_width}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%" style={{fontSize:"13px",fontWeight:'bold'}}>Circumference</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.circumference}</td>
                                                    <td width="15%" style={{fontSize:"13px",fontWeight:'bold'}}>Face Length</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.face_length}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%" style={{fontSize:"13px",fontWeight:'bold'}}>Eye Mark Size One</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.eye_mark_size_one}</td>
                                                    <td width="15%" style={{fontSize:"13px",fontWeight:'bold'}}>Eye Mark Size Two</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.eye_mark_size_two}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%" style={{fontSize:"13px",fontWeight:'bold'}}>Surface Area</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.surface_area}</td>
                                                    <td width="15%" style={{fontSize:"13px",fontWeight:'bold'}}>Number of Cylinder</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.total_cylinder_qty}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%" style={{fontSize:"13px",fontWeight:'bold'}}>Total Surface Area</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.total_surface_area}</td>
                                                    <td width="15%" style={{fontSize:"13px",fontWeight:'bold'}}>Printing Mark</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.printer_mark}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%" style={{fontSize:"13px",fontWeight:'bold'}}>Diameter</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.dia}</td>
                                                    <td width="15%" style={{fontSize:"13px",fontWeight:'bold'}}>Cone</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.cone}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%" style={{fontSize:"13px",fontWeight:'bold'}}>Extra Face Length</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.extra_face_length}</td>
                                                    <td width="15%" style={{fontSize:"13px",fontWeight:'bold'}}>Angle</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrdersInfo.angle}</td>
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
                                                    <td width="80%" colSpan="4">{colorInfo.map((name,index) => (index ? ', ' : '')+(name.color_name))}</td>
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

export default Show;