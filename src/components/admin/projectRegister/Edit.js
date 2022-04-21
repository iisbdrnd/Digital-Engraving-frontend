import React, { Fragment, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { adminGetMethod, adminPutMethod, globalGetMethod } from '../../../api/action'
import { projectRsURL } from '../../../api/adminUrl'
import { SubmitButton } from '../../common/GlobalButton';
import { countryList, currencyList } from '../../../api/generalUrl';
import ImageUploader from 'react-images-upload';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const formCss = {background: "#ffffff73", padding:"10px"}

class Edit extends Component {
    constructor(props) {
        super(props);
        this.myFrom = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        // image onChange Bind
        this.handleImageChange = this.handleImageChange.bind(this);

        this.state = {
            project:[],
            project_id:'',
            name: '',
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
            images: [],

            //THIS ARE COMES FROM REDUX STORE (START)
            countries       : [],
            country_id      : [],
            currencies      : [],
            default_currency: [],
            // END

            isLoading: true
        };
    }

    submitHandler(e) {
        e.preventDefault();
        const postData = {
            project_id: this.state.project_id,
            name: this.state.name,
            default_currency: this.state.default_currency[0].id,
            company_name: this.state.company_name,
            logo: this.state.logo,
            address: this.state.address,
            street: this.state.street,
            city: this.state.city,
            state: this.state.state,
            post_code: this.state.post_code,
            country_id: this.state.country_id[0].id,
            mobile: this.state.mobile,
            office_phone: this.state.office_phone,
            fax: this.state.fax,
            email: this.state.email,
            website: this.state.website,
        };

        let response = adminPutMethod(`${projectRsURL}/${this.state.projectId}`, postData)
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

    dropDownChange = (event, stateName) =>{
        if(event.length > 0){
            this.setState({
                [stateName]: event
            });
        } 
    }

    handleImageChange(pictureFiles, pictureDataURLs) {
        this.setState({
            images: this.state.images.concat(pictureFiles)
        });
    }

    componentDidMount() {
        adminGetMethod(`${projectRsURL}/${this.state.projectId}/edit`)
            .then(response => {
                console.log(response.data.countries);

                let currencyOption = [];
                if (response.data.currency && response.data.currency.length > 0) {
                    response.data.currency.map(curr => 
                    {
                        let currencyObj = {};
                        currencyObj.id = curr.id;
                        currencyObj.currency_name = curr.currency_name;
                        currencyOption.push(currencyObj);
                        if (response.data.project.default_currency === curr.id) {
                            this.state.default_currency.push(currencyObj);
                        }
                    })
                }

                let countryOption = [];
                if (response.data.countries && response.data.countries.length > 0) {
                    response.data.countries.map(country => 
                    {
                        let countryObj = {};
                        countryObj.id = country.id;
                        countryObj.name = country.name;
                        countryOption.push(countryObj);
                        if (response.data.projectInfo.country === country.id) {
                            this.state.country_id.push(countryObj);
                        }
                    })
                }

                this.setState({
                    project_id: response.data.project.project_id,
                    name: response.data.project.name,

                    company_name: response.data.projectInfo.company_name,
                    logo: response.data.projectInfo.logo,
                    address: response.data.projectInfo.address,
                    street: response.data.projectInfo.street,
                    city: response.data.projectInfo.city,
                    state: response.data.projectInfo.state,
                    post_code: response.data.projectInfo.post_code,
                    mobile: response.data.projectInfo.mobile,
                    office_phone: response.data.projectInfo.office_phone,
                    fax: response.data.projectInfo.fax,
                    email: response.data.projectInfo.email,
                    website: response.data.projectInfo.website,
                    images: response.data.imageUrl,
                    currencies: currencyOption,
                    countries: countryOption,

                    isLoading:false
                })
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <Fragment>
            <Breadcrumb title="Project Edit" parent="Project" />
            
                <div className="container-fluid">  

                {this.state.isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):(
                    <div className="card" style = {formCss}>
                        <form className="form theme-form" onSubmit = {this.submitHandler}>
                            <div className="row">

                                <div className="col-sm-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label required" htmlFor="project_id">Project ID</label>
                                                        <div className="col-sm-9">
                                                            <input 
                                                                className="form-control"
                                                                readOnly
                                                                id="project_id" 
                                                                name="project_id" 
                                                                type="text" 
                                                                placeholder="Enter Project ID"
                                                                onChange={this.handleChange}
                                                                value={this.state.project_id}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label required" htmlFor="name">Project Name</label>
                                                        <div className="col-sm-9">
                                                            <input 
                                                                className="form-control" 
                                                                id="name" 
                                                                name="name" 
                                                                type="text" 
                                                                placeholder="Project Name" 
                                                                value={this.state.name}
                                                                onChange={this.handleChange}
                                                            />
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
                                                        <label className="col-sm-3 col-form-label required" htmlFor="company_name">Company Name</label>
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
                                                        <label className="col-sm-3 col-form-label required" htmlFor="country_id">Country</label>
                                                        <div className="col-sm-9">
                                                            <Typeahead
                                                                id="country_id"
                                                                labelKey={option => `${option.name}`}
                                                                options={this.state.countries}
                                                                placeholder="Select Country..."
                                                                onChange={(e) => this.dropDownChange(e, 'country_id')}
                                                                selected={this.state.country_id}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label required" htmlFor="default_currency">Default Currency</label>
                                                        <div className="col-sm-9">
                                                            <Typeahead
                                                                id="default_currency"
                                                                labelKey={option => `${option.currency_name}`}
                                                                options={this.state.currencies}
                                                                placeholder="Select Currency..."
                                                                onChange={(e) => this.dropDownChange(e, 'default_currency')}
                                                                selected={this.state.default_currency}
                                                            />
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
                                                        <label className="col-sm-3 col-form-label required" htmlFor="mobile">Mobile</label>
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
                                                        <label className="col-sm-3 col-form-label required" htmlFor="email">Email</label>
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

                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label required">Logo</label>
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
                                                                accept='uploads/*'
                                                                defaultImages={[this.state.images]}
                                                                fileSizeError=" file size is too big"
                                                            />
                                                            {/* <img src={this.state.images}/> */}
                                                            {/* <img src={'localhost:8000/public/uploads/1583904982sd.jpg'}/> */}
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>

                            <SubmitButton link="projectRegister/list" />

                        </form> 


                    </div>
                )}
                </div>
                


            </Fragment>
        );
    }
};

export default Edit;