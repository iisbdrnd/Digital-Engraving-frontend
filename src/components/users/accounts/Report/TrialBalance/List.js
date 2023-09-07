import React, { Fragment , useEffect, useState } from 'react';
import useForm from "react-hook-form";
import { userGetMethod, userDeleteMethod, userPostMethod } from '../../../../../api/userAction';
import {branches} from '../../../../../api/userUrl'
import { SubmitButton, PanelRefreshIcons } from '../../../../common/GlobalButton';

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

    useEffect( () => {
        userGetMethod(`${branches}?page=1&perPage=10`)
        .then(response => {
            setBranchData(response.data.branches.data);
            setIsLoading(false);
        })
    }, []);
    

    function onChangeValue(event) {
        setReportType(event.target.value);
    }

    const submitHandler = (data, e) => {

        const branch_id = data.branch_id;
        const account_level = data.account_level;
        console.log(branch_id, account_level)
        if(reportType == 'upto_date'){
            var url = `${process.env.PUBLIC_URL}/user/trial-balance-report-action?type=1&branch_id=${branch_id}&level_id=${account_level}`;
            console.log(url);
            window.open(url, '_blank', 'height=800,width=1200');
        }
        if(reportType == 'date_range'){
            const from_date = data.from_date;
            const to_date = data.to_date;
            var url = `${process.env.PUBLIC_URL}/user/trial-balance-report-action?type=2&branch_id=${branch_id}&level_id=${account_level}&from_date=${from_date}&to_date=${to_date}`;
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
                                            <h5>Trial Balance</h5>
                                        </div>
                                        <div className="col-md-6">
                                            {/* <PanelRefreshIcons panelRefresh={pageRefreshHandler} /> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(submitHandler)} className="needs-validation theme-form">

                                        <div className="form-group row offset-sm-1">
                                            <label className="col-sm-4 col-form-label" htmlFor="branch_id">Select Branch</label>
                                            <div className="col-sm-4">
                                                <select 
                                                    name="branch_id" 
                                                    id="branch_id" 
                                                    className="form-control" 
                                                    defaultValue=""
                                                    ref={register({
                                                        required: 'Branch Field Required'
                                                    })} 
                                                >
                                                <option value="">Select one</option>
                                                {branchData.map(branch => (
                                                    <option value={branch.id}>{branch.branch_name}</option>
                                                ))}
                                                </select>
                                                {errors.branch_id && <p className='text-danger'>{errors.branch_id.message}</p>}

                                            </div>
                                        </div>

                                        <div className="form-group row offset-sm-1">
                                            <label className="col-sm-4 col-form-label" htmlFor="branch_id">Account Level:</label>
                                            <div className="col-sm-4">
                                                <select 
                                                    name="account_level" 
                                                    id="account_level" 
                                                    className="select2 form-control" 
                                                    defaultValue=""
                                                    ref={register({
                                                        required: 'Account Level Field Required'
                                                    })} 
                                                >
                                                    <option value="" selected="">Select one</option>
                                                    <option value="1">1st Level</option>
                                                    <option value="2">2nd Level</option>
                                                    <option value="3">3rd Level</option>
                                                    <option value="4">4th Level</option>
                                                </select>
                                                {errors.account_level && <p className='text-danger'>{errors.account_level.message}</p>}
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
        )
    );
};
export default Form;