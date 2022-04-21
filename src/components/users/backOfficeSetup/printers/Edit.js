import React, { Fragment, useEffect, useReducer } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { printersAPI } from '../../../../api/userUrl';
import { userGetMethod, userPutMethod } from '../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton';

const Edit = (props) => {
    const { handleSubmit, register, errors } = useForm();

    const [userPrinterInput, setPrinterInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            printer_code: '',
            printer_name: '',
            isLoading   : true
        }
    );

    const printersId = props.match.params.printersId;

    const changeHandler = (event) => {
        setPrinterInput({[event.target.name]: event.target.value});
    }

    useEffect(() => {
        userGetMethod(`${printersAPI}/${printersId}/edit`)
            .then(response => {
                console.log('response', response);
                setPrinterInput({
                    printer_code : response.data.printer.printer_code,
                    printer_name : response.data.printer.printer_name,
                    isLoading: false
                });
            })
            .catch(error => console.log(error))   
    },[]);

    const submitHandler = (data) => {
        console.log("data", data);
        userPutMethod(`${printersAPI}/${printersId}`, data )
            .then(response => {
                if (response.data.status == 1) {
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            })
            .catch(error => toast.error(error))
    }

    var menuId = 0;
    if (props.location.state === undefined) {
        var menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }

    return (
        <Fragment>
            {/* <Breadcrumb title="Designation Edit" parent="Designation" /> */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">

                        <div className="card">
                            <div className="card-header">
                                <h5>Update Printer</h5>
                            </div>
                            <div className="card-body">
                                {userPrinterInput.isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <form onSubmit={handleSubmit(submitHandler)} className="theme-form">
                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label" htmlFor="printer_code">Printer Code</label>
                                            <div className="col-sm-4">
                                                <input 
                                                    className="form-control"
                                                    id="printer_code" 
                                                    name="printer_code" 
                                                    type="text" 
                                                    placeholder="Printer Code"
                                                    onChange={changeHandler}
                                                    value={userPrinterInput.printer_code}
                                                    ref={register({
                                                        required: 'Code Field Required'
                                                    })}
                                                />
                                                {errors.printer_code && <p className='text-danger'>{errors.printer_code.message}</p>}
                                            </div>
                                        </div>
                                        
                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label" htmlFor="printer_name">Printer Name</label>
                                            <div className="col-sm-4">
                                                <input 
                                                    className="form-control"
                                                    id="printer_name" 
                                                    name="printer_name" 
                                                    type="text" 
                                                    placeholder="Printer Name"
                                                    onChange={changeHandler}
                                                    value={userPrinterInput.printer_name}
                                                    ref={register({
                                                        required: 'Name Field Required'
                                                    })}
                                                />
                                                {errors.printer_name && <p className='text-danger'>{errors.printer_name.message}</p>}
                                            </div>
                                        </div>
                                    
                                        <SubmitButton link="printers/index" offset="2" menuId={ menuId }/>
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