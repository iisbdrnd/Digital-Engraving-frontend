import React from "react";
import { Fragment } from "react";
import { AddButton, PanelRefreshIcons, PerPageBox } from "../../../common/GlobalButton";
import Pagination from "react-js-pagination";
import { useState } from "react";
const ListData = (props) =>  {
    const [isLoading, setIsLoading] =useState(false);
    var menuId = 0;
    if (props.location.state === undefined) {
        menuId = 0;
    } else {
        menuId = props.location.state.params.menuId;
    }
    console.log(props);
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
                                    <PanelRefreshIcons />
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
                            </div>
                            <div className="col-md-5 col-lg-5">
                                <div className="custom-table-pagination m-r-10">
                                    <label className="mt-3">
                                        <span>
                                            <select className="form-control pagi-select" name="polishing_status" >
                                                <option value="0">Layout Status</option>
                                            </select>
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-4">
                                <AddButton link="designLayout/add" menuId={menuId} />
                                <PerPageBox />
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
                                                {/* <th scope="col" width="15%" onClick={() => sortHandler(6)} ><i className="fa fa-sort"></i> Printer</th>
                                                <th scope="col" width="10%" ><i className="fa fa-sort"></i> Per Sqr Amount</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* { 
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
                                                                        <Link 
                                                                            to={{
                                                                                pathname: `${process.env.PUBLIC_URL}/polishing/edit/${item.cylinder_id}`, 
                                                                                state: { params: {menuId: menuId} }
                                                                            }}
                                                                        className="btn btn-secondary btn-xs">
                                                                            Polishing
                                                                        </Link>
                                                                    </td>
                                                                    <td className="">
                                                                        {
                                                                            accLoad === false ? <>
                                                                                {hasAccess.edit === true ? <EditButton link={`/polishing/edit/${item.cylinder_id}`} menuId={ menuId } /> : ''} 
                                                                            </> : ''
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            )                
                                                        )}
                                                    </> 
                                                : <tr><td colSpan="12" className="text-center">No data found</td></tr>
                                            } */}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            <Pagination 
                                // activePage={currentPage}
                                // itemsCountPerPage={perPage}
                                // totalItemsCount={totalData}
                                // onChange={pageChange}
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