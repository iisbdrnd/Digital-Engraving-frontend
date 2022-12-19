import React, { Fragment, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { adminPostMethod, adminGetMethod, globalGetMethod } from '../../../api/action'
import { projectRsURL } from '../../../api/adminUrl'
import { countryList, currencyList, timezoneList } from '../../../api/generalUrl'
import { SubmitButton } from '../../common/GlobalButton';
import ImageUploader from 'react-images-upload';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const formCss = {background: "#ffffff73", padding:"10px"}

class Add extends Component {
    constructor(props) {
        super(props);
        this.myFrom = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        
        // image onChange Bind
        this.handleImageChange = this.handleImageChange.bind(this);

        this.state = {
            project_id      : '',
            name            : '',
            company_name    : '',
            address         : '',
            street          : '',
            city            : '',
            state           : '',
            post_code       : '',

            //THIS ARE COMES FROM REDUX STORE (START)
            countries       : [],
            country_id      : '',
            currencies      : [],
            default_currency: '',
            timezones       : [],
            timezone_id     : '',
            // END

            user_name       : '',
            user_email      : '',
            mobile          : '',
            office_phone    : '',
            fax             : '',
            website         : '',
            email           : '',
            users           : [],
            usersVal        : '',
            designations    : [],
            designation     : '',
            pictures        : [],
            images: []
        };
    }

    submitHandler(e) {
        e.preventDefault();
        const formData = new FormData();
        
        formData.append( 'project_id'      , this.state.project_id)
        formData.append( 'name'            , this.state.name)
        formData.append( 'company_name'    , this.state.company_name)
        formData.append( 'address'         , this.state.address)
        formData.append( 'street'          , this.state.street)
        formData.append( 'city'            , this.state.city)
        formData.append( 'state'           , this.state.state)
        formData.append( 'post_code'       , this.state.post_code)
        formData.append( 'country_id'      , this.state.country_id)
        formData.append( 'default_currency', this.state.default_currency)
        formData.append( 'user_name'       , this.state.user_name)
        formData.append( 'designation'     , this.state.designation)
        formData.append( 'user_email'      , this.state.user_email)
        formData.append( 'timezone_id'     , this.state.timezone_id)
        formData.append( 'designation'     , this.state.designation)
        formData.append( 'mobile'          , this.state.mobile)
        formData.append( 'office_phone'    , this.state.office_phone)
        formData.append( 'fax'             , this.state.fax)
        formData.append( 'website'         , this.state.website)
        formData.append( 'email'           , this.state.email)

        const uploaders = this.state.images.map(image => {
            return formData.append("image", image, image.name);
        });
        
        let response = adminPostMethod(projectRsURL, formData)
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
                [stateName]: event[0].id
            });
        } 
    }

    handleImageChange(pictureFiles, pictureDataURLs) {
        this.setState({
            images: this.state.images.concat(pictureFiles)
        });
    }
    
    componentDidMount() {
            //DESIGNATION LIST 
            adminGetMethod(`${projectRsURL}/create`)
            .then(result => {

                let designationOption = [];
                if (result.data.designations && result.data.designations.length > 0) {
                    result.data.designations.map(designation => 
                    {
                        let designationObj = {};
                        designationObj.id = designation.id;
                        designationObj.name = designation.name;
                        designationOption.push(designationObj);
                    })
                }
                this.setState({
                    designations:designationOption,
                    project_id: result.data.autoProjectId
                })
            })
            .catch(error => console.log(error))
            
            //COUNTRY LIST 
            globalGetMethod(countryList)
            .then(result => {
                if (result.status == 200) {

                    let countryOption = [];
                    if (result.data && result.data.length > 0) {
                        result.data.map(country => 
                        {
                            let countryObj = {};
                            countryObj.id = country.id;
                            countryObj.name = country.name;
                            countryOption.push(countryObj);
                        })
                    }
                    this.setState({
                        countries:countryOption
                    })
                } 
            })
            .catch(error => console.log(error))
            
            //CURRENCY LIST 
            globalGetMethod(currencyList)
            .then(result => {
                if (result.status == 200) {
                    
                    let currencyOption = [];
                    if (result.data && result.data.length > 0) {
                        result.data.map(currency => 
                        {
                            let currencyObj = {};
                            currencyObj.id = currency.id;
                            currencyObj.name = currency.currency_name;
                            currencyOption.push(currencyObj);
                        })
                    }
                    this.setState({
                        currencies:currencyOption
                    })

                } 
            })
            .catch(error => console.log(error))
            
            //TIMEZONE LIST 
            globalGetMethod(timezoneList)
            .then(result => {
                if (result.status == 200) {

                    let timezonesOption = [];
                    if (result.data && result.data.length > 0) {
                        result.data.map(timezone => 
                        {
                            let timezonesObj = {};
                            timezonesObj.id = timezone.id;
                            timezonesObj.name = timezone.name;
                            timezonesOption.push(timezonesObj);
                        })
                    }
                    this.setState({
                        timezones:timezonesOption
                    })
                } 
            })
            .catch(error => console.log(error))
    }

    render() {

        return (
            <Fragment>
            <Breadcrumb title="Project Add" parent="Project" />
            
                <div className="container-fluid">
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
                                                            <input  className="form-control" readOnly id="project_id"  name="project_id"  type="text"  required placeholder="Enter Project ID"
                                                                onChange={this.handleChange}
                                                                value={this.state.project_id}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label required" htmlFor="name">Project Name</label>
                                                        <div className="col-sm-9">
                                                            <input className="form-control" id="name" name="name" type="text" required placeholder="Project Name" 
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
                                                            <input className="form-control" id="company_name" name="company_name" type="text" required placeholder="Enter Companay Name"
                                                                onChange={this.handleChange}
                                                                value={this.state.company_name}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="address">Address</label>
                                                        <div className="col-sm-9">
                                                            <textarea  className="form-control"  rows="3"  cols="5"  id="address" name="address" placeholder="Default textarea" 
                                                                onChange={this.handleChange}
                                                                value={this.state.address}></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="street">Street</label>
                                                        <div className="col-sm-9">
                                                            <input className="form-control" id="street" name="street" type="text" placeholder="Street" 
                                                                value={this.state.street}
                                                                onChange={this.handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="city">City</label>
                                                        <div className="col-sm-9">
                                                            <input className="form-control" id="city" name="city" type="text" placeholder="City" 
                                                                value={this.state.city}
                                                                onChange={this.handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="state">State</label>
                                                        <div className="col-sm-9">
                                                            <input className="form-control" id="state" name="state" type="text" placeholder="State" 
                                                                value={this.state.state}
                                                                onChange={this.handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="post_code">Post Code</label>
                                                        <div className="col-sm-9">
                                                            <input className="form-control" id="post_code" name="post_code" type="text" placeholder="Post Code" 
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
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label required" htmlFor="default_currency">Default Currency</label>
                                                        <div className="col-sm-9">
                                                            <Typeahead
                                                                id="default_currency"
                                                                labelKey={option => `${option.name}`}
                                                                options={this.state.currencies}
                                                                placeholder="Select Currency..."
                                                                onChange={(e) => this.dropDownChange(e, 'default_currency')}
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
                                        <div className="card-header">
                                            <h5>New User</h5>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label required" htmlFor="user_name">User Name</label>
                                                        <div className="col-sm-9">
                                                            <input className="form-control" id="user_name" name="user_name" type="text" placeholder="Name"
                                                                onChange={this.handleChange}
                                                                value={this.state.user_name}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label required" htmlFor="designation">Designation</label>
                                                        <div className="col-sm-9">
                                                            <Typeahead
                                                                id="designation"
                                                                labelKey={option => `${option.name}`}
                                                                options={this.state.designations}
                                                                placeholder="Select Designation..."
                                                                onChange={(e) => this.dropDownChange(e, 'designation')}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label required" htmlFor="user_email">Email</label>
                                                        <div className="col-sm-9">
                                                            <input className="form-control" id="user_email" name="user_email" type="email" placeholder="Email" required
                                                                value={this.state.user_email}
                                                                onChange={this.handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label required" htmlFor="timezone_id">Time Zone</label>
                                                        <div className="col-sm-9">
                                                            <Typeahead
                                                                id="timezone_id"
                                                                labelKey={option => `${option.name}`}
                                                                options={this.state.timezones}
                                                                placeholder="Select Time Zone..."
                                                                onChange={(e) => this.dropDownChange(e, 'timezone_id')}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>  

                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">

                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label required" htmlFor="mobile">Mobile</label>
                                                        <div className="col-sm-9">
                                                            <input className="form-control" id="mobile" name="mobile" type="text" required placeholder="Mobile" 
                                                                value={this.state.mobile}
                                                                onChange={this.handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="form-group row ">
                                                        <label className="col-sm-3 col-form-label" htmlFor="office_phone">Office Number</label>
                                                        <div className="col-sm-9">
                                                            <input className="form-control" id="office_phone" name="office_phone" type="text" placeholder="Office Number" 
                                                                value={this.state.office_phone}
                                                                onChange={this.handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="fax">Fax</label>
                                                        <div className="col-sm-9">
                                                            <input className="form-control" id="fax" name="fax" type="text" placeholder="Fax" 
                                                                value={this.state.fax}
                                                                onChange={this.handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="website">Website</label>
                                                        <div className="col-sm-9">
                                                            <input className="form-control" id="website" name="website" type="text" placeholder="http://" 
                                                                value={this.state.website}
                                                                onChange={this.handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label required" htmlFor="email">Email</label>
                                                        <div className="col-sm-9">
                                                            <input className="form-control" id="email" name="email" type="text" required placeholder="Email" 
                                                                value={this.state.email}
                                                                onChange={this.handleChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="form-group row">
                                                            <label className="col-sm-3 col-form-label required" htmlFor="email">Logo</label>
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
                                                                    fileSizeError=" file size is too big"
                                                                />
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
                
                </div>
                


            </Fragment>
        );
    }
};

export default Add;
