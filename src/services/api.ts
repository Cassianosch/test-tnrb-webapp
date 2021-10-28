import axios from 'axios';
// import { getApiUrl } from '../utils/helpers';

// const baseURL = getApiUrl();
const baseURL = 'http://127.0.0.1:8000/api/';

const api = axios.create({
    baseURL,
});

export default api;
