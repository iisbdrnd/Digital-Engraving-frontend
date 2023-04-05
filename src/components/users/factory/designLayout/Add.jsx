import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { Plus } from "react-feather";
import useForm from "react-hook-form";
import Layout from "./Layout";
import Base from "./Base";
const Add = () => {
    const { handleSubmit, register, errors, reset } = useForm();
    const [isLayout, setIsLayout] = useState(false);
    const [isBase, setIsBase] = useState(false);
    const toogleLtoB = (val) => {
        if (val == "layout") {
            setIsLayout(true);
            setIsBase(false);
        } else if (val == "base") {
            setIsLayout(false);
            setIsBase(true);
        }
    }
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>Design Layout Form</h5>
                        </div>
                        <div className="card-body">
                            <>
                                <form className="theme-form row">
                                    <div className="col-md-12">
                                        <fieldset className="border p-2">
                                            <legend className="w-auto text-left">Job Info</legend>
                                            <div className="form-row">
                                                <div className="col-md-6 row">
                                                    <label className="col-sm-5 col-form-label required">BCO</label>
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
                                                    <label className="col-sm-5 col-form-label required">Job Name</label>
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
                                                    <label className="col-sm-5 col-form-label required">HO Remarks</label>
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
                                                    <label className="col-sm-5 col-form-label required">Printer</label>
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
                                                    <label className="col-sm-5 col-form-label required">Referrence</label>
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
                                                    <label className="col-sm-5 col-form-label required">Job Type</label>
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
                                                    <label className="col-sm-5 col-form-label required">Printing Type</label>
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
                                                    <label className="col-sm-5 col-form-label required">No of Cyl</label>
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
                                                    <label className="col-sm-5 col-form-label required">Color</label>
                                                    <div className="d-flex col-md-7">
                                                        <select className="form-control">
                                                            <option>Black</option>
                                                            <option>White</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div className="col-md-12 d-flex">
                                        <div className="span-layout col-md-6 text-center"
                                            style={{
                                                background: isLayout == true ? "green" : "",}}>
                                            <span><a href="javascript:void(0)" onClick={() => toogleLtoB("layout")} class="pe-auto">Layout</a></span>
                                        </div>
                                        <div className="span-base col-md-6 text-center"
                                            style={{
                                                background: isBase == true ? "green" : "",}}>
                                            <span><a href="javascript:void(0)" onClick={() => toogleLtoB("base")} class="pe-auto">Base</a></span>
                                        </div>
                                    </div>
                                    {isLayout == true ? (<Layout />) : ("")
                                    }
                                    {isBase == true ? (<Base />) : ("")
                                    }
                                </form>
                            </>
                        </div>
                    </div>

                </div>
            </div>
        </Fragment>
    )
}
export default Add;