import React, { Fragment, useState, useEffect } from 'react';
import ProfilePic from '../../../../assets/images/user/user.png'
import { Link } from 'react-router-dom';
import { Edit } from 'react-feather';
import axios from 'axios';
import { UserMe } from '../../../../api/userUrl'

const UserPanel = props => {
    const [url, setUrl] = useState('');

    // const [user, setuser] = useState({
    //     name:'',
    //     designation:''
    // });
    const [name, setName] = useState('');

    useEffect(() => {
        let adminToken = sessionStorage.getItem('adminToken');
        axios.post(`${process.env.REACT_APP_BASEURL}/${UserMe}`)
            .then(response => {
                setName(response.data.name)
            }) 
            .catch(err => console.log(err))
    },[]);

    return (
        <Fragment>
            <div className="sidebar-user text-center">
                {/* <div>
                    <img className="img-60 rounded-circle lazyloaded blur-up" src={url ? url : ProfilePic} alt="#" />
                    <div className="profile-edit">
                        <Link to={`${process.env.PUBLIC_URL}/admin/users/userEdit`}>
                            <Edit />
                        </Link>
                    </div>
                </div> */}
                <h6 className="mt-3 f-14">{localStorage.getItem('name')}</h6>
                {/* <p>{user.designation}.</p> */}
            </div>
        </Fragment>
    );
};

export default UserPanel;