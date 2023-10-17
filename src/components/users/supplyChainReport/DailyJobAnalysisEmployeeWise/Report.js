import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader'
import { CLIENT_WISE_ACCOUNT_STATEMENT_REPORT, DAILY_JOB_ANALYSIS_EMPLOYEE_WISE_REPORT } from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import '../ClientWiseBillInformation/style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [jobOrders, setJobOrders] = useState([]);
    const [openingBallance, setOpeningBallance] = useState([]);
    const [clientInfo, setClientInfo] = useState([]);
    const [groupByClient, setGroupByClient] = useState([]);
    
    const tableStyle = {
        "margin" : "2% 1% 2% 0%"
    }
    // console.log(props.match.params)
    const fromDate = props.match.params.fromDate;
    const toDate = props.match.params.toDate;
    const employee_id = props.match.params.employeeId;
    
    useEffect(()=>{
        userGetMethod(`${DAILY_JOB_ANALYSIS_EMPLOYEE_WISE_REPORT}?fromDate=${fromDate}&&toDate=${toDate}&&employeeId=${employee_id}`) 
        .then(response => {
            console.log('response', response.data);
            setJobOrders(response.data.job_orders);
            // setOpeningBallance(response.data.opening_balance);
            // setClientInfo(response.data.client);
            setIsLoading(false);
        })
        .catch(error => console.log(error))
    }, []);
    
    // const initialData = [
    //     {id: 1, total_cyl : 1000},
    //     {id: 2, total_cyl : 1000},
    //     {id: 3, total_cyl : 1000},
    //     {id: 4, total_cyl : 1000},
    //   ];
    //   const [data, setData] = useState(initialData);
    //   const [preStore_cyl_total, setPreStore_cyl_total] = useState(6000);
      
    //   const updatedPreStoreTotal = data.reduce(
    //     (accumulator, item) => {
    //       return accumulator - parseInt(item.total_cyl)
          
    //   },
    //     preStore_cyl_total
    //   );

    // useEffect(() => {
    //     const updatedPreStoreTotal = data.reduce(
    //         (accumulator, item) => {
    //             const result = accumulator + parseInt(item.total_cyl)
    //             return result    
    //         },
    //         0
    //       );
    //         const updateTotal  = preStore_cyl_total - updatedPreStoreTotal;
    //     console.log(updateTotal)
    //       console.log(updatedPreStoreTotal);
    //       // Update state only if the value has changed
    //       if (updatedPreStoreTotal !== preStore_cyl_total) {
    //         setPreStore_cyl_total(updatedPreStoreTotal);
    //       }
    //   }, [data]);

      
    //   console.log(preStore_cyl_total);

    useEffect(() =>{
        if (jobOrders.length > 0) {
            const groupByClient = (data) => {
                const groupedData = data.reduce((result, item) => {
                  const employeeId = item.employee_id;
                  const employeeName = item.employee_name;

                if (!result[employeeId]) {
                    result[employeeId] = [];
                  }
              
                //   result[clientId].push(...item,clientName);
                result[employeeId].push({ ...item, employee_name: employeeName})
                  return result;
                }, {});

                const groupedArray = Object.entries(groupedData).map(([employeeId, items]) => ({
                    
                    employeeId: Number(employeeId),
                    employee_name: items[0].employee_name,
                    
                  items,
                }));
            
                return groupedArray;
              };
              
              const groupedByClientId = groupByClient(jobOrders);
              setGroupByClient(groupedByClientId);
        }
    },[jobOrders]);
    // console.log(groupByClient)

    const result = jobOrders.reduce((acc,item)=>{
        const value = acc + item.total_surface_area;
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
                                            <h5>{'Date Range - '+fromDate+' to '+toDate}</h5>
                                        </div>
                                        <Fragment>
                                            <div className="">
                                            {groupByClient.length > 0 ? groupByClient.map((item,key) => {
                                                const items = item?.items || [];
                                                // console.log(items)
                                                const uniqueNames = {};
                                                const uniquePrinterNames = {};


                                                // Filter the array to get unique names
                                                const uniqueData = items.filter((item) => {
                                                    // Check if the name is already present in the uniqueNames object
                                                    // If it's not present, add it to the object and return true
                                                    if (!uniqueNames[item.client_name]) {
                                                    uniqueNames[item.client_name] = true;
                                                    return true;
                                                    }

                                                    if (!uniquePrinterNames[item.printer_name]) {
                                                        uniquePrinterNames[item.printer_name] = true;
                                                        return true;
                                                        }

                                                    // If the name is already present, return false
                                                    return false;
                                                });
                                                const uniqueClientNames = Object.keys(uniqueNames);
                                                const uniquePrinterNamesList = Object.keys(uniquePrinterNames);
                                                const times = items.length;
                                                // console.log(uniqueData)
                                                // console.log(uniqueClientNames)
                                                // console.log(uniquePrinterNamesList)
                                                 
                                                //   =====Pending Section Total Sum
                                                    const totalCylinder= items.reduce((total, item) => total + (item.total_cylinder_qty || 0), 0);
                                                 
                                                    const getValue = items.reduce((total, item) => total + (item.total_surface_area || 0), 0);
                                                    const SurfaceTotal = parseFloat(getValue).toFixed(2)
                                                    // // =====Finishing section total
                                                    // const FinishingSurfaceTotal = completedItems.reduce((total, item) => total + (item.total_surface_area || 0), 0);
                                                    // const FinishingCylinderQtyTotal = completedItems.reduce((total, item) => total + (item.total_cylinder_qty || 0), 0);

                                           return(
                                            
                                            <div key={key}>
                                           
                                            <h3>Client Name: {item.employee_name}</h3>
                                            <>
                                            
                                            <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                            <thead>    
                                                <tr style={{backgroundColor: '#c9c5c7'}}>
                                                    <th width="20%" align="center" style={{fontSize:"15px",fontWeight:'bold'}}>Client Name</th>
                                                    <th width="20%" align="center" style={{fontSize:"15px",fontWeight:'bold'}}>Printer</th>
                                                    <th width="20%" align="center" style={{fontSize:"15px",fontWeight:'bold'}}>Times</th>
                                                    <th width="20%" align="center" style={{fontSize:"15px",fontWeight:'bold'}}>Cyl</th>
                                                    <th width="20%" align="center" style={{fontSize:"15px",fontWeight:'bold'}}>Surface Area</th>
                                                   

                                                </tr>    
                                            </thead>
                                            {items.length > 0 && <> 
                                                <tbody>
                                                    <>
                                                                        <tr>
                                                                            <td style={{fontSize:"12px",fontWeight:'bold'}}>
                                                                                {uniqueClientNames.map((item,index)=>(
                                                                                    <span key={index}>{item}</span>
                                                                                ))},
                                                                            </td>
    
                                                                            <td style={{fontSize:"12px",fontWeight:'bold'}}>{uniquePrinterNamesList.map((item,index)=>(<span key={index}>{item}</span>))},</td>
    
                                                                            <td style={{fontSize:"12px",fontWeight:'bold'}}>{times}</td>
    
                                                                            <td style={{fontSize:"12px",fontWeight:'bold'}}>{totalCylinder}</td>
    
                                                                            <td style={{fontSize:"12px",fontWeight:'bold'}}>{SurfaceTotal}</td>
                                                                            
                                                                            
                                                                        </tr>
                                                                    
                                                                    </>
                                                                
                                                    
                                                </tbody>
                                                
                                            </>}
                                            
                                            
                                                                    {/* <tr> 
                                                                        <th colspan="7" style={{fontSize:"12px",fontWeight:'bold'}}>Total Finished:</th>                                                                               
                                                                        <th style={{fontSize:"12px",fontWeight:'bold'}}>{FinishingCylinderQtyTotal}</th>                                                                                 
                                                                        <th style={{fontSize:"12px",fontWeight:'bold'}}>{FinishingSurfaceTotal}</th>
                                                                        <th></th>  
                                                                        <th></th>  
                                                                        <th></th>  
                                                                        <th></th>   
                                                                    </tr> */}
                                                                    
                                                                
                                            </table>
                                            </> </div>
                                           
                                           )
                                            
                                            }) : null}
                                            </div>


                                            <div>
                                            <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                            
                                            
                                            
                                                
                                            <tbody>  
                                                    <tr>
                                                    
                                                    <th colSpan='12' style={{fontSize:"12px",fontWeight:'bold'}}>Grand total Surface:</th>
                                                    <th style={{fontSize:"12px",fontWeight:'bold'}}>{result.toFixed(2)}</th>                                                                                 
                                                    
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