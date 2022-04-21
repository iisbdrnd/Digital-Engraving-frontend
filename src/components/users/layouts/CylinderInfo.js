import React, { Fragment } from 'react';
import useForm from 'react-hook-form'


const CylinderInfo = (props) => {
    const { register, handleSubmit, errors } = useForm();

    return (
        <Fragment>
            <div className="row">
                <div className="col-sm-12">
                    <form className="needs-validation theme-form" noValidate>
                        <div className="row">

                            <div className="col-sm-6">
                                <div className="card">
                                    <div className="card-body">

                                        <div className="form-row">
                                            <div className="col-md-6 mb-1">
                                                <div className="row">
                                                    <label className="col-sm-5 col-form-label required" htmlFor="job_width">Job Width</label>
                                                    <div className="col-sm-7">
                                                        <input className="form-control" name="job_width" id="job_width" type="text" placeholder="Job Width" ref={register({ required: true })} />
                                                        <span>{errors.job_width && 'Job Width is required'}</span>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-1">
                                                <div className="row">
                                                    <label className="col-sm-5 col-form-label" htmlFor="printing_width">Printing Width</label>
                                                    <div className="col-sm-7">
                                                        <input className="form-control" name="printing_width" id="printing_width" type="text" placeholder="Printing Width" ref={register({ required: true })} />
                                                        <span>{errors.printing_width && 'Printing Width is required'}</span>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col-md-6 mb-1">
                                                <div className="row">
                                                    <label className="col-sm-5 col-form-label required" htmlFor="ups">UPS</label>
                                                    <div className="col-sm-7">
                                                        <input className="form-control" name="ups" id="ups" type="text" placeholder="UPS" ref={register({ required: true })} />
                                                        <span>{errors.ups && 'UPS is required'}</span>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-1">
                                                <div className="row">
                                                    <label className="col-sm-5 col-form-label" htmlFor="extra_width">Extra Width</label>
                                                    <div className="col-sm-7">
                                                        <input className="form-control" name="extra_width" id="extra_width" type="text" placeholder="Extra Width" ref={register({ required: true })} />
                                                        <span>{errors.extra_width && 'Extra Width is required'}</span>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col-md-6 mb-1">
                                                <div className="row">
                                                    <label className="col-sm-5 col-form-label required" htmlFor="face_length">Face Length</label>
                                                    <div className="col-sm-7">
                                                        <input className="form-control" name="face_length" id="face_length" type="text" placeholder="Face Length" ref={register({ required: true })} />
                                                        <span>{errors.face_length && 'Face Length is required'}</span>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-1">
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <div className="card">
                                    <div className="card-body">

                                        <div className="form-row">
                                            <div className="col-md-6 mb-1">
                                                <div className="row">
                                                    <label className="col-sm-5 col-form-label required" htmlFor="job_height">Job Height</label>
                                                    <div className="col-sm-7">
                                                        <input className="form-control" name="job_height" id="job_height" type="text" placeholder="Job Height" ref={register({ required: true })} />
                                                        <span>{errors.job_height && 'Job Height is required'}</span>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-1">
                                                <div className="row">
                                                    <label className="col-sm-5 col-form-label" htmlFor="printing_height">Printing Height</label>
                                                    <div className="col-sm-7">
                                                        <input className="form-control" name="printing_height" id="printing_height" type="text" placeholder="Printing Height" ref={register({ required: true })} />
                                                        <span>{errors.printing_height && 'Printing Height is required'}</span>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col-md-6 mb-1">
                                                <div className="row">
                                                    <label className="col-sm-5 col-form-label required" htmlFor="rpt">RPT</label>
                                                    <div className="col-sm-7">
                                                        <input className="form-control" name="rpt" id="rpt" type="text" placeholder="RPT" ref={register({ required: true })} />
                                                        <span>{errors.rpt && 'RPT is required'}</span>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-1">
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col-md-6 mb-1">
                                                <div className="row">
                                                    <label className="col-sm-5 col-form-label" htmlFor="circumference">Circumference</label>
                                                    <div className="col-sm-7">
                                                        <input className="form-control" name="circumference" id="circumference" type="text" placeholder="Circumference" ref={register({ required: true })} />
                                                        <span>{errors.circumference && 'Circumference is required'}</span>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-1">
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            
                        </div>

                        <div className="row">
                            <div className="card">
                                <div className="card-body">
                                    <div className="form-row mb-5">
                                        <input className="form-control" name="face_length" id="face_length" type="text" disabled placeholder="Face Length" ref={register({ required: true })} />
                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-3">
                                            <div className="row">
                                                <label className="col-sm-5 col-form-label required" htmlFor="face_length">Face Length</label>
                                                <div className="col-sm-7">
                                                    <input className="form-control" name="face_length" id="face_length" type="text" disabled placeholder="Face Length" ref={register({ required: true })} />
                                                    <span>{errors.face_length && 'Face Length is required'}</span>
                                                    <div className="valid-feedback">Looks good!</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="row">
                                                <label className="col-sm-5 col-form-label" htmlFor="surface_area">Total Surface Area</label>
                                                <div className="col-sm-7">
                                                    <input className="form-control" name="surface_area" id="surface_area" type="text" disabled placeholder="Total Surface Area" ref={register({ required: true })} />
                                                    <span>{errors.surface_area && 'Total Surface Area is required'}</span>
                                                    <div className="valid-feedback">Looks good!</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="row">
                                                <label className="col-sm-5 col-form-label" htmlFor="fl">FL</label>
                                                <div className="col-sm-7">
                                                    <input className="form-control" name="fl" id="fl" type="text" disabled placeholder="FL" ref={register({ required: true })} />
                                                    <span>{errors.fl && 'FL is required'}</span>
                                                    <div className="valid-feedback">Looks good!</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="row">
                                                <label className="col-sm-5 col-form-label" htmlFor="cir">Cir</label>
                                                <div className="col-sm-7">
                                                    <input className="form-control" name="cir" id="cir" type="text" disabled placeholder="Cir" ref={register({ required: true })} />
                                                    <span>{errors.cir && 'Cir is required'}</span>
                                                    <div className="valid-feedback">Looks good!</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="row">
                                                <label className="col-sm-5 col-form-label" htmlFor="dia">Dia</label>
                                                <div className="col-sm-7">
                                                    <input className="form-control" name="dia" id="dia" type="text" disabled placeholder="Dia" ref={register({ required: true })} />
                                                    <span>{errors.dia && 'Dia is required'}</span>
                                                    <div className="valid-feedback">Looks good!</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default CylinderInfo;