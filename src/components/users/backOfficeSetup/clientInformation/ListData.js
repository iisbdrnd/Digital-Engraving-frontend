import React, { Fragment, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { clientInformation, userHasAccess } from '../../../../api/userUrl';
import { userGetMethod, userDeleteMethod } from '../../../../api/userAction';
import { AddButton, EditButton, DeleteButton, PerPageBox } from '../../../common/GlobalButton';
import Pagination from "react-js-pagination";

export default function ListData(props) {
    const [clientData, setClientData] = useState([]);
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
        userGetMethod(clientInformation+'?searchText='+searchText)
        .then(response => {
            setClientData(response.data.clientInfos.data)
            setIsLoading(false);
        })
        .catch(error => console.log(error)); 
    }

    const deleteHandler = (itemId, deleteLink) => {
        userDeleteMethod(deleteLink, itemId)
            .then(response => {
                if (response.data.status == 1) {
                    setIsLoading(true);
                    let newData = clientData.filter(data => data.id != itemId);
                    setClientData(newData);
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
        userGetMethod(`${clientInformation}?page=${pageNumber}`)
            .then(response => {
                setCurrentPage(response.data.clientInfos.current_page)
                setPerPage(response.data.clientInfos.per_page)
                setTotalData(response.data.clientInfos.total)
                setClientData(response.data.clientInfos.data)
                setIsLoading(false);
            })
            .catch(error => console.log(error))
    }

    const perPageBoxChange = (e) => {
        let perPage = e.target.value;
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(`${clientInformation}?perPage=${perPage}`)
            .then(response => {
                setCurrentPage(response.data.clientInfos.current_page)
                setPerPage(response.data.clientInfos.per_page)
                setTotalData(response.data.clientInfos.total)
                setClientData(response.data.clientInfos.data)
                setIsLoading(false)
            })
            .catch(error => console.log(error))
    }

    const sortHandler = (params) => {
        setAscDesc(!ascDesc);
        let ascUrl = '';
        if (ascDesc === true) {
            ascUrl = `${clientInformation}?asc=${params}&desc=`;
        } else {
            ascUrl = `${clientInformation}?asc=&desc=${params}`;
        }
        
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(ascUrl)
            .then(response => {
                setCurrentPage(response.data.clientInfos.current_page)
                setPerPage(response.data.clientInfos.per_page)
                setTotalData(response.data.clientInfos.total)
                setClientData(response.data.clientInfos.data)
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
                                        <h5>Client Information List</h5>
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
                                    <AddButton link="clientInformation/add" menuId={menuId} />
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
                                                    <th scope="col" width="8%" onClick={() => sortHandler(1)} ><i className="fa fa-sort"></i> SL.</th>
                                                    <th scope="col" width="10%" onClick={() => sortHandler(2)} ><i className="fa fa-sort"></i> Client Id</th>
                                                    <th scope="col" width="15%" onClick={() => sortHandler(3)} ><i className="fa fa-sort"></i> Name</th>
                                                    <th scope="col" width="10%" onClick={() => sortHandler(4)} ><i className="fa fa-sort"></i> Mobile</th>                                                        
                                                    <th scope="col" width="15%" onClick={() => sortHandler(5)} ><i className="fa fa-sort"></i> Email</th>
                                                    <th scope="col" width="15%"><i className="fa fa-sort"></i> Branch</th>
                                                    <th scope="col" width="15%"><i className="fa fa-sort"></i> Marketing Officer</th>
                                                    <th scope="col" width="15%"><i className="fa fa-sort"></i> Vat Status</th>
                                                    <th scope="col" width="12%">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { 
                                                    clientData.length > 0 ? 
                                                        <>
                                                            {clientData.map((item, index) =>           
                                                                (
                                                                    <tr key={index}>
                                                                        <td scope="row">{ ((index+1) + (currentPage == 1 ? 0 : (currentPage*perPage - perPage))) }</td>
                                                                        <td>{item.client_id}</td>
                                                                        <td>{item.name}</td>
                                                                        <td>{item.mobile}</td>
                                                                        <td>{item.email}</td>
                                                                        <td>{item.branch_name}</td>
                                                                        <td>{item.employee_name}</td>
                                                                        <td>{item.vat_status == 1 ? 'Yes' : 'No'}</td>
                                                                        <td className="">
                                                                            {
                                                                                accLoad === false ? <>
                                                                                    {hasAccess.edit === true ? <EditButton link={`/clientInformation/edit/${item.id}`} menuId={ menuId } /> : ''} 
                                                                                    {hasAccess.destroy === true ? <DeleteButton deleteLink={clientInformation} deleteHandler={ deleteHandler } menuId={ menuId } dataId={item.id} /> : ''} 
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
