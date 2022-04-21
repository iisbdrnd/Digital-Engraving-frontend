import React, { Fragment, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import seven from '../../assets/images/user/7.jpg';
import axios from 'axios';
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';



class userEdit extends Component {
    constructor(props){
        super(props);
        this.changeHandeler=this.changeHandeler.bind(this);
        this.submitHandeler=this.submitHandeler.bind(this);
        this.state={
            adminUserImage:[],
            name:'',
            email: '',
            designation: '',
            website: '',
            company: '',
            address: '',
            city: '',
            country: '',
            counties: [],
            bio: '',
            isFetch: false,
        };
    }
    componentDidMount(){
        let adminToken = sessionStorage.getItem('adminToken');
        axios.get(`${process.env.REACT_APP_BASEURL}/api/admin/profileEdit`,{ headers: {"Authorization" : `Bearer ${adminToken}`} })
        .then(response=>{
            this.setState({
                name: response.data.name,
                adminUserImage: response.data.adminUserImage,
                email: response.data.email,
                designation: response.data.designation,
                website: response.data.website,
                company: response.data.company,
                address: response.data.address,
                city: response.data.city,
                country: response.data.country,
                bio: response.data.bio,
            })
        });

        //for country
        axios.get(`${process.env.REACT_APP_BASEURL}/api/admin/profileCountry`,{ headers: {"Authorization" : `Bearer ${adminToken}`} })
        .then(response=>{
            this.setState({
                counties: response.data,
                isFetch:true
            })
        });
        }

    changeHandeler= e => {
            this.setState({
                [e.target.name]:e.target.value
            })
        }
    uploadHandeller=e=>{
        var file = this.refs.file.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            this.setState({
                file: [reader.result]
            })
            }.bind(this)
    }
        submitHandeler= e => {
            console.log(this.state);
                e.preventDefault();
                const admin={
                    name: this.state.name,
                    adminUserImage: this.state.adminUserImage,
                    email: this.state.email,
                    designation: this.state.designation,
                    website: this.state.website,
                    company: this.state.company,
                    address: this.state.address,
                    city: this.state.city,
                    country: this.state.country,
                    bio: this.state.bio,
                } 
                let adminToken = sessionStorage.getItem('adminToken');
                axios.put(`${process.env.REACT_APP_BASEURL}/api/admin/profileUpdate`,admin,{ headers: {"Authorization" : `Bearer ${adminToken}`} })
                .then(response=>{         
                    if (response.data.status == 1) {
                        toast.success(response.data.message);
                    } else {
                        toast.error(response.data.message);
                    }
    
                })
            }
        
    render(){
        let admindata = this.state
        let userCountry= this.state.counties.map((data, key) => (<option key={key} value={data.id}>{data.name}</option>))
        return (
            <Fragment>
                <Breadcrumb parent="User" title="Edit Profile" />
                <div className="container-fluid">
                    <div className="edit-profile">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title mb-0">My Profile</h4>
                                        <img className="img-70 rounded-circle" alt="" src={this.state.file} />
                                        <div className="card-options"><a className="card-options-collapse" href="#javascript" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a><a className="card-options-remove" href="#javascript" data-toggle="card-remove"><i className="fe fe-x"></i></a></div>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={this.submitHandeler}>
                                            <div className="row mb-2">
                                                <div className="col-auto"><img className="img-70 rounded-circle" alt="" src={seven} /></div>
                                                <div className="col">
                                                <div className="form-group">
                                                    <input type='file' className="form-control" ref="file" multiple="true" name='adminUserImage' value={admindata.adminUserImage} onChange={this.uploadHandeller}/>
                                                </div>
                                                    <h3 className="mb-1">{admindata.name}</h3>
                                                    <p className="mb-4">{admindata.designation}</p>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Name</label>
                                                <input type='text' className="form-control" name='name' value={admindata.name} onChange={this.changeHandeler}/>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Email-Address</label>
                                                <input type='text' readOnly className="form-control" name='email' value={admindata.email} onChange={this.changeHandeler}/>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Designation</label>
                                                <input type='text' className="form-control" name='designation' value={admindata.designation} onChange={this.changeHandeler}/>
                                            </div>
                                            {/* <div className="form-group">
                                                <label className="form-label">Password</label>
                                                <input className="form-control" type="password" value={admindata.email} />
                                            </div> */}
                                            {/* <div className="form-group">
                                                <label className="form-label">Website</label>
                                                <input className="form-control" placeholder="http://Uplor .com" />
                                            </div> */}
                                            {/* <div className="form-footer">
                                                <button className="btn btn-primary btn-block">Save</button>
                                            </div> */}
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <form className="card" onSubmit={this.submitHandeler}>
                                    <div className="card-header">
                                        <h4 className="card-title mb-0">Edit Profile</h4>
                                        <div className="card-options"><a className="card-options-collapse" href="#javascript" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a><a className="card-options-remove" href="#javascript" data-toggle="card-remove"><i className="fe fe-x"></i></a></div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-5">
                                                <div className="form-group">
                                                    <label className="form-label">Company</label>
                                                    <input className="form-control" type="text" name='company' placeholder="Company" value={admindata.company} onChange={this.changeHandeler}/>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">Website</label>
                                                    <input className="form-control" type="text" name='website' placeholder="Last Name" value={admindata.website} onChange={this.changeHandeler}/>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label className="form-label">Address</label>
                                                    <input className="form-control" type="text" name='address' placeholder="Home Address" value={admindata.address} onChange={this.changeHandeler}/>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">City</label>
                                                    <input className="form-control" type="text" name='city' placeholder="City" value={admindata.city} onChange={this.changeHandeler}/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">Country</label>
                                                    <select className="form-control btn-square" name='country'
                                                    value={admindata.country} onChange={this.changeHandeler}
                                                    >
                                                      <option value="0">Select</option>
                                                        {this.state.isFetch ? userCountry : 'No Data Yet'}       
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group mb-0">
                                                    <label className="form-label">About Me</label>
                                                    <textarea className="form-control" rows="5" name='bio' placeholder="Enter About your description" value={admindata.bio} onChange={this.changeHandeler}></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer text-right">
                                        <button className="btn btn-primary" type="submit">Update Profile</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    };
};

export default userEdit;