import React, { useEffect, useState } from "react";
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
        userPostMethod(`${billConfigurationAPI}`,data)
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
        <div style={{ marginTop: "80px" }}>
            <form className="p-5 m-5" style={{ border: "1px solid #ccc" }} onSubmit={handleSubmit(submitHandler)}>
                <div className="form-row">
                    <h3>Bill Configuration</h3>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label for="cylinder_a_amount">Cylinder A Amount</label>
                        <input type="text" className="form-control" defaultValue={billConfigInfo?.cylinder_a_amount} ref={register({
                            required: 'Job No Field Required'
                        })} id="cylinder_a_amount" name="cylinder_a_amount" placeholder="" />
                    </div>
                    <div className="form-group col-md-4">
                        <label for="cylinder_b_amount">Cylinder B Amount</label>
                        <input type="text" className="form-control"  defaultValue={billConfigInfo?.cylinder_b_amount} ref={register({
                            required: 'Job No Field Required'
                        })} id="cylinder_b_amount" name="cylinder_b_amount" placeholder="" />
                    </div>
                    <div className="form-group col-md-4">
                        <label for="inputPassword4">Cylinder C Amount</label>
                        <input type="text" className="form-control" defaultValue={billConfigInfo?.cylinder_c_amount} ref={register({
                            required: 'Job No Field Required'
                        })} id="cylinder_c_amount" name="cylinder_c_amount" placeholder="" />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label for="fixed_amount">Fixed Amount</label>
                        <input type="text" className="form-control" defaultValue={billConfigInfo?.fixed_amount} ref={register({
                            required: 'Job No Field Required'
                        })} id="fixed_amount" name="fixed_amount" placeholder="" />
                    </div>
                    <div className="form-group col-md-4">
                        <label for="per_square_amount">Per Squre Amount</label>
                        <input type="text" className="form-control"  defaultValue={billConfigInfo?.per_square_amount} ref={register({
                            required: 'Job No Field Required'
                        })} id="per_square_amount" name="per_square_amount" placeholder="" />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )

}
export default BillConfig;