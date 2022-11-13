import React, { Fragment , useEffect, useState } from 'react';
import useForm from "react-hook-form";
import { SubmitButton } from '../../../common/GlobalButton'
import {CLIENT_STOCK_BALANCE_REPORT_FORM} from '../../../../api/userUrl'
import { userGetMethod} from '../../../../api/userAction';

const Form = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [clients, setClients] = useState([]);
    const [printers, setPrinters] = useState([]);

    var menuId = 0;
    if (props.location.state === undefined) {
        menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }

    useEffect(() => {
        userGetMethod(`${CLIENT_STOCK_BALANCE_REPORT_FORM}`)
        .then(response => {
            console.log('response', response.data);
            setClients(response.data.clients);
            setPrinters(response.data.printers);
            setIsLoading(false);
        })
        .catch(error => console.log(error))
    }, []);
    
    const submitHandler = (data, e) => {
        const client_id = data.client_id;
        const printer_id = data.printer_id;
        //console.log('from_date ', data);
        let url = `${process.env.PUBLIC_URL}/clientStockBalanceReport/report/${data.client_id ? data.client_id : null}/${data.printer_id ? data.printer_id : null}`;
        window.open(url, '_blank', 'height=800,width=1200');
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
                                        <h5>Client Stock Balance Report Form</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit(submitHandler)} className="needs-validation theme-form">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label" htmlFor="client_id">Select Client</label>
                                        <div className="col-sm-3">
                                            <select 
                                                name="client_id" 
                                                id="client_id" 
                                                className="form-control" 
                                                defaultValue=""
                                                ref={register({})} 
                                            >
                                            <option value="">Select One</option>
                                            {clients.map(client => (
                                                <option value={client.id}>{client.name}</option>
                                            ))}
                                            </select>
                                            {errors.client_id && <p className='text-danger'>{errors.client_id.message}</p>}

                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label" htmlFor="printer_id">Select Printer</label>
                                        <div className="col-sm-3">
                                            <select 
                                                name="printer_id" 
                                                id="printer_id" 
                                                className="form-control" 
                                                defaultValue=""
                                                ref={register({})} 
                                            >
                                            <option value="">Select One</option>
                                            {printers.map(printer => (
                                                <option value={printer.id}>{printer.printer_name}</option>
                                            ))}
                                            </select>
                                            {errors.printer_id && <p className='text-danger'>{errors.printer_id.message}</p>}

                                        </div>
                                    </div>
                                    <SubmitButton link="#" offset="2" menuId={ menuId }/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
export default Form;