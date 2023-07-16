import React, { Fragment, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userPostMethod, userGetMethod, globalGetMethod } from '../../../api/userAction'
import { timezoneList } from '../../../api/generalUrl'
import { usersRsurl } from '../../../api/userUrl'
import { SubmitButton } from '../../common/GlobalButton';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const initialState = {
    name: '',
    surname: '',
    email: '',
    designation: '',
    timezone_id: '',
}
class Create extends Component {
    constructor(props) {
        super(props);
        this.myFrom = React.createRef();
        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.state = {
            project_id: '',
            name: '',
            surname: '',
            email: '',
            designation: '',
            branch: '',
            employee_id: '',
            isFetch: false,
            timezones: [],
            timezone_id: '',
            projectList: [],
            designations: [],
            branches: [],
            employees: []
        };
    }

    submitHandler = (event) => {
        event.preventDefault();
        const postData = {
            project_id: this.state.project_id,
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            designation: this.state.designation,
            branch: this.state.branch,
            timezone_id: this.state.timezone_id,
            employee_id: this.state.employee_id
        }
        
        let response = userPostMethod(usersRsurl, postData)
            .then(response => { 
                if (response.data.status == 1) { toast.success(response.data.message) } else { toast.error(response.data.message) }
            })
            .catch(error => { toast.error(`getMethod Error from ${error}`)});
        
        this.myFrom.current.reset();
        this.setState({
            ...initialState
        });
    }

    changeHandler = (event) =>{
        this.setState({
            [event.target.name]: event.target.name == "employee_id" ? parseInt(event.target.value) : event.target.value
        });   
    }

    dropDownChange = (event, stateName) =>{
        if(event.length > 0){
            this.setState({
                [stateName]: event[0].id
            });
        } 
    }
    
    componentDidMount() {
        userGetMethod(`${usersRsurl}/create`)
        .then(result => { 
            // FOR DESIGNATION
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

            //for branches
            let branchesOption = [];
            if (result.data.branches && result.data.branches.length > 0) {
                result.data.branches.map(branch => 
                {
                    let branchesObj = {};
                    branchesObj.id = branch.id;
                    branchesObj.name = branch.branch_name;
                    branchesOption.push(branchesObj);
                })
            }
            //getting employees
            let employeeOPtions = [];
            if(result.data.employees && result.data.employees.length > 0) {
                employeeOPtions = result.data.employees;
            }
            // FOR PROJECTS
            let projectOption = [];
            if (result.data.projects && result.data.projects.length > 0) {
                result.data.projects.map(project => 
                {
                    let projectObj = {};
                    projectObj.id = project.id;
                    projectObj.name = project.name;
                    projectOption.push(projectObj);
                })
            }
            this.setState({
                designations:designationOption,
                projectList: projectOption,
                branches: branchesOption,
                employees : employeeOPtions,
            })
        })
        .catch(error => { toast.error(`getMethod Error from ${error}`)});
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
        console.log(this.state);
        return (
            <Fragment>
            <Breadcrumb title="User Add" parent="User" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Add User</h5>
                            </div>
                            <form className="theme-form" ref={ this.myFrom } onSubmit={ this.submitHandler }>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label" htmlFor="project_id">Project</label>
                                                 <div className="col-sm-8">
                                                    <Typeahead
                                                        id="project_id"
                                                        labelKey={option => `${option.name}`}
                                                        options={this.state.projectList}
                                                        placeholder="Select Project..."
                                                        onChange={(e) => this.dropDownChange(e, 'project_id')}
                                                    />
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
                                                        options={this.state.timezones}
                                                        placeholder="Select Time Zone..."
                                                        onChange={(e) => this.dropDownChange(e, 'timezone_id')}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label" htmlFor="email">Email</label>
                                                <div className="col-sm-8">
                                                    <input className="form-control" type="text" id="email" name="email" placeholder="Enter Email"
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
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-3 control-form-label text-right" htmlFor='employee_id'>Employee</label>
                                                <div className="col-sm-8">
                                                    <select onChange = {(e) => this.changeHandler(e)} name="employee_id" id="employee_id" className="form-control">
                                                        <option>Select employee..</option>
                                                        {
                                                            this.state.employees.map((employee) =>(<option value={employee.id}>{employee?.name}</option>))
                                                        }
                                                    </select>
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


export default Create;