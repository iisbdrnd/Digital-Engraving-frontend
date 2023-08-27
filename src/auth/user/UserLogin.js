import React, { Component } from 'react';
import logo from '../../assets/images/logo.png';
import man from '../../assets/images/dashboard/user.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import cookie from 'js-cookie';
import { connect } from 'react-redux';
import { UserLoginPost } from '../../api/userUrl';
import { UncontrolledAlert } from 'reactstrap';


class UserLogin extends Component {
    constructor(props){
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.state = {
            email   : '',
            password: '',
            errors  : '',
            message : ''
        };
    }
    
    handleFormSubmit = (e) =>{
        e.preventDefault();
        const credentials = {
            email: this.state.email,
            password: this.state.password
        };
        axios.post(`${process.env.REACT_APP_BASEURL}/${UserLoginPost}`, credentials)
        .then(response => {
            var userData = response.data.user;
            console.log('userData ', response.data);
            
            localStorage.setItem('name', userData.name);
            localStorage.setItem('projectId', userData.project_id);
            localStorage.setItem('email', userData.email);
            
            cookie.set('userToken', response.data.access_token);
            sessionStorage.setItem('userToken', response.data.access_token);
            this.props.setLogin(userData);
            this.props.history.push(`${process.env.PUBLIC_URL}/dashboard/apps`);
        })
        .catch(error => {
            this.setState({
                errors: error.response.data.errors
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
                                                <img style={{width: '280px'}} src={logo} alt="" /></div>
                                            <div className="card mt-4">
                                                <div className="card-body">
                                                    <div className="text-center">
                                                        <h4>USER LOGIN</h4>
                                                    </div>

                                                    {this.state.errors ? 
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
                                                                placeholder="Enter Password"
                                                                />
                                                            {/* {errors.password && 'Email is required'} */}
                                                        </div>
                                                        {/* <div className="checkbox p-0">
                                                            <input id="checkbox1" type="checkbox" />
                                                            <label htmlFor="checkbox1">Remember me</label>
                                                        </div> */}
                                                        <div className="form-group form-row mt-3 mb-0">
                                                            <button className="btn btn-primary btn-block" type="submit">Login</button>
                                                        </div>
                                                        {/* <div className="form-row">
                                                            <div className="col-sm-4">
                                                                <button className="btn btn-primary btn-block" type="submit">Login</button>
                                                            </div>
                                                            <div className="col-sm-8">
                                                            </div>
                                                        </div> */}
                                                        {/* <div className="login-divider"></div> */}
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
        setLogin: (user) => dispatch({
            type: 'SET_USER_LOGIN',
            payload: user
        })
    }
}
export default connect(null, mapDispatchToProps)(UserLogin);