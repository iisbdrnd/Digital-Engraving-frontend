import React from 'react'
import { Link } from 'react-router-dom';
import data from '../../../../../helper/Table/MOCK_DATA.json';

export default function UserList() {

    let dummyData = data.slice(0,5)
  return (
    <>
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <div className="card my-3 w-100">
                        <div className="card-header">
                            <h5>User List</h5>
                        </div>
                        <div className="card-body">
                            <div className="row justify-content-between my-2">
                                <div className="col-md-3">
                                    <form className='d-flex' action="">
                                        <input type="text" placeholder='Search' className="form-control" />
                                        <button className="btn btn-sm">GO</button>
                                    </form>
                                </div>
                                <div className='col-md-5'>
                                    <div className="d-flex">
                                        <select className="custom-select">
                                            <option selected>Select Project</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                        
                                        <select className="custom-select ml-2">
                                            <option selected>All Employee</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='col-md-2'>
                                    <div className="d-flex">
                                        <select className="custom-select">
                                            <option selected>10</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                        <button className="btn btn-sm ml-2">Add New</button>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>No</th>
                                            <th><i className="fa-solid fa-arrow-down-up-across-line"></i> Emp.ID</th>
                                            <th><i className="fa-solid fa-arrow-down-up-across-line"></i> Name</th>
                                            <th><i className="fa-solid fa-arrow-down-up-across-line"></i> Designation</th>
                                            <th><i className="fa-solid fa-arrow-down-up-across-line"></i> Email</th>
                                            <th><i className="fa-solid fa-arrow-down-up-across-line"></i> Project ID</th>
                                            <th><i className="fa-solid fa-arrow-down-up-across-line"></i> Report To</th>
                                            <th><i className="fa-solid fa-arrow-down-up-across-line"></i> Verified</th>
                                            <th><i className="fa-solid fa-arrow-down-up-across-line"></i> Status</th>
                                            <th><i className="fa-solid fa-arrow-down-up-across-line"></i> Reg Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            dummyData.map( data => (
                                                <tr key={data.id}>
                                                    <th>{data.id}</th>
                                                    <td>{data.emp_id}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.designation}</td>
                                                    <td>{data.email}</td>
                                                    <td>{data.project_id}</td>
                                                    <td>{data.report_to}</td>
                                                    <td>{data.verify ? 'Yes' : 'No'}</td>
                                                    <th>{data.status ? 'Active' : 'Inactive'}</th>
                                                    <td>{data.regDate}</td>
                                                    <td>
                                                        <div className="d-flex justify-content-around my-1">
                                                            <i className="fa-solid fa-pen-to-square fa-lg"></i>
                                                            <i className="fa-solid fa-trash fa-lg"></i>
                                                        </div>
                                                        <Link to={`/react/table/${data.emp_id}`}>
                                                            <button className="btn btn-sm my-1">Access</button>
                                                        </Link>
                                                        <button className="btn btn-sm my-1">Login</button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th>No</th>
                                            <th>Emp.ID</th>
                                            <th>Name</th>
                                            <th>Designation</th>
                                            <th>Email</th>
                                            <th>Project ID</th>
                                            <th>Report To</th>
                                            <th>Verified</th>
                                            <th>Status</th>
                                            <th>Reg Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    </>
  )
}
