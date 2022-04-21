
import React from 'react';
import {Route, Redirect } from 'react-router-dom';
import cookie from 'js-cookie';
import { connect } from 'react-redux';


const GuestRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={ props =>
        !rest.loggedIn ? (
            <Component {...props} />
          ) : 
          (
            <Redirect
              to={{
                // pathname: `${process.env.PUBLIC_URL}/users/login`,
                pathname: rest.loggedIn ? `${process.env.PUBLIC_URL}/dashboard/default` : `${process.env.PUBLIC_URL}/admin/welcome`,
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
const mapStateToProps = (state) =>{
  return {
    loggedIn: state.auth.loggedIn,
    adminLoggedIn: state.auth.adminLoggedIn
  };
}
export default connect(mapStateToProps)(GuestRoute);