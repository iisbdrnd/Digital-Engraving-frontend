import React, { Fragment, useState, useEffect, useReducer } from 'react';
import { JOB_ORDER_DETAILS, GRINDING_RSURL } from '../../../../../api/userUrl';
import { userGetMethod } from '../../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { Typeahead } from 'react-bootstrap-typeahead';
import { SubmitButton } from '../../../../common/GlobalButton';
import DatePicker from "react-datepicker";

const PlatingOrderRemarks = () => {
    return(
        <>
            <tr>
                <td>
                    <input className="form-control" name="plating_order" id="plating_order" type="text" placeholder="Plating Order" 
                    // ref={register({ required: true })}
                    />
                </td>
                <td>
                    <input className="form-control" name="cylinder_remarks" id="cylinder_remarks" type="text" placeholder="Remarks for Cylinder" 
                    // ref={register({ required: true })}
                    />
                </td>
            </tr>
        </>
    );
}

export default PlatingOrderRemarks;