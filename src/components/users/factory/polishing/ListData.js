import React, { Fragment, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { POLISHING_RS_URL, userHasAccess } from '../../../../api/userUrl';
import { userGetMethod, userDeleteMethod } from '../../../../api/userAction';
import { AddButton, EditButton, DeleteButton, PerPageBox, PanelRefreshIcons } from '../../../common/GlobalButton';
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';

export default function ListData(props) {
    const [cylinderData, setCylinderData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [hasAccess, setHasAccess] = useState({});
    const [accLoad, setAccLoad] = useState(true);
    const [currentPage, setCurrentPage] = useState();
    const [perPage, setPerPage] = useState(10);
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
        userGetMethod(`${POLISHING_RS_URL}?polishing_status=${jobActiveStatus}&page=${1}&perPage=${perPage}&searchText=${searchText}`)
        .then(response => {
            setCurrentPage(response.data.allCylinders.current_page)
            setPerPage(response.data.allCylinders.per_page)
            setTotalData(response.data.allCylinders.total)
            setCylinderData(response.data.allCylinders.data)
            setIsLoading(false);
        })
        .catch(error => console.log(error)); 
    }

    const pageChange = (pageNumber = 1) => {
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(`${POLISHING_RS_URL}?polishing_status=${jobActiveStatus}&page=${pageNumber}&perPage=${perPage}&searchText=${searchText}`)
            .then(response => {
                setCurrentPage(response.data.allCylinders.current_page)
                setPerPage(response.data.allCylinders.per_page)
                setTotalData(response.data.allCylinders.total)
                setCylinderData(response.data.allCylinders.data)
                setIsLoading(false);
            })
            .catch(error => console.log(error))
    }

    const perPageBoxChange = (e) => {
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(`${POLISHING_RS_URL}?polishing_status=${jobActiveStatus}&perPage=${perPage}&searchText=${searchText}`)
            .then(response => {
                setCurrentPage(response.data.allCylinders.current_page)
                setPerPage(response.data.allCylinders.per_page)
                setTotalData(response.data.allCylinders.total)
                setCylinderData(response.data.allCylinders.data)
                setIsLoading(false)
            })
            .catch(error => console.log(error))
    }

    const sortHandler = (params) => {
        setAscDesc(!ascDesc);
        let ascUrl = '';
        if (ascDesc === true) {
            ascUrl = `${POLISHING_RS_URL}?asc=${params}&desc=`;
        } else {
            ascUrl = `${POLISHING_RS_URL}?asc=&desc=${params}`;
        }
        
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(ascUrl)
            .then(response => {
                setCurrentPage(response.data.allCylinders.current_page)
                setPerPage(response.data.allCylinders.per_page)
                setTotalData(response.data.allCylinders.total)
                setCylinderData(response.data.allCylinders.data)
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
                                        <h5>Polishing List</h5>
                                    </div>
                                    <div className="col-md-6 text-right">
                                    <Link to={{pathname: `${process.env.PUBLIC_URL}/polishingShift/control`, state: { params: {menuId: menuId} }}}
                                                className="btn btn-primary btn-sm" 
                                                type="button" 
                                               
                                            >Shift
                                            </Link>
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
                                                <select className="form-control pagi-select" name="polishing_status" onChange={(e) => setJobActiveStatus(parseInt(e.target.value))} value={jobActiveStatus} >
                                                    <option value="2">All Polishing</option>
                                                    <option value="0">Pending Polishing</option>
                                                    <option value="1">Done Polishing</option>
                                                </select>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-4">
                                    <AddButton link="polishing/add" menuId={menuId} />                        
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
                                                    <th scope="col" width="5%"  > SL.</th>
                                                    <th scope="col" width="10%"  > Cyl Id.</th>
                                                    <th scope="col" width="15%" > Job Name</th>
                                                    <th scope="col" width="5%"> FL</th>
                                                    <th scope="col" width="5%"> Cir</th>
                                                    <th scope="col" width="5%"> Dia</th>
                                                    <th scope="col" width="15%"> Printer Name</th>                              
                                                    <th scope="col" width="10%"> Plating Order</th>
                                                    <th scope="col" width="10%"> FL</th>
                                                    <th scope="col" width="15%"> Client</th>   
                                                    <th scope="col" width="10%"> Polishing</th>
                                                    {/* <th scope="col" width="15%" onClick={() => sortHandler(6)} ><i className="fa fa-sort"></i> Printer</th>
                                                    <th scope="col" width="10%" ><i className="fa fa-sort"></i> Per Sqr Amount</th> */}
                                                    <th scope="col" width="7%">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { 
                                                    cylinderData.length > 0 ? 
                                                        <>
                                                            {cylinderData.map((item, key) =>           
                                                                (
                                                                    <tr key={key}>
                                                                        <td scope="row">{ ((key+1) + (currentPage == 1 ? 0 : (currentPage*perPage - perPage))) }</td>
                                                                        <td>{item.cylinder_id}</td>
                                                                        <td>{item.job_name}</td>
                                                                        <td>{item.fl}</td>
                                                                        <td>{item.cir}</td>
                                                                        <td>{item.dia}</td>
                                                                        <td>{item.printer_name}</td>
                                                                        <td>{item.plating_order}</td>
                                                                        <td>{item.before_fl}</td>
                                                                        <td>{item.client_name}</td>
                                                                        <td>
                                                                            {jobActiveStatus == 0?
                                                                            <Link 
                                                                            to={{
                                                                                pathname: `${process.env.PUBLIC_URL}/polishing/edit/${item.cylinder_id}`, 
                                                                                state: { params: {menuId: menuId} }
                                                                            }}
                                                                        className="btn btn-secondary btn-xs">
                                                                            Polishing
                                                                        </Link>:'Done'}
                                                                            
                                                                        </td>
                                                                        <td className="">
                                                                            {
                                                                                accLoad === false &&  jobActiveStatus == 0? <>
                                                                                    {hasAccess.edit === true ? <EditButton link={`/polishing/edit/${item.cylinder_id}`} menuId={ menuId } /> : ''} 
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