import React, { Fragment , useEffect, useState } from 'react';
import ReportHeader from './ReportHeader';
import {DESIGN_FILE_TO_FACTORY_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [orderTypes, setOrderTypes] = useState([]);
    const [grandTotalCylinder, setGrandTotalCyl] = useState([]);
    const [grandTotalSurfaceArea, setGrandTotalSurfaceArea] = useState([]);
    
    const [jobOrders,setJobOrders] = useState([]);

    const tableStyle = {
        // "border" : "1px solid #ccc",
        "margin" : "2% 1% 2% 0%"
    }
    const tableRow = {fontSize: "16px",fontWeight: "bold"}
    useEffect(()=>{
        const fromDate = props.match.params.fromDate;
        const toDate = props.match.params.toDate;
        console.log('param fromDate', fromDate, toDate);

        userGetMethod(`${DESIGN_FILE_TO_FACTORY_REPORT}?fromDate=${fromDate}&&toDate=${toDate}`)
        .then(response => {
            console.log('res', response.data);
            // setJorderTypes(response.data.orderTypes);
            setJobOrders(response.data.jobOrders);
            // setGrandTotalCyl(response.data.grandTotalCyl);
            // setGrandTotalSurfaceArea(response.data.grandTotalSurfaceArea);
            setIsLoading(false);
        })
        .catch(error => console.log(error))
    }, []);
    useEffect(() =>{
        if (jobOrders.length > 0) {
            const groupByClient = (data) => {
                const groupedData = data.reduce((result, item) => {
                //   const printerId = item.printer_id;
                  const jobTypes = item.job_type;

                if (!result[jobTypes]) {
                    result[jobTypes] = [];
                  }
              
                //   result[clientId].push(...item,clientName);
                result[jobTypes].push({ ...item,jobTypes})
                  return result;
                }, {});

                const groupedArray = Object.entries(groupedData).map(([jobTypes, items]) => ({
                    
                    // printer_id: Number(printerId),
                    jobTypeName: jobTypes,
                    
                  items,
                }));
            //   console.log(groupedArray)
                return groupedArray;
              };
              
              const groupedByClientId = groupByClient(jobOrders);
              setOrderTypes(groupedByClientId);
        }
    },[jobOrders]);
    console.log(orderTypes)

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className=""> 
                            <ReportHeader reportTitle="Design File to Factory" />

                            <div className="mainDiv" style={{"padding": "1% 5%"}}>
                            {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <div className="row">
                                        <table className="particulars table table-bordered table-stripped" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                            <thead className="groupFont">
                                                <tr style={{backgroundColor: "#ADA9A8"}}>
                                                    <th style={tableRow} width="10%" align="center">JobNo</th>
                                                    <th style={tableRow} width="15%" align="center">Agreement Date</th>
                                                    <th style={tableRow} width="20%" align="center">Job Name</th>
                                                    <th style={tableRow} width="10%" align="center">Client Name</th>
                                                    <th style={tableRow} width="10%" align="center">Printers Name</th>
                                                    <th style={tableRow} width="10%" align="center">Size(mm X mm)</th>
                                                    <th style={tableRow} width="5%" align="center">No Cyl</th>
                                                    <th style={tableRow} width="5%" align="center">Base Date</th>
                                                    <th style={tableRow} width="10%" align="center">Surface Area</th>
                                                    <th style={tableRow} width="10%" align="center">Remarks</th>
                                                </tr>
                                            </thead>
                                            <tbody className="reportBody">
                                            {
                                                orderTypes.length > 0 ? 
                                                <>
                                                    {orderTypes.map((orderType, index1) => 
                                                    {
                                                        const items = orderType.items || []
                                                        const totalCylinder = items.reduce((acc,current)=> acc + current.total_cylinder_qty,0);
                                                        const totalSurfaceArea = items.reduce((acc,current)=> acc + current.surface_area,0);
                                                        return (
                                                            <>
                                                                <tr key={index1}>
                                                                    <td colSpan="10" style={{fontSize:"15px",fontWeight:'bold'}}>{orderType.jobTypeName}</td>
                                                                </tr>
                                                                { orderType.items.length > 0 ? 
                                                                    orderType.items.map((jobOrder, index2) => (
                                                                        <tr key={index2}>
                                                                            <td style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrder.job_no}</td>
                                                                            <td style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrder.agreement_date}</td>
                                                                            <td style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrder.job_name}</td>
                                                                            <td style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrder.client_name}</td>
                                                                            <td style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrder.printer_name}</td>
                                                                            <td style={{fontSize:"13px",fontWeight:'bold'}}>{`${jobOrder.eye_mark_size_one} X ${jobOrder.eye_mark_size_one}`}</td>
                                                                            <td className="text-center" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrder.total_cylinder_qty}</td>
                                                                            <td></td>
                                                                            <td className="text-center" style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrder.surface_area}</td>
                                                                            <td style={{fontSize:"13px",fontWeight:'bold'}}>{jobOrder.remarks}</td>
                                                                        </tr>
                                                                    ))
                                                                    : <tr><td colSpan="10" className="text-center">No data found</td></tr>
                                                                }
                                                                
                                                                <tr className="groupFont">
                                                                    <td colSpan="5" style={{fontSize:"15px",fontWeight:'bold'}}>
                                                                        Total Number of Job: {orderType.items.length}
                                                                    </td>
                                                                    <td className="text-right" style={{fontSize:"15px",fontWeight:'bold'}}>
                                                                        Total
                                                                    </td>
                                                                    <td className="text-center" style={{fontSize:"15px",fontWeight:'bold'}}>
                                                                        {totalCylinder}
                                                                    </td>
                                                                    <td></td>
                                                                    <td className="text-center" style={{fontSize:"15px",fontWeight:'bold'}}>
                                                                        {totalSurfaceArea}
                                                                    </td>
                                                                    <td colSpan="2"></td>
                                                                </tr>
                                                            </>
                                                        )
                                                    }
                                                       
                                                    )}
                                                </>
                                                : <tr><td colSpan="10" className="text-center">No data found</td></tr>
                                            }
                                            </tbody>
                                        </table>
                                        {/* <table className="particulars table table-bordered table-stripped" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                            <tr className="groupFont">
                                                <td style={{fontSize:"15px",fontWeight:'bold'}}>Grand Total Cylinder: {grandTotalCylinder}</td>
                                                <td style={{fontSize:"15px",fontWeight:'bold'}}>Grand Total Surface Area: {grandTotalSurfaceArea}</td>
                                            </tr>
                                        </table> */}
                                    </div>
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