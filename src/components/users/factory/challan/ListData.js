import React, { Fragment, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { filterJobOrderChallanAPI, userHasAccess } from '../../../../api/userUrl';
import { userGetMethod, userDeleteMethod } from '../../../../api/userAction';
import { AddButton, EditButton, DeleteButton, PerPageBox } from '../../../common/GlobalButton';
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';
import { FaRegFilePdf } from "react-icons/fa";

export default function ListData(props) {
    const [jobOrderData, setJobOrderData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [hasAccess, setHasAccess] = useState({});
    const [accLoad, setAccLoad] = useState(true);
    const [currentPage, setCurrentPage] = useState();
    const [perPage, setPerPage] = useState(10);
    const [totalData, setTotalData] = useState(0);
    const [ascDesc, setAscDesc] = useState(false);
    const [jobActiveStatus,setJobActiveStatus] = useState(0);

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
        userGetMethod(`${filterJobOrderChallanAPI}?challan_status=${jobActiveStatus}&page=${1}&perPage=${perPage}&searchText=${searchText}`)
        .then(response => {
            setCurrentPage(response.data.challans.current_page)
            setPerPage(response.data.challans.per_page)
            setTotalData(response.data.challans.total)
            setJobOrderData(response.data.challans.data)
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
        userGetMethod(`${filterJobOrderChallanAPI}?challan_status=${jobActiveStatus}&page=${pageNumber}&perPage=${perPage}&searchText=${searchText}`)
            .then(response => {
                setCurrentPage(response.data.challans.current_page)
                setPerPage(response.data.challans.per_page)
                setTotalData(response.data.challans.total)
                setJobOrderData(response.data.challans.data)
                setIsLoading(false);
            })
            .catch(error => console.log(error))
    }
    const handleQCFrom =(item) =>{
        // let url = `${process.env.PUBLIC_URL}/designToFactory/form`;
        // window.open(url, '_blank', 'height=800,width=1200');
        const url = `${process.env.PUBLIC_URL}/challanForm/${item.id}`;
        const stateParams = { menuId, job_order_id: item.id };
        window.open(url, '_blank', 'height=800,width=1200', { params: stateParams })

        // const queryString = Object.keys(stateParams)
        // .map((key) => `${key}=${stateParams[key]}`)
        // .join('&');

        // Open a new window with the URL and dimensions
        // window.open(`${url}`, '_blank', 'height=800,width=1200');

        // Use history to navigate and pass state to the new route
        // history.push({
        //     pathname: getUrl,
        //     state: { params: stateParams }
        // });
    }

    const perPageBoxChange = (e) => {
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(`${filterJobOrderChallanAPI}?challan_status=${jobActiveStatus}&perPage=${perPage}&searchText=${searchText}`)
            .then(response => {
                setCurrentPage(response.data.challans.current_page)
                setPerPage(response.data.challans.per_page)
                setTotalData(response.data.challans.total)
                setJobOrderData(response.data.challans.data)
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
                                    
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 col-lg-4">
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

                                <div className="col-md-4 col-lg-4">
                                    <div className="custom-table-pagination m-r-10">
                                        <label className="mt-3">
                                            <span>
                                                <select className="form-control pagi-select" name="challan_status" onChange={(e) => setJobActiveStatus(parseInt(e.target.value))} value={jobActiveStatus}>
                                                    <option value="2">All Challan</option>
                                                    <option value="0">Pending Challan</option>
                                                    <option value="1">Done Challan</option>
                                                </select>
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                <div className="col-md-4 col-lg-4">
                                    <AddButton link="challan/add" menuId={menuId} />
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
                                                    {/* <th scope="col" width="8%"><i className="fa fa-sort"></i> SL.</th> */}
                                                    <th scope="col" width="8%"> SL.</th>
                                                    <th scope="col" width="10%"> Job No.</th>
                                                    <th scope="col" width="25%"> Job Name</th>                                                      
                                                    <th scope="col" width="10%"> Client</th>
                                                    <th scope="col" width="15%"> Marketing Person</th>
                                                    <th scope="col" width="12%"> Printer Name</th>
                                                    <th scope="col" width="10%">Job Type</th>
                                                    <th scope="col" width="10%">Action</th>
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
                                                                        <td>{item.marketing_person}</td>
                                                                        <td>{item.printer_name}</td>
                                                                        <td>{item.job_type}</td>
                                                                        <td className="">
            
                                                                            {
                                                                                accLoad === false ? <>

                                                                    {item.challan_complete == 1 ? 
                                                                        // <button className="btn btn-success btn-sm">View</button> 
                                                                        <div className="d-flex justify-content-around">

                                                                            <div onClick={()=>handleQCFrom(item)} style={{ cursor:"pointer"}}>
                                                                                <FaRegFilePdf size={25} color='#4466f2'/>  
                                                                            </div>
                                                                            <Link 
                                                                                to={{
                                                                                    pathname: `${process.env.PUBLIC_URL}/challan/edit/${item.id}`,
                                                                                    state: { params: {
                                                                                        menuId: menuId,
                                                                                    } }
                                                                                }}
                                                                            className="btn btn-danger btn-xs">
                                                                                View
                                                                                    </Link>
                                                                        </div>
                                                                        

                                                                        :   
                                                                        <div className="ml-3">
                                                                            <Link 
                                                                                to={{
                                                                                    pathname: `${process.env.PUBLIC_URL}/challan/edit/${item.id}`,
                                                                                    state: { params: {
                                                                                        menuId: menuId,
                                                                                    } }
                                                                                }}
                                                                            className="btn btn-primary btn-xs">
                                                                                Challan
                                                                                    </Link></div>}


                                                                        {/* <a className="btn btn-primary btn-xs" href={`/challan/edit/${item.id}`} menuId={ menuId }>Challan</a> */}

                                                                                    {/* &nbsp;&nbsp;&nbsp; */}
                                                                                    
                                                                                    
                                                                                    {/* {item.challan_complete == 1 ? <a className="btn btn-info btn-xs mr-1" href={`/challan/show/${item.id}`} menuId={ menuId }>Details</a> 
                                                                                    : 
                                                                                    ''} */}

                                                                                   
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