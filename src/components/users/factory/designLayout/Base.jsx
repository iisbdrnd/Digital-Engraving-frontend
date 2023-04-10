import React, { useState } from "react";
import useForm from "react-hook-form";
const Base = (props) => {
    const {inputChangeHandler, formData,typeColorOptions} = props;
    const { handleSubmit, register, errors ,reset} = useForm();

    return (
        <>
            <div className="d-flex col-md-12">
                <div className="col-md-6 pl-0" style={{ paddingLeft: '0px !important' }}>
                <fieldset className="border p-2">
                    <legend className="w-auto text-left">Base</legend>
                    <div className="form-row">
                        <div className="col-md-6 row">
                            <label className="col-sm-5 col-form-label required">FL</label>
                            <div className="col-md-7">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="fl"
                                    required
                                    ref={register({
                                        required: 'On text Field Required'
                                    })}
                                    onChange={inputChangeHandler}
                                    value={formData.fl ? formData.fl : ''}
                                />
                            </div>
                            <label className="col-sm-5 col-form-label required">Desire Dia</label>
                            <div className="col-md-7">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="on_text"
                                    required
                                    ref={register({
                                        required: 'On text Field Required'
                                    })}
                                // onChange={inputChangeHandler}
                                 value={formData.dia ? formData.dia : ''}
                                />
                            </div>
                            <label className="col-sm-5 col-form-label required">Final Dia</label>
                            <div className="col-md-7">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="on_text"
                                    required
                                    ref={register({
                                        required: 'On text Field Required'
                                    })}
                                // onChange={inputChangeHandler}
                                // value={stateData.on_text ? stateData.on_text : ''}
                                />
                            </div>
                            
                        </div>
                        <div className="col-md-6 row">
                            <label className="col-sm-5 col-form-label required">Desire Cir</label>
                            <div className="col-md-7">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="on_text"
                                    required
                                    ref={register({
                                        required: 'On text Field Required'
                                    })}
                                // onChange={inputChangeHandler}
                                value={formData.cir ? formData.cir : ''}
                                />
                            </div>
                            <label className="col-sm-5 col-form-label required">Final Cir</label>
                            <div className="col-md-7">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="on_text"
                                    required
                                    ref={register({
                                        required: 'On text Field Required'
                                    })}
                                // onChange={inputChangeHandler}
                                // value={stateData.on_text ? stateData.on_text : ''}
                                />
                            </div>
                        </div>
                    </div>
                </fieldset>
                <fieldset className="border p-2">
                    <legend className="w-auto text-left">Design</legend>
                    <div className="form-row">
                        <div className="col-md-6 row">
                            <label className="col-sm-5 col-form-label required">H</label>
                            <div className="col-md-7">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="on_text"
                                    required
                                    ref={register({
                                        required: 'On text Field Required'
                                    })}
                                // onChange={inputChangeHandler}
                                // value={stateData.on_text ? stateData.on_text : ''}
                                />
                            </div>
                            <label className="col-sm-5 col-form-label required">W</label>
                            <div className="col-md-7">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="on_text"
                                    required
                                    ref={register({
                                        required: 'On text Field Required'
                                    })}
                                // onChange={inputChangeHandler}
                                // value={stateData.on_text ? stateData.on_text : ''}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 row">
                            <label className="col-sm-5 col-form-label required">H</label>
                            <div className="col-md-7">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="on_text"
                                    required
                                    ref={register({
                                        required: 'On text Field Required'
                                    })}
                                // onChange={inputChangeHandler}
                                // value={stateData.on_text ? stateData.on_text : ''}
                                />
                            </div>
                            <label className="col-sm-5 col-form-label required">W</label>
                            <div className="col-md-7">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="on_text"
                                    required
                                    ref={register({
                                        required: 'On text Field Required'
                                    })}
                                // onChange={inputChangeHandler}
                                // value={stateData.on_text ? stateData.on_text : ''}
                                />
                            </div>
                        </div>
                    </div>
                </fieldset>
                </div>
                <div className="col-md-6 pr-0 pl-0" style={{ paddingLeft: '0px !important' }}>
                <fieldset className="border p-2">
                    <legend className="w-auto text-left">Engravers Order</legend>
                    <div className="col-md-12">
                        <table className="table table-bordered" style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th scope="col" width="15%">Sl</th>
                                    <th scope="col" width="20%">Color.</th>
                                    <th scope="col" width="10%">Desire Screen.</th>
                                    <th scope="col" width="20%">Desire Angel</th>
                                    <th scope="col" width="20%">Engraving Machine</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    typeColorOptions.map((item) => {
                                        return (
                                            <tr>
                                                <td><input className="form-control" type="text" value={item.id+1}/></td>
                                                <td><input className="form-control" type="text" value={item.name}/></td>
                                                <td><input className="form-control" type="text" /></td>
                                                <td><input className="form-control" type="text" /></td>
                                                <td><input className="form-control" type="text" /></td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </fieldset>
                </div>
            </div>
            <div className="col-md-12">
            <fieldset className="border p-2">
                    <legend className="w-auto text-left">Axial</legend>
                    <div className="form-row">
                        <div className="col-md-2 mb-3">
                            <label>L.Reg.Mark</label>
                            <div className="d-flex">
                                <div className="col-md-9 pl-0">
                                    <input
                                        className="form-control"
                                        id="l_reg_mark"
                                        name="l_reg_mark"
                                        // required
                                        type="number"
                                        onChange={inputChangeHandler}
                                    />
                                </div>
                                <div className="col-md-3 pl-0">
                                    <span>+</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2 mb-3">
                            <label>L.FL.Cut</label>
                            <div className="d-flex">
                                <div className="col-md-9 pl-0">
                                    <input
                                        className="form-control"
                                        id="l_fl_cut"
                                        name="l_fl_cut"
                                        // required
                                        type="number"
                                        onChange={inputChangeHandler}
                                    />
                                </div>
                                <div className="col-md-3 pl-0">
                                    <span>+</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1 mb-3">
                            <label>Design W.</label>
                            <div className="d-flex">
                                <div className="col-md-9 pl-0">
                                    <input
                                        className="form-control"
                                        id="design_width"
                                        name="design_width"
                                        // required
                                        type="number"
                                        onChange={inputChangeHandler}
                                    />
                                </div>
                                <div className="col-md-3 pl-0">
                                    <span>*</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1 mb-3">
                            <label>UPS</label>
                            <div className="d-flex">
                                <div className="col-md-9 pl-0">
                                    <input
                                        className="form-control"
                                        id="ups"
                                        name="ups"
                                        // required
                                        type="number"
                                        onChange={inputChangeHandler}
                                    />
                                </div>
                                <div className="col-md-3 pl-0">
                                    <span>+</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2 mb-3">
                            <label>R.Reg.Mark</label>
                            <div className="d-flex">
                                <div className="col-md-9 pl-0">
                                    <input
                                        className="form-control"
                                        id="r_reg_mark"
                                        name="r_reg_mark"
                                        // required
                                        type="number"
                                        onChange={inputChangeHandler}
                                    />
                                </div>
                                <div className="col-md-3 pl-0">
                                    <span>+</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2 mb-3">
                            <label for="r_fl_cut">R.FL.Cut</label>
                            <div className="d-flex">
                                <div className="col-md-9 pl-0">
                                    <input
                                        className="form-control"
                                        id="r_fl_cut"
                                        name="r_fl_cut"
                                        // required
                                        type="number"
                                        onChange={inputChangeHandler}
                                    />
                                </div>
                                <div className="col-md-3 pl-0">
                                    <span>=</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1 mb-3">
                            <label for="start_point">Start Point</label>
                            <div className="d-flex">
                                <div className="col-md-12 pl-0">
                                    <input
                                        className="form-control"
                                        id="start_point"
                                        name="start_point"
                                        // required
                                        type="number"
                                        onChange={inputChangeHandler}
                                        value={formData.start_point}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1 mb-3">
                            <label for="image_area">Image Area</label>
                            <div className="d-flex">
                                <div className="col-md-12 pl-0">
                                    <input
                                        className="form-control"
                                        id="image_area"
                                        name="image_area"
                                        // required
                                        type="number"
                                        // onChange={inputChangeHandler}
                                        value={formData.image_area}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </fieldset>
            </div>
        </>
    )
}
export default Base;