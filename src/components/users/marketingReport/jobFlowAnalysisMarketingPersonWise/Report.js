import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader';
import {JOB_FLOW_ANALYSIS_MARKETING_PERSON_WISE_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [employees, setEmployees] = useState([]);
    const [groupByClient, setGroupByClient] = useState([]);
    
    const tableStyle = {
        "margin" : "2% 1% 2% 0%"
    }
    const headerStyle = {fontSize : "15px", fontWeight : "bold", backgroundColor : "#A5A4A3"}
    const totalStyle = {fontSize : "15px", fontWeight : "bold", padding : "6px 8px"}
    const bodyStyle = {fontSize : "13px", fontWeight : "bold"}
    const fromDate = props.match.params.fromDate;
    const toDate = props.match.params.toDate;
    const employeeId = props.match.params.employeeId;
    useEffect(()=>{
        userGetMethod(`${JOB_FLOW_ANALYSIS_MARKETING_PERSON_WISE_REPORT}?fromDate=${fromDate}&&toDate=${toDate}&&employeeId=${employeeId}`) 
        .then(response => {
            console.log('response', response.data);
            setEmployees(response.data.job_orders);
            setIsLoading(false);
        })
        .catch(error => console.log(error))
    }, []);

    useEffect(() =>{
        if (employees.length > 0) {
            const groupByClient = (data) => {
                const groupedData = data.reduce((result, item) => {
                  const clientId = item.employee_id;
                  const employee_name = item.employee_name;

                if (!result[clientId]) {
                    result[clientId] = [];
                  }
              
                //   result[clientId].push(...item,clientName);
                result[clientId].push({ ...item,employee_name})
                  return result;
                }, {});

                const groupedArray = Object.entries(groupedData).map(([clientId, items]) => ({
                    
                    client_id: Number(clientId),
                    employee_name: items[0].employee_name,
                    
                  items,
                }));
            //   console.log(groupedArray)
                return groupedArray;
              };
              
              const groupedByClientId = groupByClient(employees);
              setGroupByClient(groupedByClientId);
        }
    },[employees]);
    console.log(groupByClient)
    
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
                                            <h5>{'Job Flow Analysis Report Marketing Person Wise - '+fromDate+' to '+toDate}</h5>
                                        </div>
                                        <Fragment>
                                            <div className="row">
                                                {groupByClient.length > 0 ? 
                                                groupByClient.map((item,key)=>{
                                                    const items = item?.items || [];
                                                    const totalQyt = items.reduce((acc,current) => acc + parseInt(current.total_cylinder_qty),0);
                                                    const totalSurfaceArea = items.reduce((acc,current) => acc + parseFloat(current.surface_area),0);
                                                   
                                                    return(
                                                    <>
                                                    <div>
                                                        <h3>Employee Name: {item.employee_name}</h3>
                                                    </div>
                                                    <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                    <thead>    
                                                        <tr>
                                                            <th width="15%" align="center" style={headerStyle}>Client Name</th>
                                                            <th width="15%" align="center" style={headerStyle}>Printer Name</th>
                                                            <th width="15%" align="center" style={headerStyle}>Marketing Person</th>
                                                            <th width="10%" align="center" style={headerStyle}>Cylinder</th>
                                                            {/* <th width="10%" align="center">Times</th> */}
                                                            <th width="10%" align="center" style={headerStyle}>Surface Area</th>      
                                                        </tr>    
                                                    </thead>
                                                    <tbody>
                                                        {items.length > 0 ? 
                                                            items.map((employee)=>(
                                                                    <>
                                                                        {/* <tr>
                                                                            <th colSpan="5" style={headerStyle}>{employee.name}</th>
                                                                        </tr> */}
                                                
                                                                        
                                                                            <tr>
                                                                                <td style={bodyStyle}>{employee.client_name}</td>
                                                                                <td style={bodyStyle}>{employee.printer_name}</td>
                                                                                <td style={bodyStyle}>{employee.employee_name}</td>
                                                                                <td style={bodyStyle}>{employee.total_cylinder_qty}</td>
                                                                                <td style={bodyStyle}>{employee.surface_area}</td>
                                                                            </tr>
                                                                       
                                                                        
                                                                    </>
                                                                
                                                            ))
                                                        : null
                                                        }
                                                    </tbody>
                                                    
                                                                            <tr>
                                                                                <th colspan="3" style={totalStyle} className="text-right">Total</th>                                                                                
                                                                                <th style={totalStyle}>{totalQyt}</th>
                                                                                <th style={totalStyle}>{totalSurfaceArea.toFixed(2)}</th>
                                                                            </tr>
                                                                        
                                                </table>
                                                    </>
                                                    )
                                                })
                                                :
                                                null}
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