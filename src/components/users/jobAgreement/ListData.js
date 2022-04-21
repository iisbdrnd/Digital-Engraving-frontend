import React, { Fragment, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { JOB_AGREEMENT_RSURL, userHasAccess } from '../../../api/userUrl';
import { userGetMethod, userDeleteMethod } from '../../../api/userAction';
import { AddButton, EditButton, DeleteButton, PerPageBox, PanelRefreshIcons } from '../../common/GlobalButton';
import Pagination from "react-js-pagination";

export default function ListData(props) {
    const [jobAgreementData, setJobAgreementData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [hasAccess, setHasAccess] = useState({});
    const [accLoad, setAccLoad] = useState(true);
    const [currentPage, setCurrentPage] = useState();
    const [perPage, setPerPage] = useState();
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
                setHasAccess(response.data);
                setAccLoad(false);
            });
        
        // TABLE DATA READY
        pageChange();
    },[]);

    const handleSearchText = (e) => {
        setSearchText(e);
    }
    const searchHandler = (e) => {
        setIsLoading(true);
        userGetMethod(JOB_AGREEMENT_RSURL+'?searchText='+searchText)
        .then(response => {
            setJobAgreementData(response.data.pendingJobOrders.data)
            setIsLoading(false);
        })
        .catch(error => console.log(error)); 
    }

    const deleteHandler = (itemId, deleteLink) => {
        userDeleteMethod(deleteLink, itemId)
            .then(response => {
                if (response.data.status == 1) {
                    setIsLoading(true);
                    let newData = jobAgreementData.filter(data => data.id != itemId);
                    setJobAgreementData(newData);
                    setIsLoading(false);
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch(error => toast.error(error));
    }

    const pageChange = (pageNumber = 1) => {
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(`${JOB_AGREEMENT_RSURL}?page=${pageNumber}`)
            .then(response => {
                setCurrentPage(response.data.pendingJobOrders.current_page)
                setPerPage(response.data.pendingJobOrders.per_page)
                setTotalData(response.data.pendingJobOrders.total)
                setJobAgreementData(response.data.pendingJobOrders.data)
                setIsLoading(false);
            })
            .catch(error => console.log(error))
    }

    const perPageBoxChange = (e) => {
        let paramValue = e.target.value;
        let paramName = e.target.name;
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(`${JOB_AGREEMENT_RSURL}?${paramName}=${paramValue}`)
            .then(response => {
                setCurrentPage(response.data.pendingJobOrders.current_page)
                setPerPage(response.data.pendingJobOrders.per_page)
                setTotalData(response.data.pendingJobOrders.total)
                setJobAgreementData(response.data.pendingJobOrders.data)
                setIsLoading(false)
            })
            .catch(error => console.log(error))
    }

    const sortHandler = (params) => {
        setAscDesc(!ascDesc);
        let ascUrl = '';
        if (ascDesc === true) {
            ascUrl = `${JOB_AGREEMENT_RSURL}?asc=${params}&desc=`;
        } else {
            ascUrl = `${JOB_AGREEMENT_RSURL}?asc=&desc=${params}`;
        }
        
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(ascUrl)
            .then(response => {
                setCurrentPage(response.data.pendingJobOrders.current_page)
                setPerPage(response.data.pendingJobOrders.per_page)
                setTotalData(response.data.pendingJobOrders.total)
                setJobAgreementData(response.data.pendingJobOrders.data)
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
                                    <div className="col-md-6">
                                        <h5>Job Agreement List</h5>
                                    </div>
                                    <div className="col-md-6">
                                        <PanelRefreshIcons panelRefresh={pageChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3 col-lg-3">
                                    <div className="input-group text-box searchBox">
                                        <input
                                            type="text"
                                            className="form-control input-txt-bx"
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
                                <div className="col-md-5 col-lg-5">
                                    <div className="custom-table-pagination m-r-10">
                                        <label className="mt-3">
                                            <span>
                                                <select className="form-control pagi-select" name="agreement_status" onChange={perPageBoxChange} >
                                                    <option value="2">All Orders</option>
                                                    <option value="0" selected={true} >Pending Orders</option>
                                                    <option value="1">Done Orders</option>
                                                </select>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-4">
                                    <AddButton link="jobAgreement/add" menuId={menuId} />
                                    <PerPageBox pageBoxChange={perPageBoxChange}/>
                                </div>
                            </div>
                                
                            <div className="card-body datatable-react">
                                {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <div className="table-responsive">
                                        <table className="table table-border-horizontal">
                                            <thead>
                                                <tr>
                                                    <th scope="col" width="5%" onClick={() => sortHandler(1)} ><i className="fa fa-sort"></i> SL.</th>
                                                    <th scope="col" width="10%" onClick={() => sortHandler(2)} ><i className="fa fa-sort"></i> Job No.</th>
                                                    <th scope="col" width="15%" onClick={() => sortHandler(3)} ><i className="fa fa-sort"></i> Job Name</th>
                                                    <th scope="col" width="10%" onClick={() => sortHandler(4)} ><i className="fa fa-sort"></i> Type</th>                                                        
                                                    <th scope="col" width="10%" onClick={() => sortHandler(5)}><i className="fa fa-sort"></i> Client</th>
                                                    <th scope="col" width="15%" onClick={() => sortHandler(6)} ><i className="fa fa-sort"></i> Printer</th>
                                                    <th scope="col" width="10%" ><i className="fa fa-sort"></i> Qty</th>
                                                    <th scope="col" width="10%" ><i className="fa fa-sort"></i> Per Sqr Amount</th>
                                                    <th scope="col" width="10%" ><i className="fa fa-sort"></i> Agreement</th>
                                                    <th scope="col" width="7%">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { 
                                                    jobAgreementData.length > 0 ? 
                                                        <>
                                                            {jobAgreementData.map((item, index) =>           
                                                                (
                                                                    <tr key={index}>
                                                                        <td scope="row">{ ((index+1) + (currentPage == 1 ? 0 : (currentPage*perPage - perPage))) }</td>
                                                                        <td>{item.job_no}</td>
                                                                        <td>{item.job_name}</td>
                                                                        <td>{item.job_type}</td>
                                                                        <td>{item.client_name}</td>
                                                                        <td>{item.printer_name}</td>
                                                                        <td>{item.total_cylinder_qty}</td>
                                                                        <td>{item.per_square_amount}</td>
                                                                        <td>
                                                                        <Link 
                                                                        to={{
                                                                            pathname: `${process.env.PUBLIC_URL}/jobAgreement/add`,
                                                                            state: { params: {menuId: menuId, job_order_id : item.id} }
                                                                        }}
                                                                        className="btn btn-secondary btn-xs">
                                                                            Agreement
                                                                        </Link>
                                                                        </td>
                                                                        <td className="">
                                                                            {
                                                                                accLoad === false ? <>
                                                                                    {hasAccess.edit === true ? <EditButton link={`/jobAgreement/edit/${item.id}`} menuId={ menuId } /> : ''} 
                                                                                    {hasAccess.destroy === true ? <DeleteButton deleteLink={JOB_AGREEMENT_RSURL} deleteHandler={ deleteHandler } menuId={ menuId } dataId={item.id} /> : ''} 
                                                                                </> : ''
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                )                
                                                            )}
                                                        </> 
                                                    : <tr><td colSpan="12" className="text-center">No data found</td></tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                                <Pagination 
                                    activePage={currentPage}
                                    itemsCountPerPage={perPage}
                                    totalItemsCount={totalData}
                                    onChange={pageChange}
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