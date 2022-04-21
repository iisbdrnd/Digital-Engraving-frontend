import React, { Fragment , useEffect, useState } from 'react';
import ReportHeader from './ReportHeader';
import {BASE_CYLINDER_ORDER_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import cylinderImage from '../../../../assets/images/cylinder.bmp';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [jobOrderInfo, setJobOrderInfo] = useState([]);

    const tableStyle = {
        // "border" : "1px solid #ccc",
        "margin" : "2% 1% 2% 0%"
    }
    useEffect(()=>{
        const jobOrderId = props.match.params.jobOrderId;
        userGetMethod(`${BASE_CYLINDER_ORDER_REPORT}?jobOrderId=${jobOrderId}`) 
        .then(response => {
            console.log('response', response.data);
            setJobOrderInfo(response.data.jobOrderInfo);
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
                                        {jobOrderInfo.length > 0 ? (
                                            <>
                                            <div className="text-center">
                                                <h5>Base Cylinder Order</h5>
                                            </div>
                                            {jobOrderInfo.map((job, key)=>(
                                                <Fragment key={key}>
                                                    <div className="row">
                                                        <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                            <thead>
                                                                <tr>
                                                                    <th width="15%">Job No</th>
                                                                    <th width="30%" align="center">Issue To</th>
                                                                    <th width="15%">Order Date</th>
                                                                    <th width="10%">BCO</th>
                                                                    <th width="30%" align="center">Delevery Date</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>{job.job_no}</td>
                                                                    <td>{job.supplier_name}</td>
                                                                    <td>{job.base_order_date}</td>
                                                                    <td></td>
                                                                    <td>{job.base_receive_date}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                        <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                            <thead>
                                                                <tr>
                                                                    <th className="text-center" colSpan="7"><span style={{'fontSize': '14px'}}>Particulars</span></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td width="10%">Face Length</td>
                                                                    <td width="1%" align="center">:</td>
                                                                    <td width="14%">{job.face_length} mm</td>

                                                                    <td width="20%" align="center"></td>

                                                                    <td width="10%">Job Name</td>
                                                                    <td width="1%" align="center">:</td>
                                                                    <td width="14%" >{job.job_name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="10%">Cir</td>
                                                                    <td width="1%" align="center">:</td>
                                                                    <td width="14%">{job.cir} mm</td>

                                                                    <td width="20%" align="center"></td>

                                                                    <td width="10%">Client Name</td>
                                                                    <td width="1%" align="center">:</td>
                                                                    <td width="14%" >{job.client_name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="10%">Dia</td>
                                                                    <td width="1%" align="center">:</td>
                                                                    <td width="14%">{job.dia} mm</td>

                                                                    <td width="20%" align="center"></td>

                                                                    <td width="10%">Printers Name</td>
                                                                    <td width="1%" align="center">:</td>
                                                                    <td width="14%" >{job.printer_name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="10%">Qty</td>
                                                                    <td width="1%" align="center">:</td>
                                                                    <td width="14%">{job.base_order_cyl_qty}</td>

                                                                    <td width="20%" align="center"></td>

                                                                    <td width="10%">Type Of Printing</td>
                                                                    <td width="1%" align="center">:</td>
                                                                    <td width="14%" >Surface</td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="7">
                                                                        <div className="cylImgDiv">
                                                                            <img className="img-responsive cylImgTag" src={process.env.PUBLIC_URL+'/cylinder.bmp'} alt="Company Logo"/>
                                                                            <div className="fl">FL</div>
                                                                            <div className="flValue">{job.face_length} mm</div>
                                                                            <div className="upsPrintArea">Ups Printing Area</div>
                                                                            <div className="upsPrintAreaValue">{job.ups} mm</div>
                                                                            <div className="cirRpt">Cir <br /> RPT</div>
                                                                            <div className="cirRptValue">{job.cir} mm <br /> {job.rpt} Nos</div>

                                                                            <div className="designHeight"> Design Height - <span style={{'padding': '2px', 'border': '1px solid black'}}>{job.printing_height}</span> mm </div>
                                                                            <div className="designWidth"> Design Width - <span style={{'padding': '2px', 'border': '1px solid black'}}>{job.printing_height}</span> mm </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="row report-footer groupFont">
                                                        <div className="col-md-4">
                                                            <h5><u>Remarks</u></h5>
                                                            <div className="copyRemark">
                                                                <span className="copyRemarkSpan">Supplyer Copy</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <h5></h5>
                                                            <div className="put-signature"></div>
                                                            <span className="">Received By</span> <br />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <h5></h5>
                                                            <div className="put-signature"></div>
                                                            <span className="">For Del</span> <br />
                                                        </div>
                                                    </div>
                                                </Fragment>
                                            ))}
                                            <hr />
                                            </>
                                        ):(
                                            <div className="text-center">
                                                No Data Found
                                            </div>
                                        )}

                                        {/* // Office Copy Start */}
                                        {jobOrderInfo.length > 0 ? (
                                            <Fragment>
                                            <div className="text-center officeCopy">
                                                <h5>Base Cylinder Order</h5>
                                            </div>
                                            {jobOrderInfo.map((job, key)=>(
                                                <Fragment key={key}>
                                                    <div className="row">
                                                        <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                            <thead>
                                                                <tr>
                                                                    <th width="15%">Job No</th>
                                                                    <th width="30%" align="center">Issue To</th>
                                                                    <th width="15%">Order Date</th>
                                                                    <th width="10%">BCO</th>
                                                                    <th width="30%" align="center">Delevery Date</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>{job.job_no}</td>
                                                                    <td>{job.supplier_name}</td>
                                                                    <td>{job.base_order_date}</td>
                                                                    <td></td>
                                                                    <td>{job.base_receive_date}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                        <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                            <thead>
                                                                <tr>
                                                                    <th className="text-center" colSpan="7"><span style={{'fontSize': '14px'}}>Particulars</span></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td width="10%">Face Length</td>
                                                                    <td width="1%" align="center">:</td>
                                                                    <td width="14%">{job.face_length} mm</td>

                                                                    <td width="20%" align="center"></td>

                                                                    <td width="10%">Job Name</td>
                                                                    <td width="1%" align="center">:</td>
                                                                    <td width="14%" >{job.job_name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="10%">Cir</td>
                                                                    <td width="1%" align="center">:</td>
                                                                    <td width="14%">{job.cir} mm</td>

                                                                    <td width="20%" align="center"></td>

                                                                    <td width="10%">Client Name</td>
                                                                    <td width="1%" align="center">:</td>
                                                                    <td width="14%" >{job.client_name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="10%">Dia</td>
                                                                    <td width="1%" align="center">:</td>
                                                                    <td width="14%">{job.dia} mm</td>

                                                                    <td width="20%" align="center"></td>

                                                                    <td width="10%">Printers Name</td>
                                                                    <td width="1%" align="center">:</td>
                                                                    <td width="14%" >{job.printer_name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="10%">Qty</td>
                                                                    <td width="1%" align="center">:</td>
                                                                    <td width="14%">{job.base_order_cyl_qty}</td>

                                                                    <td width="20%" align="center"></td>

                                                                    <td width="10%">Type Of Printing</td>
                                                                    <td width="1%" align="center">:</td>
                                                                    <td width="14%" >Surface</td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="7">
                                                                        <div className="cylImgDiv">
                                                                            <img className="img-responsive cylImgTag" src={process.env.PUBLIC_URL+'/cylinder.bmp'} alt="Company Logo"/>
                                                                            <div className="fl">FL</div>
                                                                            <div className="flValue">{job.face_length} mm</div>
                                                                            <div className="upsPrintArea">Ups Printing Area</div>
                                                                            <div className="upsPrintAreaValue">{job.ups} mm</div>
                                                                            <div className="cirRpt">Cir <br /> RPT</div>
                                                                            <div className="cirRptValue">{job.cir} mm <br /> {job.rpt} Nos</div>

                                                                            <div className="designHeight"> Design Height - <span style={{'padding': '2px', 'border': '1px solid black'}}>{job.printing_height}</span> mm </div>
                                                                            <div className="designWidth"> Design Width - <span style={{'padding': '2px', 'border': '1px solid black'}}>{job.printing_height}</span> mm </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="row report-footer groupFont">
                                                        <div className="col-md-4">
                                                            <h5><u>Remarks</u></h5>
                                                            <div className="copyRemark">
                                                                <span className="copyRemarkSpan">Office Copy</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <h5></h5>
                                                            <div className="put-signature"></div>
                                                            <span className="">Received By</span> <br />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <h5></h5>
                                                            <div className="put-signature"></div>
                                                            <span className="">For Del</span> <br />
                                                        </div>
                                                    </div>
                                                </Fragment>
                                            ))}
                                            <hr />
                                            </Fragment>
                                        ):(
                                            <div className="text-center">
                                                No Data Found
                                            </div>
                                        )}
                                        {/* //Office Copy End */}


                                        {/* // Factory Copy Start */}
                                        {jobOrderInfo.length > 0 ? (
                                            <>
                                            
                                            {jobOrderInfo.map((job, key)=>(
                                                <Fragment key={key}>
                                                    <div className="text-center">
                                                        <b>Base Cylinder Order to</b>
                                                        <h5>{job.supplier_name}</h5>
                                                    </div>
                                                    <div className="row">
                                                        <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                            <thead>
                                                                <tr>
                                                                    <th width="15%">Job No</th>
                                                                    <th width="30%" align="center">Issue To</th>
                                                                    <th width="15%">Order Date</th>
                                                                    <th width="10%">BCO</th>
                                                                    <th width="30%" align="center">Delevery Date</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>{job.job_no}</td>
                                                                    <td>{job.supplier_name}</td>
                                                                    <td>{job.base_order_date}</td>
                                                                    <td></td>
                                                                    <td>{job.base_receive_date}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                        <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                            <thead>
                                                                <tr>
                                                                    <th className="text-center" colSpan="7"><span style={{'fontSize': '14px'}}>Particulars</span></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td width="10%">Face Length</td>
                                                                    <td width="1%" align="center">:</td>
                                                                    <td width="14%">{job.face_length} mm</td>

                                                                    <td width="20%" align="center"></td>

                                                                    <td width="10%">Job Name</td>
                                                                    <td width="1%" align="center">:</td>
                                                                    <td width="14%" >{job.job_name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="10%">Cir</td>
                                                                    <td width="1%" align="center">:</td>
                                                                    <td width="14%">{job.cir} mm</td>

                                                                    <td width="20%" align="center"></td>

                                                                    <td width="10%">Client Name</td>
                                                                    <td width="1%" align="center">:</td>
                                                                    <td width="14%" >{job.client_name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="10%">Dia</td>
                                                                    <td width="1%" align="center">:</td>
                                                                    <td width="14%">{job.dia} mm</td>

                                                                    <td width="20%" align="center"></td>

                                                                    <td width="10%">Printers Name</td>
                                                                    <td width="1%" align="center">:</td>
                                                                    <td width="14%" >{job.printer_name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="10%">Qty</td>
                                                                    <td width="1%" align="center">:</td>
                                                                    <td width="14%">{job.base_order_cyl_qty}</td>

                                                                    <td width="20%" align="center"></td>

                                                                    <td width="10%">Type Of Printing</td>
                                                                    <td width="1%" align="center">:</td>
                                                                    <td width="14%" >Surface</td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="7">
                                                                        <div className="cylImgDiv">
                                                                            <img className="img-responsive cylImgTag" src={process.env.PUBLIC_URL+'/cylinder.bmp'} alt="Company Logo"/>
                                                                            <div className="fl">FL</div>
                                                                            <div className="flValue">{job.face_length} mm</div>
                                                                            <div className="upsPrintArea">Ups Printing Area</div>
                                                                            <div className="upsPrintAreaValue">{job.ups} mm</div>
                                                                            <div className="cirRpt">Cir <br /> RPT</div>
                                                                            <div className="cirRptValue">{job.cir} mm <br /> {job.rpt} Nos</div>

                                                                            <div className="designHeight"> Design Height - <span style={{'padding': '2px', 'border': '1px solid black'}}>{job.printing_height}</span> mm </div>
                                                                            <div className="designWidth"> Design Width - <span style={{'padding': '2px', 'border': '1px solid black'}}>{job.printing_height}</span> mm </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="row report-footer groupFont">
                                                        <div className="col-md-4">
                                                            <h5><u>Remarks</u></h5>
                                                            <div className="copyRemark">
                                                                <span className="copyRemarkSpan">Office Copy</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <h5></h5>
                                                            <div className="put-signature"></div>
                                                            <span className="">Received By</span> <br />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <h5></h5>
                                                            <div className="put-signature"></div>
                                                            <span className="">For Del</span> <br />
                                                        </div>
                                                    </div>
                                                </Fragment>
                                            ))}
                                            <hr />
                                            </>
                                        ):(
                                            <div className="text-center">
                                                No Data Found
                                            </div>
                                        )}
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