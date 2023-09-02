import React, { Fragment, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { supplierInformationAPI, userHasAccess } from '../../../../api/userUrl';
import { userGetMethod, userDeleteMethod } from '../../../../api/userAction';
import { AddButton, EditButton, DeleteButton } from '../../../common/GlobalButton';
import Pagination from "react-js-pagination";

export default function ListData(props) {
    const [supplierInformationData, setSupplierInformationData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [hasAccess, setHasAccess] = useState({});
    const [accLoad, setAccLoad] = useState(true);
    const [currentPage, setCurrentPage] = useState();
    const [perPage, setPerPage] = useState(10);
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
        handlePageChange();
    },[]);

    const handleSearchText = (e) =>{
        setSearchText(e);
    }
    const searchHandler = (e) =>{
        setIsLoading(true);
        userGetMethod(supplierInformationAPI+'?searchText='+searchText)
        .then(response => {
            setSupplierInformationData(response.data.supplierInfos.data)
            setIsLoading(false);
        })
        .catch(error => console.log(error)); 
    }

    const deleteHandler = (itemId, deleteLink) => {
        userDeleteMethod(deleteLink, itemId)
            .then(response => {
                if (response.data.status == 1) {
                    setIsLoading(true);
                    let newData = supplierInformationData.filter(data => data.id != itemId);
                    setSupplierInformationData(newData);
                    setIsLoading(false);
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch(error => toast.error(error));
    }

    const handlePageChange = (pageNumber = 1) => {
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(`${supplierInformationAPI}?page=${pageNumber}&perPage=${perPage}`)
            .then(response => {
                console.log("current_page", response.data);
                setCurrentPage(response.data.supplierInfos.current_page)
                setPerPage(response.data.supplierInfos.per_page)
                setTotalData(response.data.supplierInfos.total)
                setSupplierInformationData(response.data.supplierInfos.data)
                setIsLoading(false);
            })
            .catch(error => console.log(error))
    }

    const perPageHandler = (e) => {
        let perPage = e.target.value;
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(`${supplierInformationAPI}?perPage=${perPage}`)
            .then(response => {
                setCurrentPage(response.data.supplierInfos.current_page)
                setPerPage(response.data.supplierInfos.per_page)
                setTotalData(response.data.supplierInfos.total)
                setSupplierInformationData(response.data.supplierInfos.data)
                setIsLoading(false)
            })
            .catch(error => console.log(error))
    }

    const sortHandler = (params) => {
        setAscDesc(!ascDesc);
        console.log('sort', ascDesc);
        let ascUrl = '';
        if (ascDesc === true) {
            ascUrl = `${supplierInformationAPI}?asc=${params}&desc=`;
        } else {
            ascUrl = `${supplierInformationAPI}?asc=&desc=${params}`;
        }
        
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(ascUrl)
            .then(response => {
                setCurrentPage(response.data.supplierInfos.current_page)
                setPerPage(response.data.supplierInfos.per_page)
                setTotalData(response.data.supplierInfos.total)
                setSupplierInformationData(response.data.supplierInfos.data)
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
                                        <h5>Supplier Information</h5>
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
                                    <AddButton link="supplierInformation/add" menuId={menuId} />
                                    <div className="custom-table-pagination m-r-10 pull-right">
                                        <label className="mt-3">
                                            <span>
                                                <select className="form-control pagi-select" onChange={perPageHandler}>
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                </select>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                                
                            <div className="card-body datatable-react">
                                {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <div className="table-responsive">
                                        <table className="table table-border-horizontal">
                                            <thead>
                                                <tr>
                                                    <th scope="col" width="8%" onClick={() => sortHandler(1)} >SL.</th>
                                                    <th scope="col" width="10%" onClick={() => sortHandler(2)} >Supplier Id</th>
                                                    <th scope="col" width="15%" onClick={() => sortHandler(3)} >Name</th>
                                                    <th scope="col" width="15%" onClick={() => sortHandler(4)} >Address</th>
                                                    <th scope="col" width="10%" onClick={() => sortHandler(6)} >Mobile</th>
                                                    <th scope="col" width="10%" onClick={() => sortHandler(7)} >Email</th>
                                                    <th scope="col" width="10%" onClick={() => sortHandler(8)} >Bill Config Status</th>
                                                    <th scope="col" width="7%" onClick={() => sortHandler(8)} >Sqr Inch Amount</th>
                                                    <th scope="col" width="7%" onClick={() => sortHandler(8)} >Sqr CM Amount</th>
                                                    <th scope="col" width="5%">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { 
                                                    supplierInformationData.length > 0 ? 
                                                        <>
                                                            {supplierInformationData.map((item, index) =>           
                                                                (
                                                                    <tr key={index}>
                                                                        <td scope="row">{ ((index+1) + (currentPage == 1 ? 0 : (currentPage*perPage - perPage))) }</td>
                                                                        <td>{item.supplier_id}</td>
                                                                        <td>{item.name}</td>
                                                                        <td>{item.address}</td>
                                                                        <td>{item.mobile}</td>
                                                                        <td>{item.email}</td>
                                                                        <td>{item.config_status== 1 ? 'Square Inch' : 'Square CM'}</td>
                                                                        <td>{item.sqr_inch_amount}</td>
                                                                        <td>{item.sqr_cm_amount}</td>
                                                                        <td className="">
                                                                            {
                                                                                accLoad === false ? <>
                                                                                    {hasAccess.edit === true ? <EditButton link={`/supplierInformation/edit/${item.id}`} menuId={ menuId } /> : ''} 
                                                                                    {hasAccess.destroy === true ? <DeleteButton deleteLink={supplierInformationAPI} deleteHandler={ deleteHandler } menuId={ menuId } dataId={item.id} /> : ''} 
                                                                                </> : ''
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                )                
                                                            )}
                                                        </> 
                                                    : <tr><td colSpan="8" className="text-center">No data found</td></tr>
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