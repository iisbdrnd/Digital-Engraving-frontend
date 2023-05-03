import React, { useEffect, useState, useReducer } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { toast } from 'react-toastify';
import { PLATING_DEPT_RSURL, CHECK_PLATING_CYL_EXIST_OR_NOT, JOB_DATA_FROM_PLATING_DEPT } from '../../../../api/userUrl';
import { userGetMethod, userPutMethod } from '../../../../api/userAction';
import { ValidationAlerts } from '../../../common/GlobalButton';
import SweetAlert from 'sweetalert2';

export default function TankScheduleEdit(props) {
    const { handleSubmit, register, errors } = useForm();
    const [ isOpenModalPrev, setIsOpenModalPrev ] = useState(true);
    const [validateErrors, setValidateErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [typeheadOptions, setTypeheadOptions] = useState({});
    const [dropdownData, setDropdownData] = useState({});
    const [cylScheduleDetails, setCylScheduleDetails] = useState([]);
    const [modal, setModal] = useState(false); 
    const [changeUseEffect, setChangeUseEffect] = useState(0); 
    const [jobData, setJobData] = useState({}); 

    let [cylScheduleFormData, setCylScheduleFormData] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            slot                    : 0,
            cylinder_id             : '',
            job_type                : '',
            fl                      : '',
            cir                     : '',
            dia                     : '',
            est_plt_order       : '',
            surface_area            : '',
            serverCheckConfirmation : false,
        }
    );

    useEffect(() => {
        // ADD,EDIT,DELETE,SHOW ACCESS CHECK
        userGetMethod(`${PLATING_DEPT_RSURL}/${props.scheduleId}/edit`)
            .then(response => {
                // FOR JOB ORDER
                console.log('response.data', response.data);
                let jobOrderOptions = [];
                if (response.data.jobOrders && response.data.jobOrders.length > 0) {
                    response.data.jobOrders.map(order => 
                    {
                        let jobOrderObj = {};
                        jobOrderObj.id = order.id;
                        jobOrderObj.name = `[${order.job_no}] ` + order.job_name;
                        jobOrderOptions.push(jobOrderObj);
                    })
                }
                setTypeheadOptions(
                    (prevstate) => ({
                        ...prevstate,
                        ['job_orders']: jobOrderOptions,
                    })
                );
                console.log('response.data.scheduleData.length', response.data.scheduleData.length);
                if (response.data.scheduleData.length > 0) {
                    setCylScheduleDetails(
                        response.data.scheduleData
                    );
                }

                setIsLoading(false);
            });
    },[]);
    // FOR CYLINDER SCHEDULE DETAILS DATA INPUT
    const inputHandler = (event) => {
        setCylScheduleFormData(
            {[event.target.name] : event.target.value},
        );
    }
    // FOR Typeahead DATA INPUT
    const dropDownChange = (event, stateName) => {
        if(event.length > 0){
            const selectedValueId = event[0].id;
            const selectedValueName = event[0].name;
            setDropdownData(
                (prevstate) => ({
                    ...prevstate,
                    [stateName]: selectedValueId,
                    [stateName+'_name']: selectedValueName,
                })
            );
            userGetMethod(`${JOB_DATA_FROM_PLATING_DEPT}?jobId=${selectedValueId}`)
                .then(response => {
                    // console.log(response.data);
                    let {fl, cir, dia} = response.data.jobData;
                    setCylScheduleFormData({
                        'fl' : fl,
                        'cir': cir,
                        'dia': dia
                    })
                });
        }

    }
    // FOR CYCLE SCHEDULE DETAILS ARRAY READY
    const addCylSchedulHandler = (event) => {
        let {cylinder_id, job_type, fl, cir, dia, est_plt_order, surface_area} = cylScheduleFormData;

        if (dropdownData.job_order_id === ''|| fl === '' || cir === '' || dia === '' || cylinder_id === '' || job_type == '' || est_plt_order === '' || surface_area === '') {
            SweetAlert.fire({title:"Warning", text:"Please Fill up all details", icon:"warning"});
        } else {
            let check = true;
            if (cylScheduleDetails.length > 0) {
                cylScheduleDetails.map((data, index)=>{
                    if (data.job_order_id == dropdownData.job_order_id && data.cylinder_id == cylinder_id) {
                        SweetAlert.fire({title:"Warning", text:"Trying to store duplicate data", icon:"warning"});
                        check = false;
                    }
                });
            }
            if (check){
                userGetMethod(`${CHECK_PLATING_CYL_EXIST_OR_NOT}?job_order_id=${dropdownData.job_order_id}&cylinder_id=${cylinder_id}`)
                    .then(response => {
                        if (Object.keys(response.data).length === 1) {
                            SweetAlert.fire({
                                icon: 'warning',
                                title: 'Cylinder already in queue. Do you want to store again !',
                                showCancelButton: true,
                                confirmButtonText: 'Yes',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    let cylScheduleDetails_arr = [];
                                    let cylScheduleDetails_obj = {};
                                    cylScheduleDetails_obj.cylinder_id = cylinder_id;
                                    cylScheduleDetails_obj.job_order_id = dropdownData.job_order_id;
                                    cylScheduleDetails_obj.job_order_id_name = dropdownData.job_order_id_name;
                                    cylScheduleDetails_obj.job_type = job_type;
                                    cylScheduleDetails_obj.fl = fl;
                                    cylScheduleDetails_obj.cir = cir;
                                    cylScheduleDetails_obj.dia = dia;
                                    cylScheduleDetails_obj.est_plt_order = est_plt_order;
                                    cylScheduleDetails_obj.surface_area = surface_area;
                    
                                    cylScheduleDetails_arr.push(cylScheduleDetails_obj);
                    
                                    // PUSH BASE ORDER DETAILS MAIN ARRAY
                                    setCylScheduleDetails([
                                        ...cylScheduleDetails,
                                        ...cylScheduleDetails_arr
                                    ]);
                                    // EMPTY ORDER DETAILS ALL FIELDS
                                    setCylScheduleFormData({
                                        cylinder_id      : '',
                                        job_type         : '',
                                        // fl               : '',
                                        // cir              : '',
                                        // dia              : '',
                                        est_plt_order: '',
                                        surface_area     : '',
                                    });
                                }
                            })
                        }else{
                            let cylScheduleDetails_arr = [];
                            let cylScheduleDetails_obj = {};
                            cylScheduleDetails_obj.cylinder_id = cylinder_id;
                            cylScheduleDetails_obj.job_order_id = dropdownData.job_order_id;
                            cylScheduleDetails_obj.job_order_id_name = dropdownData.job_order_id_name;
                            cylScheduleDetails_obj.job_type = job_type;
                            cylScheduleDetails_obj.fl = fl;
                            cylScheduleDetails_obj.cir = cir;
                            cylScheduleDetails_obj.dia = dia;
                            cylScheduleDetails_obj.est_plt_order = est_plt_order;
                            cylScheduleDetails_obj.surface_area = surface_area;
            
                            cylScheduleDetails_arr.push(cylScheduleDetails_obj);
            
                            // PUSH BASE ORDER DETAILS MAIN ARRAY
                            setCylScheduleDetails([
                                ...cylScheduleDetails,
                                ...cylScheduleDetails_arr
                            ]);
                            // EMPTY ORDER DETAILS ALL FIELDS
                            setCylScheduleFormData({
                                cylinder_id      : '',
                                job_type         : '',
                                // fl               : '',
                                // cir              : '',
                                // dia              : '',
                                est_plt_order: '',
                                surface_area     : '',
                            });
                        }
                    });
                
            }
            
        }
    }
    // FOR REMOVE CYCLE SCHEDULE DETAILS SINGLE DATA FROM CYCLE SCHEDULE DETAILS ARRAY
    const removeCycleHandler = (removeIndex) => {
        let filteredScheduleData = cylScheduleDetails.filter((item, index) =>index != removeIndex);
        setCylScheduleDetails([
            ...filteredScheduleData
        ]);
    }

    const submitHandler = (data, e) => {
        data.cylScheduleArr = cylScheduleDetails;
        data.tankId = props.tankId;
        data.job_order_id = dropdownData.job_order_id;
        console.log('data', data);
        if (data.cylScheduleArr.length > 0) {
            userPutMethod(`${PLATING_DEPT_RSURL}/${props.scheduleId}`, data)
                .then(response => {
                    if (response.data.status == 1) {
                        toast.success(response.data.message);
                        e.target.reset();
                        props.toggle();
                        props.onChangeTank(props.tankId, props.modalTitle);
                    } else {
                        toast.error(response.data.message);
                    }
                    setChangeUseEffect(changeUseEffect+1);
                })
                .catch(error => toast.error(error))
        } else {
            SweetAlert.fire({title:"Warning", text:"Please Add at list one cylinder schedule!", icon:"warning"});
        }
    }

    return (
        <Modal isOpen={ props.modal && isOpenModalPrev } toggle={props.toggle} size="xlg">
            <ModalHeader toggle={props.toggle}>Edit Manual Cycle Plan Form #{props.modalTitle} Tank *Test*</ModalHeader>
            <ModalBody>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-body">
                                {validateErrors.length > 0 ? <ValidationAlerts items={validateErrors} setOpenVal={true} /> : '' }

                                {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                        <div className="row m-t-10 p-1">
                                            <div className="form-row">
                                                <div className="col-md-2 mb-3">
                                                    <label htmlFor="job_order_id">Job No</label>
                                                    <Typeahead
                                                        id="job_order_id"
                                                        name="job_order_id"
                                                        labelKey={option => `${option.name}`}
                                                        options={typeheadOptions['job_orders']}
                                                        placeholder="Select Job No"
                                                        onChange={(e) => dropDownChange(e, 'job_order_id')}
                                                    />
                                                </div>

                                                <div className="col-md-2 mb-3">
                                                    <label htmlFor="cylinder_id">Cylinder Id</label>
                                                    <input 
                                                        className="form-control" 
                                                        id="cylinder_id" 
                                                        name="cylinder_id"
                                                        value={cylScheduleFormData.cylinder_id} 
                                                        type="text" 
                                                        placeholder="Cylinder Id"
                                                        onChange={inputHandler}
                                                    />
                                                </div>

                                                <div className="col-md-2 mb-3">
                                                    <label htmlFor="job_type">Job Type</label>
                                                    <select className="form-control" onChange={inputHandler} id="job_type" name="job_type">
                                                        <option> Select One </option>
                                                        <option value="1">Per Cylinder</option>
                                                        <option value="2">Per Sqr cm</option>
                                                        <option value="3">Per Sqr inch</option>
                                                    </select>
                                                </div>

                                                <div className="col-md-1 mb-3">
                                                    <label htmlFor="fl">FL</label>
                                                    <input 
                                                        className="form-control" 
                                                        id="fl" 
                                                        name="fl"
                                                        disabled="disabled"
                                                        value={cylScheduleFormData.fl} 
                                                        type="number" 
                                                        placeholder="FL" 
                                                        onChange={inputHandler}
                                                    />
                                                </div>

                                                <div className="col-md-1 mb-3">
                                                    <label htmlFor="cir">Cir</label>
                                                    <input 
                                                        className="form-control" 
                                                        id="cir" 
                                                        name="cir"
                                                        disabled="disabled"
                                                        value={cylScheduleFormData.cir} 
                                                        type="number" 
                                                        placeholder="Cir" 
                                                        onChange={inputHandler}
                                                    />
                                                </div>
 
                                                <div className="col-md-1 mb-3">
                                                    <label htmlFor="dia">Dia</label>
                                                    <input 
                                                        className="form-control" 
                                                        id="dia" 
                                                        name="dia"
                                                        disabled="disabled"
                                                        value={cylScheduleFormData.dia} 
                                                        type="number" 
                                                        placeholder="Dia" 
                                                        onChange={inputHandler}
                                                    />
                                                </div>

                                                <div className="col-md-1 mb-3">
                                                    <label htmlFor="est_plt_order">Est Plt. Order</label>
                                                    <input 
                                                        className="form-control" 
                                                        id="est_plt_order" 
                                                        name="est_plt_order"
                                                        value={cylScheduleFormData.est_plt_order} 
                                                        type="number" 
                                                        placeholder="" 
                                                        onChange={inputHandler}
                                                    />
                                                </div>

                                                <div className="col-md-1 mb-3">
                                                    <label htmlFor="surface_area">Surface Area</label>
                                                    <input 
                                                        className="form-control" 
                                                        id="surface_area" 
                                                        name="surface_area"
                                                        value={cylScheduleFormData.surface_area} 
                                                        type="number" 
                                                        placeholder="" 
                                                        onChange={inputHandler}
                                                    />
                                                </div>

                                                <div className="col-md-1 mb-4 m-t-5">
                                                    <span className="btn btn-primary btn-sm mr-1 m-t-20" type="add" onClick={addCylSchedulHandler}>Add</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row p-1">
                                            <table className="table table-bordered" style={{width: '100%'}}>
                                                <thead>
                                                    <tr>
                                                        <th scope="col" width="5%">Slot</th>
                                                        <th scope="col" width="25%">Job No/Name</th>
                                                        <th scope="col" width="10%">Cylinder Id</th>
                                                        <th scope="col" width="10%">Job Type</th>
                                                        <th scope="col" width="7%">FL</th>
                                                        <th scope="col" width="7%">Cir</th>
                                                        <th scope="col" width="7%">Dia</th>
                                                        <th scope="col" width="12%">Est Plat. Order</th>
                                                        <th scope="col" width="12%">Surface Area</th>
                                                        <th scope="col" width="5%">Action</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {
                                                        cylScheduleDetails.length > 0 ?
                                                        <>
                                                            {cylScheduleDetails.map((item, index)=> 
                                                                (
                                                                <tr key={index}>
                                                                    <th scope="row">{index+1}</th>
                                                                    <td>{item.job_order_id_name}</td>
                                                                    <td>{item.cylinder_id}</td>
                                                                    <td>{item.job_type}</td>
                                                                    <td>{item.fl}</td>
                                                                    <td>{item.cir}</td>
                                                                    <td>{item.dia}</td>
                                                                    <td>{item.est_plt_order}</td>
                                                                    <td>{item.surface_area}</td>
                                                                    <td align="center">
                                                                        <span onClick={()=>removeCycleHandler(index)}>
                                                                            <i className="icon-close" style={{ width: 25, fontSize: 16, padding: 0, color: '#e4566e', cursor: 'pointer' }}
                                                                            ></i>
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                                )
                                                            )}
                                                        </>
                                                        : <tr><td colSpan="11" className="text-center">No data Added</td></tr>
                                                    }
                                                </tbody>
                                            </table>         
                                        </div>

                                        <Button className="btn-sm m-t-10 m-r-10" type="submit" color="primary">Save Changes</Button>
                                        <Button className="btn-sm m-t-10" color="secondary"  onClick={props.toggle}>Cancel</Button>
                                    </form>
                                )}
                            </div>
                        </div>   
                    </div>
                </div>
            </div>
    
            </ModalBody>
        </Modal>
    );
}