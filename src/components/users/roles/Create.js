import React, { Fragment, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userPostMethod, userGetMethod} from '../../../api/userAction'
import { rolesAPI } from '../../../api/userUrl'
import { SubmitButton } from '../../common/GlobalButton';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const initialState = {
    name: '',
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
            branch: '',
            isFetch: false,
            projectList: [],
            branches: []
        };
    }

    submitHandler = (event) => {
        event.preventDefault();
        const postData = {
            project_id: this.state.project_id,
            name: this.state.name,
            branch: this.state.branch,
        }
        
        let response = userPostMethod(rolesAPI, postData)
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
    
    componentDidMount() {
        userGetMethod(`${rolesAPI}/create`)
        .then(result => { 
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
                projectList: projectOption,
                branches: branchesOption
            })
        })
        .catch(error => { toast.error(`getMethod Error from ${error}`)});
    }

    render() {

        return (
            <Fragment>
            <Breadcrumb title="Designation" parent="Role" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Add Designation</h5>
                            </div>
                            <form className="theme-form" ref={ this.myFrom } onSubmit={ this.submitHandler }>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label" htmlFor="name">Designation</label>
                                                <div className="col-sm-8">
                                                    <input className="form-control" type="text" id="name" name="name" placeholder="Enter Name"
                                                        onChange={this.changeHandler}
                                                        value={this.state.name}
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
                                        </div>
                                    </div>
                                    <SubmitButton link="role/index" />
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