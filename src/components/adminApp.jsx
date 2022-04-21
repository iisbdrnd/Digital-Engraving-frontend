import React from 'react';
import Header from './admin/common/header-component/header';
import Sidebar from './admin/common/sidebar-component/sidebar';
import RightSidebar from './admin/common/right-sidebar';
import Footer from './admin/common/footer';
import ThemeCustomizer from './admin/common/theme-customizer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './admin/common/loader';
import { connect } from 'react-redux';

const AppLayout = (props) => {
    return (
        props.adminLoggedIn ?
            (<div>
                <Loader />
                <div className="page-wrapper">
                    <div className="page-body-wrapper">
                        <Header />
                        <Sidebar />
                        <RightSidebar />
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
}

const mapStateToProps = (state) => {
    return {
        adminLoggedIn: state.auth.adminLoggedIn
    }
}
export default connect(mapStateToProps)(AppLayout);