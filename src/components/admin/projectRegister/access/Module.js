import React, { useState, Fragment } from 'react';
import { Navigation } from 'react-feather';

const Module = (props) => {
    return (
        <Fragment>
            {
                props.softModules.map((module, key)=> {
                    return (
                        <div className="col-md-4" key={key}>
                            <div className="card o-hidden">
                                <div className="bg-primary b-r-4 card-body cursor-pointer" onClick={() => props.clickHandler(module.id)} >
                                    <div className="media static-top-widget">
                                        <div className="align-self-center text-center">
                                            <Navigation />
                                        </div>
                                        <div className="media-body">
                                            <span className="m-0">{module.module_name}</span>
                                            <Navigation className="icon-bg" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
              
        </Fragment>
    );
}
export default Module;