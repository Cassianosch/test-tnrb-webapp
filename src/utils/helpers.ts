import { AxiosError } from 'axios';
import api from '../services/api';

export const serviceErrorHandler = (err: AxiosError): string => {
    if (typeof err === 'string') return err;

    if (err.response?.data) {
        if ('errors' in err.response.data) {
            return err.response.data.errors[0].message;
        }

        if ('message' in err.response.data) {
            return err.response.data.message;
        }
    }

    if (typeof err === 'object') {
        if (err.message) return err.message;

        if ('message' in err.response.data) return err.response.data.message;
    }

    return JSON.stringify(err);
};

export const extractCurrencyInputValue = (masked: string): number => {
    const numericValue = Number(
        masked.replace(/([^,\d])/g, '').replace(/,/g, '.'),
    );

    return numericValue;
};

export const setApiAuth = (token: string): void => {
    api.defaults.headers.authorization = `Bearer ${token}`;
};

export const getApiUrl = (): string => {
    if (process.env.REACT_APP_POINT_TO === 'production')
        return process.env.REACT_APP_API_PROD;
    if (process.env.REACT_APP_POINT_TO === 'development')
        return process.env.REACT_APP_API_DEV;

    return process.env.REACT_APP_API_TEST;
};

export const dateToInputValue = (date: string): string =>
    date.replace(' ', 'T').substr(0, 16);

export const inputValueToDate = (date: string): string =>
    `${date.replace('T', ' ')}:00`;

export const currentDateToFilter = () => {
    const date = new Date();
    const pad = (num) => `00${num}`.slice(-2);
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}`;
};

export const formatterCurrencyDolar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
export const formatterDate = new Intl.DateTimeFormat('en-US', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
});

export const capitalizeFirstLetter = (string: string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

export const convertCurrencyNumber = (value: number) => {
    if (String(value).includes('.')) return String(value);
    return String(`${value}.00`);
};
export const statusOnTableImage = (value: string, column) => {
    if (column?.type === 'out') return 'Expense';
    return capitalizeFirstLetter(value);
};
