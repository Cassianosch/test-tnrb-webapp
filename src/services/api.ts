import axios from 'axios';
import { getApiUrl } from '../utils/helpers';

const baseURL = getApiUrl();

const api = axios.create({
    baseURL,
});

export default api;
