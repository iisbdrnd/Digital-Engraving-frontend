import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader';
import {ENGRAVING_SCHEDULE_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [engravingSchedules, setEngravingSchedules] = useState([]);
    
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
        userGetMethod(`${ENGRAVING_SCHEDULE_REPORT}?fromDate=${fromDate}&&toDate=${toDate}`) 
        .then(response => {
            console.log('response', response.data);
            setEngravingSchedules(response.data.engravingSchedules);
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
                                            <h5>{'Engraving Schedule - '+fromDate+' to '+toDate}</h5>
                                        </div>
                                        <Fragment>
                                            <div className="row">
                                                <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                    <thead>    
                                                        <tr>
                                                        <th width="5%" className="text-left" style={rowHead}>Date</th>
                                                            <th width="5%" className="text-left" style={rowHead}>Job No</th>
                                                            <th width="40%" className="text-left" style={rowHead}>Job Name</th>
                                                            <th width="20%" className="text-left" style={rowHead}>Printer</th>
                                                            <th width="10%" className="text-left" style={rowHead}>FL</th>
                                                            <th width="10%" className="text-left" style={rowHead}>Cir</th>
                                                            <th width="5%" className="text-left" style={rowHead}>Dia</th>   
                                                            <th width="5%" className="text-left" style={rowHead}>Surface Area</th>
                                                        </tr>    
                                                    </thead>
                                                    <tbody>
                                                        {engravingSchedules.length > 0 ?
                                                            engravingSchedules.map((engravingSchedule)=>(    
                                                                <tr>    
                                                                    <td style={columnHead} className="text-left">{engravingSchedule.date}</td>
                                                                    <td style={columnHead} className="text-left">{engravingSchedule.job_no}</td>        
                                                                    <td style={columnHead} className="text-left">{engravingSchedule.job_name}</td>
                                                                    <td style={columnHead} className="text-left">{engravingSchedule.printer_name}</td>        
                                                                    <td style={columnHead} className="text-left">{engravingSchedule.fl}</td>
                                                                    <td style={columnHead} className="text-left">{engravingSchedule.cir}</td>        
                                                                    <td style={columnHead} className="text-left">{engravingSchedule.dia}</td>
                                                                    <td style={columnHead} className="text-left">{engravingSchedule.surface_area}</td>        
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