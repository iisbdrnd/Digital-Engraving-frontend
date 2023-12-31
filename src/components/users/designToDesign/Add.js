import React, { Fragment, useState, useEffect, useReducer } from 'react';
import useForm from "react-hook-form";
import { SubmitButton } from '../../common/GlobalButton';
import { userGetMethod, userPostMethod } from '../../../api/userAction';
import { DESIGN_TO_DESIGN_RSURL, GET_JOB_ORDER_DETAILS, JOB_ORDER_DETAILS } from '../../../api/userUrl';
import { Typeahead } from 'react-bootstrap-typeahead';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { placeHolderText } from '../../common/GlobalComponent';
import { trStyleNormal } from '../jobAgreement/Create';

const Add = (props) => {
    const { handleSubmit, register, errors } = useForm();

    const [isLoading, setIsLoading] = useState(true);
    const [resource, setResource] = useState(false);
    const [status, setStatus] = useState(true);
    const [typeHeadOptions, setTypeHeadOptions] = useState({

    });
    const [dropDownData, setDropdownData] = useState();
    const [jobNumberText,setJobNumberText] = useState('')
    const [jobNoValue,setJobNoValue] = useState([]);
    // const [jobAgreementInput,setJobAgreementInput] = useState({})

    let [jobAgreementInput, setJobAgreementInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            send_date        : new Date().toLocaleDateString(),
            job_name          : '',
            printer_name      : '',
            limit_square_cm   : 0,
            job_order_id      : '', 
            client_name       : '',
            total_cylinder_qty: ''
        }
    );

    var menuId = 0;
    if (props.location.state === undefined) {
        menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }

    let job_order_id = props.location.state.params.job_order_id ? props.location.state.params.job_order_id : null;
    console.log(job_order_id);

    useEffect(()=>{

       if (job_order_id) {
        userGetMethod(`${JOB_ORDER_DETAILS}?jobOrderId=${job_order_id}?`)
                .then(response => {
                    let { job_name, printer_name, printer_mark, total_cylinder_qty, client_name} = response.data.jobOrderDetails;

                    const value ={
                        id:response.data.jobOrderDetails.id,
                        name: `${response.data.jobOrderDetails.job_no}` + response.data.jobOrderDetails.job_name
                    }
                    setJobNoValue([value]);
                    setDropdownData(
                        (prevstate) => ({
                            ...prevstate,
                            ['job_order_id']: value,
                        })
                    );
                    setJobAgreementInput({
                        'job_name'          : job_name,
                        'printer_name'      : printer_name,
                        'printer_mark'      : printer_mark,
                        'client_name'       : client_name,
                        'total_cylinder_qty': total_cylinder_qty
                    });
                    setTypeHeadOptions(
                        (prevstate) => ({
                            ...prevstate,
                            ['job_orders']: jobNoValue,
                        })
                    );
                    setIsLoading(false)
                });
       }
// console.log(jobNoValue)

        // if (!job_order_id) {
        //     userGetMethod(`${GET_JOB_ORDER_DETAILS}?searchText=${jobNumberText}`)
        //     .then(response => {
        //         console.log('response', response.data);
        //         // FOR JOB ORDER
        //         let jobOrderOptions = [];
        //         if (response.data.jobOrderDetails) {
        //             console.log('response.data.jobOrder', response.data.jobOrderDetails);
        //             response.data.jobOrderDetails.map(data =>{
        //                 let jobOrderObj = {};
        //             jobOrderObj.id = data.id;
        //             jobOrderObj.name = `[${data.job_no}] ` + data.job_name;
        //             jobOrderOptions.push(jobOrderObj);

        //             if (response.data.jobOrder != null) { 
        //                 setJobAgreementInput({
        //                     'job_order_id': [jobOrderObj]
        //                 })
        //             }
        //             setJobNoValue([jobOrderObj]);
        //             dropDownChange([{id : response.data.jobOrder.id}], 'job_order_id');
        //             })
                    
        //         }
        //         if (response.data.jobOrderDetails && response.data.jobOrderDetails.length > 0) {
        //             response.data.jobOrderDetails.map(order => 
        //             {
        //                 let jobOrderObj = {};
        //                 jobOrderObj.id = order.id;
        //                 jobOrderObj.name = `[${order.job_no}] ` + order.job_name;
        //                 jobOrderOptions.push(jobOrderObj);
        //             })
        //         }
        //         setTypeHeadOptions(
        //             (prevstate) => ({
        //                 ...prevstate,
        //                 ['job_orders']: jobOrderOptions,
        //             })
        //         );

        //         setIsLoading(false);
        //     });
        // }

       if (!job_order_id) {
        setTypeHeadOptions(
                        (prevstate) => ({
                            ...prevstate,
                            ['job_orders']: [],
                        })
                    );
                    setIsLoading(false)
       }

    }, []);


    // console.log(typeHeadOptions);

    const dropDownChange = (e, fieldName) => {
        if(fieldName === 'job_order_id' && e[0].name){
            setJobNoValue(e);
            // console.log(setJobNoValue);
        }
        if(e.length > 0){
            const selectedValueId = e[0].id;
            console.log(selectedValueId);
            setDropdownData(
                (prevstate) => ({
                    ...prevstate,
                    [fieldName]: selectedValueId,
                })
            );

            userGetMethod(`${JOB_ORDER_DETAILS}?jobOrderId=${selectedValueId}?`)
                .then(response => {
                    let { job_name, printer_name, printer_mark, total_cylinder_qty, client_name} = response.data.jobOrderDetails;
                    setJobAgreementInput({
                        'job_name'          : job_name,
                        'printer_name'      : printer_name,
                        'printer_mark'      : printer_mark,
                        'client_name'       : client_name,
                        'total_cylinder_qty': total_cylinder_qty
                    });
                });
        }
    }
   
    const handleInputChange = (text) => {
        setJobNumberText(text)
    }
    useEffect(() => {
        if (!job_order_id && jobNumberText.length > 3) {
            userGetMethod(`${GET_JOB_ORDER_DETAILS}?searchText=${jobNumberText}`)
            .then(response =>{
                let jobOrderOptions = [];
               if (response.data.jobOrders && response.data.jobOrders.length > 0) {
                response.data.jobOrders.map(jobNumber =>{
                    let jobOrderObj = {}
                    jobOrderObj.id = jobNumber.id;
                    jobOrderObj.name = `[${jobNumber.job_no}] ` + jobNumber.job_name;
                    jobOrderOptions.push(jobOrderObj);

                })
                setJobAgreementInput({
                   'job_order_id': jobOrderOptions
               })
            //    setJobNoValue(jobOrderOptions);
            //     dropDownChange([{id : response.data.jobOrderDetails.id}], 'job_order_id');
                 setTypeHeadOptions(
                    (prevstate) => ({
                        ...prevstate,
                        ['job_orders']: jobOrderOptions,
                    })
                 )
                
               }
            })
            // setIsLoading(false);
        }
    },[jobNumberText])
    // console.log(jobNoValue[0]?.id);
    // // console.log(jobNoValue[0]);
    // console.log(dropDownData?.job_order_id.id);
    
    const submitHandler = (data, e) => {
        // data.job_order_id = dropDownData?.job_order_id || jobNoValue[0]?.id
        if (dropDownData?.job_order_id.id == undefined) {
            data.job_order_id = jobNoValue[0]?.id
        }else{
            data.job_order_id = dropDownData?.job_order_id.id
        }
        
        userPostMethod(DESIGN_TO_DESIGN_RSURL, data)
            .then(response => {
                console.log("response.data", response.data);
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
            job_name          : '',
            printer_name      : '', 
            client_name       : '',
            printer_mark      : '',
            total_cylinder_qty: ''
        })
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
                                        <h5>Design To Design Form</h5>
                                    </div>
                                    <div className="col-md-6">
                                        {/* <PanelRefreshIcons panelRefresh={pageRefreshHandler} /> */}
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                            {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                <form onSubmit={handleSubmit(submitHandler)} className="needs-validation theme-form">
                                    <div className="row">
                                        <div className="col-md-6" style={{marginTop: '20px'}}>
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label required" htmlFor="job_no">Job No</label>
                                                <div className="col-sm-9">
                                                    <Typeahead
                                                        id="job_order_id"
                                                        name="job_order_id"
                                                        labelKey={option => `${option.name}`}
                                                        options={typeHeadOptions['job_orders']}
                                                        placeholder={placeHolderText}
                                                        onChange={(e) => dropDownChange(e, 'job_order_id')}
                                                        onInputChange={(text) => handleInputChange(text)}
                                                        inputProps={{ required: true }}
                                                        selected={jobNoValue}
                                                        disabled={job_order_id != null ? 'disabled' : ''}
                                                        // ref={register({
                                                        //     required: 'Job No Field Required'
                                                        // })}
                                                        {...register('job_order_id')}
                                                    />
                                                    {errors.job_order_id && 'Job No. is required'}
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label" htmlFor="send_date">Send Date</label>
                                                <div className="col-sm-9">
                                                    <input className="form-control digits" id="send_date" name="send_date" required readOnly={'readonly'} type="text" value={jobAgreementInput?.send_date} ref={register({ required: true })} />
                                                    {errors.send_date && 'Send Date is required'}
                                                    <div className="valid-feedback">Looks good!</div>
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label" htmlFor="remark">Remarks</label>
                                                <div className="col-sm-9">
                                                    <input className="form-control" id="remark" name="remark" type="text" placeholder="Remarks" ref={register({})} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <pre className="helper-classes m-t-10">
                                                <div className="table-responsive display-div">
                                                    <table className="table table-bordernone">
                                                        <tbody>
                                                            <tr style={trStyleNormal}>
                                                                <td width="25%" align="right">Job Name</td>
                                                                <td width="5%">:</td>
                                                                <td width="70%">{jobAgreementInput?.job_name}</td>
                                                            </tr>
                                                            <tr style={trStyleNormal}>
                                                                <td align="right">Client Name</td>
                                                                <td>:</td>
                                                                <td>{jobAgreementInput?.client_name}</td>
                                                            </tr>
                                                            <tr style={trStyleNormal}>
                                                                <td align="right">Printer Name</td>
                                                                <td>:</td>
                                                                <td>{jobAgreementInput?.printer_name}</td>
                                                            </tr>
                                                            <tr style={trStyleNormal}>
                                                                <td align="right">No of Cylinder</td>
                                                                <td>:</td>
                                                                <td>{jobAgreementInput?.total_cylinder_qty}</td>
                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </pre>
                                        </div>
                                    </div>
                                    <SubmitButton link="designToDesign/index" offset="4" menuId={ menuId }/>
                                </form>
                                )
                            }
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Add;