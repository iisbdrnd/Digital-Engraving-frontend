import React, { Fragment, useState, useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SubmitButton } from '../../common/GlobalButton';
import { JOB_AGREEMENT_RSURL, JOB_ORDER_DETAILS } from '../../../api/userUrl';
import { userGetMethod, userPostMethod } from '../../../api/userAction';
import { PanelRefreshIcons } from '../../common/GlobalButton';
import useForm from "react-hook-form";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const Add = (props) => {
    const { handleSubmit, register, errors,reset } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [dropdownData, setDropdownData] = useState({});
    const [typeheadOptions, setTypeheadOptions] = useState({});
    const [jobNoValue, setJobNoValue] = useState([]);

    let [jobAgreementInput, setJobAgreementInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            agreement_date   : new Date().toLocaleDateString(),
            job_name         : '',
            printer_name     : '',
            client_email     : '',
            bill_config_type : '',
            printer_mark     : '',
            marketing_p_name : '',
            cyl_rate_status  : '',
            limit_square_cm  : 0,
            vat_status       : '',
            job_order_id     : '',
            job_type         : '',
            surface_area     : '',
            fixed_amount     : '',
            per_square_amount: '',
        }
    );
    
    let job_order_id = props.location.state.params.job_order_id ? props.location.state.params.job_order_id : null;

    useEffect(() => {
        pageRefreshHandler(job_order_id);
    },[]);

    const pageRefreshHandler = (job_order_id = null) => {
        setIsLoading(true);
        userGetMethod(`${JOB_AGREEMENT_RSURL}/create?job_order_id=${job_order_id}`)
            .then(response => {
                // FOR JOB ORDER
                let jobOrderOptions = [];
                if (response.data.jobOrder) {
                    let jobOrderObj = {};
                    jobOrderObj.id = response.data.jobOrder.id;
                    jobOrderObj.name = `[${response.data.jobOrder.job_no}] ` + response.data.jobOrder.job_name;
                    jobOrderOptions.push(jobOrderObj);

                    if (response.data.jobOrder != null) { 
                        setJobAgreementInput({
                            'job_order_id': [jobOrderObj]
                        })
                    }
                    setJobNoValue([...jobNoValue,jobOrderObj]);
                    dropDownChange([{id : job_order_id}], 'job_order_id');
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
                setTypeheadOptions(
                    (prevstate) => ({
                        ...prevstate,
                        ['job_orders']: jobOrderOptions,
                    })
                );

                setIsLoading(false);
            });
    }

    const dropDownChange = (event, stateName) => {
        if(stateName === 'job_order_id' && event[0]?.name){
            setJobNoValue(event);
        }
        if(event.length > 0 ){
            var selectedValue;
            if (event.length > 0) {
                selectedValue = event[0].id;
            } else {
                selectedValue = event.id;
            }
            setDropdownData(
                (prevstate) => ({
                    ...prevstate,
                    [stateName]: selectedValue,
                })
            );

            userGetMethod(`${JOB_ORDER_DETAILS}?jobOrderId=${selectedValue}`)
                .then(response => {
                    let { job_name, fixed_amount,per_square_amount,surface_area, job_type, printer_name, client_email, bill_config_type, printer_mark, marketing_p_name, cyl_rate_status, limit_square_cm, vat_status} = response.data.jobOrderDetails;
                    setJobAgreementInput({
                        'job_name'         : job_name,
                        'printer_name'     : printer_name,
                        'client_email'     : client_email,
                        'bill_config_type' : bill_config_type,
                        'printer_mark'     : printer_mark,
                        'marketing_p_name' : marketing_p_name,
                        'cyl_rate_status'  : cyl_rate_status,
                        'limit_square_cm'  : limit_square_cm,
                        'vat_status'       : vat_status,
                        'job_type'         : job_type,
                        'surface_area'     : surface_area,
                        'fixed_amount'     : fixed_amount,
                        'per_square_amount'  : per_square_amount,
                    });
                });
        } 
    }
    console.log(jobAgreementInput);

    const calculateFormValue = (event) => {
        setJobAgreementInput(
            {[event.target.name] : event.target.value},
        );
    }

    const submitHandler = (data, e) => {
        data.job_order_id = dropdownData.job_order_id;
        userPostMethod(JOB_AGREEMENT_RSURL, data)
            .then(response => {
                if (response.data.status == 1) {
                    toast.success(response.data.message)
                    clearForm();
                    e.target.reset();
                } else {
                    toast.error(response.data.message)
                }
            })
        .catch(error => toast.error(error))
    }
    const clearForm = () => {
        setJobNoValue([]);
        setJobAgreementInput({
            'job_name': '',
            'printer_name': '',
            'client_email': '',
            'marketing_p_name': '',
            'limit_square_cm': 0,
            'job_type': '',
            'surface_area' : '',
            'fixed_amount'     : '',
            'per_square_amount'  : '',
        });
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
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5>Job Agreement Create</h5>
                                    </div>
                                    <div className="col-md-6">
                                        <PanelRefreshIcons panelRefresh={pageRefreshHandler} />
                                    </div>
                                </div>
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
                                                    <label className="col-sm-4 col-form-label" htmlFor="agreement_date">Agreement Date</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control" 
                                                            id="agreement_date" 
                                                            name="agreement_date"
                                                            required 
                                                            type="text" 
                                                            readOnly={'readonly'}
                                                            value={jobAgreementInput.agreement_date}
                                                            ref={register({
                                                                required: 'Agreement Date Field Required'
                                                            })}
                                                        />
                                                        {errors.agreement_date && <p className='text-danger'>{errors.agreement_date.message}</p>}
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label required" htmlFor="job_order_id">Job No</label>
                                                    <div className="col-sm-8">
                                                        <Typeahead
                                                            id="job_order_id"
                                                            name="job_order_id"
                                                            labelKey={option => `${option.name}`}
                                                            options={typeheadOptions['job_orders']}
                                                            placeholder="Select Job No..."
                                                            onChange={(e) => dropDownChange(e, 'job_order_id')}
                                                            inputProps={{ required: true }}
                                                            selected={jobNoValue}
                                                            disabled={job_order_id != null ? 'disabled' : ''}
                                                            {...register('job_order_id')}
                                                        />
                                                        {errors.job_order_id && <p className='text-danger'>{errors.job_order_id.message}</p>}
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label required" htmlFor="cyl_rate_status">Cyl Rate Status</label>
                                                    <div className="col-sm-8">
                                                        <select className="form-control" required id="cyl_rate_status" name="cyl_rate_status"
                                                            ref={register({
                                                                required: 'Cyl Rate Status Field Required'
                                                            })}
                                                            disabled = {jobAgreementInput?.job_type == "Redo" ? true : false}
                                                            defaultValue=''>
                                                            <option value=''>Select One</option>
                                                            <option selected={(jobAgreementInput.cyl_rate_status == 1 && jobAgreementInput?.job_type != "Redo") ? true : false} value="1">Per Cylinder</option>
                                                            <option selected={(jobAgreementInput.cyl_rate_status == 2 && jobAgreementInput?.job_type != "Redo") ? true : false} value="2">Per Sqr cm</option>
                                                            <option selected={(jobAgreementInput.cyl_rate_status == 3 && jobAgreementInput?.job_type != "Redo") ? true : false} value="3">Per Sqr inch</option>
                                                            <option selected={(jobAgreementInput?.job_type == "Redo") ? true : false} value="N/A">Not Applicable</option>
                                                        </select>
                                                        {errors.cyl_rate_status && <p className='text-danger'>{errors.cyl_rate_status.message}</p>}
                                                    </div>
                                                </div>
                                                {jobAgreementInput?.job_type == "Redo" && (<>
                                                    <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="fixed_amount">Fixed Amount</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control" 
                                                            id="fixed_amount" 
                                                            name="fixed_amount"
                                                            type="text" 
                                                            placeholder="Fixed amount" 
                                                            value={"0"}
                                                            readOnly
                                                            ref={register({
                                                                required: 'Fixed Amount Field Required'
                                                            })}
                                                        />
                                                        {errors.limit_square_cm && <p className='text-danger'>{errors.limit_square_cm.message}</p>}
                                                    </div>
                                                </div>
                                                </>)}

                                                {jobAgreementInput?.job_type != "Redo" && (<>
                                                {jobAgreementInput.cyl_rate_status == 3 && (<div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="limit_square_cm">Sqr Limit</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control" 
                                                            id="limit_square_cm" 
                                                            name="limit_square_cm"
                                                            required 
                                                            type="text" 
                                                            placeholder="Sqr Limit" 
                                                            value={jobAgreementInput.limit_square_cm}
                                                            onChange={calculateFormValue}
                                                            readOnly={jobAgreementInput.bill_config_type == 2 ? 'readonly' : '' }
                                                            ref={register({
                                                                required: 'Sqr Limit Field Required'
                                                            })}
                                                        />
                                                        {errors.limit_square_cm && <p className='text-danger'>{errors.limit_square_cm.message}</p>}
                                                    </div>
                                                </div>)}
                                                {jobAgreementInput.cyl_rate_status == 1 &&(
                                                    <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="fixed_amount">Fixed Amount</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control" 
                                                            id="fixed_amount" 
                                                            name="fixed_amount"
                                                            required 
                                                            type="text" 
                                                            placeholder="Sqr Limit" 
                                                            value={jobAgreementInput.fixed_amount}
                                                            readOnly
                                                            // onChange={calculateFormValue}
                                                            // readOnly={jobAgreementInput.bill_config_type == 2 ? 'readonly' : '' }
                                                            ref={register({
                                                                required: 'Fixed Amount Field Required'
                                                            })}
                                                        />
                                                        {errors.limit_square_cm && <p className='text-danger'>{errors.limit_square_cm.message}</p>}
                                                    </div>
                                                </div>
                                                )}
                                                {jobAgreementInput.cyl_rate_status == 2 &&(<>
                                                    <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="limit_square_cm">Sqr Limit</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control" 
                                                            id="limit_square_cm" 
                                                            name="limit_square_cm"
                                                            required 
                                                            type="text" 
                                                            placeholder="Sqr Limit" 
                                                            value={jobAgreementInput.limit_square_cm}
                                                            onChange={calculateFormValue}
                                                            readOnly={jobAgreementInput.bill_config_type == 2 ? 'readonly' : '' }
                                                            ref={register({
                                                                required: 'Sqr Limit Field Required'
                                                            })}
                                                        />
                                                        {errors.limit_square_cm && <p className='text-danger'>{errors.limit_square_cm.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="per_square_amount">Per Sq Amount</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control" 
                                                            id="per_square_amount" 
                                                            name="per_square_amount"
                                                            required 
                                                            type="text" 
                                                            placeholder="per_square_amount" 
                                                            value={jobAgreementInput.per_square_amount}
                                                            readOnly
                                                            // onChange={calculateFormValue}
                                                            // readOnly={jobAgreementInput.bill_config_type == 2 ? 'readonly' : '' }
                                                            ref={register({
                                                                required: 'Fixed Amount Field Required'
                                                            })}
                                                        />
                                                        {errors.per_square_amount && <p className='text-danger'>{errors.per_square_amount.message}</p>}
                                                    </div>
                                                </div>
                                                </>)}
                                                {
                                                    jobAgreementInput.vat_status == 0 ?
                                                    (
                                                        <div className="form-group row">
                                                            <label className="col-sm-4 col-form-label" htmlFor="vat">Vat</label>
                                                            <div className="col-sm-8">
                                                                <div className="input-group">
                                                                    <input 
                                                                        className="form-control" 
                                                                        id="vat" 
                                                                        name="vat" 
                                                                        type="text" 
                                                                        // placeholder="Vat" 
                                                                        aria-label="Vat"
                                                                        disabled={'disabled'}
                                                                        ref={register({})}
                                                                    />
                                                                    <div className="input-group-append">
                                                                        <span className="input-group-text">
                                                                            <i className="fa fa-percent"></i>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        <div className="form-group row">
                                                            <label className="col-sm-4 col-form-label" htmlFor="vat">Vat</label>
                                                            <div className="col-sm-8">
                                                                <div className="input-group">
                                                                    <input 
                                                                        className="form-control" 
                                                                        id="vat" 
                                                                        name="vat"
                                                                        required 
                                                                        type="text" 
                                                                        // placeholder="Vat" 
                                                                        aria-label="Vat"
                                                                        ref={register({
                                                                            required: 'Vat Field Required'
                                                                        })}
                                                                    />
                                                                    <div className="input-group-append">
                                                                        <span className="input-group-text">
                                                                            <i className="fa fa-percent"></i>
                                                                        </span>
                                                                    </div>

                                                                    {errors.vat && <p className='text-danger'>{errors.vat.message}</p>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                </>)}
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label required" htmlFor="printer_mark">Printer Mark</label>
                                                    <div className="col-sm-8">
                                                        <select className="form-control" required id="printer_mark" name="printer_mark"
                                                            ref={register({
                                                                required: 'Printer Mark Field Required'
                                                            })}
                                                            defaultValue=''>
                                                            <option value=''>Select One</option>
                                                            <option selected={jobAgreementInput.printer_mark == 'Yes' ? true : false} value="Yes">Yes</option>
                                                            <option selected={jobAgreementInput.printer_mark == 'No' ? true : false} value="No">No</option>
                                                        </select>
                                                        {errors.printer_mark && <p className='text-danger'>{errors.printer_mark.message}</p>}
                                                    </div>
                                                </div>

                                            </fieldset>
                                        </div>

                                        <div className="col-md-6">
                                            <pre className="helper-classes m-t-10">
                                                <div className="table-responsive display-div">
                                                    <table className="table table-bordernone">
                                                        <tbody>
                                                            <tr>
                                                                <td width="20%" align="right">Job Name</td>
                                                                <td width="5%">:</td>
                                                                <td width="75%">{jobAgreementInput.job_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right">Job Type</td>
                                                                <td>:</td>
                                                                <td>{jobAgreementInput.job_type}</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right">Surface Area</td>
                                                                <td>:</td>
                                                                <td>{jobAgreementInput.surface_area}</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right">Printer Name</td>
                                                                <td>:</td>
                                                                <td>{jobAgreementInput.printer_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right">Client Email</td>
                                                                <td>:</td>
                                                                <td>{jobAgreementInput.client_email}</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right">Marketing By</td>
                                                                <td>:</td>
                                                                <td>{jobAgreementInput.marketing_p_name}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </pre>
                                        </div>
                                    </div>

                                    <SubmitButton link="jobAgreement/index" menuId={ menuId } />
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

export default Add;