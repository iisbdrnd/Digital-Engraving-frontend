import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader';
import {DEALER_WISE_JOB_FLOW_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [dailyProductions, setDailyProductions] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [groupByClient, setGroupByClient] = useState([]);
    const [jobOrders,setJobOrders] = useState([]);
    const [grandCylinderTotal,setGrandCylinderTotal] = useState([]);
    const [grandSurfaceTotal,setGrandSurfaceTotal] = useState([]);
    
    const tableStyle = {
        "margin" : "2% 1% 2% 0%"
    }
    const fromDate = props.match.params.fromDate;
    const toDate = props.match.params.toDate;
    const oneDay = 24 * 60 * 60 * 1000;
    useEffect(()=>{
        userGetMethod(`${DEALER_WISE_JOB_FLOW_REPORT}?fromDate=${fromDate}&&toDate=${toDate}`) 
        .then(response => {
            // console.log('response', response.data);
            setJobOrders(response.data.job_orders)
            // setDailyProductions(response.data.dailyProductions);
            // setEmployees(response.data.employees);
            // setGrandTotals(response.data.grand_totals);
            setIsLoading(false);
        })
        .catch(error => console.log(error))
    }, []);

    useEffect(() =>{
        if (jobOrders.length > 0) {
            const groupByClient = (data) => {
                const groupedData = data.reduce((result, item) => {
                  const clientId = item.employee_id;
                  const clientName = item.employee_name;

                if (!result[clientId]) {
                    result[clientId] = [];
                  }
              
                //   result[clientId].push(item,clientName);
                result[clientId].push({ ...item, client_name: clientName})
                  return result;
                }, {});

                const groupedArray = Object.entries(groupedData).map(([clientId, items]) => ({
                    
                    employee_id: Number(clientId),
                    employee_name: items[0].employee_name,
                    
                  items,
                }));
            //   console.log(groupedArray)
                return groupedArray;
              };
              
              const groupedByClientId = groupByClient(jobOrders);
              setGroupByClient(groupedByClientId);




              console.log(groupedByClientId);
        }
    },[jobOrders]);


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


    // console.log(grandCylinderTotal)
    // console.log(grandSurfaceTotal)
    
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
                                            <h5>{'Production Report Details - '+fromDate+' to '+toDate}</h5>
                                        </div>
                                        <Fragment>
                                            <div className="">
                                                {groupByClient.length > 0 ? groupByClient.map((item,key)=>
                                                { 
                                                    const items = item?.items || [];
                                                    const totalNew = items.reduce((total, item) => total + (item.new_qty || 0), 0);
                                                    const totalRemake = items.reduce((total, item) => total + (item.remake_qty || 0), 0);
                                                    const totalRedo = items.reduce((total, item) => total + (item.redo_qty ||0), 0);
                                                    const grandTotalCyl = items.reduce((total, item) => total + (item.total_cylinder_qty || 0), 0);
                                                    const GrandTotalSA = items.reduce((total, item) => total + (item.total_surface_area || 0), 0);
                                                    const billableSATotal = items.reduce((total, item) => total + (item.billable_cyl || 0), 0);
                                                    const billableCylTotal = items.reduce((total, item) => total + (item.billable_surface_area || 0), 0);
                                                    const totalDcRcQty = items.reduce((total, item) => total + (item.dc_rc_qty || 0), 0);
                                                    const totalCancelCyl = items.reduce((total, item) => total + (item.cancel_quantity || 0), 0);
                                                    return(
                                                    <div>
                                                        <h4 className='mt-3'>Employee Name: {item.employee_name}</h4>
                                                        <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                    <thead>    
                                                        <tr style={{backgroundColor:"#d7d4d4"}}>
                                                            <th width= "8%" align="center" style={{fontSize: "14px", fontWeight: "bold"}}>Client Name</th>
                                                            <th width= "8%" align="center" style={{fontSize: "14px", fontWeight: "bold"}}>Printer Name</th>
                                                            <th width= "8%" align="center" style={{fontSize: "14px", fontWeight: "bold"}}>Percentage Qty</th>
                                                            <th width= "8%" align="center" style={{fontSize: "14px", fontWeight: "bold"}}>Percentage S.A</th>
                                                            <th width= "8%" align="center" style={{fontSize: "14px", fontWeight: "bold"}}>New</th>
                                                            <th width= "8%" align="center" style={{fontSize: "14px", fontWeight: "bold"}}>Remake</th>
                                                            <th width= "8%" align="center" style={{fontSize: "14px", fontWeight: "bold"}}>Redo</th>
                                                            <th width= "8%" align="center" style={{fontSize: "14px", fontWeight: "bold"}}>DC/RC</th>
                                                            <th width= "8%" align="center" style={{fontSize: "14px", fontWeight: "bold"}}>Total Cyl</th>
                                                            <th width="12%" align="center" style={{fontSize: "14px", fontWeight: "bold"}}>Total S.A.</th>
                                                            <th width= "8%" align="center" style={{fontSize: "14px", fontWeight: "bold"}}>Billable Cyl</th>
                                                            <th width= "8%" align="center" style={{fontSize: "14px", fontWeight: "bold"}}>Billable S.A.</th>
                                                            <th width= "8%" align="center" style={{fontSize: "14px", fontWeight: "bold"}}>Cancel Qty</th>
                                                               
                                                        </tr>    
                                                    </thead>
                                                    <tbody>
                                                        {item?.items.length > 0 ? 
                                                            item?.items.map((employee)=>(
                                                               
                                                                    <>
                                                                        <tr>
                                                                            
                                                                            <td style={{fontSize: "12px", fontWeight: "bold"}}>{employee.client_name}</td>
                                                                                <td style={{fontSize: "12px", fontWeight: "bold"}}>{employee.printer_name}</td>
                                                                                <td style={{fontSize: "12px", fontWeight: "bold"}}>{parseFloat((employee.total_cylinder_qty/grandCylinderTotal) * 100).toFixed(2)}%</td>
                                                                                <td style={{fontSize: "12px", fontWeight: "bold"}}>{parseFloat((employee.total_surface_area / grandSurfaceTotal) * 100).toFixed(2)}%</td>
                                                                                <td style={{fontSize: "12px", fontWeight: "bold"}}>{employee.new_qty}</td>
                                                                                <td style={{fontSize: "12px", fontWeight: "bold"}}>{employee.remake_qty}</td>
                                                                                <td style={{fontSize: "12px", fontWeight: "bold"}}>{employee.redo_qty}</td>
                                                                                <td style={{fontSize: "12px", fontWeight: "bold"}}>{employee.dc_rc_qty}</td>
                                                                                <td style={{fontSize: "12px", fontWeight: "bold"}}>{employee.total_cylinder_qty}</td>
                                                                                <td style={{fontSize: "12px", fontWeight: "bold"}}>{employee.total_surface_area}</td>
                                                                                <td style={{fontSize: "12px", fontWeight: "bold"}}>{employee.billable_cyl}</td>
                                                                                <td style={{fontSize: "12px", fontWeight: "bold"}}>{employee.billable_surface_area}</td>
                                                                                <td style={{fontSize: "12px", fontWeight: "bold"}}>{employee.cancel_quantity}</td>
                                                                            {/* <th>
                                                                                ddd
                                                                                 {
                                                                                    Math.round(employee.total.map((data)=>((data.total_cylinder_qty*100))) / grandTotals.map((grandTotal)=>((grandTotal.total_cylinder_qty))))
                                                                                }% (Qty) 
                                                                            </th>
                                                                            <th>
                                                                                adf
                                                                                {
                                                                                    Math.round(employee.total.map((data)=>((data.total_surface_area*100))) / grandTotals.map((grandTotal)=>((grandTotal.total_surface_area))))
                                                                                }% (Surface Area) 
                                                                            </th> */}
                                                                        </tr>
                                                                        
                                                                           
                                                                                
                                                                           
                                                                        
                                                
                                                                        {/* {jobOrders.map((job)=>( 
                                                                            <tr>
                                                                                <td>{job.client_name}</td>
                                                                                <td>{job.printer_name}</td>
                                                                                <td>{job.new_qty}</td>
                                                                                <td>{job.remake_qty}</td>
                                                                                <td>{job.redo_qty}</td>
                                                                                <td>{job.dc_rc_qty}</td>
                                                                                <td>{job.total_cylinder_qty}</td>
                                                                                <td>{job.total_surface_area}</td>
                                                                                <td>{job.billable_cyl}</td>
                                                                                <td>{job.billable_surface_area}</td>
                                                                                <td>{job.cancel_quantity}</td>
                                                                            </tr>
                                                                        ))} */}
                                                                        {/* {jobOrders.map((data)=>(
                                                                            <tr>
                                                                                <th colspan="2">Total</th>
                                                                                <th>{data.new_qty}</th>
                                                                                <th>{data.remake_qty}</th>
                                                                                <th>{data.redo_qty}</th>
                                                                                <th>{data.dc_rc_qty}</th>                                                                                 
                                                                                <th>{data.total_cylinder_qty}</th>                                                                                 
                                                                                <th>{data.total_surface_area}</th>  
                                                                                <th>{data.billable_cyl}</th>  
                                                                                <th>{data.billable_surface_area}</th>  
                                                                                <th>{data.cancel_quantity}</th>  
                                                                            </tr>
                                                                        ))} */}
                                                                    </>
                                                                
                                                            ))
                                                        : null
                                                        }
                                                         <>
                                                            
                                                                    <tr>  
                                                                        
                                                                        <th style={{paddingLeft:'6px',fontSize: "14px", fontWeight: "bold", textAlign:"right"}} colspan="2">Sub Total</th>
                                                                        
                                                                        <th style={{paddingLeft:'6px',fontSize: "14px", fontWeight: "bold"}}>{parseFloat((grandTotalCyl/grandCylinderTotal) * 100).toFixed(2)} %</th>
                                                                        <th style={{paddingLeft:'6px',fontSize: "14px", fontWeight: "bold"}}>{parseFloat((GrandTotalSA / grandSurfaceTotal) * 100).toFixed(2)} %</th>
                                                                        <th style={{paddingLeft:'6px',fontSize: "14px", fontWeight: "bold"}}>{totalNew}</th>
                                                                        <th style={{paddingLeft:'6px',fontSize: "14px", fontWeight: "bold"}}>{totalRemake}</th>
                                                                        <th style={{paddingLeft:'6px',fontSize: "14px", fontWeight: "bold"}}>{totalRedo}</th>
                                                                        <th style={{paddingLeft:'6px',fontSize: "14px", fontWeight: "bold"}}>{totalDcRcQty}</th>                                                                                 
                                                                        <th style={{paddingLeft:'6px',fontSize: "14px", fontWeight: "bold"}}>{grandTotalCyl}</th>                                                                                 
                                                                        <th style={{paddingLeft:'6px',fontSize: "14px", fontWeight: "bold"}}>{parseFloat(GrandTotalSA).toFixed(2)}</th>  
                                                                        <th style={{paddingLeft:'6px',fontSize: "14px", fontWeight: "bold"}}>{billableSATotal}</th>  
                                                                        <th style={{paddingLeft:'6px',fontSize: "14px", fontWeight: "bold"}}>{parseFloat(billableCylTotal).toFixed(2)}</th>  
                                                                        <th style={{paddingLeft:'6px',fontSize: "14px", fontWeight: "bold"}}>{totalCancelCyl}</th>  
                                                                    </tr>
                                                            
                                                        </>  
                                                    </tbody>
                                                </table>
                                                    </div>
                                                )}) : null}
                                                {/* <div className="footerCalculation col-md-12">
                                                    <table>
                                                        {grandTotals.length > 0 ? 
                                                            grandTotals.map((grandTotal, key)=>(
                                                                <>
                                                                    <tr>
                                                                        <td>Billable Cylinder:  {grandTotal.billable_cylinder}</td>
                                                                    </tr>
                                                                
                                                                    <tr>
                                                                        <td>Total Work Load: {grandTotal.total_cyl_qty}</td>
                                                                    </tr> 
                                                                </>
                                                            ))
                                                        : null
                                                        }
                                                    </table>
                                                </div> */}
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