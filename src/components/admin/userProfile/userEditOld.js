import React, { Fragment, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import seven from '../../assets/images/user/7.jpg';
import axios from 'axios';
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';
import ImageUploader from 'react-images-upload';




class userEdit extends Component {
    constructor(props){
        super(props);
        this.changeHandeler=this.changeHandeler.bind(this);
        this.submitHandeler=this.submitHandeler.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);

        this.state={
            // adminUserImage:[],
            images:[],
            adminUserImage:[],
            url:'',
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
            console.log(response.data);
            this.setState({
                name: response.data.name,
                url: `${process.env.REACT_APP_BASEURL}/uploads/`+response.data.image,
                adminUserImage: response.data.image,
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
 
    handleImageChange(pictureFiles, pictureDataURLs) {
        this.setState({
            images: this.state.images.concat(pictureFiles)
        });
    }
    submitHandeler= e => {
        e.preventDefault();
        const formData = new FormData();
        console.log(formData);
        formData.append('username', 'Chris');
        formData.append( 'name'         , this.state.name)
        formData.append( 'email'        , this.state.email)
        formData.append( 'designation'  , this.state.designation)
        formData.append( 'website'      , this.state.website)
        formData.append( 'company'      , this.state.company)
        formData.append( 'address'      , this.state.address)
        formData.append( 'city'         , this.state.city)
        formData.append( 'country'      , this.state.country)
        formData.append( 'bio'          , this.state.bio)

        const uploaders = this.state.images.map(image => {
            console.log(image);
            return formData.append("image", image, image.name);
        });

        let adminToken = sessionStorage.getItem('adminToken');
        axios.post(`${process.env.REACT_APP_BASEURL}/api/admin/profileUpdate`,formData,{ headers: {"Authorization" : `Bearer ${adminToken}`} })
        .then(response=>{       
            if (response.data.status == 1) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
            console.log(response.data);

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
                                            <div className="form-group row">
                                                <div className="col-sm-9">
                                                    <img src={this.state.url} className="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" alt=""/>
                                                    <ImageUploader
                                                        withIcon={false}
                                                        withPreview={true}
                                                        label=""
                                                        name="files"
                                                        singleImage={false}
                                                        buttonText="Upload Image"
                                                        onChange={this.handleImageChange}
                                                        imgExtension={[".jpg", ".gif", ".png", ".gif", ".svg"]}
                                                        maxFileSize={1048576}
                                                        accept='uploads/*'
                                                        //defaultImages={this.state.adminUserImage}
                                                        fileSizeError=" file size is too big"
                                                 
                                                    />
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