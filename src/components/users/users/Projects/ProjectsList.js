import React, { Fragment, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { POLISHING_RS_URL, PROJECT_URL, userHasAccess } from '../../../../api/userUrl';
import { userGetMethod, userDeleteMethod } from '../../../../api/userAction';
import { AddButton, EditButton, DeleteButton, PerPageBox, PanelRefreshIcons } from '../../../common/GlobalButton';
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';


function ProjectsList(props) {

    const [projectsData, setProjectsData] = useState([]);
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
        userGetMethod(`${PROJECT_URL}?page=${1}&perPage=${perPage}&searchText=${searchText}`)
        .then(response => {
            setCurrentPage(response.data.projects.current_page)
            setPerPage(response.data.projects.per_page)
            setTotalData(response.data.projects.total)
            setProjectsData(response.data.projects.data)
            setIsLoading(false);
        })
        .catch(error => console.log(error)); 
    }

    useEffect(() => {
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(`${PROJECT_URL}`)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => console.log(error))
    },[])

    const pageChange = (pageNumber = 1) => {
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(`${PROJECT_URL}?page=${pageNumber}&perPage=${perPage}&searchText=${searchText}`)
            .then(response => {
                setCurrentPage(response.data.projects.current_page)
                setPerPage(response.data.projects.per_page)
                setTotalData(response.data.projects.total)
                setProjectsData(response.data.projects.data)
                setIsLoading(false);
            })
            .catch(error => console.log(error))
    }

    const perPageBoxChange = (e) => {
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(`${PROJECT_URL}?perPage=${perPage}&searchText=${searchText}`)
            .then(response => {
                setCurrentPage(response.data.projects.current_page)
                setPerPage(response.data.projects.per_page)
                setTotalData(response.data.projects.total)
                setProjectsData(response.data.projects.data)
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
                setCurrentPage(response.data.projects.current_page)
                setPerPage(response.data.projects.per_page)
                setTotalData(response.data.projects.total)
                setProjectsData(response.data.projects.data)
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
                                        <h5>Projects List</h5>
                                    </div>
                                    {/* <div className="col-md-6 text-right">
                                    <Link to={{pathname: `${process.env.PUBLIC_URL}/polishingShift/control`, state: { params: {menuId: menuId} }}}
                                                className="btn btn-primary btn-sm" 
                                                type="button" 
                                               
                                            >Shift
                                            </Link>
                                        
                                    </div> */}
                                </div>
                            </div>
                            <div className="row justify-content-between">
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
                                {/* <div className="col-md-5 col-lg-5">
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
                                </div> */}
                                <div className="col-md-4 col-lg-4">
                                    <AddButton link="companyProfile/add" menuId={menuId} />                        
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
                                                    <th scope="col" width="5%"> SL.</th>
                                                    <th scope="col" width="10%"> Project Id.</th>
                                                    <th scope="col" width="20%"> Company Name</th>
                                                    <th scope="col" width="10%"> Name</th>
                                                    <th scope="col" width="10%"> Type</th>
                                                    <th scope="col" width="10%"> TIN No</th>
                                                    <th scope="col" width="10%"> BIN no</th>                              
                                                    <th scope="col" width="8%"> Vat (per)</th>
                                                    <th scope="col" width="8%"> Tax</th>
                                                      
                                                   
                                                    {/* <th scope="col" width="15%" onClick={() => sortHandler(6)} ><i className="fa fa-sort"></i> Printer</th>
                                                    <th scope="col" width="10%" ><i className="fa fa-sort"></i> Per Sqr Amount</th> */}
                                                    <th scope="col" width="8%">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { 
                                                    projectsData.length > 0 ? 
                                                        <>
                                                            {projectsData.map((item, key) =>           
                                                                (
                                                                    <tr key={key}>
                                                                        <td scope="row">{ ((key+1) + (currentPage == 1 ? 0 : (currentPage*perPage - perPage))) }</td>
                                                                        <td>{item.project_id}</td>
                                                                        <td>{item.company_name}</td>
                                                                        <td>{item.name}</td>
                                                                        <td>{item.business_type}</td>
                                                                        <td>{item.tin_no}</td>
                                                                        <td>{item.bin_no}</td>
                                                                        <td>{item.vat}</td>
                                                                        <td>{item.tax}</td>
                                                                       
                                                                        
                                                                        <td className="">
                                                                            {
                                                                                accLoad === false &&  jobActiveStatus == 0? <>
                                                                                    {hasAccess.edit === true ? <EditButton link={`${process.env.PUBLIC_URL}/companyProfile/edit/${item.project_id}`} menuId={ menuId } /> : ''} 
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

export default ProjectsList