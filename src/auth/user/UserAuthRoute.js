import React from 'react';
import {Route, Redirect } from 'react-router-dom';
import cookie from 'js-cookie';
import { connect } from 'react-redux';

const UserAuthRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={ props =>
          rest.userLoggedIn ? (
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
  const mapStateToProps = (state) =>{
    return {
      userLoggedIn: state.auth.userLoggedIn
    };
  }
export default connect(mapStateToProps)(UserAuthRoute);