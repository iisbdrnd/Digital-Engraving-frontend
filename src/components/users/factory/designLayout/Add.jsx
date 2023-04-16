import React, { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import useForm from "react-hook-form";
import 'react-bootstrap-typeahead/css/Typeahead.css';

import Layout from "./Layout";
import Base from "./Base";

import { PanelRefreshIcons, SubmitButton } from "../../../common/GlobalButton";
import { Typeahead } from 'react-bootstrap-typeahead';
import { JOB_ORDER_DETAILS, DESIGN_LAYOUT_RSURL } from "../../../../api/userUrl";
import { userGetMethod, userPostMethod } from "../../../../api/userAction";
import { toast } from "react-toastify";

const Add = (props) => {
    const { handleSubmit, register, errors, reset } = useForm();
    const [isLayout, setIsLayout] = useState(true);
    const [isBase, setIsBase] = useState(false);
    const [typeheadOptions, setTypeheadOptions] = useState({ job_orders: [], });
    const [selectedJobOrder, setSelectedJobOrder] = useState([]);
    const [engraveOrder, setEngraveOrder] = useState([]);
    const [uploadImage, setUploadImage] = useState();
    const [formData, setFormData] = useState({
        layout_date:  new Date().toLocaleDateString(),
        bill_config_status: '',
        cir: '',
        client_email: '',
        client_id: '',
        client_name: '',
        cyl_rate_status: '',
        dia: '',
        entry_date: '',
        fl: '',
        id: '',
        job_name: '',
        job_no: '',
        job_type: '',
        limit_square_cm: '',
        marketing_p_name: '',
        printer_id: '',
        printer_mark: '',
        printer_name: '',
        printing_status: '',
        total_cylinder_qty: '',
        total_surface_area: '',
        vat_status: '',
        remarks: '',
        ups: '',
        rpt: ''

    });
    const [dropdownData, setDropdownData] = useState({});
    const [typeColorOptions, setTypeColorOptions] = useState([]);

    let job_id = props.location.state.params.jobNo ? props.location.state.params.jobNo : null;
    console.log(props);
    useEffect(() => {
        pageRefreshHandler(job_id);
    }, [])
    const pageRefreshHandler = (job_id = null) => {
        console.log("clicked");
        // setIsLoading(true);
        userGetMethod(`${DESIGN_LAYOUT_RSURL}/create?job_order_id=${job_id}`)
            .then(response => {
                // FOR JOB ORDER
                let jobOrderOptions = [];
                if (response.data.jobOrder) {
                    let jobOrderObj = {};
                    jobOrderObj.id = response.data.jobOrder.id;
                    jobOrderObj.name = `[${response.data.jobOrder.job_no}] ` + response.data.jobOrder.job_name;
                    jobOrderOptions.push(jobOrderObj);

                    if (response.data.jobOrder != null) {
                        setFormData({
                            'job_id': [jobOrderObj]
                        })
                    }
                    if (job_id != null) {
                        setSelectedJobOrder([...selectedJobOrder, jobOrderObj])
                    }
                    dropDownChange([{ id: response.data.jobOrder.id }], 'job_id');
                }
                if (response.data.jobOrders && response.data.jobOrders.length > 0) {
                    response.data.jobOrders.map(order => {
                        let jobOrderObj = {};
                        jobOrderObj.id = order.id;
                        jobOrderObj.name = `[${order.job_no}] ` + order.job_name;
                        jobOrderOptions.push(jobOrderObj);

                    })
                }
                setTypeheadOptions({ ...typeheadOptions, ['job_orders']: jobOrderOptions, })

                // setIsLoading(false);
            });
    }

    const toogleLtoB = (val) => {
        if (val == "layout") {
            setIsLayout(true);
            setIsBase(false);
        } else if (val == "base") {
            setIsLayout(false);
            setIsBase(true);
        }
    }

    const inputChangeHandler = (e) => {
        if(e.target.name == 'history_image'){
            setUploadImage({[e.target.name] : URL.createObjectURL(e.target.files[0])});
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const engOrderHandler = (e, index) => {
        setEngraveOrder(
            engraveOrder.map((item, i) =>
                i == index ? { ...item, [e.target.name]: e.target.value } : item)
        );
    };
    console.log(engraveOrder);

    useEffect(() => {
        if (formData.l_reg_mark && formData.l_fl_cut && formData.design_w && formData.axial_ups && formData.r_reg_mark && formData.r_fl_cut) {
            setFormData({ ...formData, "axl_image_area": (+formData.l_reg_mark) + (+formData.l_fl_cut) + ((+formData.design_w) * (+formData.axial_ups)) + (+formData.r_reg_mark) + (+formData.r_fl_cut) })

        }
        if (formData.l_reg_mark && formData.l_fl_cut && formData.design_w && formData.axial_ups && formData.r_reg_mark && formData.r_fl_cut && formData?.axl_image_area && formData?.fl) {
            setFormData({ ...formData, "axl_start_point": ((+formData.fl) - (+formData?.axl_image_area)) / 2 })

        }
    }, [
        formData?.l_reg_mark,
        formData?.l_fl_cut,
        formData?.design_w,
        formData?.axial_ups,
        formData?.r_reg_mark,
        formData?.r_fl_cut,
        formData?.fl,
        formData?.axl_image_area
    ])
    console.log(formData);

    const dropDownChange = (event, stateName) => {
        if (stateName == 'job_id' && event[0]?.name) {
            setSelectedJobOrder(event);
        }
        console.log(event);
        if (event.length > 0) {
            const selectedValue = event[0].id;
            setDropdownData(
                (prevstate) => ({
                    ...prevstate,
                    [stateName]: selectedValue,
                })
            );
            userGetMethod(`${JOB_ORDER_DETAILS}?jobOrderId=${selectedValue}`)
                .then(response => {
                    let { 
                        // layout_date,
                        bill_config_status,
                        cir,
                        client_email,
                        client_id,
                        client_name,
                        cyl_rate_status,
                        dia,
                        entry_date,
                        fl,
                        id,
                        job_name,
                        job_no,
                        job_type,
                        limit_square_cm,
                        marketing_p_name,
                        printer_id,
                        printer_mark,
                        printer_name,
                        total_cylinder_qty,
                        total_surface_area,
                        vat_status,
                        remarks,
                        ups,
                        rpt,
                        printing_status } = response.data.jobOrderDetails;
                    setFormData({
                        // 'layout_date': layout_date,
                        'bill_config_status': bill_config_status,
                        'cir': cir,
                        'client_email': client_email,
                        'client_id': client_id,
                        'client_name': client_name,
                        'cyl_rate_status': cyl_rate_status,
                        'dia': dia,
                        'entry_date': entry_date,
                        'fl': fl,
                        'id': id,
                        'job_name': job_name,
                        'job_no': job_no,
                        'job_type': job_type,
                        'limit_square_cm': limit_square_cm,
                        'marketing_p_name': marketing_p_name,
                        'printer_id': printer_id,
                        'printer_mark': printer_mark,
                        'printer_name': printer_name,
                        'total_cylinder_qty': total_cylinder_qty,
                        'total_surface_area': total_surface_area,
                        'vat_status': vat_status,
                        'remarks': remarks,
                        'ups': ups,
                        'rpt': rpt,
                        'printing_status': printing_status,
                    });
                    setTypeColorOptions(response.data.colors);
                    if (response.data.colors.length > 0) {
                        let colorOptions = [];
                        response.data.colors.map((item, index) => {
                            let colorObj = {};
                            colorObj.id = index;
                            colorObj.name = item.color_name;
                            colorOptions.push(colorObj);
                        })
                        setEngraveOrder(colorOptions);
                        setTypeColorOptions(colorOptions);
                    }
                });
        }
    }

    var menuId = 0;
    if (props.location.state === undefined) {
        menuId = 0;
    } else {
        menuId = props.location.state.params.menuId;
    }

    const onSubmit = (data, e) => {
        data.engraveOrder = engraveOrder;
        console.log(data);
        userPostMethod(`${DESIGN_LAYOUT_RSURL}`,data)
        .then((response) => {
            console.log(response);
            toast.success(response.data.message);
            e.target.reset();
        })
    }

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-md-6">
                                    <h5>Design Layout Form</h5>
                                </div>
                                <div className="col-md-6">
                                    <PanelRefreshIcons onClick={pageRefreshHandler} />
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <>
                                <form onSubmit={handleSubmit(onSubmit)} className="theme-form row">
                                    <div className="col-md-12">
                                        <fieldset className="border p-2">
                                            <legend className="w-auto text-left">Job Info</legend>
                                            <div className="form-row">
                                                <div className="col-md-6 row">
                                                    <label className="col-sm-5 col-form-label required" htmlFor="job_id">Job No</label>
                                                    <div className="col-md-7">
                                                        <Typeahead
                                                            // className="form-control"
                                                            id="job_id"
                                                            name="job_id"
                                                            labelKey={option => `${option.name}`}
                                                            options={typeheadOptions['job_orders']}
                                                            placeholder="Select Job No..."
                                                            onChange={(e) => dropDownChange(e, 'job_id')}
                                                            selected={selectedJobOrder}
                                                            ref={register({
                                                                required: 'On text Field Required'
                                                            })}
                                                            maxHeight={100}
                                                            disabled={formData.job_id != null ? true : false}
                                                        />
                                                    </div>
                                                    <label className="col-sm-5 col-form-label required">Job Name</label>
                                                    <div className="col-md-7">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="job_name"
                                                            required
                                                            ref={register({
                                                                required: 'On text Field Required'
                                                            })}
                                                            onChange={inputChangeHandler}
                                                            value={formData.job_name ? formData.job_name : ''}
                                                            disabled={formData.job_name != '' ? true : false}
                                                        />
                                                    </div>
                                                    <label className="col-sm-5 col-form-label required">Remarks</label>
                                                    <div className="col-md-7">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="remarks"
                                                            required
                                                            ref={register({
                                                                required: 'On text Field Required'
                                                            })}
                                                            onChange={inputChangeHandler}
                                                            value={formData.remarks ? formData.remarks : ''}
                                                            disabled={formData.remarks != '' ? true : false}
                                                        />
                                                    </div>
                                                    <label className="col-sm-5 col-form-label required">Printer</label>
                                                    <div className="col-md-7">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="printer_id"
                                                            required
                                                            ref={register({
                                                                required: 'On text Field Required'
                                                            })}
                                                            onChange={inputChangeHandler}
                                                            value={formData.printer_name ? formData.printer_name : ''}
                                                            disabled={formData.printer_id != '' ? true : false}
                                                            
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 row">
                                                    <label className="col-sm-5 col-form-label required">Job Type</label>
                                                    <div className="col-md-7">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="job_type"
                                                            required
                                                            ref={register({
                                                                required: 'On text Field Required'
                                                            })}
                                                            onChange={inputChangeHandler}
                                                            value={formData.job_type ? formData.job_type : ''}
                                                            disabled={formData.job_type != '' ? true : false}
                                                        />
                                                    </div>
                                                    <label className="col-sm-5 col-form-label required">Printing Type</label>
                                                    <div className="col-md-7">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="printing_status"
                                                            required
                                                            ref={register({
                                                                required: 'On text Field Required'
                                                            })}
                                                            onChange={inputChangeHandler}
                                                            value={formData.printing_status ? formData.printing_status : ''}
                                                            disabled={formData.printing_status != '' ? true : false}
                                                        />
                                                    </div>
                                                    <label className="col-sm-5 col-form-label required">No of Cyl</label>
                                                    <div className="col-md-7">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="total_cylinder_qty"
                                                            required
                                                            ref={register({
                                                                required: 'On text Field Required'
                                                            })}
                                                            // onChange={inputChangeHandler}
                                                            value={formData.total_cylinder_qty ? formData.total_cylinder_qty : ''}
                                                            disabled={formData.total_cylinder_qty != '' ? true : false}
                                                        />
                                                    </div>
                                                    <label className="col-sm-5 col-form-label required">Color</label>
                                                    <div className="col-md-7">
                                                        <Typeahead
                                                            id="color"
                                                            multiple
                                                            name="color"
                                                            labelKey={option => `${option.name}`}
                                                            options={typeColorOptions}
                                                            placeholder="Select Color..."
                                                            onChange={(e) => dropDownChange(e, 'color')}
                                                            selected={typeColorOptions}
                                                            ref={register({
                                                                required: 'On text Field Required'
                                                            })}
                                                        // disabled={stateData.job_order_id != '' ? 'disabled' : ''}
                                                        disabled={formData.color != '' ? true : false}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div className="d-flex col-md-12 pl-0" >
                                        <div className="col-md-3">
                                            <fieldset className="border p-2">
                                                <legend className="w-auto text-left">Layout</legend>
                                                <div className="form-row">
                                                    <div className="col-md-12 row">
                                                    <label className="col-sm-5 col-form-label">Ref. Job No</label>
                                                        <div className="col-md-7">
                                                            {/* <input
                                                                type="text"
                                                                className="form-control"
                                                                name="job_no"
                                                                {...register("job_no")}
                                                                onChange={inputChangeHandler}
                                                                value={formData.job_no ? formData.job_no : ''}
                                                            /> */}
                                                            <select type="text"
                                                                className="form-control"
                                                                name="job_no"
                                                                {...register("job_no")}
                                                                onChange={inputChangeHandler}
                                                                value={formData.job_no ? formData.job_no : ''}>
                                                                    <option value='1'>JOB NO 1</option>
                                                                    <option value='2'>JOB NO 2</option>
                                                                    <option value='3'>JOB NO 3</option>
                                                            </select>
                                                        </div>
                                                        <label className="col-sm-5 col-form-label required">Layout ID</label>
                                                        <div className="col-md-7">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="layout_id"
                                                                required
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                onChange={inputChangeHandler}
                                                                value={formData.layout_id ? formData.layout_id : ''}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 row pl-0 pr-0">
                                                        <label className="col-sm-5 col-form-label" style={{whiteSpace: 'nowrap'}}>UPS</label>
                                                        <div className="col-md-7">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="ups"
                                                                required
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                onChange={inputChangeHandler}
                                                                value={formData.ups ? formData.ups : ''}
                                                                disabled={formData.ups != '' ?    true : false}
                                                            />
                                                        </div>
                                                        <label className="col-sm-5 col-form-label" style={{whiteSpace: 'nowrap'}}>Dia</label>
                                                        <div className="col-md-7">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="dia"
                                                                required
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                onChange={inputChangeHandler}
                                                                value={formData.dia ? formData.dia : ''}
                                                            />
                                                        </div>
                                                        <label className="col-sm-5 col-form-label" style={{whiteSpace: 'nowrap'}}>Eye mark</label>
                                                        <div className="col-md-7">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="eye_mark"
                                                                required
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                onChange={inputChangeHandler}
                                                                value={formData.eye_mark ? formData.eye_mark : ''}
                                                            />
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="col-md-6 row">
                                                        <label className="col-sm-5 col-form-label" style={{whiteSpace: 'nowrap'}}>RPT</label>
                                                        <div className="col-md-7">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="rpt"
                                                                required
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                onChange={inputChangeHandler}
                                                                value={formData.rpt ? formData.rpt : ''}
                                                                disabled={formData.rpt != '' ?    true : false}
                                                            />
                                                        </div>
                                                        <label className="col-md-9" style={{whiteSpace: 'nowrap'}}>Printer mark</label>
                                                        <div className="col-md-3">
                                                            <input
                                                                type="checkbox"
                                                                name="printer_mark"
                                                                required
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                onChange={inputChangeHandler}
                                                                value={formData.printer_mark ? formData.printer_mark : ''}
                                                            />
                                                        </div>
                                                        <label className="col-md-9" style={{whiteSpace: 'nowrap'}}>Complete</label>
                                                        <div className="col-md-3">
                                                            <input
                                                                type="checkbox"
                                                                className=""
                                                                name="mark_as_complete"
                                                                
                                                                required
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                onChange={inputChangeHandler}
                                                                value={formData.mark_as_complete ? formData.mark_as_complete : ''}
                                                            />
                                                        </div>
                                                        
                                                       
                                                    </div>
                                                    <div className="col-md-12 row">
                                                    <label className="col-md-5 col-form-label" style={{whiteSpace: 'nowrap'}}>Date time</label>
                                                        <div className="col-md-7">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="layout_date"
                                                                required
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                onChange={inputChangeHandler}
                                                                value={formData.layout_date}
                                                            />
                                                        </div>
                                                        <label className="col-md-5 col-form-label">Layout</label>
                                                        <div className="col-md-7">
                                                            <select className="form-control" name="	layout_id" id="	layout_id">
                                                                <option>opt 1</option>
                                                                <option>opt 2</option>
                                                                <option>opt 3</option>
                                                            </select>
                                                        </div>
                                                        <label className="col-sm-5 col-form-label">info</label>
                                                        <div className="col-md-7">
                                                            <select className="form-control" name="operator_info" id="operator_info" onChange={inputChangeHandler}>
                                                                <option>opt 1</option>
                                                                <option>opt 2</option>
                                                                <option>opt 3</option>
                                                            </select>
                                                        </div>
                                                        <label className="col-sm-5 col-form-label">Station</label>
                                                        <div className="col-md-7">
                                                            <select className="form-control" name="station" id="station" onChange={inputChangeHandler}>
                                                                <option>opt 1</option>
                                                                <option>opt 2</option>
                                                                <option>opt 3</option>
                                                            </select>
                                                        </div>
                                                        <label className="col-sm-5 col-form-label required">Remarks</label>
                                                        <div className="col-md-7">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="remarks"
                                                                required
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                onChange={inputChangeHandler}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                        <div className="col-md-3 pl-0">
                                            <fieldset className="border p-2">
                                                <legend className="w-auto text-left">Layout history</legend>
                                                <div className="col-md-12">
                                                    <table className="table table-bordered" style={{ width: '100%' }}>
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" width="15%">Date</th>
                                                                <th scope="col" width="20%">BCO</th>
                                                                <th scope="col" width="20%">Remarks</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td><input class="form-control" type="text" /></td>
                                                                <td><input class="form-control" type="text" name="job_no" /></td>
                                                                <td><input class="form-control" type="text" name="remarks" /></td>
                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                    <input type="file" className="form-control w-100" onChange={inputChangeHandler} name="history_image" id="history_image" />
                                                    <img src={uploadImage?.history_image} style={{width: '100%', height: '100%'}}/>
                                                </div>
                                            </fieldset>
                                        </div>
                                        <div className="col-md-3 pl-0">
                                            <fieldset className="border p-2">
                                                <legend className="w-auto text-left">Base</legend>
                                                <div className="form-row">
                                                    <div className="col-md-6 row">
                                                        <label className="col-sm-5 col-form-label">FL</label>
                                                        <div className="col-md-7">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="fl"
                                                                required
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                onChange={inputChangeHandler}
                                                                value={formData.fl ? formData.fl : ''}
                                                            />
                                                        </div>
                                                        <label className="col-sm-5 col-form-label" style={{whiteSpace:'nowrap'}}>D. Dia</label>
                                                        <div className="col-md-7">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="dia"
                                                                required
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                // onChange={inputChangeHandler}
                                                                value={formData.dia ? formData.dia : ''}
                                                            />
                                                        </div>
                                                        <label className="col-sm-5 col-form-label" style={{whiteSpace:'nowrap'}}>F. Dia</label>
                                                        <div className="col-md-7">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="final_dia"
                                                                required
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                onChange={inputChangeHandler}
                                                                value={formData.final_dia ? formData.final_dia : ''}
                                                            />
                                                        </div>

                                                    </div>
                                                    <div className="col-md-6 row">
                                                        <label className="col-sm-5 col-form-label" style={{whiteSpace:'nowrap'}}>D. Cir</label>
                                                        <div className="col-md-7">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="on_text"
                                                                required
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                // onChange={inputChangeHandler}
                                                                value={formData.cir ? formData.cir : ''}
                                                            />
                                                        </div>
                                                        <label className="col-sm-5 col-form-label" style={{whiteSpace:'nowrap'}}>F. Cir</label>
                                                        <div className="col-md-7">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="final_cir"
                                                                required
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                            onChange={inputChangeHandler}
                                                            value={formData.final_cir ? formData.final_cir : ''}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <fieldset className="border p-2">
                                                <legend className="w-auto text-left">Design</legend>
                                                <div className="form-row">
                                                    <div className="col-md-6 row">
                                                        <label className="col-sm-5 col-form-label required">H</label>
                                                        <div className="col-md-7">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="on_text"
                                                                required
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                            // onChange={inputChangeHandler}
                                                            // value={stateData.on_text ? stateData.on_text : ''}
                                                            />
                                                        </div>
                                                        <label className="col-sm-5 col-form-label required">W</label>
                                                        <div className="col-md-7">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="on_text"
                                                                required
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                            // onChange={inputChangeHandler}
                                                            // value={stateData.on_text ? stateData.on_text : ''}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 row">
                                                        <label className="col-sm-5 col-form-label required">H</label>
                                                        <div className="col-md-7">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="final_height"
                                                                required
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                            onChange={inputChangeHandler}
                                                            value={formData.final_height ? formData.final_height : ''}
                                                            />
                                                        </div>
                                                        <label className="col-sm-5 col-form-label required">W</label>
                                                        <div className="col-md-7">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="final_width"
                                                                required
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                            onChange={inputChangeHandler}
                                                            value={formData.final_width ? formData.final_width : ''}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                        <div className="col-md-3 pl-0 pr-0">
                                            <fieldset className="border p-1">
                                                <legend className="w-auto text-left">Engravers Order</legend>
                                                <div className="col-md-12 pl-0 pr-0">
                                                    <table className="table table-bordered pl-0 pr-0" style={{ width: '100%' }}>
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" width="10%">Sl</th>
                                                                <th scope="col" width="10%">Color</th>
                                                                <th scope="col" width="10%">Screen</th>
                                                                <th scope="col" width="10%">Angel</th>
                                                                <th scope="col" width="10%">Machine</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                typeColorOptions.map((item,index) => {
                                                                    return (
                                                                        <tr>
                                                                            <td><input className="form-control" type="text" value={item.id + 1} /></td>
                                                                            <td><input className="form-control" type="text" value={item.name} name="er_color_id" id="er_color_id" onChange={(e) => engOrderHandler(e, index)}/></td>
                                                                            <td><input className="form-control" type="text"  name="er_desired_screen" id="er_desired_screen" onChange={(e) =>engOrderHandler(e, index)} /></td>
                                                                            <td><input className="form-control" type="text"  name="er_desired_angle" id="er_desired_angle" onChange={(e) =>engOrderHandler(e, index)} /></td>
                                                                            <td><input className="form-control" type="text"  name="er_engraving_machine" id="er_engraving_machine" onChange={(e) =>engOrderHandler(e, index)} /></td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <fieldset className="border p-2">
                                            <legend className="w-auto text-left">Axial</legend>
                                            <div className="form-row">
                                                <div className="col-md-2 mb-3">
                                                    <label>L.Reg.Mark</label>
                                                    <div className="d-flex">
                                                        <div className="col-md-9 pl-0">
                                                            <input
                                                                className="form-control"
                                                                id="l_reg_mark"
                                                                name="l_reg_mark"
                                                                // required
                                                                type="number"
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                onChange={inputChangeHandler}
                                                                value={formData.l_reg_mark ? formData.l_reg_mark : ''}
                                                            />
                                                        </div>
                                                        <div className="col-md-3 pl-0">
                                                            <span>+</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-2 mb-3">
                                                    <label>L.FL.Cut</label>
                                                    <div className="d-flex">
                                                        <div className="col-md-9 pl-0">
                                                            <input
                                                                className="form-control"
                                                                id="l_fl_cut"
                                                                name="l_fl_cut"
                                                                // required
                                                                type="number"
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                onChange={inputChangeHandler}
                                                                value={formData.l_fl_cut ? formData.l_fl_cut : ''}
                                                            />
                                                        </div>
                                                        <div className="col-md-3 pl-0">
                                                            <span>+</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-1 mb-3">
                                                    <label>Design W.</label>
                                                    <div className="d-flex">
                                                        <div className="col-md-9 pl-0">
                                                            <input
                                                                className="form-control"
                                                                id="design_w"
                                                                name="design_w"
                                                                // required
                                                                type="number"
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                onChange={inputChangeHandler}
                                                                value={formData.design_w ? formData.design_w : ''}
                                                            />
                                                        </div>
                                                        <div className="col-md-3 pl-0">
                                                            <span>*</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-1 mb-3">
                                                    <label>UPS</label>
                                                    <div className="d-flex">
                                                        <div className="col-md-9 pl-0">
                                                            <input
                                                                className="form-control"
                                                                id="axial_ups"
                                                                name="axial_ups"
                                                                // required
                                                                type="number"
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                onChange={inputChangeHandler}
                                                                value={formData.axial_ups ? formData.axial_ups : ''}
                                                            />
                                                        </div>
                                                        <div className="col-md-3 pl-0">
                                                            <span>+</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-2 mb-3">
                                                    <label>R.Reg.Mark</label>
                                                    <div className="d-flex">
                                                        <div className="col-md-9 pl-0">
                                                            <input
                                                                className="form-control"
                                                                id="r_reg_mark"
                                                                name="r_reg_mark"
                                                                // required
                                                                type="number"
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                onChange={inputChangeHandler}
                                                                value={formData.r_reg_mark ? formData.r_reg_mark : ''}
                                                            />
                                                        </div>
                                                        <div className="col-md-3 pl-0">
                                                            <span>+</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-2 mb-3">
                                                    <label for="r_fl_cut">R.FL.Cut</label>
                                                    <div className="d-flex">
                                                        <div className="col-md-9 pl-0">
                                                            <input
                                                                className="form-control"
                                                                id="r_fl_cut"
                                                                name="r_fl_cut"
                                                                // required
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                type="number"
                                                                onChange={inputChangeHandler}
                                                                value={formData.r_fl_cut ? formData.r_fl_cut : ''}
                                                            />
                                                        </div>
                                                        <div className="col-md-3 pl-0">
                                                            <span>=</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-1 mb-3">
                                                    <label for="start_point">Start Point</label>
                                                    <div className="d-flex">
                                                        <div className="col-md-12 pl-0">
                                                            <input
                                                                className="form-control"
                                                                id="axl_start_point"
                                                                name="axl_start_point"
                                                                // required
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                type="number"
                                                                onChange={inputChangeHandler}
                                                                value={formData.axl_start_point}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-1 mb-3">
                                                    <label for="image_area">Image Area</label>
                                                    <div className="d-flex">
                                                        <div className="col-md-12 pl-0">
                                                            <input
                                                                className="form-control"
                                                                id="axl_image_area"
                                                                name="axl_image_area"
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                type="number"
                                                                onChange={inputChangeHandler}
                                                                value={formData.axl_image_area}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </fieldset>
                                    </div>

                                    {/* {isBase == true ? (<Base inputChangeHandler={inputChangeHandler} formData={formData} typeColorOptions = {typeColorOptions}/>) : ("")
                                    } */}
                                    <SubmitButton link="designLayout/index" menuId={menuId} />
                                </form>
                            </>
                        </div>
                    </div>

                </div>
            </div>
        </Fragment>
    )
}
export default Add;