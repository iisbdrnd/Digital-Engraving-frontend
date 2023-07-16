import React, { Fragment, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { QUALITY_CONTROL_RS_URL, userHasAccess } from '../../../../api/userUrl';
import { userGetMethod, userDeleteMethod } from '../../../../api/userAction';
import { AddButton, EditButton, DeleteButton, PerPageBox, PanelRefreshIcons } from '../../../common/GlobalButton';
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';

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
    const [jobActiveStatus, setJobActiveStatus] = useState(0);

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
    },[jobActiveStatus,perPage])

    const handleSearchText = (e) => {
        setSearchText(e);
    }
    const searchHandler = (e) => {
        setIsLoading(true);
        userGetMethod(`${QUALITY_CONTROL_RS_URL}?qc_status=${jobActiveStatus}&page=${1}&perPage=${perPage}&searchText=${searchText}`)
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

    const pageChange = (pageNumber = 1) => {
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(`${QUALITY_CONTROL_RS_URL}?qc_status=${jobActiveStatus}&page=${pageNumber}&perPage=${perPage}&searchText=${searchText}`)
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
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(`${QUALITY_CONTROL_RS_URL}?qc_status=${jobActiveStatus}&perPage=${perPage}&searchText=${searchText}`)
            .then(response => {
                setCurrentPage(response.data.jobOrders.current_page)
                setPerPage(response.data.jobOrders.per_page)
                setTotalData(response.data.jobOrders.total)
                setJobOrderData(response.data.jobOrders.data)
                setIsLoading(false)
            })
            .catch(error => console.log(error))
    }

    const sortHandler = (params) => {
        setAscDesc(!ascDesc);
        let ascUrl = '';
        if (ascDesc === true) {
            ascUrl = `${QUALITY_CONTROL_RS_URL}?asc=${params}&desc=`;
        } else {
            ascUrl = `${QUALITY_CONTROL_RS_URL}?asc=&desc=${params}`;
        }
        
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(ascUrl)
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
                                        <h5>Quality Control List</h5>
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
                                                <select className="form-control pagi-select" name="qc_status" onChange={(e) => setJobActiveStatus(parseInt(e.target.value))} value={jobActiveStatus} >
                                                    <option value="3">All Quality Control</option>
                                                    <option value="0">Running Quality Control</option>
                                                    <option value="1">Done Quality Control</option>
                                                    <option value="2">Failed Quality Control</option>
                                                </select>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-4">
                                    <AddButton link="qualityControl/add" menuId={menuId} />
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
                                                    <th scope="col" width="7%" onClick={() => sortHandler(1)} ><i className="fa fa-sort"></i> SL.</th>
                                                    <th scope="col" width="10%" onClick={() => sortHandler(2)} ><i className="fa fa-sort"></i> Job No</th>
                                                    <th scope="col" width="14%" onClick={() => sortHandler(3)} ><i className="fa fa-sort"></i> Job Name</th>
                                                    <th scope="col" width="10%">Total Cyl</th>
                                                    <th scope="col" width="12%">Rework Cyl Qty</th>
                                                    <th scope="col" width="5%">FL</th>
                                                    <th scope="col" width="5%">Cir</th>
                                                    <th scope="col" width="5%">Dia</th>
                                                    <th scope="col" width="12%"> Plating Order</th>
                                                    <th scope="col" width="10%"> Client</th>   
                                                    <th scope="col" width="6%">Rework</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { 
                                                    jobOrderData.length > 0 ? 
                                                        <>
                                                            {jobOrderData.map((item, key) =>           
                                                                (
                                                                    <tr key={key}>
                                                                        <td scope="row">{ ((key+1) + (currentPage == 1 ? 0 : (currentPage*perPage - perPage))) }</td>
                                                                        <td>{item.job_no}</td>
                                                                        <td>{item.job_name}</td>
                                                                        <td className="text-center">{item.total_cylinder_qty} : {item.available_cyl_qty}</td>
                                                                        <td>{item.rework_cyl_qty}</td>
                                                                        <td>{item.fl}</td>
                                                                        <td>{item.cir}</td>
                                                                        <td>{item.dia}</td>
                                                                        <td>{item.plating_order}</td>
                                                                        <td>{item.client_name}</td>
                                                                        <td>
                                                                            {item.total_cylinder_qty == item.available_cyl_qty ? (
                                                                                <Link 
                                                                                    to={{
                                                                                        pathname: `${process.env.PUBLIC_URL}/qualityControl/edit/${item.id}`,
                                                                                        state: { params: {
                                                                                            menuId: menuId, 
                                                                                            // dig_polishing_id : item.id
                                                                                        } }
                                                                                    }}
                                                                                className="btn btn-secondary btn-xs">
                                                                                    Rework
                                                                                </Link>
                                                                            ) : (
                                                                                <span className="text-danger">Pending</span>
                                                                            )}
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