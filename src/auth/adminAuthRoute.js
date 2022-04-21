import React from 'react';
import {Route, Redirect } from 'react-router-dom';
import cookie from 'js-cookie';
import { connect } from 'react-redux';

const adminAuthRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={ props =>
          rest.adminLoggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: `${process.env.PUBLIC_URL}/login`,
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  } 
// export default adminAuthRoute;
const mapStateToProps = (state) =>{
  return {
    adminLoggedIn: state.auth.adminLoggedIn
  };
}
export default connect(mapStateToProps)(adminAuthRoute);