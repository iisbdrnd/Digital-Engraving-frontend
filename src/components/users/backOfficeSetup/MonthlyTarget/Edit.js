import React, { Fragment, useState,useReducer } from 'react';
import { colorAPI, postMonthlyTargetAPI } from '../../../../api/userUrl';
import { userPostMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';
import { ToggleButton } from '../../../common/toggleBtn/toggleButton';

function Edit() {
    const [colorInput, setColorInput] = useState(false)
    const { handleSubmit, register, errors } = useForm();
    const [value, setValue] = useState([])



    const handleChangeValue = (event, stateName) =>{
        if (stateName == '1' || stateName == '2' || stateName == '3' || stateName == '4' || stateName == '5' || stateName == '6' || stateName == '7' || stateName == '8' || stateName == '9' || stateName == '10' || stateName == '11' || stateName == '12' ) {
            setValue({ ...value,[stateName]: event.target.value })
          }
    }
    // console.log(value);

    const submitHandler = (data, e) => {
        data.monthlyCylinderQyt = value;
        data.status = colorInput == false ? 0 : 1;
        // console.log(data);
        userPostMethod(postMonthlyTargetAPI, data)
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

    const clearField = () =>{
        setValue([]);
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
                                <h5>Add Monthly Target</h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                    <div className="row">
                                    <div className="col-md-6">
                                    <div className="form-group row mb-3">
                                    <label className="col-sm-6 col-form-label" htmlFor="year">Target Year</label>
                                        <div className="col-sm-6">
                                            <select className="form-control" name="year" ref={register({})}>
                                                <option value="">Select One</option>
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
                                        <label className="col-sm-6 col-form-label" htmlFor="january">January</label>
                                        <div className="col-sm-6">
                                            <input 
                                                className="form-control"
                                                id="january" 
                                                // name="january" 
                                                type="number" 
                                                placeholder="Cylinder Quantity.."
                                                onChange={(e)=>handleChangeValue(e,'1')}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Name Field Required'
                                                })}
                                            />
                                            {errors.january && <p className='text-danger'>{errors.january.message}</p>}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-6 col-form-label" htmlFor="february">February</label>
                                        <div className="col-sm-6">
                                            <input 
                                                className="form-control"
                                                id="february" 
                                                // name="february" 
                                                type="number" 
                                                placeholder="Cylinder Quantity.."
                                                onChange={(e)=>handleChangeValue(e,'2')}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Name Field Required'
                                                })}
                                            />
                                            {errors.february && <p className='text-danger'>{errors.february.message}</p>}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-6 col-form-label" htmlFor="march">March</label>
                                        <div className="col-sm-6">
                                            <input 
                                                className="form-control"
                                                id="march" 
                                                // name="march" 
                                                type="number" 
                                                placeholder="Cylinder Quantity.."
                                                onChange={(e)=>handleChangeValue(e,'3')}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Name Field Required'
                                                })}
                                            />
                                            {errors.march && <p className='text-danger'>{errors.march.message}</p>}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-6 col-form-label" htmlFor="april">April</label>
                                        <div className="col-sm-6">
                                            <input 
                                                className="form-control"
                                                id="april" 
                                                // name="april" 
                                                type="number" 
                                                placeholder="Cylinder Quantity.."
                                                onChange={(e)=>handleChangeValue(e,'4')}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Name Field Required'
                                                })}
                                            />
                                            {errors.april && <p className='text-danger'>{errors.april.message}</p>}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-6 col-form-label" htmlFor="may">May</label>
                                        <div className="col-sm-6">
                                            <input 
                                                className="form-control"
                                                id="may" 
                                                // name="may" 
                                                type="number" 
                                                placeholder="Cylinder Quantity.."
                                                onChange={(e)=>handleChangeValue(e,'5')}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Name Field Required'
                                                })}
                                            />
                                            {errors.may && <p className='text-danger'>{errors.may.message}</p>}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-6 col-form-label" htmlFor="june">June</label>
                                        <div className="col-sm-6">
                                            <input 
                                                className="form-control"
                                                id="june" 
                                                // name="june" 
                                                type="number" 
                                                placeholder="Cylinder Quantity.."
                                                onChange={(e)=>handleChangeValue(e,'6')}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Name Field Required'
                                                })}
                                            />
                                            {errors.june && <p className='text-danger'>{errors.june.message}</p>}
                                        </div>
                                    </div>

                                    </div>

                                        {/* Left Side */}
                                    <div className='col-md-6'>

                                    <div className="form-group row">
                                        <label className="col-sm-6 col-form-label" htmlFor="july">July</label>
                                        <div className="col-sm-6">
                                            <input 
                                                className="form-control"
                                                id="july" 
                                                // name="july" 
                                                type="number" 
                                                placeholder="Cylinder Quantity.."
                                                onChange={(e)=>handleChangeValue(e,'7')}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Name Field Required'
                                                })}
                                            />
                                            {errors.july && <p className='text-danger'>{errors.july.message}</p>}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-6 col-form-label" htmlFor="auguest">Auguest</label>
                                        <div className="col-sm-6">
                                            <input 
                                                className="form-control"
                                                id="auguest" 
                                                // name="auguest" 
                                                type="number" 
                                                placeholder="Cylinder Quantity.."
                                                onChange={(e)=>handleChangeValue(e,'8')}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Name Field Required'
                                                })}
                                            />
                                            {errors.auguest && <p className='text-danger'>{errors.auguest.message}</p>}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-6 col-form-label" htmlFor="september">September</label>
                                        <div className="col-sm-6">
                                            <input 
                                                className="form-control"
                                                id="september" 
                                                // name="september" 
                                                type="number" 
                                                placeholder="Cylinder Quantity.."
                                                onChange={(e)=>handleChangeValue(e,'9')}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Name Field Required'
                                                })}
                                            />
                                            {errors.september && <p className='text-danger'>{errors.september.message}</p>}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-6 col-form-label" htmlFor="october">October</label>
                                        <div className="col-sm-6">
                                            <input 
                                                className="form-control"
                                                id="october" 
                                                // name="october" 
                                                type="number" 
                                                placeholder="Cylinder Quantity.."
                                                onChange={(e)=>handleChangeValue(e,'10')}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Name Field Required'
                                                })}
                                            />
                                            {errors.october && <p className='text-danger'>{errors.october.message}</p>}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-6 col-form-label" htmlFor="november">November</label>
                                        <div className="col-sm-6">
                                            <input 
                                                className="form-control"
                                                id="november" 
                                                // name="november" 
                                                type="number" 
                                                placeholder="Cylinder Quantity.."
                                                onChange={(e)=>handleChangeValue(e,'11')}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Name Field Required'
                                                })}
                                            />
                                            {errors.november && <p className='text-danger'>{errors.november.message}</p>}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-6 col-form-label" htmlFor="december">December</label>
                                        <div className="col-sm-6">
                                            <input 
                                                className="form-control"
                                                id="december" 
                                                // name="december" 
                                                type="number" 
                                                placeholder="Cylinder Quantity.."
                                                onChange={(e)=>handleChangeValue(e,'12')}
                                                // value={userInput.name}
                                                ref={register({
                                                    required: 'Name Field Required'
                                                })}
                                            />
                                            {errors.december && <p className='text-danger'>{errors.december.message}</p>}
                                        </div>
                                    </div>
                                        </div>
                                    </div>
                                    </div>
                                   
                                    

                                    

                                            
                                    <SubmitButton link="color/index" offset="2" menuId={ menuId } />
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