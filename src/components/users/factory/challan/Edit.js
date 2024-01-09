import React, { Fragment, useEffect, useReducer, useState } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { challanAPI } from '../../../../api/userUrl';
import { userGetMethod, userPostMethod, userPutMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';
import { trStyleNormal } from '../../jobAgreement/Create';
import { Typeahead } from 'react-bootstrap-typeahead';
import moment from 'moment';
import { Button } from 'reactstrap';

const Edit = (props) => {
    const { handleSubmit, register, errors,reset } = useForm();
    const [isLoading,setIsLoading] = useState(true);
    const [typeHeadOptions, setTypeHeadOptions] = useState({});
    const [jobNoValue,setJobNoValue] = useState([]);
    const [dropDownData, setDropdownData] = useState();
    const [getDate,setGetDate] = useState('');
    const [attachValue,setAttachValue] = useState('');
    const [selectedOption, setSelectedOption] = useState([]);

    const [userChallanInput, setChallanInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            job_no: '',
            total_cylinder_qty: '',
            job_name: '',
            printer_name: '',
            client_name: '',
            finished_date : '',
            remarks : '',
            return_note : '',
            isLoading   : true,
            job_type: ''
        }
    );
    
    
    const inputChangeHandler = (e)=>{
        setChallanInput({[e.target.name]: e.target.value});
    }

    const job_order_id = props.match.params.challanId;
    // setJobId(job_order_id);

    useEffect(() => {
        userGetMethod(`${challanAPI}/${job_order_id}/edit`)
            .then(response => {
                let jobOrderAttach = [];
                if (response.data.DigAttachedFinishedJob && response.data.DigAttachedFinishedJob.length > 0) {
                    response.data.DigAttachedFinishedJob.map(order => 
                    {
                        let jobOrderObj = {};
                        jobOrderObj.id = order.id;
                        jobOrderObj.name = `${order.description}`;
                        jobOrderAttach.push(jobOrderObj);
                        // setJobNoValue([jobOrderObj])
                    })


                }
                setTypeHeadOptions(
                    (prevstate) => ({
                        ...prevstate,
                        ['job_attach']: jobOrderAttach,
                    })
                );

                // console.log('response', response);
                setChallanInput({
                    job_no : response.data.jobOrders_details.job_no,
                    total_cylinder_qty : response.data.jobOrders_details.total_cylinder_qty,
                    job_name : response.data.jobOrders_details.job_name,
                    printer_name : response.data.jobOrders_details.printer_name,
                    client_name : response.data.jobOrders_details.client_name,
                    job_type : response.data.jobOrders_details.job_type,
                    remarks : response.data.jobOrders_details.remarks,
                    isLoading: false
                });
                setIsLoading(false)
            })
            .catch(error => console.log(error))   
    },[]);



const dropDownChange = (e, fieldName) => {
    
    if(e.length > 0){
        const selectedValueId = e[0].id;
        setJobNoValue(selectedValueId);

        setDropdownData(
            (prevstate) => ({
                ...prevstate,
                [fieldName]: selectedValueId,
            })
        );

        // userGetMethod(`${JOB_ORDER_DETAILS}?jobOrderId=${selectedValueId}?`)
        //     .then(response => {
        //         console.log(response);
        //         let { job_name, printer_name, printer_mark, total_cylinder_qty, client_name} = response.data.jobOrderDetails;
        //         setDesignToFactoryInput({
        //             'job_name'          : job_name,
        //             'printer_name'      : printer_name,
        //             'printer_mark'      : printer_mark,
        //             'client_name'       : client_name,
        //             'total_cylinder_qty': total_cylinder_qty
        //         });
        //     });
    }
}
const attachChange = (e,fieldName) => {
    if(fieldName === 'job_attach' && e[0].name){
        setAttachValue(e[0].id);
        // setSelectedOption(e);
    }
}
// console.log(dropDownData)

const submitHandler = (data) => {
        data.job_order_id = job_order_id;
        data.attached_finished_job = attachValue;
        data.total_cylinder_qty = userChallanInput.total_cylinder_qty;
        // console.log('output', data);
        // const url = `${process.env.PUBLIC_URL}/challanForm/${job_order_id}`;
        // const stateParams = { menuId, job_order_id: job_order_id };
        // window.open(url, '_blank', 'height=800,width=1200', { params: stateParams })
        userPostMethod(`${challanAPI}`, data )
            .then(response => {
                if (response.data.status == 1) {
                    toast.success(response.data.message);
                    if (toast.success) {
                        // reset();
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

    var menuId = 0;
    if (props.location.state === undefined) {
        var menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }
    const clearForm = () => {
        setAttachValue('');
        setTypeHeadOptions(
            (prevState) => ({
              ...prevState,
              ['job_attach']: [], 
            })
          );
        setChallanInput({
            job_no: '',
            total_cylinder_qty: '',
            job_name: '',
            printer_name: '',
            client_name: '',
            finished_date : '',
            remarks : '',
            return_note : '',
            job_type: ''
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
                                        <h5>Challan Add Form</h5>
                                    </div>
                                    {/* <div className="col-md-6">
                                        <Button className="btn btn-primary" onClick={handleForm}>click for from</Button>
                                    </div> */}
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
                                                <div className="col-md-9">
                                                      <input 
                                                            type="text" 
                                                            className="form-control" 
                                                            name="job_no" 
                                                            value={`[${userChallanInput.job_no}] ${userChallanInput.job_name}`}
                                                            readOnly
                                                        />
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
                                                        id="job_order_attach"
                                                        name="job_order_attach"
                                                        labelKey={option => `${option.name}`}
                                                        options={typeHeadOptions['job_attach'] || []}
                                                        placeholder="Select Attach.."
                                                        onChange={(e) => attachChange(e, 'job_attach')}
                                                        
                                                        ref={register({required: true })}
                                                        // disabled={job_order_id != null ? 'disabled' : ''}
                                                        
                                                    />
                                                    
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
                                                                value={userChallanInput.remarks ? userChallanInput.remarks : ''} 
                                                            />
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
                                                                <td width="70%">{userChallanInput.job_name}</td>
                                                            </tr>
                                                            <tr style={trStyleNormal}>
                                                                <td align="right">Client Name</td>
                                                                <td>:</td>
                                                                <td>{userChallanInput.client_name}</td>
                                                            </tr>
                                                            <tr style={trStyleNormal}>
                                                                <td align="right">Printer Name</td>
                                                                <td>:</td>
                                                                <td>{userChallanInput.printer_name}</td>
                                                            </tr>
                                                            <tr style={trStyleNormal}>
                                                                <td align="right">No of Cylinder</td>
                                                                <td>:</td>
                                                                <td>{userChallanInput.total_cylinder_qty ? userChallanInput.total_cylinder_qty : ''}</td>
                                                            </tr>
                                                            <tr style={trStyleNormal}>
                                                                <td align="right">Job Status</td>
                                                                <td>:</td>
                                                                <td>{userChallanInput.job_type? userChallanInput.job_type : ''}</td>
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

export default Edit;