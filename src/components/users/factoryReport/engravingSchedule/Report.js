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
                                                        {engravingSchedules.length > 0 ?
                                                            engravingSchedules.map((engravingSchedule)=>(    
                                                                <tr>    
                                                                    <td className="text-center">{engravingSchedule.date}</td>
                                                                    <td className="text-center">{engravingSchedule.job_no}</td>        
                                                                    <td className="text-center">{engravingSchedule.job_name}</td>
                                                                    <td className="text-center">{engravingSchedule.printer_name}</td>        
                                                                    <td className="text-center">{engravingSchedule.fl}</td>
                                                                    <td className="text-center">{engravingSchedule.cir}</td>        
                                                                    <td className="text-center">{engravingSchedule.dia}</td>
                                                                    <td className="text-center">{engravingSchedule.surface_area}</td>        
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