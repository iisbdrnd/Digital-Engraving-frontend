import React ,{useEffect, useState , Fragment} from 'react';

import Header from './common/apps/header';
import Footer from './common/apps/footer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Tag } from 'react-feather';
import {UserApps} from '../../api/userUrl';
import { userGetMethod } from '../../api/userAction';
import Modules from './Modules';
import {PreMaster} from '../../api/userUrl';

const Apps = (props) => {

    const [modules, setModules] = useState([]);

    useEffect(() => {
        userGetMethod(`${UserApps}`)
        .then(response => {
                setModules(response.data.modules);
            });
    },[]);

    const moduleHandler = (modulePrefix, moduleId) => {
        console.log('module id ', props.moduleId);
        userGetMethod(`${PreMaster}?prefix=${modulePrefix}`)
            .then(response => {
                let userMenuDb = response.data.software_menus;
                props.setUserMenus(userMenuDb);
            });

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
                                    <div className="col-md-8 offset-md-2">
                                        <div className="row">

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

const mapDispatchToProps = (dispatch) =>{
    return {
        setUserMenus: (userMenu) => dispatch({
            type: 'SET_USER_MENU',
            payload: userMenu
        })
    }
}
export default connect(null, mapDispatchToProps)(Apps);
