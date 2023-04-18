import React, { Fragment, useState, useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SubmitButton } from '../../common/GlobalButton';
import { JOB_ORDER_RSURL } from '../../../api/userUrl';
import { userGetMethod, userPutMethod } from '../../../api/userAction';
import useForm from "react-hook-form";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const Edit = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [dropdownData, setDropdownData] = useState({});
    const [multipleDropdownData, setMultipleDropdownData] = useState([]);
    const [typeheadOptions, setTypeheadOptions] = useState({});
    const [linkjob, setLinkjob] = useState(false)
    const [jobOrderType, setJobOrderType] = useState(null)

    let [jobOrderInput, setJobOrderInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            color_id           : [],
            cir                : "",
            circumference      : "",
            client_id          : [],
            design_height      : "",
            design_width       : "",
            dia                : "",
            extra_face_length  : "",
            face_length        : "",
            fl                 : "",
            job_name           : "",
            job_sub_class_id   : [],
            reference_job      : [],
            job_type           : "",
            marketing_person_id: [],
            design_machine_id  : [],
            printer_id         : [],
            printing_height    : "",
            printing_width     : "",
            remarks            : "",
            rpt                : "",
            surface_area       : "",
            total_surface_area : "",
            ups                : "",
            total_cylinder_qty : "",
            cylinder_type      : "",
            printing_status    : "",
        }
    );

    const jobOrderId = props.match.params.id;

    useEffect(() => {
        userGetMethod(`${JOB_ORDER_RSURL}/${jobOrderId}/edit`)
            .then(response => {
                console.log('color_id', response.data.jobOrder);
                let { cir, circumference, design_height, design_width, dia, extra_face_length, face_length, fl, job_name, job_type, printing_height, printing_width, remarks, rpt, surface_area, total_surface_area, ups, total_cylinder_qty, cylinder_type, printing_status, eye_mark_color, eye_mark_size_one, eye_mark_size_two} = response.data.jobOrder;
                
                // FOR MARKETING PERSON
                let marketingEmpOptions = [];
                if (response.data.marketingPersons && response.data.marketingPersons.length > 0) {
                    response.data.marketingPersons.map(person => 
                    {
                        let personObj = {};
                        personObj.id = person.id;
                        personObj.name = `[${person.employee_id}] ` + person.name;
                        marketingEmpOptions.push(personObj);
                        if (response.data.jobOrder.marketing_person_id === person.id) {
                            setJobOrderInput({
                                'marketing_person_id': [personObj]
                            })
                        }
                    })
                }

                // FOR PRINTERS
                let printerOptions = [];
                if (response.data.printers && response.data.printers.length > 0) {
                    response.data.printers.map(printer => 
                    {
                        let printerObj = {};
                        printerObj.id = printer.id;
                        printerObj.name = `[${printer.printer_code}] ${printer.printer_name}`;
                        printerOptions.push(printerObj);
                        if (response.data.jobOrder.printer_id === printer.id) {
                            setJobOrderInput({
                                'printer_id': [printerObj]
                            })
                        }
                    })
                }

                // FOR CLIENTS
                let clientOptions = [];
                if (response.data.clients && response.data.clients.length > 0) {
                    response.data.clients.map(client => 
                    {
                        let clientObj = {};
                        clientObj.id = client.id;
                        clientObj.name = `[${client.client_id}] ${client.name}`;
                        clientOptions.push(clientObj);
                        if (response.data.jobOrder.client_id === client.id) {
                            setJobOrderInput({
                                'client_id': [clientObj]
                            })
                        }
                    })
                }

                // FOR JOB SUB CLASS
                let subClassOptions = [];
                if (response.data.jobSubClasses && response.data.jobSubClasses.length > 0) {
                    response.data.jobSubClasses.map(subClass => 
                    {
                        let subClassObj = {};
                        subClassObj.id = subClass.id;
                        subClassObj.name = subClass.sub_class;
                        subClassOptions.push(subClassObj);
                        if (response.data.jobOrder.job_sub_class_id === subClass.id) {
                            setJobOrderInput({
                                'job_sub_class_id': [subClassObj]
                            })
                        }
                    })
                }

                // FOR DESIGN MACHINE
                let designMachineOptions = [];
                if (response.data.designMachines && response.data.designMachines.length > 0) {
                    response.data.designMachines.map(designMachine => 
                    {
                        let designMachineObj = {};
                        designMachineObj.id = designMachine.id;
                        designMachineObj.name = designMachine.machine_name;
                        designMachineOptions.push(designMachineObj);
                        if (response.data.jobOrder.design_machine_id === designMachine.id) {
                            setJobOrderInput({
                                'design_machine_id': [designMachineObj]
                            })
                        }
                    })
                }
                
                // FOR JOB SUB CLASS
                let additionalColorOptions = [];
                if (response.data.colors && response.data.colors.length > 0) {
                    response.data.colors.map(color => 
                    {
                        let colorObj = {};
                        colorObj.id = color.id;
                        colorObj.name = color.color_name;
                        additionalColorOptions.push(colorObj);
                        let color_id_arr = JSON.parse(response.data.jobOrder.color_id);

                        if (color_id_arr && color_id_arr.length > 0) {
                            color_id_arr.map(item => {
                                if (item === color.id) {
                                    jobOrderInput.color_id.push(colorObj);
                                }
                            })
                        }
                    })
                }
                //For reference job
                let referenceJobsOptions = [];
                if (response.data.referenceJobs && response.data.referenceJobs.length > 0) {
                    response.data.referenceJobs.map(referenceJob => 
                    {
                        let referenceJobObj = {};
                        referenceJobObj.id = referenceJob.id;
                        referenceJobObj.name = referenceJob.job_name;
                        referenceJobsOptions.push(referenceJobObj);
                        if (response.data.jobOrder.reference_job == referenceJob.id) {
                            setJobOrderInput({
                                'reference_job': [referenceJobObj]
                            })
                        }
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
                        ['design_machines']: designMachineOptions,
                    })
                );

                setJobOrderInput({
                    cir, circumference, design_height, design_width, dia, extra_face_length, face_length, fl, job_name, job_type, printing_height, printing_width, remarks, rpt, surface_area, total_surface_area, ups, total_cylinder_qty, cylinder_type, printing_status, eye_mark_color, eye_mark_size_one, eye_mark_size_two
                });

                setIsLoading(false);
            });
    },[]);
    console.log(jobOrderInput);
    const dropDownChange = (event, stateName) => {
        if(event.length > 0){
            setJobOrderInput({
                [stateName]: event
            })
        } 
    }
    
    const multipleDropDownChange = (event) => {
        // if(event.length > 0){
            setJobOrderInput({
                'color_id': event
            })
        // } 
    }
    
    const onChangeHandler = (event) => {
        setJobOrderInput({
            [event.target.name]: event.target.value
        })
    }
  
    const submitHandler = (e) => {
        jobOrderInput.client_id = jobOrderInput.client_id[0].id;
        jobOrderInput.job_sub_class_id = jobOrderInput.job_sub_class_id[0].id;
        jobOrderInput.marketing_person_id = jobOrderInput.marketing_person_id[0].id;
        jobOrderInput.printer_id = jobOrderInput.printer_id[0].id;
        jobOrderInput.design_machine_id = jobOrderInput.design_machine_id[0].id;
        jobOrderInput.reference_job = jobOrderInput.reference_job[0].id;

        let color_id_final_arr = [];
        jobOrderInput.color_id.map(item => {
            color_id_final_arr.push(item.id);
        })
        jobOrderInput.color_id = color_id_final_arr;
        
        userPutMethod(`${JOB_ORDER_RSURL}/${jobOrderId}`, jobOrderInput)
            .then(response => {
                console.log("response data", response);
                if (response.data.status == 1) {
                    toast.success(response.data.message)
                    // e.target.reset();
                } else {
                    toast.error(response.data.message)
                }
            })
        .catch(error => toast.error(error))
    }

    var menuId = 0;
    if (props.location.state === undefined) {
        var menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }
    
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Job Order Update</h5>
                            </div>
                            <div className="card-body">
                            {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                    <div className="row">
                                        <div className="col-md-6">

                                            <fieldset className="border" >
                                                <legend className="w-auto text-left">Basic</legend>

                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label required" htmlFor="job_type">Job Order Type</label>
                                                    <div className="col-sm-8">
                                                        <select className="form-control" required id="job_type" name="job_type"
                                                            onChange={onChangeHandler}
                                                            ref={register({
                                                                required: 'Job Order Type Field Required'
                                                            })} >
                                                            <option> Select One </option>
                                                            <option selected={jobOrderInput.job_type == 'New' ? true : false} value="New">New</option>
                                                            <option selected={jobOrderInput.job_type == 'Remake' ? true : false} value="Remake">Remake</option>
                                                            <option selected={jobOrderInput.job_type == 'Redo' ? true : false} value="Redo">Redo</option>
                                                            <option selected={jobOrderInput.job_type == 'DC/RC' ? true : false} value="DC/RC">DC/RC</option>
                                                        </select>
                                                        {errors.job_type && <p className='text-danger'>{errors.job_type.message}</p>}
                                                    </div>
                                                </div>
                                                
                                                <div className="row">
                                                     <div className="col-md-6">
                                                     <div className='form-group row'>
                                                <label className="col-sm-8 col-form-label required" htmlFor="link_job">Link Job</label>
                                                    <div className="col-sm-4 mt-2">
                                                        <input 
                                                            name="link_job"
                                                            // onChange={(e) => setLinkjob(e.target.checked)}
                                                            required={jobOrderInput.job_type == 'New' ? false : true}
                                                            type="checkbox" 
                                                            checked={jobOrderInput.reference_job.length != 0 ? true : false}
                                                            ref={register({
                                                                required: 'Lik job  Field Required'
                                                            })}
                                                        />
                                                        {errors.job_name && <p className='text-danger'>{errors.job_name.message}</p>}
                                                    </div>
                                                </div>
                                                     </div>
                                                     <div className='col-md-6'>
                                                     {jobOrderInput.job_type != 'New' &&  <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label required" htmlFor="reference_job">Ref Job</label>
                                                    <div className="col-sm-8">
                                                    <Typeahead
                                                            id="reference_job"
                                                            name="reference_job"
                                                            labelKey={option => `${option.name}`}
                                                            options={typeheadOptions['reference_jobs']}
                                                            placeholder="Select Reff jobs..."
                                                            onChange={(e) => dropDownChange(e, 'reference_job')}
                                                            selected={jobOrderInput.reference_job}
                                                            ref={register({
                                                                required: 'Sub Class Field Required'
                                                            })}
                                                        />
                                                        
                                                        {errors.reference_job && <p className='text-danger'>{errors.reference_job.message}</p>}
                                                    </div>
                                                </div> }
                                                     </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label required" htmlFor="job_name">Job Name</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control" 
                                                            id="job_name" 
                                                            name="job_name" 
                                                            type="text" 
                                                            placeholder="Job Name" 
                                                            value={jobOrderInput.job_name}
                                                            onChange={onChangeHandler}
                                                            ref={register({
                                                                required: 'Job Name Field Required'
                                                            })}
                                                        />
                                                        {errors.job_name && <p className='text-danger'>{errors.job_name.message}</p>}
                                                    </div>
                                                </div>
 
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label required" htmlFor="job_sub_class_id">Sub Class</label>
                                                    <div className="col-sm-8">
                                                        <Typeahead
                                                            id="job_sub_class_id"
                                                            name="job_sub_class_id"
                                                            labelKey={option => `${option.name}`}
                                                            options={typeheadOptions['job_sub_classes']}
                                                            placeholder="Select Sub Class..."
                                                            onChange={(e) => dropDownChange(e, 'job_sub_class_id')}
                                                            selected={jobOrderInput.job_sub_class_id}
                                                            ref={register({
                                                                required: 'Sub Class Field Required'
                                                            })}
                                                        />
                                                        {errors.job_sub_class_id && <p className='text-danger'>{errors.job_sub_class_id.message}</p>}
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label required" htmlFor="client_id">Client Name</label>
                                                    <div className="col-sm-8">
                                                        <Typeahead
                                                            id="client_id"
                                                            name="client_id"
                                                            labelKey={option => `${option.name}`}
                                                            options={typeheadOptions['clients']}
                                                            placeholder="Select Client..."
                                                            onChange={(e) => dropDownChange(e, 'client_id')}
                                                            selected={jobOrderInput.client_id}
                                                            ref={register({
                                                                required: 'Client Name Field Required'
                                                            })}
                                                        />
                                                        {errors.client_id && <p className='text-danger'>{errors.client_id.message}</p>}
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label required" htmlFor="printer_id">Printer Name</label>
                                                    <div className="col-sm-8">
                                                        <Typeahead
                                                            id="printer_id"
                                                            name="printer_id"
                                                            labelKey={option => `${option.name}`}
                                                            options={typeheadOptions['printers']}
                                                            placeholder="Select Printer..."
                                                            onChange={(e) => dropDownChange(e, 'printer_id')}
                                                            selected={jobOrderInput.printer_id}
                                                            ref={register({
                                                                required: 'Printer Name Field Required'
                                                            })}
                                                        />
                                                        {errors.printer_id && <p className='text-danger'>{errors.printer_id.message}</p>}
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label required" htmlFor="marketing_person_id">Marketing Person</label>
                                                    <div className="col-sm-8">
                                                        <Typeahead
                                                            id="marketing_person_id"
                                                            name="marketing_person_id"
                                                            labelKey={option => `${option.name}`}
                                                            options={typeheadOptions['marketing_persons']}
                                                            placeholder="Select Person..."
                                                            onChange={(e) => dropDownChange(e, 'marketing_person_id')}
                                                            selected={jobOrderInput.marketing_person_id}
                                                            ref={register({
                                                                required: 'Marketing Person Field Required'
                                                            })}
                                                        />
                                                        {errors.marketing_person_id && <p className='text-danger'>{errors.marketing_person_id.message}</p>}
                                                    </div>
                                                </div>
                                                
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label required" htmlFor="design_machine_id">Design Machine</label>
                                                    <div className="col-sm-8">
                                                        <Typeahead
                                                            id="design_machine_id"
                                                            name="design_machine_id"
                                                            labelKey={option => `${option.name}`}
                                                            options={typeheadOptions['design_machines']}
                                                            placeholder="Select Person..."
                                                            onChange={(e) => dropDownChange(e, 'design_machine_id')}
                                                            selected={jobOrderInput.design_machine_id}
                                                            ref={register({
                                                                required: 'Marketing Person Field Required'
                                                            })}
                                                        />
                                                        {errors.design_machine_id && <p className='text-danger'>{errors.design_machine_id.message}</p>}
                                                    </div>
                                                </div>
                                            </fieldset>
                                                            
                                            <fieldset className="border" >
                                                <legend className="w-auto text-left">Color</legend>
                                                
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label required" htmlFor="color_id">Color</label>
                                                    <div className="col-sm-8">
                                                        <Typeahead
                                                            id="color_id"
                                                            name="color_id"
                                                            labelKey={option => `${option.name}`}
                                                            multiple
                                                            required
                                                            options={typeheadOptions['additional_colors']}
                                                            placeholder="Select Color..."
                                                            onChange={(e) => multipleDropDownChange(e)}
                                                            selected={jobOrderInput.color_id}
                                                            ref={register({
                                                                required: 'Color Field Required'
                                                            })}
                                                        />
                                                        {errors.color_id && <p className='text-danger'>{errors.color_id.message}</p>}
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label required" htmlFor="eye_mark_color">Eye Mark Color</label>
                                                    <div className="col-sm-8">
                                                        <select className="form-control" required id="eye_mark_color" name="eye_mark_color"
                                                            ref={register({
                                                                required: 'Eye Mark Color Type Field Required'
                                                            })}>
                                                            <option>Select One</option>
                                                            <option selected={jobOrderInput.eye_mark_color == 'White' ? true : false} value="White">White</option>
                                                            <option selected={jobOrderInput.eye_mark_color == 'Black' ? true : false} value="Black">Black</option>
                                                            <option selected={jobOrderInput.eye_mark_color == 'Red' ? true : false} value="Red">Red</option>
                                                        </select>
                                                        {errors.eye_mark_color && <p className='text-danger'>{errors.eye_mark_color.message}</p>}
                                                    </div> 
                                                </div> 

                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label required" htmlFor="eye_mark_size">Eye Mark Size</label>
                                                    <div className="col-sm-8 row" style={{marginLeft: '1px'}}>
                                                        <div className="col-sm-5">
                                                            <input 
                                                                className="form-control" 
                                                                id="eye_mark_size_one" 
                                                                name="eye_mark_size_one" 
                                                                type="text" 
                                                                placeholder="Eye Mark Size" 
                                                                value={jobOrderInput.eye_mark_size_one}
                                                                onChange={onChangeHandler}
                                                                required
                                                                ref={register({
                                                                    required: 'Eye Mark Size Field Required'
                                                                })}
                                                            />
                                                            {errors.eye_mark_size_one && <p className='text-danger'>{errors.eye_mark_size_one.message}</p>}
                                                        </div>
                                                        <span className="m-r-10">X</span>
                                                        <div className="col-sm-6">
                                                            <input 
                                                                className="form-control" 
                                                                id="eye_mark_size_two" 
                                                                name="eye_mark_size_two" 
                                                                type="text" 
                                                                placeholder="Eye Mark Size" 
                                                                value={jobOrderInput.eye_mark_size_two}
                                                                onChange={onChangeHandler}
                                                                ref={register({
                                                                    required: 'Eye Mark Size Field Required'
                                                                })}
                                                            />
                                                            {errors.eye_mark_size_two && <p className='text-danger'>{errors.eye_mark_size_two.message}</p>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>

                                        <div className="col-md-6">

                                            <fieldset className="border" >
                                                <legend className="w-auto text-left">Cylinder Info</legend>
                                                <div className="row">

                                                    <div className="col-sm-6">
                                                        <div className="form-group row">
                                                            <label className="col-sm-8 col-form-label required" htmlFor="design_width">Job Width</label>
                                                            <div className="col-sm-4">
                                                                <input 
                                                                    className="form-control" 
                                                                    id="design_width" 
                                                                    name="design_width" 
                                                                    type="text" 
                                                                    placeholder="Job Width" 
                                                                    value={jobOrderInput.design_width}
                                                                    onChange={onChangeHandler}
                                                                    ref={register({
                                                                        required: 'Job Width Field Required'
                                                                    })}
                                                                />
                                                                {errors.design_width && <p className='text-danger'>{errors.design_width.message}</p>}
                                                            </div>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label className="col-sm-8 col-form-label required" htmlFor="ups">UPS</label>
                                                            <div className="col-sm-4">
                                                                <input 
                                                                    className="form-control" 
                                                                    id="ups" 
                                                                    name="ups" 
                                                                    type="text" 
                                                                    placeholder="UPS" 
                                                                    value={jobOrderInput.ups}
                                                                    onChange={onChangeHandler}
                                                                    ref={register({
                                                                        required: 'UPS Field Required'
                                                                    })}
                                                                />
                                                                {errors.ups && <p className='text-danger'>{errors.ups.message}</p>}
                                                            </div>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label className="col-sm-8 col-form-label required" htmlFor="printing_width">Printing Width</label>
                                                            <div className="col-sm-4">
                                                                <input 
                                                                    className="form-control" 
                                                                    id="printing_width" 
                                                                    name="printing_width" 
                                                                    type="text" 
                                                                    placeholder="Printing Width" 
                                                                    value={jobOrderInput.design_width * jobOrderInput.ups}
                                                                    readOnly={'readonly'}
                                                                    ref={register({
                                                                        required: 'Printing Width Field Required'
                                                                    })}
                                                                />
                                                                {errors.printing_width && <p className='text-danger'>{errors.printing_width.message}</p>}
                                                            </div>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label className="col-sm-8 col-form-label required" htmlFor="face_length">Face Length</label>
                                                            <div className="col-sm-4">
                                                                <input 
                                                                    className="form-control" 
                                                                    id="face_length" 
                                                                    name="face_length" 
                                                                    type="text" 
                                                                    placeholder="Face Length" 
                                                                    onChange={onChangeHandler}
                                                                    value={jobOrderInput.face_length}
                                                                    ref={register({
                                                                        required: 'Face Length Field Required'
                                                                    })}
                                                                />
                                                                {errors.face_length && <p className='text-danger'>{errors.face_length.message}</p>}
                                                            </div>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label className="col-sm-8 col-form-label required" htmlFor="extra_face_length">Extra Face Length</label>
                                                            <div className="col-sm-4">
                                                                <input 
                                                                    className="form-control" 
                                                                    id="extra_face_length" 
                                                                    name="extra_face_length" 
                                                                    type="text" 
                                                                    placeholder="Extra Width" 
                                                                    readOnly={'readonly'}
                                                                    value={jobOrderInput.face_length - (jobOrderInput.design_width * jobOrderInput.ups)}
                                                                    ref={register({
                                                                        required: 'Extra Width Field Required'
                                                                    })}
                                                                />
                                                                {errors.extra_face_length && <p className='text-danger'>{errors.extra_face_length.message}</p>}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-6">

                                                        <div className="form-group row">
                                                            <label className="col-sm-8 col-form-label required" htmlFor="design_height">Job Height</label>
                                                            <div className="col-sm-4">
                                                                <input 
                                                                    className="form-control" 
                                                                    id="design_height" 
                                                                    name="design_height" 
                                                                    type="text" 
                                                                    placeholder="Job Height" 
                                                                    onChange={onChangeHandler}
                                                                    value={jobOrderInput.design_height}
                                                                    ref={register({
                                                                        required: 'Job Height Field Required'
                                                                    })}
                                                                />
                                                                {errors.design_height && <p className='text-danger'>{errors.design_height.message}</p>}
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="form-group row">
                                                            <label className="col-sm-8 col-form-label required" htmlFor="rpt">RPT</label>
                                                            <div className="col-sm-4">
                                                                <input 
                                                                    className="form-control" 
                                                                    id="rpt" 
                                                                    name="rpt" 
                                                                    type="text" 
                                                                    placeholder="RPT" 
                                                                    onChange={onChangeHandler}
                                                                    value={jobOrderInput.rpt}
                                                                    ref={register({
                                                                        required: 'RPT Field Required'
                                                                    })}
                                                                />
                                                                {errors.rpt && <p className='text-danger'>{errors.rpt.message}</p>}
                                                            </div>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label className="col-sm-8 col-form-label required" htmlFor="circumference">Circumference</label>
                                                            <div className="col-sm-4">
                                                                <input 
                                                                    className="form-control" 
                                                                    id="circumference" 
                                                                    name="circumference" 
                                                                    type="text" 
                                                                    placeholder="Circumference" 
                                                                    value={jobOrderInput.design_height * jobOrderInput.rpt}
                                                                    readOnly={'readonly'}
                                                                    ref={register({
                                                                        required: 'Circumference Field Required'
                                                                    })}
                                                                />
                                                                {errors.circumference && <p className='text-danger'>{errors.circumference.message}</p>}
                                                            </div>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label className="col-sm-8 col-form-label required" htmlFor="printing_height">Printing Height</label>
                                                            <div className="col-sm-4">
                                                                <input 
                                                                    className="form-control" 
                                                                    id="printing_height" 
                                                                    name="printing_height" 
                                                                    type="text" 
                                                                    placeholder="Printing Height" 
                                                                    readOnly={'readonly'}
                                                                    value={jobOrderInput.design_height * jobOrderInput.rpt}
                                                                    ref={register({
                                                                        required: 'Printing Height Field Required'
                                                                    })}
                                                                />
                                                                {errors.printing_height && <p className='text-danger'>{errors.printing_height.message}</p>}
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>
                                            </fieldset>

                                            <fieldset className="border">
                                                <legend className="w-auto text-left">Surface Area</legend>
                                                
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label required" htmlFor="cylinder_type">Cylinder Type</label>
                                                    <div className="col-sm-8">
                                                        <select className="form-control" required id="cylinder_type" name="cylinder_type"
                                                            ref={register({
                                                                required: 'Cylinder Type Field Required'
                                                            })} >
                                                            <option> Select One</option>
                                                            <option value="A" selected={jobOrderInput.cylinder_type == "A" ? true : false}>A</option>
                                                            <option value="B" selected={jobOrderInput.cylinder_type == "B" ? true : false}>B</option>
                                                            <option value="C" selected={jobOrderInput.cylinder_type == "C" ? true : false}>C</option>
                                                        </select>
                                                        {errors.cylinder_type && <p className='text-danger'>{errors.cylinder_type.message}</p>}
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label required" htmlFor="total_cylinder_qty">Cylinder Qty</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control" 
                                                            id="total_cylinder_qty" 
                                                            name="total_cylinder_qty" 
                                                            type="text" 
                                                            placeholder="Cylinder Qty" 
                                                            value={jobOrderInput.color_id.length}
                                                            onChange={onChangeHandler}
                                                            disabled = {jobOrderInput.color_id.length > 0 ? true : false}
                                                            ref={register({
                                                                required: 'Cylinder Qty Field Required'
                                                            })}
                                                        />
                                                        {errors.total_cylinder_qty && <p className='text-danger'>{errors.total_cylinder_qty.message}</p>}
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label required" htmlFor="printing_status">Printing Status</label>
                                                    <div className="col-sm-8">
                                                        <select className="form-control" required id="printing_status" name="printing_status"
                                                            ref={register({
                                                                required: 'Printing Status Field Required'
                                                            })} >
                                                            <option> Select One</option>
                                                            <option value="Surface" selected={jobOrderInput.printing_status == "Surface" ? true : false}>Surface</option>
                                                            <option value="Reverse" selected={jobOrderInput.printing_status == "Reverse" ? true : false}>Reverse</option>
                                                        </select>
                                                        {errors.printing_status && <p className='text-danger'>{errors.printing_status.message}</p>}
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label required" htmlFor="surface_area">Surface Area</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control" 
                                                            id="surface_area" 
                                                            name="surface_area" 
                                                            type="text" 
                                                            placeholder="Face Length" 
                                                            readOnly={'readonly'}
                                                            value={(jobOrderInput.face_length * (jobOrderInput.design_height * jobOrderInput.rpt))/100}
                                                            ref={register({
                                                                required: 'Face Length Field Required'
                                                            })}
                                                        />
                                                        {errors.surface_area && <p className='text-danger'>{errors.surface_area.message}</p>}
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label required" htmlFor="total_surface_area">Total Surface Area</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control" 
                                                            id="total_surface_area" 
                                                            name="total_surface_area" 
                                                            type="text" 
                                                            placeholder="Total Surface Area" 
                                                            value={(jobOrderInput.color_id.length  * (jobOrderInput.face_length * (jobOrderInput.design_height * jobOrderInput.rpt)))/100}
                                                            ref={register({
                                                                required: 'Total Surface Area Field Required'
                                                            })}
                                                        />
                                                        {errors.total_surface_area && <p className='text-danger'>{errors.total_surface_area.message}</p>}
                                                    </div>
                                                </div>

                                                <div className="form-row">
                                                    <div className="col-md-4">
                                                        <div className="row">
                                                            <label className="col-sm-5 col-form-label" htmlFor="fl">FL</label>
                                                            <div className="col-sm-7">
                                                                <input 
                                                                    className="form-control" 
                                                                    id="fl" 
                                                                    name="fl" 
                                                                    type="text" 
                                                                    placeholder="FL" 
                                                                    value={jobOrderInput.face_length}
                                                                    disabled="disabled"
                                                                    onChange={onChangeHandler}
                                                                />
                                                                {errors.fl && <p className='text-danger'>{errors.fl.message}</p>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="row">
                                                            <label className="col-sm-5 col-form-label" htmlFor="cir">Cir</label>
                                                            <div className="col-sm-7">
                                                                <input 
                                                                    className="form-control" 
                                                                    id="cir" 
                                                                    name="cir" 
                                                                    type="text" 
                                                                    placeholder="Cir" 
                                                                    value={jobOrderInput.circumference}
                                                                    disabled="disabled"
                                                                    onChange={onChangeHandler}
                                                                />
                                                                {errors.cir && <p className='text-danger'>{errors.cir.message}</p>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="row">
                                                            <label className="col-sm-5 col-form-label" htmlFor="dia">Dia</label>
                                                            <div className="col-sm-7">
                                                                <input 
                                                                    className="form-control" 
                                                                    id="dia" 
                                                                    name="dia" 
                                                                    type="text" 
                                                                    placeholder="Dia" 
                                                                    value={jobOrderInput.dia}
                                                                    onChange={onChangeHandler}
                                                                    ref={register({
                                                                        required: 'Dia Field Required'
                                                                    })}
                                                                />
                                                                {errors.dia && <p className='text-danger'>{errors.dia.message}</p>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <fieldset className="border" >
                                                <legend className="w-auto text-left">Finished</legend>
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label required" htmlFor="remarks">Remarks</label>
                                                        <div className="col-sm-10">
                                                            <input 
                                                                className="form-control" 
                                                                id="remarks" 
                                                                name="remarks" 
                                                                type="text" 
                                                                placeholder="Remarks" 
                                                                value={jobOrderInput.remarks}
                                                                onChange={onChangeHandler}
                                                                ref={register({
                                                                    required: 'Remarks Field Required'
                                                                })}
                                                            />
                                                            {errors.remarks && <p className='text-danger'>{errors.remarks.message}</p>}
                                                        </div>
                                                    </div>
                                            </fieldset>
                                        </div>
                                    </div>

                                    <SubmitButton link="jobOrder/index" menuId={ menuId } />
                                </form>
                                )}
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        
        </Fragment>
    );
};

export default Edit;