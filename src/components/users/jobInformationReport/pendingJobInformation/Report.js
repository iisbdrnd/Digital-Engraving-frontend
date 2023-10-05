import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader';
import {PENDING_JOB_INFORMATION_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [employees, setEmployees] = useState([]);
    const [jobOrders, setJobOrders] = useState([]);
    const [groupByClient,setGroupByClient] = useState([]);
    
    const tableStyle = {
        "margin" : "2% 1% 2% 0%"
    }
    const fromDate = props.match.params.fromDate;
    const toDate = props.match.params.toDate;
    const employeeId = props.match.params.employeeId;
    const oneDay = 24 * 60 * 60 * 1000;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '/' + mm + '/' + dd;
    useEffect(()=>{
        userGetMethod(`${PENDING_JOB_INFORMATION_REPORT}?fromDate=${fromDate}&&toDate=${toDate}&&employeeId=${employeeId}`) 
        .then(response => {
            console.log('response', response.data);
            setJobOrders(response.data.job_orders);
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

    const styleRow = {
        fontSize: "15px",
        fontWeight: "bold"
    }
    const styleColumn = {
        fontSize: "12px",
        fontWeight: "bold"
    }
    
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
                                            <h5>{'Pending Job Information Report - '+fromDate+' to '+toDate}</h5>
                                        </div>
                                        <Fragment>
                                            <div className="row">
                                                {groupByClient.length > 0 ? groupByClient.map((item,key)=>{
                                                    const items = item?.items || [];
                                                    const totalQyt = items.reduce((total, item) => total + (item.total_cylinder_qty || 0), 0);
                                                    return( 
                                                    <>
                                                    <div>
                                                        <h4>Employee Name: {item.employee_name}</h4>
                                                    </div>
                                                    <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                    <thead>    
                                                        <tr style={{backgroundColor:"#d7d4d4"}}>
                                                            <th style={styleRow} width="6%" align="center">Aggrement Date</th>
                                                            <th style={styleRow} width="6%" align="center">Job No</th>
                                                            <th style={styleRow} width="8%" align="center">Job Name</th>
                                                            <th style={styleRow} width="8%" align="center">Client Name</th>
                                                            <th style={styleRow} width="6%" align="center">Status</th>
                                                            <th style={styleRow} width="6%" align="center">Size</th>
                                                            <th style={styleRow} width="6%" align="center">Cyl</th>
                                                            <th style={styleRow} width="6%" align="center">Duration</th>
                                                            <th style={styleRow} width="6%" align="center">Base Date</th>
                                                            <th style={styleRow} width="6%" align="center">Design Date</th>
                                                        </tr>    
                                                    </thead>
                                                    <tbody>
                                                        {item?.items.length > 0 ? 
                                                            item?.items.map((employee)=>(
                                                                
                                                                    <>
                                                                        {/* <tr>
                                                                            <th colSpan="13" >{employee.name}</th>
                                                                        </tr> */}
                                                
                                                                         
                                                                            <tr>
                                                                                <td style={styleColumn}>{employee.agreement_date}</td>
                                                                                <td style={styleColumn}>{employee.job_no}</td>
                                                                                <td style={styleColumn}>{employee.job_name}</td>
                                                                                <td style={styleColumn}>{employee.client_name}</td>
                                                                                <td style={styleColumn}>{employee.job_type}</td>
                                                                                <td style={styleColumn}>{employee.face_length}x{employee.circumference}</td>
                                                                                <td style={styleColumn}>{employee.total_cylinder_qty}</td>
                                                                                <td style={styleColumn}>{Math.round(Math.abs((new Date(employee.agreement_date) - new Date(today)) / oneDay))}</td>
                                                                                <td style={styleColumn}>{employee.base_date}</td>
                                                                                <td style={styleColumn}>{employee.design_date}</td>
                                                                            </tr>
                                                                        
                                                                        {/* {employee.total.map((data)=>(
                                                                            <tr> 
                                                                                <th colspan="6">Total</th>                                                                               
                                                                                <th>{data.total_cylinder_qty}</th> 
                                                                            </tr>
                                                                        ))} */}
                                                                    </>
                                                               
                                                            ))
                                                        : null
                                                        }

                                                                            <tr > 
                                                                                <th style={{paddingLeft:"6px" ,fontSize:"14px", fontWeight:"bold",textAlign:"right" }} colspan="6">Total</th>                                                                               
                                                                                <th style={{paddingLeft:"6px",fontSize:"14px", fontWeight:"bold"}}>{totalQyt}</th> 
                                                                            </tr>
                                                    </tbody>
                                                </table>
                                                    </>)
                                                }): null}
                                               
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