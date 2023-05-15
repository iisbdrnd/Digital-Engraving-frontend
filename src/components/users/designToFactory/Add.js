import React, { Fragment, useState, useEffect, useReducer } from 'react';
import useForm from "react-hook-form";
import { SubmitButton } from '../../common/GlobalButton';
import { userGetMethod, userPostMethod } from '../../../api/userAction';
import { DESIGN_TO_FACTORY_RSURL, JOB_ORDER_DETAILS } from '../../../api/userUrl';
import { Typeahead } from 'react-bootstrap-typeahead';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add = (props) => {
    const { handleSubmit, register, errors } = useForm();

    const [isLoading, setIsLoading] = useState(true);
    const [resource, setResource] = useState(false);
    const [status, setStatus] = useState(true);
    const [typeHeadOptions, setTypeHeadOptions] = useState({});
    const [dropDownData, setDropdownData] = useState();
    const [file,setFile] = useState();
    const [jobNoValue,setJobNoValue] = useState([]);
    const [uploadImg ,setUploadImg] = useState('');

    let [designToFactoryInput, setDesignToFactoryInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            send_date         : new Date().toLocaleDateString(),
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
    
    useEffect(()=>{
        userGetMethod(`${DESIGN_TO_FACTORY_RSURL}/create?job_order_id=${job_order_id}`)
            .then(response => {
                console.log('response', response.data);
                // FOR JOB ORDER
                let jobOrderOptions = [];
                if (response.data.jobOrder) {
                    console.log('response.data.jobOrder', response.data.jobOrder);
                    let jobOrderObj = {};
                    jobOrderObj.id = response.data.jobOrder.id;
                    jobOrderObj.name = `[${response.data.jobOrder.job_no}] ` + response.data.jobOrder.job_name;
                    jobOrderOptions.push(jobOrderObj);
                    if (response.data.jobOrder != null) { 
                        setDesignToFactoryInput({
                            'job_order_id': [jobOrderObj]
                        })
                    }
                    setJobNoValue([jobOrderObj])
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
                setTypeHeadOptions(
                    (prevstate) => ({
                        ...prevstate,
                        ['job_orders']: jobOrderOptions,
                    })
                );

                setIsLoading(false);
            });
    }, []);
    console.log(jobNoValue);
    const dropDownChange = (e, fieldName) => {
        if(fieldName === 'job_order_id' && e[0].name){
            setJobNoValue(e);
        }
        if(e.length > 0){
            const selectedValueId = e[0].id;

            setDropdownData(
                (prevstate) => ({
                    ...prevstate,
                    [fieldName]: selectedValueId,
                })
            );

            userGetMethod(`${JOB_ORDER_DETAILS}?jobOrderId=${selectedValueId}?`)
                .then(response => {
                    let { job_name, printer_name, printer_mark, total_cylinder_qty, client_name} = response.data.jobOrderDetails;
                    setDesignToFactoryInput({
                        'job_name'          : job_name,
                        'printer_name'      : printer_name,
                        'printer_mark'      : printer_mark,
                        'client_name'       : client_name,
                        'total_cylinder_qty': total_cylinder_qty
                    });
                });
        }
    }
    // console.log(jobNoValue);

    const onImgChange = (e) => {
        setFile(e.target.files[0]);
        setUploadImg(URL.createObjectURL(e.target.files[0]));
    }
  
    const submitHandler = (data, e) => {
        data.job_order_id = dropDownData.job_order_id;
        const formData = new FormData();
        formData.append('upload_file',file);
        formData.append('job_order_id',data.job_order_id);
        formData.append('send_date',data.send_date);
        formData.append('remark',data.remark);
        
        userPostMethod(DESIGN_TO_FACTORY_RSURL, formData)
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
        setDesignToFactoryInput({
            job_name          : '',
            printer_name      : '', 
            client_name       : '',
            printer_mark      : '',
            total_cylinder_qty: ''
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
                                        <h5>Design to Factory Form</h5>
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
                                                        selected={jobNoValue}
                                                        disabled={job_order_id != null ? 'disabled' : ''}
                                                        ref={register({
                                                            required: 'Job No Field Required'
                                                        })}
                                                    />
                                                    {errors.job_order_id && 'Job No. is required'}
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label required" htmlFor="send_date">Send Date</label>
                                                <div className="col-sm-9">
                                                    <input className="form-control digits" id="send_date" name="send_date" type="text" value={designToFactoryInput.send_date} readOnly={'readonly'} ref={register({ required: true })} />
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
                                            <div className='form-group row'>
                                                <label className='col-sm-3 col-form-label' htmlFor='upload_file'>Upload File</label>
                                                <div className='col-sm-9'>
                                                    <input className='form-control' id='upload_file' name='upload_file' type='file'
                                                     onChange={onImgChange }
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
                                                            <tr>
                                                                <td width="25%" align="right">Job Name</td>
                                                                <td width="5%">:</td>
                                                                <td width="70%">{designToFactoryInput.job_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right">Client Name</td>
                                                                <td>:</td>
                                                                <td>{designToFactoryInput.client_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right">Printer Name</td>
                                                                <td>:</td>
                                                                <td>{designToFactoryInput.printer_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right">No of Cylinder</td>
                                                                <td>:</td>
                                                                <td>{designToFactoryInput.total_cylinder_qty}</td>
                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </pre>
                                        </div>
                                    </div>
                                    <SubmitButton link="designToFactory/index" offset="4" menuId={ menuId }/>
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