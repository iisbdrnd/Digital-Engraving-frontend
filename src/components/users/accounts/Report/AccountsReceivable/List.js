import React, { Fragment , useEffect, useState } from 'react';
import Select from "react-select";
import useForm from "react-hook-form";
import { userGetMethod, userDeleteMethod, userPostMethod } from '../../../../../api/userAction';
import {AccountsReceivableList} from '../../../../../api/userUrl'
import { SubmitButton, PanelRefreshIcons } from '../../../../common/GlobalButton';
import { toast } from 'react-toastify';

const Form = (props) => {

    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [reportType, setReportType] = useState('upto_date');
    const [branchData, setBranchData] = useState([]);

    var menuId = 0;
    if (props.location.state === undefined) {
        menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }
    
    useEffect(() => {
        userGetMethod(`${AccountsReceivableList}`)
        .then(response => {
            setBranchData(response.data.branches);
            setIsLoading(false);
        })
        .catch(error => console.log(error))
    }, []);
    

    function onChangeValue(event) {
        setReportType(event.target.value);
    }

    const submitHandler = (data, e) => {
        const branch_id = data.branch_id;

        if(reportType == 'upto_date'){
            var url = `${process.env.PUBLIC_URL}/user/accounts-receivable-report-action?type=1&branch_id=${branch_id}&`;
            window.open(url, '_blank', 'height=800,width=1200');
        }

        if(reportType == 'date_range'){
            const to_date = data.to_date;
            var url = `${process.env.PUBLIC_URL}/user/accounts-receivable-report-action?type=2&branch_id=${branch_id}&to_date=${to_date}&`;
            window.open(url, '_blank', 'height=800,width=1200');
        }
     
    }

    return (
        isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
        (
            <Fragment>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h5>Accounts Receivable</h5>
                                        </div>
                                        <div className="col-md-6">
                                            {/* <PanelRefreshIcons panelRefresh={pageRefreshHandler} /> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(submitHandler)} className="needs-validation theme-form">

                                        <div className="form-group row offset-sm-1">
                                            <label className="col-sm-4 col-form-label" htmlFor="branch_id">Select Branchss</label>
                                            <div className="col-sm-4">
                                                <select 
                                                    name="branch_id" 
                                                    id="branch_id" 
                                                    className="form-control" 
                                                    defaultValue=""
                                                    ref={register({
                                                        
                                                    })} 
                                                >
                                                <option value="">All Branches</option>
                                                {branchData.map(branch => (
                                                    <option value={branch.id}>{branch.branch_name}</option>
                                                ))}
                                                </select>
                                                {errors.branch_id && <p className='text-danger'>{errors.branch_id.message}</p>}

                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <div className="col-sm-4 offset-sm-4" onChange={onChangeValue}>
                                                <input 
                                                    name="upto_date" 
                                                    value="upto_date" 
                                                    id="upto_date" 
                                                    type="radio" 
                                                    checked={reportType === "upto_date"}
                                                />
                                                <label className="col-form-label mr10" htmlFor="upto_date">Upto date</label>

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
                                            reportType == 'date_range' ? (

                                                <div className="form-group row">

                                                    <div className="col-lg-4 col-md-4 offset-sm-4">
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
                                        
                                        <div className="col-md-4 offset-sm-4 m-t-11" style={{'padding':'0', 'marginTop' : '1%'}}>
                                            <button className="btn btn-primary btn-sm mr-1" type="submit">Submit</button>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    );
};
export default Form;