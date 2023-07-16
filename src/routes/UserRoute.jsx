// ** Import custom components for redux**
import { HashRouter as Router, Route, Switch, withRouter, Redirect } from "react-router-dom"; 
import React, { Component, Fragment } from 'react';

//-------------------------//
//---- START USER PART ----//
//-------------------------//
//Auth Component
//FOR USER GUEST COMPONENT
import UserGuestRoute from './../auth/user/UserGuestRoute';
//USER LOGIN COMPONENT
import UserAuthRoute from './../auth/user/UserAuthRoute';
import AuthRoute from './../auth/authRoute';
import UserLogin from './../auth/user/UserLogin';

import UserProfile from './../components/users/userProfile';
import UserCards from './../components/users/user-cards';

//userEdit
import UserEdit from './../components/users/userEdit';
import UserChangeImage from './../components/users/userChangeImage';

//USER DASHBOARD COMPONENT
// import UserDashboard from './components/user/dashboard/welcome';
import UserApps from './../components/users/Apps';
import Master from './../components/users/Master';
// BACK OFFICE SETUP
import CompanyProfile from './../components/users/backOfficeSetup/CompanyProfile';
import CompanyProfileEdit from './../components/users/backOfficeSetup/CompanyProfileEdit';
//DESIGNATION
import UserDesignation from './../components/users/backOfficeSetup/designation/ListData';
import UserDesignationAdd from './../components/users/backOfficeSetup/designation/Add';
import UserDesignationEdit from './../components/users/backOfficeSetup/designation/Edit';
//JOB CLASS
import JobClass from './../components/users/backOfficeSetup/jobClass/ListData';
import JobClassAdd from './../components/users/backOfficeSetup/jobClass/Add';
import JobClassEdit from './../components/users/backOfficeSetup/jobClass/Edit';

//JOB SUB CLASS
import JobSubClass from './../components/users/backOfficeSetup/jobSubClass/ListData';
import JobSubClassAdd from './../components/users/backOfficeSetup/jobSubClass/Add';
import JobSubClassEdit from './../components/users/backOfficeSetup/jobSubClass/Edit';

//COLOR
import Color from './../components/users/backOfficeSetup/color/ListData';
import ColorAdd from './../components/users/backOfficeSetup/color/Add';
import ColorEdit from './../components/users/backOfficeSetup/color/Edit';
//DESIGN MACHINE LOCATION
import DesignMachineLocation from './../components/users/backOfficeSetup/designMachineLocation/ListData';
import DesignMachineLocationAdd from './../components/users/backOfficeSetup/designMachineLocation/Add';
import DesignMachineLocationEdit from './../components/users/backOfficeSetup/designMachineLocation/Edit';

//DEPERTMENT
import UserDepartment from './../components/users/backOfficeSetup/department/ListData';
import UserDepartmentAdd from './../components/users/backOfficeSetup/department/Add';
import UserDepartmentEdit from './../components/users/backOfficeSetup/department/Edit';
//SERVICE CATEGORY
import ServiceCategory from './../components/users/serviceCategory/ListData';
import ServiceCategoryAdd from './../components/users/serviceCategory/Add';
import ServiceCategoryEdit from './../components/users/serviceCategory/Edit';
//CHAIN
import Chain from './../components/users/chain/ListData';
import ChainAdd from './../components/users/chain/Add';
import ChainEdit from './../components/users/serviceCategory/Edit';

//CLIENT INFORMATION
import ClientInformation from './../components/users/backOfficeSetup/clientInformation/ListData';
import ClientInformationAdd from './../components/users/backOfficeSetup/clientInformation/Add';
import ClientInformationEdit from './../components/users/backOfficeSetup/clientInformation/Edit';

//PRINTERS 
import Printers from './../components/users/backOfficeSetup/printers/ListData';
import PrintersAdd from './../components/users/backOfficeSetup/printers/Add';
import PrintersEdit from './../components/users/backOfficeSetup/printers/Edit';

//ROLES 
import Roles from '../components/users/roles/ListData';
import CreateSoftwareRole from './../components/users/roles/Create';
import EditSoftwareRole from './../components/users/roles/Edit';

// USERS
import SoftwareUserList from './../components/users/users/listData';
import CreateSoftwareUser from './../components/users/users/Create';
import EditSoftwareUser from './../components/users/users/Edit';


//SUPPLIER INFORMATION
import SupplierInformation from './../components/users/backOfficeSetup/supplierInformation/ListData';
import SupplierInformationAdd from './../components/users/backOfficeSetup/supplierInformation/Add';
import SupplierInformationEdit from './../components/users/backOfficeSetup/supplierInformation/Edit';

//EMPLOYEE INFORMATION
import EmployeeInformation from './../components/users/backOfficeSetup/employeeInformation/ListData';
import EmployeeInformationAdd from './../components/users/backOfficeSetup/employeeInformation/Add';
import EmployeeInformationEdit from './../components/users/backOfficeSetup/employeeInformation/Edit';

//BRANCHES
import Branches from './../components/users/backOfficeSetup/branches/ListData';
import BranchesAdd from './../components/users/backOfficeSetup/branches/Add';
import BranchesEdit from './../components/users/backOfficeSetup/branches/Edit';

//Employee
import UserEmployee from './../components/users/employee/ListData';
import UserEmployeeAdd from './../components/users/employee/Add';
import UserEmployeeEdit from './../components/users/employee/Edit';

//JOB ORDER
import JobOrder from './../components/users/jobOrder/ListData';
import JobOrderAdd from './../components/users/jobOrder/Create';
import JobOrderEdit from './../components/users/jobOrder/Edit';
import JobOrderShow from './../components/users/jobOrder/Show';

//TEST
import Test from './../components/users/test/ListData';
import TestAdd from './../components/users/test/Add';
import TestEdit from './../components/users/test/Edit';

//Client Stock
import ClientStock from './../components/users/clientStock/ListData';
import ClientStockAdd from './../components/users/clientStock/Add';
import ClientStockEdit from './../components/users/clientStock/Edit';

//DEl Stock
import DelStock from './../components/users/delStock/ListData';
import DelStockAdd from './../components/users/delStock/Add';
import DelStockEdit from './../components/users/delStock/Edit';

//Cancel Order
import CancelOrderList from './../components/users/cancelOrder/ListData';
import CancelOrderAdd from './../components/users/cancelOrder/Add';
import CancelOrderEdit from './../components/users/cancelOrder/Edit';

//JOB AGREEMENT
import JobAgreement from './../components/users/jobAgreement/ListData';
import JobAgreementAdd from './../components/users/jobAgreement/Create';
import JobAgreementEdit from './../components/users/jobAgreement/Edit';

//Layouts
import LayoutsList from './../components/users/layouts/ListData';
import LayoutsAdd from './../components/users/layouts/Add';
import LayoutsEdit from './../components/users/layouts/Edit';

//Base Order
import BaseOrderList from './../components/users/baseOrder/ListData';
import BaseOrderAdd from './../components/users/baseOrder/Add';
import BaseOrderEdit from './../components/users/baseOrder/Edit';

//Base Receive
import BaseReceiveList from './../components/users/baseReceive/ListData';
import BaseReceiveAdd from './../components/users/baseReceive/Add';
// import BaseReceiveEdit from './../components/users/baseReceive/Edit';

//Design to Factory
import DesignToFactoryList from './../components/users/designToFactory/ListData';
import DesignToFactoryAdd from './../components/users/designToFactory/Add';
import DesignToFactoryEdit from './../components/users/designToFactory/Edit';

//Design to Design
import DesignToDesignList from './../components/users/designToDesign/ListData';
import DesignToDesignAdd from './../components/users/designToDesign/Add';

//START MARKETING REPORT
import JobAgreementForm from './../components/users/marketingReport/jobAgreementForm/Form';
import JobAgreementFormReport from './../components/users/marketingReport/jobAgreementForm/Report';
import JobInformation from './../components/users/marketingReport/jobInformation/Form';
import JobInformationReport from './../components/users/marketingReport/jobInformation/Report';
import JobFlowAnalysis from './../components/users/marketingReport/jobFlowAnalysis/Form';
import JobFlowAnalysisReport from './../components/users/marketingReport/jobFlowAnalysis/Report';
import JobFlowAnalysisMarketingPersonWise from './../components/users/marketingReport/jobFlowAnalysisMarketingPersonWise/Form';
import JobFlowAnalysisMarketingPersonWiseReport from './../components/users/marketingReport/jobFlowAnalysisMarketingPersonWise/Report';
import DealerWiseJobFlowForm from './../components/users/marketingReport/dealerWiseJobFlow/Form';
import DealerWiseJobFlowReport from './../components/users/marketingReport/dealerWiseJobFlow/Report';
//END MARKETING REPORT

//START JOB INFORMATION REPORT
import AnalyticalJobInformationClientWise from './../components/users/jobInformationReport/analyticalJobInformationClientWise/Form';
import AnalyticalJobInformationClientWiseReport from './../components/users/jobInformationReport/analyticalJobInformationClientWise/Report';
import AnalyticalJobInformationEmployeeWise from './../components/users/jobInformationReport/analyticalJobInformationEmployeeWise/Form';
import AnalyticalJobInformationEmployeeWiseReport from './../components/users/jobInformationReport/analyticalJobInformationEmployeeWise/Report';
import AnalyticalJobInformationPrinterWise from './../components/users/jobInformationReport/analyticalJobInformationPrinterWise/Form';
import AnalyticalJobInformationPrinterWiseReport from './../components/users/jobInformationReport/analyticalJobInformationPrinterWise/Report';
import PendingJobInformation from './../components/users/jobInformationReport/pendingJobInformation/Form';
import PendingJobInformationReport from './../components/users/jobInformationReport/pendingJobInformation/Report';
import PendingSupplyInformation from './../components/users/jobInformationReport/pendingSupplyInformation/Form';
import PendingSupplyInformationReport from './../components/users/jobInformationReport/pendingSupplyInformation/Report';
import ClientSummaryForm from './../components/users/jobInformationReport/clientSummary/Form';
import ClientSummaryReport from './../components/users/jobInformationReport/clientSummary/Report';
import ClientDetailsForm from './../components/users/jobInformationReport/clientDetails/Form';
import ClientDetailsReport from './../components/users/jobInformationReport/clientDetails/Report';
import PrinterWiseJobStatusDetails from './../components/users/jobInformationReport/printerWiseJobStatusDetails/Form';
import PrinterWiseJobStatusDetailsReport from './../components/users/jobInformationReport/printerWiseJobStatusDetails/Report';
import MarketingPersonWiseJobStatus from './../components/users/jobInformationReport/marketingPersonWiseJobStatus/Form';
import MarketingPersonWiseJobStatusReport from './../components/users/jobInformationReport/marketingPersonWiseJobStatus/Report';
//END JOB INFORMATION REPORT

//START SUPPLY CHAIN REPORT
// SoftwareUserList

import DesignFile from './../components/users/supplyChainReport/designFile/Form';
import DesignFileReport from './../components/users/supplyChainReport/designFile/Report';
import DailyDesignFileToFactoryForm from './../components/users/supplyChainReport/dailyDesignFileToFactory/Form';
import DailyDesignFileToFactoryReport from './../components/users/supplyChainReport/dailyDesignFileToFactory/Report';
import DesignFileToFactoryForm from './../components/users/supplyChainReport/designFileToFactory/Form';
import DesignFileToFactoryReport from './../components/users/supplyChainReport/designFileToFactory/Report';
import ProductionReportDetailsForm from './../components/users/supplyChainReport/productionReportDetails/Form';
import ProductionReportDetailsReport from './../components/users/supplyChainReport/productionReportDetails/Report';
import CustomerWiseAnalysisForm from './../components/users/supplyChainReport/customerWiseAnalysis/Form';
import CustomerWiseAnalysisReport from './../components/users/supplyChainReport/customerWiseAnalysis/Report';
import ClientDetails from './../components/users/supplyChainReport/customerWiseAnalysis/ClientDetails';
import ProgressReportForm from './../components/users/supplyChainReport/progressReport/Form';
import ProgressReport from './../components/users/supplyChainReport/progressReport/Report';
import StatusReportForm from './../components/users/supplyChainReport/statusReport/Form';
import StatusReport from './../components/users/supplyChainReport/statusReport/Report';
import DesignToDesignReportForm from './../components/users/supplyChainReport/designFileToDesignSection/Form';
import DesignToDesignReport from './../components/users/supplyChainReport/designFileToDesignSection/Report';
import BaseCylinderOrderForm from './../components/users/supplyChainReport/baseCylinderOrder/Form';
import BaseCylinderOrderReport from './../components/users/supplyChainReport/baseCylinderOrder/Report';
import PreviousBaseToStockForm from './../components/users/supplyChainReport/previousBaseToStock/Form';
import PreviousBaseToStockReport from './../components/users/supplyChainReport/previousBaseToStock/Report';
import FinishedCylinderStatusForm from './../components/users/supplyChainReport/finishedCylinderStatus/Form';
import FinishedCylinderStatusReport from './../components/users/supplyChainReport/finishedCylinderStatus/Report';
import YearlyJobFlowForm from './../components/users/supplyChainReport/yearlyJobFlow/Form';
import YearlyJobFlowReport from './../components/users/supplyChainReport/yearlyJobFlow/Report';
import ClientStockForm from './../components/users/supplyChainReport/clientStockReport/Form';
import ClientStockReport from './../components/users/supplyChainReport/clientStockReport/Report';
import ClientStockBalanceForm from './../components/users/supplyChainReport/clientStockBalanceReport/Form';
import ClientStockBalanceReport from './../components/users/supplyChainReport/clientStockBalanceReport/Report';
import MonthlyJobFlowForm from './../components/users/supplyChainReport/monthlyJobFlow/Form';
import MonthlyJobFlowReport from './../components/users/supplyChainReport/monthlyJobFlow/Report';
import MonthlyProductionForm from './../components/users/supplyChainReport/monthlyProduction/Form';
import MonthlyProductionReport from './../components/users/supplyChainReport/monthlyProduction/Report';
import DailyProductionForm from './../components/users/supplyChainReport/dailyProduction/Form';
import DailyProductionReport from './../components/users/supplyChainReport/dailyProduction/Report';
import DailyJobFlowDetailsForm from './../components/users/supplyChainReport/dailyJobFlowDetails/Form';
import DailyJobFlowDetailsReport from './../components/users/supplyChainReport/dailyJobFlowDetails/Report';
//END SUPPLY CHAIN REPORT

//START SCHEDULE REPORT
import BaseSupplySchedule from './../components/users/scheduleReport/baseSupplySchedule/Form';
import BaseSupplyScheduleReport from './../components/users/scheduleReport/baseSupplySchedule/Report';
import PendingBase from './../components/users/scheduleReport/pendingBase/Form';
import PendingBaseReport from './../components/users/scheduleReport/pendingBase/Report';
import ReceivedBase from './../components/users/scheduleReport/receivedBase/Form';
import ReceivedBaseReport from './../components/users/scheduleReport/receivedBase/Report';
//END SCHEDULE REPORT


//START MANAGEMENT REPORT
import SalesAndCollectionsForm from './../components/users/managementReport/salesAndCollections/Form';
import SalesAndCollectionsReport from './../components/users/managementReport/salesAndCollections/Report';
import BranchWiseSalesCollectionForm from './../components/users/managementReport/branchWiseSalesCollection/Form';
import BranchWiseSalesCollectionReport from './../components/users/managementReport/branchWiseSalesCollection/Report';
import CollectionAndDiscountDetailsForm from './../components/users/managementReport/collectionAndDiscountDetails/Form';
import CollectionAndDiscountDetailsReport from './../components/users/managementReport/collectionAndDiscountDetails/Report';
//END MANAGEMENT REPORT

//Accounts Module
    //Chart of accounts
    import chartOfAccounts from './../components/users/accounts/backOfficeSetup/chartOfAccounts/ListData';
    import chartOfAccountsAdd from './../components/users/accounts/backOfficeSetup/chartOfAccounts/Add';
    import chartOfAccountsEdit from './../components/users/accounts/backOfficeSetup/chartOfAccounts/Edit';
    import BillConfig from "../components/users/backOfficeSetup/billConfiguration/BillConfig";


    //Account Configuration
    import accConfiguration from './../components/users/accounts/backOfficeSetup/accConfiguration/Add';

    import batch from './../components/users/accounts/backOfficeSetup/batch/ListData';
    // voucher
    import paymentVoucher from './../components/users/accounts/backOfficeSetup/paymentVoucher/Add';
    import BatchPaymentVoucherEdit from './../components/users/accounts/backOfficeSetup/paymentVoucher/Edit';

    import receivedVoucher from './../components/users/accounts/backOfficeSetup/reveivedVoucher/Add';
    import BatchReceiveVoucherEdit from './../components/users/accounts/backOfficeSetup/reveivedVoucher/Edit';

    import bankPaymentdVoucher from './../components/users/accounts/backOfficeSetup/bankPaymentdVoucher/Add';
    import BatchBankPaymentEdit from './../components/users/accounts/backOfficeSetup/bankPaymentdVoucher/Edit';

    import bankReceiveddVoucher from './../components/users/accounts/backOfficeSetup/bankReceiveddVoucher/Add';
    import BatchBankReceiveEdit from './../components/users/accounts/backOfficeSetup/bankReceiveddVoucher/Edit';


    import journalVoucher from './../components/users/accounts/backOfficeSetup/journalVoucher/Add';
    import JournalVoucherEdit from './../components/users/accounts/backOfficeSetup/journalVoucher/Edit';

    import PrintPreviousVoucher from '../components/users/accounts/backOfficeSetup/printPreviousVoucher/List';
    import PrintPreviousVoucherAction from '../components/users/accounts/backOfficeSetup/printPreviousVoucher/Report';
    import TransactionPosting from '../components/users/accounts/backOfficeSetup/TransactionPosting/List';
    import TransactionPostingReportAction from '../components/users/accounts/backOfficeSetup/TransactionPosting/Report';

    import TrialBalance from '../components/users/accounts/Report/TrialBalance/List';
    import TrialBalanceReportAction from '../components/users/accounts/Report/TrialBalance/Report';


    import ReceiptPayments from '../components/users/accounts/Report/ReceiptPayments/List';
    import ReceiptPaymentsReportAction from '../components/users/accounts/Report/ReceiptPayments/Report';

    import CashBook from '../components/users/accounts/Report/CashBook/List';
    import CashBookReportAction from '../components/users/accounts/Report/CashBook/Report';

    import BankBook from '../components/users/accounts/Report/BankBook/List';
    import BankBookReportAction from '../components/users/accounts/Report/BankBook/Report';

    import LedgerQuery from '../components/users/accounts/Report/LedgerQuery/List';
    import LedgerQueryReportAction from '../components/users/accounts/Report/LedgerQuery/Report';

    import BalanceSheet from '../components/users/accounts/Report/BalanceSheet/List';
    import BalanceSheetReportAction from '../components/users/accounts/Report/BalanceSheet/Report';

    import AccountsPayable from '../components/users/accounts/Report/AccountsPayable/List';
    import AccountsPayableReportAction from '../components/users/accounts/Report/AccountsPayable/Report';

    import AccountsReceivable from '../components/users/accounts/Report/AccountsReceivable/List';
    import AccountsReceivableReportAction from '../components/users/accounts/Report/AccountsReceivable/Report';




// ----- FACTORY START------//

//START FACTORY REPORT
import FactoryProductionForm from './../components/users/factoryReport/factoryProduction/Form';
import FactoryProductionReport from './../components/users/factoryReport/factoryProduction/Report';
import GrindingScheduleForm from './../components/users/factoryReport/grindingSchedule/Form';
import GrindingScheduleReport from './../components/users/factoryReport/grindingSchedule/Report';
import PolishingScheduleForm from './../components/users/factoryReport/polishingSchedule/Form';
import PolishingScheduleReport from './../components/users/factoryReport/polishingSchedule/Report';
import PlatingScheduleForm from './../components/users/factoryReport/platingSchedule/Form';
import PlatingScheduleReport from './../components/users/factoryReport/platingSchedule/Report';
import EngravingScheduleForm from './../components/users/factoryReport/engravingSchedule/Form';
import EngravingScheduleReport from './../components/users/factoryReport/engravingSchedule/Report';
import ChromeScheduleForm from './../components/users/factoryReport/chromeSchedule/Form';
import ChromeScheduleReport from './../components/users/factoryReport/chromeSchedule/Report';
import EngravingRemainingJobsForm from './../components/users/factoryReport/engravingRemainingJobs/Form';
import EngravingRemainingJobsReport from './../components/users/factoryReport/engravingRemainingJobs/Report';
import GrindingRemainingJobsForm from './../components/users/factoryReport/grindingRemainingJobs/Form';
import GrindingRemainingJobsReport from './../components/users/factoryReport/grindingRemainingJobs/Report';
import PolishingRemainingJobsForm from './../components/users/factoryReport/polishingRemainingJobs/Form';
import PolishingRemainingJobsReport from './../components/users/factoryReport/polishingRemainingJobs/Report';
import PlatingRemainingJobsForm from './../components/users/factoryReport/platingRemainingJobs/Form';
import PlatingRemainingJobsReport from './../components/users/factoryReport/platingRemainingJobs/Report';
//END FACTORY REPORT
//DESIGN LAYOUT
import DesignLayoutList from './../components/users/factory/designLayout/ListData';
import DesignLayoutAdd from  './../components/users/factory/designLayout/Add'
import DesignLayoutEdit from '../components/users/factory/designLayout/Edit/Edit'
//GRINDING
import GrindingList from './../components/users/factory/grinding/ListData';
import GrindingAdd from './../components/users/factory/grinding/Add';
import GrindingEdit from './../components/users/factory/grinding/Edit';

// BACK OFFICE SETUP START
// GRINDING MACHINE
import MachineList from './../components/users/factory/backOfficeSetup/machine/ListData';
import MachineAdd from './../components/users/factory/backOfficeSetup/machine/Add';
import MachineEdit from './../components/users/factory/backOfficeSetup/machine/Edit';
// POLISHING MACHINE
import PolishingMachineList from './../components/users/factory/backOfficeSetup/polishingMachine/ListData';
import PolishingMachineAdd from './../components/users/factory/backOfficeSetup/polishingMachine/Add';
import PolishingMachineEdit from './../components/users/factory/backOfficeSetup/polishingMachine/Edit';

//TANK CONFIG
import TankConfig from './../components/users/factory/backOfficeSetup/tankConfig/ListData';
import TankConfigAdd from './../components/users/factory/backOfficeSetup/tankConfig/Add';
import TankConfigEdit from './../components/users/factory/backOfficeSetup/tankConfig/Edit';

//PALTING SHIFT
import DigShiftEdit from '../components/users/factory/backOfficeSetup/digShift/Edit';

//PLATING DEPARTMENT
import PlatingDeptList from './../components/users/factory/platingDept/ListData';
import PlatingDeptAdd from './../components/users/factory/platingDept/Add';
import PlatingDeptEdit from './../components/users/factory/platingDept/Edit';

//POLISHING
import PolishingList from './../components/users/factory/polishing/ListData';
import PolishingAdd from './../components/users/factory/polishing/Add';
import PolishingEdit from './../components/users/factory/polishing/Edit';

//ENGRAVING
import EngravingList from './../components/users/factory/engraving/ListData';
import EngravingAdd from './../components/users/factory/engraving/Add';
import EngravingEdit from './../components/users/factory/engraving/Edit';

//CHROME
import ChromeList from './../components/users/factory/chrome/ListData';
import ChromeAdd from './../components/users/factory/chrome/Add';
import ChromeEdit from './../components/users/factory/chrome/Edit';

//QUALITY CONTROL
import QualityControlList from './../components/users/factory/qualityControl/ListData';
import QualityControlAdd from './../components/users/factory/qualityControl/Add';
import QualityControlEdit from './../components/users/factory/qualityControl/Edit';

//DE-CHROME
import DeChromeList from './../components/users/factory/deChrome/ListData';
import DeChromeAdd from './../components/users/factory/deChrome/Add';
import DeChromeEdit from './../components/users/factory/deChrome/Edit';

//challan 
import Challan from './../components/users/factory/challan/ListData';
import ChallanAdd from './../components/users/factory/challan/Add'; 
import ChallanEdit from './../components/users/factory/challan/Edit';
import ChallaShow from './../components/users/factory/challan/Show';

//Bill 
import Bill from './../components/users/factory/bill/ListData';
import BillAdd from './../components/users/factory/bill/Add'; 
import BillEdit from './../components/users/factory/bill/Edit';
import BillShow from './../components/users/factory/bill/Show';


import BillCollection from './../components/users/factory/bill/Collection';

//User App
import UserApp from "./../components/UserApp";
import UserAccess from "../components/users/users/access/List/UserAccess";
import RoleAccess from "../components/users/roles/access/List/RoleAccess";

class UserRoute extends Component {
    constructor(props) {
        super(props);
        const url = new URL(window.location.href);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps == this.props ||  nextState == this.state){
            return false; 
        }
        return true; 
    }

    render() {
        return (
          <Switch>
            <AuthRoute
              exact
              path={`${process.env.PUBLIC_URL}/`}
              render={() => {
                return <Redirect to={`${process.env.PUBLIC_URL}/login`} />;
              }}
            />
            {/* <AuthRoute exact path={`${process.env.PUBLIC_URL}/`} render={() => {
                    return (<Redirect to={`${process.env.PUBLIC_URL}/login`} />)
                }} /> */}
            <UserGuestRoute
              path={`${process.env.PUBLIC_URL}/login`}
              component={UserLogin}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/dashboard/apps`}
              component={UserApps}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/jobAgreementReport/:jobOrderId`}
              component={JobAgreementFormReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/jobInformationReport/:jobOrderId`}
              component={JobInformationReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/designFileReport/:jobOrderId`}
              component={DesignFileReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/designFileToFactoryReport/:fromDate/:toDate`}
              component={DesignFileToFactoryReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/designToDesignReport/:fromDate/:toDate`}
              component={DesignToDesignReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/productionReportDetailsReport/:fromDate/:toDate`}
              component={ProductionReportDetailsReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/dealerWiseJobFlowReport/:fromDate/:toDate`}
              component={DealerWiseJobFlowReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/customerWiseAnalysisReport/:fromDate/:toDate`}
              component={CustomerWiseAnalysisReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/customerWiseAnalysis/clientDetails/:clientId`}
              component={ClientDetails}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/progressReport/:fromDate/:toDate/:employeeId`}
              component={ProgressReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/jobFlowAnalysis/:fromDate/:toDate/:clientId`}
              component={JobFlowAnalysisReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/jobFlowAnalysisMarketingPersonWise/:fromDate/:toDate/:employeeId`}
              component={JobFlowAnalysisMarketingPersonWiseReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/analyticalJobInformationClientWise/:fromDate/:toDate/:clientId`}
              component={AnalyticalJobInformationClientWiseReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/analyticalJobInformationEmployeeWise/:fromDate/:toDate/:employeeId`}
              component={AnalyticalJobInformationEmployeeWiseReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/analyticalJobInformationPrinterWise/:fromDate/:toDate/:printerId`}
              component={AnalyticalJobInformationPrinterWiseReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/pendingJobInformation/:fromDate/:toDate/:employeeId`}
              component={PendingJobInformationReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/pendingSupplyInformation/:fromDate/:toDate/:employeeId/:pendingCategory`}
              component={PendingSupplyInformationReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/clientSummary/:fromDate/:toDate`}
              component={ClientSummaryReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/salesAndCollections/:fromDate/:toDate`}
              component={SalesAndCollectionsReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/branchWiseSalesCollection/:fromDate/:toDate/:branchId`}
              component={BranchWiseSalesCollectionReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/clientDetails/:fromDate/:toDate/:clientId`}
              component={ClientDetailsReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/printerWiseJobStatusDetails/:fromDate/:toDate/:printerId`}
              component={PrinterWiseJobStatusDetailsReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/marketingPersonWiseJobStatus/:month/:year/:employeeId`}
              component={MarketingPersonWiseJobStatusReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/baseSupplySchedule/:fromDate/:toDate/:clientId`}
              component={BaseSupplyScheduleReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/pendingbase/:fromDate/:toDate/:clientId`}
              component={PendingBaseReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/receivedbase/:fromDate/:toDate/:clientId`}
              component={ReceivedBaseReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/statusReport/:fromDate/:toDate/:status`}
              component={StatusReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/collectionAndDiscountDetails/:fromDate/:toDate/:status`}
              component={CollectionAndDiscountDetailsReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/designFileToFactoryReport/:fromDate`}
              component={DesignFileToFactoryReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/dailyDesignFileToFactoryReport/:date`}
              component={DailyDesignFileToFactoryReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/designToDesignReport/:fromDate`}
              component={DesignToDesignReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/baseCylinderOrder/:jobOrderId`}
              component={BaseCylinderOrderReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/previousBaseToStock/:jobOrderId`}
              component={PreviousBaseToStockReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/finishedCylinderStatus/:jobOrderId`}
              component={FinishedCylinderStatusReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/yearlyJobFlow/report/:report_type/:year/:cylinder_type`}
              component={YearlyJobFlowReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/clientStockReport/report/:client_id/:printer_id`}
              component={ClientStockReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/clientStockBalanceReport/report/:client_id/:printer_id`}
              component={ClientStockBalanceReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/monthlyJobFlow/report/:month/:year/:cylinder_type`}
              component={MonthlyJobFlowReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/monthlyProduction/report/:month/:year/:cylinder_type`}
              component={MonthlyProductionReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/dailyProduction/report/:date/:cylinder_type/:report_type`}
              component={DailyProductionReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/dailyJobFlowDetails/report/:job_date/:report_type`}
              component={DailyJobFlowDetailsReport}
            />

            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/print-previous-voucher-report`}
              component={PrintPreviousVoucherAction}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/transaction-posting-report-action`}
              component={TransactionPostingReportAction}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/trial-balance-report-action`}
              component={TrialBalanceReportAction}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/receipt-payment-report-action`}
              component={ReceiptPaymentsReportAction}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/cash-book-report-action`}
              component={CashBookReportAction}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/bank-book-report-action`}
              component={BankBookReportAction}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/ledger-query-report-action`}
              component={LedgerQueryReportAction}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/balance-sheet-report-action`}
              component={BalanceSheetReportAction}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/accounts-payable-report-action`}
              component={AccountsPayableReportAction}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/accounts-receivable-report-action`}
              component={AccountsReceivableReportAction}
            />
            {/* <UserAuthRoute
            /> */}
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/factoryProduction/:fromDate/:toDate`}
              component={FactoryProductionReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/grindingSchedule/:fromDate/:toDate`}
              component={GrindingScheduleReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/polishingSchedule/:fromDate/:toDate`}
              component={PolishingScheduleReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/platingSchedule/:fromDate/:toDate`}
              component={PlatingScheduleReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/engravingSchedule/:fromDate/:toDate`}
              component={EngravingScheduleReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/chromeSchedule/:fromDate/:toDate`}
              component={ChromeScheduleReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/engravingRemainingJobs/:fromDate/:toDate`}
              component={EngravingRemainingJobsReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/grindingRemainingJobs/:fromDate/:toDate`}
              component={GrindingRemainingJobsReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/polishingRemainingJobs/:fromDate/:toDate`}
              component={PolishingRemainingJobsReport}
            />
            <UserAuthRoute
              path={`${process.env.PUBLIC_URL}/platingRemainingJobs/:fromDate/:toDate`}
              component={PlatingRemainingJobsReport}
            />

            <Fragment>
              <UserApp>
                {/* <UserAuthRoute path={`${process.env.PUBLIC_URL}/dashboard/welcome`} component={UserDashboard} /> */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/master/:prefix`}
                  component={Master}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/userProfile`}
                  component={UserProfile}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/userCards`}
                  component={UserCards}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/company-profile`}
                  component={CompanyProfile}
                />{" "}
                {/* company means project */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/company-edit`}
                  component={CompanyProfileEdit}
                />{" "}
                {/* company means project */}
                {/* USER PROFILE */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/userEdit`}
                  component={UserEdit}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/userChangeImage`}
                  component={UserChangeImage}
                />
                {/* USER DESIGNATION */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/designation/index`}
                  component={UserDesignation}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/user-designation/add`}
                  component={UserDesignationAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/user-designation/edit/:designationId`}
                  component={UserDesignationEdit}
                />
                {/* User Employee */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/user-employee/list`}
                  component={UserEmployee}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/user-employee/add`}
                  component={UserEmployeeAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/user-employee/edit/:employeeId`}
                  component={UserEmployeeEdit}
                />
                {/* USER LAYOUTS */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/layouts/list`}
                  component={LayoutsList}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/layouts/add`}
                  component={LayoutsAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/layouts/edit/:layoutsId`}
                  component={LayoutsEdit}
                />
                {/* users list  */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/users/index`}
                  component={SoftwareUserList}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/users/add`}
                  component={CreateSoftwareUser}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/users/edit/:userId`}
                  component={EditSoftwareUser}
                />
                {/* users access link  */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/user-access-link/:userId`}
                  component={UserAccess}
                />
                {/* roles access link  */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/role-access-link/:roleId`}
                  component={RoleAccess}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/role/add`}
                  component={CreateSoftwareRole}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/role/edit/:roleId`}
                  component={EditSoftwareRole}
                />
                {/* USER DEPARTMENT */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/department/index`}
                  component={UserDepartment}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/user-department/add`}
                  component={UserDepartmentAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/user-department/edit/:departmentId`}
                  component={UserDepartmentEdit}
                />
                {/* SERVICE CATEGORY */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/service-category/list`}
                  component={ServiceCategory}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/service-category/add`}
                  component={ServiceCategoryAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/service-category/edit/:serviceCategoryId`}
                  component={ServiceCategoryEdit}
                />
                {/* CLIENT INFORMATION */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/clientInformation/index`}
                  component={ClientInformation}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/clientInformation/add`}
                  component={ClientInformationAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/clientInformation/edit/:clientInfoId`}
                  component={ClientInformationEdit}
                />
                {/* PRINTERS */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/printers/index`}
                  component={Printers}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/printers/add`}
                  component={PrintersAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/printers/edit/:printersId`}
                  component={PrintersEdit}
                />
                {/* ROLES */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/role/index`}
                  component={Roles}
                />
                {/* SUPPLIER INFORMATION */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/supplierInformation/index`}
                  component={SupplierInformation}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/supplierInformation/add`}
                  component={SupplierInformationAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/supplierInformation/edit/:supplierInfoId`}
                  component={SupplierInformationEdit}
                />
                {/* EMPLOYEE INFORMATION */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/employeeInformation/index`}
                  component={EmployeeInformation}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/employeeInformation/add`}
                  component={EmployeeInformationAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/employeeInformation/edit/:employeeInformationId`}
                  component={EmployeeInformationEdit}
                />
                {/* BRANCHES */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/branches/index`}
                  component={Branches}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/branches/add`}
                  component={BranchesAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/branches/edit/:id`}
                  component={BranchesEdit}
                />
                {/* JOB CLASS */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/jobClass/index`}
                  component={JobClass}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/jobClass/add`}
                  component={JobClassAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/jobClass/edit/:jobClassId`}
                  component={JobClassEdit}
                />
                {/* JOB SUB CLASS */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/jobSubClass/index`}
                  component={JobSubClass}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/jobSubClass/add`}
                  component={JobSubClassAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/jobSubClass/edit/:jobSubClassId`}
                  component={JobSubClassEdit}
                />
                {/* COLOR */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/color/index`}
                  component={Color}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/color/add`}
                  component={ColorAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/color/edit/:colorId`}
                  component={ColorEdit}
                />
                {/* Design Machine Location */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/designMachineLocation/index`}
                  component={DesignMachineLocation}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/designMachineLocation/add`}
                  component={DesignMachineLocationAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/designMachineLocation/edit/:designMachineLocationId`}
                  component={DesignMachineLocationEdit}
                />
                {/* TANK CONFIG */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/tankConfig/index`}
                  component={TankConfig}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/tankConfig/add`}
                  component={TankConfigAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/tankConfig/edit/:tankId`}
                  component={TankConfigEdit}
                />
                {/* SUPPLY CHAIN START */}
                {/* JOB ORDER */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/jobOrder/index`}
                  component={JobOrder}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/jobOrder/add`}
                  component={JobOrderAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/jobOrder/edit/:id`}
                  component={JobOrderEdit}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/jobOrder/show/:id`}
                  component={JobOrderShow}
                />
                {/* TEST */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/test/index`}
                  component={Test}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/test/add`}
                  component={TestAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/test/edit/:id`}
                  component={TestEdit}
                />
                {/* Client Stock */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/clientStock/index`}
                  component={ClientStock}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/clientStock/add`}
                  component={ClientStockAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/clientStock/edit/:id`}
                  component={ClientStockEdit}
                />
                {/* Del Stock */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/delStock/index`}
                  component={DelStock}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/delStock/add`}
                  component={DelStockAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/delStock/edit/:id`}
                  component={DelStockEdit}
                />
                {/* Cancel Order */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/CancelOrder/index`}
                  component={CancelOrderList}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/CancelOrder/add`}
                  component={CancelOrderAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/CancelOrder/edit/:id`}
                  component={CancelOrderEdit}
                />
                {/* JOB AGREEMENT */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/jobAgreement/index`}
                  component={JobAgreement}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/jobAgreement/add`}
                  component={JobAgreementAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/jobAgreement/edit/:id`}
                  component={JobAgreementEdit}
                />
                {/* BASE ORDER */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/baseOrder/index`}
                  component={BaseOrderList}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/baseOrder/add`}
                  component={BaseOrderAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/baseOrder/edit/:baseOrderId`}
                  component={BaseOrderEdit}
                />
                {/* BASE RECEIVE */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/baseReceive/index`}
                  component={BaseReceiveList}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/baseReceive/add`}
                  component={BaseReceiveAdd}
                />
                {/* DESIGN TO DESIGN */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/designToDesign/index`}
                  component={DesignToDesignList}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/designToDesign/add`}
                  component={DesignToDesignAdd}
                />
                {/* DESIGN TO FACTORY */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/designToFactory/index`}
                  component={DesignToFactoryList}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/designToFactory/add`}
                  component={DesignToFactoryAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/designToFactory/edit/:designId`}
                  component={DesignToFactoryEdit}
                />
                {/* MARKETING REPORTS */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/jobAgreementForm/index`}
                  component={JobAgreementForm}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/jobInformation`}
                  component={JobInformation}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/jobFlowAnalysis`}
                  component={JobFlowAnalysis}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/jobFlowAnalysisMarketingPersonWise`}
                  component={JobFlowAnalysisMarketingPersonWise}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/dealerWiseJobFlow`}
                  component={DealerWiseJobFlowForm}
                />
                {/* JOB INFORMATION REPORT */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/analyticalJobInformationClientWise`}
                  component={AnalyticalJobInformationClientWise}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/analyticalJobInformationEmployeeWise`}
                  component={AnalyticalJobInformationEmployeeWise}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/analyticalJobInformationPrinterWise`}
                  component={AnalyticalJobInformationPrinterWise}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/pendingJobInformation`}
                  component={PendingJobInformation}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/pendingSupplyInformation`}
                  component={PendingSupplyInformation}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/clientSummary`}
                  component={ClientSummaryForm}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/clientDetails`}
                  component={ClientDetailsForm}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/printerWiseJobStatusDetails`}
                  component={PrinterWiseJobStatusDetails}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/marketingPersonWiseJobStatus`}
                  component={MarketingPersonWiseJobStatus}
                />
                {/* SUPPLY CHAIN REPORTS */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/designFile/index`}
                  component={DesignFile}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/designFileToFactoryForm/index`}
                  component={DesignFileToFactoryForm}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/dailyDesignFileToFactoryForm/index`}
                  component={DailyDesignFileToFactoryForm}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/designToDesignSection`}
                  component={DesignToDesignReportForm}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/productionReportDetails`}
                  component={ProductionReportDetailsForm}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/customerWiseAnalysis`}
                  component={CustomerWiseAnalysisForm}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/progressReport`}
                  component={ProgressReportForm}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/statusReport`}
                  component={StatusReportForm}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/baseCylinderOrder`}
                  component={BaseCylinderOrderForm}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/previousBaseToStock`}
                  component={PreviousBaseToStockForm}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/finishedCylinderStatus`}
                  component={FinishedCylinderStatusForm}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/yearlyJobFlow`}
                  component={YearlyJobFlowForm}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/clientStockReport`}
                  component={ClientStockForm}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/clientStockBalanceReport`}
                  component={ClientStockBalanceForm}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/monthlyJobFlow`}
                  component={MonthlyJobFlowForm}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/monthlyProduction`}
                  component={MonthlyProductionForm}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/dailyProduction`}
                  component={DailyProductionForm}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/dailyJobFlowDetails`}
                  component={DailyJobFlowDetailsForm}
                />
                {/* SCHEDULE REPORT */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/baseSupplySchedule`}
                  component={BaseSupplySchedule}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/pendingbase`}
                  component={PendingBase}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/receivedbase`}
                  component={ReceivedBase}
                />
                {/* JOB MANAGEMENT REPORT */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/salesAndCollections`}
                  component={SalesAndCollectionsForm}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/branchWiseSalesCollection`}
                  component={BranchWiseSalesCollectionForm}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/collectionAndDiscountDetails`}
                  component={CollectionAndDiscountDetailsForm}
                />
                {/* FACTORY REPORT */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/factoryProduction`}
                  component={FactoryProductionForm}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/grindingSchedule`}
                  component={GrindingScheduleForm}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/polishingSchedule`}
                  component={PolishingScheduleForm}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/platingSchedule`}
                  component={PlatingScheduleForm}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/engravingSchedule`}
                  component={EngravingScheduleForm}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/engravingRemainingJobs`}
                  component={EngravingRemainingJobsForm}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/chromeSchedule`}
                  component={ChromeScheduleForm}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/grindingRemainingJobs`}
                  component={GrindingRemainingJobsForm}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/polishingRemainingJobs`}
                  component={PolishingRemainingJobsForm}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/platingRemainingJobs`}
                  component={PlatingRemainingJobsForm}
                />
                {/* accounts  */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/chartOfAccounts/index`}
                  component={chartOfAccounts}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/bill_configuration/index`}
                  component={BillConfig} 
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/chartOfAccounts/add`}
                  component={chartOfAccountsAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/chartOfAccounts/edit/:chartOfAccountsId`}
                  component={chartOfAccountsEdit}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/accConfiguration/index`}
                  component={accConfiguration}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/batch/index`}
                  component={batch}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/payment-voucher/index`}
                  component={paymentVoucher}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/received-voucher/index`}
                  component={receivedVoucher}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/bank-payment/index`}
                  component={bankPaymentdVoucher}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/bank-receive/index`}
                  component={bankReceiveddVoucher}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/journal-voucher/index`}
                  component={journalVoucher}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/payment-voucher/edit/:id`}
                  component={BatchPaymentVoucherEdit}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/received-voucher/edit/:id`}
                  component={BatchReceiveVoucherEdit}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/bank-payment/edit/:id`}
                  component={BatchBankPaymentEdit}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/bank-receive/edit/:id`}
                  component={BatchBankReceiveEdit}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/journal-voucher/edit/:id`}
                  component={JournalVoucherEdit}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/print-previous-voucher/index`}
                  component={PrintPreviousVoucher}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/transaction-posting-report`}
                  component={TransactionPosting}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/trial-balance`}
                  component={TrialBalance}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/receipts-payments`}
                  component={ReceiptPayments}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/cash-book`}
                  component={CashBook}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/bank-book`}
                  component={BankBook}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/ledger-query`}
                  component={LedgerQuery}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/balance-sheet`}
                  component={BalanceSheet}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/accounts-payable`}
                  component={AccountsPayable}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/accounts-receivable`}
                  component={AccountsReceivable}
                />
                {/* ------- SCHEDULE START ------- */}
                 {/* Design Layout */}
                <UserAuthRoute 
                  path={`${process.env.PUBLIC_URL}/designLayout/index`}
                  component={DesignLayoutList}
                />
                <UserAuthRoute
                   path={`${process.env.PUBLIC_URL}/designLayout/add`} 
                   component={DesignLayoutAdd}/>
                <UserAuthRoute 
                  path={`${process.env.PUBLIC_URL}/designLayout/edit/:job_no`}
                  component={DesignLayoutEdit} 
                />
                 {/* GRINDING */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/grinding/index`}
                  component={GrindingList}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/grinding/add`}
                  component={GrindingAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/grinding/edit/:jobOrderJobNo`}
                  component={GrindingEdit}
                />
                {/* BACK OFFICE SETUP START  */}
                {/* GRINDING MACHINE */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/machine/index`}
                  component={MachineList}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/machine/add`}
                  component={MachineAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/machine/edit/:machineId`}
                  component={MachineEdit}
                />
                {/* POLISHING MACHINE */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/polishMachine/index`}
                  component={PolishingMachineList}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/polishMachine/add`}
                  component={PolishingMachineAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/polishMachine/edit/:polishMachineId`}
                  component={PolishingMachineEdit}
                />
                {/* PLATING SHIFTING */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/shiftControl/index`}
                  component={DigShiftEdit}
                />
                {/* PLATING DEPARTMENT */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/platingDept/index`}
                  component={PlatingDeptList}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/platingDept/add`}
                  component={PlatingDeptAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/platingDept/edit`}
                  component={PlatingDeptEdit}
                />
                {/* POLISHING */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/polishing/index`}
                  component={PolishingList}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/polishing/add`}
                  component={PolishingAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/polishing/edit/:dig_polishing_cylinder_id`}
                  component={PolishingEdit}
                />
                {/* ENGRAVING */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/engraving/index`}
                  component={EngravingList}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/engraving/add`}
                  component={EngravingAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/engraving/edit/:dig_engravings_cylinder_id`}
                  component={EngravingEdit}
                />
                {/* CHROME */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/chrome/index`}
                  component={ChromeList}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/chrome/add`}
                  component={ChromeAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/chrome/edit`}
                  component={ChromeEdit}
                />
                {/* QUALITY CONTROL */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/qualityControl/index`}
                  component={QualityControlList}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/qualityControl/add`}
                  component={QualityControlAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/qualityControl/edit/:job_order_pk_id`}
                  component={QualityControlEdit}
                />
                {/* DE-CHROME */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/de-chrome/index`}
                  component={DeChromeList}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/de-chrome/add`}
                  component={DeChromeAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/de-chrome/edit`}
                  component={DeChromeEdit}
                />
                {/* Challan */}
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/challan/index`}
                  component={Challan}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/challan/add`}
                  component={ChallanAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/challan/edit/:challanId`}
                  component={ChallanEdit}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/challan/show/:challanId`}
                  component={ChallaShow}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/bill/index`}
                  component={Bill}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/bill/add`}
                  component={BillAdd}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/bill/edit/:challanId`}
                  component={BillEdit}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/bill/show/:challanId`}
                  component={BillShow}
                />
                <UserAuthRoute
                  path={`${process.env.PUBLIC_URL}/bill_collection`}
                  component={BillCollection}
                />
              </UserApp>
            </Fragment>
          </Switch>
        );
    }
}

export default withRouter(UserRoute);