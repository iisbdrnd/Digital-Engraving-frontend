import React, { Fragment, useState, useEffect, useReducer } from 'react';
import { JOB_ORDER_DETAILS, GRINDING_RSURL } from '../../../../../api/userUrl';
import { userGetMethod } from '../../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { Typeahead } from 'react-bootstrap-typeahead';
import { SubmitButton } from '../../../../common/GlobalButton';
import DatePicker from "react-datepicker";

const BeforeGrindingCheck = (props) => {
    return(
        <>
            <tr>
                <td>
                    <input disabled className="form-control" value={props.fl} name="fl" id="fl" type="text" placeholder="FL" 
                    // ref={register({ required: true })}
                    />
                </td>
                <td>
                    <input disabled className="form-control" value={props.dia} name="dia" id="dia" type="text" placeholder="Dia" 
                    // ref={register({ required: true })}
                    />
                </td>
                <td>
                    <input className="form-control" name="target" id="target" type="text" placeholder="Target" 
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
            </tr>
        
        </>
    );
}

export default BeforeGrindingCheck;