import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { userGetMethod } from '../../../../api/userAction';
import { CLIENT_WISE_BILL_INFO_REPORT, ShowJobOrderChallanAPI } from '../../../../api/userUrl';
import './Form.css'

const Form = (props) => {
  
  
  const [isLoading, setIsLoading] = useState(false);
  const [jobOrders_details, setJobOrders_details] = useState([]);
  const [cylinder_details, setCylinder_details] = useState([]);
  const [colors, setColors] = useState([]);
  const [jobId, setJobId] = useState(0);
  
  const { challanNo } = useParams();
  
//   console.log(challanNo)
    const tableStyle = {
        "margin" : "2% 1% 2% 0%"
    }
    // const fromDate = props.match.params.fromDate;
    // const toDate = props.match.params.toDate;
    // const employeeId = props.match.params.clientId;
    useEffect(()=>{
        userGetMethod(`${ShowJobOrderChallanAPI}/${challanNo}`) 
        .then(response => {
            console.log('response', response.data);
            setJobOrders_details(response.data.jobOrders_details);
            setCylinder_details(response.data.cylinder_details);
            setColors(response.data.colors);
            setIsLoading(false);
        })
        .catch(error => console.log(error))
    }, []);



    // const result = employees.reduce((acc,item)=>{
    //     const value = acc + item.grand_total_amount;
    //     return value
    // },0)
    const printDocument = () => {
        window.print();
    }

    
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className=""> 
                            <div className="report-header">
                            
                                <div className="print_button">
                                    <button className="btn btn-default" onClick={printDocument}><i className="fa fa-print" aria-hidden="true"></i> Print</button>&nbsp;
                                    <button className="btn btn-default"><i className="fa fa-file-pdf-o" aria-hidden="true"></i>Pdf</button>
                                </div>
                                <div className="company-info">
                                    <img className="img-responsive challanImg" src={process.env.PUBLIC_URL+'/digitalLogo.png'} alt="Company Logo"/>
                                    <div>
                                        <h1>Digital Engravers Ltd</h1>
                                        <span className="company-moto">Digital Image Transfer Technology</span>
                                    </div>
                                </div>

                                <h4 className="text-center"><b>{props.reportTtile}</b></h4>
                                
                            </div>

                            <div className="mainDiv" style={{"padding": "1% 5%"}}>
                            {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <>
                                        <Fragment>
                                            <div className="row">

                                            <table className="particulars table-stripped groupFont" width="100%"  style={tableStyle}>
                                                
                                                <tr >
                                                    <td width="15%">Name</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobOrders_details.client_name}</td>
                                                    <td width="15%">SL. No.</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{jobOrders_details.challan_no}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%">Address</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="15%"></td>
                                                    <td width="15%">Date </td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="45%">{jobOrders_details.finished_date}</td>
                                                </tr>
                                               
                                                
                                            </table>

                                                <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                    <thead>    
                                                    <tr style={{ backgroundColor: "#d7d4d4" }}>
                                                      <th className="col-8" width="15%" align="center" style={{ fontWeight: "bold", fontSize: "14px" }}>Particulars</th>
                                                      <th className="col-2" width="10%" align="center" style={{ fontWeight: "bold", fontSize: "14px" }}>Cylinder Size</th>
                                                      <th className="col-2" width="10%" align="center" style={{ fontWeight: "bold", fontSize: "14px" }}>Quantity</th>
                                                    </tr>   
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                          <td className="col-8" style={{ fontWeight: "bold", fontSize: "12px" }}>

                                                          <div className="row">
                                                            <div className="col-1">JOB NO</div>
                                                            <div className="col-1" style={{ marginRight:'-40px'}}>:</div>
                                                            <div className="col-7">{jobOrders_details.job_no}</div>
                                                          </div>
                                                          <div className="row">
                                                            <div className="col-1">JOB NAME</div>
                                                            <div className="col-1" style={{ marginRight:'-40px'}}>:</div>
                                                            <div className="col-7">{jobOrders_details.job_name}</div>
                                                          </div>
                                                          <div className="row">
                                                            <div className="col-1">ATTACHED</div>
                                                            <div className="col-1" style={{ marginRight:'-40px'}}>:</div>
                                                            <div className="col-7">Tanvir Test</div>
                                                          </div>
                                                          <div className="row">
                                                            <div className="col-1">COLOR</div>
                                                            <div className="col-1" style={{ marginRight:'-40px'}}>:</div>
                                                            <div className="col-7">{colors.map(color =><span>{color.color_name},</span>)}</div>
                                                          </div>
                                                          <div className="row">
                                                            <div className="col-1">REMARKS</div>
                                                            <div className="col-1" style={{ marginRight:'-40px'}}>:</div>
                                                            <div className="col-7">{jobOrders_details.remarks}</div>
                                                          </div>




                                                          </td>
                                                          <td className="col-2" style={{ fontWeight: "bold", fontSize: "12px" }}>{jobOrders_details.fl} X {jobOrders_details.cir}</td>
                                                          <td className="col-2" style={{ fontWeight: "bold", fontSize: "12px" }}>{jobOrders_details.total_cylinder_qty}</td>
                                                        </tr>
                                                    </tbody>

                                                    <tr>
                                                                                <th style={{textAlign:"right", fontSize: '14px', fontWeight: 'bold'}}>Total</th>                                                                                
                                                                                <th style={{fontSize: '14px', fontWeight: 'bold'}}>{parseInt(jobOrders_details.fl)* parseInt(jobOrders_details.cir)}</th>
                                                                                <th style={{fontSize: '14px', fontWeight: 'bold'}}>{jobOrders_details.total_cylinder_qty}</th>
                                                    </tr>

                                                </table>
                                                 
                                            </div> 
                                            {/* Printer Name area */}
                                            <div className='row'>
                                                    <div className='col-1 col-md-1'>Printer Name</div>
                                                    <div className='col-1 col-md-1'>:</div>
                                                    <div className='col-5 col-md-5' style={{marginLeft:'-60px'}}>{jobOrders_details.printer_name}</div>
                                                </div> 

                                            <div>

                                            <div className="row report-footer groupFont">
                                            <div className="col-4 col-md-4">
                                               
                                                <p style={{height: '30px'}}></p>
                                                {/* <div className="put-signature"></div> */}
                                                <span className="footer-signature">Received By</span> <br />
                                                
                                            </div>
                                            <div className="col-4 col-md-4">
                                            
                                                {/* <div className="put-signature"></div> */}
                                                <p style={{height: '30px'}}></p>
                                                <span className="footer-signature">Signature and Date</span> <br />
                                                <h5><span>for</span> Date Here</h5>
                                            </div>
                                            <div className="col-4 col-md-4">
                                            
                                                {/* <div className="put-signature"></div> */}
                                                <p style={{height: '30px'}}></p>
                                                <span className="footer-signature">Signature and Date</span> <br />
                                                <h5><span>for</span> Digital Engravers Limited</h5>
                                            </div>
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
}

export default Form