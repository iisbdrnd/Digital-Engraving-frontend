import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader'
import { CLIENT_WISE_ACCOUNT_STATEMENT_REPORT } from '../../../../api/userUrl'
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
    const clientCode = props.match.params.clientCode;
    const subsidiaryCode = props.match.params.subsidiaryCode;
    useEffect(()=>{
        userGetMethod(`${CLIENT_WISE_ACCOUNT_STATEMENT_REPORT}?fromDate=${fromDate}&&toDate=${toDate}&&clientCode=${clientCode}&&subsidiaryCode=${subsidiaryCode}`) 
        .then(response => {
            console.log('response', response.data);
            setJobOrders(response.data.job_orders);
            setOpeningBallance(response.data.opening_balance);
            setClientInfo(response.data.client);
            setIsLoading(false);
        })
        .catch(error => console.log(error))
    }, []);
    
    const initialData = [
        {id: 1, total_cyl : 1000},
        {id: 2, total_cyl : 1000},
        {id: 3, total_cyl : 1000},
        {id: 4, total_cyl : 1000},
      ];
      const [data, setData] = useState(initialData);
      const [preStore_cyl_total, setPreStore_cyl_total] = useState(6000);
      
    //   const updatedPreStoreTotal = data.reduce(
    //     (accumulator, item) => {
    //       return accumulator - parseInt(item.total_cyl)
          
    //   },
    //     preStore_cyl_total
    //   );

    useEffect(() => {
        const updatedPreStoreTotal = data.reduce(
            (accumulator, item) => {
                const result = accumulator + parseInt(item.total_cyl)
                return result    
            },
            0
          );
            const updateTotal  = preStore_cyl_total - updatedPreStoreTotal;
        console.log(updateTotal)
          console.log(updatedPreStoreTotal);
          // Update state only if the value has changed
          if (updatedPreStoreTotal !== preStore_cyl_total) {
            setPreStore_cyl_total(updatedPreStoreTotal);
          }
      }, [data]);

      
      console.log(preStore_cyl_total);

    // useEffect(() =>{
    //     if (employees.length > 0) {
    //         const groupByClient = (data) => {
    //             const groupedData = data.reduce((result, item) => {
    //               const clientId = item.employee_id;
    //               const clientName = item.employee_name;

    //             if (!result[clientId]) {
    //                 result[clientId] = [];
    //               }
              
    //             //   result[clientId].push(...item,clientName);
    //             result[clientId].push({ ...item, client_name: clientName})
    //               return result;
    //             }, {});

    //             const groupedArray = Object.entries(groupedData).map(([clientId, items]) => ({
                    
    //                 client_id: Number(clientId),
    //                 client_name: items[0].client_name,
                    
    //               items,
    //             }));
            
    //             return groupedArray;
    //           };
              
    //           const groupedByClientId = groupByClient(employees);
    //           setGroupByClient(groupedByClientId);
    //     }
    // },[employees]);

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
                                            <h5>{'Date Range - '+fromDate+' to '+toDate}</h5>
                                        </div>
                                        <Fragment>
                                            <div className="row">

                                            <table className="particulars table-stripped groupFont" width="100%"  style={tableStyle}>

                                            <tr >
                                                    <td width="15%">Client No.</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{clientInfo.client_id}</td>
                                                    <td width="15%">Client Name</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{clientInfo.name}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%">Contact No.</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="15%">{clientInfo.mobile}, {clientInfo.telephone}</td>
                                                    <td width="15%">Email </td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="45%">{clientInfo.email}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%">Client Address</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%" colSpan="4">{clientInfo.address}</td>
                                                </tr>
                                                
                                               
                                                
                                            </table>

                                                <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                    <thead>    
                                                        <tr style={{backgroundColor:"#d7d4d4"}}>
                                                            <th width="10%" align="center" style={{fontWeight: "bold", fontSize: "14px"}}>TrDate Date</th>
                                                            <th width="10%" align="center" style={{fontWeight: "bold", fontSize: "14px"}}>Job No</th>
                                                            <th width="10%" align="center" style={{fontWeight: "bold", fontSize: "14px"}}>Challan No</th>
                                                            <th width="8%" align="center" style={{fontWeight: "bold", fontSize: "14px"}}>Tr. No</th>
                                                            
                                                            <th width="10%" align="center" style={{fontWeight: "bold", fontSize: "14px"}}>Bill No</th>      
                                                            <th width="10%" align="center" style={{fontWeight: "bold", fontSize: "14px"}}>Particulars</th>      
                                                            <th width="7%" align="center" style={{fontWeight: "bold", fontSize: "14px"}}>Size</th>      
                                                            <th width="5%" align="center" style={{fontWeight: "bold", fontSize: "14px"}}>Cyl</th>      
                                                            <th width="10%" align="center" style={{fontWeight: "bold", fontSize: "14px"}}>Debit</th>      
                                                            <th width="10%" align="center" style={{fontWeight: "bold", fontSize: "14px"}}>Credit</th>      
                                                            <th width="10%" align="center" style={{fontWeight: "bold", fontSize: "14px"}}>Cum. Bal</th>      
                                                        </tr>    
                                                    </thead>
                                                    <tbody> 
                                                        <tr> 
                                                        <th colspan="5"></th> 
                                                        <th style={{fontSize:"12px",fontWeight:'bold'}}>Opening Ballance:</th>
                                                        <th></th>     
                                                        <th></th>     
                                                                             
                                                        <th style={{fontSize:"12px",fontWeight:'bold'}}>{openingBallance.opening_balance > 0 ? openingBallance.opening_balance : null}</th> 

                                                        <th style={{fontSize:"12px",fontWeight:'bold'}}>{openingBallance.opening_balance < 0 ? Math.abs(openingBallance.opening_balance) : null}</th>
                                                        <th></th>  
                                                        </tr>

                                                        {jobOrders.length > 0 ?jobOrders.map((data,index)=>{
                                                           return(
                                                                <>
                                                                <tr key={index}>
                                                                            <th align="center" style={{fontSize:"12px",fontWeight:'bold'}}>{data.tr_date ? data.tr_date:''}</th>
                                                                            <th align="center" style={{fontSize:"12px",fontWeight:'bold'}}>{data.job_no ? data.job_no : null}</th>
                                                                            <th align="center" style={{fontSize:"12px",fontWeight:'bold'}}>{data.challan_no ? data.challan_no : null}</th>
                                                                            <th align="center" style={{fontSize:"12px",fontWeight:'bold'}}>{data.tr_no ? data.tr_no:null}</th>
                                                                            <th align="center" style={{fontSize:"12px",fontWeight:'bold'}}>{data.bill_no ? data.bill_no : null}</th>
                                                                            <th align="center" style={{fontSize:"12px",fontWeight:'bold'}}>{data.particular ? data.particular: null}</th>
                                                                            <th align="center" style={{fontSize:"12px",fontWeight:'bold'}}>{data.face_length ? data.face_length : null}X{data.circumference ? data.circumference : null}</th>
                                                                            <th width="4%" align="center" style={{fontSize:"12px",fontWeight:'bold'}}>{data.total_cylinder_qty ? data.total_cylinder_qty: null}</th>
                                                                            <th align="center" style={{fontSize:"12px",fontWeight:'bold'}}>{data.debit ? data.debit : null}</th>
                                                                            <th align="center" style={{fontSize:"12px",fontWeight:'bold'}}>{data.credit ? data.credit : null}</th>
                                                                            <th align="center" style={{fontSize:"12px",fontWeight:'bold'}}>total</th>
                                                                            
                        
                                                                </tr>
                                                                        
                                                                </>
                                                            )
                                                            }):null}



                                                                        
                                                                    
                                                                    {/* {item.map((item, index) =>
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
                                                                    </Fragment>)} */}
                                                                    
                                                                    {/* {client.total.map((data)=>(
                                                                                            <tr> 
                                                                                               <th colspan="7" style={{fontSize:"12px",fontWeight:'bold'}}>Total Pending:</th>                                                                               
                                                                                              <th style={{fontSize:"12px",fontWeight:'bold'}}>{PendingCylinderQtyTotal}</th>                                                                                 
                                                                                              <th style={{fontSize:"12px",fontWeight:'bold'}}>{PendingSurfaceTotal}</th>
                                                                                               <th></th>  
                                                                                               <th></th>  
                                                                                               <th></th>  
                                                                                                <th></th> </tr> 
                                                                                           
                                                                                         ))}  */}
                                                                    
                                                                    
                                                                
                                                    </tbody>

                                                    {/* <tr>
                                                                                <th colspan="6" style={{textAlign:"right", fontSize: '14px', fontWeight: 'bold'}}>Total</th>                                                                                
                                                                                <th style={{fontSize: '14px', fontWeight: 'bold'}}>Data not arranged</th>
                                                      </tr> */}

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