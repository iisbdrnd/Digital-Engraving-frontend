import React, { useEffect, useState, useReducer } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { toast } from 'react-toastify';
import { PLATING_DEPT_RSURL, CHECK_PLATING_CYL_EXIST_OR_NOT, JOB_DATA_FROM_PLATING_DEPT, EST_PLATING_ORDER_RSURL } from '../../../../api/userUrl';
import { userGetMethod, userPostMethod } from '../../../../api/userAction';
import { ValidationAlerts } from '../../../common/GlobalButton';
import SweetAlert from 'sweetalert2';

export default function TankSchedule(props) {
    const { handleSubmit, register, errors } = useForm();
    const [isOpenModalPrev, setIsOpenModalPrev] = useState(true);
    const [validateErrors, setValidateErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [typeheadOptions, setTypeheadOptions] = useState({});
    const [dropdownData, setDropdownData] = useState({});
    const [cylScheduleDetails, setCylScheduleDetails] = useState([]);
    const [modal, setModal] = useState(false);
    const [changeUseEffect, setChangeUseEffect] = useState(0);
    const [jobData, setJobData] = useState({});
    const [jobOrderObj, setJobOrderObj] = useState([]);
    const [cyliderValue,setCyliderValue] = useState('');
    const [selectedCylinderIds, setSelectedCylinderIds] = useState([]);
    const [allCylinderIds, setAllCylinderIds] = useState([]);

    let [cylScheduleFormData, setCylScheduleFormData] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            slot             : 0,
            cylinder_id      : '',
            job_type         : '',
            job_cylinder_ids : [],
            fl               : '',
            cir              : '',
            dia              : '',
            est_plating_order: '',
            surface_area     : '',
            grinding_cylinder_id: ''
        }
    );

    console.log(cylScheduleFormData);

    useEffect(() => {
        // ADD,EDIT,DELETE,SHOW ACCESS CHECK
        userGetMethod(`${PLATING_DEPT_RSURL}/create`)
            .then(response => {
                // FOR JOB ORDER
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
                setIsLoading(false);
            });
    },[]);
    // FOR CYLINDER SCHEDULE DETAILS DATA INPUT
    const inputHandler = (event) => {
        setCylScheduleFormData(
            {[event.target.name] : event.target.value},
        );
        if(event.target.name == 'cylinder_id') {
            getPlatingOrder(event.target.value);
            const selectedGrindingId = event.target.options[event.target.selectedIndex].getAttribute('data-grinding-id');
            
            setCyliderValue( selectedGrindingId)
            // setCylScheduleDetails(
            //     [...cylScheduleDetails,
            //         selectedGrindingId],
            // );
        }
    }
   
    // JSON.stringify({ cylinder_id: cylinder.cylinder_id, grinding_cylinder_id: cylinder.grinding_cylinder_id })
    const  getPlatingOrder = async(cylinder_id) => {
        // setCylScheduleFormData({ ...cylScheduleFormData, [cylinder_id]: cylinder_id });
        userGetMethod(`${EST_PLATING_ORDER_RSURL}?cylinder_id=${cylinder_id}`)
        .then((response) => {
            
            setCylScheduleFormData(
                
                {'est_plating_order' : response?.data},
            );
        })
        .catch((error) => {
            console.log(error);
        })
    }
    // FOR Typeahead DATA INPUT
    const dropDownChange = (event, stateName) => {
        if(event.length > 0){
            setJobOrderObj(event);
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
                    let {fl, cir, dia, surface_area,job_type} = response.data.jobData;
                    setCylScheduleFormData({
                        'job_cylinder_ids': response.data.job_cylinder_ids,
                        'fl'              : fl,
                        'cir'             : cir,
                        'dia'             : dia,
                        'surface_area'    : surface_area,
                        'job_type'        : job_type,
                    })
                    setAllCylinderIds(response.data.job_cylinder_ids)
                });
        }

    }


    // FOR CYCLE SCHEDULE DETAILS ARRAY READY
    const addCylSchedulHandler = (event) => {
        let {cylinder_id, job_type, fl, cir, dia, est_plating_order, surface_area} = cylScheduleFormData;
        // console.log(cylScheduleFormData)

        
        if (dropdownData.job_order_id === ''|| fl === '' || cir === '' || dia === '' || cylinder_id === '' || job_type == '' || est_plating_order === '' || surface_area === '') {
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
                        // console.log(response.data);
                        if (Object.keys(response.data).length === 1) {
                            SweetAlert.fire({title:"Warning", text:"Cylinder already in queue", icon:"warning"});
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
                            cylScheduleDetails_obj.est_plating_order = est_plating_order;
                            cylScheduleDetails_obj.surface_area = surface_area;
                            cylScheduleDetails_obj.grinding_cylinder_id = cyliderValue;

            
                            cylScheduleDetails_arr.push(cylScheduleDetails_obj);
            
                            // PUSH BASE ORDER DETAILS MAIN ARRAY
                            setCylScheduleDetails([
                                ...cylScheduleDetails,
                                ...cylScheduleDetails_arr
                            ]);
                            setJobOrderObj([]);
                        }
                    })
                    .catch(function (err) {
                        console.error(err)
                    });
                
            }
            
        }
    }

    // console.log(allCylinderIds)
   
    const filteredCylinderIds = allCylinderIds.filter(cylinder =>
        !cylScheduleDetails.find(selectedCylinder => selectedCylinder.cylinder_id === cylinder.cylinder_id)
        );

    // FOR REMOVE CYCLE SCHEDULE DETAILS SINGLE DATA FROM CYCLE SCHEDULE DETAILS ARRAY
    const removeCycleHandler = (cylinder_id) => {
        let filteredScheduleData = cylScheduleDetails.filter((item) => item.cylinder_id != cylinder_id);
        setCylScheduleDetails([
            ...filteredScheduleData
        ]);
    }

    const submitHandler = (data, e) => {
        // data.grinding_cylinder_id = cyliderValue;
        // data.cylinder_id = cylScheduleFormData.cylinder_id;
        data.cylScheduleArr = cylScheduleDetails;
        data.tankId = props.tankId;
        data.job_order_id = dropdownData.job_order_id;
        data.tank_id = props.tank_id;
        // console.log(data)

        if (data.cylScheduleArr.length > 0) {
            props.onChangeTank(props.tankId, props.modalTitle);
            userPostMethod(`${PLATING_DEPT_RSURL}`, data)
                .then(response => {
                    if (response.data.status == 1) {
                        toast.success(response.data.message);
                        // e.target.reset();
                        props.toggle();
                        props.onChangeTank(props.tankId, props.modalTitle);
                        props.callApi();
                    } else {
                        toast.error(response.data.message);
                    }
                    // setChangeUseEffect(changeUseEffect+1);
                })
                .catch(error => toast.error(error))
        } else {
            SweetAlert.fire({title:"Warning", text:"Please Add at list one cylinder schedule!", icon:"warning"});
        }
    }

    return (
        <Modal isOpen={ props.modal && isOpenModalPrev } toggle={props.toggle} size="xlg">
            <ModalHeader toggle={props.toggle}>Manual Cycle Plan Form {props.modalTitle} Tank</ModalHeader>
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
                                                        // inputProps={{ required: true }}
                                                        onChange={(e) => dropDownChange(e, 'job_order_id')}
                                                        ref={register({
                                                            required: 'Job Order Type Field Required'
                                                          })}
                                                        // selected={jobOrderObj}
                                                    />
                                                </div>

                                                <div className="col-md-2 mb-3">
                                                    <label htmlFor="cylinder_id">Cylinder Id</label>
                                                    <select className="form-control" onChange={inputHandler} id="cylinder_id" name="cylinder_id" value={filteredCylinderIds.cylinder_id}>
                                                        <option value=''>Select One</option>
                                                        {filteredCylinderIds&& filteredCylinderIds.map(cylinder => (
                                                            <option value={cylinder.cylinder_id} key={cylinder.cylinder_id}
                                                            data-grinding-id={cylinder.grinding_cylinder_id}>{cylinder.cylinder_id}</option>
                                                
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <input type="hidden" name="grinding_cylinder_id" value=''></input>
                                                </div>

                                                <div className="col-md-2 mb-3">
                                                    <label htmlFor="job_type">Job Type</label>
                                                    <select className="form-control" onChange={inputHandler} id="job_type" name="job_type" value={cylScheduleFormData?.job_type} disabled>
                                                        <option value=''>Select One</option>
                                                        <option value="New">New</option>
                                                        <option value="Remake">Remake</option>
                                                        <option value="Redo">Redo</option>
                                                        <option value="DC/RC">DC/RC</option>
                                                    </select>
                                                </div>

                                                <div className="col-md-1 mb-3">
                                                    <label htmlFor="fl">FL</label>
                                                    <input 
                                                        className="form-control" 
                                                        id="fl" 
                                                        name="fl"
                                                        required = {cylScheduleDetails.length > 0 ? false : true}
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
                                                        required = {cylScheduleDetails.length > 0 ? false : true}
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
                                                        required = {cylScheduleDetails.length > 0 ? false : true}
                                                        disabled="disabled"
                                                        value={cylScheduleFormData.dia} 
                                                        type="number" 
                                                        placeholder="Dia" 
                                                        onChange={inputHandler}
                                                    />
                                                </div>

                                                <div className="col-md-1 mb-3">
                                                    <label htmlFor="est_plating_order" style={{width: "95px"}}>Est Plt. Order</label>
                                                    <input 
                                                        className="form-control" 
                                                        id="est_plating_order" 
                                                        name="est_plating_order"
                                                        required = {cylScheduleDetails.length > 0 ? false : true}
                                                        value={cylScheduleFormData.est_plating_order} 
                                                        type="number" 
                                                        placeholder="" 
                                                        onChange={inputHandler}
                                                        disabled
                                                    />
                                                </div>

                                                <div className="col-md-1 mb-3">
                                                    <label htmlFor="surface_area">Surface Area</label>
                                                    <input 
                                                        className="form-control" 
                                                        id="surface_area" 
                                                        name="surface_area"
                                                        required = {cylScheduleDetails.length > 0 ? false : true}
                                                        value={cylScheduleFormData.surface_area} 
                                                        type="number" 
                                                        placeholder="" 
                                                        onChange={inputHandler}
                                                        disabled
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
                                                                    <td>{item?.job_order_id_name}</td>
                                                                    <td>{item?.cylinder_id}</td>
                                                                    <td>{item?.job_type}</td>
                                                                    <td>{item?.fl}</td>
                                                                    <td>{item?.cir}</td>
                                                                    <td>{item?.dia}</td>
                                                                    <td>{item?.est_plating_order ? item.est_plating_order : ''}</td>
                                                                    <td>{item?.surface_area}</td>
                                                                    <td align="center">
                                                                        <span onClick={()=>removeCycleHandler(item?.cylinder_id)}>
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