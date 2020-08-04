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
  COMMON_COMPANIES_SETPAGE = 'COMMON_COMPANIES_SETPAGE'
  //COMMON_COMPANIES_SETPAGENUMBER = 'COMMON_COMPANIES_SETPAGENUMBER',
  //COMMON_COMPANIES_SETPAGESIZE = 'COMMON_COMPANIES_SETPAGESIZE'
}
