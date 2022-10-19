/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { userGetMethod } from '../../../../api/userAction';
import { DESIGN_TO_DESIGN_REPORT } from '../../../../api/userUrl';
import Pagination from './Pagination';
import styles from "./report.module.css";
import './style.scss';

const Report = ({fromDate, toDate}) => {
    const componentRef = useRef();
    const [isLoading, setIsLoading] = useState(true);
    const [orderTypes, setJorderTypes] = useState([]);
    const [grandTotalCylinder, setGrandTotalCyl] = useState([]);
    const [grandTotalSurfaceArea, setGrandTotalSurfaceArea] = useState([]);
    
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage] = useState(3);
    // const [calculateCyl, setCalculateCyl] = useState(0);

    const tableStyle = {
        // "border" : "1px solid #ccc",
        "margin" : "2% 1% 2% 0%"
    }
    useEffect(()=>{
        setIsLoading(true);
        userGetMethod(`${DESIGN_TO_DESIGN_REPORT}?fromDate=${fromDate}&&toDate=${toDate}`)
        .then(response => {
            // console.log('res', response.data);
            setJorderTypes(response.data.orderTypes);
            setGrandTotalCyl(response.data.grandTotalCyl);
            setGrandTotalSurfaceArea(response.data.grandTotalSurfaceArea);
            setIsLoading(false);
        })
        .catch(error => console.log(error))
    }, [fromDate]);

    

  // Get current reports
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  let currentReports;
   
  if(!isLoading){
    currentReports = orderTypes?.slice(indexOfFirstReport, indexOfLastReport);
  }

//   console.log('orderTypes',orderTypes);

  
//  console.log('dta', isLoading,  indexOfFirstReport,  indexOfLastReport , currentReports );


  // genarate page number
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil( orderTypes?.length / reportsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Change page
  const paginate = pageNumber => {
    setCurrentPage(pageNumber)
  };


  const nextPage = () => {
    if(pageNumbers.length > currentPage){
        setCurrentPage(prevCount => prevCount + 1);
    }
  };


  const previousPage = () => {
    if(currentPage > 1){
        setCurrentPage(prevCount => prevCount - 1);
    }
  };

 

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        {
                            isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>) : (
                                
                                <div className={styles.reportWrapper}> 
                                    <div className="report-header d-flex justify-content-between align-items-center">
                                        <div className="print_button">
                                            {/* <ReactToPrint
                                                trigger={() => {
                                                    return <button className="btn btn-default"><i className="fa fa-print" aria-hidden="true"></i> Print</button>;
                                                }}
                                                content={() => componentRef.current}
                                                /> */}
                                        </div>
                                        <div className="pagination">
                                            <Pagination 
                                                pageNumbers={pageNumbers}
                                                currentPage={currentPage}
                                                nextPage={nextPage}
                                                previousPage={previousPage}
                                                paginate={paginate} />
                                        </div>
                                    </div>

                                    <div className="mainDiv" style={{"padding": "1% 5%"}}>
                                    <div ref={componentRef} className="row">
                                                <div className="col-sm-12">
                                                    <div className="company-info d-flex  justify-content-center align-items-center  my-4">
                                                        <img className="img-responsive" src={process.env.PUBLIC_URL+'/digitalLogo.png'} alt="Company Logo"/>
                                                        <div className="company-name text-left">
                                                            <h1>Digital Engravers Ltd</h1>
                                                            <span className="company-moto">53 Purana Paltan (6th Floor)</span>
                                                        </div>
                                                    </div>
                                                    <div className="report-for mt-3 d-flex justify-content-center">
                                                        <button className="btn btn-secondary">Design File to Design</button>
                                                    </div>
                                                </div>
                                                <table className="particulars table table-bordered table-stripped" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                    <thead className="groupFont">
                                                        <tr>
                                                            <th width="10%" align="center">JobNo</th>
                                                            <th width="15%" align="center">Agreement Date</th>
                                                            <th width="20%" align="center">Job Name</th>
                                                            <th width="10%" align="center">Client Name</th>
                                                            <th width="10%" align="center">Printers Name</th>
                                                            <th width="10%" align="center">Size(mm X mm)</th>
                                                            <th width="5%" align="center">No Cyl</th>
                                                            <th width="5%" align="center">Base Date</th>
                                                            <th width="10%" align="center">Surface Area</th>
                                                            <th width="10%" align="center">Remarks</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="reportBody">
                                                    {
                                                        currentReports?.length > 0 ? 
                                                        <>
                                                            {currentReports.map((orderType, index1) => 
                                                                (
                                                                    <>
                                                                        <tr key={index1}>
                                                                            <td colSpan="10">{orderType.job_type}</td>
                                                                        </tr>
                                                                        { orderType.jobOrders ? 
                                                                            orderType.jobOrders.map((jobOrder, index2) => (
                                                                                <tr key={index2}>
                                                                                    <td>{jobOrder.job_no}</td>
                                                                                    <td>{jobOrder.agreement_date}</td>
                                                                                    <td>{jobOrder.job_name}</td>
                                                                                    <td>{jobOrder.client_name}</td>
                                                                                    <td>{jobOrder.printer_name}</td>
                                                                                    <td>{`${jobOrder.eye_mark_size_one} X ${jobOrder.eye_mark_size_one}`}</td>
                                                                                    <td className="text-center">{jobOrder.total_cylinder_qty}</td>
                                                                                    <td></td>
                                                                                    <td className="text-center">{jobOrder.surface_area}</td>
                                                                                    <td>{jobOrder.remarks}</td>
                                                                                </tr>
                                                                            ))
                                                                            : <tr><td colSpan="10" className="text-center">No data found</td></tr>
                                                                        }
                                                                        <tr className="groupFont">
                                                                            <td colSpan="5">
                                                                                Total Number of Job: {orderType.jobOrders.length}
                                                                            </td>
                                                                            <td className="text-right">
                                                                                Total
                                                                            </td>
                                                                            <td className="text-center">
                                                                                {orderType.calculateTotalCyl}
                                                                            </td>
                                                                            <td></td>
                                                                            <td className="text-center">
                                                                                {orderType.calculateTotalSurfaceArea}
                                                                            </td>
                                                                            <td colSpan="2"></td>
                                                                        </tr>
                                                                    </>
                                                                )
                                                            )}
                                                        </>
                                                        : <tr><td colSpan="10" className="text-center">No data found</td></tr>
                                                    }
                                                    </tbody>
                                                </table>
                                                <table className="particulars table table-bordered table-stripped" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                    <tr className="groupFont">
                                                        <td>Grand Total Cylinder: {grandTotalCylinder}</td>
                                                        <td>Grand Total Surface Area: {grandTotalSurfaceArea}</td>
                                                    </tr>
                                                </table>
                                            </div>
                                    </div>  
                                </div>
                            )
                        }
                        
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default Report;