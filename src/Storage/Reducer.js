// Reducer.js

import AppConstants from './AppConstants';

const initialState = {
  authData: "", // or your initial auth state
  countryData: null,
  phoneNumber: "",
  // assuming countryData is an object or an array
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AppConstants.AsyncKeyLiterals.IS_AUTH:
      return {
        ...state,
        authData: action.Data,
      };
    case AppConstants.AsyncKeyLiterals.UPDATE_COUNTRY_DATA:
      return {
        ...state,
        countryData: action.countryData,
      };
    case AppConstants.AsyncKeyLiterals.UPDATE_COUNTRY_CODE:
      return {
        ...state,
        countryCode: action.countryCode,
      };
    case AppConstants.AsyncKeyLiterals.UPDATE_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: action.phoneNumber,
      };
    default:
      return state;
  }
};
