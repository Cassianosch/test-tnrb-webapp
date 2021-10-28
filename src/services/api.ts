import axios from 'axios';
// import { getApiUrl } from '../utils/helpers';

// const baseURL = getApiUrl();
const baseURL = 'http://localhost:8000/api/';

const api = axios.create({
    baseURL,
});

export default api;
