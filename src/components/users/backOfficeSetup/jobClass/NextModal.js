import React, { Fragment, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import useForm from "react-hook-form";
import { Typeahead } from 'react-bootstrap-typeahead';
import AsyncSelect from "react-select/async";
import { Link } from 'react-router-dom'
import { JobClass} from '../../../../api/userUrl';
import { userGetMethod } from '../../../../api/userAction';

export default function NextModal(props) {
    const { handleSubmit, register, errors } = useForm();
    const [ isOpenModalPrev, setIsOpenModalPrev ] = useState(true);
    const [ isOpenModalNext, setIsOpenModalNext ] = useState(false);



    const jobClassAddWithModal = (e)=>{
        console.log("hello", e);
        setIsOpenModalPrev(false);
        setIsOpenModalNext(true);
    }

    return (
        <Modal isOpen={ props.modal && isOpenModalPrev } toggle={props.toggle} size="md">
            <ModalHeader toggle={props.toggle}>Hello</ModalHeader>
            <ModalBody>
            <form onSubmit= {handleSubmit(props.modalSubmit)}>
                <input type="hidden" name="job_id" value={props.jobIdForModal} ref={register} />
                <div className="form-group row">
                    <label className="col-sm-4 col-form-label" htmlFor="active_status">Active Status</label>
                    <div className="col-sm-8">
                        <select className="form-control" required id="active_status" name="active_status"
                            ref={register({
                                required: 'Active Status Field Required'
                            })} >
                            <option value=""> Select One </option>
                            <option value="Yes"> Yes </option>
                            <option value="No"> No </option>
                            <option><button>Add New</button></option>
                        </select>
                        {errors.active_status && <p className='text-danger'>{errors.active_status.message}</p>}
                    </div>
                </div>



                    
                {/* <ModalFooter> */}
                <div className="form-group">
                    <Button className="btn-sm" type="submit" color="primary">Save Changes</Button>
                    <Button className="btn-sm" color="secondary"  onClick={props.toggle}>Cancel</Button>
                </div>
                {/* </ModalFooter> */}
            </form>
            </ModalBody>
        </Modal>
    );
}