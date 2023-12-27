import React, { Fragment, useEffect, useState, useReducer } from 'react';
import { POLISHING_RS_URL, POLISHING_GET_POLISHING_DATA_BY_JOB_ID } from '../../../../api/userUrl';
import { userGetMethod, userPutMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';
import { Typeahead } from 'react-bootstrap-typeahead';
import moment from 'moment';

const Edit = (props) => {
    const { handleSubmit, register, errors, reset } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [typeHeadOptions, setTypeHeadOptions] = useState({});
    const [dropDownData, setDropdownData] = useState();

    let [stateData, setStateData] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            // send_date         : new Date().toLocaleDateString(),
            // job_name           : '',
            // job_no             : '',
            // client_name        : '',
            // marketing_p_name   : '',
            // job_type           : '',
            // total_cylinder_qty : '',
            // base_source        : '',
            // printer_name       : '',
            // desired_fl         : '',
            // desired_cir        : '',
            // desired_dia        : '',
            // surface_area       : '',
            // fl                 : '', 
            // dia                : '', 
            job_order_id                  : '',
            cylinder_id                   : '',
            rough_cut_polishing_machine_id: '',
            shift_id                      : '',
            fine_cut_polishing_machine_id : '',
            est_duration                  : '',
            on_time                       : '',
            est_end_time                  : '',
            polishing_date                : '',
            rework                        : '',
            rework_reason                 : '',
            production_date               : '',
            done_by                       : '',
            chrome_cylinder_status        : '',
            a_duration                    : '',
            dia_after_rough_cut           : '',
            output_status                 : '',
            dia_after_fine_cut            : '',
            action_if_output_is_not_ok    : '',
            a_off_time                    : '',
            remarks                       : '',
            
            job_order_pk_id                  : '', 
            jobOrderDetailsData           : [], //STORE DATA FROM job_orders
            shiftData                     : [], //STORE DATA FROM dig_shift_master
            shiftDutyPersons              : [], //STORE DATA FROM dig_shift_details
            reworkReasons                 : [], //STORE DATA FROM rework_reasons
            cylindersByJobId              : [], //STORE DATA FROM factory_cylinder_supply_chains
            completePolishingData         : [], //STORE DATA FROM dig_polishings
            platingData                   : [],
            available_cylinders           : [],
            polishMachines                : [],
        }
    );
    let companyProfile_id = props.match.params.companyProfile_id ? props.match.params.companyProfile_id : null;
    let statusCode = props.location.state;
    console.log(statusCode)
    console.log(companyProfile_id)
    
    useEffect(()=>{
        // userGetMethod(`${POLISHING_RS_URL}/${digPolishingCylinderId}/edit`)
        //     .then(response => {
        //         // FOR JOB ORDER
        //         dropDownChange([{id : response.data.jobOrder.job_id}], 'job_order_pk_id');
        //         let {polishing, polishMachines, digShift, shiftDutyPersons, reworkReasons} = response.data;
                
        //         setStateData({
        //             'job_no'                        : response.data.jobOrder.job_no,

        //             'job_order_pk_id'               : polishing.job_order_pk_id,
        //             'cylinder_id'                   : polishing.cylinder_id,
        //             'rough_cut_polishing_machine_id': polishing.rough_cut_polishing_machine_id,
        //             'shift_id'                      : polishing.shift_id,
        //             'fine_cut_polishing_machine_id' : polishing.fine_cut_polishing_machine_id,
        //             'est_duration'                  : polishing.est_duration,
        //             'on_time'                       : polishing.on_time,
        //             'est_end_time'                  : polishing.est_end_time,
        //             'polishing_date'                : polishing.polishing_date,
        //             'rework'                        : polishing.rework,
        //             'rework_reason'                 : polishing.rework_reason,
        //             'production_date'               : polishing.production_date,
        //             'done_by'                       : polishing.done_by,
        //             'chrome_cylinder_status'        : polishing.chrome_cylinder_status,
        //             'a_duration'                    : polishing.a_duration,
        //             'dia_after_rough_cut'           : polishing.dia_after_rough_cut,
        //             'output_status'                 : polishing.output_status,
        //             'dia_after_fine_cut'            : polishing.dia_after_fine_cut,
        //             'action_if_output_is_not_ok'    : polishing.action_if_output_is_not_ok,
        //             'a_off_time'                    : polishing.a_off_time,
        //             'remarks'                       : polishing.remarks,
                    
        //             'polishMachines'                : polishMachines,
        //             'shiftData'                     : digShift, //GET DATA FROM dig_shift_master table
        //             'shiftDutyPersons'              : shiftDutyPersons, //GET DATA FROM dig_shift_details table
        //             'reworkReasons'                 : reworkReasons, //GET DATA FROM rework_reasons table
        //         });

        //         setIsLoading(false);
        //     });
    }, []);


    const handleChangeValue = (event, stateName) =>{
        
    }

 
    
    const submitHandler = (data,e) => {
        // userPutMethod(`${POLISHING_RS_URL}/${digPolishingCylinderId}`, data)
        //     .then(response => {
        //         if (response.data.status == 1) {
        //             toast.success(response.data.message)
        //             e.target.reset();
        //             clearForm();
        //         } else {
        //             toast.error(response.data.message)
        //         }
        //     })
        // .catch(error => toast.error(error))
    }

    const clearForm = () => {
        // setStateData({
        //     cylinder_id                   : '',
        //     rough_cut_polishing_machine_id: '',
        //     shift_id                      : '',
        //     fine_cut_polishing_machine_id : '',
        //     est_duration                  : '',
        //     on_time                       : '',
        //     est_end_time                  : '',
        //     polishing_date                : '',
        //     rework                        : '',
        //     rework_reason                 : '',
        //     production_date               : '',
        //     done_by                       : '',
        //     chrome_cylinder_status        : '',
        //     a_duration                    : '',
        //     dia_after_rough_cut           : '',
        //     output_status                 : '',
        //     dia_after_fine_cut            : '',
        //     action_if_output_is_not_ok    : '',
        //     a_off_time                    : '',
        //     remarks                       : '',
            
        //     job_order_id                  : '', 
        //     jobOrderDetailsData           : [], //STORE DATA FROM job_orders
        //     shiftData                     : [], //STORE DATA FROM dig_shift_master
        //     shiftDutyPersons              : [], //STORE DATA FROM dig_shift_details
        //     reworkReasons                 : [], //STORE DATA FROM rework_reasons
        //     cylindersByJobId              : [], //STORE DATA FROM factory_cylinder_supply_chains
        //     // completePolishingData         : [], //STORE DATA FROM dig_polishings
        //     remainingPolishingData        : [],
        //     allPolishingData              : [],
        //     available_cylinders           : [],
        //     polishMachines                : [],
        // })
    }

    var menuId = 0;
    if (props.location.state === undefined) {
        menuId = 0;
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
                                <h5>Company Profile Configuration</h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                    <div className="row">
                                    <div className="col-md-6">
                                    <div className="form-group row mb-3">
                                    <label className="col-sm-6 col-form-label" htmlFor="year">Target Year</label>
                                        <div className="col-sm-6">
                                            <select className="form-control" name="year" ref={register({})}>
                                                <option value="">Select One</option>
                                                {/* <option value="2015">2015</option>
                                                <option value="2016">2016</option>
                                                <option value="2017">2017</option>
                                                <option value="2018">2018</option>
                                                <option value="2019">2019</option>
                                                <option value="2020">2020</option>
                                                <option value="2021">2021</option> */}
                                                <option value="2022">2022</option>
                                                <option value="2023">2023</option>
                                                <option value="2024">2024</option>
                                                <option value="2025">2025</option>
                                                <option value="2026">2026</option>
                                                <option value="2027">2027</option>
                                                <option value="2028">2028</option>
                                                <option value="2029">2029</option>
                                                <option value="2030">2030</option>
                                            </select>
                                            {errors.year && <p className='text-danger'>{errors.year.message}</p>}
                                        </div>
                                    </div> </div> 
                                    </div>


                                    
                                    
                                    <div className='mt-3'>
                                    <div className='row d-flex justify-conter-center'>
                                            {/* Right Side */}
                                    <div className='col-md-6 '>

                                    <div className="form-group row">
                                        <label className="col-sm-6 col-form-label" htmlFor="january">January</label>
                                        <div className="col-sm-6">
                                            <input 
                                                className="form-control"
                                                id="january" 
                                                // name="january" 
                                                type="number" 
                                                placeholder="Cylinder Quantity.."
                                                onChange={(e)=>handleChangeValue(e,'1')}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Name Field Required'
                                                })}
                                            />
                                            {errors.january && <p className='text-danger'>{errors.january.message}</p>}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-6 col-form-label" htmlFor="february">February</label>
                                        <div className="col-sm-6">
                                            <input 
                                                className="form-control"
                                                id="february" 
                                                // name="february" 
                                                type="number" 
                                                placeholder="Cylinder Quantity.."
                                                onChange={(e)=>handleChangeValue(e,'2')}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Name Field Required'
                                                })}
                                            />
                                            {errors.february && <p className='text-danger'>{errors.february.message}</p>}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-6 col-form-label" htmlFor="march">March</label>
                                        <div className="col-sm-6">
                                            <input 
                                                className="form-control"
                                                id="march" 
                                                // name="march" 
                                                type="number" 
                                                placeholder="Cylinder Quantity.."
                                                onChange={(e)=>handleChangeValue(e,'3')}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Name Field Required'
                                                })}
                                            />
                                            {errors.march && <p className='text-danger'>{errors.march.message}</p>}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-6 col-form-label" htmlFor="april">April</label>
                                        <div className="col-sm-6">
                                            <input 
                                                className="form-control"
                                                id="april" 
                                                // name="april" 
                                                type="number" 
                                                placeholder="Cylinder Quantity.."
                                                onChange={(e)=>handleChangeValue(e,'4')}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Name Field Required'
                                                })}
                                            />
                                            {errors.april && <p className='text-danger'>{errors.april.message}</p>}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-6 col-form-label" htmlFor="may">May</label>
                                        <div className="col-sm-6">
                                            <input 
                                                className="form-control"
                                                id="may" 
                                                // name="may" 
                                                type="number" 
                                                placeholder="Cylinder Quantity.."
                                                onChange={(e)=>handleChangeValue(e,'5')}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Name Field Required'
                                                })}
                                            />
                                            {errors.may && <p className='text-danger'>{errors.may.message}</p>}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-6 col-form-label" htmlFor="june">June</label>
                                        <div className="col-sm-6">
                                            <input 
                                                className="form-control"
                                                id="june" 
                                                // name="june" 
                                                type="number" 
                                                placeholder="Cylinder Quantity.."
                                                onChange={(e)=>handleChangeValue(e,'6')}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Name Field Required'
                                                })}
                                            />
                                            {errors.june && <p className='text-danger'>{errors.june.message}</p>}
                                        </div>
                                    </div>

                                    </div>

                                        {/* Left Side */}
                                    <div className='col-md-6'>

                                    <div className="form-group row">
                                        <label className="col-sm-6 col-form-label" htmlFor="july">July</label>
                                        <div className="col-sm-6">
                                            <input 
                                                className="form-control"
                                                id="july" 
                                                // name="july" 
                                                type="number" 
                                                placeholder="Cylinder Quantity.."
                                                onChange={(e)=>handleChangeValue(e,'7')}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Name Field Required'
                                                })}
                                            />
                                            {errors.july && <p className='text-danger'>{errors.july.message}</p>}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-6 col-form-label" htmlFor="auguest">Auguest</label>
                                        <div className="col-sm-6">
                                            <input 
                                                className="form-control"
                                                id="auguest" 
                                                // name="auguest" 
                                                type="number" 
                                                placeholder="Cylinder Quantity.."
                                                onChange={(e)=>handleChangeValue(e,'8')}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Name Field Required'
                                                })}
                                            />
                                            {errors.auguest && <p className='text-danger'>{errors.auguest.message}</p>}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-6 col-form-label" htmlFor="september">September</label>
                                        <div className="col-sm-6">
                                            <input 
                                                className="form-control"
                                                id="september" 
                                                // name="september" 
                                                type="number" 
                                                placeholder="Cylinder Quantity.."
                                                onChange={(e)=>handleChangeValue(e,'9')}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Name Field Required'
                                                })}
                                            />
                                            {errors.september && <p className='text-danger'>{errors.september.message}</p>}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-6 col-form-label" htmlFor="october">October</label>
                                        <div className="col-sm-6">
                                            <input 
                                                className="form-control"
                                                id="october" 
                                                // name="october" 
                                                type="number" 
                                                placeholder="Cylinder Quantity.."
                                                onChange={(e)=>handleChangeValue(e,'10')}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Name Field Required'
                                                })}
                                            />
                                            {errors.october && <p className='text-danger'>{errors.october.message}</p>}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-6 col-form-label" htmlFor="november">November</label>
                                        <div className="col-sm-6">
                                            <input 
                                                className="form-control"
                                                id="november" 
                                                // name="november" 
                                                type="number" 
                                                placeholder="Cylinder Quantity.."
                                                onChange={(e)=>handleChangeValue(e,'11')}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Name Field Required'
                                                })}
                                            />
                                            {errors.november && <p className='text-danger'>{errors.november.message}</p>}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-6 col-form-label" htmlFor="december">December</label>
                                        <div className="col-sm-6">
                                            <input 
                                                className="form-control"
                                                id="december" 
                                                // name="december" 
                                                type="number" 
                                                placeholder="Cylinder Quantity.."
                                                onChange={(e)=>handleChangeValue(e,'12')}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Name Field Required'
                                                })}
                                            />
                                            {errors.december && <p className='text-danger'>{errors.december.message}</p>}
                                        </div>
                                    </div>
                                        </div>
                                    </div>
                                    </div>
                                   
                                    

                                    

                                            
                                    <SubmitButton link="companyProfile/index" offset="2" menuId={ menuId } />
                                </form>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Edit;