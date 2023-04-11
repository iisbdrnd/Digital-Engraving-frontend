import React from "react";
import useForm from "react-hook-form";
const Layout = (props) => {
    const { handleSubmit, register, errors ,reset} = useForm();
    const {inputChangeHandler,formData} = props;
    return (
        <><div className="d-flex col-md-12">
            <div className="col-md-6 pl-0 pr-0" style={{ paddingLeft: '0px !important' }}>
                <fieldset className="border p-2">
                    <legend className="w-auto text-left">Layout</legend>
                    <div className="form-row">
                        <div className="col-md-6 row">
                            <label className="col-sm-5 col-form-label">Ref. Job No</label>
                            <div className="col-md-7">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="job_no"
                                    {...register("job_no")}
                                // onChange={inputChangeHandler}
                                value={formData.job_no ? formData.job_no : ''}
                                />
                            </div>
                            <label className="col-sm-5 col-form-label required">Remarks</label>
                            <div className="col-md-7">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="remarks"
                                    required
                                    ref={register({
                                        required: 'On text Field Required'
                                    })}
                                // onChange={inputChangeHandler}
                                 value={formData.remarks ? formData.remarks : ''}
                                />
                            </div>
                            <label className="col-sm-5 col-form-label required">Layout ID</label>
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
                            <label className="col-sm-5 col-form-label required">UPS</label>
                            <div className="col-md-7">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="ups"
                                    required
                                    ref={register({
                                        required: 'On text Field Required'
                                    })}
                                // onChange={inputChangeHandler}
                                value={formData.ups ? formData.ups : ''}
                                />
                            </div>
                            <label className="col-sm-5 col-form-label required">Eye MC</label>
                            <div className="col-md-7">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="eye_mark_color"
                                    required
                                    ref={register({
                                        required: 'On text Field Required'
                                    })}
                                // onChange={inputChangeHandler}
                                // value={stateData.on_text ? stateData.on_text : ''}
                                />
                            </div>
                            <label className="col-sm-5 col-form-label required">Date Time</label>
                            <div className="col-md-7">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="entry_date"
                                    required
                                    ref={register({
                                        required: 'On text Field Required'
                                    })}
                                // onChange={inputChangeHandler}
                                value={formData.agreement_date ? formData. agreement_date : ''}
                                />
                            </div>
                            <label className="col-sm-5 col-form-label required">Station</label>
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
                            <label className="col-sm-5 col-form-label required">Info</label>
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
                        <label className="col-sm-5 col-form-label">Ref.Layout ID</label>
                            <div className="col-md-7">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="id"
                                    {...register("id")}
                                    onChange={inputChangeHandler}
                                    value={formData.id ? formData.id : ''}
                                />
                            </div> 
                            <label className="col-sm-5 col-form-label required">Dia</label>
                            <div className="col-md-7">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="dia"
                                    required
                                    ref={register({
                                        required: 'On text Field Required'
                                    })}
                                // onChange={inputChangeHandler}
                               value={formData.dia ? formData.dia : ''}
                                />
                            </div>
                            <label className="col-sm-5 col-form-label required">Rpt</label>
                            <div className="col-md-7">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="rpt"
                                    required
                                    ref={register({
                                        required: 'On text Field Required'
                                    })}
                                // onChange={inputChangeHandler}
                                value={formData.rpt  ? formData.rpt : ''}
                                />
                            </div>
                            <label className="col-sm-5 col-form-label required">Printer M</label>
                            <div className="col-md-7">
                                <input
                                    type="checkbox"
                                    className="form-control"
                                    name="printer_mark"
                                    required
                                    ref={register({
                                        required: 'On text Field Required'
                                    })}
                                // onChange={inputChangeHandler}
                               value={formData.dia ? formData.dia : ''}
                                />
                            </div>
                            <label className="col-sm-5 col-form-label required">Mark as Complete</label>
                            <div className="col-md-7">
                                <input
                                    type="checkbox"
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
                            <label className="col-sm-5 col-form-label required">Layout</label>
                            <div className="col-md-7">
                                <select className="form-control">
                                    <option>opt 1</option>
                                    <option>opt 2</option>
                                    <option>opt 3</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>
            <div className="col-md-6 pr-0" style={{ paddingRight: '0px !important' }}>
                <fieldset className="border p-2">
                    <legend className="w-auto text-left">Layout history</legend>
                    <div className="col-md-12">
                        <table className="table table-bordered" style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th scope="col" width="15%">Sl</th>
                                    <th scope="col" width="20%">Job No.</th>
                                    <th scope="col" width="10%">Date.</th>
                                    <th scope="col" width="20%">Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td><input class="form-control" type="text"/></td>
                                    <td><input class="form-control" type="text" name="job_no"/></td>
                                    <td><input class="form-control" type="text" name="entry_date"/></td>
                                    <td><input class="form-control" type="text" name="remarks"/></td>
                                </tr>

                            </tbody>
                        </table>
                        <input type="file" className="form-control w-100"/>
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
export default Layout;