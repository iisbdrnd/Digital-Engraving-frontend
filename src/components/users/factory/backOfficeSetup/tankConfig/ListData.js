import React, { Fragment, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { TANK_CONFIG_RSURL, userHasAccess } from '../../../../../api/userUrl';
import { userGetMethod, userDeleteMethod } from '../../../../../api/userAction';
import { AddButton, EditButton, DeleteButton } from '../../../../common/GlobalButton';
import Pagination from "react-js-pagination";

export default function ListData(props) {
    const [tankData, setTankData] = useState([]);
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
        handlePageChange();
    },[]);

    const handleSearchText = (e) =>{
        setSearchText(e);
    }
    const searchHandler = (e) =>{
        setIsLoading(true);
        userGetMethod(TANK_CONFIG_RSURL+'?searchText='+searchText)
        .then(response => {
            setTankData(response.data.tanks.data)
            setIsLoading(false);
        })
        .catch(error => console.log(error)); 
    }

    const deleteHandler = (itemId, deleteLink) => {
        userDeleteMethod(deleteLink, itemId)
            .then(response => {
                if (response.data.status == 1) {
                    setIsLoading(true);
                    let newData = tankData.filter(data => data.id != itemId);
                    setTankData(newData);
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
        userGetMethod(`${TANK_CONFIG_RSURL}?page=${pageNumber}`)
            .then(response => {
                setCurrentPage(response.data.tanks.current_page)
                setPerPage(response.data.tanks.per_page)
                setTotalData(response.data.tanks.total)
                setTankData(response.data.tanks.data)
                setIsLoading(false);
            })
            .catch(error => console.log(error))
    }

    const perPageHandler = (e) => {
        let perPage = e.target.value;
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(`${TANK_CONFIG_RSURL}?perPage=${perPage}`)
            .then(response => {
                setCurrentPage(response.data.tanks.current_page)
                setPerPage(response.data.tanks.per_page)
                setTotalData(response.data.tanks.total)
                setTankData(response.data.tanks.data)
                setIsLoading(false)
            })
            .catch(error => console.log(error))
    }

    const sortHandler = (params) => {
        setAscDesc(!ascDesc);
        console.log('sort', ascDesc);
        let ascUrl = '';
        if (ascDesc === true) {
            ascUrl = `${TANK_CONFIG_RSURL}?asc=${params}&desc=`;
        } else {
            ascUrl = `${TANK_CONFIG_RSURL}?asc=&desc=${params}`;
        }
        
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(ascUrl)
            .then(response => {
                setCurrentPage(response.data.tanks.current_page)
                setPerPage(response.data.tanks.per_page)
                setTotalData(response.data.tanks.total)
                setTankData(response.data.tanks.data)
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
                                        <h5>Tank List</h5>
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
                                    <AddButton link="tankConfig/add" menuId={menuId} />
                                    <div className="custom-table-pagination m-r-10 pull-right">
                                        <label className="mt-3">
                                            <span>
                                                <select className="form-control pagi-select" onChange={perPageHandler}>
                                                    <option value="5">5</option>
                                                    <option value="10">10</option>
                                                    <option value="15">15</option>
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
                                                    <th scope="col" width="5%" >SL.</th>
                                                    {/* <th scope="col" width="5%" onClick={() => sortHandler(1)} ><i className="fa fa-sort"></i> SL.</th> */}
                                                    <th scope="col" width="10%" > Tank ID & Name</th>
                                                    <th scope="col" width="7%"  > Type</th>
                                                    <th scope="col" width="7%">Capacity FL</th>
                                                    <th scope="col" width="7%">Capacity Tolerance</th>
                                                    <th scope="col" width="7%">Capacity Sq CM</th>
                                                    <th scope="col" width="7%">Slot Gap 1 & 2</th>
                                                    <th scope="col" width="5%">Min FL First Cyl</th>
                                                    <th scope="col" width="5%">Min FL Second Cyl</th>
                                                    <th scope="col" width="10%">Plating without copper</th>
                                                    <th scope="col" width="10%">Plating with copper</th>
                                                    <th scope="col" width="5%">Cir Tolerance</th>
                                                    <th scope="col" width="5%">Thin Plating</th>
                                                    <th scope="col" width="5%">Max Cyl qty in Circle</th>
                                                    <th scope="col" width="5%">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { 
                                                    tankData.length > 0 ? 
                                                        <>
                                                            {tankData.map((item, index) =>           
                                                                (
                                                                    <tr key={index}>
                                                                        <td scope="row">{ ((index+1) + (currentPage == 1 ? 0 : (currentPage*perPage - perPage))) }</td>
                                                                        <td>[{item.tank_id}]{item.tank_name}</td>
                                                                        <td>{item.tank_type == 1 ?'Vertical':'Horizontal'}</td>
                                                                        <td>{item.capacity_fl}</td>
                                                                        <td>{item.capacity_fl_tolerance}</td>
                                                                        <td>{item.capacity_sq_cm}</td>
                                                                        <td>{item.slot_gap_one}-{item.slot_gap_two}</td>
                                                                        <td>{item.first_cyl_fl}</td>
                                                                        <td>{item.second_cyl_fl}</td>
                                                                        <td>{item.plating_order_tolerance_without_copper}</td>
                                                                        <td>{item.plating_order_tolerance_with_copper}</td>
                                                                        <td>{item.cir_tolerance}</td>
                                                                        <td>{item.can_take_thin_plating_tank == 1 ? 'Yes' : 'No' }</td>
                                                                        <td>{item.max_cyl_cycle}</td>
                                                                        <td className="">
                                                                            {
                                                                                accLoad === false ? <>
                                                                                    {hasAccess.edit === true ? <EditButton link={`/tankConfig/edit/${item.id}`} menuId={ menuId } /> : ''} 
                                                                                    {hasAccess.destroy === true ? <DeleteButton deleteLink={TANK_CONFIG_RSURL} deleteHandler={ deleteHandler } menuId={ menuId } dataId={item.id} /> : ''} 
                                                                                </> : ''
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                )                
                                                            )}
                                                        </> 
                                                    : <tr><td colSpan="15" className="text-center">No data found</td></tr>
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