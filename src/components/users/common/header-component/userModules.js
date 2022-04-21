import React,{Fragment, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {PreMaster} from '../../../../api/userUrl';
import { Folder } from 'react-feather';
import { userGetMethod } from '../../../../api/userAction';

const UserModules = (props) => {
    // const [userModule, setUserModule] = useState([]);

    // useEffect(() => {
    //     userGetMethod(`${PreMaster}`)
    //         .then(response => {
    //             setUserModule(response.data.software_menus);
    //         });
    // },[]);
    const moduleHandler = (moduleId, url) => {
        console.log('module id from module dropdown ', moduleId);
        
        localStorage.removeItem('moduleId');
        localStorage.setItem('moduleId', moduleId);
        // window.location.reload(`${process.env.PUBLIC_URL}/master/${url}`);
        window.location.href = `${process.env.PUBLIC_URL}/user/master/${url}`;
    }

    return (
        
        <Fragment>
            <li className="onhover-dropdown">
                <div className="media align-items-center">
                    <Folder />
                </div>
                <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
                    <li>
                        <span onClick={() => moduleHandler(3, 'supply-chain')}>Supply Chain</span>
                    </li>
                    <li><span onClick={() => moduleHandler(4, 'factory')}>Factory</span></li>
                    <li><span onClick={() => moduleHandler(5, 'accounts')}>Accounts</span></li>
                </ul>
            </li>
        </Fragment>
    );
};

export default UserModules;