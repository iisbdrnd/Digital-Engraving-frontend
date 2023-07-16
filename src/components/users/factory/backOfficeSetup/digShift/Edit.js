import React, { Fragment, useEffect, useReducer, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from 'react-hook-form'
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { PanelRefreshIcons, SubmitButton, ValidationAlerts, AddButton } from '../../../../common/GlobalButton';
import { userGetMethod, userPutMethod, userPostMethod } from '../../../../../api/userAction';
import { DIG_SHIFT_RSURL, userHasAccess } from '../../../../../api/userUrl';
import SweetAlert from 'sweetalert2';

const Edit = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [hasAccess, setHasAccess] = useState({});
    const [accLoad, setAccLoad] = useState(true);
    const [validateErrors, setValidateErrors] = useState([]);
    const [dropdownData, setDropdownData] = useState({});
    const [typeheadOptions, setTypeheadOptions] = useState({});
    const [shiftEmployees, setShiftEmployees] = useState([]);
    const [allMachines, setAllMachines] = useState([]);

    var menuId = 0;
    if (props.location.state === undefined) {
        var menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }

    let [shiftFormData, setShiftFormData] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            shift_in_charge: [],
            shift_date     : '',
            shift_type     : '',
            remarks        : '',
            isUpdate       : '',
        }
    );

    useEffect(() => {
        // ADD,EDIT,DELETE,SHOW ACCESS CHECK
        userGetMethod(`${userHasAccess}/${menuId}`)
            .then(response => {
                setHasAccess(response.data);
                setAccLoad(false);
            });
        pageRefreshHandler();
    },[]);

    const pageRefreshHandler = () => {
        setIsLoading(true);
        userGetMethod(`${DIG_SHIFT_RSURL}`)
            .then(response => {
                if (response.data.platingShiftInfo) {
                    let {shift_date, shift_type, remarks} = response.data.platingShiftInfo;
                    setShiftFormData({shift_date, shift_type, remarks});
                } else {
                    setShiftFormData({shift_date: '', shift_type: '', remarks: ''});
                }
                setShiftFormData({'isUpdate': response.data.isUpdate});
                setAllMachines(response.data.allMachines);
                setShiftEmployees(response.data.platingShiftDetails);
                // FOR JOB ORDER
                let shiftInChargeEmpOptions = [];
                if (response.data.shiftInChargeEmpls && response.data.shiftInChargeEmpls.length > 0) {
                    response.data.shiftInChargeEmpls.map(inCharge => 
                    {
                        let shiftInChargeObj = {};
                        shiftInChargeObj.id = inCharge.id;
                        shiftInChargeObj.name = `[${inCharge.employee_id}] ` + inCharge.name;
                        shiftInChargeEmpOptions.push(shiftInChargeObj);
                        
                        if (response.data.platingShiftInfo && (response.data.platingShiftInfo.shift_in_charge == inCharge.id)) {
                            setShiftFormData({
                                shift_in_charge: [shiftInChargeObj]
                            })
                        } else {
                            setShiftFormData({
                                shift_in_charge: []
                            })
                        }
                    })
                }
                setTypeheadOptions(
                    (prevstate) => ({
                        ...prevstate,
                        ['shiftInChargeEmplyees']: shiftInChargeEmpOptions,
                        ['dutyPersonEmployees']: shiftInChargeEmpOptions,
                    })
                );

                setIsLoading(false);
            });
    }

    const changeHandler = (event) => {
        setShiftFormData({[event.target.name]: event.target.value});
    }

    // FOR Typeahead DATA INPUT
    const dropDownChange = (event, stateName) => {
        if(event.length > 0){
            const selectedValue = event[0].id;
            const selectedValueName = event[0].name;
            setDropdownData(
                (prevstate) => ({
                    ...prevstate,
                    [stateName]: selectedValue,
                    [stateName+'_name']: selectedValueName,
                })
            );
        } 

    }
    // FOR SHIFT DETAILS ARRAY READY
    const addShiftDetailsHandler = (event) => {
        if (dropdownData.duty_person === undefined) {
            SweetAlert.fire({title:"Warning", text:"Please Select any one duty Person", icon:"warning"});
        } else {
            // OBJECT CREATE & PUSH IN AN ARRAY
            let shiftEmployees_arr = [];
            let shiftEmployees_obj = {};
            shiftEmployees_obj.duty_person = dropdownData.duty_person;
            shiftEmployees_obj.duty_person_name = dropdownData.duty_person_name;

            shiftEmployees_arr.push(shiftEmployees_obj);

            // console.log({shiftEmployees_arr});
            // PUSH BASE ORDER DETAILS MAIN ARRAY
            if (shiftEmployees.length > 0) {
                // CHECKING FOR DUPLICATE ENTRY
                let isExist = shiftEmployees.some(item => item.duty_person === shiftEmployees_obj.duty_person);
                let alreadyInShiftInCharge = shiftEmployees.some(item => item.duty_person === shiftFormData.shift_in_charge[0].id);
                console.log('shiftEmployees', shiftEmployees, shiftFormData.shift_in_charge[0].id);
                console.log({alreadyInShiftInCharge});
                // if (condition) {
                    
                // }
                if (isExist === false) {
                    setShiftEmployees([
                        ...shiftEmployees,
                        ...shiftEmployees_arr
                    ]);
                } else {
                    SweetAlert.fire({title:"Warning", text:"This Duty Person is already exists!", icon:"warning"});
                }
            } else { //FIRST TIME PUSH
                setShiftEmployees([
                    ...shiftEmployees,
                    ...shiftEmployees_arr
                ]);
            }
        }
    }
    // console.log({shiftEmployees});
    // FOR REMOVE ORDER DETAILS SINGLE DATA FROM ORDER DETAILS ARRAY
    const removeBaseOrderHandler = (duty_person) => {
        console.log(duty_person);
        let availableBaseOrder = shiftEmployees.filter((item) => item.duty_person != duty_person );
        setShiftEmployees([
            ...availableBaseOrder
        ]);
    }
    // FINALLY SUBMIT FOR SAVE TO SERVER
    const submitHandler = (data, e) => {
        data.shift_in_charge = dropdownData.shift_in_charge == undefined ? shiftFormData.shift_in_charge[0].id : dropdownData.shift_in_charge;
        let duty_person_array = [];
        shiftEmployees.map((item, index) => {
            duty_person_array.push(item.duty_person)
        });
        data.duty_person_array = duty_person_array;
        console.log({duty_person_array});
        if (duty_person_array.length > 0) {
            let isUpdate = shiftFormData.isUpdate == true ? 1 : 0;
            userPostMethod(`${DIG_SHIFT_RSURL}?isUpdate=${isUpdate}`, data)
                .then(response => {
                    console.log('response', response.data);
                    if (response.data.status == 1) {
                        toast.success(response.data.message)
                        e.target.reset();
                        pageRefreshHandler();
                    } else {
                        setValidateErrors([])
                        toast.error(response.data.message)
                        setValidateErrors(Object.values(response.data.errors))
                    }
                })
            .catch(error => toast.error(error))
        } else {
            SweetAlert.fire({title:"Warning", text:"Please Add Duty Person!", icon:"warning"});
        }
    }

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">

                            <div className="card-header">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5>{shiftFormData.isUpdate ? 'Running Shift Form' : 'Add Shift'}</h5>
                                    </div>
                                    <div className="col-md-6">
                                        <PanelRefreshIcons panelRefresh={pageRefreshHandler} />
                                    </div>
                                </div>
                            </div>

                            <div className="card-body">
                                {validateErrors.length > 0 ? <ValidationAlerts items={validateErrors} setOpenVal={true} /> : '' }
                                {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                        <div className="row">

                                            <div className="col-md-4">
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="shift_date">Shift Date</label>
                                                    <div className="col-sm-8">
                                                        <input 
                                                            className="form-control" 
                                                            id="shift_date" 
                                                            name="shift_date" 
                                                            type="date"
                                                            placeholder="Shift Date"
                                                            autoComplete="off"
                                                            ref={register({
                                                                required: 'Shift Date Field Required'
                                                            })}
                                                            value={shiftFormData.shift_date}
                                                            onChange={changeHandler}
                                                        />
                                                        {errors.shift_date && <p className='text-danger'>{errors.shift_date.message}</p>}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="shift_type">Select Shift Type</label>
                                                    <div className="col-sm-6">
                                                        <select className="form-control" id="shift_type" name="shift_type"
                                                            ref={register({
                                                                required: 'Shift Type Field Required'
                                                            })} defaultValue={shiftFormData.shift_type} onChange={changeHandler}>
                                                            <option value=""> Select </option>
                                                            <option value="1">Day</option>
                                                            <option value="2">Evening</option>
                                                            <option value="3">Night</option>
                                                        </select>
                                                        {errors.shift_type && <p className='text-danger'>{errors.shift_type.message}</p>}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="shift_in_charge">Shift In Charge</label>
                                                    <div className="col-sm-6">
                                                        {shiftFormData.shift_in_charge.length === 0 ?
                                                        <Typeahead
                                                            id="shift_in_charge"
                                                            name="shift_in_charge"
                                                            labelKey={option => `${option.name}`}
                                                            options={typeheadOptions['shiftInChargeEmplyees']}
                                                            placeholder="Select Issue To"
                                                            onChange={(e) => dropDownChange(e, 'shift_in_charge')}
                                                        /> : 
                                                        <Typeahead
                                                            id="shift_in_charge"
                                                            name="shift_in_charge"
                                                            labelKey={option => `${option.name}`}
                                                            options={typeheadOptions['shiftInChargeEmplyees']}
                                                            placeholder="Select Issue To"
                                                            onChange={(e) => dropDownChange(e, 'shift_in_charge')}
                                                            selected={shiftFormData.shift_in_charge}
                                                        />}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="row m-t-10 m-l-10">
                                            <div className="col-md-6">
                                                <pre className="helper-classes m-t-10">
                                                    <div className="table-responsive display-div">
                                                        <table className="table table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th width="30%">Machine Name</th>
                                                                    <th width="20%">Status</th>
                                                                    <th width="50%">Reason</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    allMachines.length > 0 ? 
                                                                    <>
                                                                        {allMachines.map((machine, index) => (
                                                                        <tr key={index}>
                                                                            <td align="left">{machine.machine_name}</td>
                                                                            <td align="left">{machine.active_status == 1 ? 'Online': 'Offline'}</td>
                                                                            <td align="left">{machine.reason}</td>
                                                                        </tr>
                                                                        ))}
                                                                    </> 
                                                                    : (
                                                                        <tr>
                                                                            <td align="center" colSpan="3">No Machine Found!</td>
                                                                        </tr>
                                                                    )
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </pre>
                                            </div>
                                            
                                            <div className="col-md-6">
                                                <fieldset className="border" style={{width: '98%'}}> 
                                                    <legend className="w-auto text-left">On Duty Person</legend>
                                                        <div className="col-md-12"> 
                                                            <div className="form-group row">
                                                                <label className="col-sm-4 col-form-label" htmlFor="duty_person">On Duty Person</label>
                                                                <div className="col-sm-6">
                                                                    <Typeahead
                                                                        id="duty_person"
                                                                        name="duty_person"
                                                                        labelKey={option => `${option.name}`}
                                                                        options={typeheadOptions['dutyPersonEmployees']}
                                                                        placeholder="Select Duty Person"
                                                                        onChange={(e) => dropDownChange(e, 'duty_person')}
                                                                    />
                                                                </div>
                                                                <div className="col-md-1 mb-4">
                                                                    <span className="btn btn-primary btn-sm mr-1" type="add" onClick={addShiftDetailsHandler}>Add</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-12">
                                                            <table className="table table-bordered" style={{width: '100%'}}>
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col" width="90%">Duty Person</th>
                                                                        <th scope="col" width="10%">Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        shiftEmployees.length > 0 ?
                                                                        <>
                                                                            {shiftEmployees.map((item, index)=> 
                                                                                (
                                                                                <tr key={index}>
                                                                                    <th scope="row">{item.duty_person_name}</th>
                                                                                    <td align="center">
                                                                                        <span onClick={()=>removeBaseOrderHandler(item.duty_person)}>
                                                                                            <i className="icon-close" style={{ width: 25, fontSize: 16, padding: 0, color: '#e4566e', cursor: 'pointer' }}
                                                                                            ></i>
                                                                                        </span>
                                                                                    </td>
                                                                                </tr>
                                                                                )
                                                                            )}
                                                                        </>
                                                                        : <tr><td colSpan="2" className="text-center">No data Added</td></tr>
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                
                                                </fieldset>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                                <fieldset className="border" >
                                                    <legend className="w-auto text-left">Finished</legend>
                                                        <div className="form-group row">
                                                            <label className="col-sm-2 col-form-label required" htmlFor="remarks">Remarks</label>
                                                            <div className="col-sm-10">
                                                                <input 
                                                                    className="form-control" 
                                                                    id="remarks" 
                                                                    name="remarks" 
                                                                    type="text" 
                                                                    placeholder="Remarks"
                                                                    value={shiftFormData.remarks}
                                                                    onChange={changeHandler}
                                                                    ref={register({
                                                                        required: 'Remarks Field Required'
                                                                    })}
                                                                />
                                                                {errors.remarks && <p className='text-danger'>{errors.remarks.message}</p>}
                                                            </div>
                                                        </div>
                                                </fieldset>
                                            </div>
                                        </div>

                                        <SubmitButton link="shiftControl/index" backBtnTitle="Back to Running" menuId={ menuId } offset="4" />
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Edit;