import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader'
import {CLIENT_WISE_BILL_INFO_REPORT, CYLINDER_DELIVERED_REPORT, } from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import '../ClientWiseBillInformation/style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [employees, setEmployees] = useState([]);
    const [groupByClient, setGroupByClient] = useState([]);
    
    const tableStyle = {
        "margin" : "2% 1% 2% 0%"
    }
    const fromDate = props.match.params.fromDate;
    const toDate = props.match.params.toDate;
    const employeeId = props.match.params.clientId;
    useEffect(()=>{
        userGetMethod(`${CYLINDER_DELIVERED_REPORT}?fromDate=${fromDate}&&toDate=${toDate}&&employeeId=${employeeId}`) 
        .then(response => {
            console.log('response', response.data);
            setEmployees(response.data.job_orders);
            // setClientInfo(response.data.client);
            setIsLoading(false);
        })
        .catch(error => console.log(error))
    }, []);

    useEffect(() =>{
        if (employees.length > 0) {
            const groupByClient = (data) => {
                const groupedData = data.reduce((result, item) => {
                  const clientId = item.employee_id;
                  const clientName = item.employee_name;

                if (!result[clientId]) {
                    result[clientId] = [];
                  }
              
                //   result[clientId].push(...item,clientName);
                result[clientId].push({ ...item, client_name: clientName})
                  return result;
                }, {});

                const groupedArray = Object.entries(groupedData).map(([clientId, items]) => ({
                    
                    client_id: Number(clientId),
                    client_name: items[0].client_name,
                    
                  items,
                }));
            
                return groupedArray;
              };
              
              const groupedByClientId = groupByClient(employees);
              setGroupByClient(groupedByClientId);
        }
    },[employees]);

    // const result = employees.reduce((acc,item)=>{
    //     const value = acc + item.grand_total_amount;
    //     return value
    // },0)

    
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
                                                        {
                                                            groupByClient.length > 0 ? groupByClient.map((item,key)=>{
                                                                return (
                                                                    <>
                                                                    <div><p>Pending Job:</p></div>
                                                                    <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                                    <thead>    
                                                                        <tr style={{backgroundColor:"#d7d4d4"}}>
                                                                            <th width="5%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Aggrement Date</th>
                                                                            <th width="8%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Job No</th>
                                                                            <th width="15%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Job Name</th>
                                                                            <th width="8%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Req/PO No</th>
                                                                            <th width="12%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Printer</th>
                                                                            <th width="4%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Status</th>
                                                                            <th width="6%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Size</th>
                                                                            <th width="4%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Cyl</th>
                                                                            <th width="6%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Surface Area</th>
                                                                            <th width="6%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Design Received Date</th>
                                                                            <th width="8%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Job Position</th>
                                                                            <th width="6%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Duration</th>
                                                                            <th width="6%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Delivered Date</th>
                        
                                                                        </tr>    
                                                                    </thead>
                                                                    {item.map((item, index) =>
                                                                    <Fragment>
                                                                        
                                                                    <tbody>
                                                                        <>
                                                                        {/* <tr key={index}>
                                                                            <td style={{fontSize:"12px",fontWeight:'bold'}}>{item.agreement_date}</td>
                                                                            <td style={{fontSize:"12px",fontWeight:'bold'}}>{item.job_no}</td>
                                                                            <td style={{fontSize:"12px",fontWeight:'bold'}}>{item.job_name}</td>
                                                                            <td style={{fontSize:"12px",fontWeight:'bold'}}></td>
                                                                            <td style={{fontSize:"12px",fontWeight:'bold'}}>{item.printer_name}</td>
                                                                                                
                                                                            <td style={{fontSize:"12px",fontWeight:'bold'}}>{item.job_type}</td>
                                                                            <td style={{fontSize:"12px",fontWeight:'bold'}}>{item.face_length}x{item.circumference}</td>
                                                                            <td style={{fontSize:"12px",fontWeight:'bold'}}>{item.total_cylinder_qty}</td>
                                                                            <td style={{fontSize:"12px",fontWeight:'bold'}}>{item.total_surface_area}</td>
                                                                            <td style={{fontSize:"12px",fontWeight:'bold'}}>{item.design_rcv_date}</td>
                                                                            <td style={{fontSize:"12px",fontWeight:'bold'}}>{item.bill_status==1?'Finished':'Pending'}</td>
                                                                            <td style={{fontSize:"12px",fontWeight:'bold'}}>{item.bill_date != null ? Math.round(Math.abs((new Date(item.design_rcv_date) - new Date(item.bill_date)) / oneDay)):'N/A'}</td>
                                                                            <td style={{fontSize:"12px",fontWeight:'bold'}}>{item.bill_date}</td>
                                                                        </tr> */}
                                                                                        
                                                                                        </>
                                                                                    
                                                                        
                                                                    </tbody>
                                                                    </Fragment>)}
                                                                    
                                                                    {/* {client.total.map((data)=>( */}
                                                                                            {/* <tr> 
                                                                                                <th colspan="7" style={{fontSize:"12px",fontWeight:'bold'}}>Total Pending:</th>                                                                               
                                                                                                <th style={{fontSize:"12px",fontWeight:'bold'}}>{PendingCylinderQtyTotal}</th>                                                                                 
                                                                                                <th style={{fontSize:"12px",fontWeight:'bold'}}>{PendingSurfaceTotal}</th>
                                                                                                <th></th>  
                                                                                                <th></th>  
                                                                                                <th></th>  
                                                                                                <th></th>  
                                                                                            </tr> */}
                                                                                           
                                                                                        {/* ))} */}
                                                                    </table>
                                                                    </> 
                                                                )
                                                            }) : null
                                                        }
                                                    </tbody>

                                                    <tr>
                                                                                <th colspan="6" style={{textAlign:"right", fontSize: '14px', fontWeight: 'bold'}}>Total</th>                                                                                
                                                                                <th style={{fontSize: '14px', fontWeight: 'bold'}}>aaa</th>
                                                                            </tr>

                                                </table>
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