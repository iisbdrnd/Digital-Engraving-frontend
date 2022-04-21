import React, { Fragment } from 'react';
import Logo from '../../../../assets/images/logo.png';
import UserMenu from '../header-component/userMenu';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Fragment>
      <div className="page-main-header" >
        <div className="main-header-right row">
          <div className="main-header-left">
            <div className="logo-wrapper">
              <Link to="/dashboard/apps">
                <img className="img-fluid" src={Logo} alt="" />
              </Link>
            </div>
          </div>
          <div className="nav-right col p-0">
            <ul className="nav-menus">
              <li></li>
              <li></li>
              <UserMenu />
            </ul>
          </div>

        </div>
      </div>
    </Fragment>
  )
};
export default Header;