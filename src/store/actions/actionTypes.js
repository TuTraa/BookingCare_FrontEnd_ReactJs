const actionTypes = Object.freeze({
  //app
  APP_START_UP_COMPLETE: "APP_START_UP_COMPLETE",
  SET_CONTENT_OF_CONFIRM_MODAL: "SET_CONTENT_OF_CONFIRM_MODAL",
  CHANGE_LANGUE: "CHANGE_LANGUE",

  //user
  ADD_USER_SUCCESS: "ADD_USER_SUCCESS",
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAIL: "USER_LOGIN_FAI",
  PROCESS_LOGOUT: "PROCESS_LOGOUT",

  //admin
  FETCH_GENDER_START: "FETCH_GENDER_START",
  FETCH_GENDER_SUCCESS: "FETCH_GENDER_SUCCESS",
  FETCH_GENDER_FAILED: "FETCH_GENDER_FAILED",

  FETCH_POSITION_START: "FETCH_POSITION_START",
  FETCH_POSITION_SUCCESS: "FETCH_POSITION_SUCCESS",
  FETCH_POSITION_FAILED: "FETCH_POSITION_FAILED",

  FETCH_ROLE_START: "FETCH_ROLE_START",
  FETCH_ROLE_SUCCESS: "FETCH_ROLE_SUCCESS",
  FETCH_ROLE_FAILED: "FETCH_ROLE_FAILED",


  CREATE_USER_SUCCESS: 'SAVE_USER_SUCCESS',
  CREATE_USER_FAILED: 'SAVE_USER_FAILED',

  GET_ALL_USER_SUCCESS: 'GET_ALL_USER_SUCCESS',
  GET_ALL_USER_FAILED: 'GET_ALL_USER_FAILED',

  EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',
  EDIT_USER_FAILED: 'EDIT_USER_FAILED',

  DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
  DELETE_USER_FAILED: 'DELETE_USER_FAILED',

  FETCH_TOP_DOCTORS_SUCCESS: 'FETCH_TOP_DOCTORS_SUCCESS',
  FETCH_TOP_DOCTORS_FAILDED: 'FETCH_TOP_DOCTORS_FAILDED',

  FETCH_All_DOCTORS_SUCCESS: 'FETCH_All_DOCTORS_SUCCESS',
  FETCH_All_DOCTORS_FAILDED: 'FETCH_All_DOCTORS_FAILDED',

  SAVE_ACTION_DOCTOR_SUCCESS: 'SAVE_ACTION_DOCTOR_SUCCESS',
  SAVE_ACTION_DOCTOR_FAILDED: 'SAVE_ACTION_DOCTOR_FAILDED',

  FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS: 'FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS',
  FETCH_ALLCODE_SCHEDULE_TIME_FAILED: 'FETCH_ALLCODE_SCHEDULE_TIME_FAILED',

  GET_REQUIRED_DOCTOR_INFOR_START: "GET_REQUIRED_DOCTOR_INFOR_START",
  GET_REQUIRED_DOCTOR_INFOR_SUCCESS: "GET_REQUIRED_DOCTOR_INFOR_SUCCESS",
  GET_REQUIRED_DOCTOR_INFOR_FAILED: "GET_REQUIRED_DOCTOR_INFOR_FAILED",
});

export default actionTypes;
