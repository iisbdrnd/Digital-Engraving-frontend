import React, { Fragment , useEffect, useState } from 'react';
import ReportHeader from './ReportHeader';
import {CLIENT_DETAILS} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [clientDetails, setClientDetails] = useState({});

    const tableStyle = {
        // "border" : "1px solid #ccc",
        "margin" : "2% 1% 2% 0%"
    }
    let client_id = props.location.state.params.client_id ? props.location.state.params.client_id : null;
    console.log(client_id);
    useEffect(()=>{
        //const client_id = props.match.params.client_id;
        userGetMethod(`${CLIENT_DETAILS}?client_id=${client_id}`) 
        .then(response => {
            console.log('response', response.data.clientDetails);
            setClientDetails(response.data.clientDetails);
            setIsLoading(false);
        })
        .catch(error => console.log(error))
    }, []);
    

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className=""> 
                            <ReportHeader reportTtile="Client Details" />

                            <div className="mainDiv" style={{"padding": "1% 5%"}}>
                            {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    clientDetails != null ? (
                                        <>
                                        <div className="row">
                                            <table className="particulars table-stripped groupFont" width="100%"  style={tableStyle}>
                                                <tr>
                                                    <td width="10%">Client Id</td>
                                                    <td width="10%">Client Name</td>
                                                    <td width="10%">Address</td>
                                                    <td width="10%">Mobile</td>
                                                    <td width="10%">Email</td>
                                                </tr>
                                                <tr>
                                                    <td>{clientDetails.id}</td>
                                                    <td>{clientDetails.name}</td>
                                                    <td>{clientDetails.address}</td>
                                                    <td>{clientDetails.mobile}</td>
                                                    <td>{clientDetails.email}</td>
                                                </tr>
                                                
                                            </table>

                                        </div>
                                        </>
                                    ):(
                                        <div className="text-center">
                                            No Data Found
                                        </div>
                                    )  
                                )
                            } 
                            </div>  
                        </div>
                        
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default Report;