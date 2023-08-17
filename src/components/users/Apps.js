import React ,{useEffect, useState , Fragment} from 'react';
import Header from './common/apps/header';
import Footer from './common/apps/footer';
import {UserApps} from '../../api/userUrl';
import { userGetMethod } from '../../api/userAction';
import Modules from './Modules';
import './Apps.css';

const Apps = () => {
    const [modules, setModules] = useState([]);
    const cardColumn = {
        flexDirection: 'column',
        height:'100vh',
        marginBottom: '0'
    }
    const pageBody = {
        display: 'flex',
        height: '100vh',
    }
    useEffect(() => {
        userGetMethod(`${UserApps}`)
            .then(response => {
                setModules(response.data.modules);
            });
    },[]);
    // console.log(modules);

    const moduleHandler = (moduleId) => {
        localStorage.removeItem('moduleId');
        localStorage.setItem('moduleId', moduleId);
    }
    const modulePanel = <Modules clicked={moduleHandler} allModule={modules} />
    return (
        <Fragment>
            <div style={pageBody} className="page-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div style={cardColumn} className="card">
                                <div>
                                <div className="card-header module-page">
                                    <Header />
                                </div>
                                </div>
                                
                                <div className="card-body">
                                    <div className="col-md-11 offset-md-1">
                                        <div className="row d-flex  justify-content-center">
                                            {modulePanel}
                                        </div>
                                    </div>
                                </div>
                                <div style={{marginTop:'auto'}} className="card-footer">
                                    <Footer />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Fragment>
    )
}
export default Apps;
