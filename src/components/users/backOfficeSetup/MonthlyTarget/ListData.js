import React, { Fragment, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { colorAPI, getTargetYear, monthlyTargetAPI, userHasAccess } from '../../../../api/userUrl';
import { userGetMethod, userDeleteMethod } from '../../../../api/userAction';
import { AddButton, EditButton, DeleteButton } from '../../../common/GlobalButton';
import Pagination from "react-js-pagination";

export default function ListData(props) {
    const [monthlyData, setMonthlyData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [hasAccess, setHasAccess] = useState({});
    const [accLoad, setAccLoad] = useState(true);
    const [currentPage, setCurrentPage] = useState();
    const [perPage, setPerPage] = useState(10);
    const [totalData, setTotalData] = useState(0);
    const [getYear, setGetYear] = useState([]);
    const [ascDesc, setAscDesc] = useState(false);
    const [isOpen, setIsOpen] = useState(null);

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
        userGetMethod(`${getTargetYear}`)
            .then(response => {
                setGetYear(response.data.year);
                setIsLoading(false);
            });
        
        // TABLE DATA READY
        // handlePageChange();
    },[]);

    // const handleSearchText = (e) =>{
    //     setSearchText(e);
    // }
    // const searchHandler = (e) =>{
    //     setIsLoading(true);
    //     userGetMethod(`${monthlyTargetAPI}?page=${1}&perPage=${perPage}&searchText=${searchText}`)
    //     .then(response => {
    //         setMonthlyData(response.data.targets.data);
    //         setCurrentPage(response.data.targets.current_page);
    //         setPerPage(response.data.targets.per_page);
    //         setTotalData(response.data.targets.total);
    //         setIsLoading(false);
    //     })
    //     .catch(error => console.log(error)); 
    // }

    const deleteHandler = (itemId, deleteLink) => {
        userDeleteMethod(deleteLink, itemId)
            .then(response => {
                if (response.data.status == 1) {
                    setIsLoading(true);
                    let newData = monthlyData.filter(data => data.id != itemId);
                    setMonthlyData(newData);
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
        userGetMethod(`${monthlyTargetAPI}?page=${pageNumber}&perPage=${perPage}&searchText=${searchText}`)
            .then(response => {
                console.log("current_page", response.data);
                setCurrentPage(response.data.targets.current_page)
                setPerPage(response.data.targets.per_page)
                setTotalData(response.data.targets.total)
                setMonthlyData(response.data.targets.data)
                setIsLoading(false);
            })
            .catch(error => console.log(error))
    }

    // const perPageHandler = (e) => {
    //     let perPage = e.target.value;
    //     setIsLoading(true);
    //     // TABLE DATA READY
    //     if (searchText.length == 0) {
    //         userGetMethod(`${monthlyTargetAPI}?perPage=${perPage}`)
    //         .then(response => {
    //             setCurrentPage(response.data.targets.current_page)
    //             setPerPage(response.data.targets.per_page)
    //             setTotalData(response.data.targets.total)
    //             setMonthlyData(response.data.targets.data)
    //             setIsLoading(false)
    //         })
    //         .catch(error => console.log(error))
    //     }else{
    //         userGetMethod(`${monthlyTargetAPI}?page=${1}&perPage=${perPage}&searchText=${searchText}`)
    //     .then(response => {
    //         setMonthlyData(response.data.targets.data);
    //         setCurrentPage(response.data.targets.current_page);
    //         setPerPage(response.data.targets.per_page);
    //         setTotalData(response.data.targets.total);
    //         setIsLoading(false);
    //     })
    //     .catch(error => console.log(error)); 
    //     }
    // }

    // const sortHandler = (params) => {
    //     setAscDesc(!ascDesc);
    //     console.log('sort', ascDesc);
    //     let ascUrl = '';
    //     if (ascDesc === true) {
    //         ascUrl = `${colorAPI}?asc=${params}&desc=`;
    //     } else {
    //         ascUrl = `${colorAPI}?asc=&desc=${params}`;
    //     }
        
    //     setIsLoading(true);
    //     // TABLE DATA READY
    //     userGetMethod(ascUrl)
    //         .then(response => {
    //             setCurrentPage(response.data.targets.current_page)
    //             setPerPage(response.data.targets.per_page)
    //             setTotalData(response.data.targets.total)
    //             setMonthlyData(response.data.targets.data)
    //             setIsLoading(false)
    //         })
    //         .catch(error => console.log(error))
    // }

    const getMonthData =(year)=>{
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(`api/user/getTarget?year=${year}`)
            .then(response => {
                console.log("current_page", response.data);
                // setCurrentPage(response.data.targets.current_page)
                // setPerPage(response.data.targets.per_page)
                // setTotalData(response.data.targets.total)
                setMonthlyData(response.data.months)
                setIsLoading(false);
            })
            .catch(error => console.log(error))
    }

    const toggle = (i,year) => {
        setIsOpen(!isOpen);
        console.log(year)
        getMonthData(year);
        if (isOpen == i) {
            return setIsOpen(null)
        }
        userGetMethod(`api/user/getTarget?year=${year}`)
        .then(response => {
            console.log("current_page", response.data);
            // setCurrentPage(response.data.targets.current_page)
            // setPerPage(response.data.targets.per_page)
            // setTotalData(response.data.targets.total)
            setMonthlyData(response.data.months)
            setIsLoading(false);
        })
        .catch(error => console.log(error))
        setIsOpen(i);
        // handlePageChange()
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
                                        <h5>Monthly Target List</h5>
                                    </div>
                                    <div className="col-md-6">
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-end">
                                {/* <div className="col-md-6 col-lg-6">
                                    <div className="input-group text-box searchBox">
                                        <input
                                            type="text"
                                            className="form-control input-txt-bx col-md-4"
                                            placeholder="Type to Search..."
                                            // onChange={(e) => handleSearchText(e.target.value)}
                                        />
                                        <div className="input-group-append">
                                            <button 
                                                className="btn btn-primary btn-sm" 
                                                type="button" 
                                                // onClick={searchHandler} 
                                            >Go
                                            </button>
                                        </div>
                                    </div>
                                </div> */}

                                <div className="">
                                    <AddButton link="monthlyTarget/add" menuId={menuId} />
                                    {/* <div className="custom-table-pagination m-r-10 pull-right">
                                        <label className="mt-3">
                                            <span>
                                                <select className="form-control pagi-select" >
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                </select>
                                            </span>
                                        </label>
                                    </div> */}
                                </div>
                            </div>

                            {getYear.map((year,index)=>(<div className="card m-1" key=''>
                                <div key={index} className="card-header">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <h5>Target year: {year}</h5>
                                        </div>
                                        <div className="col-md-8">
                                            
                                            
                                            
                                        </div>
                                        <div className="col-md-2">
                                            <ul className="d-flex pull-right">
                                                <li className="p-r-10 cursor-pointer" onClick={()=>toggle(index,year)} ><i className={isOpen == index ? 'fa fa-minus' : 'fa fa-plus'}></i></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className={isOpen == index ? 'card-body' : 'card-body collapse'}>
                                <div className="panel">



                                {/* <table className="table table-border-horizontal">
                                <thead>
                                    <tr>
                                        <th scope="col" width="8%" onClick={() => sortHandler(1)} >SL.</th>
                                        <th scope="col" width="50%" onClick={() => sortHandler(2)} > Target Year</th>
                                        <th scope="col" width="24%" onClick={() => sortHandler(2)} >Month</th>
                                        <th scope="col" width="10%" onClick={() => sortHandler(2)} > Cylinder No</th>
                                        <th scope="col" width="8%">Action</th>
                                    </tr>
                                </thead>
                                </table> */}

                                <div className="card-body datatable-react">
                                {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <div className="table-responsive">
                                        <table className="table table-border-horizontal">
                                            <thead>
                                                <tr>
                                                    <th scope="col" width="8%"  >SL.</th>
                                                    <th scope="col" width="50%"  > Target Year</th>
                                                    <th scope="col" width="24%"  >Month</th>
                                                    <th scope="col" width="10%"  > Cylinder No</th>
                                                    <th scope="col" width="8%">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { 
                                                    monthlyData.length > 0 ? 
                                                        <>
                                                            {monthlyData.map((item, index) =>           
                                                                {
                                                                    const monthNames = [
                                                                        "January", "February", "March", "April",
                                                                        "May", "June", "July", "August",
                                                                        "September", "October", "November", "December"
                                                                    ];
                                                                    
                                                                    const monthName = monthNames[item.month_name - 1];

                                                                    return(
                                                                    <tr key={index}>
                                                                    <td scope="row">{ index + 1 }</td>
                                                                    <td>{item.target_year}</td>
                                                                    <td>{monthName}</td>
                                                                    <td>{item.no_of_cylinder}</td>
                                                                    
                                                                    <td className="text-center">
                                                                        {
                                                                            accLoad === false ? <>
                                                                                {hasAccess.edit === true ? <EditButton link={`/monthlyTarget/edit/${item.id}`} menuId={ menuId } /> : ''} 
                                                                                 
                                                                            </> : ''
                                                                        }
                                                                    </td>
                                                                </tr>
                                                                )}                
                                                            )}
                                                        </> 
                                                    : <tr><td colSpan="3" className="text-center">No data found</td></tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                               
                                </div>





                                    </div>
                                    
                                </div>
                            </div>))
                                
                            }





                            {/* ================== table Result ================= */}    
                            {/* <div className="card-body datatable-react">
                                {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <div className="table-responsive">
                                        <table className="table table-border-horizontal">
                                            <thead>
                                                <tr>
                                                    <th scope="col" width="8%" onClick={() => sortHandler(1)} >SL.</th>
                                                    <th scope="col" width="50%" onClick={() => sortHandler(2)} > Target Year</th>
                                                    <th scope="col" width="24%" onClick={() => sortHandler(2)} >Month</th>
                                                    <th scope="col" width="10%" onClick={() => sortHandler(2)} > Cylinder No</th>
                                                    <th scope="col" width="8%">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { 
                                                    monthlyData.length > 0 ? 
                                                        <>
                                                            {monthlyData.map((item, index) =>           
                                                                {
                                                                    const monthNames = [
                                                                        "January", "February", "March", "April",
                                                                        "May", "June", "July", "August",
                                                                        "September", "October", "November", "December"
                                                                    ];
                                                                    
                                                                    const monthName = monthNames[item.month_name - 1];

                                                                    return(
                                                                    <tr key={index}>
                                                                    <td scope="row">{ ((index+1) + (currentPage == 1 ? 0 : (currentPage*perPage - perPage))) }</td>
                                                                    <td>{item.target_year}</td>
                                                                    <td>{monthName}</td>
                                                                    <td>{item.no_of_cylinder}</td>
                                                                    
                                                                    <td className="text-center">
                                                                        {
                                                                            accLoad === false ? <>
                                                                                {hasAccess.edit === true ? <EditButton link={`/monthlyTarget/edit/${item.id}`} menuId={ menuId } /> : ''} 
                                                                                 
                                                                            </> : ''
                                                                        }
                                                                    </td>
                                                                </tr>
                                                                )}                
                                                            )}
                                                        </> 
                                                    : <tr><td colSpan="3" className="text-center">No data found</td></tr>
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
                            </div> */}

                            {/* ================== table Result ================= */}  


                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}