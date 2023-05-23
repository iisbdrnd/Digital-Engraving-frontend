import React , {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { Tag, Navigation } from 'react-feather';

const AppsModule = (props) => {
    return (
        <Fragment>
            <Link to={`${process.env.PUBLIC_URL}/master/${props.modulePrefix}`} pre={props.modulePrefix} className="media feather-main m-t-5" style={{background: "#edeef3", padding: "20px", marginRight: "10px", borderRadius: '8px'}} onClick={props.click}>
                <div className="feather-icon-block">
                    <Navigation />
                </div>
                <div className="media-body align-self-center">
                    <h6>{props.moduleName}</h6>
                </div>
            </Link>
        </Fragment>
    );
}

export default AppsModule;