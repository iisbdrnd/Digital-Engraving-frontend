import React, { Fragment, useState } from 'react';
import man from '../../../assets/images/dashboard/user.png'
import { Link } from 'react-router-dom';
import { Edit } from 'react-feather';

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
    return (
        <Fragment>
            <div className="sidebar-user text-center">
                <div>
                    <img className="img-60 rounded-circle lazyloaded blur-up" src={url ? url : man} alt="#" />
                    <div className="profile-edit">
                        <Link to={`${process.env.PUBLIC_URL}/users/userEdit/`}>
                            <Edit />
                        </Link>
                    </div>
                </div>
                <h6 className="mt-3 f-14">Rafikul Rafi</h6>
                <p>general manager.</p>
            </div>
        </Fragment>
    );
};

export default UserPanel;