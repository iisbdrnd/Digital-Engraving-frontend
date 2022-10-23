/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect,  useState } from 'react';
import { userGetMethod } from '../../../../api/userAction';
import { DESIGN_TO_DESIGN_REPORT } from '../../../../api/userUrl';
import Pagination from './Pagination';
import styles from "./report.module.css";
import ReportPage from './ReportPage';
import './style.scss';

const Report = ({fromDate, toDate}) => {
    // const componentRef = useRef();
    const [isLoading, setIsLoading] = useState(true);
    const [orderTypes, setJorderTypes] = useState([]);
    const [grandTotalCylinder, setGrandTotalCyl] = useState([]);
    const [grandTotalSurfaceArea, setGrandTotalSurfaceArea] = useState([]);
    
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage] = useState(3);
    // const [calculateCyl, setCalculateCyl] = useState(0);

    
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



  // genarate page number
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil( orderTypes?.length / reportsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Change page
  const paginate = pageNumber => {
    setCurrentPage(pageNumber)
  };


//   const nextPage = () => {
//     if(pageNumbers.length > currentPage){
//         setCurrentPage(prevCount => prevCount + 1);
//     }
//   };


//   const previousPage = () => {
//     if(currentPage > 1){
//         setCurrentPage(prevCount => prevCount - 1);
//     }
//   };

 

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
                                            <button className="btn btn-default"><i className="fa fa-print" aria-hidden="true"></i> Print</button>
                                        </div>
                                        <div className="pagination">
                                            <Pagination 
                                                pageNumbers={pageNumbers}
                                                currentPage={currentPage}
                                                // nextPage={nextPage}
                                                // previousPage={previousPage}
                                                paginate={paginate} />
                                        </div>
                                    </div>

                                    <div className={styles.reportAllPageWrapper}>
                                        {
                                            pageNumbers.map( (page) => (
                                                <ReportPage 
                                                    page={page} 
                                                    currentPage={currentPage}
                                                    setCurrentPage={setCurrentPage}
                                                    isLoading={isLoading}
                                                    grandTotalCylinder={grandTotalCylinder}
                                                    grandTotalSurfaceArea={grandTotalSurfaceArea}
                                                    orderTypes={orderTypes}
                                                    reportsPerPage={reportsPerPage}
                                                />
                                            ))
                                        }
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