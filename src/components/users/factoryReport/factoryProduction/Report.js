import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader';
import {FACTORY_PRODUCTION_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [days, setDays] = useState([]);
    
    const tableStyle = {
        "margin" : "2% 1% 2% 0%"
    }
    const fromDate = props.match.params.fromDate;
    const toDate = props.match.params.toDate;
    const oneDay = 24 * 60 * 60 * 1000;
    useEffect(()=>{
        userGetMethod(`${FACTORY_PRODUCTION_REPORT}?fromDate=${fromDate}&&toDate=${toDate}`) 
        .then(response => {
            console.log('response', response.data);
            setDays(response.data.days);
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
                                            <h5>{'Factory Production Report - '+fromDate+' to '+toDate}</h5>
                                        </div>
                                        <Fragment>
                                            <div className="row">
                                                <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                    <thead>    
                                                        <tr>
                                                            <th rowSpan= "2" className="text-center">Date</th>
                                                            <th colSpan ="3" className="text-center">Layout</th>
                                                            <th rowSpan= "2" className="text-center">Grinding</th>
                                                            <th colSpan ="3" className="text-center">Plating</th>
                                                            <th colSpan ="3" className="text-center">Polishing</th>
                                                            <th colSpan ="3" className="text-center">Engraving</th>
                                                            <th colSpan ="3" className="text-center">Chrome</th>   
                                                        </tr>
                                                            <th align="center">Gross</th>
                                                            <th align="center">Net</th>
                                                            <th align="center">Inc</th>
                                                            <th align="center">Gross</th>
                                                            <th align="center">Net</th>
                                                            <th align="center">Rwk</th>
                                                            <th align="center">Gross</th>
                                                            <th align="center">Net</th>
                                                            <th align="center">Rwk</th>
                                                            <th align="center">Gross</th>
                                                            <th align="center">Net</th>
                                                            <th align="center">Rwk</th>
                                                            <th align="center">Gross</th>
                                                            <th align="center">Net</th>
                                                            <th align="center">Rwk</th>
                                                        <tr>

                                                        </tr>    
                                                    </thead>
                                                    <tbody>
                                                        {days.length > 0 ?
                                                            days.map((day)=>(
                                                                <>
                                                                    {day.grindings.length > 0 ?    
                                                                        <tr>
                                                                            {day.grindings.map((grinding)=>(
                                                                                <>
                                                                                    <td>{grinding.grinding_date}</td>
                                                                                    <td></td>
                                                                                    <td></td>
                                                                                    <td></td>
                                                                                    <td>{(grinding.dia * grinding.dia)/10000}</td>
                                                                                </>
                                                                                ))
                                                                            }


                                                                            {day.platings.map((plating)=>(
                                                                                <>
                                                                                    <td>{(plating.surface_area)/10000}</td>
                                                                                    <td>{(plating.surface_area)/10000}</td>
                                                                                    <td>0%</td>
                                                                                </>
                                                                                ))
                                                                            }


                                                                            {day.polishings.map((polishing)=>(
                                                                                <>
                                                                                    <td>{(polishing.dia)/100}</td>
                                                                                </>
                                                                                ))
                                                                            }
                                                                            {day.net_polishings.map((net_polishing)=>(
                                                                                <>
                                                                                    <td>{(net_polishing.dia)/100}</td>
                                                                                </>
                                                                                ))
                                                                            }
                                                                            <td>{100-(((day.net_polishings.map((net_polishing)=>(net_polishing.dia)))*100)/(day.polishings.map((polishing)=>(polishing.dia))))}%</td>


                                                                            {day.engravings.map((engraving)=>(
                                                                                <>
                                                                                    <td>{(engraving.surface_area)/1000}</td>
                                                                                </>
                                                                                ))
                                                                            }
                                                                            {day.net_engravings.map((net_engraving)=>(
                                                                                <>
                                                                                    <td>{(net_engraving.surface_area)/1000}</td>
                                                                                </>
                                                                                ))
                                                                            }
                                                                            <td>{100-(((day.net_engravings.map((net_engraving)=>(net_engraving.surface_area)))*100)/(day.engravings.map((engraving)=>(engraving.surface_area))))}%</td>


                                                                            {day.chromes.map((chrome)=>(
                                                                                <>
                                                                                    <td>{(chrome.surface_area)/1000}</td>
                                                                                </>
                                                                                ))
                                                                            }
                                                                            {day.net_chromes.map((net_chrome)=>(
                                                                                <>
                                                                                    <td>{(net_chrome.surface_area)/1000}</td>
                                                                                </>
                                                                                ))
                                                                            }
                                                                            <td>{100-(((day.net_chromes.map((net_chrome)=>(net_chrome.surface_area)))*100)/(day.chromes.map((chrome)=>(chrome.surface_area))))}%</td>
                                                                        </tr>   
                                                                    : null
                                                                    }
                                                                </>
                                                            ))
                                                        : null
                                                        }
                                                        {/* {days.length > 0 ?
                                                            days.map((day)=>(
                                                                day.platings.length > 0 ?
                                                                    day.platings.map((plating)=>( 
                                                                        <tr>
                                                                            <td>{(plating.surface_area)/10000}</td>
                                                                        </tr>
                                                                    ))
                                                                : null
                                                            ))
                                                        : null
                                                        } */}
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