import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader';
import {GRINDING_SCHEDULE_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [grindingSchedules, setGrindingSchedules] = useState([]);
    
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
        userGetMethod(`${GRINDING_SCHEDULE_REPORT}?fromDate=${fromDate}&&toDate=${toDate}`) 
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
                                            <h5>{'Grinding Schedule - '+fromDate+' to '+toDate}</h5>
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
                                                        {grindingSchedules.length > 0 ?
                                                            grindingSchedules.map((grindingSchedule)=>(    
                                                                <tr>    
                                                                    <td className="text-left" style={columnHead}>{grindingSchedule.date}</td>
                                                                    <td className="text-left" style={columnHead}>{grindingSchedule.job_no}</td>        
                                                                    <td className="text-left" style={columnHead}>{grindingSchedule.job_name}</td>
                                                                    <td className="text-left" style={columnHead}>{grindingSchedule.printer_name}</td>        
                                                                    <td className="text-center" style={columnHead}>{grindingSchedule.fl}</td>
                                                                    <td className="text-center" style={columnHead}>{grindingSchedule.cir}</td>        
                                                                    <td className="text-center" style={columnHead}>{grindingSchedule.dia}</td>
                                                                    <td className="text-center" style={columnHead}>{grindingSchedule.surface_area}</td>        
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