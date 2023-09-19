import React from "react";
import { getYear } from "./GlobalButton";

const Footer = props => {
    return (
    <footer className="footer">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 footer-copyright">
                    <p className="mb-0">{`Copyrights © ${getYear} INNOVATION. All rights reserved..`}</p>
                </div>
                <div className="col-md-6">
                    <p className="pull-right mb-0">Hand crafted & made with
                        <i className="fa fa-heart"></i>
                    </p>
                </div>
            </div>
        </div>
</footer>
)};

export default Footer;