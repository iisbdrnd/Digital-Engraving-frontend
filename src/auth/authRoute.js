import React from 'react';
import {Route, Redirect } from 'react-router-dom';
import cookie from 'js-cookie';
import { connect } from 'react-redux';

const AuthRoute = ({ component: Component, ...rest }) => {
  
  // let payload = { "id" : "1"};
  // let token = jwt.sign( payload,'secret',  { noTimestamp:true, expiresIn: '1h' });

    return (
      <Route
        {...rest}
        render={ props =>
          rest.loggedIn ? (
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
    loggedIn: state.auth.loggedIn
  };
}
export default connect(mapStateToProps)(AuthRoute);