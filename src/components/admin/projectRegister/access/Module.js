import React, { useState, Fragment } from 'react';
import { Tag } from 'react-feather';

const Module = (props) => {
    return (
        <Fragment>
            {
                props.softModules.map((module, key)=> {
                    return (
                        <div className="col-md-2 chart-widget" style={{ cursor:"pointer", marginTop: "15px"}} onClick={() => props.clickHandler(module.id)} key={key}>
                            <div className="media">
                                <div className="media-body">
                                    <p>{module.module_name}</p>
                                </div>
                                <Tag />
                            </div>
                        </div>
                    )
                })
            }
              
        </Fragment>
    );
}
export default Module;