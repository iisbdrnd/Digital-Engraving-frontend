import React, { Fragment, useEffect, useReducer, useState } from 'react';
import { accConfigurationAPI } from '../../../../../api/userUrl';
import { userGetMethod, userDeleteMethod, userPostMethod } from '../../../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "react-hook-form";
import { SubmitButton, PanelRefreshIcons } from '../../../../common/GlobalButton';
import { ToggleButton } from "../../../../common/toggleBtn/toggleButton";

const Add = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [accConfigurationData, setAccConfigurationData] = useState([]);
    
    const [accConfigInputData, setAccConfigInputData] = useState();

    const pageRefreshHandler = () => {
        setIsLoading(true);
        setIsLoading(false);
    }

    useEffect(() => {
        userGetMethod(`${accConfigurationAPI}`)
        .then(response => {
            console.log("from controller", response);
            setAccConfigurationData(response.data.accountsConfig);
            var array_length = response.data.accountsFullData.length;
            var obj = {};
            for (var i = 0; i < array_length; i++) {
                obj[response.data.accountsFullData[i].particular] = response.data.accountsFullData[i].account_code;
            } 
            setAccConfigInputData(obj);
            setIsLoading(false);
        })
        .catch(error => console.log(error))
    }, []);



    const changeHandler = (event) => {
        var chngName = event.target.name;
        var chngValue = event.target.value;
        setAccConfigInputData(
            (prevstate) => ({
                ...prevstate,
                [chngName] : chngValue

            })
        );
    }


    const submitHandler = (data, e) => {

        console.log('input', accConfigInputData);
 
        userPostMethod(accConfigurationAPI, accConfigInputData)
            .then(response => {

                console.log(response);
                if (response.data.status == 1) {
                    e.target.reset();
                    toast.success(response.data.messege)
                } else {
                    toast.error(response.data.messege)
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
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5>Account Configuration</h5>
                                    </div>
                                    <div className="col-md-6">
                                        <PanelRefreshIcons panelRefresh={pageRefreshHandler} />
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">

                                {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (

                                    <form onSubmit={handleSubmit(submitHandler)} className="theme-form row">
                                        {
                                            accConfigurationData.map((item, e) => 
                                                Object.values(accConfigurationData[e]).map((configData, f) => 

                                                    (
                        
                                                        
                                                        <>
                                                            
                                                            <div className="form-group row col-md-6">
                                                                <label 
                                                                    htmlFor={configData.particular}
                                                                    className="col-lg-4 col-md-4 col-xs-12 col-form-label required">
                                                                        {configData.particular_name}
                                                                </label>
                                                                <div className="col-lg-8 col-md-8 col-xs-12">
                                                                    <input 
                                                                        name={configData.particular}
                                                                        className="form-control" 
                                                                        //value={configData.account_code}
                                                                        onChange={changeHandler}
                                                                        value={Object(accConfigInputData)[configData.particular]}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </> 
                                                    )
                                                )
                                            )
                                        }
                                        <div className="clearfix"></div>
                                        <div className="form-group m-t-10 offset-sm-2 col-md-12">
                                            <button className="btn btn-primary btn-sm mr-1" type="submit">Submit</button>
                                        </div>
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

export default Add;