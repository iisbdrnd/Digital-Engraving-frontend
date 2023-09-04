import React, { Fragment, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import ConfirmPass from './ConfirmPass';
import { Tab, Tabs } from 'react-bootstrap';

class UserEdit extends Component {
    constructor(props){
        super(props);
        this.changeHandeler=this.changeHandeler.bind(this);
        this.submitHandeler=this.submitHandeler.bind(this);
        this.errorState = ''
        
        this.state={
            adminUserImage:[],
            name:'',
            email: '',
            designation_name: '',
            surname: '',
            address: '',
            fax: '',
            gender: '',
            genderData: [],
            mobile: '',
            office_phone: '',
            gen_project_id: '',
            age: '',
            about: '',
            isFetch: false,
            isLoading:true,
            confirm_password: '',
            new_password: '',
            old_password: '',
            passwordMatchError: ''
            
        };
    }
    componentDidMount(){
        let userToken = sessionStorage.getItem('userToken');
        axios.get(`${process.env.REACT_APP_BASEURL}/api/user/profileEdit`,{ headers: {"Authorization" : `Bearer ${userToken}`} })
    
        .then(response=>{

            this.setState({
                name: response.data.user_name,
                adminUserImage: response.data.image,
                email: response.data.users_email,
                designation_name: response.data.designation_name,
                surname: response.data.surname,
                address: response.data.address,
                fax: response.data.fax,
                mobile: response.data.mobile,
                office_phone: response.data.office_phone,
                gender: response.data.gender,
                gen_project_id: response.data.gen_project_id,
                age: response.data.age,
                about: response.data.about,
                isLoading:false
            })
        });
    }
        
    changeHandeler= e => { 
            this.setState({
                [e.target.name]:e.target.value
            })
            
        }
 
    submitHandeler= e => {
         e.preventDefault();
        const userData={
            name: this.state.name,
            email: this.state.email,
            designation: this.state.designation,
            surname: this.state.surname,
            address: this.state.address,
            fax: this.state.fax,
            mobile: this.state.mobile,
            gender: this.state.gender,
            office_phone: this.state.office_phone,
            gen_project_id: this.state.gen_project_id,
            age: this.state.age,
            about: this.state.about,
            isLoading:false
        }

        let userToken = sessionStorage.getItem('userToken');
        axios.post(`${process.env.REACT_APP_BASEURL}/api/user/profileUpdate`,userData,{ headers: {"Authorization" : `Bearer ${userToken}`} })
        .then(response=>{       
            if (response.data.status == 1) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
            console.log(response.data);

        }) 
    }

    onHandleChangeNumeric = e => {
        let value = e.target.value;
        if (!Number(value)) {
        return;
        }
        this.setState({ [e.target.name]: value });
       }; 
    render(){
        
        let admindata = this.state
        let genderData= this.state.genderData.map((data, key) => (<option key={key} value={data.id}>{data.name}</option>))
        return (
            <Fragment>
                <Breadcrumb parent="User" title="Edit Profile" />
                <div className="container-fluid">
                    <div className="edit-profile">
                    {
                    this.state.isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>)
                    :
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
                                                <div className="containerImage col-auto">
                                                    <Link to="/userChangeImage">
                                                        {
                                                            this.state.adminUserImage == '' || this.state.adminUserImage == null
                                                            ?
                                                            <img className="image imageHover"  height="250px" width="250px" src={`${process.env.REACT_APP_BASEURL}/public/uploads/demo.jpg`} />
                                                            :
                                                            <img className="image imageHover"  height="250px" width="250px" src={`${process.env.REACT_APP_BASEURL}/public/uploads/user/${this.state.adminUserImage}`}/> 
                                                        }
                                                        
                                                    <div className="middle">
                                                        <div className="text">Change Photo</div>
                                                    </div>
                                                    </Link>
                                                </div>
                                            </div> 
                                            <div className="form-group">
                                                <label className="form-label">Name</label>
                                                <input type='text' className="form-control" name='name' value={admindata.name} onChange={this.changeHandeler}/>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Surname</label>
                                                <input type='text' className="form-control" name='surname' value={admindata.surname} onChange={this.changeHandeler}/>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Email-Address</label>
                                                <input type='text' readOnly className="form-control" name='email' value={admindata.email}/>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Designation</label>
                                                <input type='text' readOnly className="form-control" name='designation' value={admindata.designation_name}/>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <form className="card" onSubmit={this.submitHandeler}>
                                {/* <div className="card-header">
                                            <h4 className="card-title mb-0">Edit Profile</h4>
                                            <div className="card-options"><a className="card-options-collapse" href="#javascript" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a><a className="card-options-remove" href="#javascript" data-toggle="card-remove"><i className="fe fe-x"></i></a></div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label className="form-label">Mobile</label>
                                                        <input className="form-control" type="text" name='mobile' placeholder="Mobile" value={admindata.mobile} onChange={this.onHandleChangeNumeric}/>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Office Phone</label>
                                                        <input className="form-control" type="text" name='office_phone' placeholder="Office Phone" value={admindata.office_phone} onChange={this.onHandleChangeNumeric}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label className="form-label">Fax</label>
                                                        <input className="form-control" type="text" name='fax' placeholder="Fax" value={admindata.fax} onChange={this.changeHandeler}/>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Age</label>
                                                        <input className="form-control" type="text" name='age' placeholder="Age" value={admindata.age} onChange={this.onHandleChangeNumeric}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label className="form-label">Address</label>
                                                        <input className="form-control" type="text" name='address' placeholder="Home Address" value={admindata.address} onChange={this.changeHandeler}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Gender</label>
                                                        <select className="form-control btn-square" name='gender'
                                                        value={admindata.gender} onChange={this.changeHandeler}
                                                        >
                                                        <option value="0">Select</option>
                                                        <option value="1">Male</option>
                                                        <option value="2">Female</option>
                                                            {this.state.isFetch ? genderData : 'No Data Yet'}       
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group mb-0">
                                                        <label className="form-label">About Me</label>
                                                        <textarea className="form-control" rows="5" name='about' placeholder="Enter About your description" value={admindata.about} onChange={this.changeHandeler}></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                
                                    <ConfirmPass onHandleChangeNumeric={this.onHandleChangeNumeric} admindata={admindata} changeHandeler={this.changeHandeler} state={this.state} genderData = {this.state.genderData}></ConfirmPass>
                                    



                                    <div className="card-footer text-right">
                                        <button className="btn btn-primary" type="submit">Update Profile</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                         }
                    </div>
                </div>
            </Fragment>
        );
    };
};

export default UserEdit;