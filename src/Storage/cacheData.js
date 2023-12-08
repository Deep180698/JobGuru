import AsyncStorage from '@react-native-async-storage/async-storage';
import AppConstants from './AppConstants';

const getDataFromCachedWithKey = (key) => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(key)
            .then((res) => {
                if (res !== null) {
                    resolve(JSON.parse(res));
                } else {
                    resolve(false);
                }
            })
            .catch((err) => reject(err));
    });
};
const saveDataToCachedWithKey = (key, data) => {
    AsyncStorage.setItem(key, JSON.stringify(data));
};
const token = (key, data) => {
    AsyncStorage.setItem(key, JSON.stringify(data));
};
const removeDataFromCachedWithKey = (key) => {
    AsyncStorage.removeItem(key);
};
const removeAllDataFromCache = () => {
    const arrExcludeValues = [AppConstants.AsyncKeyLiterals.isLoggedIn,AppConstants.AsyncKeyLiterals.IS_AUTH];
    arrExcludeValues.map(item => {
        AsyncStorage.removeItem(item);
    });

};
export  default { getDataFromCachedWithKey, token,saveDataToCachedWithKey, removeDataFromCachedWithKey, removeAllDataFromCache }