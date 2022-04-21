import React, { Fragment, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from 'axios';
import ImageUploader from 'react-images-upload';
import { toast } from 'react-toastify';


class ChangeImage extends Component {

    constructor(props) {
        super(props);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.state = {
            images: [],
            ButtonHide:true
        }
    }

    handleImageChange(pictureFiles, pictureDataURLs) {
        this.setState({
            images: this.state.images.concat(pictureFiles),
            ButtonHide:false

        });
    }
    uploadImages = (e) => {
        e.preventDefault();
        const formData = new FormData();
        const uploaders = this.state.images.map(image => {
            console.log(image);
            return formData.append("image", image, image.name);
        });

        let adminToken = sessionStorage.getItem('adminToken');
        axios.post(`${process.env.REACT_APP_BASEURL}/api/admin/profileImageUpload`,formData,{ headers: {"Authorization" : `Bearer ${adminToken}`} })
        .then(response=>{       
            if (response.data.status == 1) {
                this.props.history.push(`${process.env.PUBLIC_URL}/users/adminuserEdit`);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }

        })
        
    }

    render() {
        return (
            <Fragment>
                <Breadcrumb parent="User" title="Upload Image" />
                <div className="container-fluid">
                    <div className="edit-profile">
                        <div className="row">
                            <div className="col-lg-12">
                                <form className="card" onSubmit={this.uploadImages}style={{height:"300px"}}>
                                    <ImageUploader
                                        withIcon={false}
                                        withPreview={true}
                                        label=""
                                        name="files"
                                        singleImage={true}
                                        buttonText="Upload Images"
                                        onChange={this.handleImageChange}
                                        imgExtension={[".jpg", ".gif", ".png", ".gif", ".svg"]}
                                        maxFileSize={1048576}
                                        accept='uploads/*'
                                        fileSizeError=" file size is too big"
                                        required="required"
                                    />
                                    {
                                    this.state.ButtonHide 
                                    ? 
                                    ""
                                    :
                                    <div className="card-footer text-center">
                                        <button className="btn btn-primary center-block" type="submit">Update Profile</button>
                                    </div>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ChangeImage;