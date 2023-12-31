import React, { Fragment, useState, useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ShowButton, SubmitButton } from '../../common/GlobalButton';
import { JOB_ORDER_RSURL,GET_JOB_ORDER, GET_JOB_CLIENT_MARKETING, GET_JOB_CLIENT_ADDRESS } from '../../../api/userUrl';
import { userGetMethod, userPostMethod } from '../../../api/userAction';
import useForm from "react-hook-form";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import Modal from 'react-bootstrap/Modal';
import Show from './Show';


const Add = (props) => {
  const { handleSubmit, register,reset, errors } = useForm();
  const [isLoading, setIsLoading] = useState(true);
  const [dropdownData, setDropdownData] = useState({});
  const [multipleDropdownData, setMultipleDropdownData] = useState([]);
  const [clientEmployee, setClientEmployee] = useState([]);
  const [typeheadOptions, setTypeheadOptions] = useState({});
  const [linkjob, setLinkjob] = useState(false);
  const [jobOrderType, setJobOrderType] = useState(null);

  const [printingWidth,setPrintingWidth] = useState(0);
  const [printingHeight,setPrintingHeight] = useState(0);
  const [extraFaceLength,setExtraFaceLength] = useState(0);
  const [circumference,setCircumference] = useState(0);
  const [surfaceArea,setSurfaceArea] = useState(0);
  const [totalSurfaceArea,setTotalSurfaceArea] = useState(0);
  const [flArea,setFlArea] = useState(0);
  const [cirArea,setCirArea] = useState(0);
  const [dirArea,setDirArea] = useState(0);
  const [dropDownText,setDropDownText] = useState('');
  const [clientAddress,setClientAddress] = useState('');
  const [show, setShow] = useState(false);
  const [showId,setShowId] = useState(0)

const handleClose = () => setShow(false);

const handleShow = () => {
  setShow(true)
  
};
useEffect(()=>{
  setShowId()
},[setShowId])


  


// console.log(showId);
  
  // const [jobId, setJobId] = useState(0);
  const [typeAheadValue, setTypeAheadValue] = useState({
    'reference_job': [],
    'job_sub_class_id': [],
    'client_id': [],
    'printer_id': [],
    'marketing_person_id': [],
    'design_machine_id': []

  });
  

  let [calculationValue, setCalculationValue] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      'design_width': '0',
      'ups': '0',
      'design_height': '0',
      'rpt': '0',
      'printing_height': '0',
      'circumference': '0',
      'face_length': '0',
      'total_cylinder_qty': '0',
    }
  );

  // const [ jobInfo, setJobInfo] = useState({
  //     'jobName': ''
  // });
  

  useEffect(() => {
    userGetMethod(`${JOB_ORDER_RSURL}/create`)
      .then(response => {
        // FOR MARKETING PERSON
        // console.log(response);
        let marketingEmpOptions = [];
        if (response.data.marketingPersons && response.data.marketingPersons.length > 0) {
          response.data.marketingPersons.map(person => {
            let personObj = {};
            personObj.id = person.id;
            personObj.name = `[${person.employee_id}] ` + person.name;
            marketingEmpOptions.push(personObj);
          })
        }

        // FOR PRINTERS
        let printerOptions = [];
        if (response.data.printers && response.data.printers.length > 0) {
          response.data.printers.map(printer => {
            let printerObj = {};
            printerObj.id = printer.id;
            printerObj.name = `[${printer.printer_code}] ${printer.printer_name}`;
            printerOptions.push(printerObj);
          })
        }
        // console.log(jobOrderType);

        // FOR CLIENTS
        let clientOptions = [];
        if (response.data.clients && response.data.clients.length > 0) {
          response.data.clients.map(client => {
            let clientObj = {};
            let name = client.name;
            clientObj.id = client.id;
            clientObj.name = `[${client.client_id}] ${name.slice(0,18)} /${client.address}`;
            clientOptions.push(clientObj);
          })
        }
        // FOR JOB SUB CLASS
        let subClassOptions = [];
        if (response.data.jobSubClasses && response.data.jobSubClasses.length > 0) {
          response.data.jobSubClasses.map(subClass => {
            let subClassObj = {};
            subClassObj.id = subClass.id;
            subClassObj.name = subClass.sub_class;
            subClassOptions.push(subClassObj);
          })
        }
        // // FOR REFERENCE JOB
        let referenceJobsOptions = [];
        if (response.data.referenceJobs && response.data.referenceJobs.length > 0) {
          response.data.referenceJobs.map(referenceJob => {
            let referenceJobObj = {};
            referenceJobObj.id = referenceJob.id;
            referenceJobObj.name = referenceJob.job_name;
            referenceJobsOptions.push(referenceJobObj);
          })
        }

        // FOR JOB SUB CLASS
        let additionalColorOptions = [];
        if (response.data.colors && response.data.colors.length > 0) {
          response.data.colors.map(color => {
            let colorObj = {};
            colorObj.id = color.id;
            colorObj.name = color.color_name;
            additionalColorOptions.push(colorObj);
          })
        }

        
        setTypeheadOptions(
          (prevstate) => ({
            ...prevstate,
            ['marketing_persons']: marketingEmpOptions,
            ['printers']: printerOptions,
            ['clients']: clientOptions,
            ['job_sub_classes']: subClassOptions,
            ['reference_jobs']: referenceJobsOptions,
            ['additional_colors']: additionalColorOptions,
            ['design_machines']: [],
          })
        );

        setIsLoading(false);
      });

      // console.log(typeAheadValue);
  }, []);

  const dropDownChange = (event, stateName) => {
    if (stateName == 'reference_job' || stateName == 'job_sub_class_id' || stateName == 'client_id' || stateName == 'printer_id' || stateName == 'marketing_person_id' || stateName == 'design_machine_id') {
      setTypeAheadValue({ [stateName]: event })
    }
    if (stateName == 'client_id' && event.length > 0) {
      const clientId = event[0].id;
      userGetMethod(`${GET_JOB_CLIENT_MARKETING}?client_id=${clientId}`)
      .then(response => {
        setClientEmployee([response.data.marketingPerson])
        

        setIsLoading(false);
      })
      userGetMethod(`${GET_JOB_CLIENT_ADDRESS}?client_id=${clientId}`)
      .then(response => {
        setClientAddress(response.data.clientAddress);
        setIsLoading(false);
      })
      
    }
    
    if (event.length > 0) {
      const selectedValue = event[0].id;
      // console.log(selectedValue);
      // setDropDownText(stateName)
      setDropdownData(
        (prevstate) => ({
          ...prevstate,
          [stateName]: selectedValue,
        })
      );
    }
  }






  useEffect(() => {
    if (clientEmployee.length > 0) {
      let designMachineOptions = [];
          if (clientEmployee &&clientEmployee.length > 0) {
            clientEmployee.map(designMachine => {
              let designMachineObj = {};
              if (designMachine !== null) {
                designMachineObj.id = designMachine.id;
                designMachineObj.name = designMachine.name;
                designMachineOptions.push(designMachineObj);
              }
              else{
                toast.error('Employee Id not Set.Need to Config first!');

              }
            })
          }
          setTypeheadOptions(
            (prevstate) => ({
              ...prevstate,
              
              ['design_machines']: designMachineOptions,
            })
            );
         
   }
   
  },[clientEmployee]);



  // console.log(clientAddress)
  // console.log(typeAheadValue?.client_id);

  const handleTypeaheadInputChange = (text) => {
    setDropDownText(text); // Store the typed text in the state
  };

  useEffect(()=>{
    if (dropDownText.length > 3) {
      // console.log(dropDownText)
      // setIsLoading(true)
      userGetMethod(`${GET_JOB_ORDER}?searchText=${dropDownText}`)
      .then(response => {
        // console.log(response.data)
        if(response.data.jobOrders){
          let referenceJobsOptions = [];
          if (response.data.jobOrders && response.data.jobOrders.length > 0) {
            response.data.jobOrders.map(referenceJob => {
              // console.log(referenceJob.id)
              // console.log(referenceJob.job_name)
            let referenceJobObj = {};
            referenceJobObj.id = referenceJob.id;
            referenceJobObj.job_no = referenceJob.job_no;
            referenceJobObj.name = referenceJob.job_name;
            referenceJobsOptions.push(referenceJobObj);
          })
        }

        setTypeheadOptions(
          (prevstate) => ({
            ...prevstate,
            
            ['reference_jobs']: referenceJobsOptions
          })
        );
        setIsLoading(false);
        }
      })
    }
    
      // setIsLoading(false);
    
    // else if(dropDownText.length < 3){
    //   setTypeheadOptions(
    //     (prevstate) => ({
    //       ...prevstate,
          
    //       ['reference_jobs']: ''
    //     })
    //   );

    // }
  },[dropDownText])
  // console.log(typeheadOptions)
  // calculated area=================
 
  // console.log(printingWidth)

  const calculateFormValue = (event) => {
    event.preventDefault();
    setCalculationValue(
      { ...calculationValue,[event.target.name]: event.target.value },
    );
  };
  useEffect(()=>{
    const printing_width_val = calculationValue.ups * calculationValue.design_width;
    setPrintingWidth(printing_width_val);

    const printing_height_val= (calculationValue.design_height * calculationValue.rpt);
    setPrintingHeight(printing_height_val);

    const circumference_val=(calculationValue.design_height * calculationValue.rpt)
    setCircumference(circumference_val);

    const extra_face_length_val = calculationValue.face_length - calculationValue.design_width * calculationValue.ups
    setExtraFaceLength(extra_face_length_val);

    const surface_val=((calculationValue.face_length * (calculationValue.design_height * calculationValue.rpt)) / 100);
    setSurfaceArea(surface_val);

    const total_surface_val=((multipleDropdownData.length * (calculationValue.face_length * (calculationValue.design_height * calculationValue.rpt))) / 100)
    setTotalSurfaceArea(total_surface_val);

    const fl_val=(calculationValue.face_length);
    setFlArea(fl_val);

    const cirArea_val=(calculationValue.design_height * calculationValue.rpt);
    setCirArea(cirArea_val);

    const dirArea_val=(Math.round((calculationValue.design_height * calculationValue.rpt) / Math.PI));
    setDirArea(dirArea_val);





  },[calculateFormValue,calculationValue,setPrintingWidth,setPrintingHeight,setDirArea,setCirArea,setFlArea,setTotalSurfaceArea,setSurfaceArea,setExtraFaceLength,setCircumference,calculationValue.ups,calculationValue.design_width,calculationValue.design_height,calculationValue.rpt,calculationValue.face_length,multipleDropdownData.length]);
  

  
  // console.log(calculationValue);

  // const jobChangeHandler = (e) => {
  //     var selectJobId = e[0]['id'];
  //     setJobId(selectJobId);
  //     userGetMethod(`${JOB_ORDER_RSURL}/${selectJobId}`)
  //         .then(response => {
  //             //console.log('res', response);
  //             setJobInfo({
  //                 jobName: response.data.jobOrder.job_name,
  //                 clientId: response.data.jobOrder.client_id,
  //                 printerId: response.data.jobOrder.printer_id,
  //             });
  //         })
  //         .catch(error => console.log(error))   
  // }
  // console.log(multipleDropdownData);
  const submitHandler = (data, e) => {
    // console.log(data)
    e.preventDefault();
    data.client_id = dropdownData.client_id;
    data.job_sub_class_id = dropdownData.job_sub_class_id;
    data.reference_job = dropdownData.reference_job;
    data.marketing_person_id = typeheadOptions.design_machines[0]?.id;
    data.printer_id = dropdownData.printer_id;
    data.design_machine_id = dropdownData.design_machine_id;
    let color_id_final_arr = [];
    multipleDropdownData.map(item => {
      color_id_final_arr.push(item.id);
    })
    data.color_id = color_id_final_arr;
    userPostMethod(JOB_ORDER_RSURL, data)
      .then(response => {
        setIsLoading(true)
        if (response.data.status == 1 && response.data.job_id) {
          // e.target.reset();
          const job_id = response.data?.job_id;
          // console.log(job_id);
          setShowId(job_id)
          reset();
          clearForm();
          setIsLoading(false);
          

          if (job_id) {
            toast.success(response.data.message);
            setShowId(job_id)
            handleShow();
            
          }
          

        } else {
          toast.error(response.data.message);
        }
      })
      .catch(error => toast.error(error));
  }


  const clearForm = () => {
    setTypeAheadValue({
      'reference_job': [],
      'job_sub_class_id': [],
      'client_id': [],
      'printer_id': [],
      'marketing_person_id': [],
      'design_machine_id': []
    })
    setClientAddress('')
    setTypeheadOptions({
    'marketing_persons': [],
    'printers': [],
    'clients': [],
    'job_sub_classes': [],
    'reference_jobs': [],
    'additional_colors': [],
  'design_machines': [],})
    setCalculationValue({
      'design_width': '',
      'ups': '',
      'design_height': '',
      'rpt': '',
      'printing_height': '',
      'circumference': '',
      'face_length': '',
      'total_cylinder_qty': '',
    });
    setLinkjob(false);
    setMultipleDropdownData([]);

  }

  var menuId = 0;
  if (props.location.state === undefined) {
    var menuId = 0;
  } else {
    menuId = props.location.state.params.menuId;
  }

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Job Order Created</h5>
              </div>
              <div className="card-body">
                {isLoading ? (
                  <img
                    src={process.env.PUBLIC_URL + "/preloader.gif"}
                    alt="Data Loading"
                  />
                ) : (
                  <form
                    onSubmit={handleSubmit(submitHandler)}
                    className="theme-form"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <fieldset className="border">
                          <legend className="w-auto text-left">Basic</legend>

                          <div className="form-group row">
                            <label
                              className="col-sm-4 col-form-label required"
                              htmlFor="job_type"
                            >
                              Job Order Type
                            </label>
                            <div className="col-sm-8">
                              <select
                                className="form-control"
                                required
                                id="job_type"
                                name="job_type"
                                onChange={(e) =>
                                  setJobOrderType(e.target.value)
                                }
                                ref={register({
                                  required: "Job Order Type Field Required",
                                })}
                                defaultValue=""
                              >
                                <option value=""> Select One </option>
                                <option value="New">New</option>
                                <option value="Remake">Remake</option>
                                <option value="Redo">Redo</option>
                                <option value="DC/RC">DC/RC</option>
                              </select>
                              {errors.job_type && (
                                <p className="text-danger">
                                  {errors.job_type.message}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group row">
                                <label
                                  className="col-sm-8 col-form-label"
                                  htmlFor="link_job"
                                >
                                  Link Job
                                </label>
                                <div className="col-sm-4 mt-2">
                                  <input
                                    name="link_job"
                                    onChange={(e) =>
                                      setLinkjob(e.target.checked)
                                    }
                                    required={
                                      jobOrderType == "New" ? false : true
                                    }
                                    type="checkbox"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              {linkjob == true && (
                                <div className="form-group row">
                                  <label
                                    className="col-sm-4 col-form-label required"
                                    htmlFor="reference_job"
                                  >
                                    Ref Job
                                  </label>
                                  <div className="col-sm-8">
                                    <Typeahead
                                      id="reference_job"
                                      name="reference_job"
                                      labelKey={(option) => `${option.job_no}-${option.name}`}
                                      options={
                                        typeheadOptions["reference_jobs"]
                                      }
                                      placeholder="Type Job (min. 4 chars)"
                                      onChange={(e) =>
                                        dropDownChange(e, "reference_job")
                                      }
                                      onInputChange={(text) => handleTypeaheadInputChange(text)}
                                      
                                      inputProps={{
                                        required:
                                          jobOrderType == "New" ? false : true,
                                      }}
                                      // ref={register({
                                      //     required: 'Reference Job Field Required'
                                      // })}
                                      selected={typeAheadValue["reference_job"]}
                                      {...register("reference_job")}
                                    />


                                                        {/* <Typeahead
                                                        id="job_order_id"
                                                        name="job_order_id"
                                                        labelKey={option => `${option.name}`}
                                                        options={typeHeadOptions['job_orders']}
                                                        placeholder="Select Job No..."
                                                        onChange={(e) => dropDownChange(e, 'job_order_id')}
                                                        inputProps={{ required: true }}
                                                        selected={jobNoValue}
                                                        disabled={job_order_id != null ? 'disabled' : ''}
                                                        // ref={register({
                                                        //     required: 'Job No Field Required'
                                                        // })}
                                                        {...register('job_order_id')}
                                                    /> */}




                                    {errors.reference_job && (
                                      <p className="text-danger">
                                        {errors.reference_job.message}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              className="col-sm-4 col-form-label required"
                              htmlFor="job_name"
                            >
                              Job Name
                            </label>
                            <div className="col-sm-8">
                              <input
                                className="form-control"
                                id="job_name"
                                name="job_name"
                                //value={jobInfo.jobName}
                                required
                                type="text"
                                placeholder="Job Name"
                                ref={register({
                                  required: "Job Name Field Required",
                                })}
                              />
                              {errors.job_name && (
                                <p className="text-danger">
                                  {errors.job_name.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              className="col-sm-4 col-form-label required"
                              htmlFor="job_sub_class_id"
                            >
                              Sub Class
                            </label>
                            <div className="col-sm-8">
                              <Typeahead
                                id="job_sub_class_id"
                                name="job_sub_class_id"
                                labelKey={(option) => `${option.name}`}
                                options={typeheadOptions["job_sub_classes"]}
                                placeholder="Select Sub Class..."
                                onChange={(e) =>
                                  dropDownChange(e, "job_sub_class_id")
                                }
                                inputProps={{ required: true }}
                                selected={typeAheadValue["job_sub_class_id"]}
                                // ref={register({
                                //     required: 'Sub Class Field Required'
                                // })}
                                {...register("job_sub_class_id")}
                              />
                              {errors.job_sub_class_id && (
                                <p className="text-danger">
                                  {errors.job_sub_class_id.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              className="col-sm-4 col-form-label required"
                              htmlFor="client_id"
                            >
                              Client Name
                            </label>
                            <div className="col-sm-8">
                              <Typeahead
                                id="client_id"
                                name="client_id"
                                labelKey={(option) => `${option.name}`}
                                options={typeheadOptions["clients"]}
                                placeholder="Select Client..."
                                onChange={(e) => dropDownChange(e, "client_id")}
                                inputProps={{ required: true }}
                                selected={typeAheadValue["client_id"]}
                                // ref={register({
                                //   required: "Client Name Field Required",
                                // })}
                                {...register("client_id")}
                              />
                              {errors.client_id && (
                                <p className="text-danger">
                                  {errors.client_id.message}
                                </p>
                              )}
                            </div>
                          </div>


                          {clientAddress && <div className="form-group row">
                            <label
                              className="col-sm-4 col-form-label"
                              htmlFor="client_id"
                            >
                              Client Address
                            </label>
                            <div className="col-sm-8">
                            <input
                                className="form-control"
                                id="client_address"
                                name="client_address"
                                value={clientAddress?.address}
                                required
                                disabled={clientAddress?.address}
                                type="text"
                                placeholder="client_address"
                                ref={register({
                                  required: "Client_address Field Required",
                                })}
                              />
                              {errors.client_address && (
                                <p className="text-danger">
                                  {errors.jclient_address.message}
                                </p>
                              )}
                             
                            </div>
                          </div>}

                          <div className="form-group row">
                            <label
                              className="col-sm-4 col-form-label required"
                              htmlFor="printer_id"
                            >
                              Printer Name
                            </label>
                            <div className="col-sm-8">
                              <Typeahead
                                id="printer_id"
                                name="printer_id"
                                labelKey={(option) => `${option.name}`}
                                options={typeheadOptions["printers"]}
                                placeholder="Select Printer..."
                                onChange={(e) =>
                                  dropDownChange(e, "printer_id")
                                }
                                inputProps={{ required: true }}
                                selected={typeAheadValue["printer_id"]}
                                // ref={register({
                                //   required: "Printer Name Field Required",
                                // })}
                                {...register("printer_id")}
                              />
                              {errors.printer_id && (
                                <p className="text-danger">
                                  {errors.printer_id.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              className="col-sm-4 col-form-label required"
                              htmlFor="design_machine_id"
                            >
                              Employees
                            </label>
                            {/* <div className="col-sm-8">
                              <Typeahead
                                id="marketing_person_id"
                                name="marketing_person_id"
                                labelKey={(option) => `${option.name}`}
                                options={typeheadOptions["design_machines"]}
                                placeholder="Select Person..."
                                onChange={(e) =>
                                  dropDownChange(e, "marketing_person_id")
                                }
                                inputProps={{ required: true }}
                                selected={typeheadOptions["design_machines"]}
                                // ref={register({
                                //   required: "Marketing Person Field Required",
                                // })}
                                {...register("marketing_person_id")}
                              />
                              {errors.marketing_person_id && (
                                <p className="text-danger">
                                  {errors.marketing_person_id.message}
                                </p>
                              )}
                            </div> */}

                                                        <div className="col-sm-8">
                                                        <input 
                                                            className="form-control" 
                                                            id="job_name" 
                                                            name="job_name" 
                                                            type="text" 
                                                            disabled
                                                            placeholder="Employee Name.." 
                                                            value={typeheadOptions.design_machines[0]?.name}
                                                            // onChange={onChangeHandler}
                                                            ref={register({
                                                                required: 'Job Name Field Required'
                                                            })}
                                                        />
                                                        {errors.job_name && <p className='text-danger'>{errors.job_name.message}</p>}
                                                    </div>



                          </div>


                          <div className="form-group row">
                            <label
                              className="col-sm-4 col-form-label required"
                              htmlFor="design_machine_id"
                            >
                              Designer Name
                            </label>
                            <div className="col-sm-8">
                              <Typeahead
                                id="marketing_person_id"
                                name="marketing_person_id"
                                labelKey={(option) => `${option.name}`}
                                options={typeheadOptions["marketing_persons"]}
                                placeholder="Select Person..."
                                onChange={(e) =>
                                  dropDownChange(e, "design_machine_id")
                                }
                                inputProps={{ required: true }}
                                selected={typeAheadValue["design_machine_id"]}
                                // ref={register({
                                //   required: "Marketing Person Field Required",
                                // })}
                                {...register("marketing_person_id")}
                              />
                              {errors.design_machine_id && (
                                <p className="text-danger">
                                  {errors.design_machine_id.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </fieldset>

                        <fieldset className="border">
                          <legend className="w-auto text-left">Color</legend>

                          <div className="form-group row">
                            <label
                              className="col-sm-4 col-form-label required"
                              htmlFor="color_id"
                            >
                              Color
                            </label>
                            <div className="col-sm-8">
                              <Typeahead
                                id="color_id"
                                name="color_id"
                                labelKey={(option) => `${option.name}`}
                                multiple
                                options={typeheadOptions["additional_colors"]}
                                placeholder="Select Color..."
                                onChange={setMultipleDropdownData}
                                selected={multipleDropdownData}
                                {...register("color_id")}
                                inputProps={{
                                  required:
                                    multipleDropdownData &&
                                    multipleDropdownData == ""
                                      ? true
                                      : false,
                                }}
                              />
                              {errors.color_id && (
                                <p className="text-danger">
                                  {errors.color_id.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              className="col-sm-4 col-form-label" htmlFor="eye_mark_color">
                              Eye Mark Color
                            </label>
                            <div className="col-sm-8">
                              <select
                                className="form-control"
                                id="eye_mark_color"
                                name="eye_mark_color"
                                ref={register({})}
                                defaultValue=""
                              >
                                <option value="">Select One</option>
                                <option value="White">White</option>
                                <option value="Black">Black</option>
                                <option value="Red">Red</option>
                              </select>
                              
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              className="col-sm-4 col-form-label"
                              htmlFor="eye_mark_size"
                            >
                              Eye Mark Size
                            </label>
                            <div
                              className="col-sm-8 row"
                              style={{ marginLeft: "1px" }}
                            >
                              <div className="col-sm-5">
                                <input
                                  className="form-control"
                                  id="eye_mark_size_one"
                                  name="eye_mark_size_one"
                                  type="text"
                                  placeholder="Eye Mark Size"
                                  ref={register({})}
                                />
                                
                              </div>
                              <span className="m-r-10">X</span>
                              <div className="col-sm-6">
                                <input
                                  className="form-control"
                                  id="eye_mark_size_two"
                                  name="eye_mark_size_two"
                                  type="text"
                                  placeholder="Eye Mark Size"
                                  ref={register({})}
                                />
                                
                              </div>
                            </div>
                          </div>
                        </fieldset>
                      </div>

                      <div className="col-md-6">
                        <fieldset className="border">
                          <legend className="w-auto text-left">
                            Cylinder Info
                          </legend>
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="form-group row">
                                <label
                                  className="col-sm-8 col-form-label required"
                                  htmlFor="design_width"
                                >
                                  Job Width (mm)
                                </label>
                                <div className="col-sm-4">
                                  <input
                                    className="form-control"
                                    id="design_width"
                                    name="design_width"
                                    required
                                    type="text"
                                    placeholder="Job Width"
                                    // value={jobOrderData.design_width}
                                    onChange={calculateFormValue}
                                    ref={register({
                                      required: "Job Width Field Required",
                                    })}
                                  />
                                  {errors.design_width && (
                                    <p className="text-danger">
                                      {errors.design_width.message}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="form-group row">
                                <label
                                  className="col-sm-8 col-form-label required"
                                  htmlFor="ups"
                                >
                                  UPS
                                </label>
                                <div className="col-sm-4">
                                  <input
                                    className="form-control"
                                    id="ups"
                                    name="ups"
                                    required
                                    type="text"
                                    placeholder="UPS"
                                    // value={jobOrderData.ups}
                                    onChange={calculateFormValue}
                                    ref={register({
                                      required: "UPS Field Required",
                                    })}
                                  />
                                  {errors.ups && (
                                    <p className="text-danger">
                                      {errors.ups.message}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="form-group row">
                                <label
                                  className="col-sm-8 col-form-label required"
                                  htmlFor="printing_width"
                                >
                                  Printing Width (mm)
                                </label>
                                <div className="col-sm-4">
                                  <input
                                    className="form-control"
                                    id="printing_width"
                                    name="printing_width"
                                    required
                                    type="text"
                                    placeholder="Printing Width"
                                    value={
                                      printingWidth
                                    }
                                    readOnly={"readonly"}
                                    ref={register({
                                      required: "Printing Width Field Required",
                                    })}
                                  />
                                  {errors.printing_width && (
                                    <p className="text-danger">
                                      {errors.printing_width.message}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="form-group row">
                                <label
                                  className="col-sm-8 col-form-label required"
                                  htmlFor="face_length"
                                >
                                  Face Length (mm)
                                </label>
                                <div className="col-sm-4">
                                  <input
                                    className="form-control"
                                    id="face_length"
                                    name="face_length"
                                    required
                                    type="text"
                                    placeholder="FL"
                                    onChange={calculateFormValue}
                                    // value={jobOrderData.face_length}
                                    ref={register({
                                      required: "Face Length Field Required",
                                    })}
                                  />
                                  {errors.face_length && (
                                    <p className="text-danger">
                                      {errors.face_length.message}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="form-group row">
                                <label
                                  className="col-sm-8 col-form-label required"
                                  htmlFor="extra_face_length"
                                >
                                  Extra Face Length (mm)
                                </label>
                                <div className="col-sm-4">
                                  <input
                                    className="form-control"
                                    id="extra_face_length"
                                    name="extra_face_length"
                                    required
                                    type="text"
                                    placeholder="Extra Width"
                                    readOnly={"readonly"}
                                    value={extraFaceLength}
                                    
                                    ref={register({
                                      required: "Extra Width Field Required",
                                    })}
                                  />
                                  {errors.extra_face_length && (
                                    <p className="text-danger">
                                      {errors.extra_face_length.message}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="col-sm-6">
                              <div className="form-group row">
                                <label
                                  className="col-sm-8 col-form-label required"
                                  htmlFor="design_height"
                                >
                                  Job Height (mm)
                                </label>
                                <div className="col-sm-4">
                                  <input
                                    className="form-control"
                                    id="design_height"
                                    name="design_height"
                                    required
                                    type="text"
                                    placeholder="Job Height"
                                    onChange={(e)=>calculateFormValue(e)}
                                    ref={register({
                                      required: "Job Height Field Required",
                                    })}
                                  />
                                  {errors.design_height && (
                                    <p className="text-danger">
                                      {errors.design_height.message}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="form-group row">
                                <label
                                  className="col-sm-8 col-form-label required"
                                  htmlFor="rpt"
                                >
                                  RPT
                                </label>
                                <div className="col-sm-4">
                                  <input
                                    className="form-control"
                                    id="rpt"
                                    name="rpt"
                                    required
                                    type="text"
                                    placeholder="RPT"
                                    onChange={(e)=>calculateFormValue(e)}
                                    ref={register({
                                      required: "RPT Field Required",
                                    })}
                                  />
                                  {errors.rpt && (
                                    <p className="text-danger">
                                      {errors.rpt.message}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="form-group row">
                                <label
                                  className="col-sm-8 col-form-label required"
                                  htmlFor="circumference"
                                >
                                  Circumference (mm)
                                </label>
                                <div className="col-sm-4">
                                  <input
                                    className="form-control"
                                    id="circumference"
                                    name="circumference"
                                    required
                                    type="text"
                                    placeholder="Circumference"
                                    value={
                                      circumference
                                    }
                                    readOnly={"readonly"}
                                    ref={register({
                                      required: "Circumference Field Required",
                                    })}
                                  />
                                  {errors.circumference && (
                                    <p className="text-danger">
                                      {errors.circumference.message}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="form-group row">
                                <label
                                  className="col-sm-8 col-form-label required"
                                  htmlFor="printing_height"
                                >
                                  Printing Height (mm)
                                </label>
                                <div className="col-sm-4">
                                  <input
                                    className="form-control"
                                    id="printing_height"
                                    name="printing_height"
                                    required
                                    type="text"
                                    placeholder="Printing Height"
                                    readOnly={"readonly"}
                                    value={
                                      printingHeight
                                    }
                                    ref={register({
                                      required:
                                        "Printing Height Field Required",
                                    })}
                                  />
                                  {errors.printing_height && (
                                    <p className="text-danger">
                                      {errors.printing_height.message}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </fieldset>

                        <fieldset className="border">
                          <legend className="w-auto text-left">
                            Surface Area
                          </legend>

                          <div className="form-group row">
                            <label
                              className="col-sm-4 col-form-label required"
                              htmlFor="cylinder_type"
                            >
                              Cylinder Type
                            </label>
                            <div className="col-sm-8">
                              <select
                                className="form-control"
                                required
                                id="cylinder_type"
                                name="cylinder_type"
                                ref={register({
                                  required: "Cylinder Type Field Required",
                                })}
                                defaultValue=""
                              >
                                <option value=""> Select One</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                              </select>
                              {errors.cylinder_type && (
                                <p className="text-danger">
                                  {errors.cylinder_type.message}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          <div className="form-group row">
                            <label
                              className="col-sm-4 col-form-label required"
                              htmlFor="total_cylinder_qty"
                            >
                              Cylinder Qty
                            </label>
                            <div className="col-sm-8">
                              <input
                                className="form-control"
                                id="total_cylinder_qty"
                                name="total_cylinder_qty"
                                required
                                type="text"
                                placeholder="Please enter color"
                                value={
                                  multipleDropdownData.length > 0
                                    ? multipleDropdownData.length
                                    : ""
                                }
                                onChange={ calculateFormValue}
                                ref={register({
                                  required: "Cylinder Qty Field Required",
                                })}
                                disabled
                              />
                              {errors.total_cylinder_qty && (
                                <p className="text-danger">
                                  {errors.total_cylinder_qty.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              className="col-sm-4 col-form-label required"
                              htmlFor="printing_status"
                            >
                              Printing Status
                            </label>
                            <div className="col-sm-8">
                              <select
                                className="form-control"
                                required
                                id="printing_status"
                                name="printing_status"
                                ref={register({
                                  required: "Printing Status Field Required",
                                })}
                                defaultValue=""
                              >
                                <option value=""> Select One</option>
                                <option value="Surface">Surface</option>
                                <option value="Reverse">Reverse</option>
                              </select>
                              {errors.printing_status && (
                                <p className="text-danger">
                                  {errors.printing_status.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              className="col-sm-4 col-form-label required"
                              htmlFor="surface_area"
                            >
                              Surface Area (cm²)
                            </label>
                            <div className="col-sm-8">
                              <input
                                className="form-control"
                                id="surface_area"
                                name="surface_area"
                                required
                                type="text"
                                placeholder="Face Length"
                                readOnly={"readonly"}
                                value={
                                  surfaceArea
                                }
                                ref={register({
                                  required: "Face Length Field Required",
                                })}
                              />
                              {errors.surface_area && (
                                <p className="text-danger">
                                  {errors.surface_area.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              className="col-sm-4 col-form-label required"
                              htmlFor="total_surface_area"
                            >
                              Total Surface Area (cm²)
                            </label>
                            <div className="col-sm-8">
                              <input
                                className="form-control"
                                id="total_surface_area"
                                name="total_surface_area"
                                required
                                type="text"
                                placeholder="Total Surface Area"
                                value={
                                  totalSurfaceArea
                                }
                                ref={register({
                                  required: "Total Surface Area Field Required",
                                })}
                              />
                              {errors.total_surface_area && (
                                <p className="text-danger">
                                  {errors.total_surface_area.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="form-group row">
                            <div className="col-md-4">
                              <div className="row">
                                <label
                                  className="col-sm-6 col-form-label required"
                                  htmlFor="fl"
                                >
                                  FL (mm)
                                </label>
                                <div className="col-sm-6">
                                  <input
                                    className="form-control"
                                    id="fl"
                                    name="fl"
                                    required
                                    type="text"
                                    placeholder="FL"
                                    disabled="disabled"
                                    value={flArea}
                                  />
                                  {errors.fl && (
                                    <p className="text-danger">
                                      {errors.fl.message}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="row">
                                <label
                                  className="col-sm-6 col-form-label required"
                                  htmlFor="cir"
                                >
                                  Cir (mm)
                                </label>
                                <div className="col-sm-6">
                                  <input
                                    className="form-control"
                                    id="cir"
                                    name="cir"
                                    required
                                    type="text"
                                    placeholder="Cir"
                                    disabled="disabled"
                                    value={
                                      cirArea
                                    }
                                  />
                                  {errors.cir && (
                                    <p className="text-danger">
                                      {errors.cir.message}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="row">
                                <label
                                  className="col-sm-6 col-form-labelb required"
                                  htmlFor="dia"
                                >
                                  Dia (mm)
                                </label>
                                <div className="col-sm-6">
                                  <input
                                    className="form-control"
                                    id="dia"
                                    name="dia"
                                    required
                                    type="text"
                                    placeholder="Dia"
                                    disabled="disabled"
                                    value={dirArea}
                                    // value={jobOrderData.dia}
                                    // calculationValue.design_height * calculationValue.rpt
                                    // calculationValue.face_length
                                    ref={register({
                                      required: "Dia Field Required",
                                    })}
                                  />
                                  {errors.dia && (
                                    <p className="text-danger">
                                      {errors.dia.message}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <fieldset className="border">
                          <legend className="w-auto text-left">Finished</legend>
                          <div className="form-group row">
                            <label
                              className={`col-sm-2 col-form-label ${jobOrderType !== "New" ? 'required' : ''} `}

                              htmlFor="remarks"
                            >
                              Remarks
                            </label>
                            <div className="col-sm-10">
                              <input
                                className="form-control"
                                id="remarks"
                                name="remarks"
                                required={
                                  jobOrderType == "New" ? false : true
                                }
                                type="text"
                                placeholder="Remarks"
                                // value={jobOrderData.remarks}
                                ref={register({})}
                              />
                              {errors.remarks && (
                                <p className="text-danger">
                                  {errors.remarks.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </fieldset>
                      </div>
                    </div>

                    <SubmitButton link="jobOrder/index" menuId={menuId}/>
                  </form>
                )}
              </div>
            </div>
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
  );
};

export default Add;