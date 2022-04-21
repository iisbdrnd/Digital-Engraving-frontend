import React,{Fragment, useState, useEffect} from 'react';
import man from '../../../assets/images/dashboard/user.png';
import { User, Mail, Lock, Settings, LogOut } from 'react-feather';
import app from "../../../data/base";
import cookie from 'js-cookie';
import { connect } from 'react-redux';


const UserMenu = (props) => {
    const [profile, setProfile] = useState('');
    
    useEffect(() => {
        setProfile(localStorage.getItem('profileURL') || man);
    },[]);

    const logOut = () => {
        localStorage.removeItem('profileURL')
        app.auth().signOut()
        cookie.remove('token')
        sessionStorage.removeItem('token')
        props.logout();
    }

    return (
        <Fragment>
            <li className="onhover-dropdown">
                <div className="media align-items-center">
                    <img className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded" src={profile} alt="header-user" />
                    <div className="dotted-animation">
                        <span className="animate-circle"></span>
                        <span className="main-circle"></span>
                    </div>
                </div>
                <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
                    {/* <li><Link to="/settings/profile" ><i data-feather="user"></i>Edit Profile</Link></li> */}
                    <li><a href="#javascript"><User />Edit Profile</a></li>
                    <li><a href="#javascript"><Mail />Inbox</a></li>
                    <li><a href="#javascript"><Lock />Lock Screen</a></li>
                    <li><a href="#javascript"><Settings />Settings</a></li>
                    <li><a onClick={logOut}><LogOut /> Log out</a></li>
                </ul>
            </li>
        </Fragment>
    );
};

const mapDispatchToProps = (dispatch) =>{
    return {
        logout: () => dispatch({type: 'SET_LOGOUT'}),
        adminLogout: () => dispatch({type: 'SET_ADMIN_LOGOUT'})
    }
}
export default connect(null, mapDispatchToProps)(UserMenu);
// export default UserMenu;