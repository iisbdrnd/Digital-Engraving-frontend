// import React, { Fragment, useEffect, useState } from 'react';
// // import Breadcrumb from '../../common/breadcrumb';
// // import Datatable from '../../common/datatable';
// import { JobClass, userHasAccess, activeChangeJobClass } from '../../../../api/userUrl';
// import { userGetMethod, userDeleteMethod, userPostMethod } from '../../../../api/userAction';
// import { AddButton, EditButton, DeleteButton } from '../../../common/GlobalButton';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// // import '@fortawesome/fontawesome-free/css/all.min.css'; 
// // import 'bootstrap-css-only/css/bootstrap.min.css'; 
// // import 'mdbreact/dist/css/mdb.css';
// import ActiveChange from './ActiveChange';

// // import { MDBDataTableV5 } from 'mdbreact';

// export default function ListData(props) {
//     const [datatable, setDatatable] = useState({});
//     const [isLoading, setIsLoading] = useState(true);
//     const [searchText, setSearchText] = useState('');
//     const [modal, setModal] = useState(false);   
//     const [jobIdForModal, setJobIdForModal] = useState();   
//     const [changeUseEffect, setChangeUseEffect] = useState(0);   
    
//     var dbTableObj = {};
//     var menuId = 0;
//     if (props.location.state === undefined) {
//         menuId = 0;
//     } else {
//         menuId = props.location.state.params.menuId;
//     }

//     useEffect(() => {
//         // ADD,EDIT,DELETE,SHOW ACCESS CHECK
//         userGetMethod(`${userHasAccess}/${menuId}`)
//             .then(firstResponse => {
//                 // TABLE DATA READY
//                 userGetMethod(JobClass)
//                     .then(response => {
//                         dbTableObj.columns = [
//                             {
//                                 label: 'SL.',
//                                 field: 'sl',
//                                 width: 10,
//                                 attributes: {
//                                     'aria-controls': 'DataTable',
//                                     'aria-label': 'Name',
//                                 },
//                             },
//                             {
//                                 label: 'Class Name',
//                                 field: 'job_class_name',
//                                 width: 55,
//                             },
//                             {
//                                 label: 'Active',
//                                 field: 'active_status',
//                                 width: 10,
//                             },
//                             {
//                                 label: 'Create date',
//                                 field: 'created_at',
//                                 width: 10,
//                             },
//                             {
//                                 label: 'Active Status',
//                                 field: 'active_status_change',
//                                 width: 10,
//                             },
//                             {
//                                 label: 'Actions',
//                                 field: 'actions',
//                                 sort: 'disabled',
//                                 width: 5,
//                             },
//                         ]
//                         let jobArray = [];
//                         response.data.jobClasses.map((job, index) => {
//                             let responseObj = {};
//                             responseObj.sl = ++index;
//                             responseObj.job_class_name = job.job_class_name;
//                             responseObj.active_status = job.active_status;
//                             responseObj.created_at = job.created_at;
//                             responseObj.active_status_change = <>
//                                 <button className="btn btn-success btn-sm" jobid={job.id} onClick={toggle}> Active </button>
//                             </>;
//                             responseObj.actions = <>
//                                 {firstResponse.data.edit === true ? <EditButton link={`/jobClass/edit/${job.id}`} menuId={ menuId } /> : ''}
//                                 {firstResponse.data.destroy === true ? <DeleteButton deleteLink={JobClass} deleteHandler={ deleteHandler } menuId={ menuId } dataId={job.id} /> : ''}
//                             </>
//                             responseObj.id = job.id;
//                             jobArray.push(responseObj);
//                         })
//                         dbTableObj.rows = jobArray;
//                         setDatatable(dbTableObj)
//                         setIsLoading(false);
//                     })
//                     .catch(error => console.log(error))
//             });
//     },[changeUseEffect]);

//     const deleteHandler = (itemId, deleteLink) => {
//         userDeleteMethod(deleteLink, itemId)
//             .then(response => {
//                 if (response.data.status == 1) {
//                     setIsLoading(true);
//                     var dataLenght = dbTableObj.rows.length;
//                     for (var i =0; i <= dataLenght-1; i++) {
//                         if(dbTableObj.rows[i].id == itemId){
//                             dbTableObj.rows.splice(i, 1);
//                             dataLenght = dbTableObj.rows.length;
//                         }
//                     }
//                     setDatatable(dbTableObj);
//                     setIsLoading(false);
//                     toast.success(response.data.message);
//                 } else {
//                     toast.error(response.data.message);
//                 }
//             })
//             .catch(error => console.log(error));
//     }

//     const handleSearchText = (e) =>{
//         setSearchText(e);
//     }
//     const searchHandler = (e) =>{
//         setIsLoading(true);
//         datatable.rows = {};
//         userGetMethod(JobClass+'?searchText='+searchText)
//         .then(response => {

//             dbTableObj.columns = [
//                 {
//                     label: 'SL.',
//                     field: 'sl',
//                     width: 10,
//                     attributes: {
//                         'aria-controls': 'DataTable',
//                         'aria-label': 'Name',
//                     },
//                 },
//                 {
//                     label: 'Class Name',
//                     field: 'job_class_name',
//                     width: 50,
//                 },
//                 {
//                     label: 'Active',
//                     field: 'active_status',
//                     width: 10,
//                 },
//                 {
//                     label: 'Create date',
//                     field: 'created_at',
//                     width: 20,
//                 },
//                 {
//                     label: 'Actions',
//                     field: 'actions',
//                     sort: 'disabled',
//                     width: 10,
//                 },
//             ]
//             let jobArray = [];
//             response.data.jobClasses.map((job, index) => {
//                 let responseObj = {};
//                 responseObj.sl = ++index;
//                 responseObj.job_class_name = job.job_class_name;
//                 responseObj.active_status = job.active_status;
//                 responseObj.created_at = job.created_at;
//                 responseObj.actions = <>
//                     <EditButton link={`/jobClass/edit/${job.id}`} menuId={ menuId } />
//                     <DeleteButton deleteLink={JobClass} deleteHandler={ deleteHandler } menuId={ menuId } dataId={job.id} />
//                 </>
//                 responseObj.id = job.id;
//                 jobArray.push(responseObj);
//             })
//             dbTableObj.rows = jobArray;
//             setDatatable(dbTableObj)
//             setIsLoading(false);

//         })
//         .catch(error => console.log(error)); 
//     }

//     const toggle = (e) => {
//         let jobId = e.target.getAttribute('jobid');
//         setJobIdForModal(jobId);
//         setModal(!modal);
//     }
//     const modalSubmit = (data) => {
//         userPostMethod(activeChangeJobClass, data)
//             .then(response => {
//                 // setIsLoading(true);
//                 if (response.data.status == 1) {
//                     toast.success(response.data.message);
//                 } else {
//                     toast.error(response.data.message);
//                 }
//                 setModal(false);
//                 // setIsLoading(false);
//                 // useEffect();
//                 setChangeUseEffect(changeUseEffect+1);
//             })
//         .catch(error => toast.error(error))
//     }

//     return (
//         <Fragment>
//             <div className="container-fluid">
//                 <div className="row">
//                     <div className="col-sm-12 col-md-12 col-lg-12">
//                         <div className="card">
//                             <div className="card-header">
//                                 <h5>Job Class List</h5>
//                             </div>
//                             <div className="row">

//                                 <div className="col-md-6 col-lg-6">
//                                     <div className="input-group text-box searchBox">
//                                         <input
//                                             type="text"
//                                             className="form-control input-txt-bx col-md-4"
//                                             placeholder="Type to Search..."
//                                             onChange={(e) => handleSearchText(e.target.value)}
//                                         />
//                                         <div className="input-group-append">
//                                             <button 
//                                                 className="btn btn-primary btn-sm" 
//                                                 type="button" 
//                                                 onClick={searchHandler} 
//                                             >Go
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="col-md-6 col-lg-6">
//                                     <AddButton link="jobClass/add" menuId={menuId} />
//                                 </div>
//                             </div>

//                             <div className="card-body datatable-react">
//                                 {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
//                                 (
//                                     <MDBDataTableV5
//                                         hover
//                                         entriesOptions={[5, 20, 25]}
//                                         entries={5}
//                                         pagesAmount={4}
//                                         data={datatable}
//                                         // pagingBottom=''
//                                         searchTop={false}
//                                         striped bordered
//                                         searchBottom={false}
//                                     />
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
            
//             {console.log('ListData modal', modal, jobIdForModal)}
//             {modal == true ? <ActiveChange jobIdForModal={jobIdForModal} toggle={toggle} modal={modal} modalSubmit={modalSubmit} /> : ''} 
            
//         </Fragment>
//     );
// }