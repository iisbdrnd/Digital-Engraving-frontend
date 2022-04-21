import React, { Fragment, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { MACHINE_RSURL, userHasAccess } from '../../../../../api/userUrl';
import { userGetMethod, userDeleteMethod } from '../../../../../api/userAction';
import { AddButton, EditButton, DeleteButton } from '../../../../common/GlobalButton';
import Pagination from "react-js-pagination";

export default function ListData(props) {
    const [machineData, setMachineData] = useState([]);
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
        userGetMethod(MACHINE_RSURL+'?searchText='+searchText)
        .then(response => {
            setMachineData(response.data.machines.data)
            setIsLoading(false);
        })
        .catch(error => console.log(error)); 
    }

    const deleteHandler = (itemId, deleteLink) => {
        userDeleteMethod(deleteLink, itemId)
            .then(response => {
                if (response.data.status == 1) {
                    setIsLoading(true);
                    let newData = machineData.filter(data => data.id != itemId);
                    setMachineData(newData);
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
        userGetMethod(`${MACHINE_RSURL}?page=${pageNumber}`)
            .then(response => {
                setCurrentPage(response.data.machines.current_page)
                setPerPage(response.data.machines.per_page)
                setTotalData(response.data.machines.total)
                setMachineData(response.data.machines.data)
                setIsLoading(false);
            })
            .catch(error => console.log(error))
    }

    const perPageHandler = (e) => {
        let perPage = e.target.value;
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(`${MACHINE_RSURL}?perPage=${perPage}`)
            .then(response => {
                setCurrentPage(response.data.machines.current_page)
                setPerPage(response.data.machines.per_page)
                setTotalData(response.data.machines.total)
                setMachineData(response.data.machines.data)
                setIsLoading(false)
            })
            .catch(error => console.log(error))
    }

    const sortHandler = (params) => {
        setAscDesc(!ascDesc);
        console.log('sort', ascDesc);
        let ascUrl = '';
        if (ascDesc === true) {
            ascUrl = `${MACHINE_RSURL}?asc=${params}&desc=`;
        } else {
            ascUrl = `${MACHINE_RSURL}?asc=&desc=${params}`;
        }
        
        setIsLoading(true);
        // TABLE DATA READY
        userGetMethod(ascUrl)
            .then(response => {
                setCurrentPage(response.data.machines.current_page)
                setPerPage(response.data.machines.per_page)
                setTotalData(response.data.machines.total)
                setMachineData(response.data.machines.data)
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
                                        <h5>Machine List</h5>
                                    </div>
                                    <div className="col-md-6">
                                        <ul className="d-flex pull-right">
                                            <li className="p-r-10"><i className="fa fa-rotate-right"></i></li>
                                            <li className="p-r-10"><i className="fa fa-minus"></i></li>
                                            <li className="p-r-10"><i className="icon-close"></i></li>
                                        </ul>
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
                                    <AddButton link="machine/add" menuId={menuId} />
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
                                                    <th scope="col" width="6%" onClick={() => sortHandler(1)} ><i className="fa fa-sort"></i> SL.</th>
                                                    <th scope="col" width="40%" onClick={() => sortHandler(2)} ><i className="fa fa-sort"></i> Machine Name</th>
                                                    <th scope="col" width="24%" onClick={() => sortHandler(2)} ><i className="fa fa-sort"></i> Branch Name</th>
                                                    <th scope="col" width="20%" onClick={() => sortHandler(3)} ><i className="fa fa-sort"></i> Active Status</th>
                                                    <th scope="col" width="10%">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { 
                                                    machineData.length > 0 ? 
                                                        <>
                                                            {machineData.map((item, index) =>           
                                                                (
                                                                    <tr key={index}>
                                                                        <td scope="row">{ ((index+1) + (currentPage == 1 ? 0 : (currentPage*perPage - perPage))) }</td>
                                                                        <td>{item.machine_name}</td>
                                                                        <td>{item.branch_name}</td>
                                                                        <td>{item.active_status == 1 ? 'Yes' : 'No'}</td>
                                                                        
                                                                        <td className="">
                                                                            {
                                                                                accLoad === false ? <>
                                                                                    {hasAccess.edit === true ? <EditButton link={`/machine/edit/${item.id}`} menuId={ menuId } /> : ''} 
                                                                                    {hasAccess.destroy === true ? <DeleteButton deleteLink={MACHINE_RSURL} deleteHandler={ deleteHandler } menuId={ menuId } dataId={item.id} /> : ''} 
                                                                                </> : ''
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                )                
                                                            )}
                                                        </> 
                                                    : <tr><td colSpan="5" className="text-center">No data found</td></tr>
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
// class ListData extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { 
//             allDepartments: [],
//             isLoading: true,
//             isDelete: false,
//         }
//     }

//     componentDidMount() {
//         userGetMethod(branches)
//         .then(response => {
//             this.setState({
//                 allDepartments : response.data.machiness,
//                 isLoading: false,
//             })
//         })
//         .catch(error => console.log(error))  
//     }

//     deleteHandler = (itemId) => {
//         if(window.confirm('Are you sure you wish to delete this item?')){
//             toast.error('yes');
//             let response = userDeleteMethod(branches, itemId)
//             .then(response => {
//                 if (response.data.status == 1) {
//                     let newData = this.state.myData.filter(data => data.id != itemId);
//                     this.setState({
//                         myData: newData,
//                         isDelete: true
//                     })
//                     toast.success(response.data.message);
//                 } else {
//                     toast.error(response.data.message);
//                 }
//             })
//             .catch(error => toast.error(error));
//         }else{
//             toast.error('Data Still Safe');
//         }
//     }

//     render() { 
//         let { isLoading, allDepartments } = this.state;

//         var menuId = 0;
//         if (this.props.location.state === undefined) {
//             menuId = 0;
//         }else{
//             menuId = this.props.location.state.params.menuId;
//         }
//         return (
//             <Fragment>
//                 <div className="container-fluid">
//                     <div className="row">
//                         <div className="col-sm-12">
//                             <div className="card">
//                                 <div className="card-header">
//                                     <h5>Client Information List</h5>
//                                 </div>
//                                 <AddButton link="branches/add" menuId={ menuId } />
                                
//                                 <div className="card-body datatable-react">
//                                     {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
//                                     (
//                                         <div className="table-responsive">
//                                             <table className="table table-border-horizontal">
//                                                 <thead>
//                                                     <tr>
//                                                         <th scope="col">SL.</th>
//                                                         <th scope="col">Name</th>
//                                                         <th scope="col">Comment</th>
//                                                         <th scope="col">Last Modified</th>                                                        
//                                                         <th scope="col">Action</th>
//                                                     </tr>
//                                                 </thead>
//                                                 <tbody>
//                                                     { 
//                                                         allDepartments.length > 0 ? 
//                                                             <>
//                                                                 {allDepartments.map((item, index) =>           
//                                                                     (
//                                                                         <tr key={index}>
//                                                                             <th scope="row">{ (index+1) }</th>
//                                                                             <td>{item.name}</td>
//                                                                             <td>{item.comment}</td>
//                                                                             <td>{item.updated_at}</td>
//                                                                             <td className="">
//                                                                                 <EditButton link={`/branches/edit/${item.id}`} menuId={ menuId } />&nbsp; 
//                                                                                 <DeleteButton deleteLink={branches} deleteHandler={ () =>this.deleteHandler(item.id) } menuId={ menuId } dataId={item.id} />                                                                             
//                                                                             </td>
//                                                                         </tr>
//                                                                     )                
//                                                                 )}
//                                                             </> 
//                                                         : <tr><td colSpan="5" className="text-center">No data found</td></tr>
//                                                     }
//                                                 </tbody>
//                                             </table>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </Fragment>
//         );
//     }
// }
 
// export default ListData;