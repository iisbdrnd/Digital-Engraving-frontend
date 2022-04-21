import React ,{useEffect, useState , Fragment} from 'react';

import Header from './common/apps/header';
import Footer from './common/apps/footer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Tag } from 'react-feather';
import {PreMaster} from '../../api/userUrl';
import Breadcrumb from './common/breadcrumb';
import { userGetMethod } from '../../api/userAction';
import store from '../../store/index';

const Master = (props) => {
    // console.log(this.props.match.params.prefix);
    let prefix = props.match.params.prefix;
    // console.log(props);
    // const [] = useState();

    useEffect(() => {
        userGetMethod(`${PreMaster}?prefix=${prefix}`)
            .then(response => {
                store.dispatch({type: 'SET_USER_MENU', payload: response.data.software_menus});
            });
    },[]);
    

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="table-responsive col-sm-9 offset-sm-2">
                                    <h3 className="">Hi Admin </h3>
                                    <hr/>
                                    <h1>Welcome to Administration Panel</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

const mapStateToProps = (state) =>{
    return {
        moduleMenu: state.userMenu.userMenus
    };
}
export default connect(mapStateToProps)(Master);
// export default Master;