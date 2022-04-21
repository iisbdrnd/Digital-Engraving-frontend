import React, { Fragment, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Welcome extends Component {
    constructor(){
        super();
        this.state = {
            admin: [],
        };
    }
    
    // componentDidMount(){
    //     axios.post(`${process.env.REACT_APP_BASEURL}/api/admin/me`)
	// 	.then(response => {
    //         this.setState({admin : response.data})
    //         console.log('welcome');
	// 	})
	// 	.catch(error => console.log(error))
    // }

    render(){
        let {admin} = this.state;
        return (
            <Fragment>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-body text-center">
                                    <div className="table-responsive col-sm-9 offset-sm-3">
                                        <h3 className="">Hi {localStorage.getItem('adminName')} </h3>
                                        <hr/>
                                        <h1>Hi  Welcome to Administration Panel</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
};
        
export default Welcome;