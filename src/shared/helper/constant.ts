const DATE_FORMAT = {
  YYYY_MM_DD_HH_MM_SS: 'YYYY-MM-DD HH:mm:ss',
  YYYY_MM_DD: 'YYYY-MM-DD',
  DD_MM_YYYY: 'DD-MM-YYYY',
};

const USER_STATUS = {
  PENDING: 1,
  ACTIVATED: 2,
  BLOCKED: 3,
};

const ROLE_MAP = {
  CUSTOMER: 'CUSTOMER',
  EMPLOYEE: 'EMPLOYEE',
  ADMIN: 'ADMIN',
  SHIPPER: 'SHIPPER',
};

const SYSTEM_CONFIG_KEY = {
  MAIL_SERVER: 'mail_server',
  APP_LAYOUT_LOGO: 'logo_url',
};

const SYSTEM_CONFIG_GROUP_KEY = {
  MAIL_TEMPLATE_GROUP: 'mail_template_group',
  CODE_SEQUENCE_GROUP: 'code_sequence_group',
  EASY_SIGN_GROUP: 'easy_sign_group',
  SIGN_LOCATION: 'sign_location_group',
  APP_LAYOUT: 'app_layout_group',
};
const ROLE_DEFAULT_ID = 10;

export {
  USER_STATUS,
  ROLE_MAP,
  SYSTEM_CONFIG_KEY,
  SYSTEM_CONFIG_GROUP_KEY,
  DATE_FORMAT,
  ROLE_DEFAULT_ID,
};
