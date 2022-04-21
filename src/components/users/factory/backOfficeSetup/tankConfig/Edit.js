import React, { Fragment, useEffect, useReducer, useState } from 'react';
import { TANK_CONFIG_RSURL } from '../../../../../api/userUrl';
import { userGetMethod, userPutMethod } from '../../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton, ValidationAlerts } from '../../../../common/GlobalButton';

const Edit = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [validateErrors, setValidateErrors] = useState([]);

    var menuId = 0;
    if (props.location.state === undefined) {
        var menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }

    const [tankConfigData, setTankConfigData] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            tank_name                             : '',
            tank_for                              : '',
            tank_type                             : '',
            capacity_fl                           : '',
            capacity_fl_tolerance                 : '',
            capacity_sq_cm                        : '',
            slot_gap_one                          : '',
            slot_gap_two                          : '',
            first_cyl_fl                          : '',
            second_cyl_fl                         : '',
            plating_order_tolerance_without_copper: '',
            plating_order_tolerance_with_copper   : '',
            cir_tolerance                         : '',
            can_take_thin_plating_tank            : '',
            max_cyl_cycle                         : '',
            isLoading                             : true
        }
    );

    const tankId = props.match.params.tankId;

    const changeHandler = (event) => {
        setTankConfigData({[event.target.name]: event.target.value});
    }

    useEffect(() => {
        userGetMethod(`${TANK_CONFIG_RSURL}/${tankId}/edit`)
            .then(response => {
                let {tank_name, tank_for, tank_type, capacity_fl, capacity_fl_tolerance, capacity_sq_cm, slot_gap_one, slot_gap_two, first_cyl_fl, second_cyl_fl, plating_order_tolerance_without_copper, plating_order_tolerance_with_copper, cir_tolerance, can_take_thin_plating_tank, max_cyl_cycle} = response.data.tankConfig;
                setTankConfigData({ 
                    tank_name, tank_for, tank_type, capacity_fl, capacity_fl_tolerance, capacity_sq_cm, slot_gap_one, slot_gap_two, first_cyl_fl, second_cyl_fl, plating_order_tolerance_without_copper, plating_order_tolerance_with_copper, cir_tolerance, can_take_thin_plating_tank, max_cyl_cycle,
                    isLoading : false
                });
            })
            .catch(error => console.log(error))   
    },[]);

    const submitHandler = (data, e) => {
        
        userPutMethod(`${TANK_CONFIG_RSURL}/${tankId}`, data)
            .then(response => {
                if (response.data.status == 1) {
                    toast.success(response.data.message)
                } else {
                    setValidateErrors([])
                    toast.error(response.data.message)
                    setValidateErrors(Object.values(response.data.errors))
                }
            })
            .catch(error => toast.error(error))
    }

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">

                        <div className="card">
                            <div className="card-header">
                                <h5>Tank Configuration Update Form</h5>
                            </div>
                            <div className="card-body"> 
                                {validateErrors.length > 0 ? <ValidationAlerts items={validateErrors} setOpenVal={true} /> : '' }
                                {tankConfigData.isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="tank_name">Tank Name</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control"
                                                            id="tank_name" 
                                                            name="tank_name" 
                                                            type="text" 
                                                            placeholder="Tank Name"
                                                            autoComplete="off"
                                                            onChange={changeHandler}
                                                            value={tankConfigData.tank_name}
                                                            ref={register({
                                                                required: 'Name Field Required'
                                                            })}
                                                        />
                                                        {errors.tank_name && <p className='text-danger'>{errors.tank_name.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="tank_for">Tank For</label>
                                                    <div className="col-sm-8">
                                                        <select className="form-control" id="tank_for" name="tank_for"
                                                            defaultValue={tankConfigData.tank_for}
                                                            ref={register({
                                                                required: 'Tank For Field Required'
                                                            })} >
                                                            <option value=""> Select </option>
                                                            <option value="1"> Copper </option>
                                                            <option value="2"> Chrome </option>
                                                        </select>
                                                        {errors.tank_for && <p className='text-danger'>{errors.tank_for.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="tank_type">Tank Type</label>
                                                    <div className="col-sm-8">
                                                        <select className="form-control" id="tank_type" name="tank_type"
                                                            defaultValue={tankConfigData.tank_type}
                                                            ref={register({
                                                                required: 'Tank Type Field Required'
                                                            })} >
                                                            <option value=""> Select </option>
                                                            <option value="1"> Vertical </option>
                                                            <option value="2"> Horizontal </option>
                                                        </select>
                                                        {errors.tank_type && <p className='text-danger'>{errors.tank_type.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="capacity_fl">Capacity FL (mm)</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control"
                                                            id="capacity_fl" 
                                                            name="capacity_fl" 
                                                            type="number" 
                                                            placeholder="Tank Capacity FL"
                                                            onChange={changeHandler}
                                                            value={tankConfigData.capacity_fl}
                                                            ref={register({
                                                                required: 'Tank Capacity FL Field Required'
                                                            })}
                                                        />
                                                        {errors.capacity_fl && <p className='text-danger'>{errors.capacity_fl.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="capacity_fl_tolerance">Capacity FL Tolerance (mm)</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control"
                                                            id="capacity_fl_tolerance" 
                                                            name="capacity_fl_tolerance" 
                                                            type="number" 
                                                            placeholder="Capacity FL Tolerance"
                                                            onChange={changeHandler}
                                                            value={tankConfigData.capacity_fl_tolerance}
                                                            ref={register({
                                                                required: 'Capacity FL Tolerance Field Required'
                                                            })}
                                                        />
                                                        {errors.capacity_fl_tolerance && <p className='text-danger'>{errors.capacity_fl_tolerance.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="capacity_sq_cm">Capacity Sq CM (cm)</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control"
                                                            id="capacity_sq_cm" 
                                                            name="capacity_sq_cm" 
                                                            type="number" 
                                                            placeholder="Capacity Sq CM"
                                                            onChange={changeHandler}
                                                            value={tankConfigData.capacity_sq_cm}
                                                            ref={register({
                                                                required: 'Capacity Sq CM Field Required'
                                                            })}
                                                        />
                                                        {errors.capacity_sq_cm && <p className='text-danger'>{errors.capacity_sq_cm.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="slot_gap_one">Slot Gap One (mm)</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control"
                                                            id="slot_gap_one" 
                                                            name="slot_gap_one" 
                                                            type="number" 
                                                            placeholder="Slot Gap One"
                                                            onChange={changeHandler}
                                                            value={tankConfigData.slot_gap_one}
                                                            ref={register({
                                                                required: 'Slot Gap One Field Required'
                                                            })}
                                                        />
                                                        {errors.slot_gap_one && <p className='text-danger'>{errors.slot_gap_one.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="slot_gap_two">Slot Gap Two (mm)</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control"
                                                            id="slot_gap_two" 
                                                            name="slot_gap_two" 
                                                            type="number" 
                                                            placeholder="Slot Gap Two"
                                                            onChange={changeHandler}
                                                            value={tankConfigData.slot_gap_two}
                                                            ref={register({
                                                                required: 'Slot Gap Two Field Required'
                                                            })}
                                                        />
                                                        {errors.slot_gap_two && <p className='text-danger'>{errors.slot_gap_two.message}</p>}
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="first_cyl_fl">First Cyl FL (mm)</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control"
                                                            id="first_cyl_fl" 
                                                            name="first_cyl_fl" 
                                                            type="number" 
                                                            placeholder="First Cyl FL"
                                                            onChange={changeHandler}
                                                            value={tankConfigData.first_cyl_fl}
                                                            ref={register({
                                                                required: 'First Cyl FL Field Required'
                                                            })}
                                                        />
                                                        {errors.first_cyl_fl && <p className='text-danger'>{errors.first_cyl_fl.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="second_cyl_fl">Second Cyl FL (mm)</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control"
                                                            id="second_cyl_fl" 
                                                            name="second_cyl_fl" 
                                                            type="number" 
                                                            placeholder="Second Cyl FL"
                                                            onChange={changeHandler}
                                                            value={tankConfigData.second_cyl_fl}
                                                            ref={register({
                                                                required: 'Second Cyl FL Field Required'
                                                            })}
                                                        />
                                                        {errors.second_cyl_fl && <p className='text-danger'>{errors.second_cyl_fl.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="plating_order_tolerance_without_copper">Plating order tolerance without copper (micron)</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control"
                                                            id="plating_order_tolerance_without_copper" 
                                                            name="plating_order_tolerance_without_copper" 
                                                            type="number" 
                                                            placeholder="tolerance without copper"
                                                            onChange={changeHandler}
                                                            value={tankConfigData.plating_order_tolerance_without_copper}
                                                            ref={register({
                                                                required: 'Tolerance without copper Field Required'
                                                            })}
                                                        />
                                                        {errors.plating_order_tolerance_without_copper && <p className='text-danger'>{errors.plating_order_tolerance_without_copper.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="plating_order_tolerance_with_copper">Plating order tolerance with copper (micron)</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control"
                                                            id="plating_order_tolerance_with_copper" 
                                                            name="plating_order_tolerance_with_copper" 
                                                            type="number" 
                                                            placeholder="tolerance with copper"
                                                            onChange={changeHandler}
                                                            value={tankConfigData.plating_order_tolerance_with_copper}
                                                            ref={register({
                                                                required: 'Tolerance with copper Field Required'
                                                            })}
                                                        />
                                                        {errors.plating_order_tolerance_with_copper && <p className='text-danger'>{errors.plating_order_tolerance_with_copper.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="cir_tolerance">Cir tolerance (mm)</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control"
                                                            id="cir_tolerance" 
                                                            name="cir_tolerance" 
                                                            type="number" 
                                                            placeholder="Cir tolerance"
                                                            onChange={changeHandler}
                                                            value={tankConfigData.cir_tolerance}
                                                            ref={register({
                                                                required: 'Cir tolerance Field Required'
                                                            })}
                                                        />
                                                        {errors.cir_tolerance && <p className='text-danger'>{errors.cir_tolerance.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="can_take_thin_plating_tank">Can Take Thin Plating</label>
                                                    <div className="col-sm-8">
                                                        <select className="form-control" id="can_take_thin_plating_tank" name="can_take_thin_plating_tank"
                                                            onChange={changeHandler}
                                                            defaultValue={tankConfigData.can_take_thin_plating_tank}
                                                            ref={register({
                                                                required: 'Thin Plating Field Required'
                                                            })} >
                                                            <option value=""> Select </option>
                                                            <option value="1"> Yes </option>
                                                            <option value="2"> No </option>
                                                        </select>
                                                        {errors.can_take_thin_plating_tank && <p className='text-danger'>{errors.can_take_thin_plating_tank.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="max_cyl_cycle">Max Cyl qty in Cycle (mm)</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control"
                                                            id="max_cyl_cycle" 
                                                            name="max_cyl_cycle" 
                                                            type="number" 
                                                            placeholder="Max Cyl"
                                                            onChange={changeHandler}
                                                            value={tankConfigData.max_cyl_cycle}
                                                            ref={register({
                                                                required: 'Max Cyl Field Required'
                                                            })}
                                                        />
                                                        {errors.max_cyl_cycle && <p className='text-danger'>{errors.max_cyl_cycle.message}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <SubmitButton link="tankConfig/index" menuId={ menuId } />
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