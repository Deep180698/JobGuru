import AppConstants from './AppConstants'

const authFunc = (item) => {
    return {
        type: AppConstants.AsyncKeyLiterals.IS_AUTH,
        Data: item,
        token: item.token,
    }
}
const updateCountryData = (data) => ({
    type: AppConstants.AsyncKeyLiterals.UPDATE_COUNTRY_DATA,
    countryData: data,
  });
const updateCountryCode = (data) => ({
    type: AppConstants.AsyncKeyLiterals.UPDATE_COUNTRY_CODE,
    countryCode: data,
  });
const updatePhoneNumber = (data) => ({
    type: AppConstants.AsyncKeyLiterals.UPDATE_PHONE_NUMBER,
    phoneNumber: data,
  });

export {authFunc,updateCountryData,updateCountryCode,updatePhoneNumber}