import React, { Fragment, useEffect, useReducer, useState } from 'react';
import Select from "react-select";
import { GET_bankReceivedVoucherAPI, bankReceivedVoucherAPI, projectAccountCodeAPI } from '../../../../../api/userUrl';
import { userGetMethod, userDeleteMethod, userPostMethod } from '../../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { Typeahead, useToken } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { SubmitButton, PanelRefreshIcons } from '../../../../common/GlobalButton';
import { ToggleButton } from "../../../../common/toggleBtn/toggleButton";

const Add = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    // const [selected, setSelected] = useState(false);
    const [submit, setSubmit] = useState(true);
    const [typeHeadOptions, setTypeHeadOptions] = useState({});
    const [dropDownData, setDropdownData] = useState();
    const [groupOption, setGroupOption ] = useState({'groups': []});
    const [ selectedOption, setSelectedOption] = useState(0);
    const [ selectedPaymentOption, setSelectedPaymentOption] = useState(0);
    const [ totalAmount, setTotalAmount] = useState(0);
    const [ counter , setCounter] = useState(0);
    const [ remarksValue, setRemarksValue ] = useState();
    const [ paymentRemark, setPaymentRemark] = useState();
    const [ projectName , setProjectName] = useState("");
    const [ receiveBankText , setReceiveBankText] = useState("");

    //for right side
    const [tableRow, setTableRow] = useState([]);

    let [calculationValue, setCalculationValue] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            amount: 0,
            check_no : 0,
            check_date : "0000-00-00",
            remark : ""
        }
    );

    var menuId = 0;
    if (props.location.state === undefined) {
        var menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }

    useEffect(() => {
        userGetMethod(`${bankReceivedVoucherAPI}`)
        .then(response => {

            let paymentByOptions = [];
            setProjectName(response.data.branch_name);

            // for payment by
            if (response.data.bank_accounts && response.data.bank_accounts.length > 0) {

                console.log('cash_acc', typeof(response.data));

                response.data.bank_accounts.map(payment => 
                {
                    let paymentByObj = {};
                    paymentByObj.id = payment.account_code;
                    paymentByObj.isdisable = paymentByObj.id.endsWith('000')
                    paymentByObj.label = `[${payment.account_code}] ` + payment.account_head;
                    paymentByOptions.push(paymentByObj);
                })
            }
            // end payment by

            setTypeHeadOptions(
                (prevstate) => ({
                    ...prevstate,
                    ['paymentBy']: paymentByOptions,
                })
            );

            // let groupedOptionsCustom = [];
            // Object.keys(response.data.received_accounts_level_four).map(function(key, index) {
            //     if (response.data.received_accounts.hasOwnProperty(key)) {
            //         var groupOptionObj = {};
            //         groupOptionObj.label = response.data.received_accounts[key].account_code + ' - ' + response.data.received_accounts[key].account_head;
            //         groupOptionObj.options = [];

            //         response.data.received_accounts_level_four[key].map( (account_levelFour, i) => {

            //             let groupSubOptionsObj = {};
            //             groupSubOptionsObj.label = account_levelFour.account_code+' - '+account_levelFour.account_head;
            //             groupSubOptionsObj.value = account_levelFour.account_code+'~'+account_levelFour.account_head;

            //             groupOptionObj.options.push(groupSubOptionsObj);
            //         });
            //     }else{
            //         var groupOptionObj = {};
            //     }
            //     groupedOptionsCustom.push(groupOptionObj);
            // });

            // setGroupOption(
            //     (prevstate) => ({
            //         ...prevstate,
            //         ['groups']: groupedOptionsCustom,
            //     })
            // );

            setIsLoading(false);
        })
        .catch(error => console.log(error))
    }, []);

    const handleInputChange = (text) => {
        setReceiveBankText(text)
    }
    useEffect(() => {
        if (receiveBankText.length > 3) {
            userGetMethod(`${GET_bankReceivedVoucherAPI}?searchText=${receiveBankText}`)
        .then((response) => {
            let groupedOptionsCustom = [];
            Object.keys(response.data.received_accounts_level_four).map(function(key, index) {
                if (response.data.received_accounts.hasOwnProperty(key)) {
                    var groupOptionObj = {};
                    groupOptionObj.label = response.data.received_accounts[key].account_code + ' - ' + response.data.received_accounts[key].account_head;
                    groupOptionObj.options = [];

                    response.data.received_accounts_level_four[key].map( (account_levelFour, i) => {

                        let groupSubOptionsObj = {};
                        groupSubOptionsObj.label = account_levelFour.account_code+' - '+account_levelFour.account_head;
                        groupSubOptionsObj.value = account_levelFour.account_code+'~'+account_levelFour.account_head;

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

            setIsLoading(false);
        })
        }
        if (receiveBankText.length <= 3) {
            setGroupOption(
                (prevstate) => ({
                    ...prevstate,
                    ['groups']: [],
                })
            );
        }
    },[receiveBankText])

    const dropDownChange = (e, fieldValue, fieldName) => {
        if(e.length > 0){
            const selectedValueId = e[0].id;
            const selectedValueName = e[0].name;

            setDropdownData(
                (prevstate) => ({
                    ...prevstate,
                    [fieldValue]: selectedValueId,
                    [fieldName] : selectedValueName
                })
            );

        }
    }

    const pageRefreshHandler = () => {
        console.log('groupedOptions', groupOption.groups);
        console.log('selectedOption', selectedOption);
        console.log('formValue', calculationValue);
        console.log('typeHead', typeHeadOptions);
        console.log('tableRow', tableRow);

    }

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        console.log('selectedOption', selectedOption);
    };
    const handleChangePayment = (selectedOption) => {
        setSelectedPaymentOption(selectedOption);
        console.log('selectedOption', selectedOption);
    };

    const calculateFormValue = (event) => {

        if(event.target.name == "remark"){
            setRemarksValue(event.target.value);
            setPaymentRemark(event.target.value);
        }
        setCalculationValue(
            {[event.target.name] : event.target.value},
        );
    }

    const addAmount = (e) => {

        setCounter(counter+1);

        if(selectedOption != 0  && calculationValue.amount > 0 && calculationValue.amount != "" && typeHeadOptions['paymentBy'].length > 0){

            var accLevel = selectedOption.label;
            var splitAccLevel =  accLevel.split("-");
            var levelIndex = splitAccLevel[0];
            levelIndex = levelIndex.trim();

            var customRowsObject = {};
            customRowsObject.account_code = levelIndex;
            customRowsObject.account_head = accLevel;
            customRowsObject.amount = calculationValue.amount;

            if(tableRow.hasOwnProperty(levelIndex)){
                toast.error("Already exists !!");
            }else{
                toast.success("successfully added");
                setTotalAmount(parseInt(totalAmount)+parseInt(calculationValue.amount));

                let calTotalAmount = parseInt(totalAmount)+parseInt(calculationValue.amount);

                let remarksVal;
                let defaultValue;
                let lastValue;
                if(remarksValue == undefined){
                    remarksVal = "";
                }else{
                    remarksVal = remarksValue;
                }

                if(counter == 0){
                    defaultValue = "Project"+' '+ projectName + '-Accounts';
                    setRemarksValue(
                        defaultValue + ','
                    );

                    setPaymentRemark(
                        defaultValue + ',' + 'Payment By:' + dropDownData.paymentByName + '- check no:'+ calculationValue.check_no + '- check date: ' + calculationValue.check_date + '- total amount: '+ calTotalAmount
                    );
    
                }else{
                    setRemarksValue(
                        remarksVal + ','
                    );

                    setPaymentRemark(
                        remarksVal + ',' + 'Payment By:' + dropDownData.paymentByName + '- check no:'+ calculationValue.check_no + '- check date: ' + calculationValue.check_date + '- total amount: '+ calTotalAmount
                    );

                }


                setTableRow(
                    (prevstate) => ({
                        ...prevstate,
                        [levelIndex]: customRowsObject,
                    })
                );
            }
        }else{
            toast.error("something wrong !!");
        }
    }

    const deleteAccountRow = (e) => {

        setTotalAmount( parseInt(totalAmount) - parseInt(tableRow[e].amount) );
        delete tableRow[e];
        if(Object.keys(tableRow).length == 0){
            setTableRow([]);
        }else{

            // let availableBaseOrder = Object.keys(tableRow).filter((row, key) => tableRow[row]['account_code'] != tableRow[e] );
            // setTableRow([
            //     ...availableBaseOrder
            // ]);

            Object.keys(tableRow).map( (row, key) => {
                var levelIndex = tableRow[row]['account_code'];
                var customRowsObject = {};
                customRowsObject.account_code = levelIndex;
                customRowsObject.account_head = tableRow[row]['account_head'];
                customRowsObject.amount = tableRow[row]['amount'];
    
                setTableRow(
                    (prevstate) => ({
                        ...prevstate,
                        [levelIndex]: customRowsObject,
                    })
                );
    
            });
        }

    }

    
    const submitHandler = (data, e) => {

        console.log(calculationValue.check_no);
        console.log(calculationValue.check_date);
        console.log(calculationValue.remark);

        if(calculationValue.check_no != 0 && calculationValue.check_date != "0000-00-00" && Object.keys(tableRow).length > 0){
            data.InputValue = dropDownData;
            data.tableRows = tableRow;
            data.total_amount = totalAmount;
            data.formValue = calculationValue;
            data.remarks = remarksValue;
            data.payRemark = paymentRemark;

            userPostMethod(bankReceivedVoucherAPI, data)
            .then(response => {
                console.log("response", response.data);
                if (response.data.status == 1) {
                    toast.success(response.data.message)
                    //e.target.reset();
                } else {
                    toast.error(response.data.message)
                }
            })
            .catch(error => toast.error(error))

        }else{
            toast.error("something wrong !!");
        }
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
                                        <h5>Bank Received Voucher</h5>
                                    </div>
                                    <div className="col-md-6">
                                        {/* <PanelRefreshIcons panelRefresh={pageRefreshHandler} /> */}
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">

                            {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <fieldset className="border">
                                                <legend className="w-auto text-left"></legend>

                                                <div className="form-group row">
                                                    <label htmlFor="main_code" className="col-md-3 col-form-label required">Account Code</label>
                                                    <div className="col-sm-9 col-md-9">
                                                        <Select
                                                            value={selectedOption}
                                                            onChange={handleChange}
                                                            options={groupOption.groups}
                                                            onInputChange={(text)=>handleInputChange(text)}
                                                            components={{
                                                                NoOptionsMessage: () =>
                                                                receiveBankText.length <= 3 ? 'Type Min. 4 characters...' :'searching...'
                                                                    }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="form-group row mt-2">
                                                    <label htmlFor="main_code" className="col-md-3 col-form-label required">Payment By</label>
                                                    <div className="col-sm-9 col-md-9">
                                                        {/* <Typeahead
                                                            id="paymentBy"
                                                            name="paymentBy"
                                                            labelKey={option => `${option.name}`}
                                                            options={typeHeadOptions['paymentBy']}
                                                            placeholder="Select Payment By..."
                                                            onChange={(e) => dropDownChange(e, 'paymentBy', 'paymentByName')}
                                                            ref={register({
                                                                required: 'Payment By Field Required'
                                                            })}
                                                        /> */}

                                                        <Select
                                                            value={selectedPaymentOption}
                                                            onChange={handleChangePayment}
                                                            options={typeHeadOptions.paymentBy}
                                                            isOptionDisabled={(option) => option.isdisable}
                                                        />

                                                        {errors.paymentBy && 'Payment By is required'}
                                                    </div>
                                                </div>

                                                <div className="form-group row mt-2">
                                                    <label className="col-sm-3 col-form-label required" htmlFor="check_no">Check No</label>
                                                    <div className="col-sm-9">
                                                        <input 
                                                            className="form-control" 
                                                            id="check_no" 
                                                            name="check_no" 
                                                            type="text"
                                                            placeholder="Check No" 
                                                            ref={register({})} 
                                                            rows="3"
                                                            onChange={e=>calculateFormValue(e)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="form-group row mt-2">
                                                    <label className="col-sm-3 col-form-label required" htmlFor="check_date">Check Date</label>
                                                    <div className="col-sm-9">
                                                        <input 
                                                            className="form-control" 
                                                            id="check_date" 
                                                            name="check_date" 
                                                            type="date"
                                                            placeholder="Check No" 
                                                            ref={register({})} 
                                                            rows="3"
                                                            onChange={e=>calculateFormValue(e)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="form-group row mt-2">
                                                    <label className="col-md-3 col-form-label required">Amount:</label>
                                                    <div className="col-md-7 pr-0">
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
                                                                onChange={ e => calculateFormValue(e) }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 col-md-2 ">
                                                        <button style={{marginLeft: '8px',height: '35px'}}
                                                            id="add_amount" 
                                                            type="button" 
                                                            className="btn btn-primary"
                                                            onClick={e=>addAmount(e)}
                                                        >Add
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="form-group row mt-2">
                                                    <label className="col-sm-3 col-form-label required" htmlFor="remark">Remarks</label>
                                                    <div className="col-sm-9">
                                                        <textarea 
                                                            className="form-control" 
                                                            id="remark" 
                                                            name="remark" 
                                                            placeholder="Remarks" 
                                                            ref={register({})} 
                                                            value={paymentRemark}
                                                            rows="3"
                                                            onChange={e=>calculateFormValue(e)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="form-group row mt-2">
                                                    <label className="col-sm-3 col-form-label required"><b>Total Amount</b></label>
                                                    <div className="col-sm-9">
                                                        <p style={{"font-size":"18px"}}>{totalAmount}</p>
                                                    </div>
                                                </div>

                                            </fieldset>
                                        </div>

                                        <div className="col-md-6">
                                            <fieldset className="border">
                                                <legend className="w-auto text-left"></legend>
                                                <table className="table table-bordered table-stripped" style={{"max-width": "98%", "marginLeft":"1.5%"}}>
                                                    <thead>
                                                        <tr>
                                                            <th width="5%">No</th>
                                                            <th width="35%">Account Code</th>
                                                            <th width="40%">Account Head</th>
                                                            <th width="10%">Amount</th>
                                                            <th width="10%">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                            { (tableRow.length == 0) ? 
                                                                (
                                                                    <tr>
                                                                        <td colSpan="5" className="text-center">Nothing</td>
                                                                    </tr> 
                                                                ) : 
                                            
                                                                Object.keys(tableRow).map( (row, key) => (
                                                                    
                                                                    <tr>
                                                                        <td>{key + 1}</td>
                                                                        <td>{tableRow[row]['account_code']}</td>
                                                                        <td>{tableRow[row]['account_head']}</td>
                                                                        <td>{tableRow[row]['amount']}</td>
                                                                        <td><i
                                                                            class="fa fa-trash btn btn-danger"
                                                                            onClick={e=>deleteAccountRow(tableRow[row]['account_code'])}
                                                                            />
                                                                            </td>
                                                                    </tr>
                                                                    
                                                                ))

                                                            }
                                                    </tbody>
                                                </table>
                                            </fieldset>
                                        </div>

                                        <div className="clearfix"></div>
                                    </div>
                                    
                                    <div class="card-footer">
                                        <button class="btn btn-primary btn-sm mr-1" type="submit">Submit</button>
                                    </div>
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