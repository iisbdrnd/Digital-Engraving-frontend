import React, { Fragment, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { JOB_ORDER_RSURL, userHasAccess } from '../../../api/userUrl';
import { userGetMethod, userDeleteMethod } from '../../../api/userAction';
import { AddButton, EditButton, ShowButton, DeleteButton, PerPageBox } from '../../common/GlobalButton';
import Pagination from "react-js-pagination";


export default function ListData(props) {
    const [jobOrderData, setJobOrderData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [hasAccess, setHasAccess] = useState({});
    const [accLoad, setAccLoad] = useState(true);
    const [currentPage, setCurrentPage] = useState();
    const [perPage, setPerPage] = useState(5);
    const [totalData, setTotalData] = useState(0);
    const [ascDesc, setAscDesc] = useState(false);

    var menuId = 0;
    if (props.location.state === undefined) {
        menuId = 0;
    } else {
        menuId = props.location.state.params.menuId;
    }
    
    useEffect(() => {
        // ADD,EDIT,DELETE,SHOW ACCESS CHECK
        userGetMethod(`${userHasAccess}/${menuId}`)
            .then(response => {
                console.log(response.data)
                setHasAccess(response.data);
                setAccLoad(false);
            });
            // handlePageChange();
       
    },[]);
    // console.log(hasAccess);

    useEffect(() => {
        perPageBoxChange();
        // handlePageChange();
    },[perPage])

    const handleSearchText = (e) => {
        setSearchText(e);
    }
    const searchHandler = (e) => {
        setIsLoading(true);
        userGetMethod(`${JOB_ORDER_RSURL}?page=${1}&perPage=${perPage}&searchText=${searchText}`)
        .then(response => {
            setCurrentPage(response.data.jobOrders.current_page)
            setPerPage(response.data.jobOrders.per_page)
            setTotalData(response.data.jobOrders.total)
            setJobOrderData(response.data.jobOrders.data)
            setIsLoading(false);
        })
        .catch(error => console.log(error)); 
    }

    const deleteHandler = (itemId, deleteLink) => {
        userDeleteMethod(deleteLink, itemId)
            .then(response => {
                if (response.data.status == 1) {
                    setIsLoading(true);
                    let newData = jobOrderData.filter(data => data.id != itemId);
                    setJobOrderData(newData);
                    setIsLoading(false);
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch(error => toast.error(error));
    }

    
// console.log(jobOrderData);
    const perPageBoxChange = (e) => {
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(`${JOB_ORDER_RSURL}?perPage=${perPage}&searchText=${searchText}`)
            .then(response => {
                console.log("current page",response.data);
                setCurrentPage(response.data.jobOrders.current_page)
                setPerPage(response.data.jobOrders.per_page)
                setTotalData(response.data.jobOrders.total)
                setJobOrderData(response.data.jobOrders.data)
                setIsLoading(false)
            })
            .catch(error => console.log(error))
    }

    const handlePageChange = (pageNumber = 1) => {
        setIsLoading(true);
        console.log(pageNumber)
        // TABLE DATA READY
        userGetMethod(`${JOB_ORDER_RSURL}?page=${pageNumber}&perPage=${perPage}&searchText=${searchText}`)
            .then(response => {
                setCurrentPage(response.data.jobOrders.current_page)
                setPerPage(response.data.jobOrders.per_page)
                setTotalData(response.data.jobOrders.total)
                setJobOrderData(response.data.jobOrders.data)
                setIsLoading(false);
            })
            .catch(error => console.log(error))
    }

    const sortHandler = (params) => {
        setAscDesc(!ascDesc);
        let ascUrl = '';
        if (ascDesc === true) {
            ascUrl = `${JOB_ORDER_RSURL}?asc=${params}&desc=`;
            
        } else {
            ascUrl = `${JOB_ORDER_RSURL}?asc=&desc=${params}`;
            
        }
        
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(ascUrl)
            .then(response => {
                setCurrentPage(response.data.jobOrders.current_page)
                setPerPage(response.data.jobOrders.per_page)
                setTotalData(response.data.jobOrders.total)
                setJobOrderData(response.data.jobOrders.data)
                console.log(jobOrderData);
                setIsLoading(false)
            })
            .catch(error => console.log(error))
    }

    return (
        
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h5>Job Order List</h5>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-lg-6">
                                    <div className="input-group text-box searchBox">
                                        <input
                                            type="text"
                                            className="form-control input-txt-bx col-md-4"
                                            placeholder="Type to Search..."
                                            onChange={(e) => handleSearchText(e.target.value)}
                                        />
                                        <div className="input-group-append">
                                            <button 
                                                className="btn btn-primary btn-sm" 
                                                type="button" 
                                                onClick={searchHandler} 
                                            >Go
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6 col-lg-6">
                                    <AddButton link="jobOrder/add" menuId={menuId} />
                                    <PerPageBox pageBoxChange={perPageBoxChange} perPage={perPage} setPerPage={setPerPage}/>
                                </div>
                            </div>
                                
                            <div className="card-body datatable-react">
                                {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <div className="table-responsive">
                                        <table className="table table-border-horizontal">
                                            <thead>
                                                <tr>
                                                    <th scope="col" width="8%" > SL.</th>
                                                    {/* <th scope="col" width="8%" onClick={() => sortHandler(1)} ><i className="fa fa-sort"></i> SL.</th> */}
                                                    <th scope="col" width="10%" > Job No.</th>
                                                    <th scope="col" width="15%" > Job Name</th>                                                      
                                                    <th scope="col" width="15%" > Client</th>
                                                    <th scope="col" width="15%" > Marketing Person</th>
                                                    <th scope="col" width="15%"> Printer Name</th>
                                                    <th scope="col" width="15%"> Job Type</th>
                                                    <th scope="col" width="12%">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { 
                                                    jobOrderData.length > 0 ? 
                                                        <>
                                                            {jobOrderData.map((item, index) =>           
                                                                (
                                                                    <tr key={index}>
                                                                        <td scope="row">{ ((index+1) + (currentPage == 1 ? 0 : (currentPage*perPage - perPage))) }</td>
                                                                        <td>{item.job_no}</td>
                                                                        <td>{item.job_name}</td>
                                                                        <td>{item.client_name}</td>
                                                                        <td>{item.marketing_p_name}</td>
                                                                        <td>{item.printer_name}</td>
                                                                        <td>{item.job_type}</td>
                                                                        <td className="">
                                                                            {
                                                                                accLoad === false ? <>
                                                                                    {(hasAccess.edit === true && item?.agreement_status != 1) ? <EditButton link={`/jobOrder/edit/${item.id}`} menuId={ menuId } /> : ''} 
                                                                                    {hasAccess.show === true ? <ShowButton link={`/jobOrder/show/${item.id}`} menuId={ menuId } /> : ''} 
                                                                                    {(hasAccess.destroy === true  && item?.agreement_status != 1) ? <DeleteButton deleteLink={JOB_ORDER_RSURL} deleteHandler={ deleteHandler } menuId={ menuId } dataId={item.id} /> : ''} 
                                                                                </> : ''
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                )                
                                                            )}
                                                        </> 
                                                    : <tr><td colSpan="9" className="text-center">No data found</td></tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                                <Pagination 
                                    activePage={currentPage}
                                    itemsCountPerPage={perPage}
                                    totalItemsCount={totalData}
                                    onChange={handlePageChange}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    firstPageText="First"
                                    lastPageText="Last"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}