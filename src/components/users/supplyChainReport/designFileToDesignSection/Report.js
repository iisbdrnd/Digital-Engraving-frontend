import React, { Fragment , useEffect, useState } from 'react';
import ReportHeader from './ReportHeader';
import {DESIGN_TO_DESIGN_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [designToDesignJobOrders, setDesignToDesignJobOrders] = useState([]);
    const [grandTotalCylinder, setGrandTotalCylinder] = useState([]);
    const [grandTotalJob, setGrandTotalJob] = useState([]);
    const [calculateCyl, setCalculateCyl] = useState(0);

    const tableStyle = {
        // "border" : "1px solid #ccc",
        "margin" : "2% 1% 2% 0%"
    }
    useEffect(()=>{
        const fromDate = props.match.params.fromDate;

        userGetMethod(`${DESIGN_TO_DESIGN_REPORT}?fromDate=${fromDate}`)
        .then(response => {
            setDesignToDesignJobOrders(response.data.designToDesignJobOrders);
            setGrandTotalCylinder(response.data.grandTotalCyl);
            setGrandTotalJob(response.data.grandTotalJob);
            setIsLoading(false);
        })
        .catch(error => console.log(error))
    }, []);
    console.log('hello',designToDesignJobOrders);
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className=""> 
                            <ReportHeader reportTitle="Design File to Design Section" />

                            <div className="mainDiv" style={{"padding": "1% 5%"}}>
                                <div className="row">
                                    <table className="particulars table table-bordered table-stripped" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                        <thead>
                                            <tr>
                                                <th width="10%" align="center">JobNo</th>
                                                <th width="5%" align="center">Agreement Date</th>
                                                <th width="22%" align="center">Job Name</th>
                                                <th width="10%" align="center">Client Name</th>
                                                <th width="10%" align="center">Printers Name</th>
                                                <th width="8%" align="center">Size (mm X mm)</th>
                                                <th width="5%" align="center">No of Cyl</th>
                                                <th width="15%" align="center">Remarks</th>
                                            </tr>
                                        </thead>
                                        <tbody className="reportBody">
                                        {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                        (
                                            designToDesignJobOrders?.length > 0 ? designToDesignJobOrders?.map((designToDesignJobOrder, key)=>(
                                                <Fragment key={key}>
                                                    {designToDesignJobOrder.New.length > 0 || designToDesignJobOrder.Remake.length > 0 || designToDesignJobOrder.Redo > 0 ? 
                                                        <tr>
                                                            <td colSpan="8">
                                                                <div className=" groupFont">
                                                                    <span className=""><b>{designToDesignJobOrder.machine_name} - {designToDesignJobOrder.employee_name}</b></span>
                                                                    {/* <span className="h4">[ New ]</span> */}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        :null
                                                    }
                                            
                                                    {designToDesignJobOrder.New.length > 0 ? 
                                                        <Fragment key={key}>
                                                            <tr>
                                                                <td><b>New</b></td>
                                                            </tr>
                                                            {designToDesignJobOrder.New.map((newData,key)=>(
                                                                <tr key={key}>
                                                                    <td>{newData.job_no}</td>
                                                                    <td>{newData.agreement_date}</td>
                                                                    <td>{newData.job_name}</td>
                                                                    <td>{newData.client_name}</td>
                                                                    <td>{newData.printer_name}</td>
                                                                    <td>{`${newData.eye_mark_size_one} X ${newData.eye_mark_size_one}`}</td>
                                                                    <td align="center">{newData.total_cylinder_qty}</td>
                                                                    <td>{newData.remarks}</td>
                                                                </tr>
                                                            ))}
                                                            <tr className="groupFont">
                                                                <td colSpan="5">
                                                                    Total Number of Job: {designToDesignJobOrder.totalNew}
                                                                </td>
                                                                <td>
                                                                    Total
                                                                </td>
                                                                <td className="text-center">
                                                                    {designToDesignJobOrder.calculateTotalCylNew}
                                                                </td>
                                                                <td colSpan="2"></td>
                                                            </tr>
                                                        </Fragment>
                                                    :null
                                                    } 
                                                    {designToDesignJobOrder.Remake.length > 0 ? 
                                                        <>
                                                            <tr>
                                                                <td><b>Remake</b></td>
                                                            </tr>
                                                            {designToDesignJobOrder.Remake.map((remakeData, key)=> (
                                                                <tr key={key}>
                                                                    <td>{remakeData.job_no}</td>
                                                                    <td>{remakeData.agreement_date}</td>
                                                                    <td>{remakeData.job_name}</td>
                                                                    <td>{remakeData.client_name}</td>
                                                                    <td>{remakeData.printer_name}</td>
                                                                    <td>{`${remakeData.eye_mark_size_one} X ${remakeData.eye_mark_size_one}`}</td>
                                                                    <td align="center">{remakeData.total_cylinder_qty}</td>
                                                                    <td>{remakeData.remarks}</td>
                                                                </tr>
                                                            ))}
                                                            <tr className="groupFont">
                                                                <td colSpan="5">
                                                                    <b> </b> Total Number of Job: {designToDesignJobOrder.totalRemake} <b></b> 
                                                                </td>
                                                                <td>
                                                                    Total
                                                                </td>
                                                                <td className="text-center">
                                                                    {designToDesignJobOrder.calculateTotalCylRemake}
                                                                </td>
                                                                <td colSpan="2"></td>
                                                            </tr>
                                                        </>
                                                    :null}
                                                    {designToDesignJobOrder.Redo.length > 0 ?  
                                                        <>
                                                            <tr>
                                                                <td><b>Redo</b></td>
                                                            </tr>
                                                            {designToDesignJobOrder.Redo.map((redoData, key)=> (
                                                                <tr key={key}>
                                                                    <td>{redoData.job_no}</td>
                                                                    <td>{redoData.agreement_date}</td>
                                                                    <td>{redoData.job_name}</td>
                                                                    <td>{redoData.client_name}</td>
                                                                    <td>{redoData.printer_name}</td>
                                                                    <td>{`${redoData.eye_mark_size_one} X ${redoData.eye_mark_size_one}`}</td>
                                                                    <td align="center">{redoData.total_cylinder_qty}</td>
                                                                    <td>{redoData.remarks}</td>
                                                                </tr>
                                                            ))}
                                                            <tr className="groupFont">
                                                                <td colSpan="5">
                                                                    Total Number of Job: {designToDesignJobOrder.totalRedo}
                                                                </td>
                                                                <td>
                                                                    Total
                                                                </td>
                                                                <td className="text-center">
                                                                    {designToDesignJobOrder.calculateTotalCylRedo}
                                                                </td>
                                                                <td colSpan="2"></td>
                                                            </tr>
                                                        </>
                                                    :null}
                                                    
                                                </Fragment>  
                                            ))
                                            : null
                                        )}
                                        {/* : <tr><td colSpan="10" className="text-center">No data found</td></tr> */}
                                                
                                        </tbody>
                                    </table>
                                    <table className="particulars table table-bordered table-stripped" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                        <tr className="groupFont">
                                            <td>Grand Total Number of Job:{grandTotalJob}</td>
                                            <td>Grand Total Number of Cylinder:{grandTotalCylinder}</td>
                                        </tr>

                                    </table>
                                </div>
                                 
                            </div>  
                        </div>
                        
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default Report;