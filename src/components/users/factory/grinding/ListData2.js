import React, { Fragment, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { GRINDING_RSURL, userHasAccess } from '../../../../api/userUrl';
import { userGetMethod, userDeleteMethod } from '../../../../api/userAction';
import { AddButton, EditButton, DeleteButton, PerPageBox, PanelRefreshIcons } from '../../../common/GlobalButton';
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';

export default function ListData(props) {
    const [baseReceiveData, setBaseReceiveData] = useState([]);
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
        userGetMethod(GRINDING_RSURL+'?searchText='+searchText)
        .then(response => {
            setBaseReceiveData(response.data.pendingDesignToFactories)
            setIsLoading(false);
        })
        .catch(error => console.log(error)); 
    }

    const pageChange = (pageNumber = 1) => {
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(`${GRINDING_RSURL}?page=${pageNumber}`)
            .then(response => {
                setCurrentPage(response.data.pendingDesignToFactories.current_page)
                setPerPage(response.data.pendingDesignToFactories.per_page)
                setTotalData(response.data.pendingDesignToFactories.total)
                setBaseReceiveData(response.data.pendingDesignToFactories.data)
                setIsLoading(false);
            })
            .catch(error => console.log(error))
    }

    const perPageBoxChange = (e) => {
        let paramValue = e.target.value;
        let paramName = e.target.name;
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(`${GRINDING_RSURL}?${paramName}=${paramValue}`)
            .then(response => {
                setCurrentPage(response.data.pendingDesignToFactories.current_page)
                setPerPage(response.data.pendingDesignToFactories.per_page)
                setTotalData(response.data.pendingDesignToFactories.total)
                setBaseReceiveData(response.data.pendingDesignToFactories.data)
                setIsLoading(false)
            })
            .catch(error => console.log(error))
    }

    const sortHandler = (params) => {
        setAscDesc(!ascDesc);
        let ascUrl = '';
        if (ascDesc === true) {
            ascUrl = `${GRINDING_RSURL}?asc=${params}&desc=`;
        } else {
            ascUrl = `${GRINDING_RSURL}?asc=&desc=${params}`;
        }
        
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(ascUrl)
            .then(response => {
                setCurrentPage(response.data.pendingDesignToFactories.current_page)
                setPerPage(response.data.pendingDesignToFactories.per_page)
                setTotalData(response.data.pendingDesignToFactories.total)
                setBaseReceiveData(response.data.pendingDesignToFactories.data)
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
                                        <h5>Completed Grinding List</h5>
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
                                                <select className="form-control pagi-select" name="design_to_factory_status" onChange={perPageBoxChange} >
                                                    <option value="2">All Receive</option>
                                                    <option value="0" selected={true} >Pending Receive</option>
                                                    <option value="1">Done Receive</option>
                                                </select>
                                            </span>
                                        </label>
                                    </div> */}
                                </div>
                                <div className="col-md-4 col-lg-4">
                                    <AddButton link="grinding/add" menuId={menuId} />
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
                                                    <th scope="col" width="7%" onClick={() => sortHandler(2)} ><i className="fa fa-sort"></i> Job No.</th>
                                                    <th scope="col" width="10%" onClick={() => sortHandler(3)} ><i className="fa fa-sort"></i> Job Name</th>
                                                    <th scope="col" width="7%" onClick={() => sortHandler(4)} ><i className="fa fa-sort"></i> Printer Name</th>                                                        
                                                    <th scope="col" width="5%">FL</th>                                                        
                                                    <th scope="col" width="5%">Cir</th>                                                        
                                                    <th scope="col" width="7%">F.Dia</th>                                                        
                                                    <th scope="col" width="7%">Surface Area</th>
                                                    {/* <th scope="col" width="7%">Grinding</th>
                                                    <th scope="col" width="7%">Plating</th>
                                                    <th scope="col" width="7%">Polishing</th> */}
                                                    <th scope="col" width="7%">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { 
                                                    baseReceiveData.length > 0 ? 
                                                        <>
                                                            {baseReceiveData.map((item, index) =>           
                                                                (
                                                                    <tr key={index}>
                                                                        <td scope="row">{ ((index+1) + (currentPage == 1 ? 0 : (currentPage*perPage - perPage))) }</td>
                                                                        <td>{item.job_no}</td>
                                                                        <td>{item.job_name}</td>
                                                                        <td>{item.printer_name}</td>
                                                                        <td>{item.face_length}</td>
                                                                        <td>{item.circumference}</td>
                                                                        <td>{item.dia}</td>
                                                                        <td>{item.surface_area}</td>
                                                                        {/* <td></td>
                                                                        <td></td>
                                                                        <td></td> */}
                                                                        <td className="">
                                                                            {
                                                                                accLoad === false ? <>
                                                                                    {hasAccess.edit === true ? <EditButton link={`/grinding/edit/${item.job_no}`} menuId={ menuId } /> : ''} 
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