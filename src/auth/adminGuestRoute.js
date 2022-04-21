
import React from 'react';
import {Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const adminGuestRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={ props =>
        !rest.adminLoggedIn ? (
            <Component {...props} />
          ) : 
          (
            <Redirect
              to={{
                // pathname: `${process.env.PUBLIC_URL}/dashboard/default`,
                pathname: `${process.env.PUBLIC_URL}/welcome`,
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
    adminLoggedIn: state.auth.adminLoggedIn
  };
}
export default connect(mapStateToProps)(adminGuestRoute);