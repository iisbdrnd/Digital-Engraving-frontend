import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader';
import {CLIENT_WISE_BILL_INFO_REPORT, JOB_FLOW_ANALYSIS_MARKETING_PERSON_WISE_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [employees, setEmployees] = useState([]);
    const [clientInfo, setClientInfo] = useState([]);
    
    const tableStyle = {
        "margin" : "2% 1% 2% 0%"
    }
    const fromDate = props.match.params.fromDate;
    const toDate = props.match.params.toDate;
    const employeeId = props.match.params.clientId;
    useEffect(()=>{
        userGetMethod(`${CLIENT_WISE_BILL_INFO_REPORT}?fromDate=${fromDate}&&toDate=${toDate}&&clientId=${employeeId}`) 
        .then(response => {
            console.log('response', response.data);
            setEmployees(response.data.job_orders);
            setClientInfo(response.data.client);
            setIsLoading(false);
        })
        .catch(error => console.log(error))
    }, []);

    const result = employees.reduce((acc,item)=>{
        const value = acc + item.grand_total_amount;
        return value
    },0)

    
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
                                            <h5>{'Client Wise Bill Information - '+fromDate+' to '+toDate}</h5>
                                        </div>
                                        <Fragment>
                                            <div className="row">

                                            <table className="particulars table-stripped groupFont" width="100%"  style={tableStyle}>
                                                
                                                <tr >
                                                    <td width="15%">Client No.</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{clientInfo.client_code ? clientInfo.client_code : ''}</td>
                                                    <td width="15%">Client Name</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{clientInfo.name ? clientInfo.name : ''}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%">Contact No.</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="15%">{clientInfo.mobile? clientInfo.mobile:''}</td>
                                                    <td width="15%">Email </td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="45%">{clientInfo.email ? clientInfo.email : ''}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%">Client Address</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" colSpan="4">{clientInfo.address ? clientInfo.address : ''}</td>
                                                </tr>
                                                
                                            </table>

                                                <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                    <thead>    
                                                        <tr style={{backgroundColor:"#d7d4d4"}}>
                                                            <th width="15%" align="center" style={{fontWeight: "bold", fontSize: "14px"}}>Bill Date</th>
                                                            <th width="15%" align="center" style={{fontWeight: "bold", fontSize: "14px"}}>Job No</th>
                                                            <th width="10%" align="center" style={{fontWeight: "bold", fontSize: "14px"}}>Challan No</th>
                                                            <th width="10%" align="center" style={{fontWeight: "bold", fontSize: "14px"}}>Bill /Tr. No</th>
                                                            {/* <th width="10%" align="center">Times</th> */}
                                                            <th width="10%" align="center" style={{fontWeight: "bold", fontSize: "14px"}}>Particulars</th>      
                                                            <th width="10%" align="center" style={{fontWeight: "bold", fontSize: "14px"}}>Size</th>      
                                                            <th width="10%" align="center" style={{fontWeight: "bold", fontSize: "14px"}}>Cyl</th>      
                                                            <th width="10%" align="center" style={{fontWeight: "bold", fontSize: "14px"}}>Amount</th>      
                                                        </tr>    
                                                    </thead>
                                                    <tbody>
                                                        {employees.length > 0 ? 
                                                            employees.map((employee)=>(
                                                               
                                                                    <>
                                                                        {/* <tr>
                                                                            <th colSpan="5" >{employee.name}</th>
                                                                        </tr> */}
                                                
                                                                        
                                                                            <tr>
                                                                                <td style={{fontWeight: "bold", fontSize: "12px"}}>{employee?.agreement_date}</td>
                                                                                <td style={{fontWeight: "bold", fontSize: "12px"}}>{employee?.job_no}</td>
                                                                                <td style={{fontWeight: "bold", fontSize: "12px"}}>{employee?.challan_no}</td>
                                                                                <td style={{fontWeight: "bold", fontSize: "12px"}}>{employee?.bill_no}</td>
                                                                                <td style={{fontWeight: "bold", fontSize: "12px"}}>{employee?.job_name}</td>
                                                                                <td style={{fontWeight: "bold", fontSize: "12px"}}>{employee?.face_length}X{employee?.circumference}</td>
                                                                                <td style={{fontWeight: "bold", fontSize: "12px"}}>{employee?.total_cylinder_qty}</td>
                                                                                <td style={{fontWeight: "bold", fontSize: "12px"}}>{employee?.grand_total_amount}</td>
                                                                            </tr>
                                                                        
                                                                        {/* {employee.total.map((data)=>(
                                                                            <tr>
                                                                                <th colspan="4">Total</th>                                                                                
                                                                                <th>{data.surface_area}</th>
                                                                            </tr>
                                                                        ))} */}
                                                                    </>
                                                                
                                                            ))
                                                        : null
                                                        }
                                                    </tbody>

                                                    <tr>
                                                                                <th colspan="6" style={{textAlign:"right", fontSize: '14px', fontWeight: 'bold'}}>Total</th>                                                                                
                                                                                <th style={{fontSize: '14px', fontWeight: 'bold'}}>{result}</th>
                                                                            </tr>

                                                </table>
                                            </div>  

                                            <div>
                                            <div className="row report-footer groupFont">
                                            <div className="col-md-4">
                                               
                                                <p style={{height: '30px'}}></p>
                                                {/* <div className="put-signature"></div> */}
                                                <span className="footer-signature">Received By</span> <br />
                                                
                                            </div>
                                            <div className="col-md-4">
                                            
                                                {/* <div className="put-signature"></div> */}
                                                <p style={{height: '30px'}}></p>
                                                <span className="footer-signature">Signature and Date</span> <br />
                                                <h5><span>for</span> Date Here</h5>
                                            </div>
                                            <div className="col-md-4">
                                            
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
};

export default Report;