// ** Import custom components for redux**

import { HashRouter as Router, Route, Switch, withRouter, Redirect } from "react-router-dom"; 
import React, { Component, Fragment } from 'react';

//-------------------------//
//IMPORT ADMIN COMPONENT --//
//-------------------------//
//Admin Auth
import AdminSignin from './../auth/adminSignin';
import AuthRoute from './../auth/authRoute';
import AdminGuestRoute from './../auth/adminGuestRoute';
import AdminAuthRoute from './../auth/adminAuthRoute';
//Admin User
import UserCards from './../components/users/user-cards';
import UserEdit from './../components/users/userEdit';
import UserProfile from './../components/users/userProfile';
import AdminUserEdit from './../components/admin/userProfile/adminUserEdit';
import ChangeImage from './../components/admin/userProfile/changeImage';

//MENU SHORTING ADMIN 
import MenuShortingAdmin from './../components/admin/adminMenuSorting/List';
// factory polishing
import PolishingAdd from './../components/admin/polishing/Add';
import JobAgreement from '../components/admin/jobAgreement/Add';
import designToFactory from '../components/admin/designToFactory/Add';
//end factory polishing
//Category
import Welcome from './../components/admin/dashboard/welcome';
import DesignationAdd from './../components/admin/designations/Add';
import DesignationEdit from './../components/admin/designations/Edit';
//DESIGNATIONS ADMIN 
import DesignationList from './../components/admin/designations/ListData';
import InternalLinkAdd from './../components/admin/internalLink/Add';
import InternalLinkEdit from './../components/admin/internalLink/Edit';
//INTERNAL LINK ADMIN 
import InternalLinkList from './../components/admin/internalLink/ListData';
import MenuAdd from './../components/admin/menu/Add';
import MenuEdit from './../components/admin/menu/Edit';
//MENUS ADMIN 
import MenuList from './../components/admin/menu/ListData';
import AccessLinkProject from './../components/admin/projectRegister/access/AccessingSystem';
import ProjectAdd from './../components/admin/projectRegister/Create';
import ProjectEdit from './../components/admin/projectRegister/Edit';
//Projects Registration
import ProjectRegisterList from './../components/admin/projectRegister/listData';
import AccessLinkSoftAdmin from './../components/admin/softAdmin/accessLink/AccessLink2';
import CreateSoftAdmin from './../components/admin/softAdmin/Create';
import EditSoftAdmin from './../components/admin/softAdmin/Edit';
//SoftAdmin
import SoftAdminList from './../components/admin/softAdmin/ListData';
import SoftInternalLinkAdd from './../components/admin/softwareInternalLink/Create';
import SoftInternalLinkEdit from './../components/admin/softwareInternalLink/Edit';
//SOFT INTERNAL LINK
import SoftInternalLinkList from './../components/admin/softwareInternalLink/ListData';
import SoftMenuAdd from './../components/admin/softwareMenu/Create';
import SoftMenuEdit from './../components/admin/softwareMenu/Edit';
//SOFT MENU 
import SoftMenuList from './../components/admin/softwareMenu/ListData';
//SOFT MENU SORT
import SoftMenuSorting from './../components/admin/softwareMenu/MenuSorting';
import SoftwareModuleAdd from './../components/admin/softwareModule/Create';
import SoftwareModuleEdit from './../components/admin/softwareModule/Edit';
//SOFT MODULE
import SoftwareModuleList from './../components/admin/softwareModule/ListData';
import AccessLinkUser from './../components/admin/users/access/AccessingSystem';
import CreateSoftwareUser from './../components/admin/users/Create';
import EditSoftwareUser from './../components/admin/users/Edit';
//Software User
import SoftwareUserList from './../components/admin/users/listData';
//import AdminApp from "./components/adminApp";

//DIGITAL FORM DESIGN GRINDING
import GrindingList from './../components/admin/digital/grinding/ListData';
import GrindingAdd from './../components/admin/digital/grinding/Add';

import DesignToDesignList from './../components/admin/digital/designToDesign/ListData';
import DesignToDesignAdd from './../components/admin/digital/designToDesign/Add';

//DESIGNATIONS ADMIN 
import DepartmentList from './../components/admin/department/ListData';
import DepartmentAdd from './../components/admin/department/Add';
import DepartmentEdit from './../components/admin/department/Edit';

//Admin APP

import AdminApp from './../components/adminApp';
import UserAccess from "../components/admin/users/access/List/UserAccess";
import UserList from "../components/admin/users/access/List/UserList";
// import UserAccess from "../components/admin/users/access/List/UserAccess";
// import UserList from "../components/admin/List/UserList";
// import UserAccess from "../components/admin/List/UserAccess";

class AdminRoute extends Component {
    constructor(props) {
        super(props);
        const url = new URL(window.location.href);
    }

    render() {

        return (
          <Switch>
            <AdminGuestRoute
              path={`${process.env.PUBLIC_URL}/login`}
              component={AdminSignin}
            />
            <AdminAuthRoute
              exact
              path={`${process.env.PUBLIC_URL}/`}
              render={() => {
                return <Redirect to={`${process.env.PUBLIC_URL}/login`} />;
              }}
            />
            <Fragment>
              <AdminApp>
                <AdminAuthRoute path={`/welcome`} component={Welcome} />

                {/* //Project Register */}
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/ProjectRegister/list`}
                  component={ProjectRegisterList}
                />
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/projectRegister/add`}
                  component={ProjectAdd}
                />
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/projectRegister/edit/:projectId`}
                  component={ProjectEdit}
                />
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/projectRegister/project-access-link/:projectId`}
                  component={AccessLinkProject}
                />

                {/* SoftAdmin */}
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/softAdmin/list`}
                  component={SoftAdminList}
                />
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/softAdmin/add`}
                  component={CreateSoftAdmin}
                />
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/softAdmin/edit/:adminId`}
                  component={EditSoftAdmin}
                />
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/softAdmin/admin-access-link/:adminId`}
                  component={AccessLinkSoftAdmin}
                />

                {/* Software Users */}
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/users/list`}
                  component={SoftwareUserList}
                />
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/users/add`}
                  component={CreateSoftwareUser}
                />
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/users/edit/:userId`}
                  component={EditSoftwareUser}
                />
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/user/user-access-link/:userId`}
                  component={UserAccess}
                />

                {/* Users Profile */}
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/users/userProfile`}
                  component={UserProfile}
                />
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/users/userEdit`}
                  component={UserEdit}
                />
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/users/userCards`}
                  component={UserCards}
                />
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/users/adminUserEdit`}
                  component={AdminUserEdit}
                />
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/users/changeImage`}
                  component={ChangeImage}
                />

                {/* Designation */}
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/designations/List`}
                  component={DesignationList}
                />
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/designations/Add`}
                  component={DesignationAdd}
                />
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/designations/Edit/:designationId`}
                  component={DesignationEdit}
                />

                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/polishing/Add`}
                  component={PolishingAdd}
                />
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/jobagreement/Add`}
                  component={JobAgreement}
                />
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/designtofactory/Add`}
                  component={designToFactory}
                />

                {/* Menu */}
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/menu/List`}
                  component={MenuList}
                />
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/menu/Add`}
                  component={MenuAdd}
                />
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/menu/Edit/:menuId`}
                  component={MenuEdit}
                />

                {/* Software Module */}
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/softwareModule/list`}
                  component={SoftwareModuleList}
                />
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/softwareModule/Add`}
                  component={SoftwareModuleAdd}
                />
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/softwareModule/Edit/:moduleId`}
                  component={SoftwareModuleEdit}
                />

                {/* Software Menu */}
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/softMenu/list`}
                  component={SoftMenuList}
                />
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/softMenu/Add`}
                  component={SoftMenuAdd}
                />
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/softMenu/Edit/:softMenuId`}
                  component={SoftMenuEdit}
                />

                {/* INTERNAL LINK ADMIN*/}
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/internalLink/List`}
                  component={InternalLinkList}
                />
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/internalLink/Add`}
                  component={InternalLinkAdd}
                />
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/internalLink/Edit/:internalLinkID`}
                  component={InternalLinkEdit}
                />

                {/* MENU SHORTING ADMIN */}
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/menu-shorting/list`}
                  component={MenuShortingAdmin}
                />

                {/* Software Internal Link */}
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/softInternalLink/list`}
                  component={SoftInternalLinkList}
                />
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/softInternalLink/Add`}
                  component={SoftInternalLinkAdd}
                />
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/softInternalLink/Edit/:softLinkId`}
                  component={SoftInternalLinkEdit}
                />

                {/* Software Menu Sorting */}
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/softMenu/sorting`}
                  component={SoftMenuSorting}
                />

                {/* GRINDING */}
                <AdminAuthRoute
                  path="/grinding/List"
                  component={GrindingList}
                />
                <AdminAuthRoute path="/grinding/Add" component={GrindingAdd} />

                {/* DESIGN TO DESIGN */}
                <AdminAuthRoute
                  path="/designToDesign/List"
                  component={DesignToDesignList}
                />
                <AdminAuthRoute
                  path="/designToDesign/Add"
                  component={DesignToDesignAdd}
                />

                {/* DEPARTMENT */}
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/department/List`}
                  component={DepartmentList}
                />
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/department/Add`}
                  component={DepartmentAdd}
                />
                <AdminAuthRoute
                  path={`${process.env.PUBLIC_URL}/department/Edit/:deptId`}
                  component={DepartmentEdit}
                />

                {/* react table example  */}
                <AdminAuthRoute
                  exact
                  path={`${process.env.PUBLIC_URL}/react/table`}
                  component={UserList}
                />
                <AdminAuthRoute
                  exact
                  path={`${process.env.PUBLIC_URL}/react/table/:id`}
                  component={UserAccess}
                />
              </AdminApp>
            </Fragment>
          </Switch>
        );
    }
}

export default withRouter(AdminRoute);