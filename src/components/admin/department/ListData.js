import React, { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "react-js-pagination";
import { adminGetMethod, adminDeleteMethod } from '../../../api/action'
import { DEPARTMENTS_RSURL } from '../../../api/adminUrl'
import { AddButton, EditButton, DeleteButton, PerPageBox } from '../../admin/common/GlobalButton';

export default function ListData(props) {
    const [departmentData, setDepartmentData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState();
    const [perPage, setPerPage] = useState();
    const [totalData, setTotalData] = useState();
    const [ascDesc, setAscDesc] = useState(false);
    
    useEffect(() => {
        // TABLE DATA READY
        pageChange();
    },[]);

    const handleSearchText = (e) => {
        setSearchText(e);
    }
    const searchHandler = (e) => {
        setIsLoading(true);
        adminGetMethod(DEPARTMENTS_RSURL+'?searchText='+searchText)
        .then(response => {
            setDepartmentData(response.data.designations.data)
            setIsLoading(false);
        })
        .catch(error => console.log(error)); 
    }

    const deleteHandler = (itemId, deleteLink) => {
        adminDeleteMethod(deleteLink, itemId)
            .then(response => {
                if (response.data.status == 1) {
                    setIsLoading(true);
                    let newData = departmentData.filter(data => data.id != itemId);
                    setDepartmentData(newData);
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
        adminGetMethod(`${DEPARTMENTS_RSURL}?page=${pageNumber}`)
            .then(response => {
                setCurrentPage(response.data.designations.current_page)
                setPerPage(response.data.designations.per_page)
                setTotalData(response.data.designations.total)
                setDepartmentData(response.data.designations.data)
                setIsLoading(false);
            })
            .catch(error => console.log(error))
    }

    const perPageBoxChange = (e) => {
        let perPage = e.target.value;
        setIsLoading(true);
        // TABLE DATA READY
        adminGetMethod(`${DEPARTMENTS_RSURL}?perPage=${perPage}`)
            .then(response => {
                setCurrentPage(response.data.designations.current_page)
                setPerPage(response.data.designations.per_page)
                setTotalData(response.data.designations.total)
                setDepartmentData(response.data.designations.data)
                setIsLoading(false)
            })
            .catch(error => console.log(error))
    }

    const sortHandler = (params) => {
        setAscDesc(!ascDesc);
        let ascUrl = '';
        if (ascDesc === true) {
            ascUrl = `${DEPARTMENTS_RSURL}?asc=${params}&desc=`;
        } else {
            ascUrl = `${DEPARTMENTS_RSURL}?asc=&desc=${params}`;
        }
        
        setIsLoading(true);
        // TABLE DATA READY
        adminGetMethod(ascUrl)
            .then(response => {
                setCurrentPage(response.data.designations.current_page)
                setPerPage(response.data.designations.per_page)
                setTotalData(response.data.designations.total)
                setDepartmentData(response.data.designations.data)
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
                                        <h5>Department List</h5>
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
                                    <AddButton link="department/add" />
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
                                                    <th scope="col" width="8%" onClick={() => sortHandler(1)} ><i className="fa fa-sort"></i> SL.</th>
                                                    <th scope="col" width="64%" onClick={() => sortHandler(2)} ><i className="fa fa-sort"></i> Department Name</th>
                                                    <th scope="col" width="20%" onClick={() => sortHandler(3)} ><i className="fa fa-sort"></i> Active Status</th>                                                        
                                                    <th scope="col" width="8%">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { 
                                                    departmentData.length > 0 ? 
                                                        <>
                                                            {departmentData.map((item, index) =>           
                                                                (
                                                                    <tr key={index}>
                                                                        <td scope="row">{ ((index+1) + (currentPage == 1 ? 0 : (currentPage*perPage - perPage))) }</td>
                                                                        <td>{item.department}</td>
                                                                        <td>{item.active_status == 1 ? 'Yes' : 'No' }</td>
                                                                        <td className="">
                                                                            <EditButton link={`/department/edit/${item.id}`} />
                                                                            <DeleteButton deleteLink={DEPARTMENTS_RSURL} deleteHandler={ deleteHandler } dataId={item.id} />
                                                                        </td>
                                                                    </tr>
                                                                )                
                                                            )}
                                                        </> 
                                                    : <tr><td colSpan="5" className="text-center">No data found</td></tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                                <Pagination 
                                    activePage={currentPage}
                                    itemsCountPerPage={perPage}
                                    totalItemsCount={totalData ? totalData : 0}
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