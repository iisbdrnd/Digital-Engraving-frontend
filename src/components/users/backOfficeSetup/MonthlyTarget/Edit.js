import React, { Fragment, useState,useReducer, useEffect } from 'react';
import { colorAPI, monthlyTargetAPI, postMonthlyTargetAPI } from '../../../../api/userUrl';
import { userGetMethod, userPostMethod, userPutMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';
import { ToggleButton } from '../../../common/toggleBtn/toggleButton';

function Edit(props) {
    const [colorInput, setColorInput] = useState(false)
    const { handleSubmit, register, errors } = useForm();
    const [value, setValue] = useState(0);
    const [targetData,setTargetData] = useState(0);


    const targetId = props.match.params.targetId;



    // console.log(value);
    useEffect(() => {
        userGetMethod(`${monthlyTargetAPI}/${targetId}/edit`)
        .then(response => {
            console.log(response.data);
            setTargetData(response.data.target)
            setValue(response.data?.target?.no_of_cylinder)
        })
        .catch(error => console.log(error))   
    },[]);
   
    
    const handleChangeValue = (event) =>{
         setValue( event.target.value )
        
        
    }
    // console.log(value)
    const submitHandler = (data, e) => {
        data.qty = value;
        data.month_name = targetData.month_name;
        
        // console.log(data);
        userPutMethod(`${postMonthlyTargetAPI}/${targetId}`, data)
            .then(response => {
                if (response.data.status == 1) {
                    e.target.reset();
                    e.target.value ='';
                    clearField();
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            })
        .catch(error => toast.error(error))

        // console.log(data)

    }
    const monthNames = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];
    
    const monthName = monthNames[targetData.month_name - 1];
    

    const clearField = () =>{
        setValue(0);
    }

    var menuId = 0;
    if (props.location.state === undefined) {
        var menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }
  return (
    <div>
         <Fragment>
            {/* <Breadcrumb title="User Designation Add" parent="Designation" /> */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Edit Monthly Target</h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                    <div className="row">
                                    <div className="col-md-6">
                                    <div className="form-group row mb-3">
                                    <label className="col-sm-6 col-form-label" htmlFor="year">Target Year</label>
                                        <div className="col-sm-6">
                                            <select value={targetData?.target_year? targetData?.target_year : ''} className="form-control" name="year" ref={register({})}>
                                                <option value=''>Select One</option>
                                                {/* <option value="2015">2015</option>
                                                <option value="2016">2016</option>
                                                <option value="2017">2017</option>
                                                <option value="2018">2018</option>
                                                <option value="2019">2019</option>
                                                <option value="2020">2020</option>
                                                <option value="2021">2021</option> */}
                                                <option value="2022">2022</option>
                                                <option value="2023">2023</option>
                                                <option value="2024">2024</option>
                                                <option value="2025">2025</option>
                                                <option value="2026">2026</option>
                                                <option value="2027">2027</option>
                                                <option value="2028">2028</option>
                                                <option value="2029">2029</option>
                                                <option value="2030">2030</option>
                                            </select>
                                            {errors.year && <p className='text-danger'>{errors.year.message}</p>}
                                        </div>
                                    </div> </div> 
                                    </div>


                                    
                                    
                                    <div className='mt-3'>
                                    <div className='row d-flex justify-conter-center'>
                                            {/* Right Side */}
                                    <div className='col-md-6 '>

                                    <div className="form-group row">
                                        <label className="col-sm-6 col-form-label" htmlFor="january">{monthName}</label>
                                        <div className="col-sm-6">
                                            <input 
                                                className="form-control"
                                                id="quantity" 
                                                // name="quantity" 
                                                type="number" 
                                                placeholder="Cylinder Quantity.."
                                                onChange={(e)=>handleChangeValue(e)}
                                                value={value}
                                                ref={register({
                                                    required: 'Name Field Required'
                                                })}
                                            />
                                            {errors.january && <p className='text-danger'>{errors.january.message}</p>}
                                        </div>
                                    </div>

                                    </div>

                                      
                                    </div>
                                    </div>
                                   
                                    

                                    

                                            
                                    <SubmitButton link="monthlyTarget/index" offset="2" menuId={ menuId } />
                                </form>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        
        </Fragment>
    </div>
  )
}

export default Edit