export enum ActionType {
  CORE_NOPE = 'CORE_NOPE',
  CORE_RESET_STATE = 'CORE_RESET_STATE',
  CORE_LOADER = 'CORE_LOADER',
  CORE_CANCELLATION = 'CORE_CANCELLATION',
  CORE_ROUTER_PUSH = 'CORE_ROUTER_PUSH',
  CORE_ROUTER_GOBACK = 'CORE_ROUTER_GOBACK',

  COMMON_AUTH_LOGINASYNC = 'COMMON_AUTH_LOGINASYNC',

  CONFIG_WIDGET_SETPAGE = 'CONFIG_WIDGET_SETPAGE',
  CONFIG_WIDGET_SETITEM = 'CONFIG_WIDGET_SETITEM',
  CONFIG_WIDGET_GETPAGEASYNC = 'CONFIG_WIDGET_GETPAGEASYNC',
  CONFIG_WIDGET_GETITEMASYNC = 'CONFIG_WIDGET_GETITEMASYNC',
  CONFIG_WIDGET_SAVEASYNC = 'CONFIG_WIDGET_SAVEASYNC',

  COMMON_AUTH_SETFORM = 'COMMON_AUTH_SETFORM',
  COMMON_AUTH_SETAUTHINFO = 'COMMON_AUTH_SETAUTHINFO',

  COMMON_COMPANIES_GETPAGEASYNC = 'COMMON_COMPANIES_GETPAGEASYNC',
  COMMON_COMPANIES_SAVECOMPANYASYNC = 'COMMON_COMPANIES_SAVECOMPANYASYNC',
  COMMON_COMPANIES_SETPAGE = 'COMMON_COMPANIES_SETPAGE',
  COMMON_COMPANIES_DELETECOMPANYONPAGE = 'COMMON_COMPANIES_DELETECOMPANYONPAGE',
  COMMON_COMPANIES_SETCOMPANYFULL = 'COMMON_COMPANIES_SETCOMPANYFULL',
  COMMON_COMPANIES_SETALLDOCUMENTS = 'COMMON_COMPANIES_SETALLDOCUMENTS',
  COMMON_COMPANIES_DELETECOMPANYASYNC = 'COMMON_COMPANIES_DELETECOMPANYASYNC',
  COMMON_COMPANIES_GETALLDOCUMENTSASYNC = 'COMMON_COMPANIES_GETALLDOCUMENTSASYNC',
  COMMON_COMPANIES_GETCOMPANYFULLASYNC = 'COMMON_COMPANIES_GETCOMPANYFULLASYNC',

  COMMON_DOCUMENTS_SETPAGE = 'COMMON_DOCUMENTS_SETPAGE',
  COMMON_DOCUMENTS_GETPAGEASYNC = 'COMMON_DOCUMENTS_GETPAGEASYNC',
  COMMON_DOCUMENTS_SAVEDOCUMENTASYNC = 'COMMON_DOCUMENTS_SAVEDOCUMENTASYNC',
  COMMON_DOCUMENTS_DELETEDOCUMENTASYNC = 'COMMON_DOCUMENTS_DELETEDOCUMENTASYNC',
  COMMON_DOCUMENTS_DELETEDOCUMENTONPAGE = 'COMMON_DOCUMENTS_DELETEDOCUMENTONPAGE',
  COMMON_DOCUMENTS_ADDDOCUMENTONPAGE = 'COMMON_DOCUMENTS_ADDDOCUMENTONPAGE',
  COMMON_DOCUMENTS_SETDOCUMENTFULL = 'COMMON_DOCUMENTS_SETDOCUMENTFULL',
  COMMON_DOCUMENTS_GETDOCUMENTFULLASYNC = 'COMMON_DOCUMENTS_GETDOCUMENTFULLASYNC',
  COMMON_DOCUMENTS_SETCREATORFORM = 'COMMON_DOCUMENTS_SETCREATORFORM',
  COMMON_DOCUMENTS_SETVISIBLECREATORFORM = 'COMMON_DOCUMENTS_SETVISIBLECREATORFORM',
  COMMON_DOCUMENTS_SETCOMPANIESIDS = 'COMMON_DOCUMENTS_SETCOMPANIESIDS',
  COMMON_DOCUMENTS_GETALLCOMPANIESASYNC = 'COMMON_DOCUMENTS_GETALLCOMPANIESASYNC',
  COMMON_DOCUMENTS_SETCOMPANIES = 'COMMON_DOCUMENTS_SETCOMPANIES',
  COMMON_DOCUMENTS_SETCREATORFORMBYID = 'COMMON_DOCUMENTS_SETCREATORFORMBYID'
}
