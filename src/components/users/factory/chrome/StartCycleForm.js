import React, { useEffect, useState, useReducer } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { toast } from 'react-toastify';
import { PLATING_DEPT_RSURL, CHROME_SCHEDULE_START_CYCLE, CHECK_CYL_EXIST_OR_NOT, JOB_DATA_FROM_PLATING_DEPT } from '../../../../api/userUrl';
import { userGetMethod, userPutMethod, userPostMethod } from '../../../../api/userAction';
import { ValidationAlerts } from '../../../common/GlobalButton';
import SweetAlert from 'sweetalert2';
import moment from 'moment';

export default function StartCycleForm(props) {
    const { handleSubmit, register, errors } = useForm();
    const [ isOpenModalPrev, setIsOpenModalPrev ] = useState(true);
    const [validateErrors, setValidateErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [typeheadOptions, setTypeheadOptions] = useState({});
    const [dropdownData, setDropdownData] = useState({});
    const [cylScheduleDetails, setCylScheduleDetails] = useState([]);
    const [modal, setModal] = useState(false); 
    const [changeUseEffect, setChangeUseEffect] = useState(0); 
    const [jobData, setJobData] = useState({}); 
    const [isStarted,setIsStarted] = useState(false);

    let [formData, setFormData] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            cycle_id              : '',
            chrome_date          : '',
            shift_operator        : [],
            shift_id              : '',
            start_time            : '',
            final_chrome_order   : '',
            est_end_time          : '',
            actual_end_time       : '',
            est_cycle_duration    : '2.00',
            actual_cycle_duration : '',
            remarks               : '',
            shift_id              : '',
            shift_type_id         : '',
            plating_time          : '',
        }
    );

    useEffect(() => {
        // ADD,EDIT,DELETE,SHOW ACCESS CHECK
        userGetMethod(`${CHROME_SCHEDULE_START_CYCLE}/${props.chromeScheduleMasterId}`)
            .then(response => {
                let {cycle_id, shift_operator, chrome_date, shift_id, start_time, final_chrome_order, est_end_time, actual_end_time, est_cycle_duration, actual_cycle_duration, remarks, shift_type_id, shiftDutyPersons} = response.data.cycleData;
                if(start_time != null) {
                    setIsStarted(true)
                }
                setFormData({ 
                    cycle_id             : cycle_id,
                    chrome_date          : chrome_date === null ? '': chrome_date,
                    shift_operator       : shift_operator === null ? '': shift_operator,
                    start_time           : start_time === null ? '': start_time.replace(" ", "T"),
                    final_chrome_order   : final_chrome_order === null ? '': final_chrome_order,
                    est_end_time         : est_end_time === null ? '': est_end_time,
                    actual_end_time      : actual_end_time === null ? '': actual_end_time.replace(" ", "T"),
                    est_cycle_duration   : est_cycle_duration === null ? '2.00': est_cycle_duration,
                    actual_cycle_duration: actual_cycle_duration === null ? '': actual_cycle_duration,
                    remarks              : remarks === null ? '' : remarks,
                    shift_type_id        : shift_type_id != null ? shift_type_id : '',
                    shift_id             : shift_id != null ? shift_id : '',
                    // plating_time         : response?.data?.plating_time.toString(),
                });

                //formatting time for estimated duration
                const estimate_duration = response?.data?.plating_time.toString();
                var platting_time =((parseInt(+estimate_duration/60).toString() + ":"+  parseInt(+estimate_duration-parseInt(+estimate_duration/60)*60).toString()).toString());
                setFormData({plating_time : (moment(platting_time,  'HH:mm').format("HH:mm:ss"))});
                // FOR DUTY PERSON START
                let shiftOperatorOptions = [];
                if (shiftDutyPersons && shiftDutyPersons.length > 0) {
                    shiftDutyPersons.map(person => 
                    {
                        let shiftOperator = {};
                        shiftOperator.id = person.employee_id;
                        shiftOperator.name = person.employee_name;
                        shiftOperatorOptions.push(shiftOperator);
                        if (shift_operator === person.employee_id) {
                            setFormData({
                                'shift_operator': [shiftOperator]
                            })
                        }
                    })
                }
                setTypeheadOptions(
                    (prevstate) => ({
                        ...prevstate,
                        ['shiftOperator']: shiftOperatorOptions,
                    })
                );
                // FOR DUTY PERSON END
                setIsLoading(false);
            });
    },[]);
    console.log(formData);
    // FOR CYLINDER SCHEDULE DETAILS DATA INPUT
    const inputHandler = (event) => {
        if (event.target.name == 'start_time') {
            let inputTime = new Date(event.target.value );
            const estimate_duration = new Date(moment(formData?.plating_time, "HH:mm:ss").toString());
            inputTime.setHours(inputTime.getHours() + (+estimate_duration.getHours()));
            inputTime.setMinutes(inputTime.getMinutes() + (+estimate_duration.getMinutes()));
            // let update_est_end_time = moment(inputTime).format('YYYY-MM-DD hh:mm a');
            let update_est_end_time = new Date(inputTime);
            setFormData({ 
                est_end_time: update_est_end_time 
            });
        }else if (event.target.name == 'actual_end_time') {
            let inputTime = new Date(event.target.value);
            let startTime = new Date(formData.start_time);

            let result = inputTime.getHours() - startTime.getHours();
            inputTime.setHours(result);
            
            if (inputTime.getMinutes() < startTime.getMinutes()) {
                inputTime.setMinutes(startTime.getMinutes() - inputTime.getMinutes());
            }else{
                inputTime.setMinutes(inputTime.getMinutes() - startTime.getMinutes());
            }

            setFormData({ 
                actual_cycle_duration: inputTime.getHours() + ':' + inputTime.getMinutes()
            });
        }
        setFormData(
            {[event.target.name] : event.target.value},
        );
    }
    console.log(formData);

    function formatAm_Pm(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        // var am_pm = hours >= 12 ? 'pm' : 'am';
        // hours = hours % 12;
        // hours = hours ? hours : 12; // the hour '0' should be '12'
        // minutes = minutes < 10 ? '0'+minutes : minutes;
        // var strTime = date.getFullYear() +"/"+ (date.getMonth()+1) +"/"+ date.getDate() + " " + hours + ':' + minutes + ' ' + am_pm;
        var strTime = date.getFullYear() +"/"+ (date.getMonth()+1) +"/"+ date.getDate() + " " + hours + ':' + minutes + ':' + '00';
        return strTime;
    }
    // FOR Typeahead DATA INPUT
    const dropDownChange = (event, stateName) => {
        if(event.length > 0){
            const selectedValueId = event[0].id;
            const selectedValueName = event[0].name;
            setDropdownData(
                (prevstate) => ({
                    ...prevstate,
                    [stateName]: selectedValueId,
                    [stateName+'_name']: selectedValueName,
                })
            );
        }
    }


    const submitHandler = (data, e) => {
        data.scheduleId = props.chromeScheduleMasterId;
        data.shift_operator = dropdownData.shift_operator; 
        data.est_end_time = new Date(formData.est_end_time);
        data.est_end_time = moment(data.est_end_time).format("YYYY-MM-DDTHH:mm");
        userPostMethod(`${CHROME_SCHEDULE_START_CYCLE}/${props.chromeScheduleMasterId}`, data)
            .then(response => {
                if (response.data.status == 1) {
                    toast.success(response.data.message);
                    e.target.reset();
                    props.toggle();
                    props.needReload(props.tankId,props.tank__id);
                } else {
                    toast.error(response.data.message);
                }
                setChangeUseEffect(changeUseEffect+1);
            })
            .catch(error => toast.error(error))

    }

    return (
        <Modal isOpen={ props.modal && isOpenModalPrev } toggle={props.toggle} size="lg">
            <ModalHeader toggle={props.toggle}>Start Cycle Form {props.modalTitle} Tank</ModalHeader>
            <ModalBody>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-body">
                                {validateErrors.length > 0 ? <ValidationAlerts items={validateErrors} setOpenVal={true} /> : '' }

                                {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                        <div className="row m-t-10 p-1">
                                            <div className="col-md-6">
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="cycle_id">Cycle #</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control"
                                                            id="cycle_id" 
                                                            name="cycle_id" 
                                                            type="text" 
                                                            placeholder="Cycle #"
                                                            autoComplete="off"
                                                            value={formData.cycle_id}
                                                            onChange={inputHandler}
                                                            ref={register({
                                                                required: 'Cycle Field Required'
                                                            })}
                                                        />
                                                        {errors.cycle_id && <p className='text-danger'>{errors.cycle_id.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="final_chrome_order">Final Order</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control"
                                                            id="final_chrome_order" 
                                                            name="final_chrome_order" 
                                                            type="number" 
                                                            placeholder="Final Order"
                                                            autoComplete="off"
                                                            value={formData.final_chrome_order}
                                                            onChange={inputHandler}
                                                            ref={register({
                                                                required: 'Final Order Field Required'
                                                            })}
                                                        />
                                                        {errors.final_chrome_order && <p className='text-danger'>{errors.final_chrome_order.message}</p>}
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="start_time">Start Time</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control"
                                                            id="start_time" 
                                                            name="start_time" 
                                                            type="datetime-local" 
                                                            placeholder="Start Time"
                                                            autoComplete="off"
                                                            value={formData.start_time}
                                                            onChange={e=>inputHandler(e)}
                                                            ref={register({
                                                                required: 'Start Time Field Required'
                                                            })}
                                                        />
                                                        {errors.start_time && <p className='text-danger'>{errors.start_time.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="est_cycle_duration">Est Duration</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control"
                                                            id="est_cycle_duration" 
                                                            name="est_cycle_duration" 
                                                            type="text" 
                                                            placeholder="Est Duration"
                                                            autoComplete="off"
                                                            value={formData.plating_time}
                                                            onChange={inputHandler}
                                                            ref={register({
                                                                required: 'Est Duration Field Required'
                                                            })}
                                                        />
                                                        {errors.plating_time && <p className='text-danger'>{errors.plating_time.message}</p>}
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="shift_operator">Operator</label>
                                                    <div className="col-sm-8">
                                                        <Typeahead
                                                            id="shift_operator"
                                                            name="shift_operator"
                                                            labelKey={option => `${option.name}`}
                                                            options={typeheadOptions['shiftOperator']}
                                                            selected={formData.shift_operator}
                                                            placeholder="Select Duty Person"
                                                            onChange={(e) => dropDownChange(e, 'shift_operator')}
                                                        />
                                                        {errors.shift_operator && <p className='text-danger'>{errors.shift_operator.message}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="chrome_date">Plating Date</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control"
                                                            id="chrome_date" 
                                                            name="chrome_date" 
                                                            type="date" 
                                                            placeholder="Plating Date"
                                                            autoComplete="off"
                                                            value={formData.chrome_date}
                                                            onChange={inputHandler}
                                                            ref={register({
                                                                required: 'Plating Date Field Required'
                                                            })}
                                                        />
                                                        {errors.chrome_date && <p className='text-danger'>{errors.chrome_date.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="shift_id">Shift Type</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control" 
                                                            type="text" 
                                                            disabled="disabled"
                                                            autoComplete="off"
                                                            value={formData.shift_type_id == 1 ? 'Day' : formData.shift_type_id == 2 ? 'Evening' : 'Night'}
                                                            onChange={inputHandler}
                                                        />
                                                        <input 
                                                            className="form-control"
                                                            id="shift_id" 
                                                            name="shift_id" 
                                                            type="hidden" 
                                                            autoComplete="off"
                                                            value={formData.shift_id}
                                                            onChange={inputHandler}
                                                            ref={register({
                                                                required: 'Plating Shift Field Required'
                                                            })}
                                                        />
                                                        {errors.shift_id && <p className='text-danger'>{errors.shift_id.message}</p>}
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="est_end_time">Est End Time</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control"
                                                            id="est_end_time" 
                                                            name="est_end_time" 
                                                            type="text" 
                                                            disabled="disabled"
                                                            placeholder="Est End Time"
                                                            autoComplete="off"
                                                            value={formData.est_end_time != '' ? moment(formData.est_end_time).format("DD/MM/YYYY hh:mm a") : "DD/MM/YYYY"}
                                                            onChange={inputHandler}
                                                            ref={register({
                                                                required: 'Est End Time Field Required'
                                                            })}
                                                        />
                                                        {errors.est_end_time && <p className='text-danger'>{errors.est_end_time.message}</p>}
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="remarks">Remarks</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control"
                                                            id="remarks" 
                                                            name="remarks" 
                                                            type="text" 
                                                            placeholder="Remarks"
                                                            autoComplete="off"
                                                            value={formData.remarks}
                                                            onChange={inputHandler}
                                                            ref={register({})}
                                                        />
                                                        {errors.remarks && <p className='text-danger'>{errors.remarks.message}</p>}
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="col-md-12">
                                                <fieldset className="border p-1" >
                                                    <legend className="w-auto text-left">Actual Time</legend>

                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label" htmlFor="actual_end_time">Act. End Time</label>
                                                        <div className="col-sm-4">
                                                            <input 
                                                                className="form-control"
                                                                id="actual_end_time" 
                                                                name="actual_end_time" 
                                                                type="datetime-local" 
                                                                placeholder="Actual End Time"
                                                                autoComplete="off"
                                                                value={formData.actual_end_time}
                                                                onChange={inputHandler}
                                                                ref={register({})}
                                                                disabled ={isStarted == false ? true : false}
                                                            />
                                                            {errors.actual_end_time && <p className='text-danger'>{errors.actual_end_time.message}</p>}
                                                        </div>

                                                        <label className="col-sm-2 col-form-label" htmlFor="actual_cycle_duration">Actual Duration</label>
                                                        <div className="col-sm-4">
                                                            <input 
                                                                className="form-control"
                                                                id="actual_cycle_duration" 
                                                                name="actual_cycle_duration" 
                                                                type="text" 
                                                                placeholder="Actual Duration"
                                                                autoComplete="off"
                                                                value={formData.actual_cycle_duration}
                                                                onChange={inputHandler}
                                                                ref={register({})}
                                                                disabled ={isStarted == false ? true : false}
                                                            />
                                                            {errors.actual_cycle_duration && <p className='text-danger'>{errors.actual_cycle_duration.message}</p>}
                                                        </div>
                                                    </div>
                                                </fieldset>
                                            </div>
                                        </div>

                                        <Button className="btn-sm m-t-10 m-r-10" type="submit" color="primary">Save Changes</Button>
                                        <Button className="btn-sm m-t-10" color="secondary"  onClick={props.toggle}>Cancel</Button>
                                    </form>
                                )}
                            </div>
                        </div>   
                    </div>
                </div>
            </div>
    
            </ModalBody>
        </Modal>
    );
}