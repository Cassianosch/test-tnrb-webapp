import { AxiosError } from 'axios';
import api from '../services/api';

export const sleep = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

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

/**
 * @summary
 * Validates CPF
 * @param cpf: cpf with pontuation;
 * @return true: valid; false: invalid;
 */
export const validateCpf = (value: string): boolean => {
    let cpf = value;

    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) return false;
    if (cpf.match(/([0-9])\1{10}/)) return false;

    let sum = 0;
    let rest: number;

    let i: number;
    for (i = 1; i <= 9; i += 1) sum += +cpf.charAt(i - 1) * (11 - i);
    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== +cpf.charAt(9)) return false;

    sum = 0;
    for (i = 1; i <= 10; i += 1) sum += +cpf.charAt(i - 1) * (12 - i);
    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== +cpf.charAt(10)) return false;

    return true;
};

export const formatCpf = (value: string): string => {
    if (!value) return 'inválido';

    const numericOnly = value.replace(/\D/g, '');

    if (numericOnly.length !== 11) return 'inválido';

    const formatted = `${numericOnly.slice(0, 3)}.${numericOnly.slice(
        3,
        6,
    )}.${numericOnly.slice(6, 9)}-${numericOnly.slice(9, 11)}`;

    return formatted;
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

export const calculateAge = (birthday: string): number => {
    const birthdayDate = new Date(birthday);

    const ageDifMs = Date.now() - birthdayDate.getTime();
    const ageDate = new Date(ageDifMs);

    const currentYear = new Date().getFullYear();

    return Math.abs(ageDate.getUTCFullYear() - currentYear);
};

export const getApiUrl = (): string => {
    if (process.env.REACT_APP_POINT_TO === 'production')
        return process.env.REACT_APP_API_PROD;
    if (process.env.REACT_APP_POINT_TO === 'development')
        return process.env.REACT_APP_API_DEV;

    return process.env.REACT_APP_API_TEST;
};

export const getSiteUrl = (): string => {
    if (process.env.REACT_APP_POINT_TO === 'production')
        return process.env.REACT_APP_SITE_URL_PROD;

    return process.env.REACT_APP_SITE_URL_DEV;
};

export const getAnnouncementImageSource = (
    id_announcement: number,
    file_name: string,
): string =>
    `${getApiUrl()}announcer-files/announcement-files/${id_announcement}/${file_name}`;

export const dateTimeFormat = (date: Date): string => date.toLocaleString();

export const dayDiff = (...date: Date[]) => {
    const finalDate = date[1];
    const startDate = date[0];

    return Math.floor(
        Math.abs(finalDate.getTime() - startDate.getTime()) /
            1000 /
            60 /
            60 /
            24,
    );
};
export const dateToInputValue = (date: string): string =>
    date.replace(' ', 'T').substr(0, 16);

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
