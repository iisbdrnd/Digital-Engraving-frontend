import React, { Fragment, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userPutMethod, userGetMethod } from '../../../api/userAction'
import { usersRsurl } from '../../../api/userUrl'
import { SubmitButton } from '../../common/GlobalButton';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.state = {
            project_id: '',
            name: '',
            surname: '',
            email: '',
            timezone_id: [],
            projectList: [],
            userId: this.props.match.params.userId,
            timezoneList: [],
            designations: [],
            designation: [],
            branches: [],
            branch: [],
        }; 
    }

    submitHandler = (event) => {
        event.preventDefault();
        const postData = {
            name: this.state.name,
            surname: this.state.surname,
            designation: this.state.designation[0].id,
            branch: this.state.branch[0].id,
            timezone_id: this.state.timezone_id[0].id,
        }
        let response = userPutMethod(`${usersRsurl}/${this.state.userId}`, postData)
            .then(response => { 
                if (response.data.status == 1) { toast.success(response.data.message) } else { toast.error(response.data.message) }
            })
            .catch(error => { toast.error(`getMethod Error from ${error}`)});
    }

    changeHandler = (event) =>{
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
    
    componentDidMount() {
        userGetMethod(`${usersRsurl}/${this.state.userId}/edit`)
            .then(response => { 
                console.log('response', response.data);
                // FOR DESIGNATION
                let designationOption = [];
                if (response.data.designations && response.data.designations.length > 0) {
                    response.data.designations.map(designation => 
                    {
                        let designationObj = {};
                        designationObj.id = designation.id;
                        designationObj.name = designation.name;
                        designationOption.push(designationObj);
                        if (response.data.user.designation_id === designation.id) {
                            this.state.designation.push(designationObj);
                        }
                    })
                }

                //for branches
                let branchesOption = [];
                if (response.data.branches && response.data.branches.length > 0) {
                    response.data.branches.map(branch => 
                    {
                        let branchesObj = {};
                        branchesObj.id = branch.id;
                        branchesObj.name = branch.branch_name;
                        branchesOption.push(branchesObj);
                        if (response.data.user.branch_id === branch.id) {
                            this.state.branch.push(branchesObj);
                        }
                    })
                }


                // FOR TIMEZONES
                let timezoneOption = [];
                if (response.data.timezones && response.data.timezones.length > 0) {
                    response.data.timezones.map(timezone => 
                    {
                        let timezoneObj = {};
                        timezoneObj.id = timezone.id;
                        timezoneObj.name = timezone.name;
                        timezoneOption.push(timezoneObj);
                        if (response.data.user.timezone_id === timezone.id) {
                            this.state.timezone_id.push(timezoneObj);
                        }
                    })
                }


                this.setState({
                    project_id: response.data.user.project_id,
                    name: response.data.user.name,
                    surname: response.data.user.surname,
                    email: response.data.user.email,
                    projectList: response.data.projects,
                    designations: designationOption,
                    branches: branchesOption,
                    timezoneList: timezoneOption
                })
            })
            .catch(error => { toast.error(`getMethod Error from ${error}`)});
    }

    render() {
        let projectOption = [];
        if (this.state.projectList && this.state.projectList.length > 0) {
            projectOption = this.state.projectList.map((project) => (<option key={project.id} value={project.id}>{project.name}</option>))
        }
        let timezoneOption = [];
        if (this.state.timezoneList && this.state.timezoneList.length > 0) {
            timezoneOption = this.state.timezoneList.map((timezone) => (<option key={timezone.id} value={timezone.id}>{timezone.name}</option>))
        }
        
        return (
            <Fragment>
            <Breadcrumb title="User Edit" parent="User" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Update User</h5>
                            </div>
                            <form className="theme-form" ref={ this.myFrom } onSubmit={ this.submitHandler }>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label" htmlFor="project_id">Project</label>
                                                <div className="col-sm-8">
                                                    <select className="form-control" id="project_id" name="project_id" readOnly
                                                    value={this.state.project_id}
                                                    onChange={this.changeHandler} >
                                                        <option value="">Select Project</option>
                                                        {projectOption}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label" htmlFor="name">Name</label>
                                                <div className="col-sm-8">
                                                    <input className="form-control" type="text" id="name" name="name" placeholder="Enter Name"
                                                        onChange={this.changeHandler}
                                                        value={this.state.name}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label" htmlFor="surname">Surename</label>
                                                <div className="col-sm-8">
                                                    <input className="form-control" type="text" id="surname" name="surname" placeholder="Enter Surename"
                                                        onChange={this.changeHandler}
                                                        value={this.state.surname}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label" htmlFor="timezone_id">Timezone</label>
                                                <div className="col-sm-8">
                                                    <Typeahead
                                                        id="timezone_id"
                                                        labelKey={option => `${option.name}`}
                                                        options={this.state.timezoneList}
                                                        placeholder="Select Timezone..."
                                                        onChange={(e) => this.dropDownChange(e, 'timezone_id')}
                                                        selected={this.state.timezone_id}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label" htmlFor="email">Email</label>
                                                <div className="col-sm-8">
                                                    <input className="form-control" type="text" id="email" name="email" placeholder="Enter Email" readOnly
                                                        onChange={this.changeHandler}
                                                        value={this.state.email}
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label" htmlFor="designation">Designation</label>
                                                <div className="col-sm-8">
                                                    <Typeahead
                                                        id="designation"
                                                        labelKey={option => `${option.name}`}
                                                        options={this.state.designations}
                                                        placeholder="Select Designation..."
                                                        onChange={(e) => this.dropDownChange(e, 'designation')}
                                                        selected={this.state.designation}
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label" htmlFor="branch">Branch</label>
                                                <div className="col-sm-8">
                                                    <Typeahead
                                                        id="branch"
                                                        labelKey={option => `${option.name}`}
                                                        options={this.state.branches}
                                                        placeholder="Select Branch..."
                                                        onChange={(e) => this.dropDownChange(e, 'branch')}
                                                        selected={this.state.branch}
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <SubmitButton link="users/index" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </Fragment>
        );
    }
};

export default Edit;
