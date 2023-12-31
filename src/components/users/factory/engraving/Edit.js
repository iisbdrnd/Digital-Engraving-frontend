import React, { Fragment, useEffect, useState, useReducer } from "react";
import {
    ENGRAVING_RS_URL,
    POLISHING_GET_POLISHING_DATA_BY_JOB_ID,
    DESIGN_LAYOUT_DETAILS,
    GET_DESIGN_LAYOUT_DETAILS,
    GET_ENGRAVING_COLOR_URL,
    ENGRAVING_JOB_ID,
    ENGRAVING_LAYOUT_DETAILS,
} from "../../../../api/userUrl";
import { userGetMethod, userPutMethod } from "../../../../api/userAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useForm from "react-hook-form";
import { SubmitButton } from "../../../common/GlobalButton";
import { Typeahead } from 'react-bootstrap-typeahead';
import moment from "moment";
import { placeHolderText } from "../../../common/GlobalComponent";
import { trStyleNormal } from "../../jobAgreement/Create";

const Edit = (props) => {
    const { handleSubmit, register, errors, reset } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [colorsState, setColorsState] = useState([]);
    const [layoutReferrence, setLayoutReferrence] = useState([]);
    const [polishMachines, setPolishMachines] = useState([]);
    const [typeHeadOptions, setTypeHeadOptions] = useState({});
    const [editData, setEditData] = useState([]);
    const [layoutText,setLayoutText] = useState('');
    const [jobId,setJobId] = useState('');
    const [cylinderId,setCylinderId] = useState('');

    let [stateData, setStateData] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            // send_date         : new Date().toLocaleDateString(),

            job_order_id: "",
            cylinder_id: "",
            //Output, QC and Remarks
            a_off_time: "",
            output_status: "",
            stylus_broken: "",
            action: "",
            a_duration: "",
            remarks: "",
            //ENGRAVING
            des_machine: "",
            engr_date: "",
            est_duration: "",
            shift_id: "",
            done_by: "",
            a_machine: "",
            on_time: "",
            est_end_time: "",

            job_order_pk_id: "",
            jobOrderDetailsData: [], //STORE DATA FROM job_orders
            shiftData: [], //STORE DATA FROM dig_shift_master
            shiftDutyPersons: [], //STORE DATA FROM dig_shift_details
            cylindersByJobId: [], //STORE DATA FROM factory_cylinder_supply_chains
            completeEngraveData: [], //STORE DATA FROM dig_engravings
            platingData: [],
            available_cylinders: [],
            polishMachines: [],
            layout_id          : '',
            color              : '',
            history_image      : '',
            angle               : '',
            screen              : '',
            start_point         : '',
            image_area          : '',
            remarks             : '',

        }
    );
    let digEngravingCylinderId = props.match.params.dig_engravings_cylinder_id
        ? props.match.params.dig_engravings_cylinder_id
        : null;

    useEffect(() => {

        userGetMethod(`${ENGRAVING_RS_URL}/${digEngravingCylinderId}/edit`).then(
            (response) => {
                console.log(response.data);
                dropDownChange(
                    [{ id: response.data.jobOrder.job_id }],
                    "job_order_pk_id"
                );
                setJobId(response.data.jobOrder.job_id);
                setEditData(response.data);

                let { engraving, polishMachines, digShift, shiftDutyPersons } =
                    response.data;
                    setCylinderId(engraving.cylinder_id)
                    setStateData({
                    job_no: response.data.jobOrder.job_no,
                    job_order_pk_id: engraving.job_order_pk_id,
                    cylinder_id: engraving.cylinder_id,

                    a_off_time: engraving.a_off_time,
                    output_status: engraving.output_status,
                    stylus_broken: engraving.stylus_broken,
                    action: engraving.action,
                    a_duration: engraving.a_duration,
                    des_machine: engraving.des_machine,
                    engr_date: engraving.engr_date,
                    est_duration: engraving.est_duration,
                    shift_id: engraving.shift_id,
                    done_by: engraving.done_by,
                    a_machine: engraving.a_machine,
                    on_time: engraving.on_time,
                    est_end_time: engraving.est_end_time,
                    remarks: engraving.remarks,

                    polishMachines: polishMachines,
                    shiftData: digShift, //GET DATA FROM dig_shift_master table
                    shiftDutyPersons: shiftDutyPersons, //GET DATA FROM dig_shift_details table
                });
                setTypeHeadOptions((prevstate) => ({
                    ...prevstate,
                    ['layout_id']: [],
                }))
                setTypeHeadOptions((prevstate) => ({
                    ...prevstate,
                    ['color']: [],
                }))
                // setColors(response?.data?.colors);
                // setLayoutReferrence(response?.data?.layout_references);
                setPolishMachines(response?.data?.polishMachines);
                // setShiftDutyPersons(response?.data?.shiftDutyPersons);
                setIsLoading(false);
            }
        )
        .catch(errors =>{console.log(errors)});
    }, []);

    const onChangeHandler = (event) => {
        setStateData({ [event.target.name]: event.target.value });
    };


    

    const dropDownChange = (e, fieldName) => {
        if (e.length > 0) {
            const selectedValueId = e[0].id; //job_orders.job_order_pk_id

            
            
            
            userGetMethod(`${ENGRAVING_JOB_ID}?job_id=${selectedValueId}`)
            .then((response) => {
                // console.log('GET_ENGRAVING_DATA_BY_JOB_ID', response.data);
                    setLayoutText(response.data.layout);
                    let colorOptions = [];
                if (response.data.colors && response.data.colors.length > 0) {
                    response.data.colors.map(color => {

                    
                        let jobOrderObj = {};
                        jobOrderObj.id =color.id;
                        jobOrderObj.name = color.color_name;
                        colorOptions.push(jobOrderObj);
                    }
                    )   
                    // setColors({...colors,[jobOrderObj]})
            }
            setTypeHeadOptions((prevstate) => ({
                ...prevstate,
                ['color']: colorOptions,
            }))
            userGetMethod(
                `${POLISHING_GET_POLISHING_DATA_BY_JOB_ID}?jobOrderId=${selectedValueId}`
            ).then((response) => {

                console.log(response.data)

                let {
                    jobOrderDetails,
                    cylindersByJobId,
                    platingData,
                    completeEngraveData,
                } = response.data;
                setStateData({
                    jobOrderDetailsData: jobOrderDetails, //CYLINDER DATA FROM 'job_orders' TABLE
                    cylindersByJobId: cylindersByJobId, //CYLINDER DATA FROM 'factory_cylinder_supply_chains' TABLE
                    platingData: platingData, //PLATING DATA FROM 'plating_tank_schedule_details' TABLE
                    completeEngraveData: completeEngraveData, //PLATING DATA FROM 'plating_tank_schedule_details' TABLE
                });
            });
            setIsLoading(false)
            })
            .catch(errors =>{console.log(errors)});
        }
    };

    useEffect(() => {
        userGetMethod(`${ENGRAVING_LAYOUT_DETAILS}?job_id=${jobId}&color_id=${colorsState?.color}`)
        .then(response => {
            setStateData({
                ...stateData,
                'angle': response?.data?.layoutDetail[0]?.er_desired_angle,
                'screen': response?.data?.layoutDetail[0]?.er_desired_screen,
                // "des_machine": response?.data?.layoutDetails[0]?.er_engraving_machine,
               'start_point': response?.data?.layoutDetail[0]?.axl_start_point,
                'image_area': response?.data?.layoutDetail[0]?.axl_image_area,
                'remarks': response?.data?.layoutDetail[0]?.remarks,
                'history_image' : response?.data?.layoutDetail[0]?.history_image
            })
            setIsLoading(false)
        })
        .catch(errors =>{console.log(errors)})
    },[colorsState?.color,jobId])

    const newOnChangeEvent = (e,fieldName) => {
        if(e.length > 0){
            const selectedValueId = e[0].id;
            // console.log(selectedValueId)
            setColorsState(
                (prevstate) => ({
                    ...prevstate,
                    [fieldName]: selectedValueId,
                })
            )}
    }

    if (stateData?.on_time && stateData?.est_duration) {
        let inputDate = moment(stateData?.on_time, "HH:mm").format("HH:mm:ss");
        var t1 = new Date(moment(inputDate, "HH:mm:ss").toString());
        let est_inputDate = moment(stateData?.est_duration, "HH:mm").format(
            "HH:mm:ss"
        );

        var t2 = new Date(moment(est_inputDate, "HH:mm:ss").toString());

        t1.setHours(t1.getHours() + t2.getHours());
        t1.setMinutes(t1.getMinutes() + t2.getMinutes());

        stateData.est_end_time = moment(t1).format("HH:mm:ss");
    }

    if (stateData?.on_time && stateData?.a_off_time) {
        let inputDate = moment(stateData?.on_time, "HH:mm").format("HH:mm:ss");
        let endDate = moment(stateData?.a_off_time, "HH:mm").format("HH:mm:ss");

        var ts = new Date(moment(inputDate, "HH:mm:ss").toString());
        var te = new Date(moment(endDate, "HH:mm:ss").toString());

        te.setHours(te.getHours() - ts.getHours());
        te.setMinutes(te.getMinutes() - ts.getMinutes());
        // console.log(moment(te).format("HH:mm:ss"));
        // setStateData({'a_duration': moment(te).format("HH:mm:ss")})
        stateData.a_duration = moment(te).format("HH:mm:ss");
    }

    const submitHandler = (data, e) => {
        userPutMethod(`${ENGRAVING_RS_URL}/${digEngravingCylinderId}`, data)
            .then((response) => {
                if (response.data.status == 1) {
                    toast.success(response.data.message);
                    e.target.reset();
                    clearForm();
                    setStateData({ jobOrderDetailsData: [] });
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch((error) => toast.error(error));
    };

    const clearForm = () => {
        setStateData({
            job_order_id: "",
            cylinder_id: "",
            //Output, QC and Remarks
            a_off_time: "",
            output_status: "",
            stylus_broken: "",
            action: "",
            a_duration: "",
            remarks: "",
            //ENGRAVING
            des_machine: "",
            engr_date: "",
            est_duration: "",
            shift_id: "",
            done_by: "",
            a_machine: "",
            on_time: "",
            est_end_time: "",

            job_order_pk_id: "",
            jobOrderDetailsData: [], //STORE DATA FROM job_orders
            shiftData: [], //STORE DATA FROM dig_shift_master
            shiftDutyPersons: [], //STORE DATA FROM dig_shift_details
            cylindersByJobId: [], //STORE DATA FROM factory_cylinder_supply_chains
            completeEngraveData: [], //STORE DATA FROM dig_engravings
            platingData: [],
            available_cylinders: [],
            polishMachines: [],
        });
    };

    var menuId = 0;
    if (props.location.state === undefined) {
        menuId = 0;
    } else {
        menuId = props.location.state.params.menuId;
    }

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>Engraving Form</h5>
                        </div>
                        <div className="card-body">
                            {isLoading ? (
                                <img
                                    src={process.env.PUBLIC_URL + "/preloader.gif"}
                                    alt="Data Loading"
                                />
                            ) : (
                                <>
                                    <form
                                        onSubmit={handleSubmit(submitHandler)}
                                        className="theme-form row"
                                    >
                                        <div className="col-md-9">
                                            <fieldset className="border p-2">
                                                <legend className="w-auto text-left">
                                                    Job and base Information
                                                </legend>

                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label required">
                                                        Job Id
                                                    </label>
                                                    <div className="col-md-9">
                                                        {/* <Typeahead
                                                        id="job_order_pk_id"
                                                        name="job_order_pk_id"
                                                        labelKey={option => `${option.name}`}
                                                        options={stateData['job_orders']}
                                                        placeholder="Select Job No..."
                                                        onChange={(e) => dropDownChange(e, 'job_order_pk_id')}
                                                        selected={stateData.job_order_id}
                                                        disabled={stateData.job_order_id != '' ? 'disabled' : ''}
                                                        ref={register({
                                                            required: 'Job No Field Required'
                                                        })}
                                                    /> */}
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="job_no"
                                                            ref={register({
                                                                required: "On Time Field Required",
                                                            })}
                                                            value={stateData.job_no}
                                                            // value='20211116-001'
                                                            disabled={"disabled"}
                                                        />
                                                    </div>

                                                    <label className="col-md-3 col-form-label label-form required ">
                                                        Cylinder Id
                                                    </label>
                                                    <div className="col-md-9">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={cylinderId}
                                                            disabled={"disabled"}
                                                        />
                                                        {/* <input 
                                                        type="hidden" 
                                                        className="form-control" 
                                                        name="factory_cyl_sup_id" 
                                                        ref={register({
                                                            required: 'On Time Field Required'
                                                        })}
                                                        value='1'
                                                        disabled={'disabled'}
                                                    /> */}
                                                    </div>
                                                </div>
                                            </fieldset>

                                            <div className="form-row">
                                                <div className="col-md-12">
                                                    <fieldset className="border p-2">
                                                        <legend className="w-auto text-left">Layout</legend>

                                                        <div className="form-row">
                                                            {/* <label className="col-sm-3 col-form-label required">Layout Id</label>
                                                        <div className="col-md-8"> */}
                                                            {/* <Typeahead
                                                                id="job_order_pk_id"
                                                                name="job_order_pk_id"
                                                                labelKey={option => `${option.name}`}
                                                                options={typeHeadOptions['job_orders']}
                                                                placeholder="Select Job No..."
                                                                onChange={(e) => dropDownChange(e, 'job_order_pk_id')}
                                                                // selected={designToFactoryInput.job_order_pk_id}
                                                                // disabled={job_order_pk_id != null ? 'disabled' : ''}
                                                                ref={register({
                                                                    required: 'Job No Field Required'
                                                                })}
                                                            /> */}
                                                            {/* <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                name="job_no"
                                                                placeholder="Layout ID"
                                                                {...register("job_no", {required: 'error message'})}
                                                                // value='20211116-001'
                                                                disabled={'disabled'}
                                                            />
                                                        </div> */}
                                                            <div className="col-md-6 form-row">
                                                                {/* <label className="col-md-5 col-form-label label-form required ">Color Sl</label>
                                                            <div className="col-md-7">
                                                                <input type="text" className="form-control" name="color_sl" {...register("color_sl", {required: 'error message'})} />
                                                            </div> */}
                                                                <label className="col-sm-5 col-form-label">
                                                                    Layout Id
                                                                </label>
                                                                <div className="col-md-7">
                                                                    {/* <input type="text" className="form-control" name="layout_id" {...register("layout_id", { required: "Please enter your first name." })}/> */}
                                                                    <input type="text" className="form-control" name="layout" {...register("layout_id", { required: "Please enter layout name.." })}
                                                                    value={layoutText? layoutText : ''}
                                                                    disabled={layoutText ? true:false}
                                                                    // onChange={handleChange}
                                                                />
                                                                </div>

                                                                <label className="col-md-5 col-form-label label-form required ">
                                                                    Screen
                                                                </label>
                                                                <div className="col-md-7">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="screen"
                                                                        required
                                                                        disabled
                                                                        ref={register({})}
                                                                        defaultValue={stateData?.screen}
                                                                    />
                                                                </div>

                                                                <label className="col-md-5 col-form-label label-form  ">
                                                                    Start Point
                                                                </label>
                                                                <div className="col-md-7">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="start_point"
                                                                        required
                                                                        disabled
                                                                        defaultValue={stateData?.start_point}
                                                                        ref={register({})}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6 form-row">
                                                                <label className="col-md-5 col-form-label label-form required ">
                                                                    Color
                                                                </label>
                                                                <div className="col-md-7">
                                                                    {/* <input type="text" className="form-control" name="color" ref={register({})} /> */}
                                                                    <Typeahead
                                                                id="color_id"
                                                                name="color_id"
                                                                labelKey={option => `${option.name}`}
                                                                options={typeHeadOptions['color']}
                                                                placeholder="select Color.."
                                                                onChange={(e) => newOnChangeEvent(e,'color')}
                                                                inputProps={{ required: true }}
                                                                // onInputChange={(text)=>handleOnChangeColor(text)}
                                                                // selected={colors}
                                                                // disabled={job_order_pk_id != null ? 'disabled' : ''}
                                                                ref={register({
                                                                    required: 'Job No Field Required'
                                                                })}/>
                                                                </div>

                                                                <label className="col-md-5 col-form-label label-form required ">
                                                                    Angle
                                                                </label>
                                                                <div className="col-md-7">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        required
                                                                        disabled
                                                                        name="angle"
                                                                        defaultValue={stateData?.angle}
                                                                        ref={register({})}
                                                                    />
                                                                </div>

                                                                <label className="col-md-5 col-form-label label-form  ">
                                                                    Image Area
                                                                </label>
                                                                <div className="col-md-7">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="image_area"
                                                                        required
                                                                        disabled
                                                                        defaultValue={stateData?.image_area}
                                                                        ref={register({})}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <label className="col-md-3 col-form-label label-form">
                                                                Remarks
                                                            </label>
                                                            <div className="col-md-8">
                                                                <textarea
                                                                    className="form-control"
                                                                    rows="3"
                                                                    name="remarks"
                                                                    disabled
                                                                    defaultValue={stateData?.remarks}
                                                                    ref={register({})}
                                                                ></textarea>
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="col-md-12">
                                                    <fieldset className="border p-2">
                                                        <legend className="w-auto text-left">
                                                            Engraving
                                                        </legend>

                                                        <div className="form-row">
                                                            <div className="col-md-6 form-row">
                                                                <label className="col-md-5 col-form-label label-form">
                                                                    Des. Machine
                                                                </label>
                                                                <div className="col-md-7">
                                                                    {/* <input type="text" className="form-control" name="des_machine" ref={register({})} value={stateData.des_machine ? stateData.des_machine : ''} onChange={onChangeHandler}/> */}

                                                                    <select
                                                                        className="form-control"
                                                                        name="des_machine"
                                                                        ref={register({})}
                                                                        defaultValue={
                                                                                stateData.des_machine ?
                                                                                    stateData.des_machine :
                                                                                    ""
                                                                            }
                                                                        onChange={onChangeHandler}
                                                                    >
                                                                        <option>select one</option>
                                                                        {editData.polishMachines.map(
                                                                            (machine, key) => (
                                                                                <option value={machine.id} key={key}>
                                                                                    {machine.machine_name}
                                                                                </option>
                                                                            )
                                                                        )}
                                                                    </select>
                                                                </div>

                                                                <label className="col-md-5 col-form-label label-form">
                                                                    Engr. Date
                                                                </label>
                                                                <div className="col-md-7">
                                                                    <input
                                                                        type="date"
                                                                        className="form-control"
                                                                        name="engr_date"
                                                                        ref={register({})}
                                                                        value={
                                                                            stateData.engr_date
                                                                                ? stateData.engr_date
                                                                                : moment().format('YYYY-MM-DD')
                                                                        }
                                                                        onChange={onChangeHandler}
                                                                    />
                                                                </div>

                                                                <label className="col-md-5 col-form-label label-form">
                                                                    Est, Duration
                                                                </label>
                                                                <div className="col-md-7">
                                                                    <input
                                                                        type="text"
                                                                        placeholder="hh:mm"
                                                                        className="form-control"
                                                                        name="est_duration"
                                                                        ref={register({})}
                                                                        value={
                                                                            stateData.est_duration
                                                                                ? stateData.est_duration
                                                                                : ""
                                                                        }
                                                                        onChange={onChangeHandler}
                                                                    />
                                                                </div>
                                                                {/* <label className="col-form-label label-form pull-right">hh:mm</label> */}

                                                                <label className="col-md-5 col-form-label label-form">
                                                                    Shift
                                                                </label>
                                                                <div className="col-md-7">
                                                                    <input
                                                                        type="text"
                                                                        disabled="disabled"
                                                                        value={
                                                                            editData.digShift.shift_type == 1
                                                                                ? "Day"
                                                                                : editData.digShift.shift_type == 2
                                                                                    ? "Evening"
                                                                                    : "Night"
                                                                        }
                                                                        className="form-control"
                                                                    />

                                                                    <input
                                                                        type="hidden"
                                                                        value={editData.digShift.shift_pk_id}
                                                                        className="form-control"
                                                                        name="shift_id"
                                                                        ref={register({})}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6 form-row">
                                                                <label className="col-md-5 col-form-label label-form">
                                                                    Done by
                                                                </label>
                                                                <div className="col-md-7">
                                                                    <select
                                                                        className="form-control"
                                                                        name="done_by"
                                                                        ref={register({})}
                                                                        defaultValue={
                                                                            stateData.done_by ? stateData.done_by : ""
                                                                        }
                                                                        onChange={onChangeHandler}
                                                                    >
                                                                        <option>select one</option>
                                                                        {editData.shiftDutyPersons.map(
                                                                            (dutyPerson, key) => (
                                                                                <option
                                                                                    value={dutyPerson.employee_id}
                                                                                    key={key}
                                                                                >
                                                                                    {dutyPerson.employee_name}
                                                                                </option> //employee_id MEANS dig_employee_information.id and employee_name MEANS dig_employee_information.name
                                                                            )
                                                                        )}
                                                                    </select>
                                                                </div>

                                                                <label className="col-md-5 col-form-label label-form">
                                                                    A. Machine
                                                                </label>
                                                                <div className="col-md-7">
                                                                    <select
                                                                        className="form-control"
                                                                        name="a_machine"
                                                                        ref={register({})}
                                                                        value={
                                                                            stateData.a_machine
                                                                                ? stateData.a_machine
                                                                                : ""
                                                                        }
                                                                        onChange={onChangeHandler}
                                                                    >
                                                                        <option>select one</option>
                                                                        {editData.polishMachines.map(
                                                                            (machine, key) => (
                                                                                <option value={machine.id} key={key}>
                                                                                    {machine.machine_name}
                                                                                </option>
                                                                            )
                                                                        )}
                                                                    </select>
                                                                </div>

                                                                <label className="col-md-5 col-form-label label-form">
                                                                    On Time
                                                                </label>
                                                                <div className="col-md-7">
                                                                    <input
                                                                        type="time"
                                                                        className="form-control"
                                                                        name="on_time"
                                                                        ref={register({})}
                                                                        value={
                                                                            stateData.on_time ? stateData.on_time : moment().format('HH:mm')
                                                                        }
                                                                        onChange={onChangeHandler}
                                                                    />
                                                                </div>

                                                                <label className="col-md-5 col-form-label label-form">
                                                                    Est, End Time
                                                                </label>
                                                                <div className="col-md-7">
                                                                    <input
                                                                        type="time"
                                                                        className="form-control"
                                                                        name="est_end_time"
                                                                        ref={register({})}
                                                                        value={
                                                                            stateData.est_end_time
                                                                                ? stateData.est_end_time
                                                                                : ""
                                                                        }
                                                                        onChange={onChangeHandler}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="col-md-12">
                                                    <fieldset className="border p-2">
                                                        <legend className="w-auto text-left">
                                                            Output, QC and Remarks
                                                        </legend>
                                                        <div className="form-row">
                                                            <div className="col-md-6 form-row">
                                                                <label className="col-md-5 col-form-label label-form">
                                                                    A. off Time
                                                                </label>
                                                                <div className="col-md-7">
                                                                    <input
                                                                        type="time"
                                                                        className="form-control"
                                                                        name="a_off_time"
                                                                        ref={register({})}
                                                                        value={
                                                                            stateData.a_off_time
                                                                                ? stateData.a_off_time
                                                                                : moment().format('HH:mm')
                                                                        }
                                                                        onChange={onChangeHandler}
                                                                    />
                                                                </div>

                                                                <label className="col-md-5 col-form-label label-form">
                                                                    Output Status
                                                                </label>
                                                                <div className="col-md-7">
                                                                    <select
                                                                        className="form-control"
                                                                        name="output_status"
                                                                        ref={register({})}
                                                                        defaultValue={
                                                                            stateData.output_status
                                                                                ? stateData.output_status
                                                                                : ""
                                                                        }
                                                                        onChange={onChangeHandler}
                                                                    >
                                                                        <option value="">select one</option>
                                                                        <option value="1">Ok</option>
                                                                        <option value="0">Not Ok</option>
                                                                    </select>
                                                                </div>
                                                                {stateData?.output_status == "0" ? (
                                                                    <>
                                                                        <label className="col-md-5 col-form-label label-form">
                                                                            Comment
                                                                        </label>
                                                                        <div className="col-md-7">
                                                                            {/* <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                name="comment"
                                                                                onChange={onChangeHandler}
                                                                                ref={register({})}
                                                                            /> */}
                                                                                <select
                                                                                    className="form-control"
                                                                                    onChange={onChangeHandler}
                                                                                    name="comment"
                                                                                    ref={register({})}
                                                                                >
                                                                                    <option>select one</option>
                                                                                    <option value="stylus_broken">
                                                                                        Stylus Broken
                                                                                    </option>
                                                                                    <option value="machine_hang">
                                                                                        Machine Hang
                                                                                    </option>
                                                                                </select>
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    ""
                                                                )}

                                                                <label className="col-md-5 col-form-label label-form">
                                                                    Stylus Condition{" "}
                                                                </label>
                                                                <div className="col-md-7">
                                                                    {/* <input type="checkbox" className="mt-2" name='stylus_broken' {...register("stylus_broken", {required: 'error message'})} defaultChecked={stateData.stylus_broken ? true : false} onChange={onChangeHandler}/> */}
                                                                    <select
                                                                        className="form-control"
                                                                        onChange={onChangeHandler}
                                                                        name="stylus_condition"
                                                                        ref={register({})}
                                                                    >
                                                                        <option>select one</option>
                                                                        <option value="A">A</option>
                                                                        <option value="B">B</option>
                                                                        <option value="C">C</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 form-row">
                                                                <label className="col-md-5 col-form-label label-form">
                                                                    Action
                                                                </label>
                                                                <div className="col-md-7">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="action"
                                                                        ref={register({})}
                                                                        value={
                                                                            stateData.action ? stateData.action : ""
                                                                        }
                                                                        onChange={onChangeHandler}
                                                                    />
                                                                </div>

                                                                <label className="col-md-5 col-form-label label-form">
                                                                    A. Duration
                                                                </label>
                                                                <div className="col-md-7">
                                                                    <input
                                                                        type="text"
                                                                        placeholder="hh:mm"
                                                                        className="form-control"
                                                                        name="a_duration"
                                                                        ref={register({})}
                                                                        value={
                                                                            stateData.a_duration
                                                                                ? stateData.a_duration
                                                                                : ""
                                                                        }
                                                                        onChange={onChangeHandler}
                                                                    />
                                                                </div>

                                                                <label className="col-md-5 col-form-label label-form">
                                                                    Remarks
                                                                </label>
                                                                <div className="col-md-7">
                                                                    {/* <input type="text" className="form-control" name="cyls1" /> */}
                                                                    <textarea className="form-control" rows="3" name="remarks" {...register("remarks", {required: 'error message'})} defaultValue={ stateData.remarks ? stateData.remarks : '' }></textarea>
                                                                   
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <pre className="helper-classes m-t-10">
                                                <div className="display-div">
                                                    <div className="p-0">
                                                        <table className="table table-bordernone">
                                                            <tbody>
                                                                <tr style={trStyleNormal}>
                                                                    <td width="45%" align="right">
                                                                        Job Name
                                                                    </td>
                                                                    <td width="5%">:</td>
                                                                    <td width="50%">
                                                                        {stateData?.jobOrderDetailsData?.job_name}
                                                                    </td>
                                                                </tr>
                                                                <tr style={trStyleNormal}>
                                                                    <td align="right">Job Type</td>
                                                                    <td>:</td>
                                                                    <td>
                                                                        {stateData?.jobOrderDetailsData?.job_type}
                                                                    </td>
                                                                </tr>
                                                                <tr style={trStyleNormal}>
                                                                    <td align="right">Cylinder Id</td>
                                                                    <td>:</td>
                                                                    <td>{cylinderId}</td>
                                                                </tr>
                                                                {/* <tr>
                                                                <td align="right">Cyl</td>
                                                                <td>:</td>
                                                                <td>fksdjflk</td>
                                                            </tr> */}
                                                                <tr style={trStyleNormal}>
                                                                    <td align="right">FL</td>
                                                                    <td>:</td>
                                                                    <td>{stateData?.jobOrderDetailsData?.fl}</td>
                                                                </tr>
                                                                <tr style={trStyleNormal}>
                                                                    <td align="right">Cir</td>
                                                                    <td>:</td>
                                                                    <td>{stateData?.jobOrderDetailsData?.cir}</td>
                                                                </tr>
                                                                <tr style={trStyleNormal}>
                                                                    <td align="right">Dia</td>
                                                                    <td>:</td>
                                                                    <td>{stateData?.jobOrderDetailsData?.dia}</td>
                                                                </tr>
                                                                <tr style={trStyleNormal}>
                                                                    <td align="right">S. Area</td>
                                                                    <td>:</td>
                                                                    <td>
                                                                        {stateData?.jobOrderDetailsData?.surface_area}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </pre>
                                            {stateData?.history_image != '' && (<div>
                                                <img
                                                    style={{ width: "100%", height: "100%" }}
                                                    src={`${process.env.REACT_APP_BASEURL}/public/uploads/`+`${stateData.history_image}`}
                                                />
                                            </div>)}
                                        </div>
                                        <SubmitButton link="engraving/index" menuId={menuId} />
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Edit;
