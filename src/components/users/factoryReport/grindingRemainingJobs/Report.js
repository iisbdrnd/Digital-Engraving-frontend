import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader';
import {GRINDING_REMAINING_JOBS_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [grindingSchedules, setGrindingSchedules] = useState([]);
    
    const tableStyle = {
        "margin" : "2% 1% 2% 0%"
    }
    const fromDate = props.match.params.fromDate;
    const toDate = props.match.params.toDate;
    useEffect(()=>{
        userGetMethod(`${GRINDING_REMAINING_JOBS_REPORT}?fromDate=${fromDate}&&toDate=${toDate}`) 
        .then(response => {
            console.log('response', response.data);
            setGrindingSchedules(response.data.grindingSchedules);
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
                            <ReportHeader />

                            <div className="mainDiv" style={{"padding": "1% 5%"}}>
                            {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <>
                                        <div className="text-center">
                                            <h5>{'Grinding Remaining Jobs - '+fromDate+' to '+toDate}</h5>
                                        </div>
                                        <Fragment>
                                            <div className="row">
                                                <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                    <thead>    
                                                        <tr>
                                                            <th className="text-center">Date</th>
                                                            <th className="text-center">Job No</th>
                                                            <th className="text-center">Job Name</th>
                                                            <th className="text-center">Printer</th>
                                                            <th className="text-center">FL</th>
                                                            <th className="text-center">Cir</th>
                                                            <th className="text-center">Dia</th>   
                                                            <th className="text-center">Surface Area</th>
                                                        </tr>    
                                                    </thead>
                                                    <tbody>
                                                        {grindingSchedules.length > 0 ?
                                                            grindingSchedules.map((grindingSchedule)=>(    
                                                                <tr>    
                                                                    <td className="text-center">{grindingSchedule.date}</td>
                                                                    <td className="text-center">{grindingSchedule.job_no}</td>        
                                                                    <td className="text-center">{grindingSchedule.job_name}</td>
                                                                    <td className="text-center">{grindingSchedule.printer_name}</td>        
                                                                    <td className="text-center">{grindingSchedule.fl}</td>
                                                                    <td className="text-center">{grindingSchedule.cir}</td>        
                                                                    <td className="text-center">{grindingSchedule.dia}</td>
                                                                    <td className="text-center">{grindingSchedule.surface_area}</td>        
                                                                </tr>   
                                                            ))
                                                        : null
                                                        }
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