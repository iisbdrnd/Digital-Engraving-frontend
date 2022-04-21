//ME
export const UserMe = 'api/user/me';
//LOGIN
export const UserLoginPost = 'api/user/postLogin';
//APPS
export const UserApps = 'api/user/apps';
//MASTER
export const PreMaster = 'api/user/pre-master';
//PROFILE INFO
export const ProfileInfo = 'api/user/company-profile';
export const ProfileInfoUpdate = 'api/user/company-profile-update';
//USER DESIGNATION
export const UserDesignation = 'api/user/user-designation';
//USER DEPARTMENT
export const UserDepartment = 'api/user/user-department';
//SERVICE CATEGORY
export const ServiceCategory = 'api/user/service-category';
//USER Employee
export const UserEmployee = 'api/user/user-employee';
//CHAIN
export const Chain = 'api/user/chain';

export const userMenuList = 'api/user/userMenuList';

export const softWareMenus = 'api/user/software-menus';

export const userHasAccess = 'api/user/userHasAccess';

//JOB CLASS
export const jobClassAPI = 'api/user/jobClass';
// export const activeChangeJobClass = 'api/user/activeChangeJobClass';

//JOB SUB CLASS
export const jobSubClassAPI = 'api/user/jobSubClass';

//BRANCH
export const branches = 'api/user/branches';

//CLIENT INFORMATION
export const clientInformation = 'api/user/clientInformation';

//EMPLOYEE INFORMATION
export const employeeInformation = 'api/user/employeeInformation';
//JOB ORDER
export const JOB_ORDER_RSURL = 'api/user/jobOrder';

//JOB ORDER
export const JOB_AGREEMENT_RSURL = 'api/user/jobAgreement';
export const JOB_ORDER_DETAILS = 'api/user/jobOrderDetails';
//BASE ORDER
export const BASE_ORDER_RSURL = 'api/user/baseOrder';
//PRINTERS
export const printersAPI = 'api/user/printers';

//Custom Menus
export const customMenuAPI = 'api/user/custom-menu';

//SUPPLIER INFORMATION
export const supplierInformationAPI = 'api/user/supplierInformation';

//COLOR
export const colorAPI = 'api/user/color';
//DESIGN MACHINE LOCATION
export const DESIGN_MACHINE_LOCATION = 'api/user/designMachineLocation';

//BASE ORDER
export const BASE_RECEIVE_RSURL = 'api/user/baseReceive';

//DESIGN TO DESIGN
export const DESIGN_TO_DESIGN_RSURL = 'api/user/designToDesign';

//DESIGN TO FACTORY
export const DESIGN_TO_FACTORY_RSURL = 'api/user/designToFactory';

//accounts api
export const chartOfAccountAPI = 'api/user/chartOfAccounts';
export const chartOfAccMainCodeAPI = 'api/user/chartOfAccMainCodeAPI';
export const chartOfAccGeneralCodeAPI = 'api/user/chartOfAccGeneralCodeAPI';
export const chartOfAccControlCodeAPI = 'api/user/chartOfAccControlCodeAPI';
export const chartOfAccSubsidiaryCodeAPI = 'api/user/chartOfAccSubsidiaryCodeAPI';
export const chartOfAccCodeAPI = 'api/user/chartOfAccounts';

export const accConfigurationAPI = 'api/user/accConfiguration';
export const projectAccountCodeAPI = 'api/user/projectAccountCode';

export const batchAPI = 'api/user/batch';

export const batchTransferAPI = 'api/user/batchTransfer';

export const paymentVoucherAPI = 'api/user/paymentVoucher';

export const receivedVoucherAPI = 'api/user/receivedVoucher';
export const bankPaymentVoucherAPI = 'api/user/bankPaymentVoucher';
export const bankReceivedVoucherAPI = 'api/user/bankReceiveVoucher';
export const journalVoucherAPI = 'api/user/journalVoucher';

export const printPreviousVoucherActionApi = 'api/user/printPreviousVoucherAction';
export const TransactionPostingReportActionApi = 'api/user/TransactionPostingReportAction';
export const TrialBalanceReportActionApi = 'api/user/TrialBalanceReportAction';

export const PaymentReceiptsList = 'api/user/PaymentReceiptsList';
export const PaymentReceiptseReportActionApi = 'api/user/PaymentReceiptReportAction';

export const cashBookList = 'api/user/CashBookList';
export const cashBookReportActionApi = 'api/user/cashBookReportAction';

export const bankBookList = 'api/user/bankBookList';
export const bankBookReportActionApi = 'api/user/bankBookReportAction';

export const ledgerQueryList = 'api/user/ledgerQuerykList';
export const ledgerQueryReportActionApi = 'api/user/ledgerQueryReportAction';

export const BalanceSheetList = 'api/user/BalanceSheetList';
export const BalanceSheetReportActionApi = 'api/user/BalanceSheetReportAction';

export const AccountsPayableList = 'api/user/AccountsPayableList';
export const AccountsPayableReportActionApi = 'api/user/AccountsPayableReportAction';

export const AccountsReceivableList = 'api/user/AccountsReceivableList';
export const AccountsReceivableReportActionApi = 'api/user/AccountsReceivableReportAction';


//------ FACTORY START------//

//GRINDING
export const GRINDING_RSURL = 'api/user/grinding';
export const GRINDING_JOB_ORDER_DETAILS = 'api/user/jobOrderDetailsFromGrinding';
export const GET_EMPLOYEE_BY_SHIFT = 'api/user/getEmployeeByShift';
//GRINDING MACHINE
export const MACHINE_RSURL = 'api/user/machine';
//POLISHING MACHINE
export const POLISHING_MACHINE_RSURL = 'api/user/polishingMachine';
//TANK CONFIG
export const TANK_CONFIG_RSURL = 'api/user/tankConfig';

//DIG SHIFT
export const DIG_SHIFT_RSURL = 'api/user/digShift';

//PLATING DEPT
export const PLATING_DEPT_RSURL = 'api/user/platingDept';
export const CHECK_PLATING_CYL_EXIST_OR_NOT = 'api/user/checkPlatingCylExistOrNot';
export const JOB_DATA_FROM_PLATING_DEPT = 'api/user/jobDataFromPlatingDept';
export const TANK_SCHEDULE_DETAILS = 'api/user/tankScheduleDetails';
export const PLATING_SCHEDULE_START_CYCLE = 'api/user/platingScheduleStartCycle';
// ENGRAVING MENU
// export const ENGRAVING_RSURL = 'api/user/engraving';
export const JOB_WISE_ENGRAVE_CYLINDERS = 'api/user/getJobWiseEngraveCylinders';

// START MARKETING REPORT
export const JOB_AGREEMENT_REPORT = 'api/user/jobAgreementReport';
export const DESIGN_FILE_REPORT = 'api/user/designFileReport';
export const DESIGN_FILE_TO_FACTORY_REPORT = 'api/user/designFileToFactoryReport';
export const DESIGN_TO_DESIGN_REPORT = 'api/user/designToDesignReport';
export const BASE_CYLINDER_ORDER_REPORT = 'api/user/baseCylinderOrderReport';
export const YEARLY_JOB_FLOW_REPORT = 'api/user/yearlyJobFlow';
export const MONTHLY_JOB_FLOW_REPORT = 'api/user/monthlyJobFlow';
export const DAILY_JOB_FLOW_DETAILS_REPORT = 'api/user/dailyJobFlowDetails';

// END MARKETING REPORT

//POLISHING
export const POLISHING_RS_URL = 'api/user/polishing';
export const POLISHING_GET_POLISHING_DATA_BY_JOB_ID= 'api/user/getPolishingDataByJobId';
export const GET_POLISHING_DATA_BY_POLISHING_PK_ID= 'api/user/getPolishingDataByPolishingPkId';

//ENGRAVING
export const ENGRAVING_RS_URL = 'api/user/engraving';
export const GET_ENGRAVING_DATA_BY_JOB_ID= 'api/user/getEngraveDataByJobId';

//CHROME
export const CHROME_RS_URL = 'api/user/chrome';
export const GET_CYLINDERS_BY_JOB_ID= 'api/user/getCylindersByJobId';
export const CHROME_TANK_SCHEDULE_DETAILS = 'api/user/chromeTankScheduleDetails';
export const CHECK_CHROME_CYL_EXIST_OR_NOT= 'api/user/checkChromeCylExistOrNot';
export const CHROME_SCHEDULE_START_CYCLE = 'api/user/chromeScheduleStartCycle';

//QUALITY CONTROL
export const QUALITY_CONTROL_RS_URL = 'api/user/qualityControl';
export const QUALITY_CONTROL_JOB_DATA_BY_JOB_ID = 'api/user/qualityControlJobDataByJobId';

//DE-CHROME
export const DE_CHROME_RS_URL = 'api/user/deChrome';
export const GET_DE_CHROME_CYLINDERS_BY_JOB_ID = 'api/user/getDeChromeCylindersByJobId';
export const DE_CHROME_TANK_SCHEDULE_DETAILS = 'api/user/deChromeTankScheduleDetails';
export const CHECK_DE_CHROME_CYL_EXIST_OR_NOT= 'api/user/checkDeChromeCylExistOrNot';
export const DE_CHROME_SCHEDULE_START_CYCLE = 'api/user/deChromeScheduleStartCycle';


// Challan
export const challanAPI = 'api/user/challan';
export const filterJobOrderChallanAPI = 'api/user/filterJobOrderChallanAPI';
export const ShowJobOrderChallanAPI = 'api/user/ShowJobOrderChallanAPI';

//bill
export const billAPI = 'api/user/bill';
export const filterJobOrderBillAPI = 'api/user/filterJobOrderBillAPI';
export const ShowJobOrderBillAPI = 'api/user/ShowJobOrderBillAPI';

export const collectionFromApi = 'api/user/collectionFromApi';
export const getClientDetails = 'api/user/getClientDetailsApi';
export const submitCollectionApi = 'api/user/submitCollectionApi';