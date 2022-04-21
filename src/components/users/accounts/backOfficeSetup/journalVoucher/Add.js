import React, { Fragment, useEffect, useReducer, useState } from 'react';
import Select from "react-select";
import { journalVoucherAPI } from '../../../../../api/userUrl';
import { userGetMethod, userDeleteMethod, userPostMethod } from '../../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { Typeahead } from 'react-bootstrap-typeahead';
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
    const [ counter , setCounter] = useState(0);
    const [ projectName , setProjectName] = useState("");

    //for right side
    const [debitTableRow, setDebitTableRow] = useState([]);
    const [ debitSelectedOption, setDebitSelectedOption] = useState(0);
    const [ debitTotalAmount, setDebitTotalAmount] = useState(0);

    const [ creditTableRow, setCreditTableRow] = useState([]);
    const [ creditSelectedOption, setCreditSelectedOption] = useState(0);
    const [ creditTotalAmount, setCreditTotalAmount] = useState(0);

    let [calculationValue, setCalculationValue] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            debit_amount: 0,
            credit_amount : 0,
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
        userGetMethod(`${journalVoucherAPI}`)
        .then(response => {

            let paymentByOptions = [];
            setProjectName(response.data.branch_name);

            let groupedOptionsCustom = [];
            Object.keys(response.data.accountLevelOfFour).map(function(key, index) {
                if (response.data.accountLevelOfThree.hasOwnProperty(key)) {
                    var groupOptionObj = {};
                    groupOptionObj.label = response.data.accountLevelOfThree[key].account_code + ' - ' + response.data.accountLevelOfThree[key].account_head;
                    groupOptionObj.options = [];

                    response.data.accountLevelOfFour[key].map( (account_levelFour, i) => {

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

            setTypeHeadOptions(
                (prevstate) => ({
                    ...prevstate,
                    ['paymentBy']: paymentByOptions,
                })
            );

            setIsLoading(false);
        })
        .catch(error => console.log(error))
    }, []);

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
   

    }

    const debitHandleChange = (debitSelectedOption) => {
        setDebitSelectedOption(debitSelectedOption);
    };

    const creditHandleChange = (creditSelectedOption) => {
        setCreditSelectedOption(creditSelectedOption);
    };

    const calculateFormValue = (event) => {

        setCalculationValue(
            {[event.target.name] : event.target.value},
        );
    }

    const debitAddAmount = (e) => {

        if(debitSelectedOption != 0  && calculationValue.debit_amount > 0 && calculationValue.debit_amount != ""){

            var accLevel = debitSelectedOption.label;
            var splitAccLevel =  accLevel.split("-");
            var levelIndex = splitAccLevel[0];
            levelIndex = levelIndex.trim();

            var customRowsObject = {};
            customRowsObject.account_code = levelIndex;
            customRowsObject.account_head = accLevel;
            customRowsObject.amount = calculationValue.debit_amount;

            if(debitTableRow.hasOwnProperty(levelIndex)){
                toast.error("Already exists !!");
            }else{
                toast.success("successfully added");
                setDebitTotalAmount(parseInt(debitTotalAmount)+parseInt(calculationValue.debit_amount));

                setDebitTableRow(
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

    const creditAddAmount = (e) => {

        if(creditSelectedOption != 0  && calculationValue.credit_amount > 0 && calculationValue.credit_amount != ""){

            var accLevel = creditSelectedOption.label;
            var splitAccLevel =  accLevel.split("-");
            var levelIndex = splitAccLevel[0];
            levelIndex = levelIndex.trim();

            var customRowsObject = {};
            customRowsObject.account_code = levelIndex;
            customRowsObject.account_head = accLevel;
            customRowsObject.amount = calculationValue.credit_amount;

            if(creditTableRow.hasOwnProperty(levelIndex)){
                toast.error("Already exists !!");
            }else{
                toast.success("successfully added");
                setCreditTotalAmount(parseInt(creditTotalAmount)+parseInt(calculationValue.credit_amount));

                setCreditTableRow(
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

    const deleteDebitAccountRow = (e) => {

        setDebitTotalAmount( parseInt(debitTotalAmount) - parseInt(debitTableRow[e].amount) );
        delete debitTableRow[e];
        if(Object.keys(debitTableRow).length == 0){
            setDebitTableRow([]);
        }else{

            Object.keys(debitTableRow).map( (row, key) => {
                var levelIndex = debitTableRow[row]['account_code'];
                var customRowsObject = {};
                customRowsObject.account_code = levelIndex;
                customRowsObject.account_head = debitTableRow[row]['account_head'];
                customRowsObject.amount = debitTableRow[row]['amount'];
    
                setDebitTableRow(
                    (prevstate) => ({
                        ...prevstate,
                        [levelIndex]: customRowsObject,
                    })
                );
    
            });
        }

    }

    const deleteCreditAccountRow = (e) => {

        setCreditTotalAmount( parseInt(creditTotalAmount) - parseInt(creditTableRow[e].amount) );
        delete creditTableRow[e];
        if(Object.keys(creditTableRow).length == 0){
            setCreditTableRow([]);
        }else{

            Object.keys(creditTableRow).map( (row, key) => {
                var levelIndex = creditTableRow[row]['account_code'];
                var customRowsObject = {};
                customRowsObject.account_code = levelIndex;
                customRowsObject.account_head = creditTableRow[row]['account_head'];
                customRowsObject.amount = creditTableRow[row]['amount'];
    
                setCreditTableRow(
                    (prevstate) => ({
                        ...prevstate,
                        [levelIndex]: customRowsObject,
                    })
                );
    
            });
        }
    }

    
    const submitHandler = (data, e) => {


        if( calculationValue.remark != "" && Object.keys(debitTableRow).length > 0 && Object.keys(creditTableRow).length > 0){
            data.InputValue = dropDownData;
            data.debitTableRows = debitTableRow;
            data.debit_total_amount = debitTotalAmount;
            data.creditTableRow = creditTableRow;
            data.credit_total_amount = creditTotalAmount;
            data.formValue = calculationValue;


            userPostMethod(journalVoucherAPI, data)
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
                                        <h5>Journal  Voucher</h5>
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
                                            <fieldset className="border">
                                                <legend className="w-auto text-left">Debit Accounts</legend>

                                                <div className="form-group row">
                                                    <label htmlFor="main_code" className="col-md-3 col-form-label required">Account Code</label>
                                                    <div className="col-sm-9 col-md-9">
                                                        <Select
                                                            value={debitSelectedOption}
                                                            onChange={debitHandleChange}
                                                            options={groupOption.groups}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label required">Amount:</label>
                                                    <div className="col-md-7 p-r-0">
                                                        <div className="input-group">
                                                            <span className="input-group-addon"></span>
                                                            <input 
                                                                id="debit_amount" 
                                                                name="debit_amount" 
                                                                placeholder="e.g. 50000.00" 
                                                                className="form-control" 
                                                                type="number"
                                                                min="0"
                                                                autoComplete="off"
                                                                onChange={ e => calculateFormValue(e) }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 col-md-2 pl0 mt10-mbl">
                                                        <button 
                                                            id="add_amount" 
                                                            type="button" 
                                                            className="btn btn-block btn-default"
                                                            onClick={e=>debitAddAmount(e)}
                                                        >Add
                                                        </button>
                                                    </div>
                                                </div>


                                                <table className="table table-bordered table-stripped m-t-10" style={{"max-width": "98%", "marginLeft":"1.5%"}}>
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
                                                            { (debitTableRow.length == 0) ? 
                                                                (
                                                                    <tr>
                                                                        <td colSpan="5" className="text-center">Nothing</td>
                                                                    </tr> 
                                                                ) : 
                                            
                                                                Object.keys(debitTableRow).map( (row, key) => (
                                                                    
                                                                    <tr>
                                                                        <td>{key + 1}</td>
                                                                        <td>{debitTableRow[row]['account_code']}</td>
                                                                        <td>{debitTableRow[row]['account_head']}</td>
                                                                        <td>{debitTableRow[row]['amount']}</td>
                                                                        <td><i
                                                                            class="fa fa-trash btn btn-danger"
                                                                            onClick={e=>deleteDebitAccountRow(debitTableRow[row]['account_code'])}
                                                                            />
                                                                            </td>
                                                                    </tr>
                                                                    
                                                                ))

                                                            }
                                                    </tbody>
                                                </table>


                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label required"><b>Total Amount</b></label>
                                                    <div className="col-sm-9">
                                                        <p style={{"font-size":"18px"}}>{debitTotalAmount}</p>
                                                    </div>
                                                </div>

                                            </fieldset>
                                        </div>

                                        <div className="col-md-6">
                                            <fieldset className="border">
                                            <legend className="w-auto text-left">Credit Accounts</legend>

                                            <div className="form-group row">
                                                <label htmlFor="main_code" className="col-md-3 col-form-label required">Account Code</label>
                                                <div className="col-sm-9 col-md-9">
                                                    <Select
                                                        value={creditSelectedOption}
                                                        onChange={creditHandleChange}
                                                        options={groupOption.groups}
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-md-3 col-form-label required">Amount:</label>
                                                <div className="col-md-7 p-r-0">
                                                    <div className="input-group">
                                                        <span className="input-group-addon"></span>
                                                        <input 
                                                            id="credit_amount" 
                                                            name="credit_amount" 
                                                            placeholder="e.g. 50000.00" 
                                                            className="form-control" 
                                                            type="number"
                                                            min="0"
                                                            autoComplete="off"
                                                            onChange={ e => calculateFormValue(e) }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-2 col-md-2 pl0 mt10-mbl">
                                                    <button 
                                                        id="add_amount" 
                                                        type="button" 
                                                        className="btn btn-block btn-default"
                                                        onClick={e=>creditAddAmount(e)}
                                                    >Add
                                                    </button>
                                                </div>
                                            </div>


                                            <table className="table table-bordered table-stripped m-t-10" style={{"max-width": "98%", "marginLeft":"1.5%"}}>
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
                                                        { (creditTableRow.length == 0) ? 
                                                            (
                                                                <tr>
                                                                    <td colSpan="5" className="text-center">Nothing</td>
                                                                </tr> 
                                                            ) : 

                                                            Object.keys(creditTableRow).map( (row, key) => (
                                                                
                                                                <tr>
                                                                    <td>{key + 1}</td>
                                                                    <td>{creditTableRow[row]['account_code']}</td>
                                                                    <td>{creditTableRow[row]['account_head']}</td>
                                                                    <td>{creditTableRow[row]['amount']}</td>
                                                                    <td><i
                                                                        class="fa fa-trash btn btn-danger"
                                                                        onClick={e=>deleteCreditAccountRow(creditTableRow[row]['account_code'])}
                                                                        />
                                                                        </td>
                                                                </tr>
                                                                
                                                            ))

                                                        }
                                                </tbody>
                                            </table>


                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label required"><b>Total Amount</b></label>
                                                <div className="col-sm-9">
                                                    <p style={{"font-size":"18px"}}>{creditTotalAmount}</p>
                                                </div>
                                            </div>
                                                
                                            </fieldset>
                                        </div>

                                        <div className="clearfix"></div>

                                    </div>

                                    <div className="row">
                                        <div className="co-md-12 m-t-10" style={{"width" : "100%"}}>

                                            <div className="form-group">
                                                <label className="col-sm-2 col-form-label required pull-left" htmlFor="remark">Remarks</label>
                                                <div className="col-sm-10 pull-left">
                                                    <textarea 
                                                        className="form-control" 
                                                        id="remark" 
                                                        name="remark" 
                                                        placeholder="Remarks" 
                                                        ref={register({})} 
                                                        rows="2"
                                                        onChange={e=>calculateFormValue(e)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        
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