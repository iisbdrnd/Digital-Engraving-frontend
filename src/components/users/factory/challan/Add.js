import React, { Fragment, useState, useEffect, useReducer } from 'react';
import useForm from "react-hook-form";
import { SubmitButton } from '../../common/GlobalButton';

import { Typeahead } from 'react-bootstrap-typeahead';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { trStyleNormal } from '../jobAgreement/Create';
import { userGetMethod, userPostMethod } from '../../../../api/userAction';
import { DESIGN_TO_FACTORY_RSURL, JOB_ORDER_DETAILS, challanAPI, challanAllJobAPI, challanAttachAPI } from '../../../../api/userUrl';
import { trStyleNormal } from '../../jobAgreement/Create';
import moment from 'moment';

const Add = (props) => {
    const { handleSubmit, register, errors,reset } = useForm();

    const [isLoading, setIsLoading] = useState(true);
    const [attachValue, setAttachValue] = useState('');
    const [getDate, setGetDate] = useState('');
    const [typeHeadOptions, setTypeHeadOptions] = useState({});
    const [dropDownData, setDropdownData] = useState();
    const [file,setFile] = useState();
    const [jobNoValue,setJobNoValue] = useState([]);
    const [uploadImg ,setUploadImg] = useState('');

    let [designToFactoryInput, setDesignToFactoryInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            job_name          : '',
            printer_name      : '',
            limit_square_cm   : 0,
            job_order_id      : '', 
            client_name       : '',
            total_cylinder_qty: '',
            remarks           : '',
            job_type : '',
        }
    );
    
    var menuId = 0;
    if (props.location.state === undefined) {
        menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }
    let job_order_id = props.location.state.params.job_order_id ? props.location.state.params.job_order_id : null;

    
    
    useEffect(()=>{
        userGetMethod(`${challanAllJobAPI}`)
            .then(response => {
                console.log('response', response.data);
                // FOR JOB ORDER
                let jobOrderOptions = [];
                if (response.data.challans && response.data.challans.length > 0) {
                    response.data.challans.map(order => 
                    {
                        let jobOrderObj = {};
                        jobOrderObj.id = order.id;
                        jobOrderObj.name = `[${order.job_no}] ` + order.job_name;
                        jobOrderOptions.push(jobOrderObj);
                    })
                }
                setTypeHeadOptions(
                    (prevstate) => ({
                        ...prevstate,
                        ['job_orders']: jobOrderOptions,
                    })
                );

                setIsLoading(false);
            });

        userGetMethod(`${challanAttachAPI}`)
            .then((response) => {
                let jobAttachList = [];
                if (response.data.DigAttachedFinishedJob && response.data.DigAttachedFinishedJob.length > 0) {
                    response.data.DigAttachedFinishedJob.map(order => 
                    {
                        let jobOrderObj = {};
                        jobOrderObj.id = order.id;
                        jobOrderObj.name = `${order.description}`;
                        jobAttachList.push(jobOrderObj);
                    })
                }
                setTypeHeadOptions(
                    (prevstate) => ({
                        ...prevstate,
                        ['job_attach']: jobAttachList,
                    })
                );
            })
    }, []);

    const inputChangeHandler = (e) => {
        setDesignToFactoryInput({[e.target.name]: e.target.value});
    }

    const attachChange = (e,fieldName) => {
        if(fieldName === 'job_attach' && e[0].name){
            setAttachValue(e[0].id);
        }
    }
    // console.log(jobNoValue);
    const dropDownChange = (e, fieldName) => {
        
        if(e.length > 0){
            const selectedValueId = e[0].id;
            // console.log(selectedValueId)
            setDropdownData(
                (prevstate) => ({
                    ...prevstate,
                    [fieldName]: selectedValueId,
                })
            );

            userGetMethod(`${JOB_ORDER_DETAILS}?jobOrderId=${selectedValueId}?`)
                .then(response => {
                    console.log(response);
                    let { job_name, printer_name, printer_mark, total_cylinder_qty, client_name,remarks,job_type} = response.data.jobOrderDetails;
                    setDesignToFactoryInput({
                        'job_name'          : job_name,
                        'printer_name'      : printer_name,
                        'printer_mark'      : printer_mark,
                        'client_name'       : client_name,
                        'total_cylinder_qty': total_cylinder_qty,
                        'remarks'           : remarks,
                        'job_type'          : job_type
                    });
                });
        }
    }
    // console.log(attachValue);

    const onImgChange = (e) => {
        setFile(e.target.files[0]);
        setUploadImg(URL.createObjectURL(e.target.files[0]));
    }
  
    const submitHandler = (data, e) => {
        data.job_order_id = dropDownData.job_order_id;
        data.attached_finished_job = attachValue;
        data.total_cylinder_qty = designToFactoryInput.total_cylinder_qty;
        // const formData = new FormData();
        // formData.append('upload_file',file);
        // formData.append('job_order_id',data.job_order_id);
        // formData.append('remark',data.remark);
        // console.log(data)
        
        userPostMethod(`${challanAPI}`, data )
        .then(response => {
            if (response.data.status == 1) {
                toast.success(response.data.message);
                if (toast.success) {
                    setTypeHeadOptions(
                        (prevstate) => ({
                            ...prevstate,
                            job_orders: [],
                            job_attach: [],
                        })
                    );
                    reset();
                    clearForm();
                    
                }else{
                    console.log('problem')
                }
            } else {
                toast.error(response.data.message)
            }
        })
        .catch(error => toast.error(error))
    }

    const clearForm = () => {
        setJobNoValue([]);
        setDesignToFactoryInput({
            job_name          : '',
            printer_name      : '', 
            client_name       : '',
            printer_mark      : '',
            total_cylinder_qty: '',
            job_type : '',
            remarks: '',
        })
        setUploadImg('');
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
                                        <h5>Challan Add Form</h5>
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
                                                        placeholder="Select Job No..."
                                                        onChange={(e) => dropDownChange(e, 'job_order_id')}
                                                        // selected={jobNoValue}
                                                        // disabled={job_order_id != null ? 'disabled' : ''}
                                                        ref={register({
                                                            required: 'Job No Field Required'
                                                        })}
                                                    />
                                                    {errors.job_order_id && 'Job No. is required'}
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label required" htmlFor="send_date">Send Date</label>
                                                <div className="col-md-9">
                                                 <input 
                                                                type="date" 
                                                                className="form-control" 
                                                                name="finished_date"
                                                                ref={register({required: true })}
                                                                value={getDate ? getDate : moment().format("YYYY-MM-DD")}
                                                                onChange={(e)=>setGetDate(e.target.value)}
                                                            />
                                                        </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label required" htmlFor="job_no">Attached</label>
                                                <div className="col-sm-9">
                                                    <Typeahead
                                                        id="job_attach"
                                                        name="job_attach"
                                                        labelKey={option => `${option.name}`}
                                                        options={typeHeadOptions['job_attach']}
                                                        placeholder="Select attach No..."
                                                        onChange={(e) => attachChange(e, 'job_attach')}
                                                        // selected={jobNoValue}
                                                        // disabled={job_order_id != null ? 'disabled' : ''}
                                                        ref={register({
                                                            required: 'Job No Field Required'
                                                        })}
                                                    />
                                                    {errors.job_order_id && 'Job No. is required'}
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label" htmlFor="remark">Remarks</label>
                                                <div className="col-md-9">
                                                            <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                name="remarks" 
                                                                onChange={inputChangeHandler} 
                                                                ref={register({required: true })}
                                                                value={designToFactoryInput.remarks ? designToFactoryInput.remarks : ''} 
                                                            />
                                                        </div>
                                            </div>
                                           

                                            <div className="form-group row">
                                                <div className="col-md-3">

                                                </div>
                                                <div className="col-md-9">
                                                {uploadImg != '' &&  <img src={uploadImg ? uploadImg : ""} style={{height: '100%', width: '100%',marginBottom : '20px'}} />}
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
                                                                <td width="70%">{designToFactoryInput.job_name}</td>
                                                            </tr>
                                                            <tr style={trStyleNormal}>
                                                                <td align="right">Client Name</td>
                                                                <td>:</td>
                                                                <td>{designToFactoryInput.client_name}</td>
                                                            </tr>
                                                            <tr style={trStyleNormal}>
                                                                <td align="right">Printer Name</td>
                                                                <td>:</td>
                                                                <td>{designToFactoryInput.printer_name}</td>
                                                            </tr>
                                                            <tr style={trStyleNormal}>
                                                                <td align="right">No of Cylinder</td>
                                                                <td>:</td>
                                                                <td>{designToFactoryInput.total_cylinder_qty}</td>
                                                            </tr>
                                                            <tr style={trStyleNormal}>
                                                                <td align="right">Job Status</td>
                                                                <td>:</td>
                                                                <td>{designToFactoryInput.job_type}</td>
                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </pre>
                                        </div>
                                    </div>
                                    <SubmitButton link="challan/index" offset="4" menuId={ menuId }/>
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