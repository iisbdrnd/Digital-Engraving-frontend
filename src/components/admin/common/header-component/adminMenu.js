import React,{Fragment, useState, useEffect} from 'react';
import man from '../../../../assets/images/dashboard/user.png';
import { User, Mail, Lock, Settings, LogOut } from 'react-feather';
import app from "../../../../data/base";
import cookie from 'js-cookie';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';




const AdminMenu = (props) => {
    const [profile, setProfile] = useState('');
    const [adminUserImage, setadminUserImage] = useState({
        adminUserImage:[]
    }); 
    useEffect(() => {
        let adminToken = sessionStorage.getItem('adminToken');
        setProfile(localStorage.getItem('profileURL') || man);
        axios.get(`${process.env.REACT_APP_BASEURL}/api/admin/profileEdit`,{ headers: {"Authorization" : `Bearer ${adminToken}`} })
        .then(response=>{
            setadminUserImage({
                adminUserImage: response.data.image,
            })
        });
      },[]);

    const logOut = () => {
        localStorage.removeItem('profileURL')
        app.auth().signOut()
        cookie.remove('adminToken')
        sessionStorage.removeItem('adminToken')
        props.adminLogout();
    }

   



    return (
        <Fragment>
            <li className="onhover-dropdown">
                <div className="media align-items-center">
                    {/* <img className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded" src={profile} alt="header-user" /> */}
                    {
                        adminUserImage.adminUserImage == ''
                        ?
                        <img className="img-60 rounded-circle lazyloaded blur-up"  height="60px"  src={`${process.env.REACT_APP_BASEURL}/uploads/demo.jpg`}/>
                        :
                        <img className="img-60 rounded-circle lazyloaded blur-up"  height="60px" src={`${process.env.REACT_APP_BASEURL}/uploads/${adminUserImage.adminUserImage}`} /> 
                    }
                    <div className="dotted-animation">
                        <span className="animate-circle"></span>
                        <span className="main-circle"></span>
                    </div>
                </div>
                <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
                    {/* <li><Link to="/settings/profile" ><i data-feather="user"></i>Edit Profile</Link></li> */}
                    <li><Link to="/users/AdminUserEdit"><User />Edit Profile</Link></li>
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
export default connect(null, mapDispatchToProps)(AdminMenu);
// export default AdminMenu;