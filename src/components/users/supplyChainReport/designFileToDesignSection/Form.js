import React, { Fragment , useEffect, useState } from 'react';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton'
import Report from './Report';

const Form = (props) => {
    
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [reportType, setReportType] = useState(null);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [showPdf, setShowPdf] = useState(false);

    var menuId = 0;
    if (props.location.state === undefined) {
        menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }

    // when submit form from date and to date update and get data with api with searech params  in report component
    
    const submitHandler = (data, e) => {

        const from_date = data.from_date;
        const to_date = data.to_date;
        setFromDate(from_date);
        setToDate(to_date);
        setShowPdf(true);

        console.log('date',from_date , to_date);

        // let url = data.type === 'upto_date' ? `${process.env.PUBLIC_URL}/designToDesignReport/${from_date}` : `${process.env.PUBLIC_URL}/designToDesignReport/${data.from_date}/${data.to_date}`;
        // console.log('data form',url, data.from_date, `${process.env.PUBLIC_URL}/designToDesignReport/${from_date}` );
        // window.open(url, '_blank', 'height=800,width=1200');
    }

    return (
        <Fragment>

            {/* report pdf genarate form  */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5>Design File to Design Report</h5>
                                    </div>
                                    <div className="col-md-6">
                                        {/* <PanelRefreshIcons panelRefresh={pageRefreshHandler} /> */}
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit(submitHandler)} className="needs-validation theme-form">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label" htmlFor="from_date">Report Type</label>
                                        <div className="col-sm-4">
                                            <select className="form-control" onChange={(e)=>setReportType(e.target.value)} name="type" ref={register({ required: true })}>
                                                <option value=""> Select One </option>
                                                <option value="upto_date"> Upto Date </option>
                                                <option value="date_range"> Date Range </option>
                                            </select>
                                            {errors.type && <p className='text-danger'>{errors.type.message}</p>}
                                        </div>
                                    </div>
                                    {
                                        reportType == 'upto_date' ? (
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label" htmlFor="from_date">From</label>
                                                <div className="col-sm-4">
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
                                            </div>
                                        ): reportType == 'date_range' ? (
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label" htmlFor="from_date">Date Range</label>
                                                <div className="col-sm-4">
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td>
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
                                                                </td>
                                                                <td> <span style={{'padding': '5px'}}> - </span> </td>
                                                                <td>
                                                                    <input 
                                                                        className="form-control"
                                                                        id="to_date" 
                                                                        name="to_date" 
                                                                        type="date"
                                                                        ref={register({
                                                                            required: 'To Date Field Required'
                                                                        })}
                                                                    />
                                                                    {errors.to_date && <p className='text-danger'>{errors.to_date.message}</p>}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        ) : null
                                    }
                                    
                                    <SubmitButton link="#" offset="2" menuId={ menuId }/>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            
             {/* report pdf  */}
             {
                showPdf && <Report fromDate={fromDate} toDate={toDate} />
             }
            

        </Fragment>
    );
};
export default Form;