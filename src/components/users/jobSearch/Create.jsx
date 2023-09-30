import React, { Fragment, useEffect, useState } from 'react'
import useForm from "react-hook-form";
import { SubmitButton, SubmitButtonSearch } from '../common/GlobalButton';
import moment from 'moment';
import Pagination from "react-js-pagination";
import { ShowButton } from '../../common/GlobalButton';
import { JOB_ORDER_SEARCH } from '../../../api/userUrl';
import { userGetMethod } from '../../../api/userAction';
import { Modal } from 'react-bootstrap';
import Show from '../jobOrder/Show';

const Create = () => {
    const { handleSubmit, register,reset, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [currentPage, setCurrentPage] = useState();
    const [perPage, setPerPage] = useState(10);
    const [totalData, setTotalData] = useState(0);
    const [jobNo,setJobNo] = useState(0);
    const [jobType,setJobType] = useState('');
    const [agreementDate,setAgreementDate] = useState(0);
    const [jobName,setJobName] = useState('');
    const [clientName,setClientName] = useState('');
    const [printerName,setPrinterName] = useState('');
    const [employeeName,setEmployeeName] = useState('');
    const [designHeight,setDesignHeight] = useState(0)
    const [designWidth,setDesignWidth] = useState(0)
    const [cylinderNo,setCylinderNo] = useState(0)
    const [cylinderType,setCylinderType] = useState('');
    const [ups,setUps] = useState(0);
    const [repeat,setRepeat] = useState(0);
    const [cir,setCir] = useState(0);
    const [filteredData, setFilteredData] = useState([]);


    const [jobOrderData, setJobOrderData] = useState([]);

    const [show, setShow] = useState(false);
    const [showId,setShowId] = useState(0)

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true)
    setShowId(id)
};

// call First Time Api
// useEffect(()=>{
// setIsLoading(true);
// fetch('/testJson/jobSearchDemo.json')
// .then(res => res.json())
// .then(data => {
//   // console.log(data)
//   setJobOrderData(data);
//   setIsLoading(false)
// })
// },[])

// useEffect(() => {
//   // Filter the totalData based on the input criteria
//   if (jobOrderData.length > 0) {
//     const filtered = jobOrderData.filter((item) => {
//       const nameMatch = item.job_name.toLowerCase().includes(jobName.toLowerCase());
//       console.log(nameMatch);
//       const jobTypeMatch = jobType === '' || item.job_type.toLowerCase() === jobType.toLowerCase();
//       const clientNameMatch = clientName == '' || item.client_name.toLowerCase() === clientName.toLowerCase();
//       console.log(clientNameMatch)
//       const printerMatch = printerName == '' || item.printer_name.toLowerCase() === printerName.toLowerCase();
//       const jobNoMatch = jobNo == 0 || item.job_no === jobNo;
//       const employeeMatch = employeeName == '' || item.employee_name.toLowerCase() === employeeName.toLowerCase();
//       const agreementDateMatch = agreementDate == '' || item.agreement_date === agreementDate;
//       const designHeightMatch = designHeight == '' || item.design_height === designHeight;
//       const designWidthMatch = designWidth == '' || item.design_width === designWidth;
//       const cylinderQunatityMatch = cylinderNo == '' || item.total_cylinder_qty=== cylinderNo;
//       const cylinderTypeMatch = cylinderType == '' || item.cylinder_type.toLowerCase() === cylinderType.toLowerCase();
//       const upsMatch = ups == '' || item.ups === ups;
//       const repeatMatch = repeat == '' || item.rpt === repeat;
//       const cirMatch = cir == '' || item.circumference === cir;
     
  
//       // return nameMatch && jobTypeMatch  && clientNameMatch && printerMatch && jobNoMatch && employeeMatch && agreementDateMatch && designHeightMatch && designWidthMatch && cylinderQunatityMatch && cylinderTypeMatch && upsMatch && repeatMatch && cirMatch;
//       return nameMatch && clientNameMatch ;
//     });
  
//     setFilteredData(filtered);
//   }
// }, [jobOrderData, jobName, clientName,jobType, printerName ,jobNo, employeeName, agreementDate,designHeight,designWidth,cylinderNo,cylinderType,ups,repeat,cir]);
// console.log(filteredData)
// console.log(jobOrderData)
// console.log(employeeName)

const handlePageChange = (pageNumber = 1) => {
  
}
 const submitHandler = (data, e) => {
    e.preventDefault();
    setIsLoading(true)
    setProcessing(true)
    userGetMethod(`${JOB_ORDER_SEARCH}?agreement_date=${data.agreement_date? data.agreement_date : null}&circumference=${data.circumference? data.circumference: null}&client_name=${data.client_name ?data.client_name : null}&cylinder_qty=${data.cylinder_qty?data.cylinder_qty:null}&cylinder_type=${data.cylinder_type?data.cylinder_type:null}&design_height=${data.design_height?data.design_height:null}&design_width=${data.design_width?data.design_width:null}&employee_name=${data.employee_name?data.employee_name:null}&job_name=${data.job_name?data.job_name:null}&job_no=${data.job_no?data.job_no:null}&job_type=${data.job_type?data.job_type:null}&printer_name=${data.printer_name?data.printer_name:null}&repeat=${data.repeat?data.repeat:null}&ups=${data.ups?data.ups:null}`)
    .then(response => {
      setJobOrderData(response.data.jobs)
      setProcessing(false)
      setIsLoading(false)
    })
   
  }
  

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };
  var menuId = 0;
//   if (props.location.state === undefined) {
//     var menuId = 0;
//   } else {
//     menuId = props.location.state.params.menuId;
//   }

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Job Search</h5>
              </div>
              <div className="card-body">
                <form
                    onSubmit={handleSubmit(submitHandler)}
                    className="theme-form"
                  >
                    <div className="row">

                        {/* =======================Left SIde Column======================= */}

                      <div className="col-md-6">
                        <fieldset className="border">
                          <legend className="w-auto text-left">Basic</legend>

                          <div className="form-group row">
                              
                          <div className="col-md-6 d-flex mb-1" style={{paddingRight: "0px"}}>
                              <label
                                className="col-sm-6"
                                htmlFor="job_type" style={{paddingLeft: "40px"}}
                              >
                                Job No
                              </label>
                              <div className="col-sm-6 " style={{paddingRight: "0px"}}>
                              <input
                                  className="form-control"
                                  id="job_no"
                                  name="job_no"
                                  onChange={e=>setJobNo(e.target.value)}
                                  //value={jobInfo.jobName}
                                  onKeyDown={handleKeyDown}
                                  type="text"
                                  placeholder="Job No"
                                  ref={register({
                                    
                                  })}
                                />
                                
                              </div>
                              </div>

                              
                              <div className="col-md-6 d-flex mb-1" style={{paddingRight: "0px"}}>
                              <label
                              className="col-sm-5"
                              htmlFor="job_type"
                            >
                              Job Order Type
                            </label>
                            <div className="col-sm-7">
                              <select
                                className="form-control"
                                id="job_type"
                                name="job_type"
                                onChange={e=>setJobType(e.target.value)}
                                onKeyDown={handleKeyDown}
                                ref={register({
                                  
                                })}
                                defaultValue=""
                              >
                                <option value=""> Select One </option>
                                <option value="New">New</option>
                                <option value="Remake">Remake</option>
                                <option value="Redo">Redo</option>
                                <option value="DC/RC">DC/RC</option>
                              </select>
                              
                            </div>
                              </div>
                          </div>

                          <div className="form-group row ">
                              
                          <div className="col-md-6 d-flex md-1" style={{paddingRight: "0px" , marginBottom: "5px"}}>
                          <label className="col-sm-6" style={{paddingLeft: "40px"}} >Agreement Date</label>
                              <div className="col-sm-6">
                                <input
                                type="date"
                                className="form-control"
                                name="agreement_date"
                                onChange={e=>setAgreementDate(e.target.value)}
                                onKeyDown={handleKeyDown}
                                ref={register({})}
                                
                                // onChange={inputChangeHandler}
                                defaultValue={moment().format("ll")}/>
                                </div>
                            </div>

                              
                          </div>

                          <div className="form-group row">
                            <label
                              className="col-sm-3"
                              htmlFor="job_name" style={{paddingLeft: "40px"}}
                            >
                              Job Name
                            </label>
                            <div className="col-sm-9">
                              <input
                                className="form-control mb-1"
                                id="job_name"
                                name="job_name"
                                onChange={e=>setJobName(e.target.value)}
                                //value={jobInfo.jobName}
                                onKeyDown={handleKeyDown}
                                type="text"
                                // autoComplete='off'
                                placeholder="Job Name"
                                ref={register({
                                  
                                })}
                              />
                              
                            </div>
                          </div>

                          <div className="form-group row ">
                            <label
                              className="col-sm-3"
                              htmlFor="client_name" style={{paddingLeft: "40px"}}
                            >
                              Client Name
                            </label>
                            <div className="col-sm-9">
                            
                              <input
                                className="form-control mb-1"
                                id="client_name"
                                name="client_name"
                                onChange={e=>setClientName(e.target.value)}
                                //value={jobInfo.jobName}
                                onKeyDown={handleKeyDown}
                                type="text"
                                placeholder="Client Name"
                                ref={register({
                                  
                                })}
                              />
                             
                            </div>
                              
                          </div>

                          <div className="form-group row">
                            <label
                              className="col-sm-3"
                              htmlFor="printer_name" style={{paddingLeft: "40px"}}
                            >
                              Printer Name
                            </label>
                            <div className="col-sm-9 mb-1">
                           
                              <input
                                className="form-control"
                                id="printer_name"
                                name="printer_name"
                                onChange={e=>setPrinterName(e.target.value)}
                                //value={jobInfo.jobName}
                                onKeyDown={handleKeyDown}
                                type="text"
                                placeholder="Printer Name"
                                ref={register({
                                  
                                })}
                              />
                              
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              className="col-sm-3"
                              htmlFor="employee_name" style={{paddingLeft: "40px"}}
                            >
                              Marketing Person
                            </label>
                            <div className="col-sm-9">
                                <input 
                                    className="form-control" 
                                    id="employee_name" 
                                    name="employee_name" 
                                    type="text" 
                                    onChange={e=>setEmployeeName(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Marketing Person.." 
                                    
                                    // onChange={onChangeHandler}
                                    ref={register({
                                        })}/>
                                    
                            </div>



                          </div>
                        </fieldset>

                        
                      </div>


                                {/*===== =======Right SIde Column =======================*/}
                        <div className="col-md-6">
                        <fieldset className="border">
                          <legend className="w-auto text-left">Optional</legend>

                          <div className="form-group row">
                             <div className="col-md-6 d-flex" >
                              <label
                                className="col-sm-6"
                                htmlFor="design_height" style={{paddingLeft: "40px"}}
                              >
                                Design Height
                              </label>
                              <div className="col-sm-6" style={{paddingRight: "0px",paddingLeft: "8px"}}>
                              <input
                                  className="form-control"
                                  id="design_height"
                                  name="design_height"
                                  onChange={e=>setDesignHeight(e.target.value)}
                                  //value={jobInfo.jobName}
                                  onKeyDown={handleKeyDown}
                                  type="text"
                                  placeholder="Design Height"
                                  ref={register({
                                    
                                  })}
                                />
                                
                              </div>
                              </div>

                              
                              <div className="col-md-6 d-flex">
                              <label
                                className="col-sm-6 col-form-label "
                                htmlFor="design_width"
                              >
                               Design Width
                              </label>
                              <div className="col-sm-6" style={{paddingRight: "0px"}}> 
                              <input
                                  className="form-control"
                                  id="design_width"
                                  name="design_width"
                                  //value={jobInfo.jobName}
                                  onChange={e=>setDesignWidth(e.target.value)}
                                  type="text"
                                  placeholder="Design Width"
                                  ref={register({
                                    
                                  })}
                                />
                                
                              </div>
                              </div>
                          </div>

                          <div className="form-group row">
                             <div className="col-md-6 d-flex" >
                             <label
                                className="col-sm-6"
                                htmlFor="cylinder_qty" style={{paddingLeft: "40px", marginBottom:"5px"}}
                              >
                                No of Cylinder
                              </label>
                              <div className="col-sm-6" style={{paddingRight: "0px",paddingLeft: "8px"}}>
                              <input
                                  className="form-control"
                                  id="cylinder_qty"
                                  name="cylinder_qty"
                                  onChange={e=>setCylinderNo(e.target.value)}
                                  //value={jobInfo.jobName}
                                  onKeyDown={handleKeyDown}
                                  type="text"
                                  placeholder="No of Cylinder"
                                  ref={register({
                                    
                                  })}
                                />
                                
                              </div>
                              </div>

                              
                              <div className="col-md-6 d-flex">
                              <label
                              className="col-sm-6"
                              htmlFor="cylinder_type" style={{paddingLeft: "40px"}}
                            >
                              Cylinder Type
                            </label>
                            <div className="col-sm-6"  style={{paddingRight: "0px", marginBottom:"5px"}}>
                              <select
                                className="form-control"
                                onKeyDown={handleKeyDown}
                                id="cylinder_type"
                                name="cylinder_type"
                                onChange={e=>setCylinderType(e.target.value)}
                                ref={register({
                                  
                                })}
                                defaultValue=""
                              >
                                <option value=""> Select One</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                              </select>
                              
                            </div>

                              </div>
                          </div>

                          <div className="form-group row">
                            <label
                              className="col-sm-3"
                              htmlFor="ups" style={{paddingLeft: "40px"}}
                            >
                              Ups
                            </label>
                            <div className="col-sm-9 mb-1">
                           
                              <input
                                className="form-control"
                                id="ups"
                                name="ups"
                                onChange={e=>setUps(e.target.value)}
                                //value={jobInfo.jobName}
                                onKeyDown={handleKeyDown}
                                type="text"
                                placeholder="Ups"
                                ref={register({
                                 
                                })}
                              />
                              
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              className="col-sm-3"
                              htmlFor="repeat" style={{paddingLeft: "40px"}}
                            >
                              Repeat
                            </label>
                            <div className="col-sm-9 mb-1">
                                <input 
                                    className="form-control" 
                                    id="repeat" 
                                    name="repeat" 
                                    type="text" 
                                    onChange={e=>setRepeat(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Repeat" 
                                   
                                    // onChange={onChangeHandler}
                                    ref={register({
                                        })}/>
                                    
                            </div>



                          </div>

                          <div className="form-group row">
                            <label
                              className="col-sm-3"
                              htmlFor="circumference" style={{paddingLeft: "40px"}}
                            >
                              Circumference
                            </label>
                            <div className="col-sm-9">
                            <input
                                className="form-control"
                                id="circumference"
                                name="circumference"
                                onChange={e=>setCir(e.target.value)}
                                //value={jobInfo.jobName}
                                onKeyDown={handleKeyDown}
                                type="text"
                                placeholder="Circumference"
                                ref={register({
                                 
                                })}
                              />
                              
                            </div>
                          </div>
                        </fieldset>

                        
                      </div>
                    </div>

                    

                    <SubmitButtonSearch link="jobOrder/index" menuId={menuId}/>
                  </form>
              </div>
            </div>
            {jobOrderData.length > 0 ? <div className="card">
            <div className="card-body datatable-react">
                                {isLoading  ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <div className="table-responsive">
                                        <table className="table table-border-horizontal">
                                            <thead>
                                                <tr>
                                                    <th scope="col" width="5%" > SL.</th>
                                                    {/* <th scope="col" width="8%" onClick={() => sortHandler(1)} ><i className="fa fa-sort"></i> SL.</th> */}
                                                    <th scope="col" width="10%" > Job No.</th>
                                                    <th scope="col" width="15%" > Job Name</th>                                                      
                                                    <th scope="col" width="10%" >Agreement Date</th>                                                      
                                                    <th scope="col" width="5%" > Client</th>
                                                    <th scope="col" width="10%" > Surface/per cylinder</th>
                                                    <th scope="col" width="15%" > Marketing Person</th>
                                                    <th scope="col" width="10%"> Printer Name</th>
                                                    <th scope="col" width="10%"> Total Cylinder</th>
                                                    <th scope="col" width="5%"> Job Type</th>
                                                    <th scope="col" width="5%">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { 
                                                    jobOrderData.length > 0 ? 
                                                        <>
                                                            {jobOrderData.map((item, index) =>           
                                                                (
                                                                    <tr key={index}>
                                                                        <td scope="row">{index+1}</td>
                                                                        <td>{item.job_no}</td>
                                                                        <td>{item.job_name}</td>
                                                                        <td>{item.agreement_date}</td>
                                                                        <td>{item.client_name}</td>
                                                                        <td>{item.surface_area}</td>
                                                                        <td>{item.employee_name}</td>
                                                                        <td>{item.printer_name}</td>
                                                                        <td>{item.total_cylinder_qty}</td>
                                                                        <td>{item.job_type}</td>
                                                                        <td className="">
                                                                            {
                                                                               <ShowButton handleShow={()=>handleShow(item.job_no)}   menuId={ menuId }/>
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
                                    onChange={handlePageChange}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    firstPageText="First"
                                    lastPageText="Last"
                                />
              </div>
            </div>: <div colSpan="9" className="text-center">{processing == true ? "Processing Data" :'No data found.Please search any field' }</div>}
          </div>
        </div>
      </div>
      <div>
        <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton style={{maxWidth:'none', width:"100%"}}>
          <Modal.Title>Job Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body><Show showId = {showId}></Show></Modal.Body>
        
      </Modal>
        </div>
      

    </Fragment>
  )
}

export default Create