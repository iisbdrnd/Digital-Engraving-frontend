import React, { Fragment, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { chartOfAccountAPI, userHasAccess } from '../../../../../api/userUrl';
import { userGetMethod, userDeleteMethod } from '../../../../../api/userAction';
import { AddButton, EditButton, DeleteButton } from '../../../../common/GlobalButton';
import Pagination from "react-js-pagination";

export default function ListData(props) {
    const [chartOfAccountData, setChartOfAccountData] = useState([]);
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
        userGetMethod(`${chartOfAccountAPI}?page=${1}&perPage=${perPage}&searchText=${searchText}`)
        .then(response => {
            setChartOfAccountData(response.data.accounts.data)
            setCurrentPage(response.data.accounts.current_page)
                setPerPage(response.data.accounts.per_page)
                setTotalData(response.data.accounts.total)
            setIsLoading(false);
        })
        .catch(error => console.log(error)); 
    }

    const deleteHandler = (itemId, deleteLink) => {
        userDeleteMethod(deleteLink, itemId)
            .then(response => {
                if (response.data.status == 1) {
                    setIsLoading(true);
                    let newData = chartOfAccountData.filter(data => data.id != itemId);
                    setChartOfAccountData(newData);
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
        userGetMethod(`${chartOfAccountAPI}?page=${pageNumber}&perPage=${perPage}&searchText=${searchText}`)
            .then(response => {
                console.log("current_page", response.data);
                setCurrentPage(response.data.accounts.current_page)
                setPerPage(response.data.accounts.per_page)
                setTotalData(response.data.accounts.total)
                setChartOfAccountData(response.data.accounts.data)
                setIsLoading(false);
            })
            .catch(error => console.log(error))
    }

    const perPageHandler = (e) => {
        setIsLoading(true);
        //TABLE DATA READY
        let perPage = e.target.value
        userGetMethod(`${chartOfAccountAPI}?page=${1}&perPage=${perPage}&searchText=${searchText}`)
            .then(response => {
                setCurrentPage(response.data.accounts.current_page)
                setPerPage(response.data.accounts.per_page)
                setTotalData(response.data.accounts.total)
                setChartOfAccountData(response.data.accounts.data)
                setIsLoading(false);
            })
            .catch(error => console.log(error))

    }

    const sortHandler = (params) => {
        setAscDesc(!ascDesc);
        console.log('sort', ascDesc);
        let ascUrl = '';
        if (ascDesc === true) {
            ascUrl = `${chartOfAccountAPI}?page=${1}&perPage=${perPage}&searchText=${searchText}?asc=${params}&desc=`;
        } else {
            ascUrl = `${chartOfAccountAPI}?page=${1}&perPage=${perPage}&searchText=${searchText}?asc=&desc=${params}`;
        }
        
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(ascUrl)
            .then(response => {
                setCurrentPage(response.data.accounts.current_page)
                setPerPage(response.data.accounts.per_page)
                setTotalData(response.data.accounts.total)
                setChartOfAccountData(response.data.accounts.data)
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
                                        <h5>Chart of Accounts</h5>
                                    </div>
                                    <div className="col-md-6">
                                        
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
                                    <AddButton link="chartOfAccounts/add" menuId={menuId} />
                                    <div className="custom-table-pagination m-r-10 pull-right">
                                        <label className="mt-3">
                                            <span>
                                                <select className="form-control pagi-select" onChange={perPageHandler} value={perPage}>
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
                                                    <th scope="col" width="40%" onClick={() => sortHandler(2)} >Account Code</th>
                                                    <th scope="col" width="40%" onClick={() => sortHandler(3)} > Account Head</th>
                                                    <th scope="col" width="8%">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { 
                                                    chartOfAccountData.length > 0 ? 
                                                        <>
                                                            {chartOfAccountData.map((item, index) =>           
                                                                (
                                                                    <tr key={index}>
                                                                        <td scope="row">{ ((index+1) + (currentPage == 1 ? 0 : (currentPage*perPage - perPage))) }</td>
                                                                        <td>{item.account_code}</td>
                                                                        <td>{item.account_head}</td>
                                                                        
                                                                        <td className="">
                                                                            {
                                                                                accLoad === false ? <>
                                                                                    {hasAccess.edit === true ? <EditButton link={`/chartOfAccounts/edit/${item.id}`} menuId={ menuId } /> : ''} 
                                                                                    {hasAccess.destroy === true ? <DeleteButton deleteLink={chartOfAccountAPI} deleteHandler={ deleteHandler } menuId={ menuId } dataId={item.id} /> : ''} 
                                                                                </> : ''
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                )                
                                                            )}
                                                        </> 
                                                    : <tr><td colSpan="4" className="text-center">No data found</td></tr>
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