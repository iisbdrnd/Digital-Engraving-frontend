import React, { Fragment , useEffect, useState } from 'react';
import ReportHeader from '../layouts/ReportHeader';
import qcProofForm from './qcProofForm';
import { JOB_ORDER_DETAILS } from '../../../api/userUrl';
import { userGetMethod } from '../../../api/userAction';
import { useParams } from 'react-router-dom';
import './Form.css';

const Form = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [colors, setColors] = useState([]);
    const [grandTotalCylinder, setGrandTotalCyl] = useState([]);
    const [grandTotalSurfaceArea, setGrandTotalSurfaceArea] = useState([]);
    
    const [jobOrders,setJobOrders] = useState([]);
    const [designToFactoryInput, setDesignToFactoryInput] = useState({
            agreementDate        : '',
            job_name          : '',
            printer_name      : '',
            job_no            : '', 
            total_cylinder_qty: '',
            remarks           : ''
        }
    );
    const { id } = useParams();
        console.log(id);
    const tableStyle = {
        // "border" : "1px solid #ccc",
        "margin" : "2% 1% 2% 0%"
    }
    const pStyle = {
        marginBottom: '5px',
        fontSize: "15px",
    }
    const tableRow = {fontSize: "16px",fontWeight: "bold"}

    const inputChangeHandler = () =>{

    }

    // var menuId = 0;
    // if (props.location.state === undefined) {
    //     menuId = 0;
    // }else{
    //     menuId = props.location.state.params.menuId;
    // }
    // let job_order_id = props.location.state.params.job_order_id ? props.location.state.params.job_order_id : null;
    // const job_order_id2 = props.location.state?.params?.job_order_id || null;

  // Use job_order_id as needed
//   console.log(job_order_id2);
    // console.log(job_order_id)
    useEffect(()=>{
        userGetMethod(`${JOB_ORDER_DETAILS}?jobOrderId=${id}?`)
                .then(response => {
                    // console.log(response);
                    let { job_name, printer_name, total_cylinder_qty,agreement_date,job_no,job_type,remarks} = response.data.jobOrderDetails;
                    setDesignToFactoryInput({
                        'job_name'          : job_name,
                        'printer_name'      : printer_name,
                        'total_cylinder_qty': total_cylinder_qty,
                        'agreementDate'     : agreement_date,
                        'job_no'            : job_no,
                        'job_type'          : job_type,
                        'remarks'           : remarks
                    });
                    setColors(response.data.colors)
                });
                setIsLoading(false)
    }, []);

    const printDocument = () => {
        window.print();
    }
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
                        <div className="report-header">
                        
                            <div className="print_button">
                                <button className="btn btn-default" onClick={printDocument}><i className="fa fa-print" aria-hidden="true"></i> Print</button>&nbsp;
                                <button className="btn btn-default"><i className="fa fa-file-pdf-o" aria-hidden="true"></i>Pdf</button>
                            </div>
                            <div className="company-info">
                                <img className="img-responsive" src={process.env.PUBLIC_URL+'/digitalLogo.png'} alt="Company Logo"/>
                                <div>
                                    <h1>Digital Engravers Ltd</h1>
                                    <span className="company-moto">Digital Image Transfer Technology</span>
                                </div>
                            </div>

                            {/* <h4 className="text-center"><b>{props.reportTtile}</b></h4> */}
                            
                        </div>
                            
                            <div className="mainDiv" style={{"padding": "1% 5%"}}>
                            {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <Fragment>
                                        {/* Job Info Area */}
                                        <h4 style={{fontSize:'17px',fontWeight:'bold'}}>Job Information</h4>
                                        <div>
                                            {/* Heading Area  */}
                                        {/* <div className="row print-layout">
                                        <div className='col-md-2'></div>
                                        <div className="col-md-4">
                                            <div className="d-flex flex-column">
                                            <div className="d-flex">
                                                <h5>Job No :</h5>
                                                <p className='ml-3'>{designToFactoryInput.job_no}</p>
                                            </div>
                                            <div className="d-flex">
                                                <h5>Job Name :</h5>
                                                <p className='ml-3'>{designToFactoryInput.job_name}</p>
                                            </div>
                                            <div className="d-flex">
                                                <h5>Printer :</h5>
                                                <p className='ml-3'>{designToFactoryInput.printer_name}</p>
                                            </div>
                                            <div className="d-flex">
                                                <h5>Colors :</h5>
                                                <p className='ml-3'>{colors.map(color => <span>{color.color_name},</span>)}</p>
                                            </div>
                                            </div>
                                        </div>


                                        
                                        <div className="col-md-6">
                                        <div className="d-flex">
                                                <h5>Agreement Date :</h5>
                                                <p className='ml-3'>{designToFactoryInput.agreementDate}</p>
                                            </div>
                                        <div className="d-flex">
                                                <h5>Chromalin Date :</h5>
                                                <p className='ml-3'>11-Dec-2023</p>
                                            </div>
                                        <div className="d-flex">
                                                <h5>Job Type :</h5>
                                                <p className='ml-3'>{designToFactoryInput.job_type}</p>
                                            </div>
                                        <div className="d-flex">
                                                <h5>Remarks :</h5>
                                                <p className='ml-3'>{designToFactoryInput.remarks}</p>
                                            </div>
                                        </div>
                                        </div> */}

                                            <table className="particulars table-stripped groupFont" width="100%"  style={tableStyle}>
                                                
                                                <tr >
                                                    <td width="15%">Job No</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{designToFactoryInput.job_no}</td>
                                                    <td width="15%">Agreement Date</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{designToFactoryInput.agreementDate}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%">Job Name</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{designToFactoryInput.job_name}</td>
                                                    <td width="15%">Chromalin Date </td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">11-Dec-2023</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%">Printer</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{designToFactoryInput.printer_name}</td>
                                                    <td width="15%">Job Type</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{designToFactoryInput.job_type}</td>
                                                </tr>
                                                <tr>
                                                    <td width="15%">Colors</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{colors.map(color => <span>{color.color_name},</span>)}</td>
                                                    <td width="15%">Remarks</td>
                                                    <td width="5%" align="center">:</td>
                                                    <td width="30%">{designToFactoryInput.remarks}</td>
                                                </tr>
                                                
                                            </table>

                                        </div>

                                        {/* Ps Info Area */}
                                        <div className="row mt-4">
                                            <div className="col-6">
                                                <h4 style={{fontSize:'17px',fontWeight:'bold'}}>PS Information</h4>
                                            </div>
                                            <div className="col-6"><h5>Sign :</h5></div>
                                        </div>
                                        <div>
                                            <div className="row mt-4">
                                                <div className="col-2">
                                                    <p style={pStyle}>Name of Color</p>
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

                                        <div>
                                            <div className="row mt-1">
                                                <div className="col-2">
                                                    <p style={pStyle}>Sequence</p>
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

                                        <div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <p style={pStyle}>Note </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Layout Information */}
                                        <div className="row mt-4">
                                            <div className="col-6">
                                                <h4 style={{fontSize:'17px',fontWeight:'bold'}}>Layout Information</h4>
                                            </div>
                                            <div className="col-6">
                                                <h5>Sign :</h5>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="row mt-3">
                                                <div className="col-2">
                                                    <p style={pStyle}>Name of Cyl</p>
                                                </div>

                                                <div className="col-2">
                                                        <input
                                                                type="text"
                                                                className="form-control"
                                                                name="color-1"
                                                                
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        
                                                </div>

                                                <div className="col-1 text-right">
                                                <p>FL</p>
                                                </div>

                                                <div className="col-3">
                                                        <input
                                                                type="text"
                                                                className="form-control"
                                                                name="color-1"
                                                                
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        
                                                </div>

                                                <div className="col-1 text-right">
                                                        <p>Cir</p>      
                                                </div>

                                                <div className="col-3">
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
                                        <div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <p style={pStyle}>Note </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Engraving Information */}
                                        <div className="row mt-4">
                                            <div className="col-6">
                                                <h4 style={{fontSize:'17px',fontWeight:'bold'}}>Engraving Information</h4>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="row mt-4">
                                                <div className="col-2">
                                                    <p style={pStyle}>Name of Color</p>
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

                                        <div>
                                            <div className="row mt-1">
                                                <div className="col-2">
                                                    <p style={pStyle}>Sign</p>
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

                                        <div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <p style={pStyle}>Note </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* QC Proof/ delivery Information */}
                                        <div>

                                        <div className="row mt-4">
                                            <div className="col-12">
                                                <h4 style={{fontSize:'17px',fontWeight:'bold'}}>Proof / Delivery Information</h4>
                                            </div>
                                        </div>

                                        <div className='row mt-2'>

                                            <div className="col-6 d-flex">
                                            <div className='mt-2'>
                                            <p style={pStyle}>Physical Check: </p>
                                            </div>
                                            <div className='col-2'></div>

                                            <div className='col-md-2 d-flex justify-content-center align-items-center '>
                                            <label className="col-md-6 mt-1" style={{whiteSpace: 'nowrap'}}>Yes</label>
                                                        <div className="col-md-8">
                                                            <input
                                                                type="checkbox"
                                                                name="mark_as_complete"
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        </div>
                                            </div>

                                            <div className='col-md-2 d-flex justify-content-center align-items-center '>
                                            <label className="col-md-6 mt-1" style={{whiteSpace: 'nowrap'}}>No</label>
                                                        <div className="col-md-4">
                                                            <input
                                                                type="checkbox"
                                                                name="mark_as_complete"
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        </div>
                                            </div>
                                            </div>

                                            

                                            {/* input for Ex section */}
                                            <div className="col-md-6">
                                            <div className='col-md-8 d-flex justify-content-center align-items-center'>
                                            <label className="col-md-4 text-right" style={{whiteSpace: 'nowrap'}}>Sign</label>
                                                        <div className="col-md-8">
                                                        <input
                                                                type="text"
                                                                className="form-control"
                                                                name="proofSign"
                                                                
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        </div>
                                            </div>
                                            </div>
                                            
                                            

                                        </div>

                                        <div className='row mt-2'>

                                            <div className="col-6 d-flex">
                                            <div className=''>
                                            <p style={pStyle}>Proof: </p>
                                            </div>
                                            <div className='col-2'></div>

                                            <div className='col-md-2 d-flex justify-content-center align-items-center '>
                                            <label className="col-md-6 mt-1" style={{whiteSpace: 'nowrap'}}>Yes</label>
                                                        <div className="col-md-8">
                                                            <input
                                                                type="checkbox"
                                                                name="mark_as_complete"
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        </div>
                                            </div>

                                            <div className='col-md-2 d-flex justify-content-center align-items-center '>
                                            <label className="col-md-6 mt-1" style={{whiteSpace: 'nowrap'}}>No</label>
                                                        <div className="col-md-4">
                                                            <input
                                                                type="checkbox"
                                                                name="mark_as_complete"
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        </div>
                                            </div>
                                            </div>

                                            

                                            {/* input for Ex section */}
                                            <div className="col-md-6">
                                            <div className='col-md-8 d-flex justify-content-center align-items-center'>
                                            <label className="col-md-4 text-right" style={{whiteSpace: 'nowrap'}}>Sign</label>
                                                        <div className="col-md-8">
                                                        <input
                                                                type="text"
                                                                className="form-control"
                                                                name="proofSign"
                                                                
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        </div>
                                            </div>
                                            </div>
                                            
                                            

                                        </div>

                                        <div className='row mt-2'>

                                        <div className="col-12 d-flex">
                                            <div className=''>
                                            <p style={pStyle}>Attention: </p>
                                            </div>
                                            <div className='col-2'></div>

                                            <div className='col-md-2 d-flex justify-content-center align-items-center '>
                                            
                                                        <div className="col-md-4">
                                                            <input
                                                                type="checkbox"
                                                                name="mark_as_complete"
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        </div>
                                            <label className="col-md-6 mt-1" style={{whiteSpace: 'nowrap'}}>Registation</label>
                                            </div>

                                            <div className='col-md-2 d-flex justify-content-center align-items-center '>
                                            
                                                        <div className="col-md-4">
                                                            <input
                                                                type="checkbox"
                                                                name="mark_as_complete"
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        </div>
                                            <label className="col-md-6 mt-1" style={{whiteSpace: 'nowrap'}}>Background</label>            
                                            </div>

                                            <div className='col-md-2 d-flex justify-content-center align-items-center '>
                                            
                                                        <div className="col-md-4">
                                                            <input
                                                                type="checkbox"
                                                                name="mark_as_complete"
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        </div>
                                            <label className="col-md-6 mt-1" style={{whiteSpace: 'nowrap'}}>Text</label>            
                                            </div>

                                            <div className='col-md-2 d-flex justify-content-center align-items-center '>
                                            
                                                        <div className="col-md-4">
                                                            <input
                                                                type="checkbox"
                                                                name="mark_as_complete"
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        </div>
                                            <label className="col-md-6 mt-1" style={{whiteSpace: 'nowrap'}}>Graphic</label>            
                                            </div>
                                            </div> 

                                        </div>

                                        <div>
                                            <div className="row">
                                                <div className="col-6">
                                                    <p style={pStyle}>Note : </p>
                                                </div>
                                                <div className="col-md-6">
                                                <div className='col-md-8 d-flex justify-content-center align-items-center'>
                                                <label className="col-md-4 text-right" style={{whiteSpace: 'nowrap'}}>Sign</label>
                                                            <div className="col-md-8">
                                                            <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="proofSign"
                                                                    
                                                                    onChange={inputChangeHandler}
                                                                    value=''
                                                                />
                                                            </div>
                                                </div>
                                                </div>
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