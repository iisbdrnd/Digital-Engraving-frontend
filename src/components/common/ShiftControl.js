import React ,{ Fragment, useEffect, useReducer, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from 'react-hook-form'
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { PanelRefreshIcons, SubmitButton, ValidationAlerts, AddButton } from './GlobalButton';
import { userGetMethod, userPutMethod, userPostMethod } from '../../../src/api/userAction';
import { DIG_SHIFT_RSURL, ShiftFor, userHasAccess,digShiftFor,shiftInCharge,mechine_GETURL } from '../../../src/api/userUrl';
import SweetAlert from 'sweetalert2';
import { Form } from 'react-bootstrap';
import moment from 'moment';

const ShiftControl = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [hasAccess, setHasAccess] = useState({});
    const [accLoad, setAccLoad] = useState(true);
    const [validateErrors, setValidateErrors] = useState([]);
    const [dropdownData, setDropdownData] = useState({});
    const [typeheadOptions, setTypeheadOptions] = useState({});
    const [shiftEmployees, setShiftEmployees] = useState([]);
    const [allMachines, setAllMachines] = useState([]);
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedDutyPerson,setSeletedDutyPerson] = useState({});
    const [shiftArr, setShiftArr] = useState({});
    const [shiftDutyEmployees, setShiftDutyEmployees] = useState([]);
    const [getDate,setGetDate] = useState('');
    const [getShift,setGetShift] = useState(0);
    const [inChargeData,setInChargeData] = useState([]);
    const [newDuty,setNewDuty] = useState('');
    const [totalEmployees,setTotalEmployees] = useState([]);
    const [newOptions,setNewOptions] = useState([]);
    const [machineData,setMachineData] = useState([]);
    const [exitingShiftCharg,setExitingShiftCharg] = useState('');
    const [selectedShiftChar,setSelectedShiftChar] = useState('');



    var menuId = 0;
    if (props?.location?.state === undefined) {
        var menuId = 0;
    } else {
        menuId = props?.location?.state?.params?.menuId;
    }

    let [shiftFormData, setShiftFormData] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            shift_in_charge: [],
            shift_date: '',
            shift_type: '',
            remarks: '',
            isUpdate: '',
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
    }, []);
    //nirab



    useEffect(() => {

        userGetMethod(`${digShiftFor}`)
            .then(response => {
                // console.log(response.data.shifts);
                if (props.value == 'grinding_shift') {
                    const newArr = response.data.shifts.filter(item => item.shift_name == 'grinding_shift');
                    // console.log(newArr);
                    setOptions(newArr);
                    setSelectedOption(newArr[0].id);
                    // console.log(selectedOption)
                }
                else if (props.value == 'plating_shift') {
                    const newArr = response.data.shifts.filter(item => item.shift_name == 'plating_shift');
                    // console.log(newArr);
                    setOptions(newArr);
                    setSelectedOption(newArr[0].id);
                    // console.log(selectedOption)
                }
               else if (props.value == 'polishing_shift') {
                    const newArr = response.data.shifts.filter(item => item.shift_name == 'polishing_shift');
                    // console.log(newArr);
                    setOptions(newArr);
                    setSelectedOption(newArr[0].id);
                    // console.log(selectedOption)
                }
               else if (props.value == 'engraving_shift') {
                    const newArr = response.data.shifts.filter(item => item.shift_name == 'engraving_shift');
                    // console.log(newArr);
                    setOptions(newArr);
                    setSelectedOption(newArr[0].id);
                    // console.log(selectedOption)
                }
                else if (props.value == 'chrome_shift') {
                    const newArr = response.data.shifts.filter(item => item.shift_name == 'chrome_shift');
                    // console.log(newArr);
                    setOptions(newArr);
                    setSelectedOption(newArr[0].id);
                    // console.log(selectedOption)
                }
                else{
                    setOptions(response.data.shifts); 

                }
                setTotalEmployees(response.data.allEmployees);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    // console.log(options);

   


    // const handleOptionChange = (event) => {
    //     setSelectedOption(event.target.value);
    // }
    const handleSelect = (event) => {
        setSelectedOption(event.target.value);
        // console.log(selectedOption)
    };

    const handleGetCharge = (e) =>{
        setSelectedShiftChar(e.target.value);

    }
    // console.log(selectedShiftChar)
    // const pageRefreshHandler = () => {
    //     setIsLoading(true);
    //     userGetMethod(`${digShiftFor}`)
    //         .then(response => {
    //             if (response.data.allEmployees                    ) {
    //                 let { shift_date, shift_type, remarks } = response.data.platingShiftInfo;
    //                 setShiftFormData({ shift_date, shift_type, remarks });
    //             } else {
    //                 setShiftFormData({ shift_date: '', shift_type: '', remarks: '' });
    //             }
    //             setShiftFormData({ 'isUpdate': response.data.isUpdate });
    //             setAllMachines(response.data.allMachines);
    //             setShiftEmployees(response.data.platingShiftDetails);
    //             // FOR JOB ORDER
    //             let shiftInChargeEmpOptions = [];
    //             if (response.data.shiftInChargeEmpls && response.data.shiftInChargeEmpls.length > 0) {
    //                 response.data.shiftInChargeEmpls.map(inCharge => {
    //                     let shiftInChargeObj = {};
    //                     shiftInChargeObj.id = inCharge.id;
    //                     shiftInChargeObj.name = `[${inCharge.employee_id}] ` + inCharge.name;
    //                     shiftInChargeEmpOptions.push(shiftInChargeObj);

    //                     if (response.data.platingShiftInfo && (response.data.platingShiftInfo.shift_in_charge == inCharge.id)) {
    //                         setShiftFormData({
    //                             shift_in_charge: [shiftInChargeObj]
    //                         })
    //                     } else {
    //                         setShiftFormData({
    //                             shift_in_charge: []
    //                         })
    //                     }
    //                 })
    //             }
    //             setTypeheadOptions(
    //                 (prevstate) => ({
    //                     ...prevstate,
    //                     ['shiftInChargeEmplyees']: shiftInChargeEmpOptions,
    //                     ['dutyPersonEmployees']: shiftInChargeEmpOptions,
    //                 })
    //             );

    //             setIsLoading(false);
    //         });
    // }
    

    const pageRefreshHandler = () => {
        setIsLoading(true);
        userGetMethod(`${DIG_SHIFT_RSURL}`)
            .then(response => {
                // console.log(response.data);
                // if (response.data.allEmployees                    ) {
                //     let { shift_date, shift_type, remarks } = response.data.platingShiftInfo;
                //     setShiftFormData({ shift_date, shift_type, remarks });
                // } else {
                //     setShiftFormData({ shift_date: '', shift_type: '', remarks: '' });
                // }
                // setShiftFormData({ 'isUpdate': response.data.isUpdate });
                // setAllMachines(response.data.allMachines);
                // setShiftEmployees(response.data.platingShiftDetails);
                // FOR JOB ORDER
                let shiftInChargeEmpOptions = [];
                if (response.data.shiftInChargeEmpls && response.data.shiftInChargeEmpls.length > 0) {
                    response.data.shiftInChargeEmpls.map(inCharge => {
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
        setShiftFormData({ [event.target.name]: event.target.value });
        // console.log(shiftFormData);
    }
    useEffect(()=>{
        setShiftArr({selectedOption,getDate,getShift})
        
    },[selectedOption,getDate,getShift]);
    // console.log(shiftArr);
    let valueCharge;
    // console.log(totalEmployees);
    useEffect(()=>{
        if (shiftArr.selectedOption !== ''
        && shiftArr.getDate !== ''
        && shiftArr.getShift !== '') {
            // setIsLoading(true);
            userGetMethod(`${shiftInCharge}?shift_date=${shiftArr.getDate}&shift_type=${getShift}&shift_for=${shiftArr.selectedOption}`)
            .then(response => {
                setInChargeData(response?.data);
                console.log(response?.data);
               
                const shiftInChargArr=[response.data.shiftIncharge];
            
                setNewOptions(shiftInChargArr);
                setShiftDutyEmployees(response?.data?.shiftEmployees);

                // setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                // setIsLoading(false);
            });
        } 
        else{
            // setIsLoading(false);
        }

    },[shiftArr.getShift,shiftArr.selectedOption,shiftArr.getDate]);
    // console.log(inChargeData)
    
    // console.log(exitingShiftCharg);
    function getDefaultSelectedValue() {
        const match = totalEmployees.find((item) =>
          newOptions.some((option) => option.id === item.id)
        );
        if (match && !selectedShiftChar) {
            return (match.id,
                setSelectedShiftChar(match.id))
        }
        else if(match && selectedShiftChar){
            return selectedShiftChar;
        }
        else{
            return selectedShiftChar;
        }
      }


// =================Mechine Data Fetching========================//
    useEffect(()=>{
        if (shiftArr.selectedOption !== '') {
            userGetMethod(`${mechine_GETURL}?shift_for=${shiftArr.selectedOption}`)
            .then(response => {
                setMachineData(response?.data?.machines);
            })
        } else {
            setMachineData([]);
        }
    },[shiftArr.selectedOption])
    // console.log(machineData);

//   const optionselect = newOptions?.map((item) => {
//     value : item.i
//   })

 const handleDutySelect = (e)=> {
     setNewDuty(e.target.value)
    const selectedId = parseInt(e.target.value);
    const selectedEmployee = totalEmployees.find((employee) => employee.id === selectedId);
    if (selectedEmployee) {
        setSeletedDutyPerson((prevSelected) => ({
          ...prevSelected,
          id:selectedId, name: selectedEmployee.name,
        }));
      }
    // setSeletedDutyPerson(e.target.value)
}
// console.log(selectedDutyPerson);


    // FOR Typeahead DATA INPUT
    const dropDownChange = (event, stateName) => {
        if (event.length > 0) {
            const selectedValue = event[0].id;
            const selectedValueName = event[0].name;
             setDropdownData(
                (prevstate) => ({
                    ...prevstate,[stateName]: selectedValue,[stateName + '_name']: selectedValueName,
                })
             );
        }

    }
    // FOR SHIFT DETAILS ARRAY READY
    const addShiftDetailsHandler = (event) => {
        // console.log(shiftDutyEmployees)
        if (shiftDutyEmployees.length === 0 && !newDuty) {
            SweetAlert.fire({ title: "Warning", text: "Please Select any one duty Person", icon: "warning" });
        } else {
            // OBJECT CREATE & PUSH IN AN ARRAY
            let shiftEmployees_arr = [];
            let shiftEmployees_obj = {};
            shiftEmployees_obj.id = selectedDutyPerson.id;
            shiftEmployees_obj.name = selectedDutyPerson.name;

            shiftEmployees_arr.push(shiftEmployees_obj);

            // console.log({shiftEmployees_arr});
            // PUSH BASE ORDER DETAILS MAIN ARRAY
            if (shiftDutyEmployees.length > 0) {
                // CHECKING FOR DUPLICATE ENTRY
                let isExist = shiftDutyEmployees.some(item => item.id === shiftEmployees_obj.id);
                // let alreadyInShiftInCharge = shiftDutyEmployees.some(item => item.id === shiftFormData.shift_in_charge[0].id);
                // console.log('shiftEmployees', shiftEmployees, shiftFormData.shift_in_charge[0].id);
                // console.log({ alreadyInShiftInCharge });
                // if (condition) {

                // }
                if (isExist === false) {
                    setShiftDutyEmployees([
                        ...shiftDutyEmployees,
                        ...shiftEmployees_arr
                    ])
                    setNewDuty('')
                } else {
                    SweetAlert.fire({ title: "Warning", text: "This Duty Person is already exists!", icon: "warning" });
                }
            } else { //FIRST TIME PUSH
                setShiftDutyEmployees([
                    ...shiftDutyEmployees,
                    ...shiftEmployees_arr
                ])
                setNewDuty('');
            }
        }
    }
    // console.log({shiftEmployees});
    // FOR REMOVE ORDER DETAILS SINGLE DATA FROM ORDER DETAILS ARRAY
    const removeBaseOrderHandler = (id) => {
        // console.log(id);
        let availableBaseOrder = shiftDutyEmployees.filter((item) => item.id != id);
        setShiftDutyEmployees([
            ...availableBaseOrder
        ]);
    }
    // FINALLY SUBMIT FOR SAVE TO SERVER
    const submitHandler = (data, e) => {
        data.shift_for = shiftArr.selectedOption;
        data.shift_in_charge = selectedShiftChar;
        // const convertedArray = shiftDutyEmployees.map(item => [item.id, item.name]); 
        // Multidinamtional array
        data.duty_person_array = shiftDutyEmployees;
        // data.duty_person_array = ;
        // array of object =====>>>
        // console.log(data);
       
        
        if (Object.keys(data).length > 0) {
            
            userPostMethod(`${DIG_SHIFT_RSURL}`, data)
                .then(response => {
                    console.log('response', response.data);
                    if (response.data.status == 1) {
                        toast.success(response.data.message)
                        e.target.reset();
                        setMachineData([]);
                        setShiftDutyEmployees([]);
                        setShiftFormData({ remarks: '' });
                        // pageRefreshHandler();
                    } else {
                        setValidateErrors([])
                        toast.error(response.data.message)
                        setValidateErrors(Object.values(response.data.errors))
                    }
                })
                .catch(error => toast.error(error))
        } else {
            SweetAlert.fire({ title: "Warning", text: "Please Add Duty Person!", icon: "warning" });
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
                                        {/* <PanelRefreshIcons panelRefresh={pageRefreshHandler} /> */}
                                    </div>
                                </div>
                            </div>

                            <div className="card-body">
                                {validateErrors.length > 0 ? <ValidationAlerts items={validateErrors} setOpenVal={true} /> : ''}
                                {isLoading ? (<img src={process.env.PUBLIC_URL + '/preloader.gif'} alt="Data Loading" />) :
                                    (
                                        <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                            <div className="row">

                                                <div className="col-md-3 d-flex form-group row">

                                                    <div>
                                                    </div>
                                                    <label className="col-sm-4 col-form-label 
                                                    "  >
                                                        Shift For
                                                    </label>
                                                    <div>
                                                        <select className='form-control' value={options[0]?.shift_name} onChange={handleSelect} disabled>
                                                            
                                                            {options.map((option, index) => (
                                                                <option key={index} value={option.id}>
                                                                    {option.shift_name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>


                                                    {/* {options.map((option, index) => (
          <li key={index}>{option.shift_name}</li>
          
        ))} */}

                                                </div>


                                                <div className="col-md-3">
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
                                                                value={getDate ? getDate : moment().format("YYYY-MM-DD")}
                                                                onChange={(e)=>setGetDate(e.target.value)}
                                                            />
                                                            {errors.shift_date && <p className='text-danger'>{errors.shift_date.message}</p>}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="form-group row">
                                                        <label className="col-sm-4 col-form-label" htmlFor="shift_type">Select Shift Type</label>
                                                        <div className="col-sm-6">
                                                            <select className="form-control" id="shift_type" name="shift_type"
                                                                ref={register({
                                                                    required: 'Shift Type Field Required'
                                                                })} defaultValue={shiftFormData.shift_type} onChange={(e)=>setGetShift(e.target.value)} value={getShift}>
                                                                <option value=""> Select </option>
                                                                <option value="1">Day</option>
                                                                <option value="2">Evening</option>
                                                                <option value="3">Night</option>
                                                            </select>
                                                            {errors.shift_type && <p className='text-danger'>{errors.shift_type.message}</p>}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="form-group row">
                                                        <label className="col-sm-4 col-form-label" htmlFor="shift_in_charge">Shift In Charge</label>
                                                        <div className="col-sm-6">

                                                        {
                                                        
                                                        <select className='form-control' value={getDefaultSelectedValue()} onChange={handleGetCharge}>
                                                        <option value=""> Select a Incharge</option>
                                                            { totalEmployees?.map((item,i) => (
                                                                <option key={i} value={item?.id}>
                                                                {item?.name}
                                                                </option>
                                                            ))
                                                                
                                                            }
                                                                
                                                           
                                                        </select>
                                                    }

   
                                                        
                                                            

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
                                                                        machineData.length > 0 ?
                                                                            <>
                                                                                {machineData.map((machine, index) => (
                                                                                    <tr key={index}>
                                                                                        <td align="left">{machine.machine_name}</td>
                                                                                        <td align="left">{machine.active_status == 1 ? 'Online' : 'Offline'}</td>
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
                                                    <fieldset className="border" style={{ width: '98%' }}>
                                                        <legend className="w-auto text-left">On Duty Person</legend>
                                                        <div className="col-md-12">
                                                            <div className="form-group row">
                                                                <label className="col-sm-4 col-form-label" htmlFor="duty_person">On Duty Person</label>
                                                                <div className="col-sm-6">
                                                                <select className='form-control' value={newDuty} onChange={handleDutySelect}>
                                                                    <option value=""> Select Duty Person</option>
                                                                    {totalEmployees.map((option, index) => (
                                                                        <option key={option.id} value={option.id}>
                                                                            {option.name}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                                </div>
                                                                <div className="col-md-1 mb-4">
                                                                    <span className="btn btn-primary btn-sm mr-1" type="add" onClick={addShiftDetailsHandler}>Add</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-12">
                                                            <table className="table table-bordered" style={{ width: '100%' }}>
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col" width="90%">Duty Person</th>
                                                                        <th scope="col" width="10%">Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        shiftDutyEmployees?.length > 0 ?
                                                                            <>
                                                                                {shiftDutyEmployees.map((item, index) =>
                                                                                (
                                                                                    <tr key={index}>
                                                                                        <th scope="row">{item.name}</th>
                                                                                        <td align="center">
                                                                                            <span onClick={() => removeBaseOrderHandler(item.id)}>
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

                                            <SubmitButton link="shiftControl/index" backBtnTitle="Back to Running" menuId={menuId} offset="4" />
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

export default ShiftControl