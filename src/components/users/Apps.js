import React ,{useEffect, useState , Fragment} from 'react';
import Header from './common/apps/header';
import Footer from './common/apps/footer';
import {UserApps} from '../../api/userUrl';
import { userGetMethod } from '../../api/userAction';
import Modules from './Modules';

const Apps = () => {
    const [modules, setModules] = useState([]);
    useEffect(() => {
        userGetMethod(`${UserApps}`)
            .then(response => {
                setModules(response.data.modules);
            });
    },[]);

    const moduleHandler = (moduleId) => {
        localStorage.removeItem('moduleId');
        localStorage.setItem('moduleId', moduleId);
    }
    const modulePanel = <Modules clicked={moduleHandler} allModule={modules} />
    return (
        <Fragment>
            <div className="page-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header module-page">
                                    <Header />
                                </div>
                                
                                <div className="card-body">
                                    <div className="col-md-11 offset-md-1">
                                        <div className="row d-flex">
                                            {modulePanel}
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
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
