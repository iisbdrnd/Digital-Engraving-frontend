import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader';
import {ANALYTICAL_JOB_INFORMATION_PRINTER_WISE_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [printers, setprinters] = useState([]);
    const [groupByClient, setGroupByClient] = useState([]);
    
    const tableStyle = {
        "margin" : "1% 1% 2% 0%"
    }

    const headerStyle = {fontSize : "15px", fontWeight : "bold", backgroundColor : "#A5A4A3"}
    const totalStyle = {fontSize : "15px", fontWeight : "bold", padding : "6px 8px"}
    const bodyStyle = {fontSize : "13px", fontWeight : "bold"}


    const fromDate = props.match.params.fromDate;
    const toDate = props.match.params.toDate;
    const printerId = props.match.params.printerId;
    const oneDay = 24 * 60 * 60 * 1000;
    useEffect(()=>{
        userGetMethod(`${ANALYTICAL_JOB_INFORMATION_PRINTER_WISE_REPORT}?fromDate=${fromDate}&&toDate=${toDate}&&printerId=${printerId}`) 
        .then(response => {
            console.log('response', response.data);
            setprinters(response.data.job_orders);
            setIsLoading(false);
        })
        .catch(error => console.log(error))
    }, []);
    useEffect(() =>{
        if (printers.length > 0) {
            const groupByClient = (data) => {
                const groupedData = data.reduce((result, item) => {
                  const printerId = item.printer_id;
                  const printer_name = item.printer_name;

                if (!result[printerId]) {
                    result[printerId] = [];
                  }
              
                //   result[clientId].push(...item,clientName);
                result[printerId].push({ ...item,printer_name})
                  return result;
                }, {});

                const groupedArray = Object.entries(groupedData).map(([printerId, items]) => ({
                    
                    printer_id: Number(printerId),
                    printer_name: items[0].printer_name,
                    
                  items,
                }));
            //   console.log(groupedArray)
                return groupedArray;
              };
              
              const groupedByClientId = groupByClient(printers);
              setGroupByClient(groupedByClientId);
        }
    },[printers]);


    // console.log(groupByClient)
    
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
                                            <h5>{'Analytical Job Information Printer Wise Report - '+fromDate+' to '+toDate}</h5>
                                        </div>
                                        <Fragment>
                                            <div className="row">
                                                {groupByClient.length > 0 ? groupByClient.map((item,key)=>{
                                                    const items = item?.items || [];
                                                    const totalQyt = items.reduce((acc,item) => acc + item.total_cylinder_qty,0);
                                                    const totalSurfaceArea = items.reduce((acc,item) => acc + item.total_surface_area,0);
                                                    // console.log(items)
                                                    return(
                                                        <>
                                                        <div>
                                                            <h4>Printer Name : {item.printer_name}</h4>
                                                        </div>
                                                        <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                        <thead>    
                                                        <tr>
                                                            <th style={headerStyle} width="6%" align="center">Aggrement Date</th>
                                                            <th style={headerStyle} width="6%" align="center">Job No</th>
                                                            <th style={headerStyle} width="20%" align="center">Job Name</th>
                                                            <th style={headerStyle} width="8%" align="center">Req/PO No</th>
                                                            <th style={headerStyle} width="11%" align="center">Printer</th>
                                                            <th style={headerStyle} width="6%" align="center">Status</th>
                                                            <th style={headerStyle} width="6%" align="center">Size</th>
                                                            <th style={headerStyle} width="6%" align="center">Cyl</th>
                                                            <th style={headerStyle} width="6%" align="center">Surface Area</th>
                                                            <th style={headerStyle} width="6%" align="center">Design Received Date</th>
                                                            <th style={headerStyle} width="7%" align="center">Job Position</th>
                                                            <th style={headerStyle} width="6%" align="center">Duration</th>
                                                            <th style={headerStyle} width="6%" align="center">Delivered Date</th>

                                                        </tr>    
                                                    </thead>
                                                    <tbody>
                                                        {items.length > 0 ? 
                                                            items.map((printer)=>(
                                                                
                                                                    <>
                                                                       
                                                
                                                                        
                                                                            <tr>
                                                                                <td style={bodyStyle}>{printer.agreement_date}</td>
                                                                                <td style={bodyStyle}>{printer.job_no}</td>
                                                                                <td style={bodyStyle}>{printer.job_name}</td>
                                                                                <td style={bodyStyle}></td>
                                                                                <td style={bodyStyle}>{printer.printer_name}</td>
                                                                                <td style={bodyStyle}>{printer.job_type}</td>
                                                                                <td style={bodyStyle}>{printer.face_length}x{printer.circumference}</td>
                                                                                <td style={bodyStyle}>{printer.total_cylinder_qty}</td>
                                                                                <td style={bodyStyle}>{printer.total_surface_area}</td>
                                                                                <td style={bodyStyle}>{printer.design_rcv_date}</td>
                                                                                <td style={bodyStyle}>{printer.bill_status==1?'Finished':'Pending'}</td>
                                                                                <td style={bodyStyle}>{printer.bill_date != null ? Math.round(Math.abs((new Date(printer.design_rcv_date) - new Date(printer.bill_date)) / oneDay)):'N/A'}</td>
                                                                                <td style={bodyStyle}>{printer.bill_date}</td>
                                                                            </tr>
                                                                       


                                                                        
                                                                    </>
                                                                
                                                            ))
                                                        : null
                                                        }
                                                    </tbody>
                                                    
                                                                            <tr> 
                                                                                <th colspan="7" style={totalStyle}>Total</th>                                                                               
                                                                                <th style={totalStyle}>{totalQyt}</th>                                                                                 
                                                                                <th style={totalStyle}>{totalSurfaceArea.toFixed(2)}</th>  
                                                                            </tr>
                                                                        
                                                </table>
                                                        </>
                                                    )
                                                }) : null}
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