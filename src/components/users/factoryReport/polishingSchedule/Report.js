import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader';
import {POLISHING_SCHEDULE_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [polishingSchedules, setPolishingSchedules] = useState([]);
    
    const tableStyle = {
        "margin" : "2% 1% 2% 0%"
    }
    const rowHead = {
        fontSize:"15px",fontWeight:"bold"
    }
    const columnHead = {
        fontSize:"12px",fontWeight:"bold"
    }
    const fromDate = props.match.params.fromDate;
    const toDate = props.match.params.toDate;
    useEffect(()=>{
        userGetMethod(`${POLISHING_SCHEDULE_REPORT}?fromDate=${fromDate}&&toDate=${toDate}`) 
        .then(response => {
            console.log('response', response.data);
            setPolishingSchedules(response.data.polishingSchedules);
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
                                            <h5>{'Polishing Schedule - '+fromDate+' to '+toDate}</h5>
                                        </div>
                                        <Fragment>
                                            <div className="row">
                                                <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                    <thead>    
                                                        <tr>
                                                        <th width="8%" className="text-left" style={rowHead}>Date</th>
                                                            <th width="8%" className="text-left" style={rowHead}>Job No</th>
                                                            <th width="35%" className="text-left" style={rowHead}>Job Name</th>
                                                            <th width="19%" className="text-left" style={rowHead}>Printer</th>
                                                            <th width="5%" className="text-left" style={rowHead}>FL</th>
                                                            <th width="5%" className="text-left" style={rowHead}>Cir</th>
                                                            <th width="5%" className="text-left" style={rowHead}>Dia</th>   
                                                            <th width="10%" className="text-left" style={rowHead}>Surface Area</th>
                                                        </tr>    
                                                    </thead>
                                                    <tbody>
                                                        {polishingSchedules.length > 0 ?
                                                            polishingSchedules.map((polishingSchedule)=>(    
                                                                <tr>    
                                                                    <td style={columnHead} className="text-left">{polishingSchedule.date}</td>
                                                                    <td style={columnHead} className="text-left">{polishingSchedule.job_no}</td>        
                                                                    <td style={columnHead} className="text-left">{polishingSchedule.job_name}</td>
                                                                    <td style={columnHead} className="text-left">{polishingSchedule.printer_name}</td>        
                                                                    <td style={columnHead} className="text-left">{polishingSchedule.fl}</td>
                                                                    <td style={columnHead} className="text-left">{polishingSchedule.cir}</td>        
                                                                    <td style={columnHead} className="text-left">{polishingSchedule.dia}</td>
                                                                    <td style={columnHead} className="text-left">{polishingSchedule.surface_area}</td>        
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