import React, { Component } from 'react';
import logo from '../assets/images/endless-logo.png';
import man from '../assets/images/dashboard/user.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import cookie from 'js-cookie';
import { connect } from 'react-redux';
import { UncontrolledAlert } from 'reactstrap';
import { adminLogin } from '../api/adminUrl';
import {setLocal, getLocal} from '../helper/GlobalHelper';


class AdminSignin extends Component {
    constructor(props){
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
    }
    // SUBMIT HANDLE START
    handleFormSubmit = (e) =>{
        e.preventDefault();
        this.setState({errors: {}});

        const credentials = {
            email: this.state.email,
            password: this.state.password
        };
        axios.post(`${process.env.REACT_APP_BASEURL}/${adminLogin}`, credentials)
        .then(response => {
            cookie.set('adminToken', response.data.access_token);
            sessionStorage.setItem('adminToken', response.data.access_token);
            setLocal('login_info', JSON.stringify(response.data.user));
            this.props.setAdminLogin(response.data.user);
            this.props.history.push(`${process.env.PUBLIC_URL}/welcome`);
            
        })
        .catch(error => {
            this.setState({
                errors: error.response.data
            })
        });
    }
    // SUBMIT HANDLE END
    
    // INPUT HANDLE START
    handleInput = (e) =>{
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    // INPUT HANDLE END
    
    render(){
        const err = this.state.errors;
        return (
            <div>
                <div className="page-wrapper">
                    <div className="container-fluid p-0">
                        {/* <!-- login page start--> */}
                        <div className="authentication-main">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="auth-innerright">
                                        <div className="authentication-box">
                                            <div className="text-center">
                                                <img src={logo} alt="" /></div>
                                            <div className="card mt-4">
                                                <div className="card-body">
                                                    <div className="text-center">
                                                        <h4>ADMIN LOGIN</h4>
                                                    </div>
                                                    {err.errors ? 
                                                        <UncontrolledAlert color="danger" fade={true}>
                                                            Email or Password not match
                                                        </UncontrolledAlert>
                                                    : ''}
                                                    <form className="theme-form" onSubmit={this.handleFormSubmit}>
                                                        <div className="form-group">
                                                            <label className="col-form-label pt-0">Email</label>
                                                            <input className="form-control" type="email" name="email"
                                                                value={this.state.email}
                                                                onChange={this.handleInput}
                                                                placeholder="Email address"
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="col-form-label">Password</label>
                                                            <input className="form-control" type="password" name="password"
                                                                value={this.state.password}
                                                                onChange={this.handleInput} 
                                                                placeholder="Password"
                                                            />
                                                        </div>
                                                        <div className="form-group form-row mt-3 mb-0">
                                                            <button className="btn btn-primary btn-block" type="submit">Login</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <ToastContainer />
                        
                        {/* <!-- login page end--> */}
                    </div>
                </div>
            </div>
        );
    }
};

const mapDispatchToProps = (dispatch) =>{
    return {
        setAdminLogin: (user) => dispatch({
            type: 'SET_ADMIN_LOGIN',
            payload: user
        })
    }
}
export default connect(null, mapDispatchToProps)(AdminSignin);