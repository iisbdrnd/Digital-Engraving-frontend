import React from "react";
import logo from '../../../../assets/images/logo.png';
import './style.scss';


const ReportHeader = props => {
    const printDocument = () => {
        window.print();
    }
    return (
        <div className="report-header">
            <div className="print_button">
                <button className="btn btn-default" onClick={printDocument}><i className="fa fa-print" aria-hidden="true"></i> Print</button>&nbsp;
                <button className="btn btn-default"><i className="fa fa-file-pdf-o" aria-hidden="true"></i>Pdf</button>
            </div>
            <div className="company-info">
                <img className="img-responsive" src={process.env.PUBLIC_URL+'/digitalLogo.png'} alt="Company Logo"/>
                <div>
                    <h1>Digital Engravers Ltd</h1>
                    <span className="company-moto">Digital Image Transfer Technology</span>
                </div>
            </div>
            <div className="report-for">
                <h2>Design File</h2>
                <h2>{props.jobType}</h2>
            </div>
        </div>
)};

export default ReportHeader;