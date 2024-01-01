import React, { Fragment , useEffect, useState } from 'react';
import ReportHeader from '../layouts/ReportHeader';
// import {DESIGN_FILE_TO_FACTORY_REPORT} from '../../../../api/userUrl'
// import { userGetMethod } from '../../../../api/userAction';

const Form = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [orderTypes, setOrderTypes] = useState([]);
    const [grandTotalCylinder, setGrandTotalCyl] = useState([]);
    const [grandTotalSurfaceArea, setGrandTotalSurfaceArea] = useState([]);
    
    const [jobOrders,setJobOrders] = useState([]);

    const tableStyle = {
        // "border" : "1px solid #ccc",
        "margin" : "2% 1% 2% 0%"
    }
    const tableRow = {fontSize: "16px",fontWeight: "bold"}

    const inputChangeHandler = () =>{

    }
    // useEffect(()=>{
    //     const fromDate = props.match.params.fromDate;
    //     const toDate = props.match.params.toDate;
    //     console.log('param fromDate', fromDate, toDate);

    //     userGetMethod(`${DESIGN_FILE_TO_FACTORY_REPORT}?fromDate=${fromDate}&&toDate=${toDate}`)
    //     .then(response => {
    //         console.log('res', response.data);
    //         // setJorderTypes(response.data.orderTypes);
    //         setJobOrders(response.data.jobOrders);
    //         // setGrandTotalCyl(response.data.grandTotalCyl);
    //         // setGrandTotalSurfaceArea(response.data.grandTotalSurfaceArea);
    //         setIsLoading(false);
    //     })
    //     .catch(error => console.log(error))
    // }, []);
    // useEffect(() =>{
    //     if (jobOrders.length > 0) {
    //         const groupByClient = (data) => {
    //             const groupedData = data.reduce((result, item) => {
    //             //   const printerId = item.printer_id;
    //               const jobTypes = item.job_type;

    //             if (!result[jobTypes]) {
    //                 result[jobTypes] = [];
    //               }
              
    //             //   result[clientId].push(...item,clientName);
    //             result[jobTypes].push({ ...item,jobTypes})
    //               return result;
    //             }, {});

    //             const groupedArray = Object.entries(groupedData).map(([jobTypes, items]) => ({
                    
    //                 // printer_id: Number(printerId),
    //                 jobTypeName: jobTypes,
                    
    //               items,
    //             }));
    //         //   console.log(groupedArray)
    //             return groupedArray;
    //           };
              
    //           const groupedByClientId = groupByClient(jobOrders);
    //           setOrderTypes(groupedByClientId);
    //     }
    // },[jobOrders]);
    // console.log(orderTypes)

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
                                    <Fragment>
                                        {/* Job Info Area */}
                                        <h4>Job Information</h4>
                                        <div>
                                            {/* Heading Area  */}
                                        <div className="row">
                                        <div className='col-md-2'></div>
                                        <div className="col-md-4">
                                            <div className="d-flex">
                                                <h5>Job No :</h5>
                                                <p className='ml-3'>231207-016</p>
                                            </div>
                                            <div className="d-flex">
                                                <h5>Job Name :</h5>
                                                <p className='ml-3'>ELITE LACCHI MILK DRINK 150ml</p>
                                            </div>
                                            <div className="d-flex">
                                                <h5>Printer :</h5>
                                                <p className='ml-3'>Al Modina Printers.</p>
                                            </div>
                                        </div>


                                        
                                        <div className="col-md-6">
                                        <div className="d-flex">
                                                <h5>Agreement Date :</h5>
                                                <p className='ml-3'>09-Dec-23</p>
                                            </div>
                                        <div className="d-flex">
                                                <h5>Chromalin Date :</h5>
                                                <p className='ml-3'>11-Dec-2023</p>
                                            </div>
                                        <div className="d-flex">
                                                <h5>Job Type :</h5>
                                                <p className='ml-3'>New</p>
                                            </div>
                                        </div>
                                        </div>

                                        {/* Check box area */}
                                        <div className='row mt-2'>
                                            <div className='col-md-1 d-flex justify-content-center align-items-center mt-2'>
                                            <label className="col-md-6 mt-1" style={{whiteSpace: 'nowrap'}}>C</label>
                                                        <div className="col-md-8">
                                                            <input
                                                                type="checkbox"
                                                                name="mark_as_complete"
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        </div>
                                            </div>
                                            <div className='col-md-1 d-flex justify-content-center align-items-center mt-2'>
                                            <label className="col-md-6 mt-1" style={{whiteSpace: 'nowrap'}}>M</label>
                                                        <div className="col-md-4">
                                                            <input
                                                                type="checkbox"
                                                                name="mark_as_complete"
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        </div>
                                            </div>
                                            <div className='col-md-1 d-flex justify-content-center align-items-center mt-2'>
                                            <label className="col-md-6 mt-1" style={{whiteSpace: 'nowrap'}}>Y</label>
                                                        <div className="col-md-4">
                                                            <input
                                                                type="checkbox"
                                                                name="mark_as_complete"
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        </div>
                                            </div>
                                            <div className='col-md-1 d-flex justify-content-center align-items-center mt-2'>
                                            <label className="col-md-6 mt-1" style={{whiteSpace: 'nowrap'}}>K</label>
                                                        <div className="col-md-4">
                                                            <input
                                                                type="checkbox"
                                                                name="mark_as_complete"
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        </div>
                                            </div>

                                            {/* input for Ex section */}
                                            <div className='col-md-2'>
                                            <label className="col-md-4" style={{whiteSpace: 'nowrap'}}>Ext1</label>
                                                        <div className="col-md-12">
                                                        <input
                                                                type="text"
                                                                className="form-control"
                                                                name="Ext-1"
                                                                
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        </div>
                                            </div>
                                            <div className='col-md-2'>
                                            <label className="col-md-4" style={{whiteSpace: 'nowrap'}}>Ext2</label>
                                                        <div className="col-md-12">
                                                        <input
                                                                type="text"
                                                                className="form-control"
                                                                name="Ext-2"
                                                                
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        </div>
                                            </div>
                                            <div className='col-md-2'>
                                            <label className="col-md-4" style={{whiteSpace: 'nowrap'}}>Ext3</label>
                                                        <div className="col-md-12">
                                                        <input
                                                                type="text"
                                                                className="form-control"
                                                                name="Ext-3"
                                                                
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        </div>
                                            </div>
                                            <div className='col-md-2'>
                                            <label className="col-md-4" style={{whiteSpace: 'nowrap'}}>Ext4</label>
                                                        <div className="col-md-12">
                                                        <input
                                                                type="text"
                                                                className="form-control"
                                                                name="Ext-4"
                                                                
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        </div>
                                            </div>

                                            <div className='col-md-2'>
                                            <label className="col-md-4" style={{whiteSpace: 'nowrap'}}>Remarks</label>
                                                        <div className="col-md-12">
                                                        <input
                                                                type="text"
                                                                className="form-control"
                                                                name="Ext-4"
                                                                
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        </div>
                                            </div>

                                        </div>
                                        </div>

                                        {/* Ps Info Area */}
                                        <h4 className="mt-5">PS Information</h4>
                                        <div>
                                            <div className="row mt-2">
                                                <div className="col-2">
                                                    <p>Name of Color</p>
                                                </div>

                                                <div className="col-1">
                                                        <input
                                                                type="text"
                                                                className="form-control"
                                                                name="color-1"
                                                                
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        
                                                </div>

                                                <div className="col-1">
                                                
                                                        <input
                                                                type="text"
                                                                className="form-control"
                                                                name="color-1"
                                                                
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        
                                                </div>

                                                <div className="col-1">
                                                        <input
                                                                type="text"
                                                                className="form-control"
                                                                name="color-1"
                                                                
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        
                                                </div>

                                                <div className="col-1">
                                                        <input
                                                                type="text"
                                                                className="form-control"
                                                                name="color-1"
                                                                
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        
                                                </div>

                                                <div className="col-1">
                                                        <input
                                                                type="text"
                                                                className="form-control"
                                                                name="color-1"
                                                                
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                       
                                                </div>

                                                <div className="col-1">
                                                        <input
                                                                type="text"
                                                                className="form-control"
                                                                name="color-1"
                                                                
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        
                                                </div>

                                                <div className="col-1">
                                                        <input
                                                                type="text"
                                                                className="form-control"
                                                                name="color-1"
                                                                
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                      
                                                </div>

                                                <div className="col-1">
                                                        <input
                                                                type="text"
                                                                className="form-control"
                                                                name="color-1"
                                                                
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        
                                                </div>

                                                <div className="col-1">
                                                        <input
                                                                type="text"
                                                                className="form-control"
                                                                name="color-1"
                                                                
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                </div>

                                                <div className="col-1">
                                                        <input
                                                                type="text"
                                                                className="form-control"
                                                                name="color-1"
                                                                
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                </div>


                                            </div>
                                        </div>

                                    </Fragment>

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

export default Form;