import React, { Fragment , useEffect, useState } from 'react';
import useForm from "react-hook-form";
import { SubmitButton, PanelRefreshIcons } from '../../../../common/GlobalButton';

const Form = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [reportType, setReportType] = useState('tran_number');

    var menuId = 0;
    if (props.location.state === undefined) {
        menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }
    

    function onChangeValue(event) {
        setReportType(event.target.value);
    }


    const submitHandler = (data, e) => {

        if(reportType == 'tran_number'){
            const transaction_no = data.transaction_no;
            const tran_date = data.tran_date;
            var url = `${process.env.PUBLIC_URL}/user/print-previous-voucher-report?voucher_type=1&tran_no=${transaction_no}&tran_date=${tran_date}`;
            window.open(url, '_blank', 'height=800,width=1200');
        }
        if(reportType == 'date_range'){
            const from_date = data.from_date;
            const to_date = data.to_date;
            var url = `${process.env.PUBLIC_URL}/user/print-previous-voucher-report?voucher_type=2&from_date=${from_date}&to_date=${to_date}`;
            window.open(url, '_blank', 'height=800,width=1200');
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
                                        <h5>Pring Voucher</h5>
                                    </div>
                                    <div className="col-md-6">
                                        {/* <PanelRefreshIcons panelRefresh={pageRefreshHandler} /> */}
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit(submitHandler)} className="needs-validation theme-form">

                                    <div className="form-group row">
                                        <div className="col-sm-4 offset-sm-4" onChange={onChangeValue}>
                                            <input 
                                                name="voucher_type" 
                                                value="tran_number" 
                                                id="transaction" 
                                                type="radio" 
                                                checked={reportType === "tran_number"}
                                            />
                                            <label className="col-form-label mr10" htmlFor="transaction">Transaction No.</label>

                                            <input 
                                                name="voucher_type" 
                                                value="date_range" 
                                                id="date_range" 
                                                type="radio" 
                                                className="m-l-10"
                                                checked={reportType === "date_range"}
                                            />
                                            <label className="col-form-label" htmlFor="date_range">Date Range</label>
                                        </div>

                                    </div>

                                    { 
                                        reportType == 'tran_number' ? (

                                            <div className="form-group">

                                                <div className="form-group row">

                                                    <div className="col-lg-4 col-md-4 offset-sm-4">
                                                        <input 
                                                            id="transaction_no" 
                                                            name="transaction_no" 
                                                            placeholder="Enter Transaction No." 
                                                            className="form-control" 
                                                            data-fv-row=".col-md-4" 
                                                            ref={register({
                                                                required: 'Transaction Field is Required'
                                                            })}
                                                        />
                                                        {errors.transaction_no && <p className='text-danger'>{errors.transaction_no.message}</p>}
                                                    </div>

                                                </div>

                                                <div className="form-group row m-t-10">

                                                    <div className="col-lg-4 col-md-4 offset-sm-4">
                                                        <input 
                                                            className="form-control"
                                                            id="tran_date" 
                                                            name="tran_date" 
                                                            type="date"
                                                            ref={register({
                                                                required: 'From Date Field Required'
                                                            })}
                                                        />
                                                        {errors.tran_date && <p className='text-danger'>{errors.tran_date.message}</p>}
                                                    </div>             
                                                </div>

                                            </div>
                                            
                                           


                                        ): reportType == 'date_range' ? (

                                            <div className="form-group row">

                                                <div className="col-lg-4 col-md-4 offset-sm-4">
                                                    <input 
                                                        className="form-control"
                                                        id="from_date" 
                                                        name="from_date" 
                                                        type="date"
                                                        ref={register({
                                                            required: 'From Date Field Required'
                                                        })}
                                                    />
                                                    {errors.from_date && <p className='text-danger'>{errors.from_date.message}</p>}
                                                </div>
                                
                                            
                                                <div className="col-lg-4 col-md-4 offset-sm-4 m-t-10">
                                                    <input 
                                                        className="form-control"
                                                        id="to_date" 
                                                        name="to_date" 
                                                        type="date"
                                                        ref={register({
                                                            required: 'From Date Field Required'
                                                        })}
                                                    />
                                                    {errors.to_date && <p className='text-danger'>{errors.to_date.message}</p>}
                                                </div>

                                            </div>

                                        ): null
                                    
                                    }
                                    
                                        <div className="col-md-4 offset-sm-4 m-t-11" style={{'padding':'0'}}>
                                            <button className="btn btn-primary btn-sm mr-1" type="submit">Submit</button>
                                        </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
export default Form;