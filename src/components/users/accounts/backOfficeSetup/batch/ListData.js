import React, { Fragment, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { batchAPI, userHasAccess, batchTransferAPI } from '../../../../../api/userUrl';
import { userGetMethod, userDeleteMethod } from '../../../../../api/userAction';
import { AddButton, EditButton, DeleteButton } from '../../../../common/GlobalButton';
import Pagination from "react-js-pagination";
import Swal from 'sweetalert2'

export default function ListData(props) {
    const [batchData, setBatchData] = useState([]);
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
        userGetMethod(batchAPI+'?searchText='+searchText)
        .then(response => {
            setBatchData(response.data.batchFullData.data)
            setIsLoading(false);
        })
        .catch(error => console.log(error)); 
    }

    const deleteHandler = (batch_master_id, deleteLink) => {

        userDeleteMethod(deleteLink, batch_master_id)
            .then(response => {
                if (response.data.status == 1) {
                    setIsLoading(true);
                    let newData = batchData.filter(data => data.batch_master_id != batch_master_id);
                    setBatchData(newData);
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
        userGetMethod(`${batchAPI}?page=${pageNumber}&perPage=${perPage}`)
            .then(response => {
                console.log("current_page", response.data);
                setCurrentPage(response.data.batchFullData.current_page)
                setPerPage(response.data.batchFullData.per_page)
                setTotalData(response.data.batchFullData.total)
                setBatchData(response.data.batchFullData.data)
                setIsLoading(false);
            })
            .catch(error => console.log(error))
    }

    const perPageHandler = (e) => {
    }

    const sortHandler = (params) => {
        setAscDesc(!ascDesc);
        console.log('sort', ascDesc);
        let ascUrl = '';
        if (ascDesc === true) {
            ascUrl = `${batchAPI}?asc=${params}&desc=`;
        } else {
            ascUrl = `${batchAPI}?asc=&desc=${params}`;
        }
        
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(ascUrl)
            .then(response => {
                setCurrentPage(response.data.accounts.current_page)
                setPerPage(response.data.accounts.per_page)
                setTotalData(response.data.accounts.total)
                setBatchData(response.data.accounts.data)
                setIsLoading(false)
            })
            .catch(error => console.log(error))
    }

    const transferHandler = (e) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, transfer it!'
          }).then((result) => {
            if (result.isConfirmed) {

                let transferUrl = `${batchTransferAPI}`;

                userGetMethod(transferUrl)
                .then(response => {

                    if(response.data.status == 1){
                        
                        Swal.fire(
                            'Success!',
                            response.data.message,
                            'success'
                        )

                    }else{
                        
                        Swal.fire(
                            'Sorry!',
                            response.data.message,
                            'error'
                        )
                    }

                    setCurrentPage()
                    setPerPage()
                    setTotalData(0)
                    setBatchData([])
                    setIsLoading(false)
                    
                })
                .catch(error => console.log(error))

            }
        })

    }

    const editBatchMaster = (type, batch_master_id, menuId) => {

        console.log(type);
        switch (type) {
            case 1:
                var dynamicLink =  <EditButton link={`/payment-voucher/edit/${batch_master_id}`} menuId={ menuId } />
              break;
            case 2:
                var dynamicLink =  <EditButton link={`/received-voucher/edit/${batch_master_id}`} menuId={ menuId } />
              break;
            case 3:
                var dynamicLink =  <EditButton link={`/bank-payment/edit/${batch_master_id}`} menuId={ menuId } />
              break;
            case 4:
                var dynamicLink =  <EditButton link={`/bank-receive/edit/${batch_master_id}`} menuId={ menuId } />
              break;
            case 5:
                var dynamicLink =  <EditButton link={`/journal-voucher/edit/${batch_master_id}`} menuId={ menuId } />
              break;
            default:
                var dynamicLink =  <EditButton link={`/edit/${0}`} menuId={ 0 } />
              break;
          }
        return dynamicLink;
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
                                        <h5>Batch List</h5>
                                    </div>
                                    <div className="col-md-6">
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 col-lg-4">
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

                                <div className="col-md-2 col-lg-2">
                                    <div className="input-group text-box searchBox">
                                        <button 
                                            className="btn btn-primary btn-sm" 
                                            type="button" 
                                            onClick={transferHandler} 
                                        >Transfer to accounts
                                        </button>
                                    </div>
                                </div>

                                <div className="col-md-6 col-lg-6">
                                    {/* <AddButton link="chartOfAccounts/add" menuId={menuId} /> */}
                                    <div className="custom-table-pagination m-r-10 pull-right">
                                        <label className="mt-3">
                                            <span>
                                                <select className="form-control pagi-select" onChange={perPageHandler}>
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
                                                    <th scope="col" width="8%" onClick={() => sortHandler(1)} ><i className="fa fa-sort"></i> SL.</th>
                                                    <th className="text-center" scope="col" width="13%" onClick={() => sortHandler(2)} > 
                                                        <i className="fa fa-sort"></i>Batch Code</th>
                                                    <th className="text-center" scope="col" width="13%" onClick={() => sortHandler(3)} >
                                                        <i className="fa fa-sort"></i> Voucher Type</th>
                                                    <th className="text-center" scope="col" width="13%" onClick={() => sortHandler(4)} >
                                                        <i className="fa fa-sort"></i> Total Amount</th>
                                                    <th className="text-center" scope="col" width="50%">
                                                        <i className="fa fa-sort"></i> Remarks</th>
                                                    <th className="text-center" scope="col" width="8%">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { 
                                                    batchData.length > 0 ? 
                                                        <>
                                                            {batchData.map((item, index) =>           
                                                                (
                                                                    <tr key={index}>
                                                                        <td className="text-center" scope="row">{ ((index+1) + (currentPage == 1 ? 0 : (currentPage*perPage - perPage))) }</td>
                                                                        <td className="text-center">{item.batch_group_no}</td>
                                                                        <td className="text-center">{item.voucher_type}</td>
                                                                        <td className="text-center">{item.total_amount}</td>
                                                                        <td className="text-center">{item.remarks}</td>
                                                                        <td className="text-center">
                                                                            {
                                                                                accLoad === false ? <>
                                                                                    {editBatchMaster(item.transaction_status, item.batch_master_id, menuId) } 
                                                                                    
                                                                                    { <DeleteButton deleteLink={batchAPI} deleteHandler={ deleteHandler } menuId={ menuId } dataId={item.batch_master_id} />} 
                                                                                </> : ''
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                )                
                                                            )}
                                                        </> 
                                                    : <tr><td colSpan="6" className="text-center">No data found</td></tr>
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