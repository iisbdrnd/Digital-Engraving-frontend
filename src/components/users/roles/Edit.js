import React, { Fragment, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userPutMethod, userGetMethod } from '../../../api/userAction'
import { rolesAPI } from '../../../api/userUrl'
import { SubmitButton } from '../../common/GlobalButton';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.state = {
            name: '',
            roleId: this.props.match.params.roleId,
            branches: [],
            branch: [],
        }; 
    }

    submitHandler = (event) => {
        event.preventDefault();
        const postData = {
            name: this.state.name,
            branch: this.state.branch[0].id
        }
        let response = userPutMethod(`${rolesAPI}/${this.state.roleId}`, postData)
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
        userGetMethod(`${rolesAPI}/${this.state.roleId}/edit`)
            .then(response => { 
                console.log('response', response.data);
                
                //for branches
                let branchesOption = [];
                if (response.data.branches && response.data.branches.length > 0) {
                    response.data.branches.map(branch => 
                    {
                        let branchesObj = {};
                        branchesObj.id = branch.id;
                        branchesObj.name = branch.branch_name;
                        branchesOption.push(branchesObj);
                        if (response.data.role.branch_id === branch.id) {
                            this.state.branch.push(branchesObj);
                        }
                    })
                }

                this.setState({
                    name: response.data.role.role_name,
                    branches: branchesOption,
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
                                <h5>Update Designation</h5>
                            </div>
                            <form className="theme-form" ref={ this.myFrom } onSubmit={ this.submitHandler }>
                                <div className="card-body">
                                    <div className="col-sm-6">
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

export default Edit;
