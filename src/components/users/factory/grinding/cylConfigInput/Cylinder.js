import React, { Fragment, useState, useEffect, useReducer } from 'react';
import { JOB_ORDER_DETAILS, GRINDING_RSURL } from '../../../../../api/userUrl';
import { userGetMethod } from '../../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { Typeahead } from 'react-bootstrap-typeahead';
import { SubmitButton } from '../../../../common/GlobalButton';
import DatePicker from "react-datepicker";

class Cylinder extends React.Component {
    constructor(props) {
      super(props);
      this.state = { values: [] };
    }
    
    handleChange(i, e) {
      this.setState({
        values: { ...this.state.values, [i]: e.target.value }
      });
    }
    
    render() {
        console.log('props data', this.props);
        var fieldsArray = [];
  
        for (var i = 0; i <= this.props.total_cylinder_qty; i++) {
            fieldsArray.push(
                <tr>
                    <td>
                        <input disabled className="form-control" name="serial" id="serial" type="text" placeholder="Serial" 
                        // ref={register({ required: true })}
                        />
                    </td>
                    <td>
                        <input disabled className="form-control" name="cylinder_id" id="cylinder_id" type="text" placeholder="Cylinder Id" 
                        // ref={register({ required: true })}
                        />
                    </td>

                    <td>
                        <input disabled className="form-control" name="fl" id="fl" type="text" placeholder="FL" 
                        // ref={register({ required: true })}
                        />
                    </td>
                    <td>
                        <input disabled className="form-control" name="dia" id="dia" type="text" placeholder="Dia" 
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
            );
        }
  
        return (
            <div>
                {fieldsArray}
            </div>
        );
    }
}

export default Cylinder;