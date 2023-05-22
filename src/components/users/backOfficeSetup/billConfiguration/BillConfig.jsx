import React, { Fragment, useEffect, useState } from "react";
import { userGetMethod, userPostMethod } from "../../../../api/userAction";
import { billConfigurationAPI } from "../../../../api/userUrl";
import useForm from "react-hook-form";
import { toast } from "react-toastify";

const BillConfig = () => {
    const [billConfigInfo, setBillConfigInfo] = useState({});
    const { register, onSubmit, handleSubmit } = useForm();
    useEffect(() => {
        userGetMethod(`${billConfigurationAPI}`)
            .then((response) => {
                console.log(response?.data?.billConfig);
                setBillConfigInfo(response.data?.billConfig);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])
    const submitHandler = (data) => {
        data.id = billConfigInfo.id;
        userPostMethod(`${billConfigurationAPI}`, data)
            .then((response) => {
                console.log(response);
                toast.success("Bill config updated !")
                // setBillConfigInfo(response.data?.billConfig);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5>Bill Configuration</h5>
                                    </div>
                                    <div className="col-md-6">
                                        {/* <PanelRefreshIcons panelRefresh={pageRefreshHandler} /> */}
                                    </div>
                                </div>

                            </div>
                            <div className="card-body">
                                <form className="theme-form row" onSubmit={handleSubmit(submitHandler)}>
                                    <div className="form-row">
                                        <div className="col-md-6 form-group row">

                                            <label for="cylinder_b_amount" className="col-form-label col-md-5 required">Cylinder A Amount</label>
                                            <div className="col-lg-7 col-md-8 col-xs-12">
                                                <input type="number" className="form-control" required defaultValue={billConfigInfo?.cylinder_a_amount} ref={register({
                                                    required: 'Job No Field Required'
                                                })} id="cylinder_a_amount" name="cylinder_a_amount" placeholder="" />
                                            </div>
                                            <label for="cylinder_b_amount" className="col-form-label col-md-5 required">Cylinder B Amount</label>
                                            <div className="col-lg-7 col-md-8 col-xs-12">
                                                <input type="number" className="form-control" required defaultValue={billConfigInfo?.cylinder_b_amount} ref={register({
                                                    required: 'Job No Field Required'
                                                })} id="cylinder_b_amount" name="cylinder_b_amount" placeholder="" />
                                            </div>
                                            <label for="cylinder_b_amount" className="col-form-label col-md-5 required">Cylinder C Amount</label>
                                            <div className="col-lg-7 col-md-8 col-xs-12">
                                                <input type="number" className="form-control" required defaultValue={billConfigInfo?.cylinder_c_amount} ref={register({
                                                    required: 'Job No Field Required'
                                                })} id="cylinder_c_amount" name="cylinder_c_amount" placeholder="" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 form-group row">

                                            <label for="cylinder_b_amount" className="col-form-label col-md-5 required">Fixed Amount</label>
                                            <div className="col-lg-7 col-md-8 col-xs-12">
                                                <input type="number" className="form-control" required defaultValue={billConfigInfo?.fixed_amount} ref={register({
                                                    required: 'Job No Field Required'
                                                })} id="fixed_amount" name="fixed_amount" placeholder="" />
                                            </div>
                                            <label for="cylinder_b_amount" className="col-form-label col-md-5 required">Per Squre Amount</label>
                                            <div className="col-lg-7 col-md-8 col-xs-12">
                                                <input type="number" className="form-control" required defaultValue={billConfigInfo?.per_square_amount} ref={register({
                                                    required: 'Job No Field Required'
                                                })} id="per_square_amount" name="per_square_amount" placeholder="" />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="form-group text-center  col-md-6">
                                        <button className="btn btn-primary btn-sm" type="submit">Submit</button>
                                    </div>
                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </Fragment>

    )

}
export default BillConfig;