
import React from 'react';
import {Route, Redirect } from 'react-router-dom';
import cookie from 'js-cookie';
import { connect } from 'react-redux';


const UserGuestRoute = ({ component: Component, ...rest }) => {
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
                // pathname: `${process.env.PUBLIC_URL}/dashboard/default`,
                pathname: rest.loggedIn ? `${process.env.PUBLIC_URL}/dashboard` : `${process.env.PUBLIC_URL}/login`,
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
export default connect(mapStateToProps)(UserGuestRoute);