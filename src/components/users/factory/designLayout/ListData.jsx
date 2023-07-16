import React, { useEffect } from "react";
import { Fragment } from "react";
import { AddButton, PanelRefreshIcons, PerPageBox, EditButton } from "../../../common/GlobalButton";
import Pagination from "react-js-pagination";
import { useState } from "react";
import { toast } from "react-toastify";
import { userGetMethod, userDeleteMethod } from "../../../../api/userAction";
import { DESIGN_LAYOUT_RSURL,userHasAccess } from "../../../../api/userUrl";
import { Link } from "react-router-dom";
const ListData = (props) =>  {
    const [isLoading, setIsLoading] =useState(false);
    const [hasAccess, setHasAccess] = useState({});
    const [searchText, setSearchText] = useState('');
    const [accLoad, setAccLoad] = useState(true);
    const [layoutData, setLayoutData] = useState([]);
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
        userGetMethod(`${userHasAccess}/${menuId}`)
            .then(response => {
                setHasAccess(response.data);
                setAccLoad(false);
            })

            pageChange();
    }, [])
    console.log(layoutData);

    useEffect(() => {
        perPageBoxChange();
    },[jobActiveStatus,perPage])

    const handleSearchText = (e) => {
        setSearchText(e);
    }

    const searchHandler = (e) => {
        setIsLoading(true);
        userGetMethod(`${DESIGN_LAYOUT_RSURL}?layout_status=${jobActiveStatus}&page=${1}&perPage=${perPage}&searchText=${searchText}`)
        .then(response => {
            setCurrentPage(response.data.pendingLayouts.current_page)
            setPerPage(response.data.pendingLayouts.per_page)
            setTotalData(response.data.pendingLayouts.total)
            setLayoutData(response?.data?.pendingLayouts?.data)
            setIsLoading(false);
        })
        .catch(error => console.log(error)); 
    }

    const deleteHandler = (itemId, deleteLink) => {
        userDeleteMethod(deleteLink, itemId)
            .then(response => {
                if (response.data.status == 1) {
                    setIsLoading(true);
                    let newData = layoutData.filter(data => data.id != itemId);
                    setLayoutData(newData);
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
        userGetMethod(`${DESIGN_LAYOUT_RSURL}?layout_status=${jobActiveStatus}&page=${pageNumber}&perPage=${perPage}&searchText=${searchText}`)
            .then(response => {
                console.log("res", response.data);
                setCurrentPage(response.data.pendingLayouts.current_page)
                setPerPage(response.data.pendingLayouts.per_page)
                setTotalData(response.data.pendingLayouts.total)
                setLayoutData(response?.data?.pendingLayouts?.data)
                setIsLoading(false);
            })
            .catch(error => console.log(error))
    }
    

    const perPageBoxChange = (e) => {
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(`${DESIGN_LAYOUT_RSURL}?layout_status=${jobActiveStatus}&perPage=${perPage}&searchText=${searchText}`)
            .then(response => {
                setCurrentPage(response.data.pendingLayouts.current_page)
                setPerPage(response.data.pendingLayouts.per_page)
                setTotalData(response.data.pendingLayouts.total)
                setLayoutData(response?.data?.pendingLayouts?.data)
                setIsLoading(false);
            })
            .catch(error => console.log(error))
    }
    console.log(layoutData);
    const sortHandler = (params) => {
        setAscDesc(!ascDesc);
        let ascUrl = '';
        if (ascDesc === true) {
            ascUrl = `${ DESIGN_LAYOUT_RSURL}?asc=${params}&desc=`;
        } else {
            ascUrl = `${ DESIGN_LAYOUT_RSURL}?asc=&desc=${params}`;
        }
        
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(ascUrl)
            .then(response => {
                setCurrentPage(response.data.pendingGrindings.current_page)
                setPerPage(response.data.pendingGrindings.per_page)
                setTotalData(response.data.pendingGrindings.total)
                setLayoutData(response.data.pendingGrindings.data)
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
                                    <h5>Layout List</h5>
                                </div>
                                <div className="col-md-6">
                                    <PanelRefreshIcons PanelRefresh={pageChange}/>
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
                                            <select className="form-control pagi-select" name="layout_status" onChange={(e) => setJobActiveStatus(e.target.value)} value={jobActiveStatus} >
                                            <option value="2">All Layout</option>
                                                    <option value="0">Pending Layout</option>
                                                    <option value="1">Done Layout</option>
                                            </select>
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-4">
                                <AddButton link="designLayout/add" menuId={menuId} />
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
                                                <th scope="col" width="5%"  ><i className="fa fa-sort"></i> SL.</th>
                                                <th scope="col" width="10%"  ><i className="fa fa-sort"></i> Job No.</th>
                                                <th scope="col" width="15%"  ><i className="fa fa-sort"></i> Job Name</th>
                                                <th scope="col" width="5%"><i className="fa fa-sort"></i> Type</th>
                                                <th scope="col" width="15%"><i className="fa fa-sort"></i> Client</th>   
                                                <th scope="col" width="10%"><i className="fa fa-sort"></i> Approve</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { 
                                                layoutData.length > 0 ? 
                                                    <>
                                                        {layoutData.map((item, key) =>           
                                                            (
                                                                <tr key={key}>
                                                                    <td scope="row">{ ((key+1) + (currentPage == 1 ? 0 : (currentPage*perPage - perPage))) }</td>
                                                                    <td>{item.job_no}</td>
                                                                    <td>{item.job_name}</td>
                                                                    <td>{item.job_type}</td>
                                                                    <td>{item.client_name}</td>
                                                                    <td>
                                                                    <Link
                                                                        to={{
                                                                            pathname: `${process.env.PUBLIC_URL}/designLayout/add`,
                                                                            state: { params: { menuId: menuId, jobNo: item.id } }
                                                                        }}
                                                                        className="btn btn-secondary btn-xs">
                                                                        Layout
                                                                    </Link>
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
      );
}
export default ListData;