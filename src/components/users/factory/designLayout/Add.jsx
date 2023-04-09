import React, { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import useForm from "react-hook-form";
import 'react-bootstrap-typeahead/css/Typeahead.css';

import Layout from "./Layout";
import Base from "./Base";

import { PanelRefreshIcons, SubmitButton } from "../../../common/GlobalButton";
import { Typeahead } from 'react-bootstrap-typeahead';
import { JOB_ORDER_DETAILS,DESIGN_LAYOUT_RSURL } from "../../../../api/userUrl";
import { userGetMethod } from "../../../../api/userAction";

const Add = (props) => {
    const { handleSubmit, register, errors, reset } = useForm();
    const [isLayout, setIsLayout] = useState(true);
    const [isBase, setIsBase] = useState(false);
    const [typeheadOptions, setTypeheadOptions] = useState({ job_orders : [], });
    const [formData, setFormData] = useState({
        agreement_date      : new Date().toLocaleDateString(),
        bill_config_status  : '',
        cir                 : '',
        client_email        : '',
        client_id           : '',
        client_name         : '',
        cyl_rate_status     : '',
        dia                 : '',
        entry_date          : '',
        fl                  : '',
        id                  : '',
        job_name            : '',
        job_no              : '',
        job_type            : '',
        limit_square_cm     : '',
        marketing_p_name    : '',
        printer_id          : '',
        printer_mark        : '',
        printer_name        : '',
        total_cylinder_qty  : '',
        total_surface_area  : '',
        vat_status          : '',
        remarks             : '',
        ups                 : ''
    });
    const [dropdownData, setDropdownData] = useState({});
    const [typeColorOptions,setTypeColorOptions] = useState([]);
    
    let job_order_id = props.location.state.params.job_order_id ? props.location.state.params.job_order_id : null;
    console.log(props);
    useEffect(() => {
        pageRefreshHandler(job_order_id);
    },[])
    const  pageRefreshHandler = (job_order_id = null) => {
        console.log("clicked");
        // setIsLoading(true);
        userGetMethod(`${DESIGN_LAYOUT_RSURL}/create?job_order_id=${job_order_id}`)
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
                            'job_order_id': [jobOrderObj]
                        })
                    }
                    dropDownChange([{id : response.data.jobOrder.id}], 'job_order_id');
                }
                if (response.data.jobOrders && response.data.jobOrders.length > 0) {
                    response.data.jobOrders.map(order => 
                    {
                        let jobOrderObj = {};
                        jobOrderObj.id = order.id;
                        jobOrderObj.name = `[${order.job_no}] ` + order.job_name;
                        jobOrderOptions.push(jobOrderObj);
                        
                    })
                }
                setTypeheadOptions({...typeheadOptions, ['job_orders']: jobOrderOptions,})

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
        setFormData({...formData,[e.target.name] : e.target.value});
    }
    useEffect(() => {
        if (formData.l_reg_mark && formData.l_fl_cut && formData.design_width && formData.ups && formData.r_reg_mark && formData.r_fl_cut) {
            setFormData({ ...formData, "start_point": (+formData.l_reg_mark) + (+formData.l_fl_cut) + ((+formData.design_width) * (+formData.ups)) + (+formData.r_reg_mark) + (+formData.r_fl_cut) })
        }
    }, [
        formData?.l_reg_mark,
        formData?.l_fl_cut,
        formData?.design_width,
        formData?.ups,
        formData?.r_reg_mark,
        formData?.r_fl_cut
    ])
    console.log(formData);

    const dropDownChange = (event, stateName) => {
        if(event.length > 0){
            const selectedValue = event[0].id;
            setDropdownData(
                (prevstate) => ({
                    ...prevstate,
                    [stateName]: selectedValue,
                })
            );
            userGetMethod(`${JOB_ORDER_DETAILS}?jobOrderId=${selectedValue}`)
                .then(response => {
                    let { agreement_date,
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
                        ups} = response.data.jobOrderDetails;
                    setFormData({
                        'agreement_date'    : agreement_date,
                        'bill_config_status': bill_config_status,
                        'cir'               : cir,
                        'client_email'      : client_email,
                        'client_id'         : client_id,
                        'client_name'       : client_name,
                        'cyl_rate_status'   : cyl_rate_status,
                        'dia'               : dia,
                        'entry_date'        : entry_date,
                        'fl'                : fl,
                        'id'                : id,
                        'job_name'          : job_name,
                        'job_no'            : job_no,
                        'job_type'          : job_type,
                        'limit_square_cm'   : limit_square_cm,
                        'marketing_p_name'  : marketing_p_name,
                        'printer_id'        : printer_id,
                        'printer_mark'      : printer_mark,
                        'printer_name'      : printer_name,
                        'total_cylinder_qty': total_cylinder_qty,
                        'total_surface_area': total_surface_area,
                        'vat_status'        : vat_status,
                        'remarks'           : remarks,
                        'ups'               : ups
                    });
                    setTypeColorOptions(response.data.colors);
                    if(response.data.colors.length > 0) {
                        let colorOptions = [];
                        response.data.colors.map((item, index) => {
                            let colorObj = {};
                            colorObj.id = index;
                            colorObj.name = item.color_name;
                            colorOptions.push(colorObj);
                        })
                        setTypeColorOptions(colorOptions);
                    }
                });
        } 
    }
    console.log(formData);
    console.log(typeColorOptions);

    var menuId = 0;
    if (props.location.state === undefined) {
        menuId = 0;
    } else {
        menuId = props.location.state.params.menuId;
    }

    const onSubmit  = (data, e) => {
        console.log(data);
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
                                                    <label className="col-sm-5 col-form-label required" htmlFor="job_order_id">Job No</label>
                                                    <div className="col-md-7">
                                                        <Typeahead
                                                            // className="form-control"
                                                            id="job_order_id"
                                                            name="job_order_id"
                                                            labelKey={option => `${option.name}`}
                                                            options={typeheadOptions['job_orders']}
                                                            placeholder="Select Job No..."
                                                            onChange={(e) => dropDownChange(e, 'job_order_id')}
                                                            ref={register({
                                                                required: 'On text Field Required'
                                                            })}
                                                        // disabled={stateData.job_order_id != '' ? 'disabled' : ''}
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
                                                        // onChange={inputChangeHandler}
                                                         value={formData.remarks ? formData.remarks : ''}
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
                                                        // onChange={inputChangeHandler}
                                                            value={formData.printer_name ? formData.printer_name : ''}
                                                        />
                                                    </div>
                                                    <label className="col-sm-5 col-form-label required">Reference</label>
                                                    <div className="col-md-7">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="reference_job"
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
                                                        // onChange={inputChangeHandler}
                                                        value = {formData.job_type ? formData.job_type : ''}
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
                                                        // onChange={inputChangeHandler}
                                                        // value={stateData.on_text ? stateData.on_text : ''}
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
                                                            // onChange={(e) => dropDownChange(e, 'color')}
                                                            selected={typeColorOptions}
                                                            ref={register({
                                                                required: 'On text Field Required'
                                                            })}
                                                        // disabled={stateData.job_order_id != '' ? 'disabled' : ''}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div className="col-md-12 d-flex">
                                        <div className="span-base col-md-6"
                                            style={{
                                                background: isLayout == true ? "#4466f2" : "",
                                                color: "white",
                                                height: "30px"
                                            }}>
                                            <a href="javascript:void(0)" onClick={() => toogleLtoB("layout")} className="pe-auto  f-20">
                                                <div className="col-md-12 text-center">
                                                    <p style={{ color: isLayout == true ? "white" : "black", fontSize: '20px', }}>Layout</p>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="span-base col-md-6"
                                            style={{
                                                background: isBase == true ? "#4466f2" : "",
                                                color: "white",
                                                height: "30px"
                                            }}>
                                            <a href="javascript:void(0)" onClick={() => toogleLtoB("base")} className="pe-auto f-20">
                                                <div className="col-md-12 text-center">
                                                    <p style={{ color: isBase == true ? "white" : "black", fontSize: '20px' }}>Base</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    {isLayout == true ? (<Layout inputChangeHandler={inputChangeHandler} formData={formData}/>) : ("")
                                    }
                                    {isBase == true ? (<Base inputChangeHandler={inputChangeHandler} formData={formData} typeColorOptions = {typeColorOptions}/>) : ("")
                                    }
                                    <SubmitButton link="designLayout/index" menuId={ menuId }/>
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