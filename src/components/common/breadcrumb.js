import React, { Fragment, useState } from 'react';
import { Home } from 'react-feather';
import { Link } from 'react-router-dom'
import Bookmark from './bookmark';


const Breadcrumb = props => {
    
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="page-header">
                    <h3> {props.title} </h3>
                </div>
            </div>
        </Fragment>
    )
}

export default Breadcrumb
