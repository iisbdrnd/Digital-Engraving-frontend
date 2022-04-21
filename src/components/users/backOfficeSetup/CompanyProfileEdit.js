import React, { Fragment, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Country, Currency} from '../users/Dropdown'
import { ProfileInfo, ProfileInfoUpdate } from '../../../api/userUrl';
import { userGetMethod, userPostMethod } from '../../../api/userAction';

import { SubmitButton } from '../../common/GlobalButton';
import { connect } from 'react-redux';
// import ImageUploader from 'react-images-upload';

const formCss = {background: "#ffffff73", padding:"10px"}

class Edit extends Component {
    constructor(props) {
        super(props);
        this.myFrom = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        // image onChange Bind
        // this.handleImageChange = this.handleImageChange.bind(this);

        this.state = {
            project:[],
            // project_id:'',
            // name: '',
            company_name: '',
            address: '',
            street: '',
            city: '',
            state: '',
            post_code: '',
            mobile: '',
            office_phone: '',
            fax: '',
            website: '',
            email: '',
            projectId: this.props.match.params.projectId,
            // images: [],

            //THIS ARE COMES FROM REDUX STORE (START)
            countries       : this.props.countryData,
            country_id      : '',
            currencies      : this.props.currencyData,
            default_currency: '',
            // END

            isLoading: true
        };
    }

    submitHandler(e) {
        e.preventDefault();
        const postData = {
            // project_id: this.state.project_id,
            // name: this.state.name,
            default_currency: this.state.default_currency,
            company_name: this.state.company_name,
            logo: this.state.logo,
            address: this.state.address,
            street: this.state.street,
            city: this.state.city,
            state: this.state.state,
            post_code: this.state.post_code,
            country_id: this.state.country_id,
            mobile: this.state.mobile,
            office_phone: this.state.office_phone,
            fax: this.state.fax,
            email: this.state.email,
            website: this.state.website,
        };

        userPostMethod(`${ProfileInfoUpdate}`, postData)
            .then(response => {
                if (response.data.status == 1) {
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            })
        .catch(error => toast.error(error))
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });   
    }

    // handleImageChange(pictureFiles, pictureDataURLs) {
    //     this.setState({
    //         images: this.state.images.concat(pictureFiles)
    //     });
    // }

    componentDidMount() {
        let response = userGetMethod(`${ProfileInfo}`)
            .then(response => {
                this.setState({
                //     project_id: response.data.project.project_id,
                //     name: response.data.project.name,
                    default_currency: response.data.companyInfo.default_currency,
                    company_name: response.data.companyInfo.company_name,
                    logo: response.data.companyInfo.logo,
                    address: response.data.companyInfo.address,
                    street: response.data.companyInfo.street,
                    city: response.data.companyInfo.city,
                    state: response.data.companyInfo.state,
                    post_code: response.data.companyInfo.post_code,
                    country_id: response.data.companyInfo.country,
                    mobile: response.data.companyInfo.mobile,
                    office_phone: response.data.companyInfo.office_phone,
                    fax: response.data.companyInfo.fax,
                    email: response.data.companyInfo.email,
                    website: response.data.companyInfo.website,
                    // images: `${process.env.REACT_APP_BASEURL}/${response.data.imageUrl}`,
                    // images: response.data.imageUrl,

                    isLoading:false
                })

                console.log(response.data);
                
                
            })
            .catch(error => console.log(error))
    }

    render() {

        let countryOption = [];
        if (this.state.countries && this.state.countries.length > 0) {
            countryOption = this.state.countries.map((country) => (<option key={country.id} value={country.id}>{country.name}</option>))
        }
        let currencyOption = [];
        if (this.state.currencies && this.state.currencies.length > 0) {
            currencyOption = this.state.currencies.map((currency) => (<option key={currency.id} value={currency.id}>{currency.currency_name}</option>))
        }

        return (
            <Fragment>
            <Breadcrumb title="Project Edit" parent="Project" />
            
                <div className="container-fluid">

                {this.state.isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):(
                    <div className="card" style = {formCss}>
                        <form className="form theme-form" onSubmit = {this.submitHandler}>
                            <div className="row">

                                <div className="col-sm-6">
                                    <div className="card">
                                        
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="company_name">Company Name</label>
                                                        <div className="col-sm-9">
                                                            <input 
                                                                className="form-control" 
                                                                id="company_name" 
                                                                name="company_name" 
                                                                type="text" 
                                                                placeholder="Enter Companay Name"
                                                                onChange={this.handleChange}
                                                                value={this.state.company_name}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="address">Address</label>
                                                        <div className="col-sm-9">
                                                            <textarea 
                                                                className="form-control" 
                                                                rows="3" 
                                                                cols="5" 
                                                                id="address"
                                                                name="address"
                                                                placeholder="Default textarea"
                                                                onChange={this.handleChange}
                                                                value={this.state.address}></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="street">Street</label>
                                                        <div className="col-sm-9">
                                                            <input 
                                                                className="form-control" 
                                                                id="street" 
                                                                name="street" 
                                                                type="text" 
                                                                placeholder="Street" 
                                                                value={this.state.street}
                                                                onChange={this.handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="city">City</label>
                                                        <div className="col-sm-9">
                                                            <input 
                                                                className="form-control" 
                                                                id="city" 
                                                                name="city" 
                                                                type="text" 
                                                                placeholder="City" 
                                                                value={this.state.city}
                                                                onChange={this.handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="state">State</label>
                                                        <div className="col-sm-9">
                                                            <input 
                                                                className="form-control" 
                                                                id="state" 
                                                                name="state" 
                                                                type="text" 
                                                                placeholder="State" 
                                                                value={this.state.state}
                                                                onChange={this.handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="post_code">Post Code</label>
                                                        <div className="col-sm-9">
                                                            <input 
                                                                className="form-control" 
                                                                id="post_code" 
                                                                name="post_code" 
                                                                type="text" 
                                                                placeholder="Post Code" 
                                                                value={this.state.post_code}
                                                                onChange={this.handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="country_id">Country</label>
                                                        <div className="col-sm-9">
                                                            <select name="country_id" id="country_id" className="form-control" 
                                                            value={this.state.country_id}
                                                            onChange={this.handleChange}>
                                                                <option>Select One</option>
                                                                { countryOption }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="default_currency">Default Currency</label>
                                                        <div className="col-sm-9">
                                                            <select name="default_currency" id="default_currency" className="form-control" 
                                                            value={this.state.default_currency}
                                                            onChange={this.handleChange}>
                                                                <option value="">Select One</option>
                                                                { currencyOption }
                                                            </select>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                    
                                <div className="col-sm-6">
                                     
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">

                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="mobile">Mobile</label>
                                                        <div className="col-sm-9">
                                                            <input 
                                                                className="form-control" 
                                                                id="mobile" 
                                                                name="mobile" 
                                                                type="text" 
                                                                placeholder="Mobile" 
                                                                value={this.state.mobile}
                                                                onChange={this.handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="office_phone">Office Number</label>
                                                        <div className="col-sm-9">
                                                            <input 
                                                                className="form-control" 
                                                                id="office_phone" 
                                                                name="office_phone" 
                                                                type="text" 
                                                                placeholder="Office Number" 
                                                                value={this.state.office_phone}
                                                                onChange={this.handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="fax">Fax</label>
                                                        <div className="col-sm-9">
                                                            <input 
                                                                className="form-control" 
                                                                id="fax" 
                                                                name="fax" 
                                                                type="text" 
                                                                placeholder="Fax" 
                                                                value={this.state.fax}
                                                                onChange={this.handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="website">Website</label>
                                                        <div className="col-sm-9">
                                                            <input 
                                                                className="form-control" 
                                                                id="website" 
                                                                name="website" 
                                                                type="text" 
                                                                placeholder="http://" 
                                                                value={this.state.website}
                                                                onChange={this.handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="email">Email</label>
                                                        <div className="col-sm-9">
                                                            <input 
                                                                className="form-control" 
                                                                id="email" 
                                                                name="email" 
                                                                type="text" 
                                                                placeholder="Email" 
                                                                value={this.state.email}
                                                                onChange={this.handleChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* <div className="form-group row required">
                                                        <label className="col-sm-3 col-form-label" htmlFor="email">Logo</label>
                                                        <div className="col-sm-9">
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
                                                                // accept={`${process.env.REACT_APP_BASEURL}uploads/`}
                                                                accept='public/uploads/*'
                                                                defaultImages={[this.state.images]}
                                                                fileSizeError=" file size is too big"
                                                            />
                                                        </div>
                                                    </div> */}

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>

                            <SubmitButton link="company-profile" />
                        </form> 
                    </div>
                )}
                </div>
                
            </Fragment>
        );
    }
};

const mapStateToProps = (state) =>{
    return {
        countryData: state.SelectOption.countryList,
        currencyData: state.SelectOption.currencyList
    };
}

export default connect(mapStateToProps)(Edit);