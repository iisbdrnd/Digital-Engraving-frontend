import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { userGetMethod } from '../../api/userAction';
import { userHasAccess, userMenuList } from '../../api/userUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SubmitButton = props => {
    return (
        <Fragment>
            <div className={`card-footer ${props.addClass}`} >
                <div className={`col-md-12 offset-sm-${props.offset}`}>
                    <button className="btn btn-primary mr-1" type="submit">Submit</button>
                    <Link to={`${process.env.PUBLIC_URL}/${props.link}`} className="btn btn-secondary">Back To List</Link>
                </div>
            </div>
        </Fragment>
    )
}

export const AddButton = props => {
    const [hasAccess, setHasAccess] = useState({});
    useEffect(() => {
        let menuId = props.menuId;

        userGetMethod(`${userHasAccess}/${menuId}`)
        .then(response => {
            setHasAccess(response.data);
        });
    }, [])

    return (
        <Fragment>
            { 
                hasAccess.create === true ? (
                props.hasOwnProperty('header') && props.header == 'no' ?  
                    <Link 
                    to={{
                        pathname: `${process.env.PUBLIC_URL}/${props.link}`,
                        state: { params: {menuId: props.menuId} }
                    }}
                    className="btn btn-primary ml-4">ADD</Link>
                : 
                    <div className="card-header">
                        <div className="col-xl-12">
                            <div className="contact-filter pull-right">
                                <Link 
                                to={{
                                    pathname: `${process.env.PUBLIC_URL}/${props.link}`,
                                    state: { params: {menuId: props.menuId} }
                                }}
                                className="btn btn-primary ml-4">ADD</Link>
                            </div>
                        </div>
                    </div>
                ) : ''
            }
            
        </Fragment>
    )
}


export const EditButton = props => {
    const [hasAccess, setHasAccess] = useState({});
    useEffect(() => {
        let menuId = props.menuId;

        userGetMethod(`${userHasAccess}/${menuId}`)
            .then(response => {
                setHasAccess(response.data);
            });
        console.log('editbtn ');
    }, [])

    return (
        <Fragment>
            { 
                hasAccess.edit === true ? (
                    <Link to={props.link} 
                    className="fa fa-pencil" 
                    style={{ width: 35, fontSize: 16, padding: 11, color: 'rgb(40, 167, 69)', cursor: "pointer" }}
                    ></Link>
                ) : ''
            }
            
        </Fragment>
    )
}
export const DeleteButton = props => {
    const [hasAccess, setHasAccess] = useState({});
    useEffect(() => {
        let menuId = props.menuId;

        userGetMethod(`${userHasAccess}/${menuId}`)
            .then(response => {
                setHasAccess(response.data);
            });
        console.log('editbtn ');
    }, [])

    return (
        <Fragment>
            { 
                hasAccess.destroy === true ? (
                    <span onClick={() => {
                        if (window.confirm('Are you sure you wish to delete this item?')) {
                            props.deleteHandler(props.dataId)
                        } else {
                            // console.log(row.original.id);
                            toast.error('Data Still Safe');
                        }
                    }}>
                        <i className="fa fa-trash" style={{ width: 35, fontSize: 16, padding: 11, color: '#e4566e', cursor: 'pointer' }}
                        ></i>
                    </span>
                ) : ''
            }
            
        </Fragment>
    )
}

