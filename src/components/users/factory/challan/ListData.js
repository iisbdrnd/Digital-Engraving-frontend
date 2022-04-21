import React, { Fragment, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { filterJobOrderChallanAPI, userHasAccess } from '../../../../api/userUrl';
import { userGetMethod, userDeleteMethod } from '../../../../api/userAction';
import { AddButton, EditButton, DeleteButton, PerPageBox } from '../../../common/GlobalButton';
import Pagination from "react-js-pagination";

export default function ListData(props) {
    const [jobOrderData, setJobOrderData] = useState([]);
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
        userGetMethod(filterJobOrderChallanAPI+'?searchText='+searchText)
        .then(response => {
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

    const pageChange = (pageNumber = 1) => {
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(`${filterJobOrderChallanAPI}?page=${pageNumber}`)
            .then(response => {
                setCurrentPage(response.data.jobOrders.current_page)
                setPerPage(response.data.jobOrders.per_page)
                setTotalData(response.data.jobOrders.total)
                setJobOrderData(response.data.jobOrders.data)
                setIsLoading(false);
            })
            .catch(error => console.log(error))
    }

    const perPageBoxChange = (e) => {
        let perPage = e.target.value;
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(`${filterJobOrderChallanAPI}?perPage=${perPage}`)
            .then(response => {
                setCurrentPage(response.data.jobOrders.current_page)
                setPerPage(response.data.jobOrders.per_page)
                setTotalData(response.data.jobOrders.total)
                setJobOrderData(response.data.jobOrders.data)
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
                                        <h5>Challan List</h5>
                                    </div>
                                    <div className="col-md-6">
                                        <ul className="d-flex pull-right">
                                            <li className="p-r-10 cursor-pointer" onClick={pageChange}><i className="fa fa-rotate-right"></i></li>
                                            <li className="p-r-10"><i className="fa fa-minus"></i></li>
                                            <li className="p-r-10"><i className="icon-close"></i></li>
                                        </ul>
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
                                    {/* <AddButton link="challan/add" menuId={menuId} /> */}
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
                                                    <th scope="col" width="8%"><i className="fa fa-sort"></i> SL.</th>
                                                    <th scope="col" width="10%"><i className="fa fa-sort"></i> Job No.</th>
                                                    <th scope="col" width="10%"><i className="fa fa-sort"></i> Job Name</th>                                                      
                                                    <th scope="col" width="10%"><i className="fa fa-sort"></i> Client</th>
                                                    <th scope="col" width="15%"><i className="fa fa-sort"></i> Marketing Person</th>
                                                    <th scope="col" width="12%"><i className="fa fa-sort"></i> Printer Name</th>
                                                    <th scope="col" width="10%"><i className="fa fa-sort"></i> Job Type</th>
                                                    <th scope="col" width="15%">Action</th>
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

                                                                                    {item.challan_complete == 1 ? 
                                                                                    <button className="btn btn-success btn-sm">Done</button> :   <a className="btn btn-primary btn-xs" href={`/challan/edit/${item.id}`} menuId={ menuId }>Challan</a>}
                                                                                    &nbsp;&nbsp;&nbsp;
                                                                                    
                                                                                    {item.challan_complete == 1 ? <a className="btn btn-info btn-xs mr-1" href={`/challan/show/${item.id}`} menuId={ menuId }>Details</a> : ''}

                                                                                   
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