import React, { Fragment, useState, useEffect } from 'react';
import man from '../../../../assets/images/dashboard/user.png'
import { Link } from 'react-router-dom';
import { Edit } from 'react-feather';
import axios from 'axios';
import Swal from 'sweetalert2'

const UserPanel = props => {
    const [url, setUrl] = useState();

    const readUrl = (event) => {
        if (event.target.files.length === 0)
            return;
        //Image upload validation
        var mimeType = event.target.files[0].type;

        if (mimeType.match(/image\/*/) == null) {
            return;
        }
        // Image upload
        var reader = new FileReader();

        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (_event) => {
            setUrl(reader.result)
        }
    }

    const [user, setuser] = useState({
        name:'',
        designation:''
    });

    useEffect(() => {
        let adminToken = sessionStorage.getItem('adminToken');
        axios.get(`${process.env.REACT_APP_BASEURL}/api/admin/profileEdit`,{ headers: {"Authorization" : `Bearer ${adminToken}`} })
        .then(response=>{
            setuser({
                name: response.data.name,
                designation: response.data.designation,
            })
        });
      },[]);

    return (
        <Fragment>
            <div className="sidebar-user text-center">
                <div>
                    <img className="img-60 rounded-circle lazyloaded blur-up" src={url ? url : man} alt="#" />
                    <div className="profile-edit">
                        <Link to={`${process.env.PUBLIC_URL}/users/userEdit`}>
                            <Edit />
                        </Link>
                    </div>
                </div>
                <h6 className="mt-3 f-14">{user.name}</h6>
                <p>{user.designation}.</p>
            </div>
        </Fragment>
    );
};

export default UserPanel;