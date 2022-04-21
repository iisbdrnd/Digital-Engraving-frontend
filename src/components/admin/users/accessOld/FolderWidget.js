import React, { Fragment } from 'react';
import { Tag } from 'react-feather';
import { Link } from 'react-router-dom';
import { MenuAccess } from './MenuAccess';

export const FolderWidget = (props) => {

    
    const changeModule = (e)=>{
        console.log(e);
    }

    const moduleSection = props.modules.map((module, key)=>{
        return(
            <div className="col-md-2 chart-widget" style={{ cursor:"pointer", marginTop: "15px"}} key={key} moduleId={module.id} onClick={(e) => changeModule(e)}>
                <div className="media">
                    <div className="media-body">
                        <p>{module.module_name}</p>
                    </div>
                    <Tag />
                </div>
            </div>
        );
    });

    return(
        <Fragment>
            <div className="folder-items d-flex justify-content-around">
                {moduleSection}
            </div>

        </Fragment>
    );
}
