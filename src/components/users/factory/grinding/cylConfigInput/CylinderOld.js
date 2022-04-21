import React, { Fragment, useState, useEffect, useReducer } from 'react';
import { JOB_ORDER_DETAILS, GRINDING_RSURL } from '../../../../../api/userUrl';
import { userGetMethod } from '../../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { Typeahead } from 'react-bootstrap-typeahead';
import { SubmitButton } from '../../../../common/GlobalButton';
import DatePicker from "react-datepicker";

const Cylinder = (props) => {
    const { register, errors } = useForm();
    let rows = [];
    const returnComponent = () => { 
        for (let i = 0; i < props.total_cylinder_qty; i++) {
            rows.push(
                <tr>
                    <td>
                        <input disabled className="form-control" value={i+1} name="serial[]" id="serial" type="text" placeholder="Serial" 
                        ref={register({})}
                        />
                    </td>
                    <td>
                        <input disabled className="form-control" value={props.job_no+'-'+ (i+1)} name="cylinder_id[]" id="cylinder_id" type="text" placeholder="Cylinder Id" 
                        ref={register({})}
                        />
                    </td>
                </tr>
            );
        }
        return rows;
    }

    return (
        <>
            {returnComponent()}
        </>
    );
    // return(
    //     <>
    //         <tr>
    //             <td>
    //                 <input disabled className="form-control" name="serial" id="serial" type="text" placeholder="Serial" 
    //                 // ref={register({ required: true })}
    //                 />
    //             </td>
    //             <td>
    //                 <input disabled className="form-control" name="cylinder_id" id="cylinder_id" type="text" placeholder="Cylinder Id" 
    //                 // ref={register({ required: true })}
    //                 />
    //             </td>
    //         </tr>
            
    //     </>
    // );
}

export default Cylinder;