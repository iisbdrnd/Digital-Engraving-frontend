import React, { Fragment, Component } from 'react';
import logo from '../assets/images/endless-logo.png';
import axios from 'axios';
import cookie from 'js-cookie';
import { Link } from 'react-router-dom'
import { userRegister } from '../api/generalUrl'

class Signup extends Component {
    constructor(props){
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: ''
        };
    }

    handleFormSubmit = (e) =>{
        e.preventDefault();
        const credentials = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
        };
        axios.post(`${process.env.REACT_APP_BASEURL}/${userRegister}`, credentials)
        .then(response => {
            cookie.set('token', response.data.access_token);
            cookie.set('user', response.data.user);
            console.log(response.data);
            this.props.history.push(`${process.env.PUBLIC_URL}/dashboard/default`);
        })
        .catch(err => {
            this.setState({
                errors: err.response.data
            })
        });
    }
    
    handleInput = (e) =>{
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render(){
        const err = this.state.errors;
        return (
            <Fragment>
                <div className="page-wrapper">
                    <div className="container-fluid">
                        {/* <!-- sign up page start--> */}
                        <div className="authentication-main">
                            <div className="row">
                                <div className="col-sm-12 p-0">
                                    <div className="auth-innerright">
                                        <div className="authentication-box">
                                            <div className="text-center"><img src={logo} alt="" /></div>
                                            <div className="card mt-4 p-4">
                                                <h4 className="text-center">NEW USER</h4>
                                                <h6 className="text-center">Enter your Username and Password For Signup</h6>
                                                <form className="theme-form" onSubmit={this.handleFormSubmit}>
                                                    {err.errors ? err.errors : ''}
                                                    <div className="form-group">
                                                        <label className="col-form-label">Name</label>
                                                        <input className="form-control" type="text" name="name" placeholder="Enter Your Name"
                                                        value={this.state.name}
                                                        onChange={this.handleInput} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-form-label">User Email</label>
                                                        <input className="form-control" type="email" name="email" placeholder="john@gmail.com"
                                                        value={this.state.email}
                                                        onChange={this.handleInput} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-form-label">Password</label>
                                                        <input className="form-control" type="password" name="password" placeholder=""
                                                        value={this.state.password}
                                                        onChange={this.handleInput} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-form-label">Confirm Password</label>
                                                        <input className="form-control" type="password" name="password_confirmation" placeholder=""
                                                        value={this.state.password_confirmation}
                                                        onChange={this.handleInput} />
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="col-sm-4">
                                                            <button className="btn btn-primary" type="submit">Sign Up</button>
                                                        </div>
                                                        <div className="col-sm-8">
                                                            <div className="text-left mt-2 m-l-20">Are you already user?  <Link className="btn-link text-capitalize" to={`${process.env.PUBLIC_URL}/login`}>Login</Link></div>
                                                        </div>
                                                    </div>
                                                    {/* <div className="form-divider"></div> */}
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- sign up page ends--> */}
                    </div>
                </div>
            </Fragment>
        );
    }
};

export default Signup;