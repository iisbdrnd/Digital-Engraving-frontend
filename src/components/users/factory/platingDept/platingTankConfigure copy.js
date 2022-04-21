import React, { Fragment, useEffect, useState, useReducer } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { toast } from 'react-toastify';
import { MACHINE_RSURL, userHasAccess } from '../../../../api/userUrl';
import { userGetMethod, userDeleteMethod } from '../../../../api/userAction';
import { ValidationAlerts, SubmitButton } from '../../../common/GlobalButton';
import { Link } from 'react-router-dom'
import RowAppend from './RowAppend'


export default function ListData(props) {
    const { handleSubmit, register, errors } = useForm();
    const [validateErrors, setValidateErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [rowCount, setRowCount] = useState([1, 2, 3, 4]);
    let [platingData, setPlatingData] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            cylinder_id         : '',
        }
    );
    var menuId = 0;
    if (props.location.state === undefined) {
        menuId = 0;
    } else {
        menuId = props.location.state.params.menuId;
    }
    // FOR ORDER DETAILS DATA INPUT
    const cylinderDetailsInputHander = (i, e, fieldName) => {
        setPlatingData(
            {
                [fieldName]: {
                    ...platingData[fieldName],
                    [i]: e.target.value
                }
            }
        )
    }

    // useEffect(() => {
    //     // ADD,EDIT,DELETE,SHOW ACCESS CHECK
    //     userGetMethod(`${userHasAccess}/${menuId}`)
    //         .then(response => {
    //             setHasAccess(response.data);
    //             setAccLoad(false);
    //         });
        
    // },[]);
	
	const addRow = () => {
        rowCount.push(rowCount.length + 1);
		setRowCount([
            ...rowCount
        ]);
	}
    console.log('rowCount ', rowCount);

    const rows = () => {
        let tbodyRows = [];
        rowCount.length && rowCount.map((item, index) => {
            tbodyRows.push(<RowAppend data={platingData.cylinder_id[index]} rowIndex={index} changeHandler={cylinderDetailsInputHander} clickAdd={addRow} clickRemove={removeRow} />)
        });

        return tbodyRows;
    }


	const removeRow = (removeIndex) => {
        let rowCountNew = rowCount.filter((item, index) => index != removeIndex );
        setRowCount(rowCountNew);
        rows();
        // let inputDataNew = Object.keys(platingData.cylinder_id[removeIndex]);
        // delete platingData.cylinder_id[inputDataNew];
	}
    console.log('inputDataNew ', platingData.cylinder_id);

    const submitHandler = () => {}

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Machine Form</h5>
                            </div>
                            <div className="card-body">
                                {validateErrors.length > 0 ? <ValidationAlerts items={validateErrors} setOpenVal={true} /> : '' }

                                {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="cycle_no">Cycle #</label>
                                                <div className="col-sm-8">
                                                    <input 
                                                        className="form-control"
                                                        id="cycle_no" 
                                                        name="cycle_no" 
                                                        type="text" 
                                                        placeholder="Cycle No"
                                                        autoComplete="off"
                                                        ref={register({
                                                            required: 'Cycle No Field Required'
                                                        })}
                                                    />
                                                    {errors.cycle_no && <p className='text-danger'>{errors.cycle_no.message}</p>}
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="plating_order">Final Plating Order</label>
                                                <div className="col-sm-8">
                                                    <input 
                                                        className="form-control"
                                                        id="plating_order" 
                                                        name="plating_order" 
                                                        type="number" 
                                                        placeholder="Plating Order"
                                                        autoComplete="off"
                                                        ref={register({
                                                            required: 'Plating Order Field Required'
                                                        })}
                                                    />
                                                    {errors.plating_order && <p className='text-danger'>{errors.plating_order.message}</p>}
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="start_date_time">Start Date & Time</label>
                                                <div className="col-sm-8">
                                                    <input 
                                                        className="form-control"
                                                        id="start_date_time" 
                                                        name="start_date_time" 
                                                        type="datetime-local" 
                                                        placeholder="Start Date & Time"
                                                        autoComplete="off"
                                                        ref={register({
                                                            required: 'Start Date & Time Field Required'
                                                        })}
                                                    />
                                                    {errors.start_date_time && <p className='text-danger'>{errors.start_date_time.message}</p>}
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="est_cycle_duration">Est. Cycle Duration</label>
                                                <div className="col-sm-8">
                                                    <input 
                                                        className="form-control"
                                                        id="est_cycle_duration" 
                                                        name="est_cycle_duration" 
                                                        type="time" 
                                                        placeholder="Est. Cycle Duration"
                                                        autoComplete="off"
                                                        ref={register({
                                                            required: 'Est. Cycle Duration Field Required'
                                                        })}
                                                    />
                                                    {errors.est_cycle_duration && <p className='text-danger'>{errors.est_cycle_duration.message}</p>}
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="operator_id">Operator</label>
                                                <div className="col-sm-8">
                                                    <select className="form-control" id="operator_id" name="operator_id"
                                                        ref={register({
                                                            required: 'Operator Field Required'
                                                        })} >
                                                        <option value="">Select</option>
                                                    </select>
                                                    {errors.operator_id && <p className='text-danger'>{errors.operator_id.message}</p>}
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="plating_date">Plating Date</label>
                                                <div className="col-sm-8">
                                                    <input 
                                                        className="form-control"
                                                        id="plating_date" 
                                                        name="plating_date" 
                                                        type="date" 
                                                        placeholder="Plating Date"
                                                        autoComplete="off"
                                                        ref={register({
                                                            required: 'Plating Date Field Required'
                                                        })}
                                                    />
                                                    {errors.plating_date && <p className='text-danger'>{errors.plating_date.message}</p>}
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="plating_shift">Shift</label>
                                                <div className="col-sm-8">
                                                    <select className="form-control" id="plating_shift" name="plating_shift"
                                                        ref={register({
                                                            required: 'Shift Field Required'
                                                        })} >
                                                        <option value=""> Select </option>
                                                        <option value="1"> Day </option>
                                                        <option value="2"> Evening </option>
                                                        <option value="3"> Night </option>
                                                    </select>
                                                    {errors.plating_shift && <p className='text-danger'>{errors.plating_shift.message}</p>}
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="est_end_date_time">Est. End Date & Time</label>
                                                <div className="col-sm-8">
                                                    <input 
                                                        className="form-control"
                                                        id="est_end_date_time" 
                                                        name="est_end_date_time" 
                                                        type="datetime-local" 
                                                        placeholder="Est. End Date & Time"
                                                        autoComplete="off"
                                                        ref={register({
                                                            required: 'Est. End Date & Time Field Required'
                                                        })}
                                                    />
                                                    {errors.est_end_date_time && <p className='text-danger'>{errors.est_end_date_time.message}</p>}
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="actual_end_date_time">Actual End Date & Time</label>
                                                <div className="col-sm-8">
                                                    <input 
                                                        className="form-control"
                                                        id="actual_end_date_time" 
                                                        name="actual_end_date_time" 
                                                        type="datetime-local" 
                                                        placeholder="Actual End Date & Time"
                                                        autoComplete="off"
                                                        ref={register({
                                                            required: 'Actual End Date & Time Field Required'
                                                        })}
                                                    />
                                                    {errors.actual_end_date_time && <p className='text-danger'>{errors.actual_end_date_time.message}</p>}
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label" htmlFor="actual_cycle_duration">Actual Cycle Duration</label>
                                                <div className="col-sm-8">
                                                    <input 
                                                        className="form-control"
                                                        id="actual_cycle_duration" 
                                                        name="actual_cycle_duration" 
                                                        type="time" 
                                                        placeholder="Actual Cycle Duration"
                                                        autoComplete="off"
                                                        ref={register({
                                                            required: 'Actual Cycle Duration Field Required'
                                                        })}
                                                    />
                                                    {errors.actual_cycle_duration && <p className='text-danger'>{errors.actual_cycle_duration.message}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label" htmlFor="cycle_remarks">Cycle Remarks</label>
                                                <div className="col-sm-10">
                                                    <input 
                                                        className="form-control"
                                                        id="cycle_remarks" 
                                                        name="cycle_remarks" 
                                                        type="text" 
                                                        placeholder="Cycle Remarks"
                                                        autoComplete="off"
                                                        ref={register({
                                                            required: 'Cycle Remarks Field Required'
                                                        })}
                                                    />
                                                    {errors.cycle_remarks && <p className='text-danger'>{errors.cycle_remarks.message}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="row">
										<table className="table table-bordered" style={{width: '100%'}}>
											<thead>
												<tr>
													<th scope="col" width="5%">Slot</th>
													<th scope="col" width="10%">Cylinder Id</th>
													<th scope="col" width="15%">Job Name</th>
													<th scope="col" width="5%">FL</th>
													<th scope="col" width="5%">Cir</th>
													<th scope="col" width="5%">Dia</th>
													<th scope="col" width="10%">Plating Order</th>
													<th scope="col" width="10%">Surface Area</th>
													<th scope="col" width="10%">Priority Level</th>
													<th scope="col" width="10%">QC Level</th>
													<th scope="col" width="10%">With Copper</th>
													<th scope="col" width="5%">Action</th>
												</tr>
											</thead>

											<tbody>
                                                {rows()}
											</tbody>
										</table>         
                                    </div>

                                    <SubmitButton link="platingDept/index" addClass="offset-md-2" menuId={ menuId } />
                                </form>
                                )}
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        
        </Fragment>
    )
}