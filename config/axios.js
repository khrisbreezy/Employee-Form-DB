import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://process-mapping.herokuapp.com/api/v1/',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default axiosInstance;
