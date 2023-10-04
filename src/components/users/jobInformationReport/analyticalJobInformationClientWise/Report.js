import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader';
import {ANALYTICAL_JOB_INFORMATION_CLIENT_WISE_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [clients, setClients] = useState([]);
    const [jobOrders, setJobOrders] = useState([]);
    const [grandCylinderTotal, setGrandCylinderTotal] = useState(0);
    const [grandSurfaceTotal, setGrandSurfaceTotal] = useState(0);
    const [groupByClient, setGroupByClient] = useState([]);
    const [sumPendingQuantity, setSumPendingQuantity] = useState(0);
    const [sumPendingSurfaceTotal, setSumPendingSurfaceTotal] = useState(0);
    const [sumFinishQuantity, setSumFinishQuantity] = useState(0);
    const [sumFinishSurfaceTotal, setSumFinishSurfaceTotal] = useState(0);
    
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
                  const clientId = item.client_id;
                  const clientName = item.client_name;

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
            //   console.log(groupedArray)
                return groupedArray;
              };
              
              const groupedByClientId = groupByClient(jobOrders);
              setGroupByClient(groupedByClientId);




            //   console.log(groupedByClientId);
        }
    },[jobOrders]);

    // console.log(updatedGroupByClient);
    // const updatedGroupByClient = groupByClient.map((item) => {
    //   const items = item?.items || [];
      
    //   const { pendingItems, completedItems } = items.reduce(
    //     (result, item) => {
    //       if (item.challan_complete === 0) {
    //         result.pendingItems.push(item);
    //       } else if (item.challan_complete === 1) {
    //         result.completedItems.push(item);
    //       }
          
    //       return result;
    //     },
    //     { pendingItems: [], completedItems: [] }
    //   );

    //   return {pendingItems, completedItems,
        
    //   };
    // });
    // useEffect(() => {
    //     // Your existing logic to fetch or set groupByClient data
    
      
    //     const sumAllPendingQuantity = updatedGroupByClient?.pendingItems.reduce((acc, item) => acc + item.total_cylinder_qty, 0);
    //     const sumAllPendingSurfaceTotal = updatedGroupByClient?.pendingItems.reduce((acc, item) => acc + item.total_surface_area, 0);
    //     const sumFinishedQuantity = updatedGroupByClient?.completedItems?.reduce((acc, item) => acc + item.total_cylinder_qty, 0);
    //     const sumFinishedSurfaceTotal = updatedGroupByClient?.completedItems?.reduce((acc, item) => acc + item.total_surface_area, 0);
    //     // setSumPendingQuantity(sumAllPendingQuantity);
    //     // setSumPendingSurfaceTotal(sumAllPendingSurfaceTotal);
    //     // setSumFinishSurfaceTotal(sumFinishedSurfaceTotal);
    //     // setSumFinishQuantity(sumFinishedQuantity)
    //     console.log(sumAllPendingQuantity,sumAllPendingSurfaceTotal,sumFinishedQuantity,sumFinishedSurfaceTotal)
    
    //     // Update the state with the updated groupByClient data
    //     // setGroupByClient(updatedGroupByClient);
    //   }, [updatedGroupByClient]);


    const result = groupByClient.map((client) => {
        const items = client?.items || [];
        
        const totalNumberCylinder = items.reduce(
            (result, item) => {
            //   if (item.challan_complete === 0) {
            //     result.pendingItems.push(item);
            //   } else if (item.challan_complete === 1) {
            //     result.completedItems.push(item);
            //   }
            const totalA = result + item.total_cylinder_qty;
            return (totalA );
              
            },0);
        const totalSurfaceArea = items.reduce((result,item)=>{
            const totalB = result + item.total_surface_area;
            return totalB;
        },0)
         
        
          return {
            
            totalNumberCylinder,totalSurfaceArea
          };

        // const sumTotal = items.reduce((result, item) => result + (item.total_cylinder_qty || 0), 0);
        //  return { client_id: client.client_id, sumTotal: sumTotal };
       
      });

      useEffect(() => {
        // Calculate total quantity and total value
        const sumQuantity = result.reduce((acc, item) => acc + item.totalNumberCylinder, 0);
        const sumTotal = result.reduce((acc, item) => acc + item.totalSurfaceArea, 0);
    
        // Set state variables
        setGrandCylinderTotal(sumQuantity);
        setGrandSurfaceTotal(sumTotal);
      }, [result]);
    //   console.log(sumFinishQuantity,sumPendingQuantity,sumFinishSurfaceTotal,sumPendingSurfaceTotal);
     
    
    
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
                                            {groupByClient.length > 0 ? groupByClient.map((item,key) => {
                                                const items = item?.items || [];
                                                
                                                const { pendingItems, completedItems } = items.reduce(
                                                    (result, item) => {
                                                      if (item.challan_complete === 0) {
                                                        result.pendingItems.push(item);
                                                      } else if (item.challan_complete === 1) {
                                                        result.completedItems.push(item);
                                                      }
                                                      
                                                      return result;
                                                    },
                                                    { pendingItems: [], completedItems: [] },
                                                    );
                                                
                                                 
                                                //   =====Pending Section Total Sum
                                                    const PendingCylinderQtyTotal = pendingItems.reduce((total, item) => total + (item.total_cylinder_qty || 0), 0);
                                                 
                                                    const PendingSurfaceTotal = pendingItems.reduce((total, item) => total + (item.total_surface_area || 0), 0);
                                                    // =====Finishing section total
                                                    const FinishingSurfaceTotal = completedItems.reduce((total, item) => total + (item.total_surface_area || 0), 0);
                                                    const FinishingCylinderQtyTotal = completedItems.reduce((total, item) => total + (item.total_cylinder_qty || 0), 0);

                                           return(
                                            
                                            <div key={key}>
                                            {/* <h4>Client Id: {item.client_id}</h4> */}
                                            <h3>Client Name: {item.client_name}</h3>
                                            {pendingItems.length >0 ? 
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
                                            {pendingItems.map((item, index) =>
                                            <Fragment>
                                                
                                            <tbody>
                                                <>
                                                                    <tr key={index}>
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
                                                                    </tr>
                                                                
                                                                </>
                                                            
                                                
                                            </tbody>
                                            </Fragment>)}
                                            
                                            {/* {client.total.map((data)=>( */}
                                                                    <tr> 
                                                                        <th colspan="7" style={{fontSize:"12px",fontWeight:'bold'}}>Total Pending:</th>                                                                               
                                                                        <th style={{fontSize:"12px",fontWeight:'bold'}}>{PendingCylinderQtyTotal}</th>                                                                                 
                                                                        <th style={{fontSize:"12px",fontWeight:'bold'}}>{PendingSurfaceTotal}</th>
                                                                        <th></th>  
                                                                        <th></th>  
                                                                        <th></th>  
                                                                        <th></th>  
                                                                    </tr>
                                                                   
                                                                {/* ))} */}
                                            </table>
                                            </>
                                            
                                            :

                                            <>
                                            <div><p>Finished Job:</p></div>
                                            <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                            <thead>    
                                                <tr>
                                                    <th width="5%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Aggrement Date</th>
                                                    <th width="8%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Job No</th>
                                                    <th width="12%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Job Name</th>
                                                    <th width="8%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Req/PO No</th>
                                                    <th width="10%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Printer</th>
                                                    <th width="4%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Status</th>
                                                    <th width="6%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Size</th>
                                                    <th width="4%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Cyl</th>
                                                    <th width="5%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Surface Area</th>
                                                    <th width="6%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Design Received Date</th>
                                                    <th width="8%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Job Position</th>
                                                    <th width="6%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Duration</th>
                                                    <th width="6%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Delivered Date</th>

                                                </tr>    
                                            </thead>
                                            {completedItems.map((item, index) =>
                                            <Fragment>
                                                
                                            <tbody>
                                                <>
                                                                    <tr key={index}>
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
                                                                    </tr>
                                                                
                                                                </>
                                                            
                                                
                                            </tbody>
                                            </Fragment>)}
                                            
                                            
                                                                    <tr> 
                                                                        <th colspan="7" style={{fontSize:"12px",fontWeight:'bold'}}>Total Finished:</th>                                                                               
                                                                        <th style={{fontSize:"12px",fontWeight:'bold'}}>{FinishingCylinderQtyTotal}</th>                                                                                 
                                                                        <th style={{fontSize:"12px",fontWeight:'bold'}}>{FinishingSurfaceTotal}</th>
                                                                        <th></th>  
                                                                        <th></th>  
                                                                        <th></th>  
                                                                        <th></th>   
                                                                    </tr>
                                                                    
                                                                
                                            </table>
                                            </>
                                             }

                                            
                                           </div>
                                           
                                           )
                                            
                                            }) : null}
                                            </div>


                                            <div>
                                            <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                            
                                            
                                            
                                                
                                            <tbody>  
                                            <tr> 
                                                                        <th colSpan='9' style={{fontSize:"12px",fontWeight:'bold'}}>Grand Total:</th>
                                                                                                                                                                                                
                                                                         
                                                                        <th style={{fontSize:"12px",fontWeight:'bold'}}>{grandCylinderTotal}</th>                                                                                 
                                                                        <th style={{fontSize:"12px",fontWeight:'bold'}}>{grandSurfaceTotal}</th>
                                                                        
                                                                        
                                                                          
                                                                    </tr>
                                                                    
                                            </tbody>
                                            
                                            
                                            
                                                                    
                                                                
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