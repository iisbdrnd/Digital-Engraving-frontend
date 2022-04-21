import React, { Fragment, useState, useEffect, useReducer } from 'react';
import { JOB_ORDER_DETAILS, GRINDING_RSURL } from '../../../../../api/userUrl';
import { userGetMethod } from '../../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { Typeahead } from 'react-bootstrap-typeahead';
import { SubmitButton } from '../../../../common/GlobalButton';
import DatePicker from "react-datepicker";

const AfterGrindingCheck = () => {
    return(
        <>
            <tr>
                <td>
                    <input className="form-control" name="dia" id="dia" type="text" placeholder="Dia" 
                    // ref={register({ required: true })}
                    />
                </td>
                <td>
                    <input className="form-control" name="pin_hole" id="pin_hole" type="text" placeholder="#Pin Hole" 
                    // ref={register({ required: true })}
                    />
                </td>
                <td>
                    <input type="checkbox" id="base_down" />
                </td>
                <td>
                    <input type="checkbox" id="key_lock" />
                </td>
                <td>
                    <input type="checkbox" id="cone_prob" />
                </td>
                <td>
                    <input type="checkbox" id="mark_complete" />
                </td>
            </tr>
            
        </>
    );
}

export default AfterGrindingCheck;