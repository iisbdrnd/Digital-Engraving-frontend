import React, { Fragment, useEffect, useReducer, useState } from 'react';
import { chartOfAccountAPI, chartOfAccMainCodeAPI, chartOfAccGeneralCodeAPI, chartOfAccControlCodeAPI, chartOfAccSubsidiaryCodeAPI, chartOfAccCodeAPI } from '../../../../../api/userUrl';
import { userGetMethod, userDeleteMethod, userPostMethod } from '../../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton, PanelRefreshIcons } from '../../../../common/GlobalButton';
import { ToggleButton } from "../../../../common/toggleBtn/toggleButton";

const Add = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    // const [selected, setSelected] = useState(false);
    
    const [submit, setSubmit] = useState(true);

    const [errorHandler, setErrorHandler] = useState({subsidiary_code: ''});
    const [ inputValue, setInputValue] = useState({
        main_code: '0', 
        general_code: '0', 
        control_code: '00', 
        subsidiary_code: '000000', 
        account_code: '0000000000',
        account_head: "No Exists",
    });

    const [codeText, setCodeText] = useState({ 
            main_code: 'Main Classification', 
            general_code: 'General Classification', 
            control_code: 'Control Classification', 
            subsidiary_code: 'Subsidiary Classification'
    });


    var menuId = 0;
    if (props.location.state === undefined) {
        var menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }

    const pageRefreshHandler = () => {
        setIsLoading(true);
        setIsLoading(false);
    }

    const changeHandler = (event) => {

        let paramName = event.target.name;
        let paramValue = event.target.value;
        let paramFrom = event.target.from;

        switch( paramName ) {
            case "main_code": 

                if(paramValue.length == 1 && paramValue !=0){
                    userGetMethod(`${chartOfAccMainCodeAPI}?mainCode=${paramValue}`)
                    .then(response => {
                        console.log("data", response.data);
                        setCodeText(
                            (prevstate) => ({
                                ...prevstate,
                                main_code: response.data.main_acc_head,
                            })
                        );
                        var account_code_value;
                        if(paramFrom == "account_code"){
                            account_code_value = paramValue;
                        }else{
                            account_code_value = `${paramValue}${"00000000"}`;
                        }
        
                        setInputValue(
                            (prevstate) => ({
                                ...prevstate,
                                main_code : paramValue,
                                account_head: response.data.main_acc_head,
                                account_code: account_code_value,
                                general_code: '0',
                                control_code: '00',
                                subsidiary_code: '000000'
        
                                
                            })
                        );
                    })
                    .catch(error => console.log(error))
                }else{
                    toast.error("main code must be single positive number");
                }
                break;

            case "general_code": 
                if(paramValue.length <= 1){
                    userGetMethod(`${chartOfAccGeneralCodeAPI}?generalCode=${paramValue}&mainCode=${inputValue.main_code}`)
                    .then(response => {
                        console.log("data", response.data);
                        setCodeText(
                            (prevstate) => ({
                                ...prevstate,
                                general_code: response.data.general_acc_head,
                            })
                        );

                        var account_code_value;
                        if(paramFrom == "account_code"){
                            account_code_value = `${inputValue.main_code}${paramValue}`;
                        }else{
                            account_code_value = `${inputValue.main_code}${paramValue}${"00000000"}`;
                        }

                        setInputValue(
                            (prevstate) => ({
                                ...prevstate,

                                general_code: paramValue,
                                control_code: '00',
                                subsidiary_code: '000000',
                                account_code: account_code_value,
                                account_head: response.data.general_acc_head,

                            })
                        );
                    })
                    .catch(error => console.log(error))
                }
                break;

            case "control_code":

                if(paramValue.length <= 2){
                    userGetMethod(`${chartOfAccControlCodeAPI}?controlCode=${paramValue}&mainCode=${inputValue.main_code}&generalCode=${inputValue.general_code}`)
                    .then(response => {
                        console.log("data", response.data);
                        setCodeText(
                            (prevstate) => ({
                                ...prevstate,
                                control_code: response.data.control_account_head,
                            })
                        );
    
                        var account_code_value;
                        if(paramFrom == "account_code"){
                            account_code_value = `${inputValue.main_code}${inputValue.general_code}${paramValue}`;
                        }else{
                            account_code_value = `${inputValue.main_code}${inputValue.general_code}${paramValue}${"000000"}`;
                        }
    
                        setInputValue(
                            (prevstate) => ({
                                ...prevstate,
                                control_code: paramValue,
                                subsidiary_code: '000000',
                                account_code: account_code_value,
                                account_head: response.data.control_account_head,
    
                            })
                        );
                    })
                    .catch(error => console.log(error))
                }
                break;

            case "subsidiary_code":
                if(paramValue.length <= 6){
                    setSubmit(true);
                    userGetMethod(`${chartOfAccSubsidiaryCodeAPI}?subsidiaryCode=${paramValue}&controlCode=${inputValue.control_code}&mainCode=${inputValue.main_code}&generalCode=${inputValue.general_code}`)
                    .then(response => {
                        console.log("data", response.data);
                        setCodeText(
                            (prevstate) => ({
                                ...prevstate,
                                subsidiary_code: response.data.subsidiary_account_head,
                            })
                        );
        
                        setInputValue(
                            (prevstate) => ({
                                ...prevstate,
                                subsidiary_code: paramValue,
                                account_code: `${inputValue.main_code}${inputValue.general_code}${inputValue.control_code}${paramValue}`,
                                account_head: response.data.subsidiary_account_head,
        
                            })
                        );
                    })
                    .catch(error => console.log(error))
                }
               break;
            case "account_code":
                if(paramValue.length <= 10){
                    if(paramValue.length == 1){
                        var eventObj = {
                            target :  {
                                name : "main_code",
                                value: paramValue[0],
                                from: "account_code"
                            }
                        };
                        changeHandler(eventObj);
                    }else if(paramValue.length == 2){
                        var eventObj = {
                            target :  {
                                name : "general_code",
                                value: paramValue[1],
                                from: "account_code"
                            }
                        };
                        changeHandler(eventObj);
                    }else if(paramValue.length == 4){
                        var eventObj = {
                            target :  {
                                name : "control_code",
                                value: paramValue.slice(2, 4),
                                from: "account_code"
                            }
                        };
                        changeHandler(eventObj);
                    }else if(paramValue.length == 10){
                        var eventObj = {
                            target :  {
                                name : "subsidiary_code",
                                value: paramValue.slice(4, 10),
                                from: "account_code"
                            }
                        };
                        changeHandler(eventObj);
                    }else{
                        setInputValue(
                            (prevstate) => ({
                                ...prevstate,
                                account_head: "No Exists",
        
                            })
                        );
                    }
                    setInputValue(
                        (prevstate) => ({
                            ...prevstate,
                            account_code: paramValue,
                            
                        })
                    );
                }
               break;

            case "account_head":
                setInputValue(
                    (prevstate) => ({
                        ...prevstate,
                        account_head: paramValue,
                        
                    })
                );
               break;

            default:
              console.log('default');
              break;
        }
    }





    const submitHandler = (data, e) => {
        if(submit){
            userPostMethod(chartOfAccountAPI, inputValue)
            .then(response => {
                if (response.data.status == 1) {
                    toast.success(response.data.messege)
                } else {
                    toast.error(response.data.messege)
                }
            })
            .catch(error => toast.error(error))
        }else{
            toast.error("something wrong !!")
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
                                        <h5>Chart Of Accounts</h5>
                                    </div>
                                    <div className="col-md-6">
                                        {/* <PanelRefreshIcons panelRefresh={pageRefreshHandler} /> */}
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                    
                                    <fieldset className="border col-md-6 offset-sm-3">

                                        <legend className="w-auto text-left"></legend>
                                        <div className="form-group row">
                                                <label htmlFor="main_code" className="col-md-3 col-form-label required">Main</label>
                                                <div className="col-md-4">
                                                    <input 
                                                        type="number" 
                                                        required 
                                                        id="main_code" 
                                                        name="main_code" 
                                                        min="0" 
                                                        max="4" 
                                                        placeholder="0"
                                                        className="form-control" 
                                                        onChange={changeHandler}
                                                        value={inputValue.main_code}
                                                    />
                                                </div>
                                                <label className="col-md-5 col-form-label" style={{"textAlign": "left"}}>&rArr; <span id="mainClass">{(codeText.main_code == "" ? "Main Classification" : codeText.main_code)}</span></label>
                                            </div>

                                        <div className="form-group row">
                                            <label htmlFor="general_code" className="col-md-3 col-form-label required">General</label>
                                            <div className="col-md-4">
                                                <input 
                                                    type="number" 
                                                    required 
                                                    id="general_code" 
                                                    name="general_code" 
                                                    min="0" 
                                                    max="9" 
                                                    placeholder={inputValue.general_code}
                                                    className="form-control" 
                                                    onChange={changeHandler}
                                                    value={inputValue.general_code}
                                                />
                                            </div>
                                            <label className="col-md-5 col-form-label" style={{"textAlign": "left"}}>&rArr; <span id="mainClass">{(codeText.general_code == "" ? "General Classification" : codeText.general_code)}</span></label>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="control_code" className="col-md-3 col-form-label required">Control</label>
                                            <div className="col-md-4">
                                                <input 
                                                        type="text" 
                                                        required 
                                                        id="control_code" 
                                                        name="control_code" 
                                                        placeholder={inputValue.control_code}
                                                        className="form-control" 
                                                        onChange={changeHandler}
                                                        value={inputValue.control_code}
                                                    />
                                            </div>
                                            <label className="col-md-5 col-form-label" style={{"textAlign": "left"}}>&rArr; <span id="mainClass">{(codeText.control_code == "" ? "General Classification" : codeText.control_code)}</span></label>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="subsidiary_code" className="col-md-3 col-form-label required">Subsidiary</label>
                                            <div className="col-md-4">
                                                <input 
                                                        type="text" 
                                                        required 
                                                        id="subsidiary_code" 
                                                        name="subsidiary_code" 
                                                        placeholder={inputValue.subsidiary_code}
                                                        className="form-control" 
                                                        onChange={changeHandler}
                                                        value={inputValue.subsidiary_code}
                                                    />
                                            </div>
                                            <label className="col-md-5 col-form-label" style={{"textAlign": "left"}}>&rArr; <span id="mainClass">{(codeText.subsidiary_code == "" ? "Subsidiary Classification" : codeText.subsidiary_code)}</span></label>
                                        </div>

                                    </fieldset>


                                    <fieldset className="border m-t-10 col-md-6 offset-sm-3">
                                        <legend className="w-auto text-left"></legend>
                                        <div className="form-group row">
                                            <label htmlFor="account_code" className="col-md-3 col-form-label required">Account Code</label>
                                            <div className="col-md-9">
                                                <input 
                                                    type="text" 
                                                    required 
                                                    id="account_code" 
                                                    name="account_code" 
                                                    placeholder={ inputValue.account_code}
                                                    className="form-control" 
                                                    onChange={changeHandler}
                                                    value={ inputValue.account_code}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="account_head" className="col-md-3 col-form-label required">Account Head</label>
                                            <div className="col-md-9">
                                                <input 
                                                    type="text" 
                                                    required 
                                                    id="account_head" 
                                                    name="account_head" 
                                                    placeholder={( inputValue.account_head == "" ? "No Exists" : inputValue.account_head )}
                                                    className="form-control" 
                                                    onChange={changeHandler}
                                                    value={( inputValue.account_head == "" ? "No Exists" : inputValue.account_head )}
                                                />
                                            </div>
                                        </div>

                                    </fieldset>

                                    <SubmitButton offset="5" link="chartOfAccounts/index" menuId={ menuId } />
                                </form>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        
        </Fragment>
    );
};

export default Add;