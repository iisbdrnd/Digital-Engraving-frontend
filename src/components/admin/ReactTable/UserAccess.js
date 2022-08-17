import React, { useState } from 'react';
import { useParams } from 'react-router';
import data from '../../../helper/Table/MOCK_DATA.json';
// import data from '../../../helper/Table/MOCK_DATA.json';
import Bpack from './Bpack';

const UserAccess = () => {

    const [ tab, setTab] = useState(0);
    const {id} = useParams();
    console.log(id);
    let dummyData = data.slice(0,5);

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-header">
                                <h6>User Name</h6>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div onClick={ () => setTab(1)} className="col-md-3 cursor-pointer">
                                        <d className="border d-flex flex-column py-3 justify-content-center align-items-center">
                                            <i className="fa-solid fa-basket-shopping fa-2xl my-3 pb-2"></i>
                                            <h6 className=''>B-Pack</h6>
                                        </d>
                                    </div>
                                    <div onClick={ () => setTab(2)}  className="col-md-3 cursor-pointer">
                                        <d className="border d-flex flex-column py-3 justify-content-center align-items-center">
                                            <i className="fa-solid fa-user fa-2xl my-3 pb-2"></i>
                                            <h6>Administor</h6>
                                        </d>
                                    </div>
                                    <div onClick={ () => setTab(3)}  className="col-md-3 cursor-pointer">
                                        <d className="border d-flex flex-column py-3 justify-content-center align-items-center">
                                            <i className="fa-solid fa-file-invoice fa-2xl my-3 pb-2"></i>
                                            <h6>Account</h6>
                                        </d>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                tab === 0 && (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="card my-3 w-100">
                                    <div className="card-header">
                                        <h5>User Access</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row justify-content-between my-2">
                                            <div className="col-md-3">
                                                <form className='d-flex' action="">
                                                    <input type="text" placeholder='Search' className="form-control" />
                                                    <button className="btn btn-sm">GO</button>
                                                </form>
                                            </div>
                                            <div className='col-md-1'>
                                                <div className="d-flex">
                                                    <select className="custom-select">
                                                        <option selected>10</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th>No</th>
                                                        <th><i className="fa-solid fa-arrow-down-up-across-line"></i> Menu Name </th>
                                                        <th><i className="fa-solid fa-arrow-down-up-across-line"></i> Link Name</th>
                                                        <th><i className="fa-solid fa-arrow-down-up-across-line"></i> Module Name </th>
                                                        <th><i className="fa-solid fa-arrow-down-up-across-line"></i> Access Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        dummyData.map( data => (
                                                            <tr key={data.id}>
                                                                <th>{data.id}</th>
                                                                <td>{data.report_to}</td>
                                                                <td>{data.name}</td>
                                                                <td>{data.project_id}</td>
                                                                <td>{data.regDate}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                    
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <th>No</th>
                                                        <th>Menu Name</th>
                                                        <th>Link Name</th>
                                                        <th>Module Name</th>
                                                        <th>Access Date</th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                tab === 1 && (
                    <Bpack />
                )
            }
            
            {
                tab === 2 && (
                    <h2>Accordian</h2>
                )
            }
            
            {
                tab === 3 && (
                    <h4>Tab 3</h4>
                )
            }
        </>
    );
};

export default UserAccess;