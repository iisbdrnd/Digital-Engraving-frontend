import React, { Fragment, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import useForm from "react-hook-form";
import { Typeahead } from 'react-bootstrap-typeahead';
import AsyncSelect from "react-select/async";
import { Link } from 'react-router-dom'
import { JobClass} from '../../../../api/userUrl';
import { userGetMethod } from '../../../../api/userAction';
import { NextModal } from './NextModal';

export default function ActiveChange(props) {
    const { handleSubmit, register, errors } = useForm();
    const [ isOpenModalPrev, setIsOpenModalPrev ] = useState(true);
    const [modalNext, setModalNext] = useState(false); 
    const [ isOpenModalNext, setIsOpenModalNext ] = useState(false);

    const toggleNextModal = (e) => {
        // let jobId = e.target.getAttribute('jobid');
        // setModalNext(!modal);
    }
    
    const CustomMenu = ({ innerRef, innerProps, isDisabled, children }) =>
      !isDisabled ? (
        <div ref={innerRef} {...innerProps} className="customReactSelectMenu">
            {children}
            {/* <Link 
                to={'add'}
                style={{ width: 35, fontSize: 16, padding: 0, color: 'rgb(40, 167, 69)', cursor: "pointer" }}>
            </Link> */}
            <a className="btn btn-info btn-sm btn-block" onClick={jobClassAddWithModal}>Add New</a>
        </div>
    ) : null;

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




                <div className="form-group row">
                    <label className="col-sm-4 col-form-label" htmlFor="active_status">Active Status</label>
                    <div className="col-sm-8">
                        <AsyncSelect
                            loadOptions={inputValue =>
                                userGetMethod(JobClass)
                                    .then(response => 
                                        response.data.jobClasses.map((item) => {
                                            return { label: item.job_class_name, value: item.id };
                                        })
                                    )
                            }
                            labelText="Country"
                            cacheOptions
                            defaultOptions
                            components={{ Menu: CustomMenu }}

                        />
                    </div>
                </div>

                {/* {isOpenModalNext == true ? <NextModal toggleNextModal={toggleNextModal} modal={modal} modalSubmit={modalSubmit} /> : ''} */}
                

                    
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