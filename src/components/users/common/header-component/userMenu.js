import React,{Fragment, useState, useEffect} from 'react';
import ProfilePic from '../../../../assets/images/user/user.png';
import { User, LogOut } from 'react-feather';
import app from "../../../../data/base";
import cookie from 'js-cookie';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserMenu = (props) => {
    const [profile, setProfile] = useState('');
    const logOut = () => {
        cookie.remove('userToken')
        sessionStorage.removeItem('userToken')
        props.logout();
    }

    const [UserImage, setUserImage] = useState({
        UserImage:[]
    });

    useEffect(() => {
        let userToken = sessionStorage.getItem('userToken');
        setProfile(ProfilePic);
        axios.get(`${process.env.REACT_APP_BASEURL}/api/user/profileEdit`,{ headers: {"Authorization" : `Bearer ${userToken}`} })
        .then(response=>{
            setUserImage({
                UserImage: response.data.image,
            })
        });
      },[]);

    return (
        
        <Fragment>
            <li className="onhover-dropdown">
                <div className="media align-items-center justify-content-end">
                    {/* <img className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded" src={profile} alt="header-user" /> */}
                    {
                        UserImage.UserImage == '' || UserImage.UserImage == null
                        ?
                        <img className="img-50 rounded-circle lazyloaded blur-up"  height="50px"  src={`${process.env.REACT_APP_BASEURL}/public/uploads/demo.jpg`}/>
                        :
                        <img className="img-50 rounded-circle lazyloaded blur-up"  height="50px" src={`${process.env.REACT_APP_BASEURL}/uploads/user/${UserImage.UserImage}`} /> 
                    }
                    <div className="dotted-animation">
                        <span className="animate-circle"></span>
                        <span className="main-circle"></span>
                    </div>
                </div>
                <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
                    {/* <li><Link to="/settings/profile" ><i data-feather="user"></i>Edit Profile</Link></li> */}
                    <li><Link to="/userEdit"><User />Edit Profile</Link></li>
                    <li><a onClick={logOut}><LogOut /> Log out</a></li>
                </ul>
            </li>
        </Fragment>
    );
};

const mapDispatchToProps = (dispatch) =>{
    return {
        logout: () => dispatch({type: 'SET_USER_LOGOUT'}),
    }
}
export default connect(null, mapDispatchToProps)(UserMenu);
// export default UserMenu;