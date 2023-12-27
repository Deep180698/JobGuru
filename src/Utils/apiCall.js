import axios from 'axios';
import AppConstants from '../Storage/AppConstants';


const apiPOSTCall = async (endpoint, data = null,headers) => {
    try {
        const apiUrl = AppConstants.AsyncKeyLiterals.Base_URL + endpoint;
        const response = await axios.post(apiUrl, data, headers);
        return response.data
        // Handle the response data as needed
    } catch (error) {
        console.error('Error:', error.message);
        // Handle errors
    }
};

const apiGETCall = async (endpoint,headers) => {
    try {
        const apiUrl = AppConstants.AsyncKeyLiterals.Base_URL + endpoint;
       
        const response = await axios.get(apiUrl, {headers});
        return response.data
        // Handle the response data as needed
    } catch (error) {
        console.error('Error:', error.message);
        // Handle errors
    }
};


const apiCall = {
    apiPOSTCall,
    apiGETCall,
};
export default apiCall;
