import React, { Fragment, useState, useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SubmitButton } from '../../common/GlobalButton';
import { JOB_AGREEMENT_RSURL, JOB_ORDER_DETAILS } from '../../../api/userUrl';
import { userGetMethod, userPostMethod } from '../../../api/userAction';
import useForm from "react-hook-form";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const Edit = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [dropdownData, setDropdownData] = useState({});
    const [typeheadOptions, setTypeheadOptions] = useState({});

    let [jobAgreementInput, setJobAgreementInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            agreement_date     : '',
            client_id          : '',
            cyl_rate_status    : '',
            fixed_amount       : '',
            job_sub_class_id   : '',
            marketing_person_id: '',
            printer_id         : '',
            printer_mark       : '',
            vat                : '',

            job_name           : '',
            printer_name       : '',
            // printer_mark       : '',
            marketing_p_name   : '',
            // cyl_rate_status    : '',
            per_square_amount  : 0,
            vat_status         : '',

        }
    );
    const jobAgreementId = props.match.params.id;
    console.log('jobAgreementId', jobAgreementId);
    useEffect(() => {
        userGetMethod(`${JOB_AGREEMENT_RSURL}/${jobAgreementId}/edit`)
            .then(response => {
                console.log('response.data.jobAgreement', response.data);
                let {agreement_date, client_id, cyl_rate_status, fixed_amount, job_sub_class_id, marketing_person_id, printer_id, printer_mark, job_name, printer_name, marketing_p_name, vat} = response.data.jobAgreement;

                setJobAgreementInput({
                    agreement_date,
                    client_id,
                    cyl_rate_status,
                    fixed_amount,
                    job_sub_class_id,
                    marketing_person_id,
                    printer_id,
                    printer_mark,
                    job_name,
                    printer_name,
                    marketing_p_name,
                    vat
                });
                
                // FOR JOB ORDER
                let jobOrderOptions = [];
                if (response.data.jobOrders && response.data.jobOrders.length > 0) {
                    response.data.jobOrders.map(order => 
                    {
                        let jobOrderObj = {};
                        jobOrderObj.id = order.id;
                        jobOrderObj.name = `[${order.job_no}] ` + order.job_name;
                        jobOrderOptions.push(jobOrderObj);
                        console.log('job_sub_class_id === order.id', response.data.jobAgreement.job_sub_class_id);
                        if (job_sub_class_id === order.id) {
                            console.log('fsdlkfksdfj');
                            setJobAgreementInput({
                                'job_sub_class_id': [jobOrderObj]
                            })
                        }
                    })
                }
                setTypeheadOptions(
                    (prestige) => ({
                        ...prestige,
                        ['job_orders']: jobOrderOptions,
                    })
                );

                setIsLoading(false);
            });
    },[]);

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
                    let { job_name, printer_name, printer_mark, marketing_p_name, cyl_rate_status, per_square_amount, vat_status} = response.data.jobOrderDetails;
                    setJobAgreementInput({
                        'job_name'         : job_name,
                        'printer_name'     : printer_name,
                        'printer_mark'     : printer_mark,
                        'marketing_p_name' : marketing_p_name,
                        'cyl_rate_status'  : cyl_rate_status,
                        'per_square_amount': per_square_amount,
                        'vat_status'       : vat_status
                    });
                });
        } 
    }

    const calculateFormValue = (event) => {
        setJobAgreementInput(
            {[event.target.name] : event.target.value},
        );
    }

    const submitHandler = (data, e) => {
        data.client_id = dropdownData.client_id;
        data.job_sub_class_id = dropdownData.job_sub_class_id;
        data.marketing_person_id = dropdownData.marketing_person_id;
        data.printer_id = dropdownData.printer_id;
        console.log("data", data);
        // userPostMethod(JOB_AGREEMENT_RSURL, data)
        //     .then(response => {
                
        //         if (response.data.status == 1) {
        //             toast.success(response.data.message)
        //             e.target.reset();
        //         } else {
        //             toast.error(response.data.message)
        //         }
        //     })
        // .catch(error => toast.error(error))
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
                                <h5>Job Agreement Update</h5>
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
                                                    <label className="col-sm-4 col-form-label required" htmlFor="agreement_date">Agreement Date</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control" 
                                                            id="agreement_date" 
                                                            name="agreement_date" 
                                                            type="date" 
                                                            placeholder="Agreement Date" 
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
                                                            selected={jobAgreementInput.job_order_id}
                                                            ref={register({
                                                                required: 'Job No Field Required'
                                                            })}
                                                        />
                                                        {errors.job_order_id && <p className='text-danger'>{errors.job_order_id.message}</p>}
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label required" htmlFor="cyl_rate_status">Cyl Rate Status</label>
                                                    <div className="col-sm-8">
                                                        <select className="form-control" required ref={register}  id="cyl_rate_status" name="cyl_rate_status"
                                                            ref={register({
                                                                required: 'Cyl Rate Status Field Required'
                                                            })} >
                                                            <option value=""> Select One </option>
                                                            <option selected={jobAgreementInput.cyl_rate_status == 1 ? true : false} value="1">Per Cylinder</option>
                                                            <option selected={jobAgreementInput.cyl_rate_status == 2 ? true : false} value="2">Per Sqr cm</option>
                                                            <option selected={jobAgreementInput.cyl_rate_status == 3 ? true : false} value="3">Per Sqr inch</option>
                                                        </select>
                                                        {errors.cyl_rate_status && <p className='text-danger'>{errors.cyl_rate_status.message}</p>}
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label required" htmlFor="fixed_amount">Rate</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control" 
                                                            id="fixed_amount" 
                                                            name="fixed_amount" 
                                                            type="text" 
                                                            placeholder="Rate" 
                                                            value={jobAgreementInput.fixed_amount}
                                                            ref={register({
                                                                required: 'Rate Field Required'
                                                            })}
                                                        />
                                                        {errors.fixed_amount && <p className='text-danger'>{errors.fixed_amount.message}</p>}
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label required" htmlFor="vat">Vat</label>
                                                    <div className="col-sm-8">
                                                        <div className="input-group">
                                                            <input 
                                                            className="form-control" 
                                                            id="vat" 
                                                            name="vat" 
                                                            type="text" 
                                                            // placeholder="Vat" 
                                                            aria-label="Vat"
                                                            value={jobAgreementInput.vat}
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

                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label required" htmlFor="printer_mark">Printer Mark</label>
                                                    <div className="col-sm-8">
                                                        <select className="form-control" required ref={register}  id="printer_mark" name="printer_mark"
                                                            ref={register({
                                                                required: 'Printer Mark Field Required'
                                                            })} >
                                                            <option> Select One </option>
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
                                                                <td align="right">Printer Name</td>
                                                                <td>:</td>
                                                                <td>{jobAgreementInput.printer_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right">Email</td>
                                                                <td>:</td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right">Marketing By</td>
                                                                <td>:</td>
                                                                <td>{jobAgreementInput.marketing_p_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right">Reply</td>
                                                                <td>:</td>
                                                                <td></td>
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

export default Edit;