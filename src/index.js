import axios from 'axios';
import cookie from 'js-cookie';
import jwt from 'jsonwebtoken';
import React, { Fragment, useEffect, useState, createStore } from 'react';
import ReactDOM from 'react-dom';
// ** Import custom components for redux**
import { Provider } from 'react-redux';
//Import Packages

import { HashRouter as Router, Route, Switch, BrowserRouter } from "react-router-dom" ;
import { ScrollContext } from 'react-router-scroll-4';

//Import Api Route
// import { userLogin, userMe } from './api/generalUrl'
import { adminLogin, adminMe } from './api/adminUrl';
//USER API URL
import { UserLoginPost, UserMe } from './api/userUrl';
import UserLogin from './auth/user/UserLogin';

import app from './data/base';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import store from './store/index';

//Import Route
import AdminRoute from '././routes/AdminRoute'
import UserRoute from '././routes/UserRoute'


function Root() {
    const [currentUser, setCurrentUser] = useState(true);

    let url = window.location.pathname;
    let urlArray = url.split('/');

    const abortController = new AbortController();
    useEffect(() => {
        const themeColor = localStorage.getItem('theme-color')
        const layout = localStorage.getItem('layout_version')
        app.auth().onAuthStateChanged(setCurrentUser);
        document.getElementById("color").setAttribute("href", `${process.env.PUBLIC_URL}/assets/css/${themeColor}.css`);
        document.body.classList.add(layout);

        return function cleanup() {
            abortController.abort();
        }
    }, []);

    return (
        <div className="App">
            <Provider store={store}>
                {urlArray[1] == 'admin' ? 
                    (
                        <BrowserRouter basename={"/admin"}>
                            <ScrollContext>                        
                                <AdminRoute />                        
                            </ScrollContext>
                        </BrowserRouter>
                    ) : (
                        <BrowserRouter basename={"/user"}>
                            <ScrollContext>
                                <UserRoute />
                            </ScrollContext>
                        </BrowserRouter>
                    ) 
                }
            </Provider>
        </div>
    );
}

// transfers sessionStorage from one tab to another
var sessionStorage_transfer = function(event) {
    if(!event) { event = window.event; } // ie suq
    if(!event.newValue) return;          // do nothing if no value to work with
    if (event.key == 'getSessionStorage') {
      // another tab asked for the sessionStorage -> send it
      localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
      // the other tab should now have it, so we're done with it.
      localStorage.removeItem('sessionStorage'); // <- could do short timeout as well.
    } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
      // another tab sent data <- get it
      var data = JSON.parse(event.newValue);
      for (var key in data) {
        sessionStorage.setItem(key, data[key]);
      }
    }
};
// listen for changes to localStorage
if(window.addEventListener) {
    window.addEventListener("storage", sessionStorage_transfer, false);
} else {
    window.attachEvent("onstorage", sessionStorage_transfer);
};
// Ask other tabs for session storage (this is ONLY to trigger event)
if (!sessionStorage.length) {
    localStorage.setItem('getSessionStorage', 'foobar');
    localStorage.removeItem('getSessionStorage', 'foobar');
};
// End Code

let userToken = cookie.get('userToken');
let adminToken = cookie.get('adminToken');

let currentUrl = window.location.href;
const requestedUrl = currentUrl.substring(0, 27); // (http://localhost:3000/user/) = 27
// const requestedUrl = currentUrl.substring(0, 34); //(https://approval.eduvess.com/user/) = 40
// const baseUrl = 'http://localhost:3000/';

const jwt_secret = 'mRCAbMqXgcovXj2GmVWDfJ3LHgHkTcjggZ9Yqxm1oQJREJe14em5oHtHlcqiUNj8';

if (requestedUrl.includes('admin')) {
    if (adminToken) {
        jwt.verify(adminToken, jwt_secret, (err, decoded) => {
            if (err) {
                cookie.remove('adminToken');
                adminToken = null;
            } else {
                if(decoded.iss == `${process.env.REACT_APP_BASEURL}/${adminLogin}`){
                    axios.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
                    axios.post(`${process.env.REACT_APP_BASEURL}/${adminMe}`)
                    .then(response => {
                        store.dispatch({type: 'SET_ADMIN_LOGIN', payload: response.data});
                        ReactDOM.render(<Root />, document.getElementById('root'));
                        serviceWorker.unregister();
                    }) 
                    .catch(err => console.log(err))
                } else {
                    cookie.remove('adminToken');
                    adminToken = null; 

                    ReactDOM.render(<Root />, document.getElementById('root'));
                    serviceWorker.unregister();
                }
            }
        });
    } else {
        ReactDOM.render(<Root />, document.getElementById('root'));
        serviceWorker.unregister();
    }

}else {
    if (userToken) {
        jwt.verify(userToken, jwt_secret, (err, decoded) => {
            if (err) {
                cookie.remove('userToken');
                userToken = null;
            } else {
                if(decoded.iss == `${process.env.REACT_APP_BASEURL}/${UserLoginPost}`){
                    axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
                    axios.post(`${process.env.REACT_APP_BASEURL}/${UserMe}`)
                    .then(response => {
                        store.dispatch({type: 'SET_USER_LOGIN', payload: response.data});
                        ReactDOM.render(<Root />, document.getElementById('root'));
                        serviceWorker.unregister();
                    }) 
                    .catch(err => console.log(err))
                } else {
                    cookie.remove('userToken');
                    userToken = null; 

                    ReactDOM.render(<Root />, document.getElementById('root'));
                    serviceWorker.unregister();
                }
            }
        });
    } else {
        ReactDOM.render(<Root />, document.getElementById('root'));
        serviceWorker.unregister();
    }
} 