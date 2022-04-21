import React, { Fragment, useEffect, useState, createStore } from 'react';
import Header from './users/common/header-component/header';
import Sidebar from './users/common/sidebar-component/sidebar';
import Footer from './users/common/footer';
import ThemeCustomizer from './users/common/theme-customizer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './users/common/loader';
import { connect } from 'react-redux';


const areEqual = (prevProps, nextProps) => {
    if(nextProps == prevProps ){
        return false; 
    }
    return true; 
};

console.log(areEqual);

// const MyComponent = React.memo(props => {
//   return /*whatever jsx you like */
// }, areEqual);

const UserApp = React.memo(props => {
    return (
        props.userLoggedIn ?
            (<div>
                <Loader />
                <div className="page-wrapper">
                    <div className="page-body-wrapper">
                        <Header />
                        <Sidebar />
                        <div className="page-body">
                            {props.children}
                        </div>
                        <Footer />
                        {/* <ThemeCustomizer /> */}
                    </div>
                </div>
                <ToastContainer />
            </div>)
        : 
        (<div>{props.children}</div>)
    );
}, areEqual);

const mapStateToProps = (state) => {
    return {
        userLoggedIn: state.auth.userLoggedIn,
        moduleMenu: state.userMenu.userMenus,
    }
}
export default connect(mapStateToProps)(UserApp); 