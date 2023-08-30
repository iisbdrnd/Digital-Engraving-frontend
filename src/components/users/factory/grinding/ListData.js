import React, { Fragment, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { GRINDING_RSURL, userHasAccess } from '../../../../api/userUrl';
import { userGetMethod, userDeleteMethod } from '../../../../api/userAction';
import { AddButton, EditButton, DeleteButton, PerPageBox, PanelRefreshIcons } from '../../../common/GlobalButton';
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function ListData(props) {
    const [grindingData, setGrindingData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [hasAccess, setHasAccess] = useState({});
    const [accLoad, setAccLoad] = useState(true);
    const [currentPage, setCurrentPage] = useState();
    const [perPage, setPerPage] = useState(10);
    const [totalData, setTotalData] = useState(0);
    const [ascDesc, setAscDesc] = useState(false);
    const [jobActiveStatus, setJobActiveStatus] = useState(0);
    const history = useHistory();

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


    const shiftHandler = () =>{
        history.push('/grinding/shiftControl')
    }


    const handleSearchText = (e) => {
        setSearchText(e);
    }
    const searchHandler = (e) => {
        setIsLoading(true);
        userGetMethod(`${GRINDING_RSURL}?grinding_status=${jobActiveStatus}&page=${1}&perPage=${perPage}&searchText=${searchText}`)
        .then(response => {
            setCurrentPage(response.data.pendingGrindings.current_page)
            setPerPage(response.data.pendingGrindings.per_page)
            setTotalData(response.data.pendingGrindings.total)
            setGrindingData(response.data.pendingGrindings.data)
            setIsLoading(false);
        })
        .catch(error => console.log(error)); 
    }

    const deleteHandler = (itemId, deleteLink) => {
        userDeleteMethod(deleteLink, itemId)
            .then(response => {
                if (response.data.status == 1) {
                    setIsLoading(true);
                    let newData = grindingData.filter(data => data.id != itemId);
                    setGrindingData(newData);
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
        userGetMethod(`${GRINDING_RSURL}?grinding_status=${jobActiveStatus}&page=${pageNumber}&perPage=${perPage}&searchText=${searchText}`)
            .then(response => {
                console.log("res", response.data);
                setCurrentPage(response.data.pendingGrindings.current_page)
                setPerPage(response.data.pendingGrindings.per_page)
                setTotalData(response.data.pendingGrindings.total)
                setGrindingData(response.data.pendingGrindings.data)
                setIsLoading(false);
            })
            .catch(error => console.log(error))
    }

    const perPageBoxChange = (e) => {
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(`${GRINDING_RSURL}?grinding_status=${jobActiveStatus}&perPage=${perPage}&searchText=${searchText}`)
            .then(response => {
                // console.log("console form pageBoxChange", response.data);
                setCurrentPage(response.data.pendingGrindings.current_page)
                setPerPage(response.data.pendingGrindings.per_page)
                setTotalData(response.data.pendingGrindings.total)
                setGrindingData(response.data.pendingGrindings.data)
                setIsLoading(false)
            })
            .catch(error => console.log(error))
            // e.stopPropagation()
    }

    const sortHandler = (params) => {
        setAscDesc(!ascDesc);
        let ascUrl = '';
        if (ascDesc === true) {
            ascUrl = `${GRINDING_RSURL}?asc=${params}&desc=`;
        } else {
            ascUrl = `${GRINDING_RSURL}?asc=&desc=${params}`;
        }
       
        // e.stopPropagation()
        
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(ascUrl)
            .then(response => {
                console.log('console come from sorting :',response.data)
                setCurrentPage(response.data.pendingGrindings.current_page)
                setPerPage(response.data.pendingGrindings.per_page)
                setTotalData(response.data.pendingGrindings.total)
                setGrindingData(response.data.pendingGrindings.data)
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
                                        <h5>Pending Grinding List</h5>
                                    </div>
                                    <div className="col-md-6 text-right">
                                         <button 
                                                className="btn btn-primary btn-sm" 
                                                type="button" 
                                                onClick={shiftHandler} 
                                            >Shift
                                            </button>
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
                                    <div className="custom-table-pagination m-r-10">
                                        <label className="mt-3">
                                            <span>
                                                <select className="form-control pagi-select" name="grinding_status" onChange={(e) => setJobActiveStatus(parseInt(e.target.value))} value={jobActiveStatus} >
                                                    <option value="2">All Grinding</option>
                                                    <option value="0">Pending Grinding</option>
                                                    <option value="1">Done Grinding</option>
                                                </select>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-4">
                                    <AddButton link="grinding/add" menuId={menuId} />
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
                                                    <th scope="col" width="5%" > SL.</th>
                                                    <th scope="col" width="10%" > Job No.</th>
                                                    <th scope="col" width="10%" > Agreement Date </th>
                                                    <th scope="col" width="40%"> Job Name</th>
                                                    <th scope="col" width="10%" > Type</th>                                                        
                                                    <th scope="col" width="15%" > Client</th>
                                                    {/* <th scope="col" width="15%" onClick={() => sortHandler(5)}><i className="fa fa-sort"></i> Client</th> */}
                                                    <th scope="col" width="10%" > Approve</th>
                                                    {/* <th scope="col" width="7%">Action</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { 
                                                    grindingData.length > 0 ? 
                                                        <>
                                                            {grindingData.map((item, index) =>           
                                                                (
                                                                    <tr key={index}>
                                                                        <td scope="row">{ ((index+1) + (currentPage == 1 ? 0 : (currentPage*perPage - perPage))) }</td>
                                                                        <td>{item.job_no}</td>
                                                                        <td>{item.agreement_date}</td>
                                                                        <td>{item.job_name}</td>
                                                                        <td>{item.job_type}</td>
                                                                        <td>{item.client_name}</td>
                                                                        {/* <td>{item.printer_name}</td>
                                                                        <td>{item.total_cylinder_qty}</td>
                                                                        <td>{item.per_square_amount}</td> */}
                                                                        <td>
                                                                            {item.grinding_status == 0 ? 
                                                                            <Link 
                                                                                to={{
                                                                                    pathname: `${process.env.PUBLIC_URL}/grinding/add`,
                                                                                    state: { params: {menuId: menuId, job_order_id : item.id} }
                                                                                }}
                                                                                className="btn btn-secondary btn-xs">
                                                                                    Grinding
                                                                            </Link>
                                                                            : 'Done'}
                                                                        </td>
                                                                        {/* <td className="">
                                                                            {
                                                                                accLoad === false ? <>
                                                                                    {hasAccess.edit === true ? <EditButton link={`/baseReceive/edit/${item.id}`} menuId={ menuId } /> : ''} 
                                                                                    {hasAccess.destroy === true ? <DeleteButton deleteLink={GRINDING_RSURL} deleteHandler={ deleteHandler } menuId={ menuId } dataId={item.id} /> : ''} 
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