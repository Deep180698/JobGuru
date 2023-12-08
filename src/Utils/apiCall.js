import axios from 'axios';

const BASE_URL = 'http://10.0.0.217:3000'; // Replace with your actual base API URL

const apiPOSTCall = async (endpoint, data = null) => {
    try {
        const apiUrl = BASE_URL + endpoint;

        const headers = {
            'Content-Type': 'application/json',
        };
        console.log("apiUrl",apiUrl);

        const response = await axios.post(apiUrl, data, headers);

        return response.data
        // Handle the response data as needed
    } catch (error) {
        console.error('Error:', error.message);
        // Handle errors
    }
};
const apiGETCall = async (endpoint) => {
    try {
        const apiUrl = BASE_URL + endpoint;
        const headers = {
            'Content-Type': 'application/json',
        };

        const response = await axios.get(apiUrl, headers);

        return response.data
        // Handle the response data as needed
    } catch (error) {
        console.error('Error:', error.message);
        // Handle errors
    }
};


const apiCall = {
    apiPOSTCall,
    apiGETCall
};
export default apiCall;
