import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { Link } from 'react-router-dom';

import { ProfileInfo } from '../../../api/userUrl';
import { userGetMethod } from '../../../api/userAction';

const CompanyProfile = () => {
    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // const readUrl = (event) => {
    //     if (event.target.files.length === 0)
    //         return;
    //     //Image upload validation
    //     var mimeType = event.target.files[0].type;

    //     if (mimeType.match(/image\/*/) == null) {
    //         return;
    //     }
    //     // Image upload
    //     var reader = new FileReader();

    //     reader.readAsDataURL(event.target.files[0]);
    //     reader.onload = (_event) => {
    //         setUrl(reader.result)
    //     }
    // }

    useEffect(() => {
        userGetMethod(`${ProfileInfo}`)
        .then(response => {
            setCompanies(response.data);
            console.log('response', response.data);
            setIsLoading(false);
        })
    }, []);
    // const companiesData = companies.companyInfo;
    // const companiesCountry = companies.company_country;
    return (
        isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
        (
        <Fragment>
            {/* {console.log(process.env.REACT_APP_BASEURL+'/uploads/'+companies.companyInfo.logo)} */}
            <Breadcrumb parent="Users" title="Company Profile" />
            <div className="container-fluid">
                <div className="company-profile">
                    <div className="row">
                        <div className="col-md-7">
                            <img className="img-fluid" src={process.env.REACT_APP_BASEURL+'/uploads/'+companies.companyInfo.logo} alt="" style={{ width: '100px', padding: '5px 0'}}/>
                        </div>
                        <div className="col-md-6">
                            <table className="table table-striped">
                                <thead>
                                    
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Company: </th>
                                        <td>{companies.companyInfo.company_name}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Address: </th>
                                        <td>{companies.companyInfo.address}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Street: </th>
                                        <td>{companies.companyInfo.street}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">City: </th>
                                        <td>{companies.companyInfo.city}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">State: </th>
                                        <td>{companies.companyInfo.state}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Post Code: </th>
                                        <td>{companies.companyInfo.post_code}</td>
                                    </tr>
                                    {/* <tr>
                                        <th scope="row">National ID: </th>
                                        <td>{companies.companyInfo.address}</td>
                                    </tr> */}
                                </tbody>
                            </table>
                        
                        </div>
                        <div className="col-md-6">
                            <table className="table table-striped">
                                <thead>
                                    
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Mobile: </th>
                                        <td>{companies.companyInfo.mobile}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Office Phone: </th>
                                        <td>{companies.companyInfo.office_phone}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Fax: </th>
                                        <td>{companies.companyInfo.fax}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Email: </th>
                                        <td>{companies.companyInfo.email}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Website: </th>
                                        <td>{companies.companyInfo.website}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Country: </th>
                                        <td>{companies.company_country.country}</td>
                                    </tr>
                                </tbody>
                            </table>
                        
                        </div>
                        <div className="col-md-2 pull-right">
                            <Link to={`${process.env.PUBLIC_URL}/company-edit`} className="btn btn-primary">
                                Edit Profile
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
        )
    );
};

export default CompanyProfile;