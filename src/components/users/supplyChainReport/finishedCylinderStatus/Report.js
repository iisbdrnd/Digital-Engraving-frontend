import React, { Fragment , useEffect, useState } from 'react';
import ReportHeader from './ReportHeader';
import {BASE_CYLINDER_ORDER_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [jobOrderInfo, setJobOrderInfo] = useState([]);

    const tableStyle = {
        // "border" : "1px solid #ccc",
        "margin" : "2% 1% 2% 0%"
    }
    useEffect(()=>{
        const jobOrderId = props.match.params.jobOrderId;
        userGetMethod(`${BASE_CYLINDER_ORDER_REPORT}?jobOrderId=${jobOrderId}`) 
        .then(response => {
            console.log('response', response.data);
            setJobOrderInfo(response.data.jobOrderInfo);
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
                                        <>
                                            <div className="text-center">
                                                <h5>Base Cylinder Order</h5>
                                            </div>
                                            <Fragment>
                                                <div className="row">
                                                    <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                        <thead>
                                                            <tr>
                                                                <th width="15%" style={{fontSize:"13px",fontWeight:'bold'}}>Job No</th>
                                                                <th width="30%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Issue To</th>
                                                                <th width="15%" style={{fontSize:"13px",fontWeight:'bold'}}>Order Date</th>
                                                                <th width="10%" style={{fontSize:"13px",fontWeight:'bold'}}>BCO</th>
                                                                <th width="30%" align="center" style={{fontSize:"13px",fontWeight:'bold'}}>Delevery Date</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                </div>
                                                
                                            </Fragment>
                                        </>
                                        

                                        
                                        {/* //Factory Copy End */}

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