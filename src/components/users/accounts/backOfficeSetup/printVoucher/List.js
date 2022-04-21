import React, { Fragment, useEffect, useReducer, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { PrintVoucherReportAPI } from '../../../../../api/userUrl';
import { userGetMethod, userDeleteMethod, userPostMethod } from '../../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { SubmitButton, PanelRefreshIcons } from '../../../../common/GlobalButton';
import { ToggleButton } from "../../../../common/toggleBtn/toggleButton";
import { useBlockLayout } from 'react-table';

export default function List(props) {
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [hasAccess, setHasAccess] = useState({});
    const [ isShowDateRange, setIsShowDateRange ] = useState(false);
    const [ isShowTransaction, setIsShowTransaction ] = useState(true);
    const [ isSubmit, setIsSubmit ] = useState(true);

    var counter = 1;

    const showDiv = {"display": "block"}

    const hiddenDiv = { "display" : "none"}

    let [calculationValue, setCalculationValue] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            voucher_type : 1,
            transaction_no : "",
            transaction_date : "",
            from_date: "",
            to_date: ""
        }
    );


    var menuId = 0;
    if (props.location.state === undefined) {
        menuId = 0;
    } else {
        menuId = props.location.state.params.menuId;
    }
    
    useEffect(() => {
        setIsLoading(false);
    },[]);


    const calculateFormValue = (event) => {
        setCalculationValue(
            {[event.target.name] : event.target.value},
        );
    }

 
    const handleClick = (type) => {

        if(type == 2){
            setIsShowDateRange(true);
            setIsShowTransaction(false);
        }else{
            setIsShowDateRange(false);
            setIsShowTransaction(true);
        }
    
    }

    const submitHandler = (data, e) => {

        if(isShowTransaction){

            console.log(calculationValue);

            if(calculationValue.transaction_no == '' || calculationValue.transaction_date == ''){
                toast.error("Please fill up all field !!");
                setIsSubmit(false);
                counter = 0;
            }else{
                setIsSubmit(true);
                counter = 1;
                toast.success("successfully");
            }
        }else if(isShowDateRange){
            if(calculationValue.from_date == '' || calculationValue.to_date == ''){
                toast.error("Please fill up all field !!");
                setIsSubmit(false);
                counter = 0;
            }else{
                toast.success("successfully");
                setIsSubmit(true);
                counter = 1;
            }
        }else{
            toast.error("Something Wrong !!");
            setIsSubmit(false);
            counter = 0;
        }

        if(counter == 1){

            if(calculationValue.voucher_type == 1){
                var transaction_num = calculationValue.transaction_no;
                var transaction_date = calculationValue.transaction_date;

                var url = `${process.env.PUBLIC_URL}/user/print-voucher-report?voucher_type=1&tran_no=${transaction_num}&tran_date=${transaction_date}`;
                window.open(url, '_blank', 'height=800,width=1200');

            }else if(calculationValue.voucher_type == 2){
                var from_date = calculationValue.from_date;
                var to_date = calculationValue.to_date;

                var url = `${process.env.PUBLIC_URL}/user/print-voucher-report?voucher_type=2&from_date=${from_date}&to_date=${to_date}`;
                window.open(url, '_blank', 'height=800,width=1200');


            }else{                            
                var url = `${process.env.PUBLIC_URL}/user/print-voucher-report`;
                window.open(url, '_blank', 'height=800,width=1200');
            }
            

        }

    }


    return (
        
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5>Print Previous Voucher</h5>
                                    </div>
                                    <div className="col-md-6">
                                        <ul className="d-flex pull-right">
                                            <li className="p-r-10"><i className="fa fa-rotate-right"></i></li>
                                            <li className="p-r-10"><i className="fa fa-minus"></i></li>
                                            <li className="p-r-10"><i className="icon-close"></i></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="card-body">

                            {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                        
                                        <div className="row">
                                            <div className="col-md-12 col-lg-12">

                                                <div className="col-lg-4 col-md-4 offset-sm-4 m-t-20">
                                                    <div className="radio-custom radio-inline pull-left m-r-15">
                                                        <input 
                                                            name="voucher_type"  
                                                            value="1" 
                                                            id="transaction" 
                                                            onClick={ e => handleClick(1)}
                                                            type="radio" 
                                                            defaultChecked={true} 
                                                            onChange={ e => calculateFormValue(e) }
                                                        />
                                                        <label htmlFor="transaction">Transaction No.</label>
                                                    </div>
                                                    <div className="radio-custom radio-inline">
                                                        <input 
                                                            name="voucher_type"  
                                                            value="2" 
                                                            id="date_range" 
                                                            type="radio"
                                                            onClick={ e => handleClick(2)}
                                                            onChange={ e => calculateFormValue(e) }
                                                        />
                                                        <label htmlFor="date_range">Date Range</label>
                                                    </div>
                                                </div>

                                                <div id="transaction_div" style={isShowTransaction ? showDiv : hiddenDiv } >
                                                    <div className="form-group">
                                                        <div className="col-lg-4 col-md-4 offset-sm-4">
                                                            <input 
                                                                id="transaction_no" 
                                                                name="transaction_no" 
                                                                placeholder="Enter Transaction No." 
                                                                className="form-control" 
                                                                data-fv-row=".col-md-4" 
                                                                onChange={ e => calculateFormValue(e) }
                                                            /> 
                                                        </div>
                                                    </div>
                                                    <div className="form-group m-t-10">
                                                        <div className="col-lg-4 col-md-4 offset-sm-4">
                                                            <div className="input-group">
                                                                <input 
                                                                    id="transaction_date" 
                                                                    name="transaction_date" 
                                                                    type="date" 
                                                                    className="form-control" 
                                                                    onChange={ e => calculateFormValue(e) }
                                                                />

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div id="date_range_div" style={isShowDateRange ? showDiv : hiddenDiv  }>
                                                    <div className="form-group">
                                                        <div className="col-lg-4 col-md-4 offset-sm-4">
                                                            <div className="input-group">
                                                                <input 
                                                                    id="from_date" 
                                                                    name="from_date"
                                                                    type="date"
                                                                    placeholder="From Date: dd/mm/yyyy" 
                                                                    className="form-control" 
                                                                    onChange={ e => calculateFormValue(e) }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="col-lg-4 col-md-4 offset-sm-4 m-t-10">
                                                            <div className="input-group">
                                                                <input 
                                                                    id="to_date" 
                                                                    name="to_date" 
                                                                    type="date"
                                                                    placeholder="To Date: dd/mm/yyyy" 
                                                                    className="form-control"
                                                                    onChange={ e => calculateFormValue(e) } 
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            
                                            </div>                               
                                        </div>

                                        <div className="card-footer">
                                            <button className="btn btn-primary btn-sm mr-1" type="submit">Preview</button>
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
    )
}