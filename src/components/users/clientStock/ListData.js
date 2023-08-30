import React, { Fragment, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { CLIENT_STOCK_RSURL, userHasAccess } from '../../../api/userUrl';
import { userGetMethod, userDeleteMethod } from '../../../api/userAction';
import { AddButton, EditButton, DeleteButton, PerPageBox, PanelRefreshIcons } from '../../common/GlobalButton';
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';

export default function ListData(props) {
    const [clientStockData, setClientStockData] = useState([]);
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
        pageChange();
    },[]);

    useEffect(() => {
        perPageBoxChange();
    },[perPage])

    const handleSearchText = (e) => {
        setSearchText(e);
    }
    const searchHandler = (e) => {
        setIsLoading(true);
        userGetMethod(`${CLIENT_STOCK_RSURL}?page=${1}&perPage=${perPage}&searchText=${searchText}`)
        .then(response => {
            setCurrentPage(response.data.clientStocks.current_page)
            setPerPage(response.data.clientStocks.per_page)
            setTotalData(response.data.clientStocks.total)
            setClientStockData(response.data.clientStocks.data)
            setIsLoading(false);
        })
        .catch(error => console.log(error)); 
    }

    const deleteHandler = (itemId, deleteLink) => {
        userDeleteMethod(deleteLink, itemId)
            .then(response => {
                if (response.data.status == 1) {
                    setIsLoading(true);
                    let newData = clientStockData.filter(data => data.id != itemId);
                    setClientStockData(newData);
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
        userGetMethod(`${CLIENT_STOCK_RSURL}?page=${pageNumber}&perPage=${perPage}&searchText=${searchText}`)
            .then(response => {
                setCurrentPage(response.data.clientStocks.current_page)
                setPerPage(response.data.clientStocks.per_page)
                setTotalData(response.data.clientStocks.total)
                setClientStockData(response.data.clientStocks.data)
                setIsLoading(false);
            })
            .catch(error => console.log(error))
    }

    const perPageBoxChange = (e) => {
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(`${CLIENT_STOCK_RSURL}?perPage=${perPage}&searchText=${searchText}`)
            .then(response => {
                setCurrentPage(response.data.clientStocks.current_page)
                setPerPage(response.data.clientStocks.per_page)
                setTotalData(response.data.clientStocks.total)
                setClientStockData(response.data.clientStocks.data)
                setIsLoading(false)
            })
            .catch(error => console.log(error))
    }

    const sortHandler = (params) => {
        setAscDesc(!ascDesc);
        let ascUrl = '';
        if (ascDesc === true) {
            ascUrl = `${CLIENT_STOCK_RSURL}?asc=${params}&desc=`;
        } else {
            ascUrl = `${CLIENT_STOCK_RSURL}?asc=&desc=${params}`;
        }
        
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(ascUrl)
            .then(response => {
                setCurrentPage(response.data.clientStocks.current_page)
                setPerPage(response.data.clientStocks.per_page)
                setTotalData(response.data.clientStocks.total)
                setClientStockData(response.data.clientStocks.data)
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
                                        <h5>Client Stock Lists</h5>
                                    </div>
                                    <div className="col-md-6">
                                        {/* <PanelRefreshIcons panelRefresh={pageChange} /> */}
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
                                    {/* <div className="custom-table-pagination m-r-10">
                                        <label className="mt-3">
                                            <span>
                                                <select className="form-control pagi-select" name="design_to_design_status" onChange={perPageBoxChange} >
                                                    <option value="2">All</option>
                                                    <option value="0" selected={true} >Pending</option>
                                                    <option value="1">Done</option>
                                                </select>
                                            </span>
                                        </label>
                                    </div> */}
                                </div>
                                <div className="col-md-4 col-lg-4">
                                    <AddButton link="clientStock/add" menuId={menuId} />
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
                                                    <th scope="col" width="5%" >SL.</th>
                                                    {/* <th scope="col" width="5%" onClick={() => sortHandler(1)}><i className="fa fa-sort"></i> SL.</th> */}
                                                    <th scope="col" width="15%" >Job No</th>
                                                    <th scope="col" width="15%">Job Name</th>
                                                    <th scope="col" width="10%">Available Qnty</th>                                                        
                                                    <th scope="col" width="15%" > Client</th>
                                                    <th scope="col" width="10%" >Circumference</th>
                                                    <th scope="col" width="10%" >Face Length</th>
                                                    {/* <th scope="col" width="7%">Action</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { 
                                                    clientStockData.length > 0 ? 
                                                        <>
                                                            {clientStockData.map((item, index) =>           
                                                                (
                                                                    <tr key={index}>
                                                                        <td scope="row">{ ((index+1) + (currentPage == 1 ? 0 : (currentPage*perPage - perPage))) }</td>
                                                                        <td>{item.job_no}</td>
                                                                        <td>{item.job_name}</td>
                                                                        <td>{Math.abs(item.total_cylinder)}</td>
                                                                        <td>{item.client_name}</td>
                                                                        <td>{item.circumference}</td>
                                                                        <td>{item.face_length}</td>
                                                                        {/* 
                                                                        <td>
                                                                            {item.design_to_design_status == 0 ? 
                                                                            <Link 
                                                                                to={{
                                                                                    pathname: `${process.env.PUBLIC_URL}/designToDesign/add`,
                                                                                    state: { params: {menuId: menuId, job_order_id : item.id} }
                                                                                }}
                                                                                className="btn btn-secondary btn-xs">
                                                                                    Design Approve
                                                                            </Link>
                                                                            : 'Done'}
                                                                        </td> */}
                                                                        {/* <td className="">
                                                                            {
                                                                                accLoad === false ? <>
                                                                                    {hasAccess.edit === true ? <EditButton link={`/baseReceive/edit/${item.id}`} menuId={ menuId } /> : ''} 
                                                                                    {hasAccess.destroy === true ? <DeleteButton deleteLink={CLIENT_STOCK_RSURL} deleteHandler={ deleteHandler } menuId={ menuId } dataId={item.id} /> : ''} 
                                                                                </> : ''
                                                                            }
                                                                        </td> */}
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