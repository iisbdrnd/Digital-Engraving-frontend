import React, { Fragment , useEffect, useState } from 'react';
import ReportHeader from './ReportHeader';
import {DAILY_DESIGN_FILE_TO_FACTORY_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [jobTypes, setJobTypes] = useState([]);
    const [grandTotal, setGrandTotal] = useState([]);

    const tableStyle = {
        "margin" : "2% 1% 2% 0%"
    }
    useEffect(()=>{
        const date = props.match.params.date;
        userGetMethod(`${DAILY_DESIGN_FILE_TO_FACTORY_REPORT}?date=${date}`)
        .then(response => {
            console.log('res', response.data);
            setJobTypes(response.data.jobTypes);
            setGrandTotal(response.data.grandTotal);
            setIsLoading(false);
        })
        .catch(error => console.log(error))
    }, []);

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className=""> 
                            <ReportHeader reportTitle="Daily Design File to Factory Report" />

                            <div className="mainDiv" style={{"padding": "1% 5%"}}>
                            {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <div className="row">
                                        <table className="particulars table table-bordered table-stripped" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                            <thead className="groupFont">
                                                <tr>
                                                    <th width="8%" align="center">JobNo</th>
                                                    <th width="8%" align="center">Agreement Date</th>
                                                    <th width="12%" align="center">Job Name</th>
                                                    <th width="10%" align="center">Client Name</th>
                                                    <th width="10%" align="center">Printers Name</th>
                                                    <th width="10%" align="center">Size(mm X mm)</th>
                                                    <th width="8%" align="center">No Cyl</th>
                                                    <th width="8%" align="center">Base Date</th>
                                                    <th width="10%" align="center">Surface Area</th>
                                                    <th width="10%" align="center">Remarks</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {jobTypes.length > 0 ? 
                                                    jobTypes.map((jobType)=>(
                                                        jobType.designToFactories.length > 0 ?
                                                            <>
                                                                <tr>
                                                                    <td colspan="8">Job Type :{jobType.name}</td>
                                                                </tr>
                                        
                                                                {jobType.designToFactories.map((designToFactory)=>( 
                                                                    <tr>
                                                                        <td>{designToFactory.job_no}</td>
                                                                        <td>{designToFactory.agreement_date}</td>
                                                                        <td>{designToFactory.job_name}</td>
                                                                        <td>{designToFactory.client_name}</td>
                                                                        <td>{designToFactory.printer_name}</td>
                                                                        <td>{designToFactory.eye_mark_size_one+'x'+designToFactory.eye_mark_size_two}</td>
                                                                        <td>{designToFactory.total_cylinder_qty}</td>
                                                                        <td>{designToFactory.base_receive_date}</td>
                                                                        <td>{designToFactory.surface_area}</td> 
                                                                        <td>{designToFactory.remarks}</td> 
                                                                    </tr>
                                                                ))}
                                                                {jobType.total.map((data)=>(
                                                                    <tr>
                                                                        <th colspan="6">Total No of Job  :{data.total_job}</th>
                                                                        <th>{data.total_cylinder_qty}</th>
                                                                        <th></th>
                                                                        <th>{data.surface_area}</th>
                                                                        <th></th>
                                                                    </tr>
                                                                ))}
                                                            </>
                                                        : null
                                                    ))
                                                : null
                                                }
                                            </tbody>
                                        </table>
                                        <table className="particulars table table-bordered table-stripped" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                            <tr className="groupFont">
                                                <td>Total No of Job: {grandTotal.total_job}</td>
                                                <td>Grand Total Cylinder: {grandTotal.total_cylinder_qty}</td>
                                            </tr>
                                        </table>
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