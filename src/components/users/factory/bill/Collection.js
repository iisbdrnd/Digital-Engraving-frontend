import React, { Fragment, useEffect, useReducer, useState } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import Select from "react-select";
import { collectionFromApi, getClientDetails, submitCollectionApi } from '../../../../api/userUrl';
import { userGetMethod, userPutMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';

const Edit = (props) => {
    const { handleSubmit, register, errors } = useForm();

    const [groupOption, setGroupOption ] = useState({'groups': []});
    const [clients, setClients ] = useState({'groups': []});
    const [isLoading, setIsLoading] = useState(true);

    const [clientId, setClientId] = useState(0);
    const [ transactionBy, setTransactionBy] = useState(0);
    const [ amount, setAmount] = useState(0);
    const [ remarks, setRemarks] = useState('');

    const [ showCheckInfo, setShowCheckInfo] = useState(false);

    const [ clientInfo, setClientInfo] = useState({
        'clientName': '',
        'clientPhone': '',
        'address': '',
        'receivable': '',
        'collect': '',
        'due': '',
    });

    const [checkInfo, setCheckInfo] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            check_no: '',
            check_date: '',
        }
    );

    var menuId = 0;
    if (props.location.state === undefined) {
        var menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }

    useEffect(() => {
        userGetMethod(`${collectionFromApi}`)
            .then(response => {

                let groupedOptionsCustom = [];
                Object.keys(response.data.accountLevelOfFour).map(function(key, index) {
                    if (response.data.accountLevelOfThree.hasOwnProperty(key)) {
                        var groupOptionObj = {};
                        groupOptionObj.label = response.data.accountLevelOfThree[key].account_code + ' - ' + response.data.accountLevelOfThree[key].account_head;
                        groupOptionObj.options = [];
                        response.data.accountLevelOfFour[key].map( (account_levelFour, i) => {
                            let groupSubOptionsObj = {};
                            groupSubOptionsObj.label = account_levelFour.account_code+' - '+account_levelFour.account_head;
                            groupSubOptionsObj.value = account_levelFour.account_code;
                            groupOptionObj.options.push(groupSubOptionsObj);
                        });
                    }else{
                        var groupOptionObj = {};
                    }
                    groupedOptionsCustom.push(groupOptionObj);
                });

                setGroupOption(
                    (prevstate) => ({
                        ...prevstate,
                        ['groups']: groupedOptionsCustom,
                    })
                );

                //clients arrayish

                let clientOptionsCustom = [];
                response.data.clients.map( (client, i) => {
                    let clientOptionsObj = {};
                    clientOptionsObj.label = client.client_id+' - '+client.name;
                    clientOptionsObj.value = client.id;
                    clientOptionsCustom.push(clientOptionsObj);
                });

                setClients(
                    (prevstate) => ({
                        ...prevstate,
                        ['groups']: clientOptionsCustom,
                    })
                );

                setIsLoading(false);


            })
            .catch(error => console.log(error))   
    },[]);

    
    const amountChangeHandler = (e)=>{
        setAmount(e.target.value);
    }

    const clientChangeHandler = (e) => {
        var selectClientId = e.value;
        setClientId(selectClientId);
        userGetMethod(`${getClientDetails}/${selectClientId}`)
            .then(response => {
                console.log('res', response);
                setClientInfo({
                    clientName: response.data.clientInfo.name,
                    clientPhone: response.data.clientInfo.mobile,
                    address: response.data.clientInfo.address,
                    receivable: response.data.clientInfo.receivable,
                    collect: response.data.clientInfo.collect,
                    due: response.data.clientInfo.due,
                });
            })
            .catch(error => console.log(error))   
    }

    const transactionHandleChange = (transaction) => {
        setTransactionBy(transaction.value);

        if(transaction.value == "2201000001"){
            setShowCheckInfo(false);
        }else{
            setShowCheckInfo(true);
        }
    };

    const calculateCheck = (e) => {

        setCheckInfo({
            [e.target.name]: e.target.value,
        });
    }

    const remarksChangeHandler = (e) => {
        setRemarks(e.target.value);
    }

    const submitHandler = (data) => {

        if(transactionBy == 0 || clientId == ""){
            toast.error('please select client and transactionBy');
        }else{
            if(showCheckInfo){
                if(checkInfo.check_no == "" || checkInfo.check_date == ""){
                    toast.error('please select client and transactionBy');
                }else{

                    if(clientInfo.due >= amount && amount > 0){

                        data.clientId = clientId;
                        data.transactionBy = transactionBy;
                        data.amount = amount;
                        data.check_no = checkInfo.check_no;
                        data.check_date = checkInfo.check_date;
                        data.remarks = remarks;

                        userPutMethod(`${submitCollectionApi}/${clientId}`, data )
                        .then(response => {
                            if (response.data.status == 1) {
                                toast.success(response.data.message);
                            } else {
                                toast.error(response.data.message);
                            }
                        })
                        .catch(error => toast.error(error))

                    }else{
                        toast.error("amount greather than zero and can't be greater than due amount");
                    }
                }
            }else{
                if(clientInfo.due >= amount && amount > 0){

                    data.clientId = clientId;
                    data.transactionBy = transactionBy;
                    data.amount = amount;
                    data.check_no = checkInfo.check_no;
                    data.check_date = checkInfo.check_date;

                    userPutMethod(`${submitCollectionApi}/${clientId}`, data )
                    .then(response => {
                        if (response.data.status == 1) {
                            toast.success(response.data.message);
                        } else {
                            toast.error(response.data.message);
                        }
                    })
                    .catch(error => toast.error(error))

                }else{
                    toast.error("amount greather than zero and can't be greater than due amount");
                }
            }
        }


        // if(data.net_total > 0){

        //     userPutMethod(`${billAPI}/${job_order_id}`, data )
        //         .then(response => {
        //             if (response.data.status == 1) {
        //                 toast.success(response.data.message);
        //             } else {
        //                 toast.error(response.data.message);
        //             }
        //         })
        //         .catch(error => toast.error(error))
        // }else{
        //     toast.error("Net Total Amount greather than zero");
        // }

    }



    return (
        <Fragment>
  
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">

                        <div className="card">

                            <div className="card-header">
                                <h5>Bill Collection</h5>
                            </div>
                            
                            <div className="card-body">
                                {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <form onSubmit={handleSubmit(submitHandler)} className="theme-form row">

                                        <div className="col-md-6">
                                           
                                            <div className="form-group row">
                                                <label htmlFor="main_code" className="col-md-3 col-form-label required">Client</label>
                                                <div className="col-sm-9 col-md-9">
                                                    <Select
                                                        id="client_id"
                                                        name="client_id"
                                                        onChange={clientChangeHandler}
                                                        options={clients.groups}
                                                        ref={register({required: true })}
                                                    />
                                                    {errors.client_id && <p className='text-danger'>{errors.client_id.message}</p>}
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label htmlFor="main_code" className="col-md-3 col-form-label required">Account Code</label>
                                                <div className="col-sm-9 col-md-9">
                                                    <Select
                                                        id="transaction_by"
                                                        name="transaction_by"
                                                        ref={register({required: true })}
                                                        onChange={transactionHandleChange}
                                                        options={groupOption.groups}
                                                    />
                                                    {errors.transaction_by && <p className='text-danger'>{errors.transaction_by.message}</p>}
                                                </div>
                                            </div>


                                            {showCheckInfo ? 
                                                <>
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label required" htmlFor="check_no">Check No</label>
                                                        <div className="col-sm-9">
                                                            <input 
                                                                className="form-control" 
                                                                id="check_no" 
                                                                name="check_no" 
                                                                type="text"
                                                                placeholder="Check No" 
                                                                onChange={e=>calculateCheck(e)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label required" htmlFor="check_date">Check Date</label>
                                                        <div className="col-sm-9">
                                                            <input 
                                                                className="form-control" 
                                                                id="check_date" 
                                                                name="check_date" 
                                                                type="date"
                                                                placeholder="Check Date" 
                                                                onChange={e=>calculateCheck(e)}
                                                            />
                                                        </div>
                                                    </div>
                                                </>
                                            : '' 
                                            }

                                            <div className="form-group row">
                                                <label className="col-md-3 col-form-label required">Amount:</label>
                                                <div className="col-md-9">
                                                    <div className="input-group">
                                                        <span className="input-group-addon"></span>
                                                        <input 
                                                            id="amount" 
                                                            name="amount" 
                                                            placeholder="e.g. 50000.00" 
                                                            className="form-control" 
                                                            type="number"
                                                            min="0"
                                                            autoComplete="off"
                                                            ref={register({required: true })}
                                                            onChange={amountChangeHandler}
                                                        />
                                                        {errors.amount && <p className='text-danger'>{errors.amount.message}</p>}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-md-3 col-form-label required">Remarks:</label>
                                                <div className="col-md-9">
                                                    <div className="input-group">
                                                        <span className="input-group-addon"></span>
                                                        <textarea 
                                                            id="remarks" 
                                                            name="remarks"
                                                            className="form-control" 
                                                            type="textarea"
                                                            ref={register({required: true })}
                                                            onChange={remarksChangeHandler}
                                                        />
                                                        {errors.remarks && <p className='text-danger'>{errors.remarks.message}</p>}
                                                    </div>
                                                </div>
                                            </div>
                             
                                        </div>

                                        <div className="col-md-6">
                                            <pre className="helper-classes m-t-10">
                                                <div className="display-div">
                                                    <div className='p-0'>
                                                        <table className="table table-bordernone">
                                                            <tbody>
                                                                <tr>
                                                                    <td 
                                                                        align="right"
                                                                    ></td>
                                                                    <td></td>
                                                                    <td style={{fontWeight: 'bold', fontSize: '16px'}}> 
                                                                            Client Details
                                                                    </td>  
                                                                </tr>
                                                                <tr>
                                                                    <td width="25%" align="right">
                                                                        Client Details
                                                                    </td>
                                                                    <td width="5%">:</td>
                                                                    <td width="70%">
                                                                        {clientInfo.clientName != '' ? clientInfo.clientName : ''}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="right">
                                                                        Client Phone
                                                                    </td>
                                                                    <td>:</td>
                                                                    <td>
                                                                        {clientInfo.clientPhone != '' ? clientInfo.clientPhone : ''}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="right">
                                                                        Client Address
                                                                    </td>
                                                                    <td>:</td>
                                                                    <td>
                                                                        {clientInfo.address != '' ? clientInfo.address : ''}
                                                                    </td>
                                                                </tr>

                                                            
                                                                <tr>
                                                                    <td align="right"></td>
                                                                    <td></td>
                                                                    <td 
                                                                        style={{fontWeight: 'bold', fontSize: '16px'}}>
                                                                        Accounts Details
                                                                    </td>  
                                                                </tr>
                                                               
                                                                <tr>
                                                                    <td align="right">Receivable</td>
                                                                    <td>:</td>
                                                                    <td>
                                                                        {clientInfo.receivable != '' ? clientInfo.receivable : ''}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="right">Collect</td>
                                                                    <td>:</td>
                                                                    <td>
                                                                        {clientInfo.collect != '' ? clientInfo.collect : ''}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="right">Due</td>
                                                                    <td>:</td>
                                                                    <td>
                                                                        {clientInfo.due != '' ? clientInfo.due : ''}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </pre>
                                        </div>

                                        <div>
                                            <div className="col-md-12 offset-sm-2"  style={{'padding':'0'}}>
                                                <button 
                                                    className="btn btn-primary btn-sm mr-1" 
                                                    type="submit">Submit
                                                    </button>
                                            </div>
                                        </div>

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