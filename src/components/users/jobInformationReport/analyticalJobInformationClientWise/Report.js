import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader';
import {ANALYTICAL_JOB_INFORMATION_CLIENT_WISE_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [clients, setClients] = useState([]);
    const [jobOrders, setJobOrders] = useState([]);
    const [groupByClient, setGroupByClient] = useState([]);
    
    const tableStyle = {
        "margin" : "2% 1% 2% 0%"
    }
    const fromDate = props.match.params.fromDate;
    const toDate = props.match.params.toDate;
    const clientId = props.match.params.clientId;
    const oneDay = 24 * 60 * 60 * 1000;
    useEffect(()=>{
        userGetMethod(`${ANALYTICAL_JOB_INFORMATION_CLIENT_WISE_REPORT}?fromDate=${fromDate}&&toDate=${toDate}&&clientId=${clientId}`) 
        .then(response => {
            console.log('response', response.data);
            // setClients(response.data.clients);
            setJobOrders(response.data.job_orders);
            setIsLoading(false);
        })
        .catch(error => console.log(error))
    }, []);
    // console.log(jobOrders)
    useEffect(() =>{
        if (jobOrders.length > 0) {
            const groupByClient = (data) => {
                const groupedData = data.reduce((result, item) => {
                  const clientName = item.client_id;
              
                  
                  if (!result[clientName]) {
                    result[clientName] = [];
                  }
              
                  result[clientName].push(item);
                  console.log(result);
                  return result;
                }, {});
    
                const groupedArray = Object.entries(groupedData).map(([clientName, items]) => ({
                    
                    client_id: Number(clientName), 
                  items,
                }));
              
                return groupedArray;
              };
              
              const groupedByClientId = groupByClient(jobOrders);
              setGroupByClient(groupedByClientId);
            //   console.log(groupedByClientId);
        }
    },[jobOrders])
    
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
                                            <h5>{'Analytical Job Information Client Wise Report - '+fromDate+' to '+toDate}</h5>
                                        </div>
                                        <Fragment>
                                            <div className="">
                                            {groupByClient.length > 0 ? groupByClient.map((item,key) => (
                                           <div key={key}>
                                            <h3>Client Id: {item.client_id}</h3>
                                            <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                            
                                            <thead>    
                                                <tr>
                                                    <th width="6%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Aggrement Date</th>
                                                    <th width="6%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Job No</th>
                                                    <th width="8%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Job Name</th>
                                                    <th width="8%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Req/PO No</th>
                                                    <th width="6%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Printer</th>
                                                    <th width="6%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Status</th>
                                                    <th width="6%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Size</th>
                                                    <th width="6%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Cyl</th>
                                                    <th width="8%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Surface Area</th>
                                                    <th width="6%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Design Received Date</th>
                                                    <th width="10%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Job Position</th>
                                                    <th width="6%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Duration</th>
                                                    <th width="6%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Delivered Date</th>

                                                </tr>    
                                            </thead>
                                            <tbody>
                                                {item?.items.length > 0 ? 
                                                    item?.items.map((client,key)=>(
                                                        // console.log(client),
                                                        
                                                            <>
                                                                
                                        
                                                                
                                                                    <tr key={key}>
                                                                        <td style={{fontSize:"12px",fontWeight:'bold'}}>{client.agreement_date}</td>
                                                                        <td style={{fontSize:"12px",fontWeight:'bold'}}>{client.job_no}</td>
                                                                        <td style={{fontSize:"12px",fontWeight:'bold'}}>{client.job_name}</td>
                                                                        <td style={{fontSize:"12px",fontWeight:'bold'}}></td>
                                                                        <td style={{fontSize:"12px",fontWeight:'bold'}}>{client.printer_name}</td>
                                                                        
                                                                        <td style={{fontSize:"12px",fontWeight:'bold'}}>{client.job_type}</td>
                                                                        <td style={{fontSize:"12px",fontWeight:'bold'}}>{client.face_length}x{client.circumference}</td>
                                                                        <td style={{fontSize:"12px",fontWeight:'bold'}}>{client.total_cylinder_qty}</td>
                                                                        <td style={{fontSize:"12px",fontWeight:'bold'}}>{client.total_surface_area}</td>
                                                                        <td style={{fontSize:"12px",fontWeight:'bold'}}>{client.design_rcv_date}</td>
                                                                        <td style={{fontSize:"12px",fontWeight:'bold'}}>{client.bill_status==1?'Finished':'Pending'}</td>
                                                                        <td style={{fontSize:"12px",fontWeight:'bold'}}>{client.bill_date != null ? Math.round(Math.abs((new Date(client.design_rcv_date) - new Date(client.bill_date)) / oneDay)):'N/A'}</td>
                                                                        <td style={{fontSize:"12px",fontWeight:'bold'}}>{client.bill_date}</td>
                                                                    </tr>
                                                                
                                                                {/* {client.total.map((data)=>(
                                                                    <tr> 
                                                                        <th colspan="7">Total</th>                                                                               
                                                                        <th>{data.total_cylinder_qty}</th>                                                                                 
                                                                        <th>{data.total_surface_area}</th>  
                                                                    </tr>
                                                                ))} */}
                                                            </>
                                                        
                                                    ))
                                                : null
                                                }
                                            </tbody>
                                            </table>
                                           </div>
                                            
                                            )) : null}
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